"use client";

import { useState, useMemo } from "react";
import { useCart } from "@/contexts/cart-context";
import { MenuItemCard } from "@/components/menu-item-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { AppSidebar } from "@/components/app-sidebar";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Star,
  Search,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { type MenuItem, UserRole, Restaurant } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { useCreateOrder } from "@/hooks/order/mutation";
import { formatAxiosError } from "@/lib/format-axios-error";

interface Props {
  menuItems: MenuItem[];
  userRole: UserRole | null;
  userCountry: string | null;
}

export default function RestaurantDetail({
  menuItems,
  userRole,
  userCountry,
}: Props) {
  const { addItem, getTotalItems } = useCart();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  const { mutate: createOrder } = useCreateOrder();

  const filteredMenuItems = useMemo(() => {
    if (!searchQuery) return menuItems;
    return menuItems.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [menuItems, searchQuery]);

  const handleAddToCart = (menuItem: MenuItem) => {
    addItem(menuItem);
    createOrder(
      {
        restaurantId: menuItem.restaurant.id,
        items: [
          {
            menuItemId: menuItem.id,
            quantity: 1,
          },
        ],
        paymentMethodId: "44ecff92-eff5-49d7-815f-9bd4b5585928",
      },
      {
        onSuccess: () => {
          toast({
            title: "Added to cart",
            description: `${menuItem.name} has been added to your cart.`,
            variant: "success",
          });
        },
        onError: (error) => {
          const formattedMessage = formatAxiosError(error);
          toast({
            title: "Failed to aad to cart",
            description: formattedMessage,
            variant: "destructive",
          });
        },
      }
    );
  };

  const totalCartItems = getTotalItems();
  const restaurant = menuItems.length > 0 ? menuItems[0].restaurant : null;

  if (
    userRole &&
    userCountry &&
    restaurant &&
    userRole !== UserRole.ADMIN &&
    restaurant.country.toLowerCase() !== userCountry.toLowerCase()
  ) {
    return (
      // <div className="flex min-h-screen w-full">
      //   <AppSidebar />
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Access Restricted</h1>
          <p className="text-muted-foreground mb-6">
            You can only access restaurants in your region ({userCountry}).
          </p>
          <Button asChild>
            <Link href="/restaurants">Back to Restaurants</Link>
          </Button>
        </div>
      </main>
      // </div>
    );
  }

  return (
    // <div className="flex min-h-screen w-full">
    //   <AppSidebar />
    <main className="flex-1 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/restaurants">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Restaurants
              </Link>
            </Button>
            {/* {totalCartItems > 0 && (
              <Button size="sm" className="ml-auto">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart ({totalCartItems})
              </Button>
            )} */}
          </div>

          {restaurant && (
            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{restaurant.country}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>30-45 min delivery</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-current text-yellow-500" />
                      <span>4.5 (120+ reviews)</span>
                    </div>
                  </div>
                </div>
                <Badge variant="secondary" className="text-sm">
                  {menuItems.length} menu items
                </Badge>
              </div>
            </div>
          )}
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Menu Items */}
        {filteredMenuItems.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredMenuItems.map((menuItem) => (
              <MenuItemCard
                key={menuItem.id}
                menuItem={menuItem}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-50 text-muted-foreground" />
            <p className="text-lg font-medium">No menu items found</p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search
            </p>
          </div>
        )}
      </div>
    </main>
    // </div>
  );
}
