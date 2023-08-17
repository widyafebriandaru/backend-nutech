const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const { sequelize } = require("./models");
const uploadRoutes = require("./router/UploadRoutes");
const products = require("./router/productsRoute")
const user = require("./router/UserRoute");
const auth = require("./router/AuthRoute");
const dotenv = require('dotenv');
const session = require("express-session");
const SequelizeStore = require('connect-session-sequelize')(session.Store);


dotenv.config();
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'
}));
app.use(express.urlencoded());
app.use(express.json());

app.use(session({
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
    tableName: 'Sessions'
  }),
  cookie: {
      secure: 'auto'
  }
}));

app.use(uploadRoutes);
app.use(products);
app.use(user);
app.use(auth);

app.listen(3002, () => {
  console.clear();
  console.debug("Server running on port http://localhost:3002");
});