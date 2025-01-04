import { component$, type PropFunction, Slot } from "@builder.io/qwik";
interface ModalProps {
  showModal: boolean;
  closeModal: PropFunction<() => void>;
  size?: "sm" | "md" | "lg";
}
export const Modal = component$(
  ({ size = "md", showModal, closeModal }: ModalProps) => {
    return (
      <div
        class={
          showModal
            ? "fixed inset-0 flex h-full w-full items-center justify-center overflow-y-auto bg-black bg-opacity-50 transition-all"
            : "hidden"
        }
      >
        <div
          class={`rounded-md border bg-white shadow-lg  ${size === "sm" ? "w-56" : size === "lg" ? "w-5/12" : "w-96"}`}
        >
          <div class="mt-3 text-center">
            <h3 class="text-lg font-medium capitalize leading-6 text-gray-900">
              <Slot name="title" />
            </h3>

            <div class="mt-2 px-7 py-3">
              <div class="flex items-center justify-center text-center text-sm text-gray-500">
                <Slot name="content" />
              </div>
            </div>

            {/* Botton */}
            <div class="items-center px-4 py-3">
              <button
                id="ok-btn"
                onClick$={closeModal}
                class="w-full rounded-md bg-purple-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-300"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
