import React from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Branding from "../components/Branding";
import { Plus, SignOut } from "phosphor-react";
import Button from "../components/Button";
import Loader from "../components/Loader";
import { api } from "../utils/api";
import SummaryTable from "../components/SummaryTable";

const Dashboard = () => {
  const { status, data: sessionData } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <Loader />;
  }

  if (!sessionData) {
    router.push("/");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10 p-2 md:px-32">
      {/* Header tab */}
      <div className="flex w-full justify-between gap-4 px-8 py-2">
        <Branding />
        <div className="flex flex-col gap-2">
          <Button onClick={() => void signOut()}>
            <SignOut weight="bold" className="text-violet-500" />
            Sair
          </Button>

          <Button>
            <Plus weight="bold" className="text-violet-500" />
            Novo hábito
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <SummaryTable />
      </div>
    </div>
  );
};

export default Dashboard;
