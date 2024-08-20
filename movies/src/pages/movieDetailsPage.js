import React, { useState } from "react";
import { useParams } from "react-router-dom";
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import Drawer from '@mui/material/Drawer';
import MovieReviews from "../components/movieReviews"; 

const MoviePage = () => {
  const { id } = useParams();
  const [showReviews, setShowReviews] = useState(false);

  const { data: movie, error, isLoading, isError } = useQuery(
    ["movie", { id }], // Correctly structure the queryKey for movie details
    getMovie
  );

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  return (
    <>
      {movie ? (
        <PageTemplate movie={movie}>
          <MovieDetails movie={movie} setShowReviews={setShowReviews} />
          {showReviews && (
  <Drawer anchor="top" open={showReviews} onClose={() => setShowReviews(false)}>
    <MovieReviews movieId={id} />
  </Drawer>
)}

        </PageTemplate>
      ) : (
        <p>Waiting for movie details...</p>
      )}
    </>
  );
};

export default MoviePage;
