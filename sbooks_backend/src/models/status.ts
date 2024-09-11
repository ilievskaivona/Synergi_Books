import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from './db.config';
import { StatusModel } from "../types/status/status.model.type";

class Status
  extends Model<StatusModel>
  implements StatusModel {
    StatusId!: number
    name!: string 
}

Status.init(
  {
    StatusId: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
);

export default Status 