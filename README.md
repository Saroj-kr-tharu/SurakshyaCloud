
# 🛡️ SurakshyaCloud - Secure Cloud Storage Platform

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)

**A enterprise-grade, secure cloud storage backend with AWS S3 integration, JWT authentication, and role-based access control.**

[Features](#-features) • [Installation](#-installation) • [API Documentation](#-api-endpoints) • [Architecture](#-architecture)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [API Endpoints](#-api-endpoints)
- [Project Structure](#-project-structure)
- [Security](#-security)
- [Development](#-development)
- [Contributing](#-contributing)

---

## 🌟 Overview

**SurakshyaCloud** is a production-ready, scalable cloud storage backend service built with Node.js and Express. It provides secure file and folder management capabilities with AWS S3 integration, CloudFront CDN for content delivery, and comprehensive authentication and authorization mechanisms.

### Key Highlights

- 🔐 **Enterprise Security**: JWT-based authentication with refresh tokens and role-based access control
- ☁️ **AWS Integration**: S3 for storage, CloudFront for CDN with signed URLs
- 📁 **Hierarchical Storage**: Folder structure with file organization capabilities
- 🚀 **Scalable Architecture**: Clean separation of concerns with Repository-Service-Controller pattern
- 📊 **Storage Management**: Track user storage quotas and file metadata
- 🔄 **File Operations**: Upload, download, rename, move, and delete with atomic operations

---

## ✨ Features

### Authentication & Authorization
- ✅ User registration and login with email/password
- ✅ JWT access tokens with configurable expiry
- ✅ Refresh token mechanism for seamless session management
- ✅ Role-based access control (USER/ADMIN)
- ✅ Secure password hashing with bcrypt (10 rounds)
- ✅ Token verification middleware

### File Management
- ✅ Multi-file upload with multer
- ✅ File metadata tracking (size, MIME type, download count)
- ✅ File status tracking (uploading, processing, completed, failed)
- ✅ File viewing with CloudFront signed URLs
- ✅ File renaming and moving between folders
- ✅ File details and statistics

### Folder Management
- ✅ Hierarchical folder structure
- ✅ Root folder listing
- ✅ Nested folder navigation
- ✅ Folder creation and organization
- ✅ Folder moving and restructuring
- ✅ Folder details with item counts

### Storage & CDN
- ✅ AWS S3 bucket integration for object storage
- ✅ CloudFront CDN for fast content delivery
- ✅ Signed URLs for secure file access
- ✅ Automatic storage quota tracking per user
- ✅ Efficient file deletion and cleanup

### Bulk Operations
- ✅ Bulk delete items (files/folders)
- ✅ Bulk move items between folders
- ✅ Transaction-like operations for data consistency

---

## 🛠️ Tech Stack

### Core Technologies
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | 14+ | Runtime environment |
| **Express.js** | 5.1.0 | Web application framework |
| **MongoDB** | 7.0.0 | NoSQL database |
| **Mongoose** | 9.0.2 | MongoDB ODM |

### AWS Services
| Service | Purpose |
|---------|---------|
| **AWS S3** | Object storage for files |
| **CloudFront** | CDN for content delivery |
| **CloudFront Signer** | Signed URL generation |

### Security & Authentication
| Package | Purpose |
|---------|---------|
| **bcrypt** | 6.0.0 - Password hashing |
| **jsonwebtoken** | 9.0.2 - JWT authentication |
| **cookie-parser** | 1.4.7 - Cookie handling |

### File Handling
| Package | Purpose |
|---------|---------|
| **multer** | 2.0.2 - File upload middleware |
| **multer-s3** | 3.0.1 - Direct S3 uploads |

### Development
| Package | Purpose |
|---------|---------|
| **nodemon** | 3.1.11 - Auto-restart dev server |
| **dotenv** | 17.2.3 - Environment configuration |

---

## 🏗️ Architecture

SurakshyaCloud follows a **layered architecture** pattern for separation of concerns and maintainability:

```
┌─────────────────────────────────────────────────┐
│              Client Application                 │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│          Express Route Handlers                 │
│           (src/Routes/routes/)                  │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│              Middlewares                        │
│  (Authentication, Validation, Error Handler)    │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│              Controllers                        │
│      (Request/Response Handling Layer)          │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│               Services                          │
│         (Business Logic Layer)                  │
└──────────────────┬──────────────────────────────┘
                   │
        ┌──────────┴──────────┐
        ▼                     ▼
┌──────────────┐      ┌──────────────┐
│ Repository   │      │  AWS S3      │
│   (DB ORM)   │      │  Service     │
└──────┬───────┘      └──────────────┘
       │
       ▼
┌──────────────────────┐
│   MongoDB Database   │
└──────────────────────┘
```

### Layer Responsibilities

1. **Routes**: Define API endpoints and map to controllers
2. **Middlewares**: Handle authentication, validation, and cross-cutting concerns
3. **Controllers**: Process HTTP requests/responses, call services
4. **Services**: Implement business logic, orchestrate operations
5. **Repository**: Data access layer, interact with database
6. **Models**: Define data schemas and validation rules

---

## 📥 Installation

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **MongoDB** (v5 or higher) - Running locally or cloud instance
- **AWS Account** with S3 bucket and CloudFront distribution configured

### Step-by-Step Setup

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd 02_SurakshyaCloud
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Server Configuration
   PORT=3000

   # JWT Secrets
   PRIVATEJWT=your-access-token-secret-key-here
   PRIVATEJWTRefersh=your-refresh-token-secret-key-here

   # AWS Configuration
   AWS_ACCESSKEYID=your-aws-access-key-id
   AWS_SECRECT_ACESS_KEY=your-aws-secret-access-key
   AWS_REGION=your-aws-region
   BUCKET_NAME=your-s3-bucket-name

   # CloudFront Configuration
   CLOUDFRONT_DOMAIN=https://your-cloudfront-domain.cloudfront.net/
   CLOUDFRONT_PRIVATE_KEY=-----BEGIN RSA PRIVATE KEY-----\nYour-Key-Here\n-----END RSA PRIVATE KEY-----
   CLOUDFRONT_KEY_PAIR_ID=your-cloudfront-key-pair-id

   # Database Configuration
   MANGODB_URL=mongodb://localhost:27017/surakshya_cloud
   ```

4. **Set up AWS S3 and CloudFront**
   - Create an S3 bucket in your AWS account
   - Set up a CloudFront distribution pointing to your S3 bucket
   - Generate CloudFront key pair for signed URLs
   - Configure bucket policies for CloudFront access

5. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod --dbpath /path/to/your/data/directory
   ```

6. **Start the application**
   ```bash
   # Development mode with auto-reload
   npm start
   
   # The server will start on http://localhost:3000
   ```

7. **Verify installation**
   ```bash
   curl http://localhost:3000/api/v1/check
   # Expected response: {"message": " Surakshya@ is good to GO"}
   ```

---

## ⚙️ Configuration

### Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `PORT` | Yes | Server port number | `3000` |
| `PRIVATEJWT` | Yes | Secret key for access tokens | `your-secret-key` |
| `PRIVATEJWTRefersh` | Yes | Secret key for refresh tokens | `your-refresh-secret` |
| `AWS_ACCESSKEYID` | Yes | AWS access key ID | `AKIAIOSFODNN7EXAMPLE` |
| `AWS_SECRECT_ACESS_KEY` | Yes | AWS secret access key | `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY` |
| `AWS_REGION` | Yes | AWS region for S3 bucket | `us-east-1` |
| `BUCKET_NAME` | Yes | S3 bucket name | `example-cloud-storage` |
| `CLOUDFRONT_DOMAIN` | Yes | CloudFront distribution URL | `https://d111111abcdef8.cloudfront.net/` |
| `CLOUDFRONT_PRIVATE_KEY` | Yes | Private key for signed URLs | `-----BEGIN RSA PRIVATE KEY-----...` |
| `CLOUDFRONT_KEY_PAIR_ID` | Yes | CloudFront key pair ID | `APKAXXXXXXXXXX` |
| `MANGODB_URL` | Yes | MongoDB connection string | `mongodb://localhost:27017/db_name` |

### AWS Setup Guide

1. **S3 Bucket Configuration**
   - Create a private S3 bucket
   - Enable versioning (recommended)
   - Set up lifecycle policies for cost optimization
   - Configure CORS if needed for web uploads

2. **CloudFront Distribution**
   - Create distribution with S3 as origin
   - Configure Origin Access Identity (OAI)
   - Enable signed URLs for security
   - Set cache behaviors

3. **IAM Permissions**
   Required S3 permissions:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": [
           "s3:PutObject",
           "s3:GetObject",
           "s3:DeleteObject",
           "s3:ListBucket"
         ],
         "Resource": [
           "arn:aws:s3:::your-bucket-name/*",
           "arn:aws:s3:::your-bucket-name"
         ]
       }
     ]
   }
   ```




---

## 📁 Project Structure

```
02_SurakshyaCloud/
│
├── Documentation/                    # Project documentation files
│   ├── Suraksha Cloud – Project Documentation (revised).docx
│   └── Suraksha Cloud – Project Documentation (revised).pdf
│
├── src/                             # Source code directory
│   ├── index.js                     # Application entry point
│   │
│   ├── config/                      # Configuration files
│   │   ├── awsConfig.js            # AWS S3 & CloudFront configuration
│   │   ├── database.js             # MongoDB connection setup
│   │   └── serverConfig.js         # Server and environment variables
│   │
│   ├── controllers/                 # Request handlers (Controllers)
│   │   ├── index.js                # Controller exports
│   │   ├── file.controller.js      # File operations controller
│   │   ├── folder.controller.js    # Folder operations controller
│   │   ├── items.controller.js     # Bulk items operations controller
│   │   └── user.controller.js      # User & auth controller
│   │
│   ├── middlewares/                 # Express middlewares
│   │   ├── index.js                # Middleware exports
│   │   └── user.middlewares.js     # Auth & validation middlewares
│   │
│   ├── models/                      # Mongoose data models
│   │   ├── file.js                 # File schema & model
│   │   ├── folder.js               # Folder schema & model
│   │   └── users.js                # User schema & model
│   │
│   ├── repository/                  # Data access layer
│   │   ├── index.js                # Repository exports
│   │   ├── curdRepo.js             # Generic CRUD operations
│   │   ├── file.repo.js            # File-specific DB operations
│   │   ├── folder.repo.js          # Folder-specific DB operations
│   │   └── user.repo.js            # User-specific DB operations
│   │
│   ├── services/                    # Business logic layer
│   │   ├── index.js                # Service exports
│   │   ├── curdService.js          # Generic CRUD service
│   │   ├── file.service.js         # File business logic
│   │   ├── folder.service.js       # Folder business logic
│   │   ├── items.service.js        # Bulk operations logic
│   │   ├── s3.service.js           # AWS S3 operations service
│   │   └── user.service.js         # User & auth service
│   │
│   ├── Routes/                      # API route definitions
│   │   ├── index.js                # Main router
│   │   └── routes/
│   │       └── index.js            # API v1 routes
│   │
│   └── utlis/                       # Utility functions & helpers
│       ├── index.js                # Utility exports
│       ├── awsHelper.js            # AWS helper functions
│       ├── bcryptHelper.js         # Password hashing utilities
│       ├── jwtHelper.js            # JWT token utilities
│       ├── multerHelper.js         # File upload configuration
│       └── Errors/
│           └── https_codes.js      # HTTP status code constants
│
├── .env                             # Environment variables (not in repo)
├── .gitignore                       # Git ignore file
├── package.json                     # Node.js dependencies & scripts
├── package-lock.json                # Dependency lock file
└── README.md                        # This file
```

### Directory Descriptions

| Directory | Purpose |
|-----------|---------|
| `config/` | Application configuration including AWS, database, and server settings |
| `controllers/` | Handle HTTP requests, validate input, call services, format responses |
| `middlewares/` | Authentication, authorization, validation, error handling |
| `models/` | Mongoose schemas defining database structure and validation |
| `repository/` | Database operations and queries (data access abstraction) |
| `services/` | Business logic, orchestration between repositories and external services |
| `Routes/` | API endpoint definitions and routing configuration |
| `utlis/` | Helper functions, utilities, and common code |

---

## 🔒 Security

### Authentication Flow

1. **Registration**: Password hashed with bcrypt (10 salt rounds) before storage
2. **Login**: Credentials validated, JWT access + refresh tokens generated
3. **Authorization**: Middleware verifies JWT on protected routes
4. **Token Refresh**: Expired access tokens renewed using valid refresh tokens
5. **Logout**: Refresh token invalidated in database

### Security Features

- ✅ **Password Security**: bcrypt hashing with salt rounds
- ✅ **JWT Tokens**: Separate access and refresh token mechanism
- ✅ **Signed URLs**: CloudFront signed URLs for time-limited file access
- ✅ **Role-Based Access**: USER/ADMIN role enforcement
- ✅ **Cookie Security**: HTTP-only cookies for token storage
- ✅ **Environment Variables**: Sensitive credentials in `.env` file
- ✅ **Input Validation**: Request validation in middlewares
- ✅ **Error Handling**: Centralized error handling without data leakage

### Best Practices

1. **Never commit `.env` file** - Add to `.gitignore`
2. **Use strong JWT secrets** - Generate cryptographically secure keys
3. **Rotate credentials regularly** - Update AWS keys and JWT secrets
4. **Configure CORS properly** - Restrict origins in production
5. **Use HTTPS in production** - Enable SSL/TLS for all communications
6. **Monitor CloudFront logs** - Track access patterns and anomalies
7. **Implement rate limiting** - Prevent brute force attacks (recommended)
8. **Regular security audits** - Run `npm audit` and update dependencies

---

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:3000/api/v1
```

### Authentication Endpoints

#### 1. User Registration
```http
POST /auth/signup
```
**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "username": "johndoe"
}
```
**Response:** `201 Created`
```json
{
  "message": "Successfully to Signup",
  "success": true,
  "data": {
    "userId": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "username": "johndoe",
    "role": "USER"
  },
  "err": {}
}
```

#### 2. User Login
```http
POST /auth/login
```
**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```
**Response:** `200 OK` (Sets cookies: `accessToken`, `refreshToken`)
```json
{
  "message": "Successfully to login",
  "success": true,
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "email": "user@example.com",
      "username": "johndoe"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  },
  "err": {}
}
```

#### 3. Verify Token
```http
GET /auth/veriyToken
```
**Headers:**
```
Cookie: accessToken=<jwt-token>
```
**Response:** `200 OK`

#### 4. Refresh Access Token
```http
POST /auth/refresh-token
```
**Headers:**
```
Cookie: refreshToken=<refresh-token>
```
**Response:** `200 OK` (Returns new access token)

#### 5. Logout
```http
POST /auth/logout
```
**Headers:**
```
Cookie: accessToken=<jwt-token>
```
**Response:** `200 OK`

---

### File Endpoints

#### 1. Upload File(s)
```http
POST /user/files
```
**Headers:**
```
Cookie: accessToken=<jwt-token>
Content-Type: multipart/form-data
```
**Form Data:**
```
files: <file1>, <file2>, ...
folderId: <optional-folder-id>
```
**Response:** `200 OK`
```json
{
  "message": "Files uploaded successfully",
  "success": true,
  "data": [
    {
      "fileId": "507f1f77bcf86cd799439012",
      "originalName": "document.pdf",
      "size": 1048576,
      "mimeType": "application/pdf",
      "s3Key": "user123/folder456/document.pdf"
    }
  ],
  "err": {}
}
```

#### 2. View/Download File
```http
GET /user/file/:fileId
```
**Headers:**
```
Cookie: accessToken=<jwt-token>
```
**Response:** `200 OK`
```json
{
  "message": "File retrieved successfully",
  "success": true,
  "data": {
    "signedUrl": "https://d111111abcdef8.cloudfront.net/...",
    "expiresIn": 300
  },
  "err": {}
}
```

#### 3. Get File Details
```http
GET /file/:fileId/details
```
**Response:** `200 OK`
```json
{
  "message": "File details retrieved",
  "success": true,
  "data": {
    "fileId": "507f1f77bcf86cd799439012",
    "originalName": "document.pdf",
    "size": 1048576,
    "mimeType": "application/pdf",
    "downloadCount": 5,
    "isPublic": false,
    "status": "completed",
    "createdAt": "2025-12-23T10:30:00.000Z",
    "updatedAt": "2025-12-23T10:30:00.000Z"
  },
  "err": {}
}
```

#### 4. Rename File
```http
PATCH /user/file/:fileId/rename
```
**Request Body:**
```json
{
  "newName": "updated-document.pdf"
}
```

#### 5. Move File
```http
PATCH /user/file/:fileId/move
```
**Request Body:**
```json
{
  "targetFolderId": "507f1f77bcf86cd799439013"
}
```

---

### Folder Endpoints

#### 1. Create Folder
```http
POST /user/folders
```
**Request Body:**
```json
{
  "folderName": "My Documents",
  "parentFolderId": null
}
```

#### 2. View Root Folder
```http
GET /folders/root
```
**Response:** Lists all files and folders at root level

#### 3. View Folder Contents
```http
GET /folders/:folderId
```
**Response:** Lists all files and subfolders in specified folder

#### 4. Get Folder Details
```http
GET /folders/:folderId/details
```
**Response:** Folder metadata and statistics

#### 5. Move Folder
```http
PATCH /folders/:folderId/move
```
**Request Body:**
```json
{
  "targetParentId": "507f1f77bcf86cd799439014"
}
```

---

### Bulk Operations

#### 1. Delete Items (Files/Folders)
```http
DELETE /items
```
**Request Body:**
```json
{
  "items": [
    { "type": "file", "id": "507f1f77bcf86cd799439012" },
    { "type": "folder", "id": "507f1f77bcf86cd799439013" }
  ]
}
```

#### 2. Move Items (Files/Folders)
```http
PATCH /items
```
**Request Body:**
```json
{
  "items": [
    { "type": "file", "id": "507f1f77bcf86cd799439012" },
    { "type": "folder", "id": "507f1f77bcf86cd799439013" }
  ],
  "targetFolderId": "507f1f77bcf86cd799439014"
}
```
---

## 👨‍💻 Development

### Development Workflow

1. **Start development server with auto-reload:**
   ```bash
   npm start
   ```

2. **Run in production mode:**
   ```bash
   NODE_ENV=production node src/index.js
   ```

3. **Check code for issues:**
   ```bash
   npm audit
   npm audit fix
   ```

### Database Management

**Connect to MongoDB:**
```bash
mongosh mongodb://localhost:27017/surakshya_cloud
```



### Common Development Tasks

**Add new API endpoint:**
1. Create controller method in `src/controllers/`
2. Create service method in `src/services/`
3. Create repository method in `src/repository/` (if needed)
4. Define route in `src/Routes/routes/index.js`
5. Add middleware validation (if needed)

**Add new database model:**
1. Create schema in `src/models/`
2. Export model
3. Create repository for DB operations
4. Create service for business logic

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature-name`
3. **Commit your changes**: `git commit -m 'Add some feature'`
4. **Push to the branch**: `git push origin feature/your-feature-name`
5. **Open a Pull Request**

### Code Style Guidelines

- Follow existing code structure and naming conventions
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused
- Handle errors appropriately
- Update documentation when adding features

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 🙏 Acknowledgments

- Built with [Express.js](https://expressjs.com/)
- Database by [MongoDB](https://www.mongodb.com/)
- Storage by [AWS S3](https://aws.amazon.com/s3/)
- CDN by [AWS CloudFront](https://aws.amazon.com/cloudfront/)

---

## 📞 Support

For questions, issues, or feature requests:
- Open an issue on GitHub
- Check the [Documentation](./Documentation/) folder
- Review API endpoints above

---

<div align="center">

**Made with ❤️ for Secure Cloud Storage**

⭐ Star this repository if you find it helpful!

</div>
