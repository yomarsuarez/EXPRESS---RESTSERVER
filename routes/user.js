const { Router } = require("express");
const {
  usersGet,
  userUpdate,
  userCreate,
  userDelete,
} = require("../controllers/user");

const router = Router();

router.get("/", usersGet);

router.put("/:id", userUpdate);

router.post("/", userCreate);

router.delete("/", userDelete);

module.exports = router;
