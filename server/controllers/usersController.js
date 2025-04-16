import User from "../models/User.js";

export const getUserProfile = async (req, res) => {
  console.log(req.user.id);

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("first_name image");
    return res.status(200).json(users);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("first_name image");
    if (!user) {
      return res
        .status(404)
        .json({ message: "Erreur, utilisateur non trouvé" });
    }
    return res.status(200).json(user);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};
