import { Router } from 'express';
import { getMovies, showMovie } from '../controllers/movieController';

const router: Router = Router();

// Ruta para obtener películas
router.get('/movie/', getMovies);
router.get('/movie/:id', showMovie);

export default router;
