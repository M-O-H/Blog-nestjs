# BlogPost Website

![GitHub license](https://img.shields.io/github/license/M-O-H/Blog-nestjs)
![Node.js](https://img.shields.io/badge/node-%3E%3D16-brightgreen)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-%3E%3D13-blue)
![NestJS](https://img.shields.io/badge/NestJS-%E2%9C%94-red)
![Drizzle ORM](https://img.shields.io/badge/Drizzle%20ORM-%E2%9C%94-brightgreen)
![Build](https://img.shields.io/github/actions/workflow/status/M-O-H/Blog-nestjs/ci.yml)
![Tests](https://img.shields.io/github/actions/workflow/status/M-O-H/Blog-nestjs/test.yml?label=tests)
![Coverage](https://img.shields.io/codecov/c/github/M-O-H/Blog-nestjs)

## Description
BogPost is a modern blog website built with **NestJS**, **Drizzle ORM**, and **PostgreSQL**. This project provides a fully functional backend API for managing blog posts, authors, and comments, utilizing a robust and scalable architecture.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [Running the Project](#running-the-project)
- [API Documentation](#api-documentation)
- [Image Upload](#image-upload)
- [Contributing](#contributing)
- [License](#license)

## Features

- RESTful API with NestJS
- Database management using Drizzle ORM and PostgreSQL
- Authentication & Authorization (JWT-based authentication)
- CRUD operations for posts, users, and comments
- TypeScript support for type safety
- Environment-based configuration
- API validation using class-validator
- Auto-generated API documentation using Swagger
- Image upload with file type validation
- CI/CD with GitHub Actions
- Test coverage reports using Codecov

## Tech Stack

- **Backend:** NestJS (Express or Fastify adapter)
- **Database:** PostgreSQL
- **ORM:** Drizzle ORM
- **Authentication:** Passport.js (JWT strategy)
- **Validation:** Class-validator
- **API Documentation:** Swagger (OpenAPI)
- **File Upload:** Multer (NestJS integration)

## Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS recommended)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/) (optional for containerization)

### Clone Repository

```sh
git clone https://github.com/M-O-H/Blog-nestjs.git
cd Blog-nestjs
```

### Install Dependencies

```sh
npm install
```

## Configuration

Create a `.env` file in the project root and add the required environment variables:

```env
PORT=3000
DATABASE_URL=postgres://user:password@localhost:5432/blogpost_db
JWT_SECRET=your_secret_key
UPLOADS_PATH=uploads/
```

## Database Setup

### Run Migrations

```sh
npm run migrate
```

### Generate Migrations

```sh
npm run migrate:generate
```

### Push Migrations

```sh
npm run migrate:push
```

### Seed Database (Optional)

```sh
npm run seed
```

Add the following migration scripts to `package.json`:

```json
"migrate:generate": "npx drizzle-kit generate:pg --schema=./src/database/schema.ts",
"migrate:push": "node -r esbuild-register src/database/drizzle.migrate.ts"
```

## Running the Project

### Development Mode

```sh
npm run start:dev
```

### Production Mode

```sh
npm run build
npm run start
```

### Running with Docker

```sh
docker-compose up --build
```

## API Documentation

This project uses **Swagger** for API documentation. Once the server is running, you can access the interactive API docs at:

```
http://localhost:3000/api
```

## Image Upload

The project supports image uploads using **Multer**. To enable this feature, ensure the uploads directory is configured properly.

### Upload Endpoint

- `POST /upload`
  - **Description:** Uploads an image file
  - **Accepted Formats:** JPG, PNG, GIF
  - **Max Size:** 5MB

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`feature/new-feature` or `bugfix/fix-issue`).
3. Commit your changes with clear messages.
4. Push your branch and create a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

