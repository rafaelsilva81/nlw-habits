import React from "react";
import { useRouter } from "next/router";
import FullscreenLoader from "../components/common/FullscreenLoader";
import SummaryTable from "../components/SummaryTable";
import Header from "../components/Header";
import { useSession } from "next-auth/react";
import Profile from "../components/Profile";

const Dashboard = () => {
  const { status, data: sessionData } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <FullscreenLoader />;
  }

  if (!sessionData?.user) {
    router.push("/");
    return;
  }

  return (
    <div className="min-w-screen flex min-h-screen flex-col items-center justify-center gap-10 p-2 md:px-32">
      {/* Header tab */}
      <Header />

      <div className="flex items-center justify-center">
        <SummaryTable />
      </div>

      <Profile
        image={sessionData.user.image || "/user.jpg"}
        name={sessionData.user.name || "User"}
      />
    </div>
  );
};

export default Dashboard;
