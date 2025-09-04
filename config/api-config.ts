import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export const ENDPOINTS = {
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    logout: "/auth/logout",
  },

  user: {
    getUser: (id: string) => `/users/${id}`,
  },

  restaurant: {
    getAll: "/restaurants",
    getMenuItems: (restaurantId: string) =>
      `/restaurants/${restaurantId}/menu-items`,
  },

  order: {
    createOrder: "/orders",
    getOrders: "/orders",
    getOrderItems: (id: string) => `/orders/${id}`,
    orderCheckout: (id: string) => `/orders/${id}/checkout`,
    cancelOrder: (id: string) => `/orders/${id}/cancel`,
  },

  paymentMethod: {
    getMethods: "/payment-methods",
    createMethod: "/payment-methods",
    updateMethod: (id: string) => `/payment-methods/${id}`,
    deleteMethod: (id: string) => `/payment-methods/${id}`,
  },
};
