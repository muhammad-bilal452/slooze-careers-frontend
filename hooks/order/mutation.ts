import { axiosInstance, ENDPOINTS } from "@/config/api-config";
import { CreateOrder } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useCreateOrder = () => {
  const token = Cookies.get("access-token");
  return useMutation({
    mutationFn: async (data: CreateOrder) => {
      const response = await axiosInstance.post(
        ENDPOINTS.order.createOrder,
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

export const useCancelOrder = () => {
  const token = Cookies.get("access-token");
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete(
        ENDPOINTS.order.cancelOrder(id),
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

export const useProceedOrder = () => {
  const token = Cookies.get("access-token");

  return useMutation({
    mutationFn: async ({
      id,
      paymentMethodId,
    }: {
      id: string;
      paymentMethodId: string;
    }) => {
      const response = await axiosInstance.post(
        ENDPOINTS.order.orderCheckout(id),
        { paymentMethodId },
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
