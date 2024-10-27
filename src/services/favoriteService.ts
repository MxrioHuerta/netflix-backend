import { Favorite } from "../models/favoriteModel";
import {ClientSession} from "mongoose";


// Create a new favorite movie
export const createFavoriteService = async (userId: string, movieId: string, title: string, posterPath: string, overview: string): Promise<void> => {
    const existingFavorite = await Favorite.findOne({ userId, movieId });
    if (existingFavorite) {
        throw new Error('Favorite already exists');
    }
    // begin transaction
    const session: ClientSession = await Favorite.startSession();
    session.startTransaction();

    try {
        const favorite = new Favorite({ userId, movieId, title, posterPath, overview });
        await favorite.save();
        await session.commitTransaction();
    }
    catch (err) {
        await session.abortTransaction();
        throw err;
    }
    finally {
        await session.endSession();
    }
}

// Get all favorite movies
export const getFavoriteService = async (userId: string): Promise<any> => {
    return Favorite.find({ userId });
}

// Get a favorite movie
export const showFavoriteService = async (userId: string, movieId: string): Promise<any> => {
    return Favorite.findOne({ userId, movieId });
}

// Delete a favorite movie
export const deleteFavoriteService = async (userId: string, movieId: string): Promise<void> => {
    const favorite = await Favorite.findOne({
        userId,
        movieId
    });
    if (!favorite) {
        throw new Error('Favorite not found');
    }
    await Favorite.deleteOne({ userId, movieId });
}
