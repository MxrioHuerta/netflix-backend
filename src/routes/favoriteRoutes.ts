import { Router } from 'express';
import { createFavorite, getFavorites, deleteFavorite, showFavorite} from "../controllers/favoriteController";
import { verifyFirebaseToken } from "../middleware/auth.middleware";

const router: Router = Router();

// Ruta para obtener películas
// router.use(verifyFirebaseToken);

router.get('/favorite/:userId', getFavorites);
router.post('/favorite/', createFavorite);
router.get('/favorite/:userId/movie/:movieId', showFavorite);
router.delete('/favorite/:userId/movie/:movieId', deleteFavorite);

export default router;
