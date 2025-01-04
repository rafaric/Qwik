import { useContext, useComputed$, $ } from "@builder.io/qwik";
import { PokemonGameContext } from "~/context";

const usePokemonGame = () => {
  const pokemon = useContext(PokemonGameContext);
  const handlePokemonIdChange = $((value: number) => {
    if (pokemon.pokemonId + value <= 0) return;
    pokemon.pokemonId += value;
  });

  const toggleFromBack = $(() => {
    pokemon.showBackImage = !pokemon.showBackImage;
  });
  const toggleVisible = $(() => {
    pokemon.isPokemonVisible = !pokemon.isPokemonVisible;
  });

  return {
    pokemonId: useComputed$(() => pokemon.pokemonId),
    showBackImage: useComputed$(() => pokemon.showBackImage),
    isPokemonVisible: useComputed$(() => pokemon.isPokemonVisible),
    previousPokemon: $(() => handlePokemonIdChange(-1)),
    nextPokemon: $(() => handlePokemonIdChange(1)),
    toggleFromBack,
    toggleVisible,
  };
};

export default usePokemonGame;
