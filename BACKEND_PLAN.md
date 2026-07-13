# Elegant Store - Backend Plan 🚀

## 📋 Технологічний Стек

### Framework & Runtime
- **Node.js** 18+ (LTS)
- **Express.js** 4.x (Web framework)
- **TypeScript** (Type safety)

### База Даних
- **PostgreSQL** 14+ (Primary DB)
- **Redis** (Caching, Sessions)
- **MongoDB** (Optional - для аналітики)

### Аутентифікація & Безпека
- **JWT** (JSON Web Tokens)
- **Bcrypt** (Password hashing)
- **CORS** (Cross-Origin Resource Sharing)
- **Helmet.js** (Security headers)

### Платежи
- **Stripe** (Credit/Debit cards)
- **PayPal** API
- **Mono** або **ПриватБанк** (для українців)

### Сховище файлів
- **AWS S3** або **Cloudinary** (Image uploads)
- **Local Storage** (Development)

### Додаткові бібліотеки
- **Sequelize** або **TypeORM** (ORM)
- **Joi** або **Zod** (Validation)
- **Nodemailer** (Email sending)
- **Bull** (Job queue)
- **Winston** (Logging)

---

## 📁 Структура Проекту

```
backend/
├── src/
│   ├── config/
│   │   ├── database.ts
│   │   ├── redis.ts
│   │   ├── stripe.ts
│   │   └── env.ts
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── products.controller.ts
│   │   ├── cart.controller.ts
│   │   ├── orders.controller.ts
│   │   ├── users.controller.ts
│   │   ├── reviews.controller.ts
│   │   └── payments.controller.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── products.service.ts
│   │   ├── cart.service.ts
│   │   ├── orders.service.ts
│   │   ├── users.service.ts
│   │   ├── reviews.service.ts
│   │   ├── payment.service.ts
│   │   ├── email.service.ts
│   │   └── cache.service.ts
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── products.routes.ts
│   │   ├── cart.routes.ts
│   │   ├── orders.routes.ts
│   │   ├── users.routes.ts
│   │   ├── reviews.routes.ts
│   │   └── payments.routes.ts
│   ├── models/
│   │   ├── User.ts
│   │   ├── Product.ts
│   │   ├── Cart.ts
│   │   ├── Order.ts
│   │   ├── Review.ts
│   │   ├── Payment.ts
│   │   └── Category.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── validation.middleware.ts
│   │   ├── error.middleware.ts
│   │   ├── logging.middleware.ts
│   │   └── rate-limit.middleware.ts
│   ├── validators/
│   │   ├── auth.validator.ts
│   │   ├── products.validator.ts
│   │   ├── orders.validator.ts
│   │   └── payment.validator.ts
│   ├── utils/
│   │   ├── logger.ts
│   │   ├── errors.ts
│   │   ├── response.ts
│   │   ├── jwt.ts
│   │   └── pagination.ts
│   ├── jobs/
│   │   ├── send-email.job.ts
│   │   ├── generate-invoice.job.ts
│   │   └── update-inventory.job.ts
│   ├── migrations/
│   │   ├── 001_create_users_table.ts
│   │   ├── 002_create_products_table.ts
│   │   ├── 003_create_orders_table.ts
│   │   └── ...
│   ├── seeds/
│   │   ├── users.seed.ts
│   │   ├── products.seed.ts
│   │   ├── categories.seed.ts
│   │   └── ...
│   └── app.ts
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .env.example
├── .env.development
├── .env.production
├── Dockerfile
├── docker-compose.yml
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🗄️ Модель БД (PostgreSQL)

### Таблиця: users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  avatar_url TEXT,
  role ENUM('user', 'admin', 'moderator') DEFAULT 'user',
  is_active BOOLEAN DEFAULT true,
  is_verified BOOLEAN DEFAULT false,
  verification_token VARCHAR(255),
  reset_password_token VARCHAR(255),
  reset_password_expires TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Таблиця: products
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sku VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2),
  category_id UUID REFERENCES categories(id),
  image_url TEXT,
  images JSONB[],
  stock_quantity INTEGER DEFAULT 0,
  rating DECIMAL(3, 2),
  review_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Таблиця: orders
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(50) UNIQUE NOT NULL,
  user_id UUID NOT NULL REFERENCES users(id),
  status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
  subtotal DECIMAL(10, 2) NOT NULL,
  shipping_cost DECIMAL(10, 2) DEFAULT 0,
  tax DECIMAL(10, 2) DEFAULT 0,
  discount DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  shipping_address JSONB NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  payment_status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
  tracking_number VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Таблиця: order_items
```sql
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  size VARCHAR(10),
  color VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Таблиця: reviews
```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  comment TEXT,
  helpful_count INTEGER DEFAULT 0,
  is_verified_purchase BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Таблиця: payments
```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id),
  user_id UUID NOT NULL REFERENCES users(id),
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  payment_method VARCHAR(50) NOT NULL,
  provider_id VARCHAR(255),
  status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
  transaction_id VARCHAR(255),
  metadata JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Таблиця: categories
```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) UNIQUE,
  description TEXT,
  image_url TEXT,
  parent_id UUID REFERENCES categories(id),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Таблиця: carts
```sql
CREATE TABLE carts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Таблиця: cart_items
```sql
CREATE TABLE cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cart_id UUID NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL,
  size VARCHAR(10),
  color VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔌 API Endpoints

### Auth Routes
```
POST   /api/auth/register          - Реєстрація
POST   /api/auth/login             - Вхід
POST   /api/auth/logout            - Вихід
POST   /api/auth/refresh-token     - Оновити токен
POST   /api/auth/forgot-password   - Забув пароль
POST   /api/auth/reset-password    - Скинути пароль
GET    /api/auth/verify-email      - Підтвердити email
```

### Products Routes
```
GET    /api/products               - Отримати всі товари
GET    /api/products/:id           - Отримати товар за ID
GET    /api/products/search        - Пошук товарів
GET    /api/products/category/:id  - Товари по категорії
POST   /api/products               - Створити товар (Admin)
PUT    /api/products/:id           - Оновити товар (Admin)
DELETE /api/products/:id           - Видалити товар (Admin)
```

### Cart Routes
```
GET    /api/cart                   - Отримати кошик
POST   /api/cart/items             - Додати товар
PUT    /api/cart/items/:id         - Оновити кількість
DELETE /api/cart/items/:id         - Видалити товар
DELETE /api/cart                   - Очистити кошик
POST   /api/cart/apply-promo       - Застосувати промокод
```

### Orders Routes
```
GET    /api/orders                 - Отримати замовлення користувача
GET    /api/orders/:id             - Отримати деталі замовлення
POST   /api/orders                 - Створити замовлення
PUT    /api/orders/:id/cancel      - Скасувати замовлення
GET    /api/orders/:id/invoice     - Завантажити рахунок
```

### Payments Routes
```
POST   /api/payments/create        - Створити платіж
POST   /api/payments/webhook       - Webhook від провайдера
GET    /api/payments/:id           - Статус платежу
```

### Users Routes
```
GET    /api/users/profile          - Профіль користувача
PUT    /api/users/profile          - Оновити профіль
POST   /api/users/change-password  - Змінити пароль
GET    /api/users/addresses        - Адреси доставки
POST   /api/users/addresses        - Додати адресу
DELETE /api/users/addresses/:id    - Видалити адресу
```

### Reviews Routes
```
GET    /api/reviews/product/:id    - Отримати відгуки товару
POST   /api/reviews                - Залишити відгук
PUT    /api/reviews/:id            - Редагувати відгук
DELETE /api/reviews/:id            - Видалити відгук
```

### Admin Routes
```
GET    /api/admin/dashboard        - Статистика
GET    /api/admin/users            - Список користувачів
GET    /api/admin/orders           - Все замовлення
PUT    /api/admin/orders/:id       - Оновити статус
GET    /api/admin/analytics        - Аналітика
```

---

## 🔐 Middleware & Security

### Middleware
1. **Authentication Middleware** - Перевірка JWT токена
2. **Authorization Middleware** - Перевірка прав доступу
3. **Validation Middleware** - Валідація запитів
4. **Error Handler Middleware** - Обробка помилок
5. **Rate Limiting** - Обмеження запитів
6. **CORS Middleware** - Керування доступом
7. **Logging Middleware** - Логування запитів

### Безпека
- ✅ Password hashing (bcrypt)
- ✅ JWT Authentication
- ✅ HTTPS/SSL
- ✅ SQL Injection prevention (Parameterized queries)
- ✅ XSS protection (Helmet)
- ✅ CSRF protection
- ✅ Rate limiting
- ✅ Input validation & sanitization
- ✅ CORS configuration

---

## 📧 Email Services

### Типи листів
- Welcome email (після реєстрації)
- Email verification
- Password reset
- Order confirmation
- Shipping notification
- Delivery confirmation
- Newsletter

### Email Template Engine
- **Handlebars** або **EJS** для templates
- **Nodemailer** для відправлення
- **SendGrid** або **AWS SES** (Production)

---

## 💰 Payment Integration

### Stripe
- Webhook handling
- Payment intents
- Refund processing
- Subscription support (future)

### PayPal
- Express Checkout
- Webhook handling
- Refund processing

### Локальні платежи (Mono/ПриватБанк)
- API integration
- Invoice generation

---

## 📊 Caching Strategy

### Redis Caching
```
- Products cache (TTL: 1 hour)
- User sessions (TTL: 7 days)
- Categories cache (TTL: 24 hours)
- Cart data (TTL: 30 days)
- Top products cache (TTL: 6 hours)
```

---

## 🔄 Job Queue (Bull)

### Background Jobs
1. Send emails
2. Generate invoices
3. Update product inventory
4. Process refunds
5. Generate analytics
6. Send notifications

---

## 📈 Logging & Monitoring

### Winston Logger
```
INFO  - Application events
ERROR - Errors and exceptions
WARN  - Warnings
DEBUG - Debug information
```

### Monitoring
- Sentry (Error tracking)
- DataDog (APM)
- New Relic (Performance)

---

## 🧪 Testing Strategy

### Unit Tests
- Services testing
- Validators testing
- Utils testing

### Integration Tests
- API endpoints
- Database operations
- External services

### E2E Tests
- Full user workflows
- Payment processing
- Order creation

### Tools
- **Jest** - Test framework
- **Supertest** - HTTP assertions
- **Mock data** - Test fixtures

---

## 🚀 Deployment

### Development
- Local PostgreSQL
- Local Redis
- npm start / nodemon

### Staging
- AWS RDS (PostgreSQL)
- AWS ElastiCache (Redis)
- Docker containers
- Heroku or AWS ECS

### Production
- AWS RDS (PostgreSQL) with backups
- AWS ElastiCache (Redis Cluster)
- AWS S3 (Image storage)
- Docker containers
- AWS ECS or Kubernetes
- CloudFront CDN
- Load Balancer (ALB)

---

## 📝 Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/elegant_store
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRES_IN=30d

# Stripe
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
FROM_EMAIL=noreply@elegantstore.ua

# AWS
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_BUCKET=elegant-store-images
AWS_REGION=eu-west-1

# Server
NODE_ENV=development
PORT=5000
BASE_URL=http://localhost:3000
API_URL=http://localhost:5000/api

# Logging
LOG_LEVEL=debug
```

---

## 🔗 Frontend-Backend Integration

### Headers
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
X-Requested-With: XMLHttpRequest
```

### Response Format
```json
{
  "success": true,
  "data": {...},
  "message": "Operation successful",
  "statusCode": 200
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "statusCode": 400,
  "errors": [{"field": "email", "message": "Invalid email"}]
}
```

---

## 📅 Development Phases

### Phase 1: Setup & Foundation (Week 1)
- [ ] Project setup
- [ ] Database design
- [ ] Authentication system
- [ ] Basic CRUD operations

### Phase 2: Core Features (Week 2-3)
- [ ] Products management
- [ ] Cart functionality
- [ ] Orders system
- [ ] User management

### Phase 3: Payments & Integrations (Week 4)
- [ ] Stripe integration
- [ ] PayPal integration
- [ ] Email service
- [ ] Webhook handlers

### Phase 4: Advanced Features (Week 5)
- [ ] Reviews & ratings
- [ ] Admin dashboard
- [ ] Analytics
- [ ] Caching layer

### Phase 5: Testing & Optimization (Week 6)
- [ ] Unit tests
- [ ] Integration tests
- [ ] E2E tests
- [ ] Performance optimization

### Phase 6: Deployment (Week 7)
- [ ] Docker setup
- [ ] CI/CD pipeline
- [ ] Production deployment
- [ ] Monitoring setup

---

## 📞 Contact & Support

Дякуємо за використання цього плану! Для питань - зверніться до команди розробки. 🚀
