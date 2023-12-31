const express = require("express");

const productApiController = require("../../controllers/ApiControllers/apiControllerProducts")

const router = express.Router();

//Endpoints

router.get("/apiProducts", productApiController.getApiList)

router.get("/apiProducts/:id/detailApi", productApiController.getApiDetail)

router.get("/apiProducts/lastProduct", productApiController.getLastProduct)

router.get("/apiProducts/DanzasProducts", productApiController.getDanzasProducts)

router.get("/apiProducts/DeportesProducts", productApiController.getDeportesProducts)

router.get("/apiProducts/FitnessProducts", productApiController.getFitnessProducts)

router.get("/apiProducts/YogaProducts", productApiController.getYogaProducts)

module.exports = router