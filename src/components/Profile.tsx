import { signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";

const Profile = ({ image, name }: { image: string; name: string }) => {
  return (
    <div className="flex w-full items-center gap-2">
      <Image
        src={image}
        alt="user"
        width={30}
        height={30}
        className="rounded-full"
      />
      <p className="font-bold text-zinc-400">{name}</p>
      <button
        onClick={() => void signOut()}
        className="
        rounded-md border-2 border-violet-600 px-2 py-1 text-sm
        transition duration-200
        ease-in-out
        hover:bg-violet-600
        active:opacity-50
      "
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
