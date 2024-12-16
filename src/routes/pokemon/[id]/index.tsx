import { component$, useContext } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { Image } from "~/components/pokemons/image";
import { PokemonGameContext } from "~/context/";

export const usePokemonId = routeLoader$(({ params, redirect }) => {
  const id = Number(params.id);
  if (isNaN(id)) redirect(301, "/");
  if (id <= 0) redirect(301, "/");
  if (id > 1000) redirect(301, "/");

  return id;
});

export default component$(() => {
  const pokemonId = usePokemonId();
  const pokemon = useContext(PokemonGameContext);
  return (
    <div class="mx-auto flex h-screen w-full flex-col items-center justify-center bg-slate-300 py-48 text-3xl text-blue-400">
      <p>El pokemon número {pokemonId}</p>
      <Image id={pokemon.pokemonId} backImage={pokemon.showBackImage} />
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
