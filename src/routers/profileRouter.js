const { getProfile, setProfile } = require("../controllers/profileControllers");
const authorize = require("../middlewares/authorize");

const router = require("express").Router();

router.route("/").get(authorize, getProfile).post(authorize, setProfile);

module.exports = router;
