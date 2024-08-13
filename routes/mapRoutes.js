// routes/mapRoutes.js
import { Router } from 'express';
const router = Router();
import { compra, getAllStores, index, retirada, agendarRetirada } from '../controllers/mapController.js';

router.get('/', index);

router.get('/compra', compra);

router.get('/retirada', retirada); 

router.post('/agendar', agendarRetirada);

router.get('/lojas', getAllStores);

router.get('/pedidos', pedidos);

export default router;
