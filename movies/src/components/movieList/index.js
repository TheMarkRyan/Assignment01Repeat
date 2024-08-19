import React from "react";
import Movie from "../movieCard/";
import Grid from "@mui/material/Grid";

const MovieList = (props) => {
    if (!Array.isArray(props.movies)) {
        console.error("Expected props.movies to be an array", props.movies);
        return null; // or render a placeholder message
    }

    let movieCards = props.movies.map((m) => (
        <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Movie key={m.id} movie={m} selectFavorite={props.selectFavorite} />
        </Grid>
    ));

    return movieCards;
};

export default MovieList;
