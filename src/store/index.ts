import {create} from "zustand";
import { persist } from 'zustand/middleware'
import { AccountInfo, AssetsInfo, CurrentAccount, IUser, IUserResponse } from "../api/types";

type Store = {
  authUser: IUserResponse | null;
  requestLoading: boolean;
  token: string;
  account:CurrentAccount | null;
  userAssets:AssetsInfo |null
  userSetting: AccountInfo|null
  setAuthUser: (user: IUserResponse | null) => void;
  setRequestLoading: (isLoading: boolean) => void;
  setToken: (account: string) => void;
  setAccount: (user: CurrentAccount | null) => void;
  setUserAssets:(assets: AssetsInfo | null) => void;
  setUserSetting:(usesetting: AccountInfo | null) => void;
};



const useStore = create(
  persist<Store>(
    (set) => ({
      authUser: null,
      requestLoading: false,
      token: "",
      account:null,
      userAssets:null,
      userSetting:null,
      setAuthUser: (user) => set((state) => ({ ...state, authUser: user })),
      setRequestLoading: (isLoading) =>
      set((state) => ({ ...state, requestLoading: isLoading })),
      setToken: (token) => set((state) => ({ ...state, token: token })),
      setAccount:(account) => set((state) => ({ ...state, account: account })),
      setUserAssets:(assets) => set((state) => ({ ...state, userAssets: assets })),
      setUserSetting:(usesetting) => set((state) => ({ ...state, userSetting: usesetting })),
    })
    ,{ name: 'my-zustand-store',}
  )
);

export default useStore;
