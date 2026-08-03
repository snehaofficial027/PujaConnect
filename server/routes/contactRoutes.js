const router = require("express").Router();

const {
  sendMessage,
  getAllMessages,
  deleteMessage,
} = require("../controllers/contactController");

router.post("/", sendMessage);

router.delete("/:id", deleteMessage);

router.get("/", getAllMessages);

module.exports = router;