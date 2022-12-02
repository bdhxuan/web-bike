const express = require('express');
const router = express.Router();
const {getFeatureProducts} = require("../controllers/feature.controller");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/feature").get(getFeatureProducts);

module.exports = router;