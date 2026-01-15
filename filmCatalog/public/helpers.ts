interface Genre {
  id: number;
  name: string;
}

interface MovieSummary {
  id: number;
}

interface MovieDetails {
  poster_path: string | null;
  title: string;
  overview: string;
}

declare const showRandomMovie: () => Promise<void>;

const populateGenreDropdown = (genres: Genre[]): void => {
  const select = document.getElementById("genres") as HTMLSelectElement | null;
  if (!select) {
    return;
  }

  for (var genre of genres) {
    const option = document.createElement("option");
    option.value = String(genre.id);
    option.text = genre.name;
    select.appendChild(option);
  }
};

const getSelectedGenre = (): string => {
  const selectedGenre = document.getElementById(
    "genres",
  ) as HTMLSelectElement | null;
  if (!selectedGenre) {
    return "";
  }
  return selectedGenre.value;
};

const showButtons = (): void => {
  const buttonDiv = document.getElementById("likeOrDislikeBtns");
  if (!buttonDiv) {
    return;
  }
  buttonDiv.removeAttribute("hidden");
};

const clearCurrentMovie = (): void => {
  const moviePosterDiv = document.getElementById("moviePoster");
  const movieTextDiv = document.getElementById("movieText");
  if (!moviePosterDiv || !movieTextDiv) {
    return;
  }
  moviePosterDiv.innerHTML = "";
  movieTextDiv.innerHTML = "";
};

// After liking or displaying a movie,
// clears the current movie from the screen
// and gets another random movie
const likeMovie = (): void => {
  clearCurrentMovie();
  void showRandomMovie();
};

const dislikeMovie = (): void => {
  clearCurrentMovie();
  void showRandomMovie();
};

const createMoviePoster = (posterPath: string): HTMLImageElement => {
  const moviePosterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`;

  const posterImg = document.createElement("img");
  posterImg.setAttribute("src", moviePosterUrl);
  posterImg.setAttribute("id", "moviePoster");

  return posterImg;
};

const createMovieTitle = (title: string): HTMLHeadingElement => {
  const titleHeader = document.createElement("h1");
  titleHeader.setAttribute("id", "movieTitle");
  titleHeader.innerHTML = title;

  return titleHeader;
};

const createMovieOverview = (overview: string): HTMLParagraphElement => {
  const overviewParagraph = document.createElement("p");
  overviewParagraph.setAttribute("id", "movieOverview");
  overviewParagraph.innerHTML = overview;

  return overviewParagraph;
};

const getRandomMovie = (movies: MovieSummary[]): MovieSummary => {
  const randomIndex = Math.floor(Math.random() * movies.length);
  const randomMovie = movies[randomIndex];
  return randomMovie;
};

const displayMovie = (movieInfo: MovieDetails): void => {
  const moviePosterDiv = document.getElementById("moviePoster");
  const movieTextDiv = document.getElementById("movieText");
  const likeButton = document.getElementById(
    "likeBtn",
  ) as HTMLButtonElement | null;
  const dislikeButton = document.getElementById(
    "dislikeBtn",
  ) as HTMLButtonElement | null;

  if (!moviePosterDiv || !movieTextDiv) {
    return;
  }

  // Create HTML content containing movie info
  if (movieInfo.poster_path) {
    const moviePoster = createMoviePoster(movieInfo.poster_path);
    moviePosterDiv.appendChild(moviePoster);
  }
  const titleHeader = createMovieTitle(movieInfo.title);
  const overviewText = createMovieOverview(movieInfo.overview);

  movieTextDiv.appendChild(titleHeader);
  movieTextDiv.appendChild(overviewText);

  showButtons();
  if (likeButton) {
    likeButton.onclick = likeMovie;
  }
  if (dislikeButton) {
    dislikeButton.onclick = dislikeMovie;
  }
};
