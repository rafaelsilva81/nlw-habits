import React, { FormEvent, MouseEventHandler, PropsWithChildren } from "react";

const Button = ({
  children,
  onClick,
}: PropsWithChildren<{ onClick?: MouseEventHandler }>) => {
  return (
    <button
      onClick={onClick}
      className="
      font-sembold flex items-center justify-center gap-2 rounded-lg border border-violet-500 p-2 px-3
      text-sm transition duration-200
      ease-in-out
      hover:bg-violet-800
      active:opacity-50
      md:text-lg
      "
    >
      {children}
    </button>
  );
};

export default Button;
