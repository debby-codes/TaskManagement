import Task from "../../schemas/taskSchema.js";
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, category, deadline } = req.body;
  const reqid = req.user._id;
  try {
    const task = await Task.findOne({ _id: id, userId: reqid });
    if (!task) {
      res.status(400).json({ message: "Task not found" });
      return;
    }
    await task.findByIdAndUpdate(
      id,
      {
        $set: {
          title: title,
          description: description,
          category: category,
          deadline: deadline,
          isCompleted: isCompleted,
        },
      },
      { new: true }
    );
    return res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};
