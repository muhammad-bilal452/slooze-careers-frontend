import { ENDPOINTS } from "@/config/api-config";
import { formatAxiosError } from "@/lib/format-axios-error";
import { Response, PaymentMethod } from "@/lib/types";
import { fetchWithAuth } from "@/lib/fetch-with-auth";

export async function fetchPaymentMethods() {
  try {
    const response = await fetchWithAuth(ENDPOINTS.paymentMethod.getMethods);
    const responseData: Response<PaymentMethod[]> = response.data;
    return responseData.data;
  } catch (error) {
    return formatAxiosError(error);
  }
}
