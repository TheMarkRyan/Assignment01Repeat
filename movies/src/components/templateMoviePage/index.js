import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import MovieHeader from '../headerMovie';
import { getMovieImages } from '../../api/tmdb-api';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

const TemplateMoviePage = ({ movie, children }) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        getMovieImages(movie.id)
            .then((data) => {
                setImages(data?.posters || []); 
            })
            .catch((error) => {
                console.error("Failed to fetch images:", error);
                setImages([]); 
            });
    }, [movie.id]);

    return (
        <>
            <MovieHeader movie={movie} />

            <Grid container spacing={5} sx={{ padding: "15px" }}>
                <Grid item xs={3}>
                    <Carousel
                        showArrows={true}
                        infiniteLoop={true}
                        showThumbs={false}
                        dynamicHeight={true}
                        autoPlay={true}
                        interval={3000}
                    >
                        {images.map((image) => (
                            <div key={image.file_path}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                                    alt="Movie scene"
                                />
                            </div>
                        ))}
                    </Carousel>
                </Grid>
                <Grid item xs={9}>
                    {children}
                </Grid>
            </Grid>
        </>
    );
};

export default TemplateMoviePage;
