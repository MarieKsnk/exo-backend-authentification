import User from "../models/User";

export const getUserProfile = async (req, res) => {
  console.log(req.user.id);

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    return res.status(200).json(userById);
  } catch (err) {
    return res.status(500).json("Internal server error", err);
  }
};
