import { axiosInstance, ENDPOINTS } from "@/config/api-config";
import { CreatePaymentMethod, UpdatePaymentMethod } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useCreatePaymentMethod = () => {
  return useMutation({
    mutationFn: async (data: CreatePaymentMethod) => {
      const token = Cookies.get("access-token");

      const response = await axiosInstance.post(
        ENDPOINTS.paymentMethod.createMethod,
        data,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      return response.data;
    },
  });
};

export const useUpdatePaymentMethod = () => {
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: UpdatePaymentMethod;
    }) => {
      const token = Cookies.get("access-token");

      const response = await axiosInstance.put(
        ENDPOINTS.paymentMethod.updateMethod(id),
        data,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      return response.data;
    },
  });
};

export const useDeletePaymentMethod = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const token = Cookies.get("access-token");
      const response = await axiosInstance.delete(
        ENDPOINTS.paymentMethod.deleteMethod(id),
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      return response.data;
    },
  });
};
