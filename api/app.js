require("dotenv").config();

const express = require("express");
const cors = require("cors");
const routers = require("./routes");
const port = process.env.PORT;