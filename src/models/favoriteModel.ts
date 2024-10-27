import { Schema, model, Document } from 'mongoose';

// Define the interface for the Favorite model
export interface IFavorite extends Document {
    userId: string;
    movieId: string;
    title: string;
    posterPath: string;
    overview: string;
}

// Define the Favorite
const favoriteSchema = new Schema<IFavorite>({
    userId: { type: String, required: true },
    movieId: { type: String, required: true },
    title: String,
    posterPath: String,
    overview: String,
}, { timestamps: true });

export const Favorite = model<IFavorite>('Favorite', favoriteSchema);
