import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";


import { connectDB } from "./config/DatabaseConnection.js";


import { authMiddleware } from "./middlewares/authMiddleware.js";
import userTypeDefs from "./src/graphql/TypeDefs/userTypeDefs.js";
import portfolioTypeDefs from "./src/graphql/TypeDefs/event-portfolioTypeDefs.js";
import userResolvers from "./src/graphql/Resolvers/user-resolver.js";
import portfolioResolvers from "./src/graphql/Resolvers/event-portfolio-resolver.js";








dotenv.config();

const startServer = async () => {
  const app = express();

  // ----------------------------
  // Middleware
  // ----------------------------
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // ----------------------------
  // Connect Database FIRST
  // ----------------------------
  await connectDB();


  // ----------------------------
  // Apollo GraphQL Server
  // ----------------------------
  const server = new ApolloServer({
    typeDefs: [userTypeDefs, portfolioTypeDefs],
    resolvers: [userResolvers, portfolioResolvers],
    context: authMiddleware,
    formatError: (err) => {
      console.error("GraphQL Error:", err);
      return err;
    },
    introspection: true,
    playground: true,
  });

  await server.start();
  server.applyMiddleware({ app });

  // ----------------------------
  // Start Express Server
  // ----------------------------
  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () =>
    console.log(
      `🚀 Server running at http://localhost:${PORT}${server.graphqlPath}`
    )
  );
};

startServer();
