import React from "react";
import { useParams } from 'react-router-dom';
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie } from '../api/tmdb-api';
import { useQuery } from "react-query";
import Spinner from '../components/spinner';

const MoviePage = () => {
  const { id } = useParams(); // Extract movie ID from URL params

  const { data: movie, error, isLoading, isError } = useQuery(
    ["movie", { id }], // Query key with movie id
    getMovie // The function used to fetch movie details
  );

  if (isLoading) {
    return <Spinner />;
  } 

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {movie ? (
        <PageTemplate movie={movie}>
          <MovieDetails movie={movie} />
        </PageTemplate>
      ) : (
        <p>Waiting for movie details...</p>
      )}
    </>
  );
};

export default MoviePage;
