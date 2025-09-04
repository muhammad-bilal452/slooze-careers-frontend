import { Order, Response } from "@/lib/types";
import { ENDPOINTS } from "@/config/api-config";
import { formatAxiosError } from "@/lib/format-axios-error";
import { fetchWithAuth } from "@/lib/fetch-with-auth";

export async function fetchOrders() {
  try {
    const response = await fetchWithAuth(ENDPOINTS.order.getOrders);
    const responseData: Response<Order[]> = response.data;
    return responseData.data;
  } catch (error) {
    return formatAxiosError(error);
  }
}

export async function fetchOrderItems(orderId: string) {
  try {
    const response = await fetchWithAuth(
      ENDPOINTS.order.getOrderItems(orderId)
    );

    const responseData: Response<Order> = response.data;
    return responseData.data;
  } catch (error) {
    return formatAxiosError(error);
  }
}
