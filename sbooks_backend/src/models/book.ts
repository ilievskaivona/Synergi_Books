import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from './db.config';
import { BookModel, BookStatus, Grade, Difficulty } from "../types/book/book.model.types";
import User from './user';

class Book
  extends Model<BookModel>
  implements BookModel {
  BookId!: number;
  title!: string;
  grade!: Grade;
  difficulty!: Difficulty;
  author!: string;
  status!: BookStatus;
  createdBy!: number;
  updatedBy!: number
}

Book.init(
  {
    BookId: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'Title'
    },
    grade: {
      type: DataTypes.ENUM,
      values: Object.values(Grade),
      allowNull: false,
      field: 'Grade'
    },
    difficulty: {
      type: DataTypes.ENUM,
      values: Object.values(Difficulty),
      allowNull: false,
      field: 'Difficulty'
    },
    author: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'Author'
    },
    status: {
      type: DataTypes.ENUM,
      values: Object.values(BookStatus),
      allowNull: false,
      field: 'Status'
    },
    createdBy: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: 'CreatedBy'
    },
    updatedBy: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: 'UpdatedBy'
    },
  },
  {
    sequelize: sequelizeConnection
  }
);
Book.belongsTo(User, { foreignKey: "createdBy" });
User.hasMany(Book, { foreignKey: "createdBy" });
Book.belongsTo(User, { foreignKey: "updatedBy" });
User.hasMany(Book, { foreignKey: "updatedBy" });

export default Book 