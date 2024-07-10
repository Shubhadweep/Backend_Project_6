const express = require('express');
const route = express.Router();
const { getReg,regPost,getOrder, postOrder, allDetails, userDetails, searchByCity} = require('../Controller/userController');

route.get("/Reg" ,getReg)
route.post("/postReg",regPost);

route.get("/order" ,getOrder);
route.post("/postOrder",postOrder);

route.get("/OrderDetails",allDetails);
route.get("/userDetails",userDetails);
route.get("/citySearch/:cityName",searchByCity);

module.exports = route;