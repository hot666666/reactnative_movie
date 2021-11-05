const API_KEY = "d99e10906e2ee7f3f74c493e0dde192b";
const BASE_URL = "https://api.themoviedb.org/3";

export interface Movies {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface BaseResponse {
  page: number;
  total_results: number;
  total_pages: number;
}

export interface MovieResponse extends BaseResponse {
  results: Movies[];
}

export const moviesApi = {
  trending: () =>
    fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`).then((res) =>
      res.json()
    ),
  upcoming: ({ pageParam }) =>
    fetch(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${pageParam}`
    ).then((res) => res.json()),
  nowPlaying: () =>
    fetch(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
    ).then((res) => res.json()),

  search: ({ queryKey }) => {
    const [_, QUERY] = queryKey;
    fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${QUERY}&page=1&include_adult=true`
    ).then((res) => res.json());
  },
  detail: ({ queryKey }) => {
    const [_, id] = queryKey;
    return fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,images`
    ).then((res) => res.json());
  },
};
// ()의 경우 그냥 리턴이 ()이므로 상관없지만
// {}의 경우 반환값이 없으므로 return을 사용해줘야함!

export const tvApi = {
  trending: () =>
    fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`).then((res) =>
      res.json()
    ),
  airingToday: () =>
    fetch(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}`).then((res) =>
      res.json()
    ),
  topRated: () =>
    fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`).then((res) =>
      res.json()
    ),
  search: ({ queryKey }) => {
    const [_, QUERY] = queryKey;
    fetch(
      `${BASE_URL}/search/tv?api_key=${API_KEY}&language=en-US&query=${QUERY}&page=1&include_adult=false`
    ).then((res) => res.json());
  },
};

export const test = async (query: string) => {
  const { data } = await (
    await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=true`
    )
  ).json();

  return data;
};
