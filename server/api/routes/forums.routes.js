const express = require("express");

const {
  forumList,
  forumAdd,
  forumEdit,
  forumById,
  forumDelete
} = require("./../controller/forums.controllers");

const checkAuth = require("./../middleware/checkAuth");

const router = express.Router();

// ====================================================================================
// ============================== [ROUTES USERS FORUM] =============================
router.get("/forum/f", checkAuth, forumList);

router.post("/forum/f", checkAuth, forumAdd);

router.patch("/forum/f/:id", checkAuth, forumEdit);

router.get("/forum/f/:id", checkAuth, forumById);

router.delete("/forum/f/:id", checkAuth, replyDeleteByIdForum, forumDelete);

module.exports = router;
