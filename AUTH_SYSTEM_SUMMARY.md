# نظام المصادقة (Authentication System) - PAFT Backend

## نظرة عامة
نظام المصادقة في PAFT Backend مبني بالكود باستخدام مكتبات NestJS الرسمية، وليس plugin جاهز. يستخدم JWT للمصادقة، bcrypt لتشفير كلمات المرور، ونظام أدوار متقدم للتحكم في الصلاحيات.

## المكتبات المستخدمة

### مكتبات أساسية
- `@nestjs/jwt` - للتعامل مع JWT tokens
- `@nestjs/passport` - للمصادقة 
- `passport-jwt` - استراتيجية JWT
- `bcrypt` - لتشفير كلمات المرور
- `class-validator` - للتحقق من صحة البيانات
- `typeorm` - للتعامل مع قاعدة البيانات

### إعدادات JWT
```typescript
JwtModule.registerAsync({
  secret: process.env.JWT_SECRET || 'fallback-secret',
  signOptions: {
    expiresIn: process.env.JWT_EXPIRATION || '1d'
  }
})
```

## هيكل النظام

### 1. Auth Module (`auth.module.ts`)
- يستورد `JwtModule` مع إعدادات JWT
- يستورد `PassportModule` 
- يربط مع `UsersModule`
- يسجل `JwtStrategy`

### 2. Auth Service (`auth.service.ts`)
#### وظائف أساسية:
- **التسجيل (Register)**:
  - يتحقق من عدم وجود البريد الإلكتروني
  - يشفر كلمة المرور باستخدام bcrypt
  - ينشئ المستخدم في قاعدة البيانات
  - يولد JWT token

- **تسجيل الدخول (Login)**:
  - يتحقق من وجود المستخدم
  - يقارن كلمة المرور المشفرة
  - يولد JWT token

- **التحقق (Validation)**:
  - يتحقق من صحة المستخدم من قاعدة البيانات

### 3. Auth Controller (`auth.controller.ts`)
#### Endpoints متاحة:
- `POST /auth/register` - تسجيل مستخدم جديد
- `POST /auth/login` - تسجيل الدخول
- `GET /auth/profile` - الحصول على بيانات المستخدم (محمي)

## نظام الأدوار (Roles System)

### أنواع الأدوار
```typescript
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user', 
  SUPER_ADMIN = 'super_admin'
}
```

### User Entity
```typescript
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
```

## نظام الحماية (Guards & Security)

### 1. JWT Auth Guard
```typescript
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
```
- يتحقق من وجود وصحة JWT token
- يستخرج المستخدم من التوكن

### 2. Roles Guard
```typescript
@Injectable()
export class RolesGuard implements CanActivate {
  // يتحقق من صلاحيات المستخدم
}
```

### 3. JWT Strategy
```typescript
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // يستخرج JWT من Authorization header
  // يتحقق من صحة التوقيع
  // يجلب بيانات المستخدم من قاعدة البيانات
}
```

## التحقق من البيانات (Data Validation)

### Login DTO
```typescript
export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
```

### Register DTO
```typescript
export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
```

## كيفية الاستخدام

### حماية Endpoint
```typescript
@UseGuards(JwtAuthGuard)
@Get('protected')
protectedEndpoint(@Request() req) {
  return req.user; // بيانات المستخدم المصادق عليه
}
```

### حماية بالأدوار
```typescript
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Get('admin-only')
adminOnlyEndpoint() {
  return 'Only admins can access this';
}
```

### حماية متعددة الأدوار
```typescript
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
@Get('admin-or-super-admin')
adminOrSuperAdminEndpoint() {
  return 'Admins and Super Admins can access this';
}
```

## تدفق العمل (Workflow)

### 1. تسجيل مستخدم جديد
1. المستخدم يرسل بيانات التسجيل
2. النظام يتحقق من صحة البيانات (DTO validation)
3. يتحقق من عدم وجود البريد الإلكتروني
4. يشفر كلمة المرور باستخدام bcrypt
5. ينشئ المستخدم في قاعدة البيانات
6. يولد JWT token ويرسله للمستخدم

### 2. تسجيل الدخول
1. المستخدم يرسل بيانات الدخول
2. النظام يتحقق من صحة البيانات
3. يبحث عن المستخدم في قاعدة البيانات
4. يقارن كلمة المرور مع المشفرة
5. يولد JWT token جديد ويرسله

### 3. الوصول للموارد المحمية
1. المستخدم يرسل طلب مع JWT في Authorization header
2. JwtAuthGuard يتحقق من صحة التوكن
3. JwtStrategy يستخرج بيانات المستخدم
4. RolesGuard يتحقق من الصلاحيات (إذا مطلوب)
5. يسمح أو يرفض الوصول

## الأمان (Security Features)

- **تشفير كلمات المرور**: باستخدام bcrypt مع salt rounds = 10
- **JWT Tokens**: مع انتهاء صلاحية قابل للتخصيص
- **التحقق من البيانات**: باستخدام class-validator
- **نظام الأدوار**: للتحكم في الصلاحيات
- **Guards متعددة**: للحماية على مستويات مختلفة

## ملفات النظام

```
src/auth/
├── auth.module.ts          # تكوين الوحدة
├── auth.service.ts         # منطق المصادقة
├── auth.controller.ts      # نقاط النهاية
├── dto/
│   ├── login.dto.ts       # تحقق بيانات الدخول
│   └── register.dto.ts    # تحقق بيانات التسجيل
├── guards/
│   ├── jwt-auth.guard.ts  # حماية JWT
│   └── roles.guard.ts     # حماية الأدوار
├── strategies/
│   └── jwt.strategy.ts    # استراتيجية JWT
└── decorators/
    └── roles.decorator.ts # ديكوريتر الأدوار
```

## خلاصة
النظام مصمم بطريقة احترافية باستخدام أفضل الممارسات في NestJS، مع تركيز على الأمان والمرونة وسهولة الصيانة.