"use client";

import type { Order } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrderStatusBadge } from "@/components/order-status-badge";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, User, CreditCard, Eye } from "lucide-react";
import Link from "next/link";

interface OrderCardProps {
  order: Order;
  showUserInfo?: boolean;
}

export function OrderCard({ order, showUserInfo = false }: OrderCardProps) {
  const totalAmount = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">
              Order #{order.id.slice(-8).toUpperCase()}
            </CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              <CardDescription className="flex items-center gap-2 mt-1">
                <CalendarDays className="h-3 w-3" />
                {new Date(order.createdAt).toLocaleDateString()} at{" "}
                {new Date(order.createdAt).toLocaleTimeString()}
              </CardDescription>{" "}
            </CardDescription>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Restaurant:</span>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span className="font-medium">{order.restaurant.name}</span>
            </div>
          </div>

          {showUserInfo && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Customer:</span>
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span className="font-medium">{order.user.name}</span>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Payment:</span>
            <div className="flex items-center gap-1">
              <CreditCard className="h-3 w-3" />
              <span className="font-medium">{order.paymentMethod.details}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Items:</span>
            <Badge variant="outline">{itemCount} items</Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Total:</span>
            <span className="text-lg font-semibold text-primary">
              ${totalAmount.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="flex-1 bg-transparent"
          >
            <Link href={`/orders/${order.id}`}>
              <Eye className="h-3 w-3 mr-2" />
              View Details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
