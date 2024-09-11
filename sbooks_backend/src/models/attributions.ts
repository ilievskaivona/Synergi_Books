import { Model, DataTypes } from 'sequelize';
import { AttributionsModel } from '../types/attributions/attributions.model.types'
import sequelizeConnection from './db.config';
import User from './user'
import Book from  './book'
class Attributions extends Model<AttributionsModel> implements AttributionsModel {
    userId! : number;
    bookId! : number
}

Attributions.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: false
        },
        bookId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: false 
        },
    },
        {
            sequelize: sequelizeConnection
        }
)

User.belongsToMany(Book, { through: Attributions, foreignKey: 'userId' });
Book.belongsToMany(User, { through: Attributions, foreignKey: 'bookId' });

export default Attributions