import { useQuery } from 'urql';

export function useClubs() {
  const TokensQuery = `
  query {
      footyClubs(first: 1000) {
        id
        owner
        name
        footyNouns {
          id
        }
      }
    }
  `;

  const [result, reexecuteQuery] = useQuery({
    query: TokensQuery,
  });

  const { data, fetching, error } = result;

  return { data, fetching, error };
}
