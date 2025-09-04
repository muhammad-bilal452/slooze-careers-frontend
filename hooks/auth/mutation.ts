import { axiosInstance, ENDPOINTS } from "@/config/api-config";
import { LoginFormData, RegisterFormData } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: RegisterFormData) => {
      const response = await axiosInstance.post(ENDPOINTS.auth.register, data);
      return response.data;
    },
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginFormData) => {
      const response = await axiosInstance.post(ENDPOINTS.auth.login, data);
      return response.data;
    },
  });
};
