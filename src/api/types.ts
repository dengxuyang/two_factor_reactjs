import { string } from "zod";

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
export interface ActivityInfo {
  code: number;
  data: {
    count: number;
    activities: {
      uid: number;
      symbol: string;
      bill_type: number;
      change_amount: number;
      result_amount: number;
      ts: number;
    }[];
  };
  msg: string;
}

export interface WithdrawSetting {
  code: number;
  data: {
    address_his: {
      address: string;
      chain: string;
      type: string;
      symbol: string;
    }[];
    fee_list: { fee: string; chain: string; type: string; symbol: string }[];
  };
  msg: string;
}
export interface PublicProject {
  code: number;
  data: {
    count: number;
    projects: {
      id: number;
      name: string;
      comment: string;
      start_ts: number;
      end_ts: number;
      ticket_total: number;
      ticket_price: number;
      ticket_process: number;
      earn: number;
      chain_name: string;
      status: number;
    }[];
  };
  msg: string;
}
export interface Projectdetail {
  code: number;
  msg: string;
  data: {
    id: number;
    name: string;
    comment: string;
    start_ts: number;
    end_ts: number;
    ticket_total: number;
    ticket_price: number;
    ticket_process: number;
    earn: number;
    chain_name: string;
    status: number;
    user_ticket: number;
    user_earn: number;
  };
}
export interface ProjectEarn {
  code: number;
  data: {
    count: number;
    project_earn: {
      token: number;
      total_value: string;
      price: string;
      token_amount: number;
      total_address: number;
      average: number;
      social: string[];
    }[];
  };
  msg: string;
}