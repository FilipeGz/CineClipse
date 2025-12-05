import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/';

export async function fetchMovies(endpoint) {
  try {
    const response = await axios.get(BASE_URL + endpoint);
    return response;
  } catch (error) {
    console.error("Erro ao buscar filme:", error);
    return { data: null };
  }
}