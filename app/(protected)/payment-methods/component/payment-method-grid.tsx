"use client";

import { useState } from "react";
import { PermissionGuard } from "@/components/permission-guard";
import { PaymentMethodCard } from "@/components/payment-method-card";
import { PaymentMethodForm } from "@/components/payment-method-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreditCard, Plus } from "lucide-react";
import {
  PaymentMethod,
  CreatePaymentMethod,
  UpdatePaymentMethod,
  UserRole,
} from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import {
  useCreatePaymentMethod,
  useUpdatePaymentMethod,
  useDeletePaymentMethod,
} from "@/hooks/payment/mutation";
import { Permission } from "@/lib/permissions";

interface Props {
  userRole: UserRole | null;
  initialData: PaymentMethod[];
}

export function PaymentMethodGrid({ userRole, initialData }: Props) {
  const { toast } = useToast();
  const [paymentMethods, setPaymentMethods] =
    useState<PaymentMethod[]>(initialData);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPaymentMethod, setEditingPaymentMethod] =
    useState<PaymentMethod | null>(null);

  const { mutate: createPaymentMethod, isPending: isCreating } =
    useCreatePaymentMethod();
  const { mutate: updatePaymentMethod, isPending: isUpdating } =
    useUpdatePaymentMethod();
  const { mutate: deletePaymentMethod, isPending: isDeleting } =
    useDeletePaymentMethod();

  const handleAddPaymentMethod = (data: CreatePaymentMethod) => {
    createPaymentMethod(data, {
      onSuccess: (response) => {
        setPaymentMethods((prev) => [...prev, response.data]);
        setIsFormOpen(false);
        toast({
          title: "Payment Method Added",
          description: "The new payment method has been added successfully.",
          variant: "success",
        });
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to add payment method.",
          variant: "destructive",
        });
      },
    });
  };

  const handleEditPaymentMethod = (data: UpdatePaymentMethod) => {
    if (!editingPaymentMethod) return;

    updatePaymentMethod(
      { id: editingPaymentMethod.id, data },
      {
        onSuccess: (response) => {
          setPaymentMethods((prev) =>
            prev.map((pm) => (pm.id === response.data.id ? response.data : pm))
          );
          setEditingPaymentMethod(null);
          toast({
            title: "Payment Method Updated",
            description: "The payment method has been updated successfully.",
            variant: "success",
          });
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Failed to update payment method.",
            variant: "destructive",
          });
        },
      }
    );
  };

  const handleDeletePaymentMethod = (id: string) => {
    deletePaymentMethod(id, {
      onSuccess: () => {
        setPaymentMethods((prev) => prev.filter((pm) => pm.id !== id));
        toast({
          title: "Payment Method Deleted",
          description: "The payment method has been removed successfully.",
          variant: "success",
        });
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to delete payment method.",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <main className="flex-1 p-6">
      <div className="max-w-6xl mx-auto">
        <PermissionGuard
          userRole={userRole}
          permission={Permission.MANAGE_PAYMENT_METHODS}
        >
          {/* Always show Add button */}
          <div className="flex justify-end mb-4">
            <Button onClick={() => setIsFormOpen(true)}>
              <Plus className="h-4 w-4 mr-2" /> Add Payment Method
            </Button>
          </div>

          {paymentMethods.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {paymentMethods.map((pm) => (
                <PaymentMethodCard
                  key={pm.id}
                  paymentMethod={pm}
                  onEdit={setEditingPaymentMethod}
                  onDelete={handleDeletePaymentMethod}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <CreditCard className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No payment methods found</p>
              <p className="text-sm mb-6">
                Add your first payment method to get started
              </p>
            </div>
          )}

          {/* Add Payment Method Dialog */}
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Payment Method</DialogTitle>
              </DialogHeader>
              <PaymentMethodForm
                onSubmit={handleAddPaymentMethod}
                onCancel={() => setIsFormOpen(false)}
                isLoading={isCreating}
              />
            </DialogContent>
          </Dialog>

          {/* Edit Payment Method Dialog */}
          <Dialog
            open={!!editingPaymentMethod}
            onOpenChange={() => setEditingPaymentMethod(null)}
          >
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Edit Payment Method</DialogTitle>
              </DialogHeader>
              <PaymentMethodForm
                paymentMethod={editingPaymentMethod || undefined}
                onSubmit={handleEditPaymentMethod}
                onCancel={() => setEditingPaymentMethod(null)}
                isLoading={isUpdating}
              />
            </DialogContent>
          </Dialog>
        </PermissionGuard>
      </div>
    </main>
  );
}
