import React, { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Branding from "../components/Branding";
import { Plus, SignOut } from "phosphor-react";
import Button from "../components/Button";
import Loader from "../components/Loader";
import dayjs from "dayjs";

const Dashboard = () => {
  const { status, data: sessionData } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <Loader />;
  }

  if (!sessionData) {
    router.push("/");
  }

  const daysInMonth = dayjs().daysInMonth();
  const daysOfWeek = ["D", "S", "T", "Q", "Q", "S", "S"];

  // 0 = domingo, 1 = segunda, 2 = terça, 3 = quarta, 4 = quinta, 5 = sexta, 6 = sábado
  const firstDayOfMonth = dayjs().startOf("month").day();

  const lastDayOfMonth = dayjs().endOf("month").day();

  const daysBefore = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  console.log(lastDayOfMonth);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10 p-2 md:px-32">
      {/* Header tab */}
      <div className="flex w-full justify-between gap-4 px-4 py-2">
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
    </div>
  );
};

export default Dashboard;
