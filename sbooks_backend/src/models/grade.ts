import { DataTypes, Model } from "sequelize";
import { GradeModel } from "../types/grade/grade.model.types";
import sequelizeConnection from "./db.config";

class Grade extends Model<GradeModel> implements GradeModel {
  GradeId!: number;
  name!: string;
}

Grade.init(
  {
    GradeId: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "Name",
    },
  },
  {
    sequelize: sequelizeConnection,
  }
);

export default Grade;
