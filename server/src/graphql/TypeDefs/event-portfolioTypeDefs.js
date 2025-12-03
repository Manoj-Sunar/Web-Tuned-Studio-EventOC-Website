import { gql } from "apollo-server-express";

const portfolioTypeDefs = gql`
  type Portfolio {
    id: ID!
    title: String!
    slug: String!
    date: String!
    eventType: String!
    location: String!
    shortSummary: String!
    fullDescription: String!
    coverImageUrl: String!
    galleryImages: [String]
    reviewText: String
    isFeatured: Boolean
    createdAt: String
    updatedAt: String
  }

  

  input CreatePortfolioInput {
    title: String!
    slug: String!
    date: String!
    eventType: String!
    location: String!
    shortSummary: String!
    fullDescription: String!
    coverImageUrl: String!
    galleryImages: [String]
    reviewText: String
    isFeatured: Boolean
  }


  input UpdatePortfolioInput {
  title: String
  slug: String
  date: String
  eventType: String
  location: String
  shortSummary: String
  fullDescription: String
  coverImageUrl: String
  galleryImages: [String]
  reviewText: String
  isFeatured: Boolean
}

  type Query {
    getAllPortfolio: [Portfolio!]!
    getPortfolioBySlug(slug: String!): Portfolio
    getEventPortfolioById(id:ID!):Portfolio
  }

  type Mutation {
    createPortfolio(input: CreatePortfolioInput!): Portfolio!
    updatePortfolio(id: ID!, input: UpdatePortfolioInput!): Portfolio!
    
    deletePortfolio(id: ID!): String!
  }
`;

export default portfolioTypeDefs;
