import { component$ } from "@builder.io/qwik";
import { useNavigate, type DocumentHead } from "@builder.io/qwik-city";

import { Image } from "~/components/pokemons/image";

import usePokemonGame from "~/hooks/usePokemonGame";

export default component$(() => {
  /* const pokemonId = useSignal<number>(1); // solo usar para primitivos
  const showBackImage = useSignal<boolean>(false); */

  // useStore para objetos [], {}
  const nav = useNavigate();
  const {
    pokemonId,
    showBackImage,
    previousPokemon,
    nextPokemon,
    toggleFromBack,
  } = usePokemonGame();

  return (
    <main class="flex w-full flex-col items-center justify-center gap-5">
      <h1 class="text-2xl text-red-600">PokeQwik</h1>
      <span class="text-xl">Buscador simple</span>
      <span class="text-base font-bold">{pokemonId.value}</span>
      {/* <Link href={`/pokemon/${pokemonId.value}/`}>
        <Image id={pokemonId.value} size={200} backImage={showBackImage.value} />
      </Link> */}
      <div onClick$={async () => await nav(`/pokemon/${pokemonId.value}`)}>
        <Image
          id={pokemonId.value}
          size={200}
          backImage={showBackImage.value}
        />
      </div>
      <div class="flex gap-5">
        <button
          class="border-blue rounded-md border px-4 py-3 transition-all duration-200 hover:bg-slate-400"
          onClick$={previousPokemon}
        >
          Anterior
        </button>
        <button
          class="border-blue rounded-md border px-4 py-3 transition-all duration-200 hover:bg-slate-400"
          onClick$={toggleFromBack}
        >
          Voltear
        </button>
        <button
          class="border-blue rounded-md border px-4 py-3 transition-all duration-200 hover:bg-slate-400"
          onClick$={nextPokemon}
        >
          Siguiente
        </button>
      </div>
    </main>
  );
});

export const head: DocumentHead = {
  title: "PokeQwik",
  meta: [
    {
      name: "descripcion",
      content: "Descripción del sitio Qwik",
    },
  ],
};
