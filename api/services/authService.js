const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

class AuthService{
    
    static async login(email, password){
        const user = await User.findOne({ where: { email }, attributes: ['password', 'email', 'name']});
        const isMatch = await bcrypt.compare(password, user.password);

        return isMatch;
    }
}
module.exports = AuthService;