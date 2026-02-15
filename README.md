# PAFT System - Backend API

![PAFT Logo](https://raw.githubusercontent.com/Tarqumi/PAFT_System/main/public/paft-logo.png)

## 🌟 Overview

PAFT System Backend is a robust RESTful API built with NestJS for PAFT Plastic Pallets, a leading manufacturer of premium plastic pallets in Egypt. This API provides comprehensive backend services for product management, user authentication, order processing, and content management.

## 🚀 Features

- **RESTful API**: Built with NestJS 11 and TypeScript
- **Database Integration**: MySQL with TypeORM
- **Authentication**: JWT-based secure authentication with Passport.js
- **Security**: Helmet, bcrypt, rate limiting, and CORS protection
- **Logging**: Winston with structured logging
- **Validation**: Class-validator for request validation
- **Testing**: Jest with comprehensive test coverage
- **Documentation**: Swagger/OpenAPI integration

## 🛠️ Tech Stack

- **Framework**: NestJS 11
- **Language**: TypeScript 5
- **Database**: MySQL with TypeORM
- **Authentication**: Passport.js with JWT and Local strategies
- **Security**: Helmet, bcrypt for password hashing, throttling
- **Logging**: Winston with nest-winston
- **Testing**: Jest with coverage support
- **Linting**: ESLint with Prettier
- **Build System**: NestJS CLI
- **Package Manager**: npm

## 📋 Prerequisites

- Node.js 18+ LTS
- npm or yarn
- MySQL 8.0+ or MariaDB 10.3+
- Frontend application (see [Frontend Repository](https://github.com/Tarqumi/PAFT_System))

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/Tarqumi/Paft-System-backend.git
cd Paft-System-backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Database Setup
```sql
-- Connect to MySQL as root
mysql -u root -p

-- Create database
CREATE DATABASE paft_development CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create user (optional)
CREATE USER 'paft_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON paft_development.* TO 'paft_user'@'localhost';
FLUSH PRIVILEGES;
```

### 4. Environment Setup
Create a `.env` file in the root directory:
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=paft_user
DB_PASSWORD=your_password
DB_DATABASE=paft_development

# JWT Configuration
JWT_SECRET=your-super-secure-jwt-secret-minimum-32-characters
JWT_EXPIRES_IN=7d

# Application Configuration
NODE_ENV=development
PORT=3001

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# File Upload Configuration
UPLOAD_DEST=./uploads
MAX_FILE_SIZE=10485760

# Logging Configuration
LOG_LEVEL=debug
```

### 5. Run Database Migrations
```bash
npm run typeorm:run
```

### 6. Seed Database (Optional)
```bash
npm run seed:run
```

### 7. Start Development Server
```bash
npm run start:dev
```

The API will be available at `http://localhost:3001`

## 📁 Project Structure

```
src/
├── main.ts                 # Application entry point
├── app.module.ts           # Root module
├── app.controller.ts       # Root controller
├── app.service.ts          # Root service
├── auth/                   # Authentication module
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── guards/             # Authentication guards
│   └── strategies/         # Passport strategies
├── users/                  # User management module
├── products/               # Product management module
├── orders/                 # Order processing module
├── pages/                  # CMS pages module
├── site-content/           # Site content management
├── common/                 # Shared utilities and guards
│   ├── decorators/
│   ├── filters/
│   ├── guards/
│   └── interceptors/
└── seeds/                  # Database seeding scripts
```

## 🔧 Available Scripts

```bash
# Development
npm run start:dev    # Start development server with watch mode
npm run start:debug  # Start with debug mode
npm run build        # Build TypeScript to JavaScript
npm run start:prod   # Start production server

# Testing
npm run test         # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run test:cov     # Run tests with coverage
npm run test:e2e     # Run end-to-end tests

# Database
npm run typeorm:run        # Run migrations
npm run typeorm:revert     # Revert last migration
npm run typeorm:generate   # Generate new migration
npm run seed:run          # Run database seeds

# Code Quality
npm run lint         # Run ESLint with auto-fix
npm run format       # Format code with Prettier
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/profile` - Get user profile
- `POST /api/auth/refresh` - Refresh JWT token

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/status` - Update order status (Admin)

### Pages & Content
- `GET /api/pages/:slug` - Get page content
- `PUT /api/pages/:slug` - Update page content (Admin)
- `GET /api/site-content` - Get site content
- `PUT /api/site-content` - Update site content (Admin)

### Users (Admin)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## 🔐 Authentication & Authorization

The API uses JWT (JSON Web Tokens) for authentication with role-based access control:

### Roles
- **user**: Regular customers
- **admin**: Site administrators
- **super_admin**: Super administrators with full access

### Protected Routes
Most admin endpoints require authentication and appropriate role permissions.

## 🗄️ Database Schema

### Key Entities
- **Users**: User accounts and profiles
- **Products**: Product catalog with categories and specifications
- **Orders**: Order management and tracking
- **Pages**: CMS pages content
- **SiteContent**: Dynamic site content

### Relationships
- Users have many Orders
- Orders have many OrderItems
- Products belong to Categories
- Pages have dynamic content sections

## 🔒 Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing protection
- **Rate Limiting**: API rate limiting
- **Input Validation**: Request validation with class-validator
- **Password Hashing**: bcrypt for secure password storage
- **JWT**: Secure token-based authentication
- **SQL Injection Protection**: TypeORM query builder

## 📊 Logging

The application uses Winston for structured logging:
- **Development**: Console output with colors
- **Production**: File-based logging with rotation
- **Error Tracking**: Separate error logs
- **Request Logging**: HTTP request/response logging

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test:cov

# Run e2e tests
npm run test:e2e

# Run tests in watch mode
npm run test:watch
```

## 🚀 Production Deployment

### Environment Variables for Production
```env
NODE_ENV=production
PORT=3001
DB_HOST=your-production-db-host
DB_USERNAME=your-production-db-user
DB_PASSWORD=your-secure-production-password
DB_DATABASE=paft_production
JWT_SECRET=your-super-secure-production-jwt-secret
CORS_ORIGIN=https://yourdomain.com
```

### Build for Production
```bash
npm run build
npm run start:prod
```

### Deployment Options
- **IIS**: Windows Server deployment with iisnode
- **PM2**: Process manager for Node.js
- **Docker**: Containerized deployment
- **Cloud**: AWS, Azure, or Google Cloud deployment

## 📈 Performance Optimization

- **Database Indexing**: Optimized database queries
- **Caching**: Redis integration for caching
- **Compression**: Response compression
- **Connection Pooling**: Database connection optimization
- **Query Optimization**: Efficient TypeORM queries

## 🔧 Configuration

### TypeORM Configuration
```typescript
// ormconfig.ts
export default {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
};
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write tests for new features
- Use conventional commit messages
- Update documentation as needed
- Follow ESLint and Prettier rules

## 📄 License

This project is proprietary software owned by PAFT Plastic Pallets.

## 📞 Support

For support and inquiries:
- **Website**: [paft.eg](https://paft.eg)
- **Email**: info@paft.eg
- **Phone**: +20 XXX XXX XXXX

## 🏢 About PAFT

PAFT is a leading manufacturer of premium plastic pallets in Egypt, established in 2010. We specialize in durable, eco-friendly, and cost-effective logistics solutions for various industries including pharmaceutical, food, and export operations.

**Certifications**: ISO 9001, ISO 14001, HACCP
**Employees**: 50+
**Business Hours**: Sunday - Thursday, 9:00 AM - 6:00 PM (Egypt timezone)

---

Made with ❤️ by PAFT Team