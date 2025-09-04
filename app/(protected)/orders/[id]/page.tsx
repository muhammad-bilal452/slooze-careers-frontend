import { fetchOrderItems } from "@/hooks/order/query";
import OrderDetails from "../component/order-detail";
import { fetchPaymentMethods } from "@/hooks/payment/query";
import { getUserData } from "@/lib/get-user-data";

interface OrderDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailsPage(props: OrderDetailsPageProps) {
  const { id } = await props.params;
  const { userId, userRole, userCountry } = await getUserData();
  const order = await fetchOrderItems(id);
  const paymentMethods = await fetchPaymentMethods();

  return (
    <OrderDetails
      userId={userId}
      userRole={userRole}
      userCountry={userCountry}
      order={order}
      paymentMethod={typeof paymentMethods === "string" ? [] : paymentMethods}
    />
  );
}
