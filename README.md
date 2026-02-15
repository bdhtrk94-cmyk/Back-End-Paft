# PAFT Backend System 🚀

Backend API system for PAFT Plastic Pallets - A leading manufacturer of premium plastic pallets in Egypt.

## 🏢 About PAFT

PAFT specializes in durable, eco-friendly, and cost-effective logistics solutions for various industries including industrial logistics, pharmaceutical, food industry, and export operations.

**Founded**: 2010 | **Employees**: 50+ | **Certifications**: ISO 9001, ISO 14001, HACCP

## 🛠️ Technology Stack

- **Framework**: NestJS 11
- **Language**: TypeScript 5
- **Database**: MySQL with TypeORM
- **Authentication**: Passport.js with JWT and Local strategies
- **Security**: Helmet, bcrypt for password hashing, throttling
- **Logging**: Winston with nest-winston
- **Testing**: Jest with coverage support
- **Code Quality**: ESLint with Prettier

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MySQL 8.0+
- npm

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Tarqumi/Paft-System-backend.git
cd Paft-System-backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment setup**
```bash
cp .env.example .env
# Configure your database settings in .env
```

4. **Database setup**
```bash
# Create MySQL database named 'paft_cms'
# The application will auto-create tables with TypeORM
```

5. **Seed initial data**
```bash
npm run create:data
```

6. **Start development server**
```bash
npm run start:dev
```

The API will be available at `http://localhost:3001/api`

## 📊 Database Structure

### Tables
- **users**: User accounts with role-based access
- **products**: Product catalog with 6 categories
- **orders**: Order management system
- **order_items**: Order line items
- **pages**: CMS pages content
- **site_content**: Dynamic site content

### Default Data
- 2 Users (1 Admin, 1 Regular user)
- 6 Products across all categories
- 3 CMS Pages
- 3 Site content items

## 🔐 Authentication & Authorization

### Roles
- **User**: Basic access to products and orders
- **Admin**: Product and content management
- **Super Admin**: Full system access including user management

### Default Credentials
- **Super Admin**: `Abdelrahman@gmail.com` / `admin123`
- **Regular User**: `mohamed@example.com` / `user123`

## 🔧 Available Scripts

### Development
```bash
npm run start:dev    # Start development server with watch mode
npm run start:debug  # Start with debug mode
npm run build        # Build TypeScript to JavaScript
npm run start:prod   # Start production server
```

### Database Operations
```bash
npm run create:data     # Create initial seed data
npm run show:data       # Display all database data
npm run show:tables     # Show all database tables
npm run describe:tables # Describe table structures
```

### Testing
```bash
npm run test         # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run test:cov     # Run tests with coverage
npm run test:e2e     # Run end-to-end tests
```

### Code Quality
```bash
npm run lint         # Run ESLint with auto-fix
npm run format       # Format code with Prettier
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/status` - Update order status (Admin)

### Admin
- `GET /api/admin/users` - Get all users (Admin)
- `GET /api/admin/dashboard` - Dashboard statistics (Admin)

### Pages & Content
- `GET /api/pages` - Get all pages
- `GET /api/site-content` - Get site content
- `POST /api/pages` - Create page (Admin)
- `PUT /api/site-content/:id` - Update content (Admin)

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based authorization guards
- Rate limiting and throttling
- Input validation with class-validator
- Helmet for security headers
- CORS configuration

## 📝 Environment Variables

```env
PORT=3001
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_mysql_password
DB_DATABASE=paft_cms
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRATION=1d
```

## 🚀 Deployment

The application is ready for deployment on:
- Railway
- Heroku
- DigitalOcean
- AWS EC2
- Any Node.js hosting platform

### Production Checklist
- [ ] Update JWT_SECRET in production
- [ ] Configure production database
- [ ] Set up SSL/TLS
- [ ] Configure CORS for production domain
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy

## 📁 Project Structure

```
src/
├── main.ts                 # Application entry point
├── app.module.ts           # Root module
├── auth/                   # Authentication module
├── users/                  # User management
├── products/               # Product management
├── orders/                 # Order processing
├── pages/                  # CMS pages
├── site-content/           # Site content management
├── admin/                  # Admin functionality
├── common/                 # Shared utilities
└── seeds/                  # Database seeding scripts
```

## 🤝 Contributing

This is a private project for PAFT. For any questions or support, please contact the development team.

## 📄 License

This project is proprietary software owned by PAFT.

---

**PAFT Backend System** - Powering premium plastic pallet solutions in Egypt 🇪🇬