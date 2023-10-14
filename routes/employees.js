const express = require("express");
const router = require("router");
const { auth } = require("../middleware/auth");
const { all } = require("./users");

// /api/employees
router.get("/", auth, all);
// /api/employees/:id
router.get("/:id", auth, () => console.log("get singe employees"));
// /api/employees/add
router.post("/add", auth, () => console.log("add employee"));
// /api/employees/remove/:id
router.post("/remove/:id", auth, () => console.log("remove employee"));
// /api/employees/edit/:id
router.put("/edit/:id", auth, () => console.log("remove employee"));

module.exports = router;
