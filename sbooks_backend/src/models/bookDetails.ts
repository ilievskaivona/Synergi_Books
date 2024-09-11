import { DataTypes, Model } from "sequelize";
import { BookDetailsModel } from "../types/bookDetails/bookDetails.model.types";
import sequelizeConnection from "./db.config";
import Book from '../models/book';

class BookDetails extends Model<BookDetailsModel> implements BookDetailsModel {
  BookDetailsId!: number;
  BookId!: number;
  description!: string;
  level!: number;
  parent?: number;
  sort!: number;
  source!: string;
}

BookDetails.init(
  {
    BookDetailsId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    BookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "BookId",
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "Description",
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "Level",
    },
    parent: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "Parent",
    },
    sort: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "Sort",
    },
    source: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "Source",
    },
  },
  {
    sequelize: sequelizeConnection,
  }
);
BookDetails.belongsTo(Book, { foreignKey: "BookId" });

BookDetails.belongsTo(Book, { foreignKey: "BookId" });
Book.hasMany(BookDetails, { foreignKey: "BookId" });

export default BookDetails;
