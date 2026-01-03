const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  const { title, description, dueDate, priority, assignedTo } = req.body;

  if (!title || !description || !dueDate || !priority) {
    return res.status(400).json({ msg: "All fields required" });
  }

  let finalAssignedTo;

  
  if (req.user.role === "admin") {
    if (!assignedTo) {
      return res.status(400).json({ msg: "Assign user is required" });
    }
    finalAssignedTo = assignedTo;
  }

  
  if (req.user.role === "user") {
    finalAssignedTo = req.user.id;
  }

  const task = await Task.create({
    title,
    description,
    dueDate,
    priority,
    status: "pending",
    assignedTo: finalAssignedTo
  });

  res.json(task);
};

exports.getTasks = async (req, res) => {
  const limit = 5;
  let page = parseInt(req.query.page) || 1;
  if (page < 1) page = 1;

  let query = {};

  
  if (req.user.role !== "admin") {
    query.assignedTo = req.user.id;
  }

  const total = await Task.countDocuments(query);
  const totalPages = Math.ceil(total / limit) || 1;
  if (page > totalPages) page = totalPages;

  const tasks = await Task.find(query)
  .populate("assignedTo", "name email")
  .sort({ createdAt: -1 });


  res.json({
    tasks,
    totalPages,
    currentPage: page
  });
};



exports.updateStatus = async (req, res) => {
  await Task.findByIdAndUpdate(req.params.id, {
    status: req.body.status
  });
  res.json({ msg: "Status updated" });
};





exports.updateTask = async (req, res) => {
  const { title, description, dueDate, priority } = req.body;

  const task = await Task.findById(req.params.id);

  if (!task) return res.status(404).json({ msg: "Task not found" });

  
  if (task.assignedTo.toString() !== req.user.id)
    return res.status(403).json({ msg: "Not authorized" });

  task.title = title;
  task.description = description;
  task.dueDate = dueDate;
  task.priority = priority;

  await task.save();
  res.json(task);
};



exports.deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) return res.status(404).json({ msg: "Task not found" });

  if (task.assignedTo.toString() !== req.user.id)
    return res.status(403).json({ msg: "Not authorized" });

  await task.deleteOne();
  res.json({ msg: "Task deleted" });
};




exports.assignTask = async (req, res) => {
  const { userId } = req.body;

  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ msg: "Task not found" });

  task.assignedTo = userId;
  await task.save();

  res.json({ msg: "Task assigned successfully" });
};


exports.getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id).populate(
    "assignedTo",
    "name email"
  );

  if (!task) {
    return res.status(404).json({ msg: "Task not found" });
  }

  
  if (
    task.assignedTo._id.toString() !== req.user.id &&
    req.user.role !== "admin"
  ) {
    return res.status(403).json({ msg: "Not authorized" });
  }

  res.json(task);
};
