import React from "react";
import { useQuery } from "react-query";
import { getRecommendedMovies } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import MovieList from "../components/movieList";

const RecommendationsPage = () => {
  const { data, error, isLoading, isError } = useQuery("recommendations", getRecommendedMovies);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return <MovieList movies={data.results} title="Recommended Movies" />;
};

export default RecommendationsPage;
