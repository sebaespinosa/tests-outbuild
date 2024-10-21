# outbuild-backend-test

This is a Node.js Express application with Prisma as the ORM.

## Project Structure

```
outbuild-backend-test
├── prisma
│   └── schema.prisma
├── src
│   ├── app.js
│   ├── controllers
│   │   └── index.js
│   ├── routes
│   │   └── index.js
│   └── models
│       └── index.js
├── package.json
├── .env
└── README.md
```

## Files

- `prisma/schema.prisma`: This file is the Prisma schema file that defines the database models and their relationships.

- `src/app.js`: This file is the entry point of the application. It sets up the Express app and configures middleware.

- `src/controllers/index.js`: This file exports a module that contains the controller logic for handling different routes and requests.

- `src/routes/index.js`: This file exports a module that sets up the routes for the application. It uses the controllers from the `controllers` directory to handle the requests.

- `src/models/index.js`: This file exports a module that contains the Prisma client instance and functions to interact with the database using Prisma.

- `package.json`: This file is the configuration file for npm. It lists the dependencies and scripts for the project.

- `.env`: This file is used to store environment variables for the application.

- `README.md`: This file contains the documentation for the project.
```

Feel free to update this file with more information about your project as needed.