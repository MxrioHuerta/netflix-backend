import axios from 'axios';

const apiKey = process.env.TMDB_API_KEY as string;
const baseUrl = 'https://api.themoviedb.org/3';


// handle response class
class ApiResponse {
    constructor(public status: number, public data: any) {}

    static success(data: any) {
        return new ApiResponse(200, data);
    }

    static error(status: number, message: string) {
        return new ApiResponse(status, { message });
    }

    static fromAxiosResponse(response: any) {
        if (response.status === 200) {
            return ApiResponse.success(response.data);
        } else if (response.status === 404) {
            return ApiResponse.error(404, 'Not Found');
        } else if (response.status >= 500) {
            return ApiResponse.error(500, 'Error');
        } else {
            return ApiResponse.error(response.status, response.data.status_message || 'Unknown error');
        }
    }
}

// Service to get popular movies
export const getMoviesService = async (): Promise<any> => {
    try {
        const response = await axios.get(`${baseUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=1`);
        return ApiResponse.fromAxiosResponse(response).data.results;
    } catch (err) {
        console.error('Error fetching movies:', err);
        return [];
    }
};

// Service to show a movie
export const showMovieService = async (id: number): Promise<any> => {
    try {
        const response = await axios.get(`${baseUrl}/movie/${id}?api_key=${apiKey}&language=en-US`);
        return ApiResponse.fromAxiosResponse(response).data;
    } catch (err) {
        console.error('Error fetching movie:', err);
        return null;
    }
};