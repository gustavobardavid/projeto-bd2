import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize';

const Store = sequelize.define('Store', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: {
    type: DataTypes.GEOMETRY('POINT'),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  }

})

async function sincronizar(){
  await Store.sync();
  console.log("Sincronizado");
}

sincronizar();

export default Store;
