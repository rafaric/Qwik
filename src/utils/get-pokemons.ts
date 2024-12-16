import type { PokemonLIstResponse, SmallPokemon } from "~/interfaces";

export const getSmallPokemons = async (
  offset: number = 0,
  limit: number = 10,
): Promise<SmallPokemon[]> => {
  const respuesta = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
  );
  const data = (await respuesta.json()) as PokemonLIstResponse;
  return data.results.map((pokemon) => {
    return {
      id: pokemon.url.split("/").at(-2)!,
      name: pokemon.name,
    };
  });
};
