"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PaymentType, type PaymentMethod } from "@/lib/types";

interface PaymentMethodFormProps {
  paymentMethod?: PaymentMethod;
  onSubmit: (data: { type: PaymentType; details: string }) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function PaymentMethodForm({
  paymentMethod,
  onSubmit,
  onCancel,
  isLoading = false,
}: PaymentMethodFormProps) {
  const [type, setType] = useState<PaymentType>(
    paymentMethod?.type || PaymentType.CREDIT_CARD
  );
  const [details, setDetails] = useState(paymentMethod?.details || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.trim()) return;

    onSubmit({ type, details: details.trim() });
  };

  const getPlaceholder = (type: PaymentType) => {
    switch (type) {
      case PaymentType.CREDIT_CARD:
        return "e.g., Visa ending in 4242";
      case PaymentType.UPI:
        return "e.g., user@upi";
      case PaymentType.PAYPAL:
        return "e.g., PayPal - user@example.com";
      case PaymentType.NET_BANKING:
        return "e.g., HDFC Bank - NetBanking";
      default:
        return "Enter payment method details";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {paymentMethod ? "Edit Payment Method" : "Add New Payment Method"}
        </CardTitle>
        <CardDescription>
          {paymentMethod
            ? "Update the payment method details"
            : "Add a new payment method to the system"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Payment Type</Label>
            <Select
              value={type}
              onValueChange={(value) => setType(value as PaymentType)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select payment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={PaymentType.CREDIT_CARD}>
                  Credit Card
                </SelectItem>
                <SelectItem value={PaymentType.UPI}>UPI</SelectItem>
                <SelectItem value={PaymentType.PAYPAL}>PayPal</SelectItem>
                <SelectItem value={PaymentType.NET_BANKING}>
                  Net Banking
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="details">Payment Details</Label>
            <Input
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder={getPlaceholder(type)}
              required
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="submit"
              disabled={isLoading || !details.trim()}
              className="flex-1"
            >
              {isLoading
                ? "Saving..."
                : paymentMethod
                ? "Update"
                : "Add Payment Method"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1 bg-transparent"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
