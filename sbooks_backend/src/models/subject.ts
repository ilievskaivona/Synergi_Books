import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from './db.config';
import {SubjectModel} from "../types/subject/subject.model.types"

class Subject
  extends Model<SubjectModel>
  implements SubjectModel {
  SubjectId!: number;
  name!: string;
}

Subject.init(
  {
    SubjectId: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'Name'
    },    
   
  },
  {
    sequelize: sequelizeConnection
  }
);

export default Subject 