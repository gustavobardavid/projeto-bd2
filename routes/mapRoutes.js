// routes/mapRoutes.js
import { Router } from 'express';
const router = Router();
import { renderizarPaginaHome, getAllStores, agendarRetirada, renderizarPaginaAgendar, renderizarPaginaItem, renderizarPaginaRetiradas, fetchRetiradas, excluirRetirada, marcarComoConcluida } from '../controllers/mapController.js';

router.get('/', renderizarPaginaHome);

router.get('/item', renderizarPaginaItem);

router.get('/pagina-agendar', renderizarPaginaAgendar); 

router.post('/agendar', agendarRetirada);

router.get('/lojas', getAllStores);

router.get('/pagina-retiradas', renderizarPaginaRetiradas);

router.get('/retiradas', fetchRetiradas);

router.delete('/retiradas/:id', excluirRetirada);

router.patch('/retiradas/:id/concluir', marcarComoConcluida);

export default router;
