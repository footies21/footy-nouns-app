import { useQuery } from 'urql';

export function useLatestFooty() {
  const TokensQuery = `
  query {
      footyNouns(orderBy: tokenId, orderDirection: desc, first: 1) {
        id
        tokenId
        kit
        head
        background
        glasses
        number
        name
        owner
      }
    }
  `;

  const [result, reexecuteQuery] = useQuery({
    query: TokensQuery,
  });

  const { data, fetching, error } = result;

  return { data, fetching, error };
}
