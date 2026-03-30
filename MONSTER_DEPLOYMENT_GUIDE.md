# 🚀 دليل رفع الباك اند على MonsterASP.NET

## ✅ الملفات جاهزة للرفع

### الملفات المطلوبة:
- `dist/` - الكود المترجم ✅
- `node_modules/` - المكتبات ✅  
- `package.json` - معلومات المشروع ✅
- `web.config` - إعدادات IIS ✅
- `uploads/` - مجلد الصور (إن وجد)

## 🔧 خطوات الرفع

### 1. رفع الملفات
```
1. ادخل على لوحة تحكم MonsterASP.NET
2. اختار File Manager أو FTP
3. ارفع كل الملفات للمجلد الرئيسي
4. تأكد إن web.config في المجلد الرئيسي
```

### 2. إعداد قاعدة البيانات
```
1. إنشاء MySQL Database من لوحة التحكم
2. احفظ البيانات دي:
   - DB_HOST: عنوان السيرفر
   - DB_USERNAME: اسم المستخدم  
   - DB_PASSWORD: كلمة المرور
   - DB_DATABASE: اسم قاعدة البيانات
```

### 3. إعداد Environment Variables
```
ادخل على Environment Variables في لوحة التحكم وضيف:

NODE_ENV=production
DB_HOST=your_mysql_host_from_control_panel
DB_PORT=3306
DB_USERNAME=your_mysql_username
DB_PASSWORD=your_mysql_password  
DB_DATABASE=your_database_name
JWT_SECRET=change_this_to_very_long_random_secret_key
CORS_ORIGIN=https://your-frontend-domain.vercel.app
```

## 🧪 اختبار الموقع

### بعد الرفع اختبر الروابط دي:

1. **الصفحة الرئيسية**: `https://yourdomain.com/`
   - المفروض تشوف: "PAFT CMS API is running!"

2. **فحص الصحة**: `https://yourdomain.com/api/health`
   - المفروض ترجع JSON فيه status: "ok"

3. **اختبار API**: `https://yourdomain.com/api/test`
   - المفروض ترجع: "Test endpoint working!"

## 🐛 حل المشاكل الشائعة

### مشكلة: 404 Not Found
- تأكد إن web.config موجود في المجلد الرئيسي
- تأكد إن Node.js مفعل على السيرفر

### مشكلة: 500 Internal Server Error  
- شوف الـ logs في لوحة التحكم
- تأكد من Environment Variables
- تأكد إن dist/main.js موجود

### مشكلة: Database Connection Failed
- راجع بيانات قاعدة البيانات
- تأكد إن قاعدة البيانات متعملة
- جرب الاتصال من لوحة التحكم

## 📞 الدعم

لو واجهت مشكلة:
1. شوف الـ logs في لوحة تحكم MonsterASP
2. تأكد من كل الخطوات فوق
3. اتصل بدعم MonsterASP لو المشكلة في السيرفر

---
**ملاحظة مهمة**: غير JWT_SECRET لكلمة مرور قوية قبل الرفع!