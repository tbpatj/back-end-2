const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

//Variable Declaration
const SERVER_PORT = 4004;
const baseLocURL = "/api/houses";

//controller file imports
const userController = require("./controller");
const { updateHouse } = require("./controller");
app.get(baseLocURL,userController.getAllHouses);
app.delete(baseLocURL + "/:curID",userController.deleteHouse);
app.post(baseLocURL,userController.createHouse);
app.put(baseLocURL + "/:id", updateHouse);

app.listen(SERVER_PORT, () => console.log(`Server running on ${SERVER_PORT}`));
