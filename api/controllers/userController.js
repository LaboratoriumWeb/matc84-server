const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const crypto = require("crypto")
const nodemailer = require("nodemailer")
const {Op} = require("sequelize")
const UserService = require("../services/userService")

class UserController{
    
    static async create(req, res) {
        try {
            const { name, email, password } = req.body;
            
            if (!(name && email && password)) {
                return res.status(400).json({ message: "All input fields are required" });
            }
            console.log("passei aqui")
            const user = await UserService.getUserByEmail(email);
            console.log("passei aqui")
            

            if (user) {
                return res.status(400).json({ message: "Email already registered" });
            }

            
            const hashedPassword = await bcrypt.hash(password, 10);
    
            const newUser = await UserService.createUser(name, email, hashedPassword);
    
            return res.status(201).json({ message: "User created", user: newUser });
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({ error: error.message || "Internal Server Error" });
        }
    }

    static async update(req, res) {
        try {
            const { name, email } = req.body;
            const userId = req.params.id; 
            
            // Verificar se usuário existe
            const user = await UserService.getUserById(userId);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
    
            // Atualizar dados
            const updatedData = {};
    
            if (name) {
                updatedData.name = name;
            }
    
            if (email) {
                const existingUser = await UserService.getUserByEmail(email);

                if (existingUser && existingUser.id !== userId) { // Verificar se email já está registrado
                    return res.status(400).json({ message: "Email already registered" });
                }

                updatedData.email = email.toLowerCase();
            }
    
           
            await UserService.updateUser(userId, updatedData)

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
            const user = await UserService.getUserById(userId);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Deletar usuário
            await UserService.deleteUser(userId)
            
            return res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            return res.status(500).json({ message: "Error deleting user", error: error.message });
        }
    }

    static async getAll(req, res) {
        try {
            const users = await UserService.getAllUsers();
            return res.status(200).json({ users });
        } catch (error) {
            return res.status(500).json({ message: "Error getting users", error: error.message });
        }
    }

    static async getUserById(req, res) {
        try {
            const userId = req.params.id;
        
            // Verificar se usuário existe
            const user = await UserService.getUserById(userId);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Retornar usuário
            return res.status(200).json({ user });
        } catch (error) {
            return res.status(500).json({ message: "Error getting user", error: error.message });
        }
    }

    static async requestPasswordReset(req, res) {
        try {
            const { email } = req.body;
            const user = await UserService.getUserByEmail(email);

            if(!user)return res.status(404).json({ message: "User not found" });

            // Gerar token de reset de senha
            const resetToken = crypto.randomBytes(20).toString("hex");
            const resetTokenExpiry = Date.now() + 1800000; // 30min a partir de agora

            // Atualizar usuário com token e data de expiração
            // Adicionar campos de resetToken e resetTokenExpiry no User que necessita deles
            await User.update({ resetToken, resetTokenExpiry }, { where: { email } });

            // Enviar email com link para reset de senha
            const transporter = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            const mailOptions = {
                to: user.email,
                from: process.env.EMAIL_USER,
                subject: "Recuperação de senha",
                text: `Você está recebendo este e-mail porque você (ou outra pessoa) solicitou uma mudança de senha.\n\n
                Por favor, clique ou copie e cole o link a seguir no seu navegador para prosseguir com a operação:\n\n
                http://${req.headers.host}/password-reset/${resetToken}\n\n
                Se você não solicitou essa alteração, ignore este e-mail e sua senha permanecerá inalterada.\n
                Por favor, não responda a este e-mail.\n`,
            };

            await transporter.sendMail(mailOptions);

            return res.status(200).json({ message: "Password reset email sent" });
        } catch (error) {
            return res.status(500).json({ message: "Error requesting password reset", error: error.message });
        }
    }

    
}

module.exports = UserController;
