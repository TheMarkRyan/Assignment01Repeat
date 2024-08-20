const apiKey = "7194ca2f7febb4e3e714c7390912b48f";
const baseUrl = "https://api.themoviedb.org/3";

// Fetch favorite movies
export const fetchFavoriteMovies = async (accountId, sessionId) => {
  const url = `${baseUrl}/account/${accountId}/favorite/movies?api_key=${apiKey}&session_id=${sessionId}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch favorite movies.");
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

// Toggle favorite status
export const toggleFavorite = async (accountId, sessionId, movieId, isFavorite) => {
  const url = `${baseUrl}/account/${accountId}/favorite?api_key=${apiKey}&session_id=${sessionId}`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      media_type: "movie",
      media_id: movieId,
      favorite: isFavorite,
    }),
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error("Failed to update favorite status.");
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

// Fetch genres
export const getGenres = async () => {
  const url = `${baseUrl}/genre/movie/list?api_key=${apiKey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch genres.");
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getMovieReviews = async ({ queryKey }) => {
  const [, { id }] = queryKey; 
  const url = `${baseUrl}/movie/${id}/reviews?api_key=${apiKey}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch movie reviews.");
  return await response.json();
};






// Fetch movie images
export const getMovieImages = async ({ queryKey }) => {
  const [, { id }] = queryKey; // Ensure that the ID is extracted correctly
  const url = `${baseUrl}/movie/${id}/images?api_key=${apiKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch movie images.");
  }
  return await response.json();
};



// Fetch movie details
export const getMovie = async ({ queryKey }) => {
  const [, { id }] = queryKey;
  console.log("Fetching movie details for ID:", id); // Debugging log
  const url = `${baseUrl}/movie/${id}?api_key=${apiKey}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch movie details.");
  return await response.json();
};






// Fetch upcoming movies
export const getUpcomingMovies = async () => {
  const url = `${baseUrl}/movie/upcoming?api_key=${apiKey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch upcoming movies.");
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

// Fetch discover movies (for homepage)
export const getMovies = async () => {
  const url = `${baseUrl}/discover/movie?api_key=${apiKey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch movies.");
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

// Fetch trending movies
export const getTrendingMovies = async () => {
  const url = `${baseUrl}/trending/movie/week?api_key=${apiKey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch trending movies.");
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

// Fetch latest movie
export const getLatestMovies = async () => {
  const url = `${baseUrl}/movie/latest?api_key=${apiKey}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch latest movie.");
  return await response.json();
};

// Fetch recommended movies for a specific movie
export const getRecommendedMovies = async (movieId) => {
  const response = await fetch(
    `${baseUrl}/movie/${movieId}/recommendations?api_key=${apiKey}`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch recommendations: ${response.statusText}`);
  }
  return await response.json();
};



// Fetch top-rated movies
export const getTopRatedMovies = async () => {
  const url = `${baseUrl}/movie/top_rated?api_key=${apiKey}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch top-rated movies.");
  return await response.json();
};
