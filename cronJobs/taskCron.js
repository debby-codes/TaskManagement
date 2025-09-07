import Task from "../schemas/taskSchema.js";
import { scheduleCron } from "../utils/sendEmail/cron.js";

export const startTaskCleanUp = () => {
  scheduleCron("0 6 * * *", async () => {
    console.log("cron job cleaning up expired tasks");

    const now = new Date();

    try {
      const expiredTasks = await Task.deleteMany({
        isCompleted: false,
        deadline: { $lt: now },
      });

      console.log(`deleted ${expiredTasks.deletedCount} expired tasks`);
    } catch (error) {
      console.log(error);
    }
  });
};
