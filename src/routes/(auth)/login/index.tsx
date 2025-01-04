import { component$ } from "@builder.io/qwik";
import { Form, routeAction$, zod$, z } from "@builder.io/qwik-city";

export const useLoginUserAction = routeAction$(
  (data, { cookie, redirect }) => {
    //las ultimas dos salen de "event"
    const { email, password } = data;

    if (email === "rafa@gmail.com" && password === "123") {
      cookie.set("jwt", "Estos_son_mis_datos_de_ingreso", {
        secure: true,
        path: "/",
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60,
      });
      redirect(302, "/");
    }
    return {
      success: false,
      jwt: null,
    };
  },
  zod$({
    email: z.string().email("Formato no válido"),
    password: z.string().min(3, "Mínimo de 3 letras"),
  }),
);

export default component$(() => {
  const action = useLoginUserAction();
  return (
    <>
      <Form
        action={action}
        class="flex w-full flex-col items-center justify-center gap-6"
      >
        <div class="w-1/4 -rotate-2 rounded-xl bg-blue-400 p-10 shadow-md">
          <div class="mx-auto w-[98%] rotate-6 rounded-xl bg-white p-10 shadow-xl">
            <div class="mx-auto w-1/2 -rotate-3">
              <div class="mb-5 flex flex-col">
                <label for="email">Email</label>
                <input
                  class={`border-b border-pink-300 px-4 py-2 outline-none focus:border-b-2 focus:border-pink-500`}
                  type="text"
                  name="email"
                  placeholder="Tu email"
                />
              </div>
              <div class="flex flex-col">
                <label for="password">Contraseña</label>
                <input
                  class={` border-b border-pink-300 px-4 py-2 outline-none focus:border-b-2 focus:border-pink-500 `}
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
        <div>{<code>{JSON.stringify(action.value, undefined, 2)}</code>}</div>
      </Form>
    </>
  );
});
