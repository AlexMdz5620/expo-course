import {
  authCheckStatus,
  authLogin,
  authRegister,
} from "@/core/auth/actions/auth-actions";
import { User } from "@/core/auth/interfaces/user";
import { SecureStorageAdapter } from "@/helpers/adapters/secure-storage.adapter";
import { create } from "zustand";

export type AuthStatus = "authenticated" | "unauthenticated" | "checking";

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  changeStatus: (token?: string, user?: User) => Promise<boolean>;

  login: (email: string, password: string) => Promise<boolean>;
  register: (
    fullName: string,
    email: string,
    password: string,
  ) => Promise<boolean>;
  logout: () => Promise<void>;
  checkStatus: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  status: "checking",
  token: undefined,
  user: undefined,

  // Actions de Zustand || Methods
  changeStatus: async (token?: string, user?: User) => {
    if (!token || !user) {
      set({ status: "unauthenticated", token: undefined, user: undefined });
      get().logout();
      return false;
    }

    set({ status: "authenticated", token, user });

    await SecureStorageAdapter.setItem("tokne", token);
    return true;
  },

  login: async (email: string, password: string) => {
    const res = await authLogin(email, password);

    return get().changeStatus(res?.token, res?.user);
  },

  register: async (fullName: string, email: string, password: string) => {
    const res = await authRegister(fullName, email, password);
    return get().changeStatus(res.token, res.user);
  },

  logout: async () => {
    SecureStorageAdapter.deleteItem("token");
    set({ status: "unauthenticated", token: undefined, user: undefined });
  },

  checkStatus: async () => {
    const res = await authCheckStatus();

    get().changeStatus(res?.token, res?.user);
  },
}));
