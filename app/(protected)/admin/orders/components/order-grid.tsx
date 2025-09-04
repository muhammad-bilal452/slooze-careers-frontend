"use client";

import { useState, useMemo } from "react";
import { PermissionGuard } from "@/components/permission-guard";
import { usePermissions, Permission } from "@/lib/permissions";
import { OrderCard } from "@/components/order-card";
import { AppSidebar } from "@/components/app-sidebar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarChart3, Search, Filter, MapPin } from "lucide-react";
import { OrderStatus, UserRole, type Order } from "@/lib/types";

interface OrderGridProps {
  orders: Order[];
  userId: string;
  userRole: UserRole | null;
  userCountry: string | null;
}

export default function OrderGrid({
  orders,
  userId,
  userRole,
  userCountry,
}: OrderGridProps) {
  const permissions = usePermissions(userId, userRole, userCountry);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [countryFilter, setCountryFilter] = useState<string>("all");

  const filteredOrders = useMemo(() => {
    if (!permissions.canViewAllOrders) return [];

    let filtered = [...orders];

    if (userRole === UserRole.MANAGER) {
      filtered = filtered.filter((order) =>
        permissions.canAccessCountry(order.restaurant.country)
      );
    }
    if (searchQuery) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.restaurant.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          order.user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }
    if (countryFilter !== "all" && userRole === UserRole.ADMIN) {
      filtered = filtered.filter(
        (order) => order.restaurant.country === countryFilter
      );
    }

    return filtered.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [orders, permissions, userRole, searchQuery, statusFilter, countryFilter]);

  const countries = Array.from(
    new Set(orders.map((order) => order.restaurant.country))
  );

  return (
    // <div className="flex min-h-screen w-full">
    //   <AppSidebar />
    <main className="flex-1 p-6">
      <div className="max-w-7xl mx-auto">
        <PermissionGuard
          userRole={userRole}
          permission={Permission.VIEW_ALL_ORDERS}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Order Management</h1>
            <p className="text-muted-foreground">
              Manage and track all orders
              {userRole === UserRole.MANAGER && userCountry && (
                <span className="ml-1">
                  in{" "}
                  <span className="font-medium text-primary">
                    {userCountry}
                  </span>
                </span>
              )}
            </p>
          </div>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-4 mb-8">
            <div className="bg-card rounded-lg p-4 border">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Total Orders</span>
              </div>
              <p className="text-2xl font-bold mt-2">{filteredOrders.length}</p>
            </div>
            <div className="bg-card rounded-lg p-4 border">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-yellow-500 rounded-full" />
                <span className="text-sm font-medium">Pending</span>
              </div>
              <p className="text-2xl font-bold mt-2">
                {
                  filteredOrders.filter((o) => o.status === OrderStatus.PENDING)
                    .length
                }
              </p>
            </div>
            <div className="bg-card rounded-lg p-4 border">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-blue-500 rounded-full" />
                <span className="text-sm font-medium">Placed</span>
              </div>
              <p className="text-2xl font-bold mt-2">
                {
                  filteredOrders.filter((o) => o.status === OrderStatus.PLACED)
                    .length
                }
              </p>
            </div>
            {/* <div className="bg-card rounded-lg p-4 border">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full" />
                    <span className="text-sm font-medium">Completed</span>
                  </div>
                  <p className="text-2xl font-bold mt-2">
                    {
                      filteredOrders.filter(
                        (o) => o.status === OrderStatus.PLACED
                      ).length
                    }
                  </p>
                </div> */}
          </div>

          {/* Search + Filters */}
          <div className="mb-6 space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value={OrderStatus.PENDING}>Pending</SelectItem>
                    <SelectItem value={OrderStatus.PLACED}>Placed</SelectItem>
                    <SelectItem value={OrderStatus.CANCELLED}>
                      Cancelled
                    </SelectItem>
                  </SelectContent>
                </Select>
                {userRole === UserRole.ADMIN && (
                  <Select
                    value={countryFilter}
                    onValueChange={setCountryFilter}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Countries</SelectItem>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {country}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>

            {/* Results */}
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                {filteredOrders.length} orders found
              </Badge>
              {userRole === UserRole.MANAGER && userCountry && (
                <Badge variant="outline">
                  <MapPin className="h-3 w-3 mr-1" />
                  {userCountry} only
                </Badge>
              )}
            </div>
          </div>

          {/* Orders Grid */}
          {filteredOrders.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredOrders.map((order) => (
                <OrderCard key={order.id} order={order} showUserInfo />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No orders found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          )}
        </PermissionGuard>
      </div>
    </main>
    // </div>
  );
}
