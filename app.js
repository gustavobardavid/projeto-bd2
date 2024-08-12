// app.js
import express, { static as static_folder } from 'express';
const app = express();
import mapRoutes from './routes/mapRoutes.js';

// Configura o mecanismo de visualização para EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Configura a pasta pública para arquivos estáticos
app.use(static_folder('public'));

// Usa as rotas do mapa
app.use('/', mapRoutes);

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
