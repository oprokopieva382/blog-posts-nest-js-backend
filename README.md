# Blog Post Backend Platform

## Description

This backend platform for blog posts is crafted using NestJS, providing comprehensive CRUD operations for blogs, posts, users, comments and likes. The application leverages MongoDB for data storage and Mongoose for efficient object data modeling (ODM). It incorporates advanced features like user registration through Nodemailer, JWT authentication, multi-device control, and custom configuration management.

## Features

- **CRUD Operations:** Full create, read, update, and delete functionalities for blogs, posts, users, and comments.
- **Validation:** Uses class-validator for robust input validation.
- **MongoDB Integration:** Connects to MongoDB Atlas via Mongoose for reliable data handling.
- **Modular Architecture:** Built with NestJS modules for a scalable and organized codebase.
- **Pagination & Filtering:** Implements pagination and filtering to manage data retrieval efficiently.
- **CQRS Pattern:** Employs Command Query Responsibility Segregation (CQRS) to separate read and write operations clearly.
- **JWT Authentication:** Handles access and refresh tokens with JSON Web Tokens (JWT) for secure user authentication.
- **Multi-Device Control:** Manages multiple device sessions and user control.
- **Custom Configuration:** Utilizes a custom configuration file to manage environment values and application settings.
- **Nodemailer Integration:** Handles user registration and email notifications through Nodemailer.
- **Cookie Management:** Configures and manages cookie settings for secure session handling.
- **Pipes & Guards:** Utilizes pipes for input transformation and validation, and guards for access control.

## Main Tools & Technologies

- 📌 **JavaScript**
- 📌 **TypeScript**
- 📌 **Node.js**
- 📌 **NestJS**
- 📌 **MongoDB Atlas**
- 📌 **Mongoose**
- 📌 **Nodemailer**
- 📌 **Cookie-parser**
- 📌 **JWT**

## Project Setup

1. `git clone git@github.com:oprokopieva382/blog-posts-nest-js-backend.git`
2. `yarn install`
3. In terminal, run: `yarn start:dev`

## License

Please refer to the LICENSE in the repo.

## Questions

If you have any questions find me on [GitHub](https://github.com/oprokopieva382) or feel free email me oprokopieva382@gmail.com
