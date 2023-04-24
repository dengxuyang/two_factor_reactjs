import { CommonButton } from "./CommonButton";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import QRCode from "qrcode";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { LoginInput } from "../pages/login.page";
import { useEffect, useState } from "react";
import CopyHelper from "./Copy";
import FormInput from "./FormInput";
import useStore from "../store";
import { toast } from "react-toastify";
import { tokenApi } from "../api/authApi";
import { AccountInfo, DefRes, TotpKey } from "../api/types";

const loginSchema = object({
  email: string()
    .min(1, "Email address is required")
    .email("Email Address is invalid"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});
function AccountSetting() {
  const [showItem, setShowItem] = useState("mainPage");
  const [accountInfo, setAccountInfo] = useState<AccountInfo>();
  const [totpKey, setTotpKey] = useState<TotpKey>();
  const [qrcodeUrl, setqrCodeUrl] = useState("");
  const [privateKey, setprivateKey] = useState("");
  const store = useStore();
  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });
  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);
  const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
    // loginUser(values);
  };
  const getUserSetting = async () => {
    try {
      const { data: account } = await tokenApi.post<AccountInfo>(
        "/api/userSetting",
        {}
      );
      if (account.code === 0) {
        console.log(account.data);
        setAccountInfo(account);
      } else {
        toast.error(account.msg, {
          position: "top-right",
        });
      }
    } catch (error: any) {
      // store.setRequestLoading(false);
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.response.data.detail ||
        error.message ||
        error.toString();
      toast.error(resMessage, {
        position: "top-right",
      });
    }
  };
  const get2faKey = async () => {
    try {
      const { data: totp } = await tokenApi.post<TotpKey>("/api/getTotp", {});
      if (totp.code === 0) {
        setTotpKey(totp);
        QRCode.toDataURL(totp.data.qr_code).then(setqrCodeUrl);
      } else {
        toast.error(totp.msg, {
          position: "top-right",
        });
      }
    } catch (error: any) {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.response.data.detail ||
        error.message ||
        error.toString();
      toast.error(resMessage, {
        position: "top-right",
      });
    }
  };
  const handleToEnble2FA = () => {
    setShowItem("enable2FA");
    get2faKey();
  };
  const handleEnble2FA = async () => {
    try {
      const { data: status } = await tokenApi.post<DefRes>("/api/updateUserTotp", {
        key:totpKey?.data.secret,
        totp:privateKey
      });
      if (status.code === 0) {
        await getUserSetting()
        setShowItem("mainPage")
      } else {
        toast.error(status.msg, {
          position: "top-right",
        });
      }
    } catch (error: any) {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.response.data.detail ||
        error.message ||
        error.toString();
      toast.error(resMessage, {
        position: "top-right",
      });
    }
  };
  useEffect(() => {
    getUserSetting();
  }, []);

  return (
    <div>
      {showItem == "mainPage" ? (
        <div className="bg-[#242529] w-full max-w-[748px] rounded-2xl px-[46px] py-10">
          <div className="font-bold text-2xl">Account Settings</div>
          <div className=" text-xs font-bold text-[#777E90] mt-10 pb-5 border-b border-[#353945]">
            Profile
          </div>
          <div className="mt-[30px] flex justify-between">
            <span className="text-xs font-bold">Username</span>
            <span className="text-xs text-[#777E90]">
              {accountInfo?.data.name}
            </span>
          </div>
          <div className=" mt-[30px] flex justify-between">
            <span className="text-xs font-bold">Address (TRC-20) </span>
            <span className=" cursor-pointer">
              <CopyHelper
                className="text-base-900"
                toCopy={accountInfo?.data.address_list[1].address || ""}
              >
                <span className="text-xs text-[#777E90]">
                  {hideAddress(accountInfo?.data.address_list[1].address || "")}
                </span>
              </CopyHelper>
            </span>
          </div>
          <div className=" mt-[30px] flex justify-between">
            <span className="text-xs font-bold">Address (ERC-20) </span>
            <span className=" cursor-pointer">
              <CopyHelper
                className="text-base-900"
                toCopy={accountInfo?.data.address_list[0].address || ""}
              >
                <span className="text-xs text-[#777E90]">
                  {hideAddress(accountInfo?.data.address_list[0].address || "")}
                </span>
              </CopyHelper>
            </span>
          </div>
          <div className=" text-xs font-bold text-[#777E90] mt-10 pb-5 border-b border-[#353945]">
            Security
          </div>
          <div className="mt-[30px] flex justify-between">
            <span className="text-xs font-bold">Password</span>
            <span className="text-xs text-[#777E90]">
              <CommonButton onClick={() => setShowItem("changPW")}>
                Change
              </CommonButton>
            </span>
          </div>
          <div className="mt-[30px] flex justify-between">
            <span className="text-xs font-bold">2FA Authentication</span>
            <span className="text-xs text-[#777E90] cursor-pointer">
              {accountInfo?.data.totp_enable ? (
                <svg
                  width="100"
                  height="24"
                  viewBox="0 0 100 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="21" cy="12" r="10" fill="#2DAB50" />
                  <path
                    d="M16.1992 11.7318L20.3659 15.4818L26.1992 8.39844"
                    stroke="white"
                    stroke-width="2"
                  />
                  <path
                    d="M43.646 8.558V11.414H47.006V12.716H43.646V15.698H47.426V17H42.05V7.256H47.426V8.558H43.646ZM53.2838 9.16C53.8905 9.16 54.4318 9.286 54.9078 9.538C55.3931 9.79 55.7711 10.1633 56.0418 10.658C56.3125 11.1527 56.4478 11.75 56.4478 12.45V17H54.8658V12.688C54.8658 11.9973 54.6931 11.47 54.3478 11.106C54.0025 10.7327 53.5311 10.546 52.9338 10.546C52.3365 10.546 51.8605 10.7327 51.5058 11.106C51.1605 11.47 50.9878 11.9973 50.9878 12.688V17H49.3918V9.286H50.9878V10.168C51.2491 9.85067 51.5805 9.60333 51.9818 9.426C52.3925 9.24867 52.8265 9.16 53.2838 9.16ZM57.9516 13.108C57.9516 12.3333 58.1103 11.6473 58.4276 11.05C58.7543 10.4527 59.1929 9.99067 59.7436 9.664C60.3036 9.328 60.9196 9.16 61.5916 9.16C62.1983 9.16 62.7256 9.28133 63.1736 9.524C63.6309 9.75733 63.9949 10.0513 64.2656 10.406V9.286H65.8756V17H64.2656V15.852C63.9949 16.216 63.6263 16.5193 63.1596 16.762C62.6929 17.0047 62.1609 17.126 61.5636 17.126C60.9009 17.126 60.2943 16.958 59.7436 16.622C59.1929 16.2767 58.7543 15.8007 58.4276 15.194C58.1103 14.578 57.9516 13.8827 57.9516 13.108ZM64.2656 13.136C64.2656 12.604 64.1536 12.142 63.9296 11.75C63.7149 11.358 63.4303 11.0593 63.0756 10.854C62.7209 10.6487 62.3383 10.546 61.9276 10.546C61.5169 10.546 61.1343 10.6487 60.7796 10.854C60.4249 11.05 60.1356 11.344 59.9116 11.736C59.6969 12.1187 59.5896 12.576 59.5896 13.108C59.5896 13.64 59.6969 14.1067 59.9116 14.508C60.1356 14.9093 60.4249 15.2173 60.7796 15.432C61.1436 15.6373 61.5263 15.74 61.9276 15.74C62.3383 15.74 62.7209 15.6373 63.0756 15.432C63.4303 15.2267 63.7149 14.928 63.9296 14.536C64.1536 14.1347 64.2656 13.668 64.2656 13.136ZM69.5679 10.434C69.8385 10.0607 70.2072 9.75733 70.6739 9.524C71.1499 9.28133 71.6772 9.16 72.2559 9.16C72.9372 9.16 73.5532 9.32333 74.1039 9.65C74.6545 9.97667 75.0885 10.4433 75.4059 11.05C75.7232 11.6473 75.8819 12.3333 75.8819 13.108C75.8819 13.8827 75.7232 14.578 75.4059 15.194C75.0885 15.8007 74.6499 16.2767 74.0899 16.622C73.5392 16.958 72.9279 17.126 72.2559 17.126C71.6585 17.126 71.1265 17.0093 70.6599 16.776C70.2025 16.5427 69.8385 16.244 69.5679 15.88V17H67.9719V6.64H69.5679V10.434ZM74.2579 13.108C74.2579 12.576 74.1459 12.1187 73.9219 11.736C73.7072 11.344 73.4179 11.05 73.0539 10.854C72.6992 10.6487 72.3165 10.546 71.9059 10.546C71.5045 10.546 71.1219 10.6487 70.7579 10.854C70.4032 11.0593 70.1139 11.358 69.8899 11.75C69.6752 12.142 69.5679 12.604 69.5679 13.136C69.5679 13.668 69.6752 14.1347 69.8899 14.536C70.1139 14.928 70.4032 15.2267 70.7579 15.432C71.1219 15.6373 71.5045 15.74 71.9059 15.74C72.3165 15.74 72.6992 15.6373 73.0539 15.432C73.4179 15.2173 73.7072 14.9093 73.9219 14.508C74.1459 14.1067 74.2579 13.64 74.2579 13.108ZM79.0562 6.64V17H77.4602V6.64H79.0562ZM88.2216 12.954C88.2216 13.2433 88.2029 13.5047 88.1656 13.738H82.2716C82.3182 14.354 82.5469 14.8487 82.9576 15.222C83.3682 15.5953 83.8722 15.782 84.4696 15.782C85.3282 15.782 85.9349 15.4227 86.2896 14.704H88.0116C87.7782 15.4133 87.3536 15.9967 86.7376 16.454C86.1309 16.902 85.3749 17.126 84.4696 17.126C83.7322 17.126 83.0696 16.9627 82.4816 16.636C81.9029 16.3 81.4456 15.8333 81.1096 15.236C80.7829 14.6293 80.6196 13.9293 80.6196 13.136C80.6196 12.3427 80.7782 11.6473 81.0956 11.05C81.4222 10.4433 81.8749 9.97667 82.4536 9.65C83.0416 9.32333 83.7136 9.16 84.4696 9.16C85.1976 9.16 85.8462 9.31867 86.4156 9.636C86.9849 9.95333 87.4282 10.4013 87.7456 10.98C88.0629 11.5493 88.2216 12.2073 88.2216 12.954ZM86.5556 12.45C86.5462 11.862 86.3362 11.3907 85.9256 11.036C85.5149 10.6813 85.0062 10.504 84.3996 10.504C83.8489 10.504 83.3776 10.6813 82.9856 11.036C82.5936 11.3813 82.3602 11.8527 82.2856 12.45H86.5556Z"
                    fill="#2DAB50"
                  />
                </svg>
              ) : (
                <CommonButton onClick={() => handleToEnble2FA()}>
                  Enable
                </CommonButton>
              )}
            </span>
          </div>
        </div>
      ) : showItem == "changPW" ? (
        <>
          <div className="bg-[#242529] w-full max-w-[748px] rounded-2xl px-[46px] py-10">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => setShowItem("mainPage")}
            >
              <img src="/assets/icon-shape.png" alt="" />
              <span className="text-white ml-6 font-bold text-2xl">
                Change Password
              </span>
            </div>
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmitHandler)}
                className="max-w-md w-full mt-9 mx-auto overflow-hidden space-y-5"
              >
                <FormInput label="Password" name="password" type="password" />
                <FormInput
                  label="Confirm password"
                  name="Confirm password"
                  type="password"
                />
                <CommonButton
                  onClick={() => setShowItem("chagePWSuccess")}
                  btnColor={"bg-[#EC6E72]"}
                  btnHight={"h-[46px]"}
                >
                  Change password
                </CommonButton>
              </form>
            </FormProvider>
          </div>
        </>
      ) : showItem == "chagePWSuccess" ? (
        <>
          <div className="bg-[#242529] w-full max-w-[748px] rounded-2xl px-[46px] py-10">
            <div className="flex items-center cursor-pointer">
              <span className="text-white ml-6 font-bold text-2xl">
                Change Password
              </span>
            </div>
            <div className="flex flex-col justify-center items-center p-16">
              <img src="/assets/icon-changPwSuccess.svg" alt="" />
              <span className="text-[#777E90] text-sm mt-10">
                Your new password has been set
              </span>
            </div>
            <CommonButton
              onClick={() => setShowItem("mainPage")}
              btnColor={"bg-[#EC6E72]"}
              btnHight={"h-[46px]"}
            >
              ok
            </CommonButton>
          </div>
        </>
      ) : showItem == "enable2FA" ? (
        <>
          <div className="bg-[#242529] w-full max-w-[748px] rounded-2xl px-[46px] py-10">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => setShowItem("mainPage")}
            >
              <img src="/assets/icon-shape.png" alt="" />
              <span className="text-white ml-6 font-bold text-2xl">
                2FA Authentication
              </span>
            </div>
            <div className="text-[#777E90] text-sm leading-6 pb-10 pt-3 border-b border-[#353945]">
              Google Authenticator is the application based on
              two-factorAuthentication(2FA). Setting up It adds an extra layer
              of security to all your stuff, such as withdrawal confirmations,
              password changes.
            </div>
            <div className="text-sm leading-6 pt-5">
              Add your private key in Google Authenticator and backup it
            </div>
            <div className="text-[#777E90] text-sm leading-6 ">
              You should open Google Authenticator app and scan the QR code
              below. Then manually enter the Private key to enable Google
              Authentication.
            </div>
            <div className="bg-[#353945] max-w-[296px] mx-auto rounded-t-3xl flex flex-col items-center py-8 mt-5">
              <div className="w-40 h-40 border-2 border-dashed border-[#EC6E72] rounded-xl flex justify-center items-center mb-6">
                <div className=" w-32 h-32 border-2  bg-white rounded-xl flex justify-center items-center p-3">
                  <img  src={qrcodeUrl} alt="" />
                </div>
              </div>
              <CopyHelper
                className="text-base-900"
                toCopy={totpKey?.data.secret || ""}
              >
                <span className="text-sm font-bold">
                  {hideAddress(totpKey?.data.secret || "")}
                </span>
              </CopyHelper>
              <div className="text-[#777E90] text-xs leading-[18px] text-center max-w-[200px] pb-3 pt-3 border-b border-[#353945]">
                If you are unable to scan the QR code, please enter this code
                manually into the app
              </div>
              <div className="mb-2">
                <img src="/assets/badge-ios.svg" alt="" />
              </div>
              <div>
                <img src="/assets/badge-google.svg" alt="" />
              </div>
            </div>
            <div className="border-t border-[#353945] mt-5 pt-3 mb-5">
              <label className="block text-sm font-bold text-white mb-2">
                Private key
              </label>
              <input
                type="text"
                placeholder="Enter Google 2FA Code"
                className="block w-full bg-inherit border-2 border-[#353945] focus:border-[#777E91]  rounded-xl appearance-none focus:outline-none py-2 px-4"
                value={privateKey}
                onChange={(e) => setprivateKey(e.target.value)}
              />
            </div>
            <CommonButton
              onClick={() =>handleEnble2FA()}
              btnColor={"bg-[#EC6E72]"}
              btnHight={"h-[46px]"}
            >
              Enable 2FA
            </CommonButton>
          </div>
        </>
      ) : null}
    </div>
  );
}
function hideAddress(address: string) {
  // 取号码的前三位和后四位
  const firstSix = address.slice(0, 6);
  const lastSix = address.slice(-6);

  // 将号码中间部分替换为星号
  // const middle = address.slice(3, -4).replace(/\d/g, "*");

  // 拼接隐藏后的号码并返回
  return `${firstSix}...${lastSix}`;
}
export default AccountSetting;
