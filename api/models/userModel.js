const { DataTypes, Model } = require('sequelize');
const {connection} = require ('../database/database.js');

class User extends Model {
    static associate(models) {
    }
}

User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
}, {
    sequelize: connection,
    modelName: "User",
    tableName: "users",
    timestamps: true,
    defaultScope: {
        attributes: {
            exclude: ['password']
        }
    }
});

module.exports = User;