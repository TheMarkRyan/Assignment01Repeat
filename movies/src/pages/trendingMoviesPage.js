import React from "react";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { getTrendingMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const TrendingMoviesPage = () => {
  const { data, error, isLoading, isError } = useQuery("trending", getTrendingMovies);

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data?.results || [];

  return (
    <PageTemplate
      title="Trending Movies"
      movies={movies}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
    />
  );
};

export default TrendingMoviesPage;
