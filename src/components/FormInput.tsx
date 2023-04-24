import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

type FormInputProps = {
  label: string;
  name: string;
  type?: string;
};

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = "text",
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const [togglePW, setTogglePW] = useState<boolean>(true);
  return (
    <div className="">
      <label htmlFor={name} className="block text-sm font-bold text-white mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type={!togglePW?'text':type}
          placeholder=" "
          className="block w-full bg-inherit border-2 border-[#353945] focus:border-[#777E91]  rounded-xl appearance-none focus:outline-none py-2 px-4"
          {...register(name)}
        />
        {type == "password" && (
          <div className="absolute right-2 top-1/2 cursor-pointer w-[30px] h-[30px] translate-y-[-50%] flex justify-center items-center" onClick={()=>{setTogglePW(!togglePW)}}>
            {!togglePW ? (
              <img src="/assets/icon-showPassword.png" alt="" />
            ) : (
              <img src="/assets/icon-hidePassword.png" alt="" />
            )}
          </div>
        )}
      </div>

      {errors[name] && (
        <span className="text-red-500 text-xs pt-1 block">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};

export default FormInput;
