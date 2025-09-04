"use client";

import { useState } from "react";
import { Permission, usePermissions } from "@/lib/permissions";
import { OrderStatusBadge } from "@/components/order-status-badge";
import { PermissionGuard } from "@/components/permission-guard";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ArrowLeft,
  MapPin,
  User,
  CreditCard,
  Clock,
  Phone,
  AlertCircle,
  X,
} from "lucide-react";
import Link from "next/link";
import { Order, OrderStatus, PaymentMethod, UserRole } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { useCancelOrder, useProceedOrder } from "@/hooks/order/mutation";
import { formatAxiosError } from "@/lib/format-axios-error";

interface OrderDetailsClientProps {
  userId: string;
  userRole: UserRole | null;
  userCountry: string | null;
  order: Order | string;
  paymentMethod: PaymentMethod[];
}

export default function OrderDetails({
  userId,
  userRole,
  userCountry,
  order: initialOrder,
  paymentMethod,
}: OrderDetailsClientProps) {
  const permissions = usePermissions(userId, userRole, userCountry);
  const { toast } = useToast();

  const [order, setOrder] = useState<Order | null>(
    typeof initialOrder === "string" ? null : initialOrder
  );

  const [selectedPaymentMethodId, setSelectedPaymentMethodId] =
    useState<string>(order?.paymentMethod?.id || (paymentMethod[0]?.id ?? ""));

  const { mutate: cancelOrder, isPending: isCancelling } = useCancelOrder();
  const { mutate: proceedOrder, isPending: isProceeding } = useProceedOrder();

  if (!order) {
    return (
      // <div className="flex min-h-screen w-full">
      //   <AppSidebar />
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Order not found</h1>
            <Button asChild>
              <Link href="/orders">Back to Orders</Link>
            </Button>
          </div>
        </main>
      // </div>
    );
  }

  const canViewOrder =
    permissions.canAccessUserData(order.user) || permissions.canViewAllOrders;

  const handleCancelOrder = () => {
    if (!permissions.canCancelOrder) return;

    setOrder({ ...order, status: OrderStatus.CANCELLED });

    cancelOrder(order.id, {
      onSuccess: () => {
        toast({
          title: "Order Cancelled",
          description: `Order #${order.id
            .slice(-8)
            .toUpperCase()} has been cancelled.`,
          variant: "success",
        });
      },
      onError: (error) => {
        setOrder({ ...order, status: OrderStatus.PENDING });
        toast({
          title: "Failed to Cancel Order",
          description: formatAxiosError(error),
          variant: "destructive",
        });
      },
    });
  };

  const handleProceedCheckout = () => {
    if (!permissions.canCheckout || !order) return;

    const selectedMethod = paymentMethod.find(
      (method) => method.id === selectedPaymentMethodId
    );

    proceedOrder(
      { id: order.id, paymentMethodId: selectedPaymentMethodId },
      {
        onSuccess: () => {
          setOrder({
            ...order,
            status: OrderStatus.PLACED,
            paymentMethod: selectedMethod ?? order.paymentMethod,
          });

          toast({
            title: "Order Completed",
            description: `Order #${order.id
              .slice(-8)
              .toUpperCase()} has been successfully checked out.`,
            variant: "success",
          });
        },
        onError: (error) => {
          toast({
            title: "Checkout Failed",
            description: formatAxiosError(error),
            variant: "destructive",
          });
        },
      }
    );
  };

  if (!canViewOrder) {
    return (
      // <div className="flex min-h-screen w-full">
      //   <AppSidebar />
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                You don't have permission to view this order.
              </AlertDescription>
            </Alert>
          </div>
        </main>
      // </div>
    );
  }

  const totalAmount = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = totalAmount * 0.1;
  const deliveryFee = totalAmount > 50 ? 0 : 5.99;
  const finalTotal = totalAmount + tax + deliveryFee;

  return (
    // <div className="flex min-h-screen w-full">
    //   <AppSidebar />
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex items-start justify-between">
            <div>
              <Button variant="ghost" size="sm" asChild>
                <Link
                  href={
                    userRole === UserRole.MEMBER ? "/orders" : "/admin/orders"
                  }
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Orders
                </Link>
              </Button>
              <h1 className="text-3xl font-bold mt-2">
                Order #{order.id.slice(-8).toUpperCase()}
              </h1>
              <p className="text-muted-foreground">
                Placed on {new Date(order.createdAt).toLocaleDateString()} at{" "}
                {new Date(order.createdAt).toLocaleTimeString()}
              </p>
            </div>

            <div className="flex flex-col items-end gap-2">
              <OrderStatusBadge status={order.status} />
              {order.status === OrderStatus.PENDING &&
                permissions.canCancelOrder && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleCancelOrder}
                    disabled={isCancelling}
                  >
                    <X className="h-3 w-3 mr-2" />
                    {isCancelling ? "Cancelling..." : "Cancel Order"}
                  </Button>
                )}
              {order.status === OrderStatus.PENDING &&
                permissions.canCheckout && (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleProceedCheckout}
                    disabled={isProceeding}
                  >
                    {isProceeding ? "Processing..." : "Proceed to Checkout"}
                  </Button>
                )}
            </div>
          </div>

          {/* Order Details / Summary */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left: Restaurant + Customer + Items */}
            <div className="lg:col-span-2 space-y-6">
              {/* Restaurant Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Restaurant Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <span className="font-semibold text-lg">
                        {order.restaurant.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{order.restaurant.country}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>30-45 min delivery</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Info for Admin/Manager */}
              <PermissionGuard
                userRole={userRole}
                permission={Permission.VIEW_ALL_ORDERS}
                showError={false}
              >
                {(userRole === UserRole.ADMIN ||
                  userRole === UserRole.MANAGER) && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Customer Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <span className="font-semibold">
                            {order.user.name}
                          </span>
                        </div>
                        <div className="text-muted-foreground">
                          {order.user.email}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{order.user.role}</Badge>
                          <Badge variant="secondary">
                            {order.user.country}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </PermissionGuard>

              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Items</CardTitle>
                  <CardDescription>{order.items.length} items</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium">{item.menuItem.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          ${item.price} each
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline">Qty: {item.quantity}</Badge>
                        <span className="font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Right: Summary + Payment */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax (10%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Delivery Fee</span>
                      <span>
                        {deliveryFee === 0 ? (
                          <Badge variant="secondary" className="text-xs">
                            Free
                          </Badge>
                        ) : (
                          `$${deliveryFee.toFixed(2)}`
                        )}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>
                    {order.status === OrderStatus.PENDING
                      ? "Select the payment method for this order"
                      : "Current payment method for this order"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {order.status === OrderStatus.PENDING &&
                  userRole === UserRole.ADMIN ? (
                    <select
                      value={selectedPaymentMethodId}
                      onChange={(e) =>
                        setSelectedPaymentMethodId(e.target.value)
                      }
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                    >
                      {paymentMethod.map((method) => (
                        <option key={method.id} value={method.id}>
                          {method.type} - {method.details}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="text-foreground font-medium">
                      {order.paymentMethod.type} - {order.paymentMethod.details}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    // </div>
  );
}
