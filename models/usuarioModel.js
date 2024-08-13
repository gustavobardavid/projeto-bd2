import { define } from '../db/sequelize';
import { DataTypes } from 'sequelize';

const Usuario = define('Usuario', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    senha: {
      type: DataTypes.STRING
    }
  });
  
  async function sincronizar(){
    await Usuario.sync();
    console.log("Sincronizado");
  }
  
sincronizar();

export default Usuario; 