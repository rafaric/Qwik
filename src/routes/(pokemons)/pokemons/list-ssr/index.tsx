import {
  $,
  component$,
  useComputed$,
  useSignal,
  useStore,
} from "@builder.io/qwik";
import {
  Link,
  routeLoader$,
  useLocation,
  type DocumentHead,
} from "@builder.io/qwik-city";
import { Image } from "~/components/pokemons/image";
import { Modal } from "~/components/shared";

import type { SmallPokemon } from "~/interfaces";
import { getSmallPokemons } from "~/utils/get-pokemons";

export const usePokemonList = routeLoader$<SmallPokemon[]>(
  async ({ query, redirect, pathname }) => {
    const offset = Number(query.get("offset") || "0");

    if (isNaN(offset) || offset < 0) throw redirect(301, pathname);

    return await getSmallPokemons(offset);
  },
);

export default component$(() => {
  const modalVisible = useSignal(false);
  const pokemonList = usePokemonList();
  const location = useLocation();
  const modalPokemon = useStore({
    id: "",
    name: "",
  });

  const openModal = $((id: string, name: string) => {
    modalVisible.value = true;
    modalPokemon.id = id;
    modalPokemon.name = name;
  });
  const closeModal = $(() => {
    modalVisible.value = false;
  });

  const currentOffset = useComputed$<number>(() => {
    const offsetString = new URLSearchParams(location.url.searchParams).get(
      "offset",
    );
    if (!offsetString) return 0;
    return Number(offsetString) || 10;
  });

  return (
    <div class="mx-auto flex w-full flex-col items-center">
      <div>
        <p class="my-5 text-3xl">Status</p>
        <p class="my-5 ">Offset:{currentOffset}</p>
        <p class="my-5 ">
          Está cargando página: {location.isNavigating ? "Cargando..." : ""}{" "}
        </p>
      </div>
      <div class="flex gap-5">
        <Link
          href={`/pokemons/list-ssr/?offset=${currentOffset.value === 10 ? 10 : currentOffset.value - 10}`}
          class="cursor-pointer rounded-lg bg-blue-400 px-3 py-2 text-slate-200  transition-all hover:bg-blue-500 hover:shadow-lg"
        >
          Anteriores
        </Link>
        <Link
          href={`/pokemons/list-ssr/?offset=${currentOffset.value + 10}`}
          class="cursor-pointer rounded-lg bg-blue-400 px-3 py-2 text-slate-200 transition-all hover:bg-blue-500 hover:shadow-lg"
        >
          Siguientes
        </Link>
      </div>
      <div class="mt-4 grid grid-cols-5 gap-8">
        {pokemonList.value.map((pokemon) => (
          <div
            class="flex flex-col items-center justify-center"
            onClick$={() => openModal(pokemon.id, pokemon.name)}
            key={pokemon.name}
          >
            <Image id={Number(pokemon.id)} backImage={false} />
            <Link href={`/pokemon/${pokemon.id}/`}>
              <p class="pt-4 font-semibold capitalize text-blue-800">
                {pokemon.name}
              </p>
            </Link>
          </div>
        ))}
      </div>
      <Modal showModal={modalVisible.value} closeModal={closeModal}>
        <span q:slot="title">{modalPokemon.name}</span>
        <div
          q:slot="content"
          class="flex flex-col items-center justify-center gap-6"
        >
          <Image id={Number(modalPokemon.id)} backImage={false} />
          <span>Consultando a ChatGPT...</span>
        </div>
      </Modal>
    </div>
  );
});

export const head: DocumentHead = {
  title: "PokeQwik - Server List",
  meta: [
    {
      name: "descripcion",
      content: "Listado en Servidor",
    },
  ],
};
