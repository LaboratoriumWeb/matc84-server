const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const {Op} = require("sequelize")

class UserController{
    static async create(req, res){
        try{
            const { name, email, password, role } = req.query;
            if (!(name && email && senha && role)) {
                throw "All input are required";
            }

            const user = await User.findOne({where: {email}});

            user ? res.status(400).json({message: "Email already registered"}) : '';
           
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const newUser = await User.create({
                name,
                email: email.toLowerCase(),
                password: hashedPassword,
                role
            })

            delete newUser.dataValues.password;
            return res.status(201).json({message: "User created"}, newUser);
        }catch(error){
            return error;
        }
    }

    static async update(req, res) {
        try {
            const { name, email, password } = req.body;
            const userId = req.params.id; 
            
            // Verificar se usuário existe
            const user = await User.findOne({ where: { id: userId } });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
    
            // Atualizar dados
            const updatedData = {};
    
            if (name) {
                updatedData.name = name;
            }
    
            if (email) {
                const existingUser = await User.findOne({ where: { email } });
                if (existingUser && existingUser.id !== userId) { // Verificar se email já está registrado
                    return res.status(400).json({ message: "Email already registered" });
                }
                updatedData.email = email.toLowerCase();
            }
    
            if (password) {
                const hashedPassword = await bcrypt.hash(password, saltRounds);
                updatedData.password = hashedPassword;
            }
    
            await User.update(updatedData, { where: { id: userId } });
    
            // Retornar os dados do usuário atualizados
            const updatedUser = await User.findOne({ where: { id: userId } });
            delete updatedUser.dataValues.password; // Não mostrar a senha por motivos de segurança
    
            return res.status(200).json({ message: "User updated successfully", user: updatedUser });
        } catch (error) {
            return res.status(500).json({ message: "Error updating user", error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const userId = req.params.id;
            
            // Verificar se usuário existe
            const user = await User.findOne({ where: { id: userId } });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Deletar usuário
            await User.destroy({ where: { id: userId } });
            
            return res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            return res.status(500).json({ message: "Error deleting user", error: error.message });
        }
    }

    static async getAll(req, res) {
        try {
            // Pegar todos os usuários
            const users = await User.findAll();

            users.forEach(user => {
                delete user.dataValues.password; // Não mostrar a senha por motivos de segurança
            });

            return res.status(200).json({ users });
        } catch (error) {
            return res.status(500).json({ message: "Error getting users", error: error.message });
        }
    }

    static async getUserById(req, res) {
        try {
            const userId = req.params.id;
            
            // Verificar se usuário existe
            const user = await User.findOne({ where: { id: userId } });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            delete user.dataValues.password; // Não mostrar a senha por motivos de segurança

            // Retornar usuário
            return res.status(200).json({ user });
        } catch (error) {
            return res.status(500).json({ message: "Error getting user", error: error.message });
        }
    }
}

module.exports = UserController;