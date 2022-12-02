const express = require('express');
const router = express.Router();
const {getNewArrivals, getFilterPriceAsc, getFilterPriceDesc} = require("../controllers/filter.controller")
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");


router.route("/filter").get(getNewArrivals);

router.route("/filter/priceasc").get(getFilterPriceAsc);

router.route("/filter/pricedesc").get(getFilterPriceDesc);


module.exports = router;