const express = require("express");
const morgan = require("morgan");
const TodoList = require("./lib/todolist");

const app = express();
const host = "localhost";
const port = 3000;

// Static data for initial testing
let todoLists = require("./lib/seed-data");

app.set("views", "./views");
app.set("view engine", "pug");

app.use(morgan("common"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

// Compare todo list titles alphabetically (case-insensitive)
const compareByTitle = (todoListA, todoListB) => {
  let titleA = todoListA.title.toLowerCase();
  let titleB = todoListB.title.toLowerCase();

  if (titleA < titleB) {
    return -1;
  } else if (titleA > titleB) {
    return 1;
  } else {
    return 0;
  }
};

// Return the list of todo lists sorted by completion status and title.
const sortTodoLists = lists => {
  let undone = lists.filter(todoList => !todoList.isDone());
  let done = lists.filter(todoList => todoList.isDone());
  undone.sort(compareByTitle);
  done.sort(compareByTitle);
  return [].concat(undone, done);
};

// Redirect start page
app.get("/", (req, res) => {
  res.redirect("/lists")
});

// Render the list of todo lists
app.get("/lists", (req, res) => {
  res.render("lists", {
    todoLists: sortTodoLists(todoLists),
  });
});

// Render new todo list page
app.get("/lists/new", (req, res) => {
  res.render("new-list");
});

// Create a new todo list
app.post("/lists", (req, res) => {
  let title = req.body.todoListTitle.trim();
  todoLists.push(new TodoList(title));
  res.redirect("/lists");
});

// Listener
app.listen(port, host, () => {
  console.log(`Todos Tracker is listening on port ${port} of ${host}.`);
});

