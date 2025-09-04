"use client";

import type { PaymentMethod } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  Edit,
  Trash2,
  Wallet,
  Banknote,
  Globe,
} from "lucide-react";
import { PaymentType } from "@/lib/types";

interface PaymentMethodCardProps {
  paymentMethod: PaymentMethod;
  onEdit?: (paymentMethod: PaymentMethod) => void;
  onDelete?: (paymentMethodId: string) => void;
}

export function PaymentMethodCard({
  paymentMethod,
  onEdit,
  onDelete,
}: PaymentMethodCardProps) {
  const getPaymentIcon = (type: PaymentType) => {
    switch (type) {
      case PaymentType.CREDIT_CARD:
        return <CreditCard className="h-5 w-5" />;
      case PaymentType.UPI:
        return <Wallet className="h-5 w-5" />; // UPI → wallet-like
      case PaymentType.PAYPAL:
        return <Globe className="h-5 w-5" />; // PayPal → global payments
      case PaymentType.NET_BANKING:
        return <Banknote className="h-5 w-5" />; // Net banking → money/cash
      default:
        return <CreditCard className="h-5 w-5" />;
    }
  };

  const getPaymentTypeColor = (type: PaymentType) => {
    switch (type) {
      case PaymentType.CREDIT_CARD:
        return "default";
      case PaymentType.UPI:
        return "secondary";
      case PaymentType.PAYPAL:
        return "default";
      case PaymentType.NET_BANKING:
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              {getPaymentIcon(paymentMethod.type)}
            </div>
            <div>
              <CardTitle className="text-base">
                {paymentMethod.details}
              </CardTitle>
              <CardDescription className="mt-1">
                Added on{" "}
                {new Date(paymentMethod.createdAt).toLocaleDateString()}
              </CardDescription>
            </div>
          </div>
          <Badge variant={getPaymentTypeColor(paymentMethod.type) as any}>
            {paymentMethod.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit?.(paymentMethod)}
            className="flex-1"
          >
            <Edit className="h-3 w-3 mr-2" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete?.(paymentMethod.id)}
            className="flex-1 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-3 w-3 mr-2" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
