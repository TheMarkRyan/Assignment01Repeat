import React, { useState, useEffect } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage when the component mounts
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
  }, []);

  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)) {
      newFavorites = [...favorites, movie.id];
    } else {
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites)); // Save to localStorage
  };

  const removeFromFavorites = (movie) => {
    const newFavorites = favorites.filter((mId) => mId !== movie.id);
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites)); // Save to localStorage
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
