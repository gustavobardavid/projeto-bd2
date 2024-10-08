// app.js
import express, { static as static_folder } from 'express';
import bodyParser from 'body-parser';
const app = express();
import mapRoutes from './routes/mapRoutes.js';

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(static_folder('public'));

// Usa as rotas do mapa
app.use('/', mapRoutes);

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
