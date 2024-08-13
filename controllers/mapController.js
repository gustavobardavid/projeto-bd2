import Store from "../models/locationModel.js";
import Retirada from "../models/retiradaModel.js";

export async function renderizarPaginaHome(req, res) {
  const locations = await Store.findAll();
  res.render('paginaHome', { locations });
}

export function renderizarPaginaItem(req, res) {
  res.render('paginaItem', {title: 'Compra'});
}

export async function getAllStores(req, res) {
  const locations = await Store.findAll();
  res.json(locations);
}

export async function renderizarPaginaAgendar(req, res) {
  res.render('paginaAgendarRetirada');
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

    res.render('paginaRetiradaAgendada');
  } catch (error) {
    console.error('Erro ao agendar retirada:', error);
    res.status(500).send('Erro ao agendar retirada');
  }
}

export async function renderizarPaginaRetiradas(req, res) {
  res.render('paginaMinhasRetiradas')
}

export async function fetchRetiradas(req, res) {
  const pedidos = await Retirada.findAll();
  res.json(pedidos);
}

export async function excluirRetirada(req, res) {
  const { id } = req.params;
  const retirada = Retirada.destroy({ where: { id: id } });
  res.json(retirada);
}

export async function marcarComoConcluida(req, res) {
  try {
    const { id } = req.params;
    
    const retirada = await Retirada.findByPk(id);

    if (retirada) {
      retirada.concluida = true;
      await retirada.save();

      res.status(200).json({ message: 'Retirada marcada como concluída com sucesso.' });
    } else {
      res.status(404).json({ message: 'Retirada não encontrada.' });
    }
  } catch (error) {
    console.error('Erro ao marcar retirada como concluída:', error);
    res.status(500).json({ message: 'Erro ao marcar retirada como concluída.', error });
  }
}
