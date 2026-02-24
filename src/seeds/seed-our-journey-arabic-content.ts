import { DataSource } from 'typeorm';

/**
 * Seeds Arabic translations (valueAr) for existing Our Journey page content.
 * Uses raw SQL to ensure direct column update.
 */
async function seedOurJourneyArabicContent() {
    const ds = new DataSource({
        type: 'mariadb',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306'),
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_DATABASE || 'paft_cms',
        synchronize: false,
    });

    await ds.initialize();

    const translations: [string, string, string][] = [
        // Hero
        ['hero', 'badge-text', 'مسيرتنا'],
        ['hero', 'title', 'بناء المستقبل'],
        ['hero', 'description', 'أكثر من عقد من الابتكار والنمو والسعي الدؤوب للتميز في حلول التعبئة الصناعية.'],
        ['hero', 'stat1-value', '+15'],
        ['hero', 'stat1-label', 'سنوات ابتكار'],
        ['hero', 'stat2-value', '12'],
        ['hero', 'stat2-label', 'إنجازات رئيسية'],
        ['hero', 'stat3-value', '4'],
        ['hero', 'stat3-label', 'حقب نمو'],
        ['hero', 'stat4-value', '%300'],
        ['hero', 'stat4-label', 'نمو الطاقة الإنتاجية'],

        // Eras
        ['eras', 'era1-label', 'الحقبة الأولى'],
        ['eras', 'era1-subtitle', 'التأسيس والبحث والتطوير'],
        ['eras', 'era1-range', '2010 – 2013'],
        ['eras', 'era2-label', 'الحقبة الثانية'],
        ['eras', 'era2-subtitle', 'التوسع والابتكار'],
        ['eras', 'era2-range', '2014 – 2018'],
        ['eras', 'era3-label', 'الحقبة الثالثة'],
        ['eras', 'era3-subtitle', 'النمو والاستحواذ'],
        ['eras', 'era3-range', '2019 – 2022'],
        ['eras', 'era4-label', 'الحقبة الرابعة'],
        ['eras', 'era4-subtitle', 'التوسع والتنويع'],
        ['eras', 'era4-range', '2023 – 2025'],

        // Timeline milestones
        ['timeline', 'milestone1-year', '2010'],
        ['timeline', 'milestone1-title', 'بدأت في امتلاك تصميم وتصنيع القوالب الخاصة'],
        ['timeline', 'milestone2-year', '2012'],
        ['timeline', 'milestone2-title', 'بدأت التصنيع المشترك للطبالي في الصين'],
        ['timeline', 'milestone3-year', '2013'],
        ['timeline', 'milestone3-title', 'تطوير الجيل الخامس من القوالب لطبالي البلاستيك الثقيلة المعززة بالفولاذ مع مركز البحث والتطوير في الإمارات'],
        ['timeline', 'milestone4-year', '2014'],
        ['timeline', 'milestone4-title', 'إطلاق إنتاج طبالي التصدير من نشارة الخشب في مصر'],
        ['timeline', 'milestone5-year', '2017'],
        ['timeline', 'milestone5-title', 'استبدال طبالي نشارة الخشب بطبالي التصدير البلاستيكية'],
        ['timeline', 'milestone6-year', '2018'],
        ['timeline', 'milestone6-title', 'بدء تصنيع الطبالي البلاستيكية في المغرب مع إضافة قوالب جديدة إلى المحفظة'],
        ['timeline', 'milestone7-year', '2019'],
        ['timeline', 'milestone7-title', 'بناء منشأة تصنيع جديدة بسبعة أضعاف الطاقة الإنتاجية ونقل المقر الرئيسي'],
        ['timeline', 'milestone8-year', '2021'],
        ['timeline', 'milestone8-title', 'الاستحواذ الكامل على أعمال بافت من قبل المهندس أحمد الحكيم'],
        ['timeline', 'milestone9-year', '2022'],
        ['timeline', 'milestone9-title', 'توسيع الطاقة الإنتاجية بنسبة 300% وإطلاق الطبالي المربعة'],
        ['timeline', 'milestone10-year', '2023'],
        ['timeline', 'milestone10-title', 'بدأت بافت في تقديم حلول التخزين المتكاملة والتوسع في المشاريع الحكومية'],
        ['timeline', 'milestone11-year', '2024'],
        ['timeline', 'milestone11-title', 'إطلاق NWMS، التوسع في المدارس الفنية، إطلاق Poly AL'],
        ['timeline', 'milestone12-year', '2025'],
        ['timeline', 'milestone12-title', 'تقديم طبالي البتروكيميائيات، توسيع خط إعادة التدوير وإنشاء معمل كامل'],

        // CTA
        ['cta', 'title', 'المسيرة مستمرة'],
        ['cta', 'description', 'انضم إلينا ونحن نشكل مستقبل حلول التعبئة الصناعية عبر منطقة الشرق الأوسط وشمال أفريقيا وما بعدها.'],
        ['cta', 'button1-text', 'كن شريكنا ←'],
        ['cta', 'button2-text', 'تعرف على بافت'],
    ];

    let updated = 0;
    for (const [section, key, valueAr] of translations) {
        const result = await ds.query(
            'UPDATE content SET valueAr = ? WHERE page = ? AND section = ? AND `key` = ?',
            [valueAr, 'our-journey', section, key]
        );
        if (result.affectedRows > 0) {
            updated++;
            console.log(`✅ our-journey/${section}/${key}`);
        } else {
            console.warn(`⚠️  NOT FOUND: our-journey/${section}/${key}`);
        }
    }

    console.log(`\n🏁 Our Journey Arabic seeding complete: ${updated}/${translations.length} rows updated.`);

    // Verify
    const sample = await ds.query('SELECT id, section, `key`, valueAr FROM content WHERE page = "our-journey" AND valueAr IS NOT NULL LIMIT 3');
    console.log('Sample:', JSON.stringify(sample, null, 2));

    await ds.destroy();
}

seedOurJourneyArabicContent().catch(e => { console.error('FAILED:', e.message); process.exit(1); });
