# todos-tracker

## Recreate the Database

```sh
dropdb todo-lists
createdb todo-lists
psql -d todo-lists < schema.sql
psql -d todo-lists < lib/seed-data.sql
```