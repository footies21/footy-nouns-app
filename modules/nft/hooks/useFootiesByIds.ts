import { useQuery } from 'urql';

export function useFootiesByIds(items: string[]) {
  const TokensQuery = `
  query {
      footyNouns( where: { id_in: [${items}]}) {
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
