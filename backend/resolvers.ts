const resolvers = {
  Query: {
    getAllUsers: (_: any, __: any, { dataSources }: any) => dataSources.prismaAPI.getAllUsers(),

    getAllPosts: (_: any, __: any, { dataSources }: any) => dataSources.prismaAPI.getAllPosts(),

    getUser: (_: any, userId: any, { dataSources }: any) => dataSources.prismaAPI.getUser(userId),

    getPost: (_: any, postId: any, { dataSources }: any) => dataSources.prismaAPI.getPost(postId),

    getPostsByUser: (_: any, authorId: any, { dataSources }: any) => dataSources.prismaAPI.getPostsByUser(authorId),

  },
  Mutation: {
    createUser: (_: any, { data }: any, { dataSources }: any) => dataSources.prismaAPI.createUser({ data }),

    createPost: (_: any, { data }: any, { dataSources }: any) => dataSources.prismaAPI.createPost({ data }),

    updatePost: (_: any, { data }: any, { dataSources }: any) => dataSources.prismaAPI.updatePost({ data }),

    updateUser: (_: any, { data }: any, { dataSources }): any => dataSources.prismaAPI.updateUser({ data }),

    updateBio: (_: any, { data }: any, { dataSources }: any) => dataSources.prismaAPI.updateBio({ data }),

    deletePost: (_: any, { id }: any, { dataSources }: any) => dataSources.prismaAPI.deletePost( { id }),

    deleteUser: (_: any, { id }: any, { dataSources}: any) => dataSources.prismaAPI.deleteUser( { id }),

    loginUser: (_: any, { data }: any, { dataSources}: any) => dataSources.prismaAPI.loginUser( { data }),

  }
}

export default resolvers;