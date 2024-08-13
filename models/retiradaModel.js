import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

const Retirada = sequelize.define('Retirada', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  nomeCliente: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cpfCliente: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  localizacaoLoja: {
    type: DataTypes.GEOMETRY('POINT'),
    allowNull: false
  },
  item: {
    type: DataTypes.STRING,
    allowNull: false
  },
  concluida: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  }
})

async function sincronizar(){
  await Retirada.sync();
  console.log("Sincronizado");
}

sincronizar();

export default Retirada;
