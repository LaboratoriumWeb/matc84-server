const { DataTypes, Model } = require('sequelize');
const {sequelize} = require('../database/database');

class User extends Model {

    static associate(models) {
        this.hasMany(models.Task, {
            foreignKey: {
                name: "userId",
                allowNull: false, //Garante participação total
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            as: 'tasks' // Nome do relacionamento
        });
    }
    
}

User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: {
        type:DataTypes.STRING,
        defaultValue: 'user'
    },
    resetToken: DataTypes.STRING,
    resetTokenExpiry: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
}, {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
});

module.exports = User;