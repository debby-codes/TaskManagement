import User from "../../schemas/userSchema.js";
export const updateUser = async (req, res) => {
  const { id } = req.params;

  const { userName, email, password } = req.body;
  if (id == id) {
    try {
      await User.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json({ message: "User successfully updated" });
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    return res
      .staus(401)
      .json({ message: "You are not allowed to update this user" });
  }
};
