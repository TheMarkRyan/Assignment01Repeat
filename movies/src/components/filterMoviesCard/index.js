import React from "react";
import { useQuery } from "react-query";
import Spinner from '../spinner';
import Card from "@mui/material/Card";
import { getGenres } from "../../api/tmdb-api";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";

const formControl = {
  minWidth: 150,
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  borderRadius: "8px",
  marginRight: "16px",
};

export default function FilterMoviesCard(props) {
  const { data, error, isLoading, isError } = useQuery("genres", getGenres);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const genres = Array.isArray(data?.genres) ? data.genres : [];
  if (genres.length > 0 && genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }

  const handleTextChange = (e) => {
    handleChange(e, "name", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  };

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value);
  };

  return (
    <Card
  sx={{
    width: "100%",
    backgroundColor: "#203354", // Adjust this color as needed
    color: "#ffffff",
    borderRadius: 1,
    marginBottom: 2,
    padding: 2, // Optional padding to make it look more polished
  }}
  variant="outlined"
>
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%", // Ensure CardContent takes up the full available width
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <SearchIcon fontSize="large" sx={{ marginRight: 2 }} />
          <Typography variant="h5" component="h1" sx={{ marginRight: 2 }}>
            Filter Movies
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
            justifyContent: "space-evenly",
            width: "100%", // Allow the input and select fields to stretch fully
          }}
        >
          <TextField
            sx={{ ...formControl, flexGrow: 1 }} // Allow search field to grow
            id="filled-search"
            label="Search by Title"
            type="search"
            variant="outlined"
            value={props.titleFilter}
            onChange={handleTextChange}
          />
          <FormControl sx={{ ...formControl, minWidth: 180 }}>
            <InputLabel id="genre-label">Genre</InputLabel>
            <Select
              labelId="genre-label"
              id="genre-select"
              value={props.genreFilter}
              onChange={handleGenreChange}
            >
              {genres.map((genre) => (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </CardContent>
    </Card>
  );
}
