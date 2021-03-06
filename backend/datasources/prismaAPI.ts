import 'dotenv/config';
import { DataSource } from "apollo-datasource"
import bcrypt from 'bcrypt';
import { verify } from "jsonwebtoken";
import { createAccessToken, createRefreshToken } from "../lib/auth";
import { sendRefreshToken } from "../lib/sendRefreshToken";

export default class prismaAPI extends DataSource {
  prisma: any;
  context: any;

  constructor({ prisma }) {
    super();
    this.prisma = prisma;
  }

  initialize(config: any) {
    this.context = config.context
  }

  async loginUser({ data: { email, password }}: any, { res }) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if (!user) {
      throw new Error('User does not exist');
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw new Error('Password is incorrect');
    }

    // successful login
    sendRefreshToken(res, createRefreshToken(user));

    return {
      accessToken: createAccessToken(user)
    };
  }

  async revokeRefreshTokensForUser({ id }) {
    await this.prisma.user.update({
      where: {
        id: parseInt(id)
      },
      data: {
        tokenVersion: {
          increment: 1,
        },
      },
    })
    return true;
  }

  // GET INFO
  async getAllUsers() {
    return await this.prisma.user.findMany();
  }
  async getAllPosts() {
    return await this.prisma.post.findMany({
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
  }
  async getUser({ req }: any) {
    const authorization = req.headers["authorization"];

    if (!authorization) {
      return null;
    }

    try {
      const token = authorization.split(" ")[1];
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
      return await this.prisma.user.findUnique({
        where: {
          id: parseInt(payload.userId)
        },
        include: {
          profile: {
            select: {
              bio: true
            }
          }
        }
      });
    } catch(err) {
      console.log(err);
      return null
    }

  }
  async getPost({ postId }: any) {
    return await this.prisma.post.findUnique({
      where: {
        id: parseInt(postId)
      },
      include: {
        author: {
          select: {
            name: true
          }
        }
      }
    })
  }
  async getPostsByUser({ authorId }: any) {
    return await this.prisma.post.findMany({
      where: {
        authorId: parseInt(authorId)
      }
    })
  }

  // CREATE
  async createUser({ data: { email, password, name, bio }}: any) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return await this.prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        profile: {
          create: {
            bio
          }
        }
      }
    })
  }
  async createPost({ data: { authorId, title, content }}: any) {
    return await this.prisma.post.create({
      data: {
        authorId: parseInt(authorId),
        title,
        content,
      }
    })
  }

  // UPDATE
  async updatePost({ data: { id, title, content }}: any) {
    return await this.prisma.post.update({
      where: {
        id: parseInt(id)
      },
      data: {
        title,
        content
      }
    })
  }
  async updateUser({data: { id, email, name }}: any) {
    return await this.prisma.user.update({
      where: {
        id: parseInt(id)
      },
      data: {
        email,
        name,
      }
    })
  }
  async updateBio({ data: { userId, bio } }: any) {
    return await this.prisma.profile.update({
      where: {
        userId: parseInt(userId),
      },
      data: {
        bio
      }
    })
  }

  // DELETE
  async deletePost({ id }) {
    return await this.prisma.post.delete({
      where: {
        id: parseInt(id)
      }
    })
  }
  async deleteUser({ id }) {
    const parsedId = parseInt(id);
    const deletePosts = this.prisma.post.deleteMany({
      where: {
        authorId: parsedId
      }
    })

    const deleteProfile = this.prisma.profile.delete({
      where: {
        userId: parsedId
      }
    })

    const deleteUser = this.prisma.user.delete({
      where: {
        id: parsedId
      }
    })

    return await this.prisma.$transaction([deletePosts, deleteProfile, deleteUser])
  }
}