import mongoose from "mongoose";
const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: " User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ["Work", "Personal", "School", "Other"],
      default: "Other",
    },
    deadline: { type: Date },
    isCompleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const Task = mongoose.model("Task", taskSchema);
export default Task;
