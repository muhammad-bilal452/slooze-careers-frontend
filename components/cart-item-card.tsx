"use client";

import type { CartItem } from "@/contexts/cart-context";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (menuItemId: string, quantity: number) => void;
  onRemove: (menuItemId: string) => void;
}

export function CartItemCard({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemCardProps) {
  const { menuItem, quantity } = item;
  const itemTotal = menuItem.price * quantity;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          {/* Item Image Placeholder */}
          <div className="w-16 h-16 bg-gradient-to-br from-accent/10 to-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-lg font-bold text-primary/50">
              {menuItem.name.charAt(0)}
            </span>
          </div>

          {/* Item Details */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm leading-tight">
              {menuItem.name}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {menuItem.restaurant.name}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="text-xs">
                ${menuItem.price} each
              </Badge>
              <Badge variant="secondary" className="text-xs font-semibold">
                ${itemTotal.toFixed(2)} total
              </Badge>
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpdateQuantity(menuItem.id, quantity - 1)}
              disabled={quantity <= 1}
              className="h-8 w-8 p-0"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center text-sm font-medium">
              {quantity}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpdateQuantity(menuItem.id, quantity + 1)}
              className="h-8 w-8 p-0"
            >
              <Plus className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemove(menuItem.id)}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
