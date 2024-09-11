import { Sequelize } from 'sequelize'
import { env } from '../env';

const schema ="sb";
const connection_url = env.db.url
const sequelizeConnection = new Sequelize(connection_url, 
  {schema : schema,
   define: {
    timestamps: true,
    createdAt: 'CreatedAt',
    updatedAt: 'UpdatedAt',
    freezeTableName: true
   }
  });
 export default sequelizeConnection