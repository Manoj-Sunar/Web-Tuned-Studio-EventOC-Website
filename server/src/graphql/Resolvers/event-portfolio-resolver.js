
import PortfolioEventSchema from "../../../models/portfolio-event-schema.js";
import { createPortfolioService, deletePortfolioService, updatePortfolioService } from "../../../services/Event-Portfolio-Services.js";




const portfolioResolvers = {


  Query: {
    getAllPortfolio: async () => {
      return await PortfolioEventSchema.find().sort({ createdAt: -1 });
    },


    getPortfolioBySlug: async (_, { slug }) => {
      const event = await PortfolioEventSchema.findOne({ slug });
      if (!event) throw new Error("Event not found");
      return event;
    },


  },

  Mutation: {
    createPortfolio: async (_, { input }, { user }) => {

      return await createPortfolioService(input, user);
    },


    deletePortfolio: async (_, { id }, { user }) => {
      console.log(id)
      return await deletePortfolioService(id, user);
    },

    updatePortfolio: async (_, { id, input }, { user }) => {
      return await updatePortfolioService(id, input, user);
    },

  },
};

export default portfolioResolvers;
