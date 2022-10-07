const express = require("express");
const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");
const { validateBody, isValidId, auth } = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getAll));

router.get("/:id", auth, isValidId, ctrlWrapper(ctrl.getById));

router.post("/", auth, validateBody(schemas.addSchema), ctrlWrapper(ctrl.add));

router.put(
  "/:id",
  auth,
  isValidId,
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:id/favorite",
  auth,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

router.delete("/:id", auth, isValidId, ctrlWrapper(ctrl.deleteById));

module.exports = router;
