import locationModel from '../models/locationModel.js';

export async function index(req, res) {
  const locations = await locationModel.findAll();
  res.render('index', { locations });
}

export function compra(req, res) {
  res.render('compra', {title: 'Compra'});
}