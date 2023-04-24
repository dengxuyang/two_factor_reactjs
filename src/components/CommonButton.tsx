import React, { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type LoadingButtonProps = {
  btnColor?: string;
  textColor?: string;
  btnHight?:string;
  constomStyle?:string;
  children: React.ReactNode;
 
};

export const CommonButton: React.FC<
  LoadingButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
> = ({ textColor = "text-white", btnColor = "bg-[#EC6E72]",btnHight="h-8 ",constomStyle, children, ...rest }) => {
  return (
    <button
      className={twMerge(
        `btn normal-case  h-8 min-h-[1rem] min-w-[90px] w-full py-2 font-semibold  rounded-3xl outline-none border-none flex justify-center bg-gradient-to-b  hover:from-[#F29A9D] hover:to-[#AE6FFF]`,
        `${btnColor}`,
        `${btnHight}`,
        `${constomStyle}`
      )}
      {...rest}
    >
      <span className={twMerge(`text-[14px] font-bold`, `${textColor}`)}>
        {children}
      </span>
    </button>
  );
};
