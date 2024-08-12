import locationModel from '../models/locationModel.js';

export function index(req, res) {
  const locations = locationModel.getAllLocations();
  res.render('index', { locations });
}

export function compra(req, res) {
  res.render('compra', {title: 'Compra'});
}