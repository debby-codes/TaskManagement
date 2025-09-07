import User from "../../schemas/userSchema.js";
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (id == id) {
    try {
      await User.findByIdAndDelete(id);
      res.status(200).json({ message: "User successfully deleted" });
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    return res
      .status(401)
      .json({ message: "You are not authorised to delete this account" });
  }
};
