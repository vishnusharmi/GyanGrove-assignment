const express = require("express");
const eventController = require("../controller/controller_event");
const router = express.Router();

router.post("/events", eventController.createEvent);
router.post("/event/find", eventController.findEvent);

module.exports = router;
