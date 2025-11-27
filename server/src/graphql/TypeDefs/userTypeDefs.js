import { gql } from "apollo-server-express";

const userTypeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    isAdmin: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type AuthResponse {
    user: User!
    token: String!
  }

  input RegisterInput {
    name: String!
    email: String!
    password: String!
  }

  input UpdateUserInput {
    name: String
    email: String
 }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    registerUser(input: RegisterInput!): AuthResponse!
    loginUser(input: LoginInput!): AuthResponse!
    updateUser(userId:ID!,input: UpdateUserInput!): User!
  }
`;

export default userTypeDefs;
