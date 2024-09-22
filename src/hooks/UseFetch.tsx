import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type useFetchPops_TP = {
  queryKey: [string];
  endpoint: string;
  enabled?: boolean;
  select?: ((data: any) => any) | undefined;
  onError?: (err: any) => void;
  onSuccess?: (err: any) => void;
  localization?: boolean;
  useCompanyToken?: boolean;
  specificToken?: string;
};
function useFetch<T>({
  endpoint,
  enabled,
  select,
  queryKey,
  onError,
  onSuccess,
  localization,
  useCompanyToken,
  specificToken,
}: useFetchPops_TP) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  // const authorizationHeader = `Bearer ${token}`;
  // const config = {
  //   headers: { Authorization: authorizationHeader },
  // };
  const query = useQuery<T>({
    queryKey,
    queryFn: () =>
      axios
        .get(
          `${baseUrl}/${endpoint}`
          // config
        )
        .then((res) => res.data),
    enabled,
    select,
    // onError,
//@ts-ignore

    onSuccess,
  });
  return query;
}

export default useFetch;
