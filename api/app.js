require("dotenv").config();
const express = require("express");
const initializeDatabase = require("./database/database.js");
const app = express();
const port = process.env.APP_PORT;

app.use(express.json());

(async () => {
    const connection = await initializeDatabase();    
    try {
        await connection.sync();
    } catch (error) {
        console.error("Error during database synchronization:", error);
    }

    app.listen(port, () => {
        console.log(`Server running on port http://localhost:${port}/`);
    });
})();

module.exports = app;