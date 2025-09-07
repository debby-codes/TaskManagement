import Task from "../../schemas/taskSchema.js";

export const createTask = async (req, res) => {
  const { title, description, category, deadline, isCompleted } = req.body;
  const user = req.user;
  if (!title || !description || !deadline || !category) {
    res.status(400).json({ message: "fill all fields" });
    return;
  }
  try {
    const task = new Task({ ...req.body, userId: user.id });
    await task.save();
    res.status(201).json({ message: "Task created successfully" });
    return;
  } catch (error) {
    console.log(error);
  }
};
