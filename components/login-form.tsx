"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";

import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { LoginFormData } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { useLogin } from "@/hooks/auth/mutation";
import { formatAxiosError } from "@/lib/format-axios-error";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const { toast } = useToast();

  const router = useRouter();
  const { mutate: registerUser, isPending: isLoading } = useLogin();

  const onSubmit = async (data: LoginFormData) => {
    registerUser(data, {
      onSuccess: (response) => {
        Cookies.set("access-token", response.data.accessToken, {
          expires: 1 / 24,
          sameSite: "strict",
        });

        toast({
          title: "Login Successful",
          description: `Welcome back, ${response.data.user.email}`,
          variant: "success",
        });

        router.replace("/");
      },
      onError: (error) => {
        const formattedMessage = formatAxiosError(error);

        toast({
          title: "Login Failed",
          description: formattedMessage,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            SLOOZE Food Ordering
          </CardTitle>
          <CardDescription>
            Sign in to access the food ordering system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            {errors.root && (
              <Alert variant="destructive">
                <AlertDescription>{errors.root.message}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-primary hover:underline font-medium"
              >
                Register here
              </Link>
            </p>
          </div>
          <div className="mt-6 text-sm text-muted-foreground">
            <p className="font-medium mb-2">Demo Accounts:</p>
            <div className="space-y-1 text-xs">
              <p>
                <strong>Admin:</strong> nickfury@gmail.com
              </p>
              <p>
                <strong>Manager (India):</strong> captainmarvel@gmail.com
              </p>
              <p>
                <strong>Manager (America):</strong> captainamerica@gmail.com
              </p>
              <p>
                <strong>Member (India):</strong> thanos@shield.com
              </p>
              <p>
                <strong>Member (India):</strong> thor@gmail.com
              </p>
              <p>
                <strong>Member (America):</strong> travis@gmail.com
              </p>
              <p>
                <strong>Password:</strong> 12345678
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
