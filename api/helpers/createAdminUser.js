require("dotenv").config();
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

async function createAdminUser() {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
        console.error("Admin email and password must be set in the .env file");
        return;
    }

    const adminUser = await User.findOne({ where: { email: adminEmail } });
    if (!adminUser) {
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        await User.create({
            name: "admin",
            email: adminEmail,
            password: hashedPassword,
            role: "admin"
        });
        console.log("Usuário administrador criado com sucesso!");
    } else {
        console.log("Usuário administrador já existe.");
    }
}

module.exports = createAdminUser;