import React from 'react';
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import SiteHeader from './components/siteHeader';
import HomePage from "./pages/homePage";
import UpcomingMoviesPage from './pages/UpcomingMoviesPage';
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import TrendingMoviesPage from './pages/trendingMoviesPage';
import AddMovieReviewPage from './pages/addMovieReviewPage';
import LatestMoviesPage from "./pages/LatestMoviesPage"; // Import LatestMoviesPage
import RecommendationsPage from "./pages/RecommendationsPage"; // Import RecommendationsPage
import TopRatedMoviesPage from "./pages/TopRatedMoviesPage"; // Import TopRatedMoviesPage

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3600000,
      cacheTime: 3600000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
          <Routes>
            <Route path="/reviews/:id" element={<MovieReviewPage />} />
            <Route path="/reviews/form" element={<AddMovieReviewPage />} />
            <Route path="/movies/trending" element={<TrendingMoviesPage />} />
            <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
            <Route path="/movies/latest" element={<LatestMoviesPage />} /> {/* New Route */}
            <Route path="/movies/recommendations" element={<RecommendationsPage />} /> {/* New Route */}
            <Route path="/movies/top-rated" element={<TopRatedMoviesPage />} /> {/* New Route */}
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(<App />);
