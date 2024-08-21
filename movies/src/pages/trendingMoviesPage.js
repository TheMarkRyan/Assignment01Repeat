import React, { useState } from "react";
import { useQuery } from "react-query";
import { getTrendingMovies } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import PageTemplate from "../components/templateMovieListPage";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import FilterMoviesCard from "../components/filterMoviesCard";
import { getMoviesByGenre } from "../api/tmdb-api";

const TrendingMoviesPage = () => {
    const [nameFilter, setNameFilter] = useState("");
    const [genreFilter, setGenreFilter] = useState("0");
    const genreId = Number(genreFilter);
  
    const { data, error, isLoading, isError } = useQuery(
      ["topRated", genreId], 
      () => genreId > 0 ? getMoviesByGenre(genreId) : getTrendingMovies() // Fetch movies by genre if a genre is selected
    );
  
    if (isLoading) return <Spinner />;
    if (isError) return <h1>{error.message}</h1>;
  
    let movies = data?.results || [];
  
    // Further client-side filtering by title
    movies = movies.filter((m) => m.title.toLowerCase().includes(nameFilter.toLowerCase()));
  
    const handleChange = (type, value) => {
      if (type === "name") setNameFilter(value);
      else setGenreFilter(value);
    };

  return (
    <PageTemplate
      title="Trending Movies"
      movies={movies}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
    >
      <FilterMoviesCard
        onUserInput={handleChange}
        titleFilter={nameFilter}
        genreFilter={genreFilter}
      />
    </PageTemplate>
  );
};

export default TrendingMoviesPage;
