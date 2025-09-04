"use client";

import type { ReactNode } from "react";
import { type Permission, PermissionService } from "@/lib/permissions";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { UserRole } from "@/lib/types";

interface PermissionGuardProps {
  userRole: UserRole | null;
  children: ReactNode;
  permission?: Permission;
  permissions?: Permission[];
  requireAll?: boolean;
  fallback?: ReactNode;
  showError?: boolean;
}

export function PermissionGuard({
  userRole,
  children,
  permission,
  permissions = [],
  requireAll = false,
  fallback,
  showError = true,
}: PermissionGuardProps) {

  // Combine single permission with permissions array
  const allPermissions = permission
    ? [permission, ...permissions]
    : permissions;

  // Check permissions based on requireAll flag
  const hasAccess = requireAll
    ? PermissionService.hasPermission(userRole, allPermissions)
    : PermissionService.hasPermission(userRole, allPermissions);

  if (!hasAccess) {
    if (fallback) {
      return <>{fallback}</>;
    }

    if (showError) {
      return (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You don't have permission to access this feature.
          </AlertDescription>
        </Alert>
      );
    }

    return null;
  }

  return <>{children}</>;
}
