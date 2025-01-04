import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { Image } from "~/components/pokemons/image";

import usePokemonGame from "~/hooks/usePokemonGame";

export const usePokemonId = routeLoader$(({ params, redirect }) => {
  const id = Number(params.id);
  if (isNaN(id)) redirect(301, "/");
  if (id <= 0) redirect(301, "/");
  if (id > 1000) redirect(301, "/");

  return id;
});

export default component$(() => {
  const { pokemonId, showBackImage, previousPokemon, nextPokemon } =
    usePokemonGame();

  return (
    <div class="mx-auto flex h-screen w-full flex-col items-center justify-center gap-10 bg-slate-300 py-48 text-3xl text-blue-400">
      <p>El pokemon número {pokemonId.value}</p>
      <Image id={pokemonId.value} backImage={showBackImage.value} />
      <div class="flex w-full justify-center">
        <button
          class="mx-4 rounded-lg border border-blue-900 bg-blue-200 px-2 py-1 transition-colors duration-300 hover:bg-blue-900 hover:text-white"
          onClick$={previousPokemon}
        >
          Anterior
        </button>
        <button
          class="mx-4 rounded-lg border border-blue-900 bg-blue-200 px-2 py-1 transition-colors duration-300 hover:bg-blue-900 hover:text-white"
          onClick$={nextPokemon}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "PokeQwik - Pokemon ",
  meta: [
    {
      name: "descripcion",
      content: "detalle del pokemon",
    },
  ],
};
