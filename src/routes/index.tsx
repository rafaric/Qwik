import { $, component$, useContext } from "@builder.io/qwik";
import { useNavigate, type DocumentHead } from "@builder.io/qwik-city";

import { Image } from "~/components/pokemons/image";
import { PokemonGameContext } from "~/context/";

export default component$(() => {
  /* const pokemonId = useSignal<number>(1); // solo usar para primitivos
  const showBackImage = useSignal<boolean>(false); */
  const pokemon = useContext(PokemonGameContext);
  // useStore para objetos [], {}
  const nav = useNavigate();

  const handlePokemonIdChange = $((value: number) => {
    if (pokemon.pokemonId + value <= 0) return;
    pokemon.pokemonId += value;
  });

  return (
    <main class="flex w-full flex-col items-center justify-center gap-5">
      <h1 class="text-2xl text-red-600">PokeQwik</h1>
      <span class="text-xl">Buscador simple</span>
      <span class="text-base font-bold">{pokemon.pokemonId}</span>
      {/* <Link href={`/pokemon/${pokemonId.value}/`}>
        <Image id={pokemonId.value} size={200} backImage={showBackImage.value} />
      </Link> */}
      <div onClick$={async () => await nav(`/pokemon/${pokemon.pokemonId}`)}>
        <Image
          id={pokemon.pokemonId}
          size={200}
          backImage={pokemon.showBackImage}
        />
      </div>
      <div class="flex gap-5">
        <button
          class="border-blue rounded-md border px-4 py-3 transition-all duration-200 hover:bg-slate-400"
          onClick$={() => handlePokemonIdChange(-1)}
        >
          Anterior
        </button>
        <button
          class="border-blue rounded-md border px-4 py-3 transition-all duration-200 hover:bg-slate-400"
          onClick$={() => (pokemon.showBackImage = !pokemon.showBackImage)}
        >
          Voltear
        </button>
        <button
          class="border-blue rounded-md border px-4 py-3 transition-all duration-200 hover:bg-slate-400"
          onClick$={() => handlePokemonIdChange(1)}
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
