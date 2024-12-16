import {
  component$,
  Slot,
  useContextProvider,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { PokemonGameContext, type PokemonGameState } from "./pokeGame.context";
import { PokeListContext, type PokeListState } from "./pokeLIst.context";

export const PokemonProvider = component$(() => {
  const pokemonGame = useStore<PokemonGameState>({
    pokemonId: 1,
    showBackImage: false,
    isPokemonVisible: true,
  });

  const pokemonList = useStore<PokeListState>({
    currentPage: 0,
    isLoading: false,
    pokemons: [],
  });
  useContextProvider(PokemonGameContext, pokemonGame);
  useContextProvider(PokeListContext, pokemonList);

  //LEER DE LOCAL STORAGE
  useVisibleTask$(() => {
    if (localStorage.getItem("pokemonState")) {
      const {
        pokemonId = 1,
        isPokemonVisible = true,
        showBackImage,
      } = JSON.parse(localStorage.getItem("pokemonState")!) as PokemonGameState;

      pokemonGame.pokemonId = pokemonId;
      pokemonGame.isPokemonVisible = isPokemonVisible;
      pokemonGame.showBackImage = showBackImage;
    }
  });

  //GUARDAR EN LOCAL STORAGE
  useVisibleTask$(({ track }) => {
    track(() => [
      pokemonGame.pokemonId,
      pokemonGame.isPokemonVisible,
      pokemonGame.showBackImage,
    ]);
    localStorage.setItem("pokemonState", JSON.stringify(pokemonGame));
  });

  return <Slot />;
});
