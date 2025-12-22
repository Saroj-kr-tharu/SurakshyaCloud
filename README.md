


# SurakshyaCloud Backend

A robust, modular Node.js backend API designed for scalable cloud-based applications. Built with Express.js, following best practices for security, maintainability, and extensibility.

## 🚀 Features

- Modular MVC architecture
- JWT authentication & role-based access control
- Secure password handling (bcrypt)
- File & folder management with AWS S3 integration
- Centralized error handling
- Configurable environment support
- RESTful API design

## 🛠️ Tech Stack

- **Node.js** – JavaScript runtime
- **MongoDB** – NoSQL database
- **Mongoose** – MongoDB ODM for Node.js
- **AWS S3** – File storage
- **AWS CloudFront** – Content delivery network (CDN)
- **JWT** – JSON Web Token authentication

## 🗂️ Project Structure

```
src/
├── config/         # App, AWS, DB configs
├── controllers/    # Route handlers
├── middlewares/    # Auth, validation, error handling
├── models/         # Data models (e.g., User, File, Folder)
├── repository/     # Data access layer
├── services/       # Business logic
├── Routes/         # API route definitions
├── utlis/          # Utilities & helpers
│   └── Errors/     # HTTP codes & error helpers
│   └── MailTemplate/ # Email templates (if present)
└── index.js        # App entry point
```

## ⚙️ Setup

### Prerequisites

- Node.js v14+
- npm
- MySQL (or compatible DB)
- AWS account (for S3 features)

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd SurakshyaCloud
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Copy `.env.example` to `.env` and update values as needed.

4. Set up the database:
   - Update `src/config/database.js` with your DB credentials.
   - Run migrations/seeds if available.

5. Start the server:
   ```bash
   npm start
   ```

## 🛡️ Security

- Passwords hashed with bcrypt
- JWT for authentication
- Role-based middleware for route protection
- Input validation and error handling

## 📦 API Overview

- User authentication & management
- File/folder CRUD with S3 support
- Modular route structure for easy expansion

## 🧩 Extending

- Add new models in `src/models/`
- Implement business logic in `src/services/`
- Register new routes in `src/Routes/`

## 📝 License

MIT (or your chosen license)
