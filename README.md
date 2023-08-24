# todos-tracker

## Recreate the Database

```sh
dropdb todo-lists
createdb todo-lists
psql -d todo-lists < schema.sql
psql -d todo-lists < lib/seed-data.sql
```

## Create Hashed Values of Passwords

```sh - example with "secret"
$ node
> const bcrypt = require("bcrypt");
undefined

> bcrypt.hash("secret", 10, (_, hash) => console.log(hash))
undefined
> $2b$10$uC3lSZqheRZja2B.jBA8q.2s3hkEviwTuRWdw36tngJBkm1i/Llo6
```

## Features to Add

1. Ability to edit the name of an already created todo.
2. Ability to register a new user.

## Incomplete

1. Prepare the database for deployment to Heroku.
2. Deploy the application to Heroku.
