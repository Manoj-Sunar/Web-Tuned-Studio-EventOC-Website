import { fetchGraphQL } from "@/graphqlclient/graphql-client";
import { GraphQLLoginResponse } from "@/types/types";

export async function AdminLoginService(email: string, password: string): Promise<GraphQLLoginResponse> {
  const query = `
    mutation Login($input: LoginInput!) {
      loginUser(input: $input) {
        token
        user {
          id
          name
          email
          isAdmin
        }
      }
    }
  `;

  const variables = { input: { email, password } };

  const data = await fetchGraphQL<{ loginUser: GraphQLLoginResponse }>({ query, variables });

  return data.loginUser;
}
