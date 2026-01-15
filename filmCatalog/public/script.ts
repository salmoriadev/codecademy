const tmdbKey = (window as Window & { TMDB_KEY?: string }).TMDB_KEY ?? "";
const tmdbBaseUrl = "https://api.themoviedb.org/3";
const playButton = document.getElementById(
  "playBtn",
) as HTMLButtonElement | null;

type GenreListResponse = {
  genres: Genre[];
};

type MovieListResponse = {
  results: MovieSummary[];
};

const getGenres = async (): Promise<Genre[] | undefined> => {
  if (!tmdbKey) {
    const movieInfo = document.getElementById("movieInfo");
    if (movieInfo) {
      movieInfo.innerHTML =
        "<p>Missing TMDB API key. Set window.TMDB_KEY in public/config.js.</p>";
    }
    return;
  }
  const genreRequestEndpoint = "/genre/movie/list";
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = tmdbBaseUrl + genreRequestEndpoint + requestParams;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = (await response.json()) as GenreListResponse;
      console.log(jsonResponse);

      const genres = jsonResponse.genres;
      console.log(genres);

      return genres;
    }
  } catch (error) {
    console.log(error);
  }
};

const getMovies = async (): Promise<MovieSummary[] | undefined> => {
  if (!tmdbKey) {
    return;
  }
  const selectedGenre = getSelectedGenre();
  if (!selectedGenre) {
    return;
  }
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
  const discoverMovieEndpoint = "/discover/movie";
  const urlToFetch = tmdbBaseUrl + discoverMovieEndpoint + requestParams;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = (await response.json()) as MovieListResponse;
      console.log(jsonResponse);

      const movies = jsonResponse.results;
      console.log(movies);

      return movies;
    }
  } catch (error) {
    console.log(error);
  }
};

const getMovieInfo = async (
  movie: MovieSummary,
): Promise<MovieDetails | undefined> => {
  if (!tmdbKey) {
    return;
  }
  const movieId = movie.id;
  const movieEndpoint = `/movie/${movieId}`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = tmdbBaseUrl + movieEndpoint + requestParams;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const movieInfo = (await response.json()) as MovieDetails;
      console.log(movieInfo);

      return movieInfo;
    }
  } catch (error) {
    console.log(error);
  }
};

const showRandomMovie = async (): Promise<void> => {
  const movieInfo = document.getElementById("movieInfo");
  if (!movieInfo) {
    return;
  }
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  }
  const movies = await getMovies();
  if (!movies || movies.length === 0) {
    return;
  }
  const randomMovie = getRandomMovie(movies);
  const info = await getMovieInfo(randomMovie);
  if (!info) {
    return;
  }
  displayMovie(info);
};

getGenres().then((genres) => {
  if (genres) {
    populateGenreDropdown(genres);
  }
});

if (playButton) {
  playButton.onclick = showRandomMovie;
}
