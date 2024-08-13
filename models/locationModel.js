import sequelize from '../db/sequelize.js';
import { DataTypes } from 'sequelize';

const Store = sequelize.define('Store', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    location: {
      type: DataTypes.GEOMETRY('POINT'),
      allowNull: false    
    }
  });
  
  async function sincronizar(){
    await Store.sync();
    console.log("Sincronizado");
  }
  
sincronizar();

export default Store; 