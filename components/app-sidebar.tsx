"use client";

import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { UserRole } from "@/lib/types";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar } from "@/components/ui/avatar";
import {
  Store,
  ClipboardList,
  CreditCard,
  BarChart3,
  LogOut,
  ChevronUp,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AppSidebarProps {
  userRole: UserRole | null;
}

// Navigation configuration
const navigationItems = [
  {
    title: "Restaurants",
    icon: Store,
    url: "/restaurants",
    roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.MEMBER],
  },
  {
    title: "My Orders",
    icon: ClipboardList,
    url: "/orders",
    roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.MEMBER],
  },
  {
    title: "Order Management",
    icon: BarChart3,
    url: "/admin/orders",
    roles: [UserRole.ADMIN, UserRole.MANAGER],
  },
  {
    title: "Payment Methods",
    icon: CreditCard,
    url: "/payment-methods",
    roles: [UserRole.ADMIN],
  },
];

export function AppSidebar({ userRole }: AppSidebarProps) {
  const router = useRouter();
  const { toast } = useToast();

  const logout = () => {
    deleteCookie("access-token");
    router.replace("/login");
  };

  if (!userRole) {
    toast({
      title: "Error in getting user role ",
      variant: "destructive",
    });
    return;
  }
  // Filter menu based on role
  const allowedItems = navigationItems.filter((item) =>
    item.roles.includes(userRole)
  );

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex flex-col">
            <span className="text-sm font-semibold">SLOOZE Food</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {allowedItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full">
                  <Avatar className="h-6 w-6" />
                  <div className="flex flex-col items-start text-left"></div>
                  <ChevronUp className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={logout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
