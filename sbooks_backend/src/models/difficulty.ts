import { DifficultyModel } from "../types/difficulty/difficulty.model.types"
import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from './db.config';

class Difficulty extends Model<DifficultyModel> implements DifficultyModel {
    DifficultyId!: number;
    name!: string;
}

Difficulty.init (
   {
        DifficultyId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'Name'
        }
   }, 
   {
    sequelize: sequelizeConnection
   }
  )

  export default Difficulty