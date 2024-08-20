import React from "react";
import { useQuery } from "react-query";
import { getTopRatedMovies } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import MovieList from "../components/movieList";

const TopRatedMoviesPage = () => {
  const { data, error, isLoading, isError } = useQuery("topRated", getTopRatedMovies);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return <MovieList movies={data.results} title="Top Rated Movies" />;
};

export default TopRatedMoviesPage;
