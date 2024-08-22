import React, { useState } from "react";
import { useQuery } from "react-query";
import { getPopularActors } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

const ActorsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, error, isLoading, isError } = useQuery("popularActors", getPopularActors);
  const theme = useTheme();

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const actors = data?.results || [];

  // Filter actors based on the search term
  const filteredActors = actors.filter((actor) =>
    actor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ padding: "20px" }}>
      {/* Search Bar */}
      <TextField
        label="Search for an Actor"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          marginBottom: "20px",
          backgroundColor: theme.palette.mode === "dark" ? "#333333" : "#ffffff",
          color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
        }}
        InputProps={{
          style: {
            color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
          },
        }}
      />
      {/* Actor Cards */}
      <Grid container spacing={2}>
        {filteredActors.map((actor) => (
          <Grid key={actor.id} item xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                backgroundColor: theme.palette.mode === "dark" ? "#333" : "#fff",
                color: theme.palette.mode === "dark" ? "#fff" : "#000",
              }}
            >
              <CardMedia
                component="img"
                height="300"
                image={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                alt={actor.name}
              />
              <CardContent>
                <Typography variant="h6" component="p">
                  {actor.name}
                </Typography>
                <Typography variant="body2" color={theme.palette.mode === "dark" ? "textSecondary" : "textPrimary"}>
                  Popularity: {actor.popularity.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ActorsPage;
