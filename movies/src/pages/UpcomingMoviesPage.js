import React, { useEffect, useState } from 'react';
import PageTemplate from '../components/templateMovieListPage'; // Reusing the template
import { getUpcomingMovies } from '../api/tmdb-api';

const UpcomingMoviesPage = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getUpcomingMovies()
            .then(data => {
                setMovies(data.results || []);
            })
            .catch(error => {
                setError(error);
                console.error("Failed to fetch movies:", error);
            });
    }, []);

    const handleFavorite = (movieId) => {
        const updatedMovies = movies.map((m) =>
            m.id === movieId ? { ...m, favorite: true } : m
        );
        setMovies(updatedMovies);
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (movies.length === 0) {
        return <div>Loading upcoming movies...</div>;
    }

    return (
        <PageTemplate
            title="Upcoming Movies"
            movies={movies}
            selectFavorite={handleFavorite}
        />
    );
};

export default UpcomingMoviesPage;
