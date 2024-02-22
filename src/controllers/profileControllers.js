const _ = require("lodash");
const { Profile } = require("../models/profileModel");

module.exports.getProfile = async (req, res) => {
  const userId = req.user._id;
  const profile = await Profile.findOne({ user: userId }).populate("user", [
    "name",
    "email",
  ]);
  if (!profile) {
    return res.status(404).send("Profile not found");
  }
  return res.status(200).send(profile);
};

module.exports.setProfile = async (req, res) => {
  const userId = req.user._id;
  const userProfile = _.pick(req.body, [
    "phone",
    "address1",
    "address2",
    "city",
    "state",
    "postCode",
    "country",
  ]);

  userProfile["user"] = userId;
  let profile = await Profile.findOne({ user: userId });

  if (profile) {
    profile = await Profile.updateOne({ user: userId }, userProfile);
    return res.status(200).send(profile);
  } else {
    profile = new Profile(userProfile);
    profile = await profile.save();
    return res.status(201).send(profile);
  }
};
