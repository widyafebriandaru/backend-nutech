const express = require("express");
const cors = require("cors");
const app = express();
const session = require("express-session");
const dotenv = require("dotenv");
// const {sequelize} = require("./models");

dotenv.config();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

app.listen(3001, () => {
    console.clear();
    console.debug("Server running on port http://localhost:3001");
});