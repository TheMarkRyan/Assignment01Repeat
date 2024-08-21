import React, { useState } from "react";
import { useQuery } from "react-query";
import { getMoviesByGenre, getMovies, getMoviesByActor } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import PageTemplate from "../components/templateMovieListPage";
import FilterMoviesCard from "../components/filterMoviesCard";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const HomePage = () => {
  const [genreId, setGenreId] = useState("0");
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [actorName, setActorName] = useState(""); // New state for actor search

  // Determine which API call to use based on whether an actor is being searched.
  const { data, error, isLoading, isError } = useQuery(
    ["discover", genreId, sortBy, actorName], // Include actorName as a query key
    () => {
      if (actorName) {
        return getMoviesByActor(actorName); // Use actor search API if actorName is provided
      } else if (genreId !== "0") {
        return getMoviesByGenre(genreId, sortBy);
      } else {
        return getMovies(sortBy);
      }
    }
  );

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data?.results || [];

  const handleFilterChange = (type, value) => {
    if (type === "genre") setGenreId(value);
    if (type === "sort") setSortBy(value);
    if (type === "actor") setActorName(value); // Handle actor search
  };

  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
    >
      <FilterMoviesCard
        onUserInput={handleFilterChange}
        titleFilter=""
        genreFilter={genreId}
        sortBy={sortBy}
        actorFilter={actorName} // Pass the actor filter down
      />
    </PageTemplate>
  );
};

export default HomePage;
