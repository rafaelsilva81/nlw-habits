import { Dialog } from "@headlessui/react";
import { signOut } from "next-auth/react";
import { Plus, SignOut, X } from "phosphor-react";
import { useState } from "react";
import Branding from "./common/Branding";
import Button from "./common/Button";

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex w-full justify-between gap-4 px-8 py-2">
        <Branding />
        <div className="flex flex-col gap-2">
          <Button onClick={() => void signOut()}>
            <SignOut weight="bold" className="text-violet-500" />
            Sair
          </Button>

          <Button onClick={() => setShowModal(!showModal)}>
            <Plus weight="bold" className="text-violet-500" />
            Novo hábito
          </Button>
        </div>
      </div>

      {/* Modal */}

      <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex items-center justify-center p-2">
          <Dialog.Panel className="mx-auto flex max-w-lg flex-col gap-6 rounded-md bg-zinc-900 p-8 shadow-md">
            <div className="flex flex-1 flex-row items-center justify-between">
              <Dialog.Title className="text-3xl font-bold">
                Criar Hábito
              </Dialog.Title>

              <button
                onClick={() => setShowModal(false)}
                className="rounded-md p-2 text-zinc-400 transition duration-200 ease-in-out hover:bg-zinc-800 hover:text-zinc-100 active:bg-zinc-700 active:text-zinc-100"
              >
                <X size={24} />
              </button>
            </div>

            <Dialog.Description className="flex flex-col gap-2">
              <form className="flex flex-col gap-2">
                <label htmlFor="title" className="font-bold">
                  Qual seu comprometimento?
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Exercícios, dormir bem, etc..."
                  className="rounded-md bg-zinc-800 p-4 text-zinc-400"
                />

                <span className="mt-2 font-bold">Qual a recorrência?</span>
                <div className="flex flex-row items-center gap-2">
                  <input
                    type="checkbox"
                    name="domingo"
                    value="0"
                    className="h-4 w-4 rounded-md"
                  />
                  <label htmlFor="domingo"> Domingo </label>
                </div>
              </form>
            </Dialog.Description>

            <div className="mt-4 flex flex-row gap-4"></div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default Header;
