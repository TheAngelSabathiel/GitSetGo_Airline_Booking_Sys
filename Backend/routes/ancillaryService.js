const express = require("express");
const ancillaryController = require("../controllers/ancillaryService");
const { verify, verifyAdmin } = require("../auth");
const router = express.Router();

router.post("/", verify, verifyAdmin, ancillaryController.createService);

router.get("/all", verify, verifyAdmin, ancillaryController.getAllServices);

router.get("/active", ancillaryController.getAllActiveServices);

router.get("/:serviceId", ancillaryController.getServiceInfo);

router.patch("serviceId/update-info", verify, verifyAdmin, ancillaryController.updateServiceInfo);

router.patch("serviceId/activate", verify, verifyAdmin, ancillaryController.activateService);

router.patch("serviceId/archive", verify, verifyAdmin, ancillaryController.archiveService);

router.post("/service-by-name", ancillaryController.searchByName);

router.patch("/:serviceId/update-pic", verify, verifyAdmin, ancillaryController.uploadPicture);

module.exports = router;