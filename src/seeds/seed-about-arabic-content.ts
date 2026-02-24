import { DataSource } from 'typeorm';
import { Content } from '../content/entities/content.entity';

/**
 * Seeds Arabic translations (valueAr) for existing About page content.
 * This script updates existing rows — it does NOT create new ones.
 */
export async function seedAboutArabicContent(dataSource: DataSource) {
    const contentRepository = dataSource.getRepository(Content);

    const arabicTranslations: Record<string, Record<string, string>> = {
        'hero': {
            'badge-text': 'عن بافت',
            'title': 'رؤيتنا',
            'description': 'أن نكون ونُعرف كفريق الصدارة في تقديم الحلول المثلى للوجستيات النقل وتكنولوجيا التعبئة والتغليف الفنية.',
        },
        'who-we-are': {
            'badge-text': 'من نحن',
            'title': 'تطبيقات التعبئة وتقنيات المستقبل',
            'paragraph1': 'بافت (تطبيقات التعبئة وتقنيات المستقبل) هي شركة رائدة في تقديم حلول سلاسل التوريد المبتكرة في منطقة الشرق الأوسط وشمال أفريقيا. بتركيزها على الجودة والمتانة والكفاءة، تتخصص بافت في تصميم وتصنيع وتوزيع مجموعة واسعة من منتجات التعبئة الصناعية، بما في ذلك الطبالي والصناديق وحاويات السوائب الوسيطة (IBC).',
            'paragraph2': 'ينعكس التزامنا بالتميز في استخدامنا لأجود المواد والتكنولوجيا المتطورة وعروض الخدمة المصممة خصيصاً لاحتياجاتكم.',
            'paragraph3': 'في بافت، نتفهم التحديات التي تواجه الصناعات في إدارة سلاسل التوريد الخاصة بها. منتجاتنا مصممة لتلبية أعلى معايير المتانة والنظافة والامتثال البيئي، مما يضمن سير عملياتكم بسلاسة وكفاءة.',
            'paragraph4': 'سواء كنت بحاجة إلى طبالي ثقيلة التحمل تتحمل أحمالاً كبيرة، أو حلول تأجير مرنة، أو حاويات متخصصة لتخزين السوائل، فإن بافت لديها الخبرة والمنتجات لدعم احتياجات أعمالكم.',
            'quote': 'في بافت، الابتكار بقيمة عالية هو جوهر كل ما نقوم به، مما يجعلنا الشريك الموثوق للشركات عبر مختلف الصناعات.',
            'stat1-number': '+10',
            'stat1-text': 'سنوات خبرة',
            'stat2-number': 'الشرق الأوسط',
            'stat2-text': 'رائد إقليمي',
        },
        'values': {
            'title': 'قيمنا الأساسية',
            'subtitle': 'المبادئ التي توجه كل ما نقوم به في بافت',
            'value1-title': 'الجودة أولاً',
            'value1-description': 'لا نتهاون أبداً في الجودة ونضمن أن كل منتج يلبي أعلى المعايير الدولية.',
            'value2-title': 'الابتكار',
            'value2-description': 'نواصل دفع الحدود بالتكنولوجيا المتطورة والحلول المستقبلية.',
            'value3-title': 'الاستدامة',
            'value3-description': 'ملتزمون بالمسؤولية البيئية من خلال المواد القابلة لإعادة التدوير والعمليات الصديقة للبيئة.',
            'value4-title': 'التركيز على العميل',
            'value4-description': 'عملاؤنا هم محور كل ما نقوم به، يقودون ابتكارنا وتميز خدماتنا.',
        },
        'cta': {
            'title': 'هل أنت مستعد للعمل معنا؟',
            'description': 'دعنا نناقش كيف يمكن لبافت المساعدة في تحسين عمليات اللوجستيات الخاصة بك.',
            'button1-text': 'تواصل معنا ←',
            'button2-text': 'تصفح المنتجات',
        },
    };

    let updatedCount = 0;

    for (const [section, keys] of Object.entries(arabicTranslations)) {
        for (const [key, valueAr] of Object.entries(keys)) {
            const result = await contentRepository.update(
                { page: 'about', section, key },
                { valueAr },
            );
            if (result.affected && result.affected > 0) {
                updatedCount += result.affected;
                console.log(`✅ Updated about/${section}/${key} → valueAr set`);
            } else {
                console.warn(`⚠️  No row found for about/${section}/${key}`);
            }
        }
    }

    console.log(`\n🏁 About Arabic seeding complete: ${updatedCount} rows updated.`);
}

// Allow direct execution
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
        .then(() => seedAboutArabicContent(ds))
        .then(() => ds.destroy())
        .catch((err: Error) => {
            console.error('Seed failed:', err);
            process.exit(1);
        });
}
