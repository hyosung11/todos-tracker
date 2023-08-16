const express = require("express");
const morgan = require("morgan");

const app = express();
const host = "localhost";
const port = 3000;

// Static data for initial testing
let todoLists = require("./lib/seed-data");

app.set("views", "./views");
app.set("view engine", "pug");

app.use(morgan("common"));
app.use(express.static("public"));

// Compare todo list titles alphabetically
const compareByTitle = (todoListA, todoListB) => {
  let titleA = todoListA.title;
  let titleB = todoListB.title;

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

// Render the list of todo lists
app.get("/", (req, res) => {
  res.render("lists", {
    todoLists: sortTodoLists(todoLists),
  });
});

// Listener
app.listen(port, host, () => {
  console.log(`Todos Tracker is listening on port ${port} of ${host}.`);
});

