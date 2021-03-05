import { isAuth } from "./lib/isAuth";
import { sendRefreshToken } from "./lib/sendRefreshToken";

const resolvers = {
  Query: {
    getAllUsers: (_: any, __: any, { dataSources }: any) => dataSources.prismaAPI.getAllUsers(),

    getAllPosts: (_: any, __: any, { dataSources }: any) => dataSources.prismaAPI.getAllPosts(),

    getUser: (_: any, __: any, { dataSources, req }: any) => dataSources.prismaAPI.getUser({ req }),

    getPost: (_: any, postId: any, { dataSources }: any) => dataSources.prismaAPI.getPost(postId),

    getPostsByUser: (_: any, authorId: any, { dataSources }: any) => dataSources.prismaAPI.getPostsByUser(authorId),

    auth: (_: any, __: any, context: any) => {
      const user = isAuth(context) as any;
      return `Your user id is ${user.userId}`;
    },

  },
  Mutation: {
    createUser: (_: any, { data }: any, { dataSources }: any) => dataSources.prismaAPI.createUser({ data }),

    createPost: (_: any, { data }: any, { dataSources, req }: any) => dataSources.prismaAPI.createPost({ data, req }),

    updatePost: (_: any, { data }: any, { dataSources }: any) => dataSources.prismaAPI.updatePost({ data }),

    updateUser: (_: any, { data }: any, { dataSources }): any => dataSources.prismaAPI.updateUser({ data }),

    updateBio: (_: any, { data }: any, { dataSources }: any) => dataSources.prismaAPI.updateBio({ data }),

    deletePost: (_: any, { id }: any, { dataSources }: any) => dataSources.prismaAPI.deletePost( { id }),

    deleteUser: (_: any, { id }: any, { dataSources}: any) => dataSources.prismaAPI.deleteUser( { id }),

    loginUser: (_: any, { data }: any, { dataSources, res}: any) => dataSources.prismaAPI.loginUser( { data }, { res }),

    logoutUser: (_: any, __: any, { res }: any) => {
      sendRefreshToken(res, "");
      return true;
    },

    revokeRefreshTokensForUser: (_: any, { id }: any, { dataSources }: any) => dataSources.prismaAPI.revokeRefreshTokensForUser({ id }),

  }
}

export default resolvers;