/**
 * Seeds Arabic content for Raw Materials page using the API bulkUpdate endpoint.
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

    // 2. Fetch current raw-materials content to get IDs
    const contentRes = await fetch('http://localhost:3001/api/content/page/raw-materials');
    if (!contentRes.ok) throw new Error('Fetch failed');
    const data = await contentRes.json();
    console.log('✅ Fetched raw-materials content');
    console.log('📋 Available sections:', Object.keys(data));

    // 3. Build translations map: section -> key -> arabic value
    const translations: Record<string, Record<string, string>> = {
        'hero': {
            'badge-text': 'توريد المواد الخام',
            'title': 'مواد مستدامة',
            'description': 'التزامنا بالاستدامة يدفع الابتكار في تقنية البوليمرات. نطور مواد متقدمة تقلل الأثر البيئي مع تقديم أداء فائق. استكشف مجموعة منتجاتنا الصديقة للبيئة المصممة لمستقبل أخضر.',
            'stat-1-value': '5',
            'stat-1-label': 'درجات المواد',
            'stat-2-value': '100%',
            'stat-2-label': 'قابل لإعادة التدوير',
            'stat-3-value': 'HDPE',
            'stat-3-label': 'قاعدة البوليمر',
            'stat-4-value': 'ISO',
            'stat-4-label': 'معتمد',
            'materials-section-title': 'موادنا',
            'materials-section-subtitle': 'اكتشف مجموعتنا من حلول البوليمر المستدامة',
            'datasheets-section-title': 'أوراق بيانات المنتج',
            'datasheets-section-subtitle': 'استكشف مجموعتنا الشاملة من مواد البوليمر المستدامة',
        },
        'material-1': {
            'title': 'HDPE المعاد تدويره - درجة عادية',
            'polymer': 'بولي إيثيلين عالي الكثافة معاد تدويره',
            'source': 'زجاجات، حاويات، خردة صناعية',
            'color': 'أبيض، أسود أو ملون',
            'additives': 'مثبتات، أصباغ، مضادات أكسدة',
        },
        'material-2': {
            'title': 'HDPE المعاد تدويره - معدل تدفق متوسط',
            'polymer': 'بولي إيثيلين عالي الكثافة معاد تدويره',
            'source': 'زجاجات، حاويات، خردة صناعية',
            'color': 'أبيض، أسود أو ملون',
            'additives': 'مثبتات، أصباغ، مضادات أكسدة',
        },
        'material-3': {
            'title': 'HDPE المعاد تدويره - معدل تدفق عالي',
            'polymer': 'بولي إيثيلين عالي الكثافة معاد تدويره',
            'source': 'زجاجات، حاويات، خردة صناعية',
            'color': 'أبيض، أسود أو ملون',
            'additives': 'مثبتات، أصباغ، مضادات أكسدة',
        },
        'material-4': {
            'title': 'HDPE المعاد تدويره - أداء عالي',
            'polymer': 'بولي إيثيلين عالي الكثافة معاد تدويره',
            'source': 'زجاجات، حاويات، خردة صناعية',
            'color': 'أبيض، أسود أو ملون',
            'additives': 'مثبتات، أصباغ، مضادات أكسدة',
        },
        'material-5': {
            'title': 'HDPE المعاد تدويره - أداء متوسط',
            'polymer': 'بولي إيثيلين عالي الكثافة معاد تدويره',
            'source': 'زجاجات، حاويات، خردة صناعية',
            'color': 'أبيض، أسود أو ملون',
            'additives': 'مثبتات، أصباغ، مضادات أكسدة',
        },
        'sheet-1': {
            'title': 'HDPE المعاد تدويره - درجة عادية',
            'subtitle': 'أداء قياسي',
            'badges': 'قولبة بالحقن, صلابة عالية, قابل لإعادة التدوير',
            'description': 'HDPE المعاد تدويره - الدرجة العادية يوفر أداءً قياسيًا موثوقًا للتطبيقات ذات الأغراض العامة. يوفر هذا البولي إيثيلين عالي الكثافة المعاد تدويره خصائص ميكانيكية جيدة ومقاومة كيميائية وقابلية للمعالجة بسعر اقتصادي. مناسب لمجموعة واسعة من تطبيقات القولبة بالحقن بما في ذلك الصناديق والحاويات والأدوات المنزلية والمكونات الصناعية.',
        },
        'sheet-2': {
            'title': 'HDPE المعاد تدويره - أداء متوسط',
            'subtitle': 'تأثير محسّن',
            'badges': 'قولبة بالنفخ, مقاوم للتشقق, قابل لإعادة التدوير 100%',
            'description': 'HDPE المعاد تدويره - الأداء المتوسط هو درجة متوسطة الأداء توفر مقاومة محسّنة للصدمات وخصائص ميكانيكية محسّنة مقارنة بالدرجة العادية. تجمع هذه التركيبة المتوازنة بين الصلابة الجيدة والمتانة الفائقة، مما يجعلها مناسبة للتطبيقات الصعبة.',
        },
        'sheet-3': {
            'title': 'HDPE المعاد تدويره - أداء عالي',
            'subtitle': 'أقصى متانة',
            'badges': 'أنابيب الضغط, متانة طويلة الأمد, مثبت ضد الأشعة فوق البنفسجية',
            'description': 'HDPE المعاد تدويره - الأداء العالي يوفر أقصى متانة وهو أعلى درجة أداء في محفظة HDPE المعاد تدويرها لدينا. توفر هذه الدرجة المتميزة خصائص ميكانيكية استثنائية ومقاومة فائقة للتشقق الإجهادي ومتانة ممتازة للتطبيقات الأكثر تطلبًا.',
        },
        'sheet-4': {
            'title': 'HDPE المعاد تدويره - معدل تدفق متوسط',
            'subtitle': 'معالجة متوازنة',
            'badges': 'أغراض عامة, تشطيب ممتاز, قابل لإعادة التدوير',
            'description': 'HDPE المعاد تدويره - معدل التدفق المتوسط يتميز بخصائص معالجة متوازنة لتطبيقات القولبة بالحقن والبثق. توفر هذه الدرجة خصائص تدفق ممتازة مع الحفاظ على قوة ميكانيكية جيدة واستقرار الأبعاد.',
        },
        'sheet-5': {
            'title': 'HDPE المعاد تدويره - معدل تدفق عالي',
            'subtitle': 'أوقات دورة سريعة',
            'badges': 'قولبة الجدران الرقيقة, إنتاج عالي, مثبت ضد الأشعة فوق البنفسجية',
            'description': 'HDPE المعاد تدويره - معدل التدفق العالي مصمم لتطبيقات وقت الدورة السريع وقولبة الجدران الرقيقة. توفر هذه المادة سريعة التدفق قابلية معالجة ممتازة مع ملء سريع للقالب وأوقات تبريد قصيرة.',
        },
        'cta': {
            'cta-title': 'هل تحتاج مواد مخصصة؟',
            'cta-description': 'اتصل بفريق المواد لدينا للحصول على تركيبات بوليمر مخصصة ودعم فني',
            'button-sample': 'اطلب عينة ←',
            'button-contact': 'تواصل مع المبيعات',
        },
    };

    // Also try section-titles as a separate section (some DBs store them there)
    const sectionTitlesFallback: Record<string, Record<string, string>> = {
        'section-titles': {
            'materials-section-title': 'موادنا',
            'materials-section-subtitle': 'اكتشف مجموعتنا من حلول البوليمر المستدامة',
            'datasheets-section-title': 'أوراق بيانات المنتج',
            'datasheets-section-subtitle': 'استكشف مجموعتنا الشاملة من مواد البوليمر المستدامة',
        },
    };

    // 4. Build updates array
    const updates: { id: number; value: string; valueAr: string }[] = [];

    // Process main translations
    for (const [section, keys] of Object.entries(translations)) {
        for (const [key, valueAr] of Object.entries(keys)) {
            const item = data[section]?.[key];
            if (item) {
                updates.push({
                    id: item.id,
                    value: item.value,
                    valueAr: valueAr,
                });
                console.log(`✅ Found: ${section}/${key} (id: ${item.id})`);
            } else {
                console.warn(`⚠️ Not found: ${section}/${key}`);
            }
        }
    }

    // Process fallback section-titles
    for (const [section, keys] of Object.entries(sectionTitlesFallback)) {
        for (const [key, valueAr] of Object.entries(keys)) {
            const item = data[section]?.[key];
            if (item) {
                // Check if we already have this id in updates
                const exists = updates.some(u => u.id === item.id);
                if (!exists) {
                    updates.push({
                        id: item.id,
                        value: item.value,
                        valueAr: valueAr,
                    });
                    console.log(`✅ Found (fallback): ${section}/${key} (id: ${item.id})`);
                }
            }
        }
    }

    console.log(`\n📦 Prepared ${updates.length} updates`);

    if (updates.length === 0) {
        console.log('❌ No updates to apply. Check the section/key structure.');
        return;
    }

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
    console.log(`✅ Bulk update complete: ${result.length} items updated`);

    // 6. Verify
    const verifyRes = await fetch('http://localhost:3001/api/content/page/raw-materials');
    const verifyData = await verifyRes.json();

    // Verify some key items
    const checks = [
        { section: 'hero', key: 'materials-section-subtitle' },
        { section: 'hero', key: 'datasheets-section-subtitle' },
        { section: 'material-1', key: 'title' },
        { section: 'sheet-1', key: 'title' },
    ];

    for (const { section, key } of checks) {
        const item = verifyData[section]?.[key];
        if (item) {
            console.log(`🔍 ${section}/${key}: value="${item.value?.substring(0, 40)}..." valueAr="${item.valueAr?.substring(0, 40)}..."`);
        } else {
            // Try section-titles fallback
            const fallback = verifyData['section-titles']?.[key];
            if (fallback) {
                console.log(`🔍 section-titles/${key}: value="${fallback.value?.substring(0, 40)}..." valueAr="${fallback.valueAr?.substring(0, 40)}..."`);
            } else {
                console.log(`⚠️ ${section}/${key}: not found for verification`);
            }
        }
    }
}

seedViaApi().catch(e => { console.error('❌ FAILED:', e.message); process.exit(1); });
