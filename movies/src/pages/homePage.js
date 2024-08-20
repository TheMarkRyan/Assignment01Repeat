import React from "react";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import { getMovies } from "../api/tmdb-api";
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'; // Import the favorite icon

const HomePage = () => {
  const { data, error, isLoading, isError } = useQuery('discover', getMovies);

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data?.results || [];

  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => <AddToFavoritesIcon movie={movie} />} // Use the action prop for the icon
    />
  );
};

export default HomePage;

