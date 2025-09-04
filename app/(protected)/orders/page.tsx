import { fetchOrders } from "@/hooks/order/query";
import OrderGrid from "./component/order-grid";
import { getUserData } from "@/lib/get-user-data";

export default async function OrdersPage() {
  const { userId } = await getUserData();

  const orders = await fetchOrders();

  if (typeof orders === "string") {
    return (
      <main className="flex min-h-screen items-center justify-center p-6">
        <p className="text-lg font-medium text-muted-foreground">{orders}</p>
      </main>
    );
  }

  return <OrderGrid orders={orders} userId={userId} />;
}
