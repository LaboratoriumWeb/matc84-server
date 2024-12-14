const bcrypt = require("bcryptjs");

class AuthService{
    
    static async login(email, password){
        const user = await User.findOne({ where: { email } });
        const isMatch = await bcrypt.compare(password, user.password);

        return isMatch;
    }
}
module.exports = AuthService;