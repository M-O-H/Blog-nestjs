![Cover Image](./images/Banner.png)
![Node.js](https://img.shields.io/badge/node-%3E%3D16-brightgreen)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-%3E%3D13-blue)
![NestJS](https://img.shields.io/badge/NestJS-%E2%9C%94-red)
![Drizzle ORM](https://img.shields.io/badge/Drizzle%20ORM-%E2%9C%94-brightgreen)

## Description
BogPost is a modern blog API built with **NestJS**, **Drizzle ORM**, and **PostgreSQL**. This project provides a fully functional backend API for managing blog posts, authors, and comments, utilizing a robust and scalable architecture.

## Table of Contents

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [Running the Project](#running-the-project)
- [API Documentation](#api-documentation)
- [Image Upload](#image-upload)
- [Contributing](#contributing)

## Features

- RESTful API with NestJS
- Database management using Drizzle ORM and PostgreSQL
- Authentication & Authorization (JWT-based authentication)
- CRUD operations for posts, users, and comments
- TypeScript support for type safety
- Environment-based configuration
- API validation using class-validator
- API documentation using Swagger
- Image upload with file type validation
- Rate limiting
- Role-Based Access Control (RBAC) 
- The API versioning

## Technologies

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

## Database setup

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


Here’s an example of the API documentation page:Here’s an example of the API documentation page:

![API Docs](./images/API_DOCS.png)

## Image Upload

The project supports image uploads using **Multer**. To enable this feature, ensure the uploads directory is configured properly.

### Upload Endpoint

- `POST /upload`
  - **Description:** Uploads an image file
  - **Accepted Formats:** JPG, PNG, GIF
  - **Max Size:** 5MB


### BloggerUI

![BloggerUI](https://github.com/M-O-H/BloggerUI) is the frontend interface designed to work seamlessly with the Blost-Nest API. It provides an intuitive and user-friendly experience for bloggers to manage their posts.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`feature/new-feature` or `bugfix/fix-issue`).
3. Commit your changes with clear messages.
4. Push your branch and create a pull request.
