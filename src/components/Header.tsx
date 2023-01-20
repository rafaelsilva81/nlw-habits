import { signOut } from "next-auth/react";
import { Plus, SignOut } from "phosphor-react";
import { useState } from "react";
import Branding from "./common/Branding";
import Button from "./common/Button";
import NewHabitModal from "./modals/NewHabitModal";

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex w-full justify-between gap-4 px-8 py-2">
        <Branding />

        <button
          onClick={() => setShowModal(!showModal)}
          className="
        font-sembold flex items-center justify-center gap-2 rounded-lg border-2 border-violet-600 p-2 px-3
        text-sm transition duration-200
        ease-in-out
      hover:bg-violet-600
        active:opacity-50
        md:text-lg
        "
        >
          <Plus weight="bold" />
          Novo hábito
        </button>

        <NewHabitModal showModal={showModal} setShowModal={setShowModal} />
      </div>
    </>
  );
};

export default Header;
