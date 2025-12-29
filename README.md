
# 🛡️ SurakshyaCloud - Secure Cloud Storage Platform

<div align="center">


**An enterprise-grade, secure cloud storage platform with AWS S3 integration, modern web interface, JWT authentication, role-based access control, and collaborative file sharing.**

[Features](#-features) • [Quick Start](#-quick-start) • [Installation](#-installation) • [API Documentation](#-api-endpoints) • [Web Interface](#-web-interface)

</div>

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone <your-repository-url>
cd 02_SurakshyaCloud

# Install dependencies
npm install

# Configure environment (copy and edit .env file)
# See Configuration section for required variables

# Start development server
npm start

# Open http://localhost:3000 in your browser
```

---

## 📋 Table of Contents

- [Quick Start](#-quick-start)
- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Web Interface](#-web-interface)
- [API Endpoints](#-api-endpoints)
- [Project Structure](#-project-structure)
- [Security](#-security)
- [Development](#-development)
- [Contributing](#-contributing)

---

## 🌟 Overview

**SurakshyaCloud** is a production-ready, full-stack cloud storage platform built with Node.js and Express. It features a modern web interface powered by EJS, Tailwind CSS, and DaisyUI alongside a comprehensive RESTful API. The platform provides secure file and folder management with AWS S3 integration, CloudFront CDN for content delivery, robust authentication mechanisms, and advanced sharing features for collaboration.

### Key Highlights

- 🖥️ **Modern Web Interface**: Responsive UI built with EJS, Tailwind CSS 4.x, and DaisyUI
- 🔐 **Enterprise Security**: JWT-based authentication with refresh tokens, CSRF protection, and role-based access control
- ☁️ **AWS Integration**: S3 for object storage, CloudFront CDN with signed URLs
- 📁 **Hierarchical Storage**: Intuitive folder structure with drag-and-drop file organization
- 🤝 **Collaborative Sharing**: Public share links and private access control for files/folders
- 🚀 **Scalable Architecture**: Clean separation of concerns with Repository-Service-Controller pattern
- 📊 **Storage Management**: Track user storage quotas and file metadata
- 🔄 **Bulk Operations**: Multi-file upload, bulk delete, and bulk move with atomic operations

---

## ✨ Features

### Authentication & Authorization
- ✅ User registration and login with email/password
- ✅ JWT access tokens with configurable expiry
- ✅ Refresh token mechanism for seamless session management
- ✅ Role-based access control (USER/ADMIN)
- ✅ Secure password hashing with bcrypt (10 rounds)
- ✅ Token verification middleware
- ✅ CSRF protection for web forms

### Web Interface
- ✅ Modern responsive dashboard (Tailwind CSS + DaisyUI)
- ✅ User authentication pages (Login/Register)
- ✅ Admin dashboard for system management
- ✅ File/Folder browser with preview capabilities
- ✅ Drag-and-drop file upload interface
- ✅ Real-time loading indicators and toast notifications
- ✅ EJS templating with reusable layouts and partials

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
- ✅ Bulk move (files/folders)
- ✅ Transaction-like operations for data consistency

### Sharing & Collaboration
- ✅ **Public Sharing**: Generate shareable links with tokens for files/folders
- ✅ **Permission Control**: View-only or download permissions for shared resources
- ✅ **Expirable Links**: Set expiration dates on public share links
- ✅ **Private Access Grant**: Share files/folders with specific users by email
- ✅ **Access Management**: View and manage all shared resources and granted access
- ✅ **Secure Token-Based Access**: Cryptographically secure share tokens
- ✅ **Share Link Validation**: Automatic expiry checking and access control

---

## 🛠️ Tech Stack

### Core Technologies
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | 14+ | Runtime environment |
| **Express.js** | 5.1.0 | Web application framework |
| **MongoDB** | 7.0.0 | NoSQL database |
| **Mongoose** | 9.0.2 | MongoDB ODM |

### Frontend & UI
| Technology | Version | Purpose |
|-----------|---------|---------|
| **EJS** | 3.1.10 | Templating engine |
| **Tailwind CSS** | 4.1.18 | Utility-first CSS framework |
| **DaisyUI** | 5.5.14 | Tailwind CSS component library |
| **express-ejs-layouts** | 2.5.1 | Layout support for EJS |

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
| **csurf** | 1.11.0 - CSRF protection |

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
| **axios** | 1.13.2 - HTTP client for API calls |

---

## 🏗️ Architecture

SurakshyaCloud follows a **layered architecture** pattern with a full-stack design:

```
┌─────────────────────────────────────────────────────────────────┐
│                    Web Browser / Client                         │
└──────────────────┬────────────────────────────┬─────────────────┘
                   │                            │
        ┌──────────▼──────────┐      ┌──────────▼──────────┐
        │    Web Interface    │      │     REST API        │
        │  (EJS + Tailwind)   │      │   (/api/v1/...)     │
        │   web/routes/       │      │  src/Routes/        │
        └──────────┬──────────┘      └──────────┬──────────┘
                   │                            │
                   └────────────┬───────────────┘
                                │
                   ┌────────────▼────────────┐
                   │      Middlewares        │
                   │  (Auth, CSRF, Validation)│
                   └────────────┬────────────┘
                                │
                   ┌────────────▼────────────┐
                   │      Controllers        │
                   │  (Request/Response)     │
                   └────────────┬────────────┘
                                │
                   ┌────────────▼────────────┐
                   │       Services          │
                   │   (Business Logic)      │
                   └────────────┬────────────┘
                                │
              ┌─────────────────┼─────────────────┐
              ▼                 ▼                 ▼
     ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
     │  Repository  │  │  AWS S3      │  │  CloudFront  │
     │   (MongoDB)  │  │  Service     │  │    CDN       │
     └──────┬───────┘  └──────────────┘  └──────────────┘
            │
     ┌──────▼───────┐
     │   MongoDB    │
     │   Database   │
     └──────────────┘
```

### Layer Responsibilities

| Layer | Directory | Responsibility |
|-------|-----------|----------------|
| **Web Routes** | `web/routes/` | Render EJS templates, handle form submissions |
| **API Routes** | `src/Routes/` | Define RESTful API endpoints |
| **Web Controllers** | `web/controllers/` | Handle web page requests and views |
| **API Controllers** | `src/controllers/` | Process API requests/responses |
| **Middlewares** | `src/middlewares/`, `web/middlewares/` | Auth, CSRF, validation |
| **Services** | `src/services/` | Business logic and orchestration |
| **Repository** | `src/repository/` | Database operations (Mongoose ODM) |
| **Models** | `src/models/` | Mongoose schemas and validation |

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
   APP_URL=http://localhost:3000/api/v1

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
   # Development mode with auto-reload + Tailwind CSS watch
   npm start
   
   # Build CSS only (for production)
   npm run build:css
   
   # The server will start on http://localhost:3000
   ```

7. **Verify installation**
   ```bash
   # Test API endpoint
   curl http://localhost:3000/api/v1/check
   # Expected response: {"message": " Surakshya@ is good to GO"}
   
   # Test Web Interface
   # Open http://localhost:3000 in your browser
   ```

---

## ⚙️ Configuration

### Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `PORT` | Yes | Server port number | `3000` |
| `APP_URL` | Yes | Application base URL for share links | `http://localhost:3000/api/v1` |
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
├── package.json                     # Node.js dependencies & scripts
├── tailwind.config.js               # Tailwind CSS configuration
├── postcss.config.js                # PostCSS configuration
├── README.md                        # This documentation
│
├── Documentation/                   # Project documentation files
│   ├── Suraksha Cloud – Project Documentation (revised).docx
│   └── Suraksha Cloud – Project Documentation (revised).pdf
│
├── src/                             # Backend API source code
│   ├── config/                      # Configuration files
│   │   ├── awsConfig.js            # AWS S3 & CloudFront setup
│   │   ├── database.js             # MongoDB connection
│   │   └── serverConfig.js         # Environment variables
│   │
│   ├── controllers/                 # API request handlers
│   │   ├── index.js                # Controller exports
│   │   ├── file.controller.js      # File operations
│   │   ├── folder.controller.js    # Folder operations
│   │   ├── items.controller.js     # Bulk operations
│   │   ├── share.controller.js     # Sharing & access
│   │   └── user.controller.js      # Authentication
│   │
│   ├── middlewares/                 # Express middlewares
│   │   ├── index.js                # Middleware exports
│   │   └── user.middlewares.js     # Auth & validation
│   │
│   ├── models/                      # Mongoose schemas
│   │   ├── access.js               # Private access control
│   │   ├── file.js                 # File schema
│   │   ├── folder.js               # Folder schema
│   │   ├── share.js                # Public share links
│   │   └── users.js                # User schema
│   │
│   ├── repository/                  # Data access layer
│   │   ├── index.js                # Repository exports
│   │   ├── curdRepo.js             # Generic CRUD
│   │   ├── access.repo.js          # Access operations
│   │   ├── file.repo.js            # File operations
│   │   ├── folder.repo.js          # Folder operations
│   │   ├── share.repo.js           # Share operations
│   │   └── user.repo.js            # User operations
│   │
│   ├── services/                    # Business logic layer
│   │   ├── index.js                # Service exports
│   │   ├── curdService.js          # Generic CRUD service
│   │   ├── access.service.js       # Access control logic
│   │   ├── file.service.js         # File business logic
│   │   ├── folder.service.js       # Folder business logic
│   │   ├── items.service.js        # Bulk operations logic
│   │   ├── s3.service.js           # AWS S3 operations
│   │   ├── share.service.js        # Sharing logic
│   │   └── user.service.js         # Auth & user logic
│   │
│   ├── Routes/                      # API route definitions
│   │   ├── index.js                # Main router
│   │   └── routes/
│   │       └── index.js            # API v1 routes
│   │
│   └── utlis/                       # Utility functions
│       ├── index.js                # Utility exports
│       ├── awsHelper.js            # AWS helpers
│       ├── bcryptHelper.js         # Password utilities
│       ├── cryptoHelper.js         # Token generation
│       ├── jwtHelper.js            # JWT utilities
│       ├── multerHelper.js         # File upload config
│       └── Errors/
│           └── https_codes.js      # HTTP status codes
│
└── web/                             # Web frontend application
    ├── index.js                     # Web server entry point
    ├── tailwind.config.js           # Tailwind config (web)
    ├── postcss.config.js            # PostCSS config (web)
    │
    ├── config/
    │   └── webserverConfig.js       # Web server configuration
    │
    ├── controllers/
    │   └── web.controller.js        # Web page controllers
    │
    ├── JsonData/                    # Static UI configuration data
    │   ├── index.js                 # Data exports
    │   ├── dashboard.data.js        # Dashboard config
    │   ├── file.config.data.js      # File type configs
    │   ├── home.data.js             # Homepage content
    │   └── itemsAction.data.js      # Item action menus
    │
    ├── middlewares/
    │   ├── index.js                 # Middleware exports
    │   ├── auth.middleware.js       # Auth guards
    │   └── globalState.middleware.js # Global state
    │
    ├── public/                      # Static assets
    │   ├── output.css               # Compiled Tailwind CSS
    │   └── assets/                  # Images, icons, etc.
    │
    ├── routes/
    │   └── web.routes.js            # Web page routes
    │
    ├── services/
    │   └── webapi.service.js        # API client service
    │
    ├── utils/
    │   ├── crsf.helper.js           # CSRF utilities
    │   ├── fileUI.helper.js         # File UI helpers
    │   └── pathUtlis.js             # Path utilities
    │
    └── views/                       # EJS templates
        ├── home.ejs                 # Landing page
        ├── login.ejs                # Login page
        ├── register.ejs             # Registration page
        ├── userDashboard.ejs        # User dashboard
        ├── adminDashboard.ejs       # Admin dashboard
        ├── 404_page.ejs             # Error page
        ├── input.css                # Tailwind input CSS
        │
        ├── layouts/
        │   └── main.ejs             # Main layout template
        │
        └── partials/
            ├── header.ejs           # Header component
            ├── footer.ejs           # Footer component
            ├── loader.ejs           # Loading spinner
            └── toaster.ejs          # Toast notifications
```

### Directory Overview

| Directory | Purpose |
|-----------|---------|
| `src/` | Backend API with business logic, data access, and AWS integration |
| `src/config/` | Application configuration (AWS, database, server settings) |
| `src/controllers/` | API request handlers - process HTTP requests/responses |
| `src/middlewares/` | Authentication, authorization, and validation logic |
| `src/models/` | Mongoose schemas defining database structure |
| `src/repository/` | Database operations (data access abstraction) |
| `src/services/` | Business logic and orchestration layer |
| `src/Routes/` | API endpoint definitions |
| `src/utlis/` | Helper functions and utilities |
| `web/` | Frontend web application (EJS + Tailwind CSS + DaisyUI) |
| `web/views/` | EJS templates for pages and layouts |
| `web/public/` | Static assets (CSS, images, JavaScript) |
| `web/controllers/` | Web page controllers for rendering views |
| `Documentation/` | Project documentation files |

---

## 🖥️ Web Interface

SurakshyaCloud includes a modern, responsive web interface built with EJS templates and styled with Tailwind CSS and DaisyUI.

### Available Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing page with feature overview |
| `/login` | Login | User authentication page |
| `/register` | Register | New user registration |
| `/dashboard` | Dashboard | File manager (requires auth) |
| `/preview` | Preview | File preview page (requires auth) |
| `/Items` | Items | Item details (requires auth) |

### Web Features
- 🎨 **Modern UI**: Clean design with DaisyUI components
- 📱 **Responsive**: Works on desktop, tablet, and mobile
- 🔒 **CSRF Protection**: All forms protected against CSRF attacks
- ⏳ **Loading States**: Visual feedback during async operations
- 📢 **Toast Notifications**: User feedback for actions
- 🔐 **Protected Routes**: Auth guards for sensitive pages

### Running the Web Application
```bash
# Start server with Tailwind CSS watcher
npm start

# Access the web interface
# Open http://localhost:3000 in your browser
```

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
- ✅ **CSRF Protection**: Token-based protection for all web forms
- ✅ **Environment Variables**: Sensitive credentials in `.env` file
- ✅ **Input Validation**: Request validation in middlewares
- ✅ **Error Handling**: Centralized error handling without data leakage



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
POST /files
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
GET /file/:fileId
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
PATCH /file/:fileId/rename
```
**Request Body:**
```json
{
  "newName": "updated-document.pdf"
}
```

---

### Folder Endpoints

#### 1. Create Folder
```http
POST /folders
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

### Sharing & Collaboration Endpoints

#### 1. Create Public Share Link
```http
POST /share/public
```
**Headers:**
```
Cookie: accessToken=<jwt-token>
```
**Request Body:**
```json
{
  "resourceType": "file",
  "resourceId": "507f1f77bcf86cd799439012",
  "permission": "view",
  "expiresAt": "2025-12-31T23:59:59.000Z"
}
```
**Response:** `200 OK`
```json
{
  "message": "Successfully createPublicShare",
  "success": true,
  "data": {
    "publicShareLink": "http://localhost:3000/api/v1/share/a1b2c3d4e5f6g7h8"
  },
  "err": {}
}
```

#### 2. Get All Public Share Links
```http
GET /share/public
```
**Headers:**
```
Cookie: accessToken=<jwt-token>
```
**Response:** `200 OK`
```json
{
  "message": "Successfully getAllPublicShare",
  "success": true,
  "data": [
    {
      "shareId": "507f1f77bcf86cd799439015",
      "resourceType": "file",
      "resourceId": "507f1f77bcf86cd799439012",
      "token": "a1b2c3d4e5f6g7h8",
      "permission": "view",
      "expiresAt": "2025-12-31T23:59:59.000Z",
      "createdAt": "2025-12-23T10:30:00.000Z"
    }
  ],
  "err": {}
}
```

#### 3. Open Shared Link (Public Access)
```http
GET /share/:token
```
**Description:** Access shared file/folder without authentication
**Response:** 
- For files: Redirects to CloudFront signed URL
- For folders: Returns folder contents with files list

#### 4. Get File from Shared Folder
```http
GET /share/:token/file/:fileId
```
**Description:** Access specific file within a shared folder
**Response:** Returns CloudFront signed URL for the file

#### 5. Bulk Delete Share Links
```http
DELETE /share/public
```
**Headers:**
```
Cookie: accessToken=<jwt-token>
```
**Request Body:**
```json
{
  "linkIds": ["507f1f77bcf86cd799439015", "507f1f77bcf86cd799439016"]
}
```

#### 6. Grant Private Access to User
```http
POST /access/grant
```
**Headers:**
```
Cookie: accessToken=<jwt-token>
```
**Request Body:**
```json
{
  "resourceType": "folder",
  "resourceId": "507f1f77bcf86cd799439013",
  "permission": "download",
  "email": "colleague@example.com"
}
```
**Response:** `200 OK`
```json
{
  "message": "Successfully grantAccess",
  "success": true,
  "data": {
    "email": "colleague@example.com",
    "resourceType": "folder",
    "resourceId": "507f1f77bcf86cd799439013"
  },
  "err": {}
}
```

#### 7. Get All Access Granted to Me
```http
GET /access
```
**Headers:**
```
Cookie: accessToken=<jwt-token>
```
**Response:** Lists all files/folders shared with the current user

#### 8. Access Shared Item
```http
GET /access/:item
```
**Headers:**
```
Cookie: accessToken=<jwt-token>
```
**Description:** Access file/folder shared privately with the user
**Response:**
- For files: Returns CloudFront signed URL
- For folders: Returns folder structure with rootpath for navigation

---

## 👨‍💻 Development

### NPM Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `start` | `npm start` | Start server with nodemon + Tailwind CSS watcher |
| `build:css` | `npm run build:css` | Build Tailwind CSS for production |
| `tailwind` | `npm run tailwind` | Watch and compile Tailwind CSS |

### Development Workflow

1. **Start development server with auto-reload:**
   ```bash
   npm start
   ```
   This runs both the Express server with nodemon AND the Tailwind CSS watcher concurrently.

2. **Build CSS for production:**
   ```bash
   npm run build:css
   ```

3. **Run in production mode:**
   ```bash
   NODE_ENV=production node web/index.js
   ```

4. **Check code for issues:**
   ```bash
   npm audit
   npm audit fix
   ```

### Database Management

**Connect to MongoDB:**
```bash
mongosh mongodb://localhost:27017/surakshya_cloud
```

### Project Entry Point

The application entry point is `web/index.js`, which:
- Sets up Express with EJS templating
- Configures middlewares (auth, CSRF, body parser)
- Mounts API routes at `/api/v1`
- Mounts web routes at `/`
- Connects to MongoDB on startup


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

- Built with [Express.js](https://expressjs.com/) - Fast, unopinionated web framework
- Database by [MongoDB](https://www.mongodb.com/) - NoSQL document database
- ODM by [Mongoose](https://mongoosejs.com/) - Elegant MongoDB object modeling
- Storage by [AWS S3](https://aws.amazon.com/s3/) - Scalable object storage
- CDN by [AWS CloudFront](https://aws.amazon.com/cloudfront/) - Global content delivery
- Styled with [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- UI Components by [DaisyUI](https://daisyui.com/) - Tailwind CSS component library
- Templates by [EJS](https://ejs.co/) - Embedded JavaScript templating

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
