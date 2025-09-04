import { ENDPOINTS } from "@/config/api-config";
import { fetchWithAuth } from "@/lib/fetch-with-auth";
import { formatAxiosError } from "@/lib/format-axios-error";
import { MenuItem, Response, Restaurant } from "@/lib/types";

export async function fetchRestaurants() {
  try {
    const response = await fetchWithAuth(ENDPOINTS.restaurant.getAll);
    const responseData: Response<Restaurant[]> = response.data;
    return responseData.data;
  } catch (error) {
    return formatAxiosError(error);
  }
}

export async function fetchMenuItems(restaurantId: string) {
  try {
    const response = await fetchWithAuth(
      ENDPOINTS.restaurant.getMenuItems(restaurantId)
    );
    const responseData: Response<MenuItem[]> = response.data;
    return responseData.data;
  } catch (error) {
    return formatAxiosError(error);
  }
}
