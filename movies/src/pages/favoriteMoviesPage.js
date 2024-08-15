import React, { useState, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";

const FavoriteMoviesPage = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    setFavoriteMovies(storedFavorites);
  }, []);

  return (
    <PageTemplate
      title="Favourite Movies"
      movies={favoriteMovies}
      selectFavorite={() => true} // Placeholder, no action needed for favorites page
    />
  );
};

export default FavoriteMoviesPage;
