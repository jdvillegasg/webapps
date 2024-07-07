# Localhost database
## Postgres

In Linux install postgres by executing:

!!! failure "Install postgres"
    sudo apt install postgresql postgresql-contrib
    sudo systemctl start postgresql
    sudo systemctl enable postgresql

To run `Postgres` on Linux:

!!! failure "Run postgres"
    sudo -u postgres psql

Once in the `postgres` shell, you can create a database with:

!!! failure "Create database"
    postgres=# CREATE DATABASE mydb;

or create an user with a given given password, and grant they privileges:

!!! failure "Create user, password and user privileges"
    postgres=# create user myuser with encrypted password 'mypass';
    postgres=# grant all privileges on database mydb to myuser;

# Database service

!!! success "Database service"
    Rather than using a database it is desireble to use a Database service that *scales (up and down), and/or replicate its storage space depending on the load, namely, the number of virtual instances (or docker containers, ...) accesing the database, which ultimately means the number of users requesting data*

# Database cloud service

## Neon

Cloud serverless platform for PostgreSQL. 

Signup and Neon will provide production-ready credentials to connect to the PostgreSQL database.

After that, you need to **migrate** your schema (i.e. tables) into Neon by using an ORM like Drizzle.

# ORM

## Drizzle

After choosinjg PostgreSQL and PostgresJS as the SQL provider and JavaScript database connection, all we need to do is install:

```bash
bun add drizzle-orm postgres
```

and

```bash
bun add -D drizzle-kit
```

Then, we can create a database connection by creating an `index.ts` file under a newly created directory named `db` in the backend folder. Follow Drizzle `Getting Started` documentation to fill it with:

```bash
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const queryClient = postgres(credentialsToDBURL)
export db = drizzle(queryClient)
```

After that, we follow the `Schema Overview` in Drizzle documentation to create a schema file (you can create multiple files with different schemas or one with all the schemas) with our table information.

### Create a table

!!! example "Create a table"
    ```jsx
    import { text, numeric, pgTable, serial, index } from "drizzle-orm/pg-core";

    export const expensesTable = pgTable(
        "expenses",
        {
            id: serial("id").primaryKey(),
            userId: text("user_id").notNull(),
            title: text("title").notNull(),
            amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
        },
        // Create indexes here
        (expenses) => {
            return {
            userIdIndex: index("name_idx").on(expenses.userId),
            };
        }
    );
    ```

### Migrations

The created schema has to be connected to the database service provider. This is done by using the migrations API of Drizze.

We can create a `migrate.ts` file in which the migrations are done:

!!! example "Migrate a Table"
    ```jsx
    import { drizzle } from "drizzle-orm/postgres-js";
    import { migrate } from "drizzle-orm/postgres-js/migrator";
    import postgres from "postgres";

    const migrationClient = postgres(process.env.DATABASE_URL!, { max: 1 });
    await migrate(drizzle(migrationClient), { migrationsFolder: "./drizzle" });
    console.log("migration completed successfully");
    ```

Now each time we change the pg table, we run first:

`bun drizzle-kit generate`

and then 

`bun migrate.ts`