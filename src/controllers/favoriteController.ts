import {Request, Response} from 'express';
import {createFavoriteService, getFavoriteService, showFavoriteService, deleteFavoriteService} from "../services/favoriteService";

// Controller to create a favorite movie
export const createFavorite = async (req: Request, res: Response): Promise<void> => {
    const { userId, movieId, title, posterPath, overview } = req.body;
    try {
        await createFavoriteService(userId, movieId, title, posterPath, overview);
        res.json({ message: 'Favorite created' });
    }
    catch (err) {
        console.error('Error creating favorite:', err);
        res.status(500).json({ message: 'Error creating favorite' });
    }
};


export const getFavorites = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.userId;
    try {
        const favorites = await getFavoriteService(userId);
        res.json(favorites);
    }
    catch (err) {
        console.error('Error fetching favorites:', err);
        res.status(500).json({ message: 'Error fetching favorites' });
    }
}

export const showFavorite = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.userId;
    const movieId = req.params.movieId;
    try {
        const favorite = await showFavoriteService(userId, movieId);
        if (favorite) {
            res.json(favorite);
        } else {
            res.status(404).json({ message: 'Favorite not found' });
        }
    }
    catch (err) {
        console.error('Error fetching favorite:', err);
        res.status(500).json({ message: 'Error fetching favorite' });
    }
}

export const deleteFavorite = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.userId;
    const movieId = req.params.movieId;
    try {
        await deleteFavoriteService(userId, movieId);
        res.json({message: 'Favorite deleted'});
    } catch (err) {
        console.error('Error deleting favorite:', err);
        res.status(500).json({message: 'Error deleting favorite'});
    }
}