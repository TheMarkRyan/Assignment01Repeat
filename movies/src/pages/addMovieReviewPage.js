import React from "react";
import PageTemplate from "../components/templateMoviePage";
import AddReviewForm from "../components/addReviewForm";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";

const AddMovieReviewPage = () => {
  const location = useLocation();
  const movieId = location.state.movieId;

  const { data: movie, error, isLoading, isError } = useQuery(
    ["movie", { id: movieId }],
    getMovie
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <PageTemplate movie={movie}>
      <AddReviewForm movieId={movieId} />
    </PageTemplate>
  );
};

export default AddMovieReviewPage;
