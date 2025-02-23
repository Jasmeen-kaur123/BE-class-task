const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware for logging timestamps
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Set EJS as the template engine
app.set("view engine", "ejs");

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));

// Path to tasks.json
const tasksFile = path.join(__dirname, "tasks.json");

// Read tasks from JSON file
const getTasks = () => {
  if (!fs.existsSync(tasksFile)) {
      fs.writeFileSync(tasksFile, "[]"); 
  }

  try {
      const data = fs.readFileSync(tasksFile, "utf8");
      return data.trim() ? JSON.parse(data) : [];
  } catch (error) {
      console.error("Error reading tasks.json:", error);
      return [];
  }
};


// Write tasks to JSON file
const saveTasks = (tasks) => {
    fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
};

app.get("/", (req, res) => {
  res.send("Welcome to the To-Do List");
});

// Route to show all tasks
app.get("/tasks", (req, res) => {
    const tasks = getTasks();
    res.render("tasks", { tasks });
});

// Route to fetch a specific task by ID
app.get("/task", (req, res) => {
    const tasks = getTasks();
    const task = tasks.find((t) => t.id === parseInt(req.query.id));
    if (!task) return res.status(404).send("Task not found");
    res.render("task", { task });
});

app.get("/addTask", (req, res) => {
  res.render("addTask");
});

// Route to add a new task
app.post("/add-task", (req, res) => {
    const { title, description } = req.body;
    const tasks = getTasks();
    const newTask = { id: tasks.length + 1, title, description };
    tasks.push(newTask);
    saveTasks(tasks);
    res.redirect("/tasks");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
