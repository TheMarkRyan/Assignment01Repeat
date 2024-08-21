import React, { useState } from "react";
import { useQuery } from "react-query";
import { getUpcomingMovies, getMoviesByGenre } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import PageTemplate from "../components/templateMovieListPage";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import FilterMoviesCard from "../components/filterMoviesCard";

const UpcomingMoviesPage = () => {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const genreId = Number(genreFilter);

  const { data, error, isLoading, isError } = useQuery(
    ["upcoming", genreId], 
    () => genreId > 0 ? getMoviesByGenre(genreId) : getUpcomingMovies()
  );

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  let movies = data?.results || [];
  movies = movies.filter((m) => m.title.toLowerCase().includes(nameFilter.toLowerCase()));

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else setGenreFilter(value);
  };

  return (
    <PageTemplate
      title="Upcoming Movies"
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

export default UpcomingMoviesPage;
