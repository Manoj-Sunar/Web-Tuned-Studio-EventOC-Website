import { UserLoginService, UserORAdminUpdateService, UserRegisterService } from "../../../services/UserService.js";




const userResolvers = {

  Query: {
    me: async (_, __, { user }) => {
      if (!user) throw new Error("Not authenticated");
      return user;
    },
  },

  Mutation: {

    // REGISTER
    registerUser: async (_, { input }) => {
      console.log(input);
       return await UserRegisterService(input);
    },

    


    // LOGIN
    loginUser: async (_, { input }) => {
      return await UserLoginService(input);
    },


    // admin user and self user can update
     updateUser: async (_, { userId, input }, { user }) => {
      // `user` comes from auth middleware (current logged-in user)
      return await UserORAdminUpdateService(userId, input, user);
    },


  },
};

export default userResolvers;
