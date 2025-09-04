import { UserRole } from "./types";

export enum Permission {
  // Restaurant permissions
  VIEW_RESTAURANTS = "view_restaurants",
  MANAGE_RESTAURANTS = "manage_restaurants",

  // Order permissions
  CREATE_ORDER = "create_order",
  PLACE_ORDER = "place_order",
  CANCEL_ORDER = "cancel_order",
  VIEW_OWN_ORDERS = "view_own_orders",
  VIEW_ALL_ORDERS = "view_all_orders",
  MANAGE_ORDERS = "manage_orders",

  // Payment permissions
  MANAGE_PAYMENT_METHODS = "manage_payment_methods",

  // User permissions
  MANAGE_USERS = "manage_users",
  VIEW_USER_PROFILES = "view_user_profiles",

  // Cart permissions
  ADD_TO_CART = "add_to_cart",
  CHECKOUT = "checkout",
}

// Role-based permission mapping
const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.ADMIN]: [
    Permission.VIEW_RESTAURANTS,
    Permission.MANAGE_RESTAURANTS,
    Permission.CREATE_ORDER,
    Permission.PLACE_ORDER,
    Permission.CANCEL_ORDER,
    Permission.VIEW_OWN_ORDERS,
    Permission.VIEW_ALL_ORDERS,
    Permission.MANAGE_ORDERS,
    Permission.MANAGE_PAYMENT_METHODS,
    Permission.MANAGE_USERS,
    Permission.VIEW_USER_PROFILES,
    Permission.ADD_TO_CART,
    Permission.CHECKOUT,
  ],
  [UserRole.MANAGER]: [
    Permission.VIEW_RESTAURANTS,
    Permission.CREATE_ORDER,
    Permission.PLACE_ORDER,
    Permission.CANCEL_ORDER,
    Permission.VIEW_OWN_ORDERS,
    Permission.VIEW_ALL_ORDERS,
    Permission.MANAGE_ORDERS,
    Permission.VIEW_USER_PROFILES,
    Permission.ADD_TO_CART,
    Permission.CHECKOUT,
  ],
  [UserRole.MEMBER]: [
    Permission.VIEW_RESTAURANTS,
    Permission.CREATE_ORDER,
    Permission.VIEW_OWN_ORDERS,
    Permission.ADD_TO_CART,
  ],
};

export class PermissionService {
  static hasPermission(
    userRole: UserRole | null,
    permissions: Permission | Permission[],
    requireAll = false
  ): boolean {
    if (!userRole) return false;

    const rolePermissions = ROLE_PERMISSIONS[userRole] || [];
    const requiredPermissions = Array.isArray(permissions)
      ? permissions
      : [permissions];

    if (requireAll) {
      // User must have *all* required permissions
      return requiredPermissions.every((perm) =>
        rolePermissions.includes(perm)
      );
    }

    // User must have *at least one* required permission
    return requiredPermissions.some((perm) => rolePermissions.includes(perm));
  }

  static canAccessCountry(
    userRole: UserRole | null,
    userCountry: string,
    targetCountry: string
  ): boolean {
    if (!userRole) return false;
    if (userRole === UserRole.ADMIN) return true;
    return userCountry.toLowerCase() === targetCountry.toLowerCase();
  }

  static canAccessUserData(
    currentUserId: string | null,
    currentUserRole: UserRole | null,
    currentUserCountry: string | null,
    targetUser: { id: string; country: string }
  ): boolean {
    if (!currentUserId || !currentUserRole) return false;

    if (currentUserId === targetUser.id) return true;
    if (currentUserRole === UserRole.ADMIN) return true;

    if (currentUserRole === UserRole.MANAGER) {
      return currentUserCountry === targetUser.country;
    }

    return false;
  }

  static getRolePermissions(role: UserRole): Permission[] {
    return ROLE_PERMISSIONS[role] || [];
  }
}

// Convenience hook
export const usePermissions = (
  userId: string | null,
  userRole: UserRole | null,
  userCountry: string | null
) => {
  return {
    canViewRestaurants: PermissionService.hasPermission(
      userRole,
      Permission.VIEW_RESTAURANTS
    ),
    canManageRestaurants: PermissionService.hasPermission(
      userRole,
      Permission.MANAGE_RESTAURANTS
    ),
    canCreateOrder: PermissionService.hasPermission(
      userRole,
      Permission.CREATE_ORDER
    ),
    canPlaceOrder: PermissionService.hasPermission(
      userRole,
      Permission.PLACE_ORDER
    ),
    canCancelOrder: PermissionService.hasPermission(
      userRole,
      Permission.CANCEL_ORDER
    ),
    canViewOwnOrders: PermissionService.hasPermission(
      userRole,
      Permission.VIEW_OWN_ORDERS
    ),
    canViewAllOrders: PermissionService.hasPermission(
      userRole,
      Permission.VIEW_ALL_ORDERS
    ),
    canManageOrders: PermissionService.hasPermission(
      userRole,
      Permission.MANAGE_ORDERS
    ),
    canManagePaymentMethods: PermissionService.hasPermission(
      userRole,
      Permission.MANAGE_PAYMENT_METHODS
    ),
    canManageUsers: PermissionService.hasPermission(
      userRole,
      Permission.MANAGE_USERS
    ),
    canAddToCart: PermissionService.hasPermission(
      userRole,
      Permission.ADD_TO_CART
    ),
    canCheckout: PermissionService.hasPermission(userRole, Permission.CHECKOUT),
    canAccessCountry: (country: string) =>
      PermissionService.canAccessCountry(userRole, userCountry!, country),
    canAccessUserData: (targetUser: { id: string; country: string }) =>
      PermissionService.canAccessUserData(
        userId,
        userRole,
        userCountry,
        targetUser
      ),
  };
};
