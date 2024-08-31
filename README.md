# Assignment 1 - React Application with TMDB API Integration

## Name: Mark Ryan

## Features

This React application integrates with the TMDB API and includes the following features:

### Movie Pages:
- Added pages for Trending Movies, Upcoming Movies, Latest Movies, and Top Rated Movies.
- Implemented a Movie Details page that shows movie details, a carousel of posters, and lists of recommended and similar movies.

### Actor Pages:
- Implemented an Actors Page where users can search for actors by name.
- Each actor's page shows their biography, image, and filmography. Users can click on any movie in the filmography to view its details.

### User Interaction:
- Added a Favorites feature where users can add movies to their favorites.
- Implemented a More Info button on movie cards that leads to the detailed movie page.
- Integrated a basic Review Form where users can submit reviews. These reviews are saved locally.

### Dark/Light Mode Toggle:
- Implemented a toggle switch to allow users to switch between dark and light themes.

## Setup Requirements

1. Clone the Repository:
    ```bash
    git clone https://github.com/TheMarkRyan/Assignment01Repeat.git
    ```

2. Install Dependencies:
    ```bash
    npm install
    ```

3. Run the Application:
    ```bash
    npm start
    ```

## API Integration

This application interacts with the TMDB API for the following functionalities:
- Fetching Movies: Trending, upcoming, latest, and top-rated movies.
- Fetching Movie Details: Details, posters, recommended movies, and similar movies.
- Actor Search: Searching for actors by name and fetching their details.

## Independent Learning

For this project, I learned and implemented:
- **Material-UI**: Used for the UI components, including implementing a responsive design.
- **Local Storage**: For storing user favorites and reviews locally.

## References

Used Chat-GPT for resolving errors, explaining error messages, fixing syntax issues, etc.
