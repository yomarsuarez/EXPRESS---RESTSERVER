const { Router } = require("express");
const {
  usersGet,
  userUpdate,
  userCreate,
  userDelete,
} = require("../controllers/user");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const {
  isRoleValid,
  isexistEmail,
  isexistUserById,
} = require("../helpers/db-validators");

const router = Router();

router.get("/", usersGet);

router.put(
  "/:id",
  [
    check("id", "Not a valid MongoDB ID").isMongoId(),
    check("id").custom(isexistUserById),
    check("role").custom(isRoleValid),
    validateFields,
  ],
  userUpdate
);

router.post(
  "/",
  [
    check("email", "email does not exists"),
    check("name", "The name is mandatory").notEmpty(),
    check("password", "The password must be at least 6 characters").isLength({
      min: 6,
    }),
    // check("role", "Role is not valid").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("role").custom(isRoleValid),
    check("email").custom(isexistEmail),
    validateFields,
  ],
  userCreate
);

router.delete(
  "/:id",
  [
    check("id", "Not a valid MongoDB ID").isMongoId(),
    check("id").custom(isexistUserById),
    validateFields,
  ],
  userDelete
);

module.exports = router;
