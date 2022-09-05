const express = require("express");

const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");
const { validateBody } = require("../../middlewares");
const schema = require("../../schemas/contacts");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", validateBody(schema), ctrlWrapper(ctrl.add));

router.delete("/:id", ctrlWrapper(ctrl.deleteById));

router.put("/:id", validateBody(schema), ctrlWrapper(ctrl.updateById));

module.exports = router;
