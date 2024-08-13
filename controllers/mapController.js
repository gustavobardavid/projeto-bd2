import Store from "../models/locationModel.js";
import Retirada from "../models/retiradaModel.js";

export async function index(req, res) {
  const locations = await Store.findAll();
  res.render('index', { locations });
}

export function compra(req, res) {
  res.render('compra', {title: 'Compra'});
}

export async function getAllStores(req, res) {
  const locations = await Store.findAll();
  res.json(locations);
}

export async function retirada(req, res) {
  res.render('retirada');
}

export async function agendarRetirada(req, res) {
  try {
    const { store, nomeCliente, email, cpfCliente, item } = req.body;
    
    const loja = await Store.findOne({ where: { name: store } });
      
    const localizacaoLoja = loja.location;

    
    
    const retirada = await Retirada.create({
      nomeCliente,
      cpfCliente,
      email,
      localizacaoLoja,
      item,
    });

    res.render('retiradaAgendada');
  } catch (error) {
    console.error('Erro ao agendar retirada:', error);
    res.status(500).send('Erro ao agendar retirada');
  }
}

export async function pedidos(req, res) {
  res.render('pedidos')
}