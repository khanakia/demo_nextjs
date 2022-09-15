import { useQuery } from "react-query";
import { getGqlClient} from "src/features/bite";
import { TDataGrid } from "src/features/bite"
import { query_p_users } from "../schema"

export function useQueryUsers(variables?: TDataGrid) {
  return useQuery(["users", variables], async (ctx) => {
    // if (!ctx.queryKey[1]['slug']) return
    // console.log(ctx.queryKey)
    const {
      p_users: data,
    } = await getGqlClient().request(
      query_p_users,
      variables
    );
    return data
  }, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    // staleTime: 10000,
    keepPreviousData : true
  });
}
