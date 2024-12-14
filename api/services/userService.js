const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const crypto = require("crypto")
const nodemailer = require("nodemailer")
const {Op} = require("sequelize")

class UserService{

    static async createUser(name, email, hashedPassword, role){
        const newUser = await User.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            role
        })

        delete newUser.dataValues.password;
    }

    static async updateUser(userId, updatedData){
        await User.update(updatedData, { where: { id: userId } });
        
    }

    static async deleteUser(userId){

        await User.destroy({ where: { id: userId } });

    }

    static async 
}
module.exports = UserService;