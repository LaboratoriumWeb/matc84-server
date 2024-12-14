const bcrypt = require("bcryptjs");

class authService{
    
    static async login(email, password){
        const user = await User.findOne({ where: { email } });
        const isMatch = await bcrypt.compare(password, user.password);

        return isMatch;
    }
}