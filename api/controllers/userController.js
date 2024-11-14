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
}

module.exports = UserController;