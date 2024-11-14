require("dotenv").config();
const express = require("express");
const {connection, authenticate} = require("./database/database.js");
const app = express();
const cors = require("cors");
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user.js");

app.use(cors());

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/users", userRoutes);


authenticate(connection);
connection.sync();

app.listen(process.env.APP_PORT, () => {
  console.log(`Servidor rodando em http://localhost:${process.env.APP_PORT}/`);
});