import React from "react";
import { twMerge } from "tailwind-merge";
import Spinner from "./Spinner";

type LoadingButtonProps = {
  loading: boolean;
  btnColor?: string;
  textColor?: string;
  children: React.ReactNode;
};

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  textColor = "text-white",
  btnColor = "bg-ct-yellow-600",
  children,
  loading = false,
}) => {
  return (
    <button
      type="submit"
      className={twMerge(
        `btn h-10 min-h-[1rem] w-full py-2 font-semibold  rounded-3xl outline-none border-none flex justify-center bg-gradient-to-b  hover:from-[#F29A9D] hover:to-[#AE6FFF]`,
        `${btnColor} ${loading && "bg-[#ccc]"}`
      )}
    >
      {loading ? (
        <div className="flex items-center gap-3">
          <Spinner />
          <span className="text-slate-500 inline-block">Loading...</span>
        </div>
      ) : (
        <span className={twMerge(`text-[16px] font-medium`, `${textColor}`)}>
          {children}
        </span>
      )}
    </button>
  );
};
