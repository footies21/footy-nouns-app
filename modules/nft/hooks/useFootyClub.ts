import { useQuery } from 'urql';

export function useFootyClub(address: string) {
  const NamesQuery = `
  query {
      footyClub(id: "${(address || '').toLowerCase()}"){
        id
        name
      }
    }
    `;

  const [result, reexecuteQuery] = useQuery({
    query: NamesQuery,
  });

  const { data, fetching, error } = result;

  return {
    data,
    fetching,
    error,
  };
}
