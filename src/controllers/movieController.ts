import { Request, Response } from 'express';
import {getMoviesService, showMovieService} from "../services/themoviedbService";


// Controller to get popular movies
export const getMovies = async (req: Request, res: Response): Promise<void> => {
    try {
        const movies = await getMoviesService();
        res.json(movies);
    }
    catch (err) {
        console.error('Error fetching movies:', err);
        res.status(500).json({ message: 'Error fetching movies' });
    }

};

// Controller to show a movie
export const showMovie = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    try {
        const movie = await showMovieService(parseInt(id));
        if (movie) {
            res.json(movie);
        } else {
            res.status(404).json({ message: 'Movie not found' });
        }
    }
    catch (err) {
        console.error('Error fetching movie:', err);
        res.status(500).json({ message: 'Error fetching movie' });
    }
};