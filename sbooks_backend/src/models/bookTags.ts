import { DataTypes, Model } from "sequelize";
import { BookTagsModel } from "../types/bookTags/bookTags.model.types";
import sequelizeConnection from "./db.config";
class BookTags extends Model<BookTagsModel> implements BookTagsModel {
  TagId!: number;
  BookId!: number;
}

BookTags.init(
  {
    TagId: {
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
  },
  {
    sequelize: sequelizeConnection,
  }
);

export default BookTags;
