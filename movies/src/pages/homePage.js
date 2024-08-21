import React, { useState } from "react";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import PageTemplate from "../components/templateMovieListPage";
import { getMoviesByGenre, getMovies } from "../api/tmdb-api";
import FilterMoviesCard from "../components/filterMoviesCard";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const HomePage = () => {
  const [genreId, setGenreId] = useState("0"); // Store selected genre ID

  const { data, error, isLoading, isError } = useQuery(
    ["discover", genreId], 
    () => genreId !== "0" ? getMoviesByGenre(genreId) : getMovies() // If no genre is selected, fetch all movies
  );

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data?.results || [];

  const handleFilterChange = (type, value) => {
    if (type === "genre") {
      setGenreId(value);
    }
  };

  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => <AddToFavoritesIcon movie={movie} />} 
    >
      {/* FilterMoviesCard to pass the selected genre */}
      <FilterMoviesCard
        onUserInput={handleFilterChange}
        titleFilter=""
        genreFilter={genreId}
      />
    </PageTemplate>
  );
};

export default HomePage;
