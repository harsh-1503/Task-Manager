const express = require("express");
const app = express();

const router = express.Router();

const {
  getAllTasks,
  createTask,
  updateTask,
  getTask,
  deleteTask,
} = require("../controllers/tasks");

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id/:truthvalue").patch(updateTask);
router.route("/:id").get(getTask).delete(deleteTask);

module.exports = router;
