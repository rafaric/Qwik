import { component$, Slot } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="flex h-screen flex-col items-center justify-center gap-10 bg-blue-100">
      <div class="flex items-center justify-center">
        <h2 class="text-2xl font-bold text-blue-300">
          POKEMON DASHBOARD LOGIN
        </h2>
      </div>
      <Slot />
    </div>
  );
});
