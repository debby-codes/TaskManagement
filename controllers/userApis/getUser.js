import User from "../../schemas/userSchema.js";
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};
