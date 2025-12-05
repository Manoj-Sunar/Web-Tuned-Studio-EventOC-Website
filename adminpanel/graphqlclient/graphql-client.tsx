// /lib/graphql-client.ts
const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL;

if (!GRAPHQL_URL) {
  throw new Error("NEXT_PUBLIC_GRAPHQL_URL is not defined");
}

export interface GraphQLRequestOptions {
  query: string;
  variables?: Record<string, any>;
  token?: string | null;
}

export interface GraphQLError {
  message: string;
  extensions?: Record<string, any>;
}

export class GraphQLError extends Error {
  constructor(
    message: string,
    public extensions?: Record<string, any>
  ) {
    super(message);
    this.name = "GraphQLError";
  }
}

export async function fetchGraphQL<T>({
  query,
  variables,
  token,
}: GraphQLRequestOptions): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(GRAPHQL_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({ query, variables }),
      cache: "no-store",
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    const json = await res.json();

    if (json.errors?.length) {
      const firstError = json.errors[0];
      throw new GraphQLError(
        firstError.message,
        firstError.extensions
      );
    }

    return json.data;
  } catch (error) {
    console.error("GraphQL Request Failed:", error);
    throw error instanceof GraphQLError 
      ? error 
      : new GraphQLError("Network or server error occurred");
  }
}