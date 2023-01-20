import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { DiscordLogo } from "phosphor-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Branding from "../components/common/Branding";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (sessionData) {
      router.push("/dashboard");
    }
  }, [sessionData]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 py-2">
      <Branding />

      <button
        className="
      flex items-center gap-2 rounded-md bg-[#5865F2] p-2 text-xl font-bold 
      hover:opacity-80 
      active:opacity-50"
        onClick={() => void signIn("discord")}
      >
        <DiscordLogo weight="fill" size={24} />
        Login com Discord
      </button>
    </div>
  );
};

export default Home;
