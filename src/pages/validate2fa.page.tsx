import { object, string, TypeOf } from "zod";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "../components/LoadingButton";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../store";
import { authApi } from "../api/authApi";
import VerificationCode from "../components/VerificationCode";




const styles = {
  inputField: `form-control block w-full px-4 py-4 text-sm text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`,
};

const validate2faSchema = object({
  token: string().min(1, "Authentication code is required"),
});

export type Validate2faInput = TypeOf<typeof validate2faSchema>;

const Validate2faPage = () => {
  const navigate = useNavigate();
  const store = useStore();

  const {
    handleSubmit,
    setFocus,
    register,
    formState: { errors },
  } = useForm<Validate2faInput>({
    resolver: zodResolver(validate2faSchema),
  });

  const validate2fa = async (token: string) => {
    try {
      store.setRequestLoading(true);
      const {
        data: { otp_valid },
      } = await authApi.post<{ otp_valid: boolean }>("/auth/otp/validate", {
        token,
        // user_id: store.authUser?.id,
      });
      store.setRequestLoading(false);
      if (otp_valid) {
        navigate("/");
      } else {
        navigate("/login");
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

  const onSubmitHandler: SubmitHandler<Validate2faInput> = (values) => {
    validate2fa(values.token);
  };

  useEffect(() => {
    setFocus("token");
  }, [setFocus]);

  useEffect(() => {
    if (!store.account) {
      navigate("/login");
    }
  }, []);

  return (
    <section className="bg-main-dark-600 min-h-screen">
      <div className="w-full flex">
        <div
          className="w-[350px] h-screen bg-cover"
          style={{ backgroundImage: `url(/assets/bg-longin.png)` }}
        >
          <div className="flex items-center ml-[30px] mt-[30px]">
            <img src="/assets/logo-copilot.svg" alt="" />
            <span className="text-white ml-3 font-medium text-[26px]">
              COPILOT
            </span>
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex items-center ml-[30px] mt-[30px] cursor-pointer" onClick={()=>navigate('/login')}>
            <img src="/assets/icon-shape.png" alt="" />
            <span className="text-white ml-6 font-bold text-[26px]">Back</span>
          </div>
          <div className="text-white h-full flex justify-center items-center">
            <div className=" max-w-[380]">
              <h2 className="text-center leading-[1] mb-4 font-bold text-white text-[40px] 、">
                Your Google
              </h2>
              <h2 className="text-center leading-[1] mb-4 font-bold text-white text-[40px] 、">
                verification code
              </h2>
              <div className=" text-[14px] text-[#777E90] text-center mt-2 mb-1">Enter the 6-digit code from Google Authenticator</div>
              <VerificationCode />
            </div>
            
          </div>
        </div>
      </div>
    </section>
    // <section className="bg-main-dark-600 min-h-screen grid place-items-center">
    //   <div className="w-full">
    //     <h1 className="text-4xl lg:text-6xl text-center font-[600] text-ct-yellow-600 mb-4">
    //       Welcome Back
    //     </h1>
    //     <h2 className="text-lg text-center mb-4 text-ct-dark-200">
    //       Verify the Authentication Code
    //     </h2>
    //     <form
    //       onSubmit={handleSubmit(onSubmitHandler)}
    //       className="max-w-md w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-2xl p-8 space-y-5"
    //     >
    //       <h2 className="text-center text-3xl font-semibold text-[#142149]">
    //         Two-Factor Authentication
    //       </h2>
    //       <p className="text-center text-sm">
    //         Open the two-step verification app on your mobile device to get your
    //         verification code.
    //       </p>
    //       <input
    //         {...register("token")}
    //         className={styles.inputField}
    //         placeholder="Authentication Code"
    //       />
    //       <p className="mt-2 text-xs text-red-600">
    //         {errors.token ? errors.token.message : null}
    //       </p>

    //       <LoadingButton
    //         loading={store.requestLoading}
    //         textColor="text-ct-blue-600"
    //       >
    //         Authenticate
    //       </LoadingButton>
    //       <span className="block text-center">
    //         <Link to="/login" className="text-ct-blue-600">
    //           Back to basic login
    //         </Link>
    //       </span>
    //     </form>
    //   </div>
    // </section>
  );
};

export default Validate2faPage;
