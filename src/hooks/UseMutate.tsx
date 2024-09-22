import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type useMutateProps_TP<response_T> = {
  endpoint: string;
  mutationKey: [string];
  onSuccess?: (data: response_T) => void;
  onError?: (err: unknown) => void;
  formData?: boolean;
  useCompanyToken?: boolean;
  onMutate?: (err?: unknown) => void;
};

export function useMutate<response_T>({
  endpoint,
  mutationKey,
  onError,
  onSuccess,
  formData,
  useCompanyToken,
  onMutate,
}: useMutateProps_TP<response_T>) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const { data, isPending, isSuccess, mutate, failureReason, isError } =
    useMutation({
      mutationKey,
      mutationFn: (values) => {
        return axios({
          method: "post",
          url: `${baseUrl}/${endpoint}`,
          data: values,
        });
      },
      onSuccess,
      onError,
      onMutate,
    });
  return { data, isPending, isSuccess, mutate, failureReason, isError };
}
