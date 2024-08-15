import React, { useEffect, useState } from "react";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import { getMovies } from "../api/tmdb-api";

const HomePage = () => {
  // Fetch movies using react-query
  const { data, error, isLoading, isError } = useQuery('discover', getMovies);

  // State to store favorite movies
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  // Load favorites from local storage on component mount
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    setFavoriteMovies(storedFavorites);
  }, []);

  // Save favorite movies to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
  }, [favoriteMovies]);

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  // The results of the movie query
  const movies = data?.results || [];

  // Function to check if a movie is in the user's favorites
  const isFavorited = (movieId) => {
    return favoriteMovies.some(favMovie => favMovie.id === movieId);
  };

  const toggleFavorite = (movie) => {
    const updatedFavorites = isFavorited(movie.id)
      ? favoriteMovies.filter(favMovie => favMovie.id !== movie.id)
      : [...favoriteMovies, movie];

    setFavoriteMovies(updatedFavorites);
  };

  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies.map(movie => ({
        ...movie,
        favorite: isFavorited(movie.id) // Set favorite status dynamically
      }))}
      selectFavorite={toggleFavorite}
    />
  );
};

export default HomePage;
