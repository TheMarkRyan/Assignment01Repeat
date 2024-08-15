import React, { useState, useEffect } from 'react';
import { getUpcomingMovies } from '../api/tmdb-api'; 
import MovieList from '../components/movieList'; 

const UpcomingMoviesPage = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getUpcomingMovies()
            .then(data => {
                setMovies(data);
            })
            .catch(error => {
                setError(error);
            });
    }, []);

    
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    
    if (movies.length === 0) {
        return <div>Loading...</div>;
    }

    
    return (
        <>
            <h2>Upcoming Movies</h2>
            <MovieList movies={movies} /> 
        </>
    );
};

export default UpcomingMoviesPage;