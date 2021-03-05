import { gql } from 'apollo-server-express';
import { Request, Response } from 'express';

const typeDefs = gql`
  type Query {
    getAllUsers: [User]
    getAllPosts: [Post]
    getUser: User
    getPost(postId: ID!): Post
    getPostsByUser(authorId: ID!): [Post]
    auth: String
  }

  type Mutation {
    createUser(data: CreateUserInput): User
    createPost(data: CreatePostInput): Post

    updateUser(data: UpdateUserInput): User
    updatePost(data: UpdatePostInput): Post
    updateBio(data: UpdateBio): Profile

    deletePost(id: ID!): Post
    deleteUser(id: ID!): User

    loginUser(data: UserLoginInput): LoginAuth
    logoutUser: Boolean
    revokeRefreshTokensForUser(id: ID!): Boolean
  }

  input UserLoginInput {
    email: String!
    password: String!
  }

  input CreateUserInput {
    email: String!
    name: String!
    password: String!
    bio: String
  }

  input CreatePostInput {
    authorId: ID
    title: String!
    content: String
  }

  input UpdateUserInput {
    id: ID!
    email: String
    name: String
  }

  input UpdatePostInput {
    id: ID!
    title: String
    content: String
  }

  input UpdateBio {
    userId: ID!
    bio: String
  }

  type Post {
  id: ID!
  createdAt: String
  updatedAt: String
  title:     String
  content:   String
  published: Boolean
  author:    User
  authorId:  Int
  }

  type Profile {
  id: ID!
  bio: String
  user: User
  userId: Int
  }

  type User {
  id: ID
  email: String
  password: String
  tokenVersion: Int
  name: String
  posts: [Post]
  profile: Profile
  }

  type LoginAuth {
    accessToken: String
  }

  type UserAuth {
    id: Int
  }


`;

export default typeDefs;