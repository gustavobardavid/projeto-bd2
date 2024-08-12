// routes/mapRoutes.js
import { Router } from 'express';
const router = Router();
import { compra, index } from '../controllers/mapController.js';

router.get('/', index);

router.get('/compra', compra);

export default router;
