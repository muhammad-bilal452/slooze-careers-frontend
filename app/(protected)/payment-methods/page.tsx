import { fetchPaymentMethods } from "@/hooks/payment/query";
import { PaymentMethodGrid } from "./component/payment-method-grid";
import { getUserData } from "@/lib/get-user-data";

export default async function PaymentMethodsPage() {
  const paymentMethods = await fetchPaymentMethods();
  const { userRole } = await getUserData();

  return (
    <PaymentMethodGrid
      userRole={userRole}
      initialData={typeof paymentMethods === "string" ? [] : paymentMethods}
    />
  );
}
