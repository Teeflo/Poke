import axios from 'axios';
import { PokemonDetail, PokemonListResponse, PokemonSpecies } from '@/types/pokemon';

const API_BASE = 'https://pokeapi.co/api/v2';

const api = axios.create({
  baseURL: API_BASE,
});

export const getPokemonList = async ({ pageParam = 0 }: { pageParam?: number }) => {
  const limit = 20;
  const offset = pageParam * limit;
  const { data } = await api.get<PokemonListResponse>(`/pokemon?offset=${offset}&limit=${limit}`);
  return { ...data, nextOffset: data.next ? pageParam + 1 : undefined };
};

export const getAllPokemon = async () => {
  const { data } = await api.get<PokemonListResponse>('/pokemon?limit=10000');
  return data.results;
};

export const getPokemonDetail = async (name: string): Promise<PokemonDetail> => {
  const { data } = await api.get<PokemonDetail>(`/pokemon/${name}`);
  return data;
};

export const getPokemonSpecies = async (name: string): Promise<PokemonSpecies & { evolution_chain: { url: string } }> => {
  try {
    const { data } = await api.get(`/pokemon-species/${name}`);
    return data;
  } catch (error) {
    // If species not found by variant name, try getting the base species
    // Note: the component now passes the species name directly, but this is a good safety net
    console.error(`Error fetching species for ${name}:`, error);
    throw error;
  }
};

export const getEvolutionChain = async (url: string) => {
  const { data } = await axios.get(url);
  return data;
};

export const getPokemonByType = async (type: string) => {
  const { data } = await api.get(`/type/${type}`);
  return data.pokemon.map((p: any) => p.pokemon);
};
