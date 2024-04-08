
const router = require("express").Router();
const apiController = require("../controllers/api-controllers");

router
    .route('/')
    .get(apiController.index)

router 
    .route('/:id')
    .get(apiController.getProperty)


module.exports = router;