export enum UserRole {
  MEMBER = "member",
  ADMIN = "admin",
  MANAGER = "manager",
}

export enum OrderStatus {
  PENDING = "pending",
  PLACED = "placed",
  CANCELLED = "cancelled",
}

export enum PaymentType {
  CREDIT_CARD = "Credit Card",
  UPI = "UPI",
  PAYPAL = "Paypal",
  NET_BANKING = "Net Banking",
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  country: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Restaurant {
  id: string;
  name: string;
  country: string;
  menuItems: MenuItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  restaurant: Restaurant;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  user: User;
  restaurant: Restaurant;
  items: OrderItem[];
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  menuItem: MenuItem;
  order: Order;
  quantity: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentMethod {
  id: string;
  type: PaymentType;
  details: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  country: string;
  role: UserRole;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface Response<T> {
  status: string;
  message: string;
  data: T;
}

export interface DecodedToken {
  sub: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export interface CreateOrder {
  restaurantId: string;
  items: {
    menuItemId: string;
    quantity: number;
  }[];
  paymentMethodId?: string;
}

export interface CreatePaymentMethod {
  type: PaymentType;
  details: string;
}

export interface UpdatePaymentMethod {
  type?: PaymentType;
  details?: string;
}