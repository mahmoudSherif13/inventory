const router = require("express").Router();
const itemController = require("../controllers/item")


router.get("/all", itemController.index);

router.get("/create", itemController.createGET);
router.post("/create", itemController.createPOST);

router.get("/:id", itemController.details);

router.get("/:id/edit", itemController.editGET);
router.post("/:id/edit", itemController.editPOST);

router.get("/:id/delete", itemController.deleteGET);
router.post("/:id/delete", itemController.deletePOST);

module.exports = router;