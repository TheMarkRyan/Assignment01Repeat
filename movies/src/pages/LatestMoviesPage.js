import React from "react";
import { useQuery } from "react-query";
import { getLatestMovies } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import MovieList from "../components/movieList";

const LatestMoviesPage = () => {
  const { data, error, isLoading, isError } = useQuery("latest", getLatestMovies);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return <MovieList movies={data ? [data] : []} title="Latest Movies" />;
};

export default LatestMoviesPage;
