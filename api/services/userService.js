const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const crypto = require("crypto")
const nodemailer = require("nodemailer")
const {Op} = require("sequelize")

class UserService{

    static async createUser(name, email, hashedPassword, role){
        const newUser = await User.create({
            name: name,
            email: email.toLowerCase(),
            password: hashedPassword,
            role: role
        })

        delete newUser.dataValues.password;

        return newUser;
    }

    static async updateUser(userId, updatedData){
        await User.update(updatedData, { where: { id: userId } });
        
    }

    static async deleteUser(userId){
        await User.destroy({ where: { id: userId } });

    }

    static async getUserByEmail(email){
        const user = await User.findOne({ where: { email } });
        // if(user) delete user.dataValues.password;

        return user;
    }

    static async getUserById(userId){
        const user = await User.findOne({ where: { id: userId } });
        if(user) delete user.dataValues.password;
        return user;
    }

    static async getAllUsers(){
         const users = await User.findAll();

         users.forEach(user => {
             delete user.dataValues.password;
         });
         
         return users;
    }

    static async getUserByEmail(email) {
        const user = await User.findOne({ where: { email } });

        return user; // Precisa retornar com a senha, pois método é chamado para resetar a senha
    }

    static async getUserByResetToken(token) {
        const user = await User.findOne({ where: { resetToken: token } });

        return user; // Precisa retornar com a senha, pois método é chamado para resetar a senha
    }

}
module.exports = UserService;
