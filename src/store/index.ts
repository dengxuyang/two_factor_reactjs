import {create} from "zustand";
import { persist } from 'zustand/middleware'
import { CurrentAccount, IUser, IUserResponse } from "../api/types";

type Store = {
  authUser: IUserResponse | null;
  requestLoading: boolean;
  token: string;
  account:CurrentAccount | null;
  setAuthUser: (user: IUserResponse | null) => void;
  setRequestLoading: (isLoading: boolean) => void;
  setToken: (account: string) => void;
  setAccount: (user: CurrentAccount | null) => void;
};



const useStore = create(
  persist<Store>(
    (set) => ({
      authUser: null,
      requestLoading: false,
      token: "",
      account:null,
      setAuthUser: (user) => set((state) => ({ ...state, authUser: user })),
      setRequestLoading: (isLoading) =>
      set((state) => ({ ...state, requestLoading: isLoading })),
      setToken: (token) => set((state) => ({ ...state, token: token })),
      setAccount:(account) => set((state) => ({ ...state, account: account })),
    })
    ,{ name: 'my-zustand-store',}
  )
);

export default useStore;
