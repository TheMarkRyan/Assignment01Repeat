import React from "react";
import Grid from '@mui/material/Grid';
import MovieHeader from '../headerMovie';
import { useQuery } from "react-query";
import { getMovieImages } from '../../api/tmdb-api';
import { Carousel } from 'react-responsive-carousel';
import Spinner from '../spinner';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

const TemplateMoviePage = ({ movie, children }) => {
  const { data: imagesData, error, isLoading, isError } = useQuery(
    ["images", { id: movie.id }], // Query key with movie id
    getMovieImages // The function used to fetch movie images
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const images = imagesData?.posters || []; // Safeguard in case posters are undefined

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
