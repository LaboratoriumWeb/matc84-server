const bcrypt = require("bcryptjs");
const { generateToken } = require("../helpers/authHelper");
const User = require("../models/userModel");

class AuthController {
    async register(req, res) {
        const { name, email, password } = req.body;

        try {
            const userExists = await User.findOne({ where: { email } });
            if (userExists) return res.status(400).json({ message: "Email already registered" });

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ name, email, password: hashedPassword });
            const token = generateToken(user);

            return res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email, role: 'admin' } });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Error registering user", error });
        }
    }

    async login(req, res) {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ where: { email } });
            if (!user) return res.status(404).json({ message: "User not found" });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

            const token = generateToken(user);
            return res.status(200).json({ token, user: { id: user.id, name: user.name, email: user.email } });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Error logging in", error });
        }
    }
}

module.exports = new AuthController();