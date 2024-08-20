import React from "react";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'; // Import the favorite icon

const UpcomingMoviesPage = () => {
  const { data, error, isLoading, isError } = useQuery('upcoming', getUpcomingMovies);

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data?.results || [];

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => <AddToFavoritesIcon movie={movie} />} // Use the action prop for the icon
    />
  );
};

export default UpcomingMoviesPage;
