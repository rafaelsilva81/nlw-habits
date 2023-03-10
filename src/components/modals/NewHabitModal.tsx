import { Dialog } from "@headlessui/react";
import { X as Cancel, Check } from "phosphor-react";
import React from "react";
import { useForm } from "react-hook-form";
import { TypeOf, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../utils/api";

const possibleDays = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

interface INewHabitModal {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const formSchema = z.object({
  title: z.string({
    required_error: "Esse campo é obrigatório",
  }),
  days: z
    .array(z.preprocess((val) => Number(val), z.number()))
    .nonempty({ message: "Selecione pelo menos um dia" }),
});

type formType = TypeOf<typeof formSchema>;

const NewHabitModal = (props: INewHabitModal) => {
  const { refetch: refetchSummary } = api.habits.getSummary.useQuery();

  const { showModal, setShowModal } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
  });

  const createHabitMutation = api.habits.createHabit.useMutation({
    onSuccess: () => {
      setShowModal(false);
      refetchSummary();
    },
    onError: (err) => {
      alert(err);
    },
  });

  const newHabit = async (data: formType) => {
    createHabitMutation.mutateAsync(data);
  };

  return (
    <Dialog
      open={showModal}
      onClose={() => setShowModal(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black opacity-40" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-2">
        <Dialog.Panel className="mx-auto flex max-w-lg flex-col gap-6 rounded-md bg-zinc-900 p-8 shadow-lg">
          <div className="flex flex-1 flex-row items-center justify-between">
            <Dialog.Title className="text-3xl font-bold">
              Criar Hábito
            </Dialog.Title>

            <button
              onClick={() => setShowModal(false)}
              className="rounded-md p-2 text-zinc-400 transition duration-200 ease-in-out hover:bg-zinc-800 hover:text-zinc-100 active:bg-zinc-700 "
            >
              <Cancel size={24} />
            </button>
          </div>

          <form
            className="flex flex-col gap-2"
            onSubmit={handleSubmit(newHabit)}
          >
            <label htmlFor="title" className="font-bold">
              Qual seu comprometimento?
            </label>
            <input
              required
              type="text"
              {...register("title", { required: true })}
              placeholder="Exercícios, dormir bem, etc..."
              className="rounded-md bg-zinc-800 p-4"
            />

            <span className="mt-2 font-bold">Qual a recorrência?</span>

            {possibleDays.map((day, i) => (
              <div className="flex flex-row items-center gap-2" key={day}>
                <input
                  type="checkbox"
                  {...register("days")}
                  value={i}
                  className="h-5 w-5 rounded-md accent-green-600"
                />
                <label htmlFor={day}> {day} </label>
              </div>
            ))}

            {errors && (
              <span className="font-bold text-red-500">
                {errors.days?.message || errors.title?.message}
              </span>
            )}

            <button
              type="submit"
              className="
                mt-2 flex items-center justify-center gap-1 rounded-md bg-green-600 p-4 font-semibold
                transition ease-in-out
                hover:bg-green-700 active:bg-green-800
                "
            >
              <Check weight="bold" />
              Confirmar
            </button>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default NewHabitModal;
