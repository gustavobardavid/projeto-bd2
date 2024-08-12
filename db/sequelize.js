import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(stores, postgres, postgres, {
  host: localhost,
  dialect: postgres,
  port: 5432
});

conectar = async () => {
  try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
}

conectar();

export default sequelize;
