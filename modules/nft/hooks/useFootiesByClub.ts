import { useQuery } from 'urql';

export function useFootiesByClub(address: string) {
  const TokensQuery = `
  query {
      footyNouns(where: { owner: "${address}" }){
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
