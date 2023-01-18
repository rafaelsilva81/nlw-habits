import Image from "next/image";
import React from "react";
import logo from "../assets/logo.svg";

const Branding = () => {
  return (
    <div className="flex flex-col justify-center gap-1">
      <Image src={logo} alt="Logo" className="w-24" />
      <h1 className="text-2xl font-bold text-white md:text-4xl">habits</h1>
    </div>
  );
};

export default Branding;
