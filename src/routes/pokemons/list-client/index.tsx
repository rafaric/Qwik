import {
  $,
  component$,
  useOnDocument,
  useStore,
  useTask$,
} from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";
import { Image } from "~/components/pokemons/image";
import type { SmallPokemon } from "~/interfaces";
import { getSmallPokemons } from "~/utils/get-pokemons";

interface PokemonPageState {
  currentPage: number;
  isLoading: boolean;
  pokemons: SmallPokemon[];
}

export default component$(() => {
  const pokemonState = useStore<PokemonPageState>({
    currentPage: 0,
    isLoading: false,
    pokemons: [],
  });
  /**SOLO DEL LADO DEL CLIENTE */
  /* useVisibleTask$(async (task) => {
    task.track(() => pokemonState.currentPage);
    const pokemons = await getSmallPokemons(pokemonState.currentPage * 10);
    pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];
  }); */
  useTask$(async (task) => {
    task.track(() => pokemonState.currentPage);

    const pokemons = await getSmallPokemons(pokemonState.currentPage * 10, 30);
    if (pokemons.length > 0)
      pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];
    pokemonState.isLoading = false;
  });

  useOnDocument(
    "scroll",
    $(() => {
      const maxScroll = document.body.scrollHeight;
      const currentScroll = window.scrollY + window.innerHeight;

      if (currentScroll + 200 >= maxScroll && !pokemonState.isLoading) {
        pokemonState.isLoading = true;
        pokemonState.currentPage++;
      }
    }),
  );

  return (
    <div class="mx-auto flex w-full flex-col items-center">
      <div>
        <p class="my-5 text-3xl">Status</p>
        <p class="my-5 ">Página Actual: {pokemonState.currentPage}</p>
        <p class="my-5 ">Está cargando página:</p>
      </div>
      <div class="flex gap-5">
        {/* <button
          onClick$={() => pokemonState.currentPage--}
          class="cursor-pointer rounded-lg bg-blue-400 px-3 py-2 text-slate-200  transition-all hover:bg-blue-500 hover:shadow-lg"
        >
          Anteriores
        </button> */}
        <button
          onClick$={() => pokemonState.currentPage++}
          class="cursor-pointer rounded-lg bg-blue-400 px-3 py-2 text-slate-200 transition-all hover:bg-blue-500 hover:shadow-lg"
        >
          Siguientes
        </button>
      </div>
      <div class="mt-4 grid grid-cols-5 gap-8">
        {pokemonState.pokemons.map((pokemon) => (
          <div
            class="flex flex-col items-center justify-center"
            key={pokemon.name}
          >
            <Image id={Number(pokemon.id)} backImage={false} />
            <Link href={`/pokemons/${pokemon.name}`}>
              <p class="pt-4 font-semibold capitalize text-blue-800">
                {pokemon.name}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "PokeQwik - Client List",
  meta: [
    {
      name: "descripcion",
      content: "Listado en Cliente",
    },
  ],
};
