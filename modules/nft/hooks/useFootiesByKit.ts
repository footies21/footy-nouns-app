import { useQuery } from 'urql';

export function useFootiesByKit(country: string) {
  const TokensQuery = `
  query {
      footyNouns(where: { kit: "${country}" }, , first: 1000){
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
