import Image from "next/image";
import React from "react";
import logo from "../../assets/logo.svg";

const FullscreenLoader = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2">
      <Image
        src={logo}
        alt="Logo"
        width={300}
        height={300}
        className="animate-pulse"
      />
      <span className="text-lg font-bold text-gray-400">
        One step each day...
      </span>
    </div>
  );
};

export default FullscreenLoader;
