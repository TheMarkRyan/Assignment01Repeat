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
  margin: 1,
  minWidth: 150,
  backgroundColor: "rgb(255, 255, 255)"
};

export default function FilterMoviesCard(props) {
  const { data, error, isLoading, isError } = useQuery("genres", getGenres);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  // Check if genres are defined and is an array
  const genres = Array.isArray(data?.genres) ? data.genres : [];

  // Ensure "All" is added as the first option
  if (genres.length > 0 && genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }

  const handleTextChange = (e) => {
    handleChange(e, "name", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  };

  // This handleChange calls the passed in onUserInput from the parent component
  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value);
  };

  return (
    <Card 
      sx={{
        width: "100%", /* Ensure the card spans the full width */
        backgroundColor: "#203354", /* Adjust this color as needed */
        color: "#ffffff", /* Ensure text is visible on the new background */
        borderRadius: 1,
        marginBottom: 2,
      }} 
      variant="outlined"
    >
      <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}> {/* Flexbox for horizontal layout */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <SearchIcon fontSize="large" sx={{ marginRight: 2 }} />
          <Typography variant="h5" component="h1" sx={{ marginRight: 2 }}>
            Filter Movies
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1, justifyContent: "space-evenly" }}> {/* Flexbox to evenly space form controls */}
          <TextField
            sx={{...formControl, flexBasis: "40%"}} /* Adjust width */
            id="filled-search"
            label="Search field"
            type="search"
            variant="filled"
            value={props.titleFilter}
            onChange={handleTextChange}
          />
          <FormControl sx={{...formControl, flexBasis: "30%"}}> {/* Adjust width */}
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
