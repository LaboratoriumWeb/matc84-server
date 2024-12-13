require("dotenv").config();
const express = require("express");
const { sequelize, initializeSequelize } = require("./database/database.js");
const app = express();
const cors = require("cors");
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user.js");

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

// Rota do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

initializeSequelize().then(() => {
  sequelize.sync().then(() => {
    app.listen(process.env.APP_PORT, () => {
      console.log(`Servidor rodando em http://localhost:${process.env.APP_PORT}/`);
    });
  }).catch(err => {
    console.error("Erro ao sincronizar o banco de dados:", err);
  });
}).catch(err => {
  console.error("Erro ao inicializar o Sequelize:", err);
});