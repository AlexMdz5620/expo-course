import { productsApi } from "@/core/api/productsApi";
import { isAxiosError } from "axios";
import { User } from "../interfaces/user";

export interface AuthResponse {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
  token: string;
}

const returnUserToken = (
  data: AuthResponse,
): {
  user: User;
  token: string;
} => {
  const { token, ...user } = data;
  return {
    user,
    token,
  };
};

export const authLogin = async (email: string, password: string) => {
  email = email.toLowerCase();
  try {
    const { data } = await productsApi.post<AuthResponse>("/auth/login", {
      email,
      password,
    });

    return returnUserToken(data);
  } catch (error) {
    // if (isAxiosError(error)) {
    //   const message = error.response?.data?.message || "Error en el servidor";
    //   throw message;
    // }
    console.log(error);
    // throw "Fallo de conexión no controlado";
    return null;
  }
};

export const authRegister = async (
  fullName: string,
  email: string,
  password: string,
) => {
  email = email.toLowerCase();
  try {
    const { data } = await productsApi.post<AuthResponse>("/auth/register", {
      fullName,
      email,
      password,
    });

    return returnUserToken(data);
  } catch (error) {
    if (isAxiosError(error)) {
      const message = error.response?.data?.message || "Error en el servidor";
      throw message;
    }
    console.log(error);
    throw "Fallo de conexión no controlado";
  }
};

export const authCheckStatus = async () => {
  try {
    const { data } = await productsApi.get<AuthResponse>("/auth/check-status");
    return returnUserToken(data);
  } catch (error) {
    // if (isAxiosError(error)) {
    //   const message = error.response?.data?.message || "Error en el servidor";
    //   throw message;
    // }
    console.log(error);
    // throw "Fallo de conexión no controlado";
    return null;
  }
};
