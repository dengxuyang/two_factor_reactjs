import React, {
  useState,
  useRef,
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useEffect,
} from "react";
import Spinner from "./Spinner";
import useStore from "../store";
import { LoginInput } from "../pages/login.page";
import { ILoginResponse, IUserResponse } from "../api/types";
import { toast } from "react-toastify";
import { authApi, tokenApi } from "../api/authApi";
import { useNavigate } from "react-router-dom";

const styles = {
  inputField:
    "border-[#353945] border rounded-md  h-[64px] w-[54px]  focus:bg-main-dark-600 bg-[#353945] outline-none text-center text-[20px]",
};

const VerificationCode = () => {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const store = useStore();
  const navigate = useNavigate();
  //verificationStatus defalut 1 loading 2 success 3
  const [verificationStatus, setveriFicationStatus] = useState(1);
  const focusInput = (index: number) => {
    if (inputRefs.current[index]) {
      inputRefs.current[index].focus();
    }
  };
  const loginUser = async (totp: string) => {
    const data = { ...store.account, totp };
    try {
      setveriFicationStatus(2);
      //login
      const { data: loginInfo } = await authApi.post<ILoginResponse>(
        "/api/signIn",
        data
      );

      if (loginInfo.code === 0) {
        store.setToken(loginInfo.data.token);
        //getuserinfo
        const { data: user } = await tokenApi.post<IUserResponse>(
          "/api/userInfo",
          {},
        );
        if (user.code === 0) {
          setveriFicationStatus(3);
          store.setAuthUser(user);
          // if (loginInfo.data.token) {
          //   navigate("/login/validateOtp");
          // } else {
          //   navigate("/profile");
          // }
          navigate("/dashboard");
        } else {
          toast.error(user.msg, {
            position: "top-right",
          });
          setveriFicationStatus(1);
        }
      } else {
        toast.error(loginInfo.msg, {
          position: "top-right",
        });
        setveriFicationStatus(1);
      }
      store.setRequestLoading(false);
    } catch (error: any) {
      store.setRequestLoading(false);
      setveriFicationStatus(1);
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
  const handleInput = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const input = event.target;
    if (input.value.length === 1) {
      focusInput(index + 1);
    }

    let allWrite = inputRefs.current
      .map((data: HTMLInputElement) => {
        return data.value && data.value;
      })
      .join("");
    console.log(allWrite);

    if (allWrite.length == 6) {
      loginUser(allWrite);
    }
  };

  const handleBackspace = (
    event: KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Backspace" && event.currentTarget.value === "") {
      focusInput(index - 1);
    }
  };
  useEffect(() => {
    focusInput(0);
  }, []);

  return (
    <div>
      <form className="flex gap-4">
        {[...Array(6)].map((_, index) => (
          <input
            key={index}
            className={styles.inputField}
            type="text"
            name={`code${index + 1}`}
            maxLength={1}
            required
            ref={(el) => (inputRefs.current[index] = el!)}
            onChange={(e) => handleInput(e, index)}
            onKeyDown={(e) => handleBackspace(e, index)}
          />
        ))}
      </form>
      <div className="flex justify-center items-center mt-4 h-3 ">
        {verificationStatus == 2 ? (
          <>
            <Spinner /> Pending...
          </>
        ) : verificationStatus == 3 ? (
          <>
            <img src="/assets/icon-vertifysuccess.svg" alt="" />
            <span className=" text-[#2DAB50] ml-2">Success</span>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default VerificationCode;
