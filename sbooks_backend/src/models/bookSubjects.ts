import { DataTypes, Model } from "sequelize";
import { BookSubjectsModel } from "../types/bookSubjects/bookSubjects.model.types";
import sequelizeConnection from "./db.config";
import Subject from "./subject";
import Book from "./book";

class BookSubjects extends Model<BookSubjectsModel> implements BookSubjectsModel {
  subjectId!: number;
  bookId!: number;
}

BookSubjects.init(
  {
    subjectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "SubjectId"
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "BookId",
    },
  },
  {
    sequelize: sequelizeConnection,
  }
);

Subject.belongsToMany(Book, { through: BookSubjects, foreignKey: 'subjectId' });
Book.belongsToMany(Subject, { through: BookSubjects, foreignKey: 'bookId' });

BookSubjects.belongsTo(Book, { foreignKey: "bookId" });
Book.hasMany(BookSubjects, { foreignKey: "bookId" });
BookSubjects.belongsTo(Subject, { foreignKey: "subjectId" });
Subject.hasMany(BookSubjects, { foreignKey: "subjectId" });

export default BookSubjects;
