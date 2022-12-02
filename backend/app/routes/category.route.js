const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {createCategory, getAllCategory, deleteCategory} = require("../controllers/category.controller");


router.route("/admin/categories").get(getAllCategory)

router.route("/admin/category/new").post(isAuthenticatedUser, authorizeRoles("admin"), createCategory)

router.route("/admin/category/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteCategory)

module.exports = router;