import { component$, Slot } from "@builder.io/qwik";
import Navbar from "~/components/shared/header/navbar";
import { PokemonProvider } from "~/context";

export default component$(() => {
  return (
    <PokemonProvider>
      <Navbar />
      <main class="mx-auto w-full">
        <Slot />
      </main>
    </PokemonProvider>
  );
});
