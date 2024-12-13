const { DataTypes, Model } = require('sequelize');
const {sequelize} = require ('../database/database.js');
const User = require("../models/userModel")

class Task extends Model {
    static associate(models) {
        this.belongsTo(models.User, {
            foreignKey: {
                name: "userId",
                allowNull: false, //Garante participação total
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            as: 'user' //Nome do relacionamento
        });
    }
    
}

Task.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    sequelize: sequelize,
    modelName: "Task",
    tableName: "tasks",
    timestamps: true
});


//Comment - Felipe: User é criado antes de task - Ver se há como melhorar
Task.associate(sequelize.models) 
User.associate(sequelize.models) 

module.exports = Task;