/**
 * Seeds Arabic content for Our Journey page using the API bulkUpdate endpoint.
 * This ensures TypeORM properly persists the valueAr column.
 */
async function seedViaApi() {
    // 1. Login to get JWT token
    const loginRes = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@paft.com', password: 'admin123' }),
    });
    if (!loginRes.ok) throw new Error('Login failed: ' + await loginRes.text());
    const { access_token } = await loginRes.json();
    console.log('✅ Logged in');

    // 2. Fetch current our-journey content to get IDs
    const contentRes = await fetch('http://localhost:3001/api/content/page/our-journey');
    if (!contentRes.ok) throw new Error('Fetch failed');
    const data = await contentRes.json();
    console.log('✅ Fetched our-journey content');

    // 3. Build translations map: section -> key -> arabic value
    const translations: Record<string, Record<string, string>> = {
        hero: {
            'badge-text': 'مسيرتنا',
            'title': 'بناء المستقبل',
            'description': 'أكثر من عقد من الابتكار والنمو والسعي الدؤوب للتميز في حلول التعبئة الصناعية.',
            'stat1-value': '+15',
            'stat1-label': 'سنوات ابتكار',
            'stat2-value': '12',
            'stat2-label': 'إنجازات رئيسية',
            'stat3-value': '4',
            'stat3-label': 'حقب نمو',
            'stat4-value': '%300',
            'stat4-label': 'نمو الطاقة الإنتاجية',
        },
        eras: {
            'era1-label': 'الحقبة الأولى',
            'era1-subtitle': 'التأسيس والبحث والتطوير',
            'era1-range': '2010 – 2013',
            'era2-label': 'الحقبة الثانية',
            'era2-subtitle': 'التوسع والابتكار',
            'era2-range': '2014 – 2018',
            'era3-label': 'الحقبة الثالثة',
            'era3-subtitle': 'النمو والاستحواذ',
            'era3-range': '2019 – 2022',
            'era4-label': 'الحقبة الرابعة',
            'era4-subtitle': 'التوسع والتنويع',
            'era4-range': '2023 – 2025',
        },
        timeline: {
            'milestone1-year': '2010',
            'milestone1-title': 'بدأت في امتلاك تصميم وتصنيع القوالب الخاصة',
            'milestone2-year': '2012',
            'milestone2-title': 'بدأت التصنيع المشترك للطبالي في الصين',
            'milestone3-year': '2013',
            'milestone3-title': 'تطوير الجيل الخامس من القوالب لطبالي البلاستيك الثقيلة المعززة بالفولاذ مع مركز البحث والتطوير في الإمارات',
            'milestone4-year': '2014',
            'milestone4-title': 'إطلاق إنتاج طبالي التصدير من نشارة الخشب في مصر',
            'milestone5-year': '2017',
            'milestone5-title': 'استبدال طبالي نشارة الخشب بطبالي التصدير البلاستيكية',
            'milestone6-year': '2018',
            'milestone6-title': 'بدء تصنيع الطبالي البلاستيكية في المغرب مع إضافة قوالب جديدة إلى المحفظة',
            'milestone7-year': '2019',
            'milestone7-title': 'بناء منشأة تصنيع جديدة بسبعة أضعاف الطاقة الإنتاجية ونقل المقر الرئيسي',
            'milestone8-year': '2021',
            'milestone8-title': 'الاستحواذ الكامل على أعمال بافت من قبل المهندس أحمد الحكيم',
            'milestone9-year': '2022',
            'milestone9-title': 'توسيع الطاقة الإنتاجية بنسبة 300% وإطلاق الطبالي المربعة',
            'milestone10-year': '2023',
            'milestone10-title': 'بدأت بافت في تقديم حلول التخزين المتكاملة والتوسع في المشاريع الحكومية',
            'milestone11-year': '2024',
            'milestone11-title': 'إطلاق NWMS، التوسع في المدارس الفنية، إطلاق Poly AL',
            'milestone12-year': '2025',
            'milestone12-title': 'تقديم طبالي البتروكيميائيات، توسيع خط إعادة التدوير وإنشاء معمل كامل',
        },
        cta: {
            'title': 'المسيرة مستمرة',
            'description': 'انضم إلينا ونحن نشكل مستقبل حلول التعبئة الصناعية عبر منطقة الشرق الأوسط وشمال أفريقيا وما بعدها.',
            'button1-text': 'كن شريكنا ←',
            'button2-text': 'تعرف على بافت',
        },
    };

    // 4. Build updates array
    const updates: { id: number; value: string; valueAr: string }[] = [];

    for (const [section, keys] of Object.entries(translations)) {
        for (const [key, valueAr] of Object.entries(keys)) {
            const item = data[section]?.[key];
            if (item) {
                updates.push({
                    id: item.id,
                    value: item.value, // keep English value unchanged
                    valueAr: valueAr,
                });
            } else {
                console.warn(`⚠️ Not found: ${section}/${key}`);
            }
        }
    }

    console.log(`📦 Prepared ${updates.length} updates`);

    // 5. Send bulk update
    const updateRes = await fetch('http://localhost:3001/api/content/bulk-update', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`,
        },
        body: JSON.stringify(updates),
    });

    if (!updateRes.ok) {
        const errText = await updateRes.text();
        throw new Error(`Bulk update failed (${updateRes.status}): ${errText}`);
    }

    const result = await updateRes.json();
    console.log(`✅ Bulk update complete:`, result);

    // 6. Verify
    const verifyRes = await fetch('http://localhost:3001/api/content/page/our-journey');
    const verifyData = await verifyRes.json();
    const sample = verifyData.hero?.['badge-text'];
    console.log(`\n🔍 Verify hero/badge-text:`, JSON.stringify(sample));
    const sample2 = verifyData.timeline?.['milestone1-title'];
    console.log(`🔍 Verify timeline/milestone1-title:`, JSON.stringify(sample2));
    const sample3 = verifyData.cta?.title;
    console.log(`🔍 Verify cta/title:`, JSON.stringify(sample3));
}

seedViaApi().catch(e => { console.error('❌ FAILED:', e.message); process.exit(1); });
