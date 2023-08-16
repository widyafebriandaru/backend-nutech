const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const uploadRoutes = require("./router/UploadRoutes");
const products = require("./router/productsRoute")
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(cors());

app.use(uploadRoutes);
app.use(products);

const PORT = process.env.PORT || 3002;

app.listen(PORT, (e) => {
  if (e) throw e;

  console.log(`Server is running on PORT : ${PORT}`);
});
