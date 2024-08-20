import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

const AddReviewForm = ({ movieId, onSubmit }) => {
  const [reviewText, setReviewText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reviewText.trim()) {
      onSubmit(reviewText);
      setReviewText(""); // Reset the text field after submission
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.1)", // White background with slight transparency
        padding: "20px",
        borderRadius: "10px",
        color: "#fff", // White text color
        marginTop: "20px",
      }}
    >
      <Typography variant="h6" sx={{ color: "#fff", marginBottom: "10px" }}>
        Write your review
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          placeholder="Share your thoughts about the movie..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          sx={{
            input: { color: "#fff" }, // White input text
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#fff", // White border for the input field
              },
              "&:hover fieldset": {
                borderColor: "#fff", // White border on hover
              },
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#fff",
            color: "#000",
            marginTop: "10px",
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
        >
          Submit Review
        </Button>
      </form>
    </Box>
  );
};

export default AddReviewForm;

