import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authApi } from "../api/authApi";
import { IUser } from "../api/types";
import TwoFactorAuth from "../components/TwoFactorAuth";
import useStore from "../store";
import { twMerge } from "tailwind-merge";
import AccountSetting from "../components/AccountSetting";
import AccountBlance from "../components/AccountBlance";
import MyActivites from "../components/MyActivities";


const styles = {
  menuLi:
    " whitespace-nowrap pb-5 pt-5 w-[260px] hover:text-white cursor-pointer",
};


const ProfilePage = () => {
  const [secret, setSecret] = useState({
    otpauth_url: "",
    base32: "",
  });
  const location=useLocation()
  const [menuActive, setmenuActive] = useState(0);
 
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const store = useStore();
  const user = store.authUser;

  const generateQrCode = async ({
    user_id,
    email,
  }: {
    user_id: string;
    email: string;
  }) => {
    try {
      store.setRequestLoading(true);
      const response = await authApi.post<{
        otpauth_url: string;
        base32: string;
      }>("/auth/otp/generate", { user_id, email });
      store.setRequestLoading(false);

      if (response.status === 200) {
        setOpenModal(true);
        console.log({
          base32: response.data.base32,
          otpauth_url: response.data.otpauth_url,
        });
        setSecret({
          base32: response.data.base32,
          otpauth_url: response.data.otpauth_url,
        });
      }
    } catch (error: any) {
      store.setRequestLoading(false);
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

  const disableTwoFactorAuth = async (user_id: string) => {
    try {
      store.setRequestLoading(true);
      const {
        data: { user },
      } = await authApi.post<{
        otp_disabled: boolean;
        user: IUser;
      }>("/auth/otp/disable", { user_id });
      store.setRequestLoading(false);
      // store.setAuthUser(user);
      toast.warning("Two Factor Authentication Disabled", {
        position: "top-right",
      });
    } catch (error: any) {
      store.setRequestLoading(false);
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(resMessage, {
        position: "top-right",
      });
    }
  };

 
  
  useEffect(() => {
    if(location?.state?.menuid){
      setmenuActive(location?.state?.menuid)
    }
    if (!store.authUser) {
      navigate("/login");
    }
  }, [store.authUser]);

  return (
    <>
      <section className="bg-main-dark-600  min-h-screen pt-10 text-white">
        <div className=" font-bold text-4xl pl-40 pb-10 border-b border-white/10">
          My Account
        </div>
        <div className="flex mt-10 w-screen ">
          <div className="ml-40 w-[260px]">
            <ul className=" font-bold text-[#777E90] text-sm w-[260]">
              <li
                className={twMerge(
                  styles.menuLi,
                  `border-b border-[#353945] pt-0 ${
                    menuActive == 0 ? "text-white" : "text-inherit"
                  }`
                )}
                onClick={() => setmenuActive(0)}
              >
                <div className="flex items-center">
                  <img className="mr-2" src="/assets/icon-safe.svg" alt="" />
                  Account Settings
                </div>
              </li>
              <li
                className={twMerge(
                  styles.menuLi,
                  `${menuActive == 1 ? " text-white" : "text-inherit"}`
                )}
                onClick={() => setmenuActive(1)}
              >
                <div className="flex items-center">
                  <img className="mr-2" src="/assets/icon-wallet.svg" alt="" />
                  Account Balance
                </div>
              </li>
              <li
                className={twMerge(
                  styles.menuLi,
                  `${menuActive == 2 ? " text-white" : "text-inherit"}`
                )}
                onClick={() => setmenuActive(2)}
              >
                <div className="flex items-center">
                  <img className="mr-2" src="/assets/icon-receipt.svg" alt="" />
                  My Activities
                </div>
              </li>
            </ul>
          </div>
          <div className=" ml-[96px] mb-16 mr-2 flex-1 min-h-[calc(100vh-170px)]">
            {menuActive == 0 ? (
              <AccountSetting />
            ) : menuActive == 1 ? (
              <AccountBlance setmenuActive={setmenuActive}/>
            ) : (
              <MyActivites />
            )}
          </div>
        </div>
      </section>
    </>
    // <>
    //   <section className="bg-main-dark-600  min-h-screen pt-10">
    //     <div className="max-w-4xl p-12 mx-auto bg-ct-dark-100 rounded-md h-[20rem] flex gap-20 justify-center items-start">
    //       <div className="flex-grow-2">
    //         <h1 className="text-2xl font-semibold">Profile Page</h1>
    //         <div className="mt-8">
    //           <p className="mb-4">ID: {user?.id}</p>
    //           <p className="mb-4">Name: {user?.name}</p>
    //           <p className="mb-4">Email: {user?.email}</p>
    //         </div>
    //       </div>
    //       <div>
    //         <h3 className="text-2xl font-semibold">
    //           Mobile App Authentication (2FA)
    //         </h3>
    //         <p className="mb-4">
    //           Secure your account with TOTP two-factor authentication.
    //         </p>
    //         {store.authUser?.otp_enabled ? (
    //           <button
    //             type="button"
    //             className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
    //             onClick={() => disableTwoFactorAuth(user?.id!)}
    //           >
    //             Disable 2FA
    //           </button>
    //         ) : (
    //           <button
    //             type="button"
    //             className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
    //             onClick={() =>
    //               generateQrCode({ user_id: user?.id!, email: user?.email! })
    //             }
    //           >
    //             Setup 2FA
    //           </button>
    //         )}
    //       </div>
    //     </div>
    //   </section>
    //   {openModal && (
    //     <TwoFactorAuth
    //       base32={secret.base32}
    //       otpauth_url={secret.otpauth_url}
    //       user_id={store.authUser?.id!}
    //       closeModal={() => setOpenModal(false)}
    //     />
    //   )}
    // </>
  );
};

export default ProfilePage;
