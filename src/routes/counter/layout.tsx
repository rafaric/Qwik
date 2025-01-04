import { component$, Slot } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <div class="flex flex-col items-center justify-center gap-6 bg-slate-400">
        <Slot />
        <Link class="" href="/">
          Regresar
        </Link>
      </div>
    </>
  );
});
