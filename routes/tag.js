const router = require("express").Router();
const tagController = require("../controllers/tag")

router.get("/all", tagController.index);

router.get("/create", tagController.createGET);
router.post("/create", tagController.createPOST);

router.get("/:id", tagController.details);

router.get("/:id/edit", tagController.editGET);
router.post("/:id/edit", tagController.editPOST);

router.get("/:id/delete", tagController.deleteGET);
router.post("/:id/delete", tagController.deletePOST);

module.exports = router;