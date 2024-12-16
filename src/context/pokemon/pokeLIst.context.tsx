import { createContextId } from "@builder.io/qwik";
import type { SmallPokemon } from "~/interfaces";

export interface PokeListState {
  currentPage: number;
  isLoading: boolean;
  pokemons: SmallPokemon[];
}

export const PokeListContext = createContextId<PokeListState>(
  "pokemon.listContext",
);
