import Task from "../../schemas/taskSchema.js";
export const readTask = async (req, res) => {
  const user = req.user;
  try {
    const tasks = await Task.find();
    return res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
  }
};
