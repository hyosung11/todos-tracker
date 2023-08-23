# todos-tracker

## Features to Add

1. Ability to edit the name of an already created todo.
2. Ability to register a new user.

## Recreate the Database

```sh
dropdb todo-lists
createdb todo-lists
psql -d todo-lists < schema.sql
psql -d todo-lists < lib/seed-data.sql
```

