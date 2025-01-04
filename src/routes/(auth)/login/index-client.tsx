import { $, component$, useComputed$, useStore } from "@builder.io/qwik";

export default component$(() => {
  const formState = useStore({
    email: "",
    password: "",
    formPosted: false,
  });

  const emailError = useComputed$(() => {
    if (formState.email.includes("@") || !formState.formPosted) return "";
    return "border-red-400 text-red-400 focus:border-red-400";
  });
  const passError = useComputed$(() => {
    if (formState.password.length > 5 || !formState.formPosted) return "";
    return "border-red-400 text-red-400 focus:border-red-400";
  });

  const isFormValid = useComputed$(() => {
    if (emailError.value != "" || passError.value != "") return false;
    return true;
  });

  const onSubmit = $(() => {
    formState.formPosted = true;
    const { email, password } = formState;
    console.log({ email, password }, isFormValid.value);
  });

  return (
    <>
      <form
        onSubmit$={onSubmit}
        class="flex w-full flex-col items-center justify-center gap-6"
        preventdefault:submit
      >
        <div class="w-1/4 -rotate-2 rounded-xl bg-blue-400 p-10 shadow-md">
          <div class="mx-auto w-[98%] rotate-6 rounded-xl bg-white p-10 shadow-xl">
            <div class="mx-auto w-1/2 -rotate-3">
              <div class="mb-5 flex flex-col">
                <label for="email">Email</label>
                <input
                  value={formState.email}
                  onInput$={(ev) =>
                    (formState.email = (ev.target as HTMLInputElement).value)
                  }
                  class={`border-b border-pink-300 px-4 py-2 outline-none focus:border-b-2 focus:border-pink-500 ${emailError.value}`}
                  type="text"
                  name="email"
                  placeholder="Tu email"
                />
              </div>
              <div class="flex flex-col">
                <label for="password">Contraseña</label>
                <input
                  value={formState.password}
                  onInput$={(ev) =>
                    (formState.password = (ev.target as HTMLInputElement).value)
                  }
                  class={` border-b border-pink-300 px-4 py-2 outline-none focus:border-b-2 focus:border-pink-500 ${passError.value}`}
                  type="password"
                  name="password"
                  placeholder="Tu contraseña"
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <button
            type="submit"
            class="rounded-md bg-pink-300 px-4 py-2 text-white hover:bg-pink-500"
          >
            Iniciar sesión
          </button>
        </div>
        <div>
          <code>{JSON.stringify(formState, undefined, 2)}</code>
        </div>
      </form>
    </>
  );
});
