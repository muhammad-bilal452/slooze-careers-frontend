import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@/lib/types";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const getStatusConfig = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return { variant: "secondary" as const, label: "Pending" };

      case OrderStatus.PLACED:
        return { variant: "success" as const, label: "Placed" }; // ✅ Added

      case OrderStatus.CANCELLED:
        return { variant: "destructive" as const, label: "Cancelled" };

      default:
        return { variant: "secondary" as const, label: "Unknown" };
    }
  };

  const config = getStatusConfig(status);

  return <Badge variant={config.variant}>{config.label}</Badge>;
}
