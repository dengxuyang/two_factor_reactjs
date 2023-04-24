import { object, string, TypeOf } from "zod";
import { useEffect } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../components/FormInput";
import { LoadingButton } from "../components/LoadingButton";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useStore from "../store";
import { authApi, tokenApi } from "../api/authApi";
import { ILoginResponse, IUserResponse } from "../api/types";

const loginSchema = object({
  name: string().min(1, "UserName address is required"),
  // .email("UserName Address is invalid"),
  pass: string()
    .min(1, "Password is required")
    // .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export type LoginInput = TypeOf<typeof loginSchema> & { totp: string };

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const store = useStore();

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

  const loginUser = async (data: LoginInput) => {
    store.setAccount(data)
    data.totp = "";
    try {
      store.setRequestLoading(true);
      //login
      const { data: loginInfo } = await authApi.post<ILoginResponse>(
        "/api/signIn",
        data
      );
      console.log(loginInfo);
      if (loginInfo.code === 0) {
        store.setToken(loginInfo.data.token);
        //getuserinfo
        const { data: user } = await tokenApi.post<IUserResponse>(
          "/api/userInfo",
          {},
        );
        if (user.code === 0) {
          store.setAuthUser(user);
          // if (loginInfo.data.token) {
          //   navigate("/login/validateOtp");
          // } else {
          //   navigate("/profile");
          // }
          navigate("/profile");
        }  else {
          toast.error(user.msg, {
            position: "top-right",
          });
        }
      } else if (loginInfo.code === 2003) {
        navigate("/login/validateOtp");
      }else {
        toast.error(loginInfo.msg, {
          position: "top-right",
        });
      }
      store.setRequestLoading(false);
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

  const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
    loginUser(values);
  };

  return (
    <section className="bg-main-dark-600 min-h-screen">
      <div className="w-full flex">
        <div
          className="w-[350px] h-screen bg-cover"
          style={{ backgroundImage: `url(/assets/bg-longin.png)` }}
        >
          <div className="flex items-center ml-[30px] mt-[30px]">
            <img src="/assets/logo-capilot.png" alt="" />
            <span className="text-white ml-3 font-medium text-[26px]">
              CAPILOT
            </span>
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex items-center ml-[30px] mt-[30px] cursor-pointer">
            {/* <img src="/assets/icon-shape.png" alt="" />
            <span className="text-white ml-6 font-bold text-[26px]">Back</span> */}
          </div>
          <div className="text-white h-full flex justify-center items-center">
            <div className=" max-w-[380]">
              <h2 className=" text-center leading-[2] border-[#353945]  mb-4 font-bold text-white text-[40px] border-b-2">
                Sign in to Capilot
              </h2>
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmitHandler)}
                  className="max-w-md w-full  mx-auto overflow-hidden space-y-5"
                >
                  <FormInput label="Username" name="name" type="text" />
                  <FormInput label="Password" name="pass" type="password" />
                  {/* <div className="text-right">
                      <Link to="/forgotpassword" className="">
                        Forgot Password?
                      </Link>
                    </div> */}
                  <LoadingButton
                    loading={store.requestLoading}
                    btnColor={"bg-[#EC6E72]"}
                  >
                    Login
                  </LoadingButton>
                  {/* <span className="block">
                      Need an account?{" "}
                      <Link to="/register" className="text-ct-blue-600">
                        Sign Up Here
                      </Link>
                    </span> */}
                </form>
              </FormProvider>
            </div>
          </div>
        </div>
        {/* <h1 className="text-4xl lg:text-6xl text-center font-[600] text-ct-yellow-600 mb-4">
          Welcome Back
        </h1>
        <h2 className="text-lg text-center mb-4 text-ct-dark-200">
          Login to have access
        </h2>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="max-w-md w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-2xl p-8 space-y-5"
          >
            <FormInput label="Email" name="email" type="email" />
            <FormInput label="Password" name="password" type="password" />

            <div className="text-right">
              <Link to="/forgotpassword" className="">
                Forgot Password?
              </Link>
            </div>
            <LoadingButton
              loading={store.requestLoading}
              textColor="text-ct-blue-600"
            >
              Login
            </LoadingButton>
            <span className="block">
              Need an account?{" "}
              <Link to="/register" className="text-ct-blue-600">
                Sign Up Here
              </Link>
            </span>
          </form>
        </FormProvider> */}
      </div>
    </section>
  );
};

export default LoginPage;
