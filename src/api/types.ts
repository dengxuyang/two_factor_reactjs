export interface IUser {
  id: string;
  name: string;
  email: string;
  otp_enabled: string;
}

export interface GenericResponse {
  status: string;
  message: string;
}

export interface ILoginResponse {
  code: number;
  data: { token: string };
  msg: string;
}

export interface IUserResponse {
  code: number;
  data: { name: string; signin_ip: string; signin_ts: number; last_ts: number };
  msg: string;
}
export interface SignOutResponse {
  code: number;
  data: { result: boolean };
  msg: string;
}

export interface CurrentAccount {
  name: string;
  pass: string;
}

export interface AccountInfo {
  code: number;
  data: {
    name: string;
    address_list: {
      address: string;
      chain: string;
      type: string;
      symbol: string;
    }[];
    totp_enable: boolean;
  };
  msg: string;
}
export interface AssetsInfo {
  code: number;
  data: {
    total_value: number;
    apy: number;
    available: number;
    earn: number;
    assets: {
      symbol: string;
      balance: string;
      available: string;
      freeze: string;
      earn: string;
    }[];
  };
  msg: string;
}

export interface TotpKey {
  code: number;
  data: { qr_code: string; secret: string };
  msg: string;
}
export interface DefRes {
  code: number;
  data: {};
  msg: string;
}
