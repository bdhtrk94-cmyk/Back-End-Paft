import { DataSource } from 'typeorm';
import { Content } from '../content/entities/content.entity';

/**
 * Seeds Arabic translations (valueAr) for existing Home page content.
 * This script updates existing rows — it does NOT create new ones.
 */
export async function seedHomeArabicContent(dataSource: DataSource) {
    const contentRepository = dataSource.getRepository(Content);

    // Map of { section → { key → valueAr } }
    const arabicTranslations: Record<string, Record<string, string>> = {
        'business-units': {
            'title': 'وحدات الأعمال',
            'subtitle': 'حلول شاملة عبر ثلاثة أقسام رئيسية',
            'unit1-title': 'طبالي بلاستيكية',
            'unit1-description': 'طبالي بافت البلاستيكية فائقة التحمل مصنوعة من خامات HDPE المُعاد تدويرها بنسبة 100%، وتتميز بمقاومتها للرطوبة والكيماويات والحشرات. مصممة لتحمل الأحمال الثقيلة في بيئات سلاسل التوريد القاسية مع ضمان عمر افتراضي يتجاوز 10 سنوات.',
            'unit1-button-text': 'اكتشف المزيد',
            'unit2-title': 'مواد خام معاد تدويرها عالية الأداء',
            'unit2-description': 'موادنا الخام المبتكرة المعاد تدويرها — بما في ذلك حبيبات HDPE، PP وABS — تُنتج في منشأتنا المتطورة بطاقة 3000 طن شهرياً. نضمن جودة متسقة ومطابقة للمواصفات بأسعار تنافسية.',
            'unit2-button-text': 'اكتشف المزيد',
            'unit3-title': 'عصر جديد من التتبع والتتبع الذكي',
            'unit3-description': 'يستخدم نظام بافت iWMS تقنية RFID المتقدمة وأنظمة إدارة المستودعات الذكية لتوفير تتبع فوري للطبالي وتحسين عمليات سلاسل التوريد وتقليل الفقد.',
            'unit3-button-text': 'اكتشف المزيد',
        },
        'video-hero': {
            'watch-video-text': 'شاهد الفيديو',
        },
    };

    let updatedCount = 0;

    for (const [section, keys] of Object.entries(arabicTranslations)) {
        for (const [key, valueAr] of Object.entries(keys)) {
            const result = await contentRepository.update(
                { page: 'home', section, key },
                { valueAr },
            );
            if (result.affected && result.affected > 0) {
                updatedCount += result.affected;
                console.log(`✅ Updated home/${section}/${key} → valueAr set`);
            } else {
                console.warn(`⚠️  No row found for home/${section}/${key}`);
            }
        }
    }

    console.log(`\n🏁 Arabic seeding complete: ${updatedCount} rows updated.`);
}

// Allow direct execution: npx ts-node src/seeds/seed-home-arabic-content.ts
if (require.main === module) {
    const { DataSource } = require('typeorm');
    const ds = new DataSource({
        type: 'mariadb',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306'),
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_DATABASE || 'paft_cms',
        entities: [Content],
        synchronize: false,
    });

    ds.initialize()
        .then(() => seedHomeArabicContent(ds))
        .then(() => ds.destroy())
        .catch((err: Error) => {
            console.error('Seed failed:', err);
            process.exit(1);
        });
}
