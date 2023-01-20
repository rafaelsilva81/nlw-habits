import React from "react";
import { useRouter } from "next/router";
import Loader from "../components/common/Loader";
import SummaryTable from "../components/SummaryTable";
import Header from "../components/Header";
import { useSession } from "next-auth/react";

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
      <Header />

      <div className="flex items-center justify-center">
        <SummaryTable />
      </div>
    </div>
  );
};

export default Dashboard;
