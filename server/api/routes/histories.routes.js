const express = require("express");

const {
  historiesAdd,
  historiesList,
  historiesById,
  historiesEdit,
  historiesByIdUser
} = require("./../controller/histories_topup.controllers");

const checkAuth = require("./../middleware/checkAuth");

const router = express.Router();

// =====================================================================================
// ============================== [ROUTES USERS HISTORIES] =============================

router.get("/h", checkAuth, historiesList);

router.post("/h", checkAuth, historiesAdd);

router.get("/h/:id", checkAuth, historiesById);

router.patch("/h/:id", checkAuth, historiesEdit);

router.get("/u/:id", checkAuth, historiesByIdUser);

module.exports = router;
