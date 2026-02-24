/**
 * Seeds Arabic content for Plastic Pallets page using the API bulkUpdate endpoint.
 * Arabic translations sourced from index.html
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

    // 2. Fetch current plastic-pallets content to get IDs
    const contentRes = await fetch('http://localhost:3001/api/content/page/plastic-pallets');
    if (!contentRes.ok) throw new Error('Fetch failed');
    const data = await contentRes.json();
    console.log('✅ Fetched plastic-pallets content');
    console.log('Sections found:', Object.keys(data));

    // 3. Build translations map: section -> key -> arabic value (from index.html)
    const translations: Record<string, Record<string, string>> = {
        'heavy-duty-hero': {
            'heavy-duty-title': 'باليتات',
            'heavy-duty-highlight': 'ثقيلة التحمل',
            'heavy-duty-description': 'باليتات PAFT للخدمة الشاقة مصممة لتقديم أعلى قيمة مقابل المال في منطقة الشرق الأوسط وشمال أفريقيا، وتوفر متانة استثنائية مع أقل معدلات كسر سنوية. مصنوعة من مواد مركبة بكر عالية الجودة ومعززة بقضبان معدنية. هذه الباليتات لها عمر افتراضي يزيد عن 10 سنوات وتأتي مع ضمان تصنيع لمدة 5 سنوات.',
        },
        'info-cards': {
            'design-title': 'التصميم',
            'design-content': 'الأفضل للاستخدام في نظام الرفوف • يمكن تعزيزها بما يصل إلى 10 قضبان معدنية وبسماكة تصل إلى 2.0 ملم • متوافقة مع RFID لتتبع الباليتات والتي يمكن دمجها مع أي نظام إدارة مستودعات • دخول حر للباليتة اليدوية • موانع انزلاق للمنتج والرافعات الشوكية والباليتة نفسها • سطح علوي وسفلي مثقب لسهولة التنظيف ودوران التخزين البارد • شعارات العملاء محفورة على جانبي الباليتة • حل تتبع كامل متاح مع الباليتات.',
            'material-title': 'المواد',
            'material-content': 'يمكن إنتاجها بـ 6 تركيبات مختلفة مع HDPE/ PP • مادة مركبة عالية التأثير • مادة بكر • مواد معاد تدويرها جزئياً بالإضافة إلى إضافات تحسين - اختياري • إضافات مطاط ومقاومة الأشعة فوق البنفسجية - اختياري • قضبان تعزيز فولاذية مطلية بمقاوم الكهرباء الساكنة • مواد وإضافات معتمدة لدرجة الطعام • تصميم صحي معتمد.',
        },
        'light-duty-features': {
            'feature1': '100% مواد معاد تدويرها',
            'feature2': 'فعال من حيث التكلفة', 
            'feature3': 'معايير صحية',
            'feature4': 'مقاوم للماء',
            'feature5': 'صديق للبيئة',
            'feature6': 'درجة تصدير',
        },
        'light-duty-hero': {
            'light-duty-title': 'باليتات',
            'light-duty-highlight': 'خفيفة التحمل',
            'light-duty-description': 'عدة باليتات تبدأ من 7 كيلو/باليتة. مصنوعة من البلاستيك المعاد تدويره، مثالية للتطبيقات أحادية الاستخدام. على عكس الباليتات الخشبية، هذه لا تتطلب معالجات خاصة، وتلبي جميع المعايير الصحية والبيئية. مقاومة للماء وبأسعار تنافسية تبدأ من 8 دولار أمريكي فقط/قطعة.',
        },
        'rental-hero': {
            'rental-title': 'باليتات',
            'rental-highlight': 'الإيجار',
            'rental-description': 'تقدم PAFT نهجاً مبتكراً وفريداً لخدمات تأجير الباليتات في مصر ومنطقة الشرق الأوسط وشمال أفريقيا. يوفر برنامج الإيجار لدينا للشركات إمكانية الوصول إلى باليتات بلاستيكية عالية الجودة دون الاستثمار المقدم، مع شروط مرنة ودعم صيانة شامل.',
        },
        'cta': {
            'cta-title': 'هل تحتاج',
            'cta-highlight': 'حلول مخصصة؟',
            'cta-description': 'يمكننا تصنيع باليتات وفقاً لمتطلباتك الخاصة',
            'cta-button1-text': 'اطلب عرض سعر ←',
            'cta-button2-text': 'تواصل مع فريقنا',
        },
        'product-specs': {
            'dimensions-label': 'الأبعاد',
            'design-label': 'تصميم الباليتة',
            'weight-label': 'وزن الباليتة',
            'static-load-label': 'الحمولة الثابتة',
            'dynamic-load-label': 'الحمولة الديناميكية',
            'rack-load-label': 'حمولة الرف',
            'expected-life-label': 'العمر الافتراضي المتوقع',
        },
        'product-m1': {
            'product-name': 'باليتة M1 ثقيلة التحمل',
            'dimensions': '1000 × 1200 × 150 ملم',
            'design': '3 SKID',
            'static-load': 'حتى 10.0 طن',
            'dynamic-load': 'حتى 4.0 طن',
            'rack-load': 'حتى 1.75 طن',
            'expected-life': 'حتى 10 سنوات',
        },
        'product-m2': {
            'product-name': 'باليتة M2 ثقيلة التحمل',
            'dimensions': '1100 × 1300 × 150 ملم',
            'design': '3 SKID',
            'static-load': 'حتى 8.0 طن',
            'dynamic-load': 'حتى 3.0 طن',
            'rack-load': 'حتى 2 طن',
            'expected-life': 'حتى 10 سنوات',
        },
        'product-m4': {
            'product-name': 'باليتة M4 ثقيلة التحمل',
            'dimensions': '1000 × 1200 × 150 ملم',
            'design': 'وجه مزدوج',
            'static-load': 'حتى 6.0 طن',
            'dynamic-load': 'حتى 2.5 طن',
            'rack-load': 'حتى 1.5 طن',
            'expected-life': 'حتى 10 سنوات',
        },
        'product-m5': {
            'product-name': 'باليتة M5 ثقيلة التحمل',
            'dimensions': '800 × 1200 × 150 ملم',
            'design': '3 SKID',
            'static-load': 'حتى 8.0 طن',
            'dynamic-load': 'حتى 3 طن',
            'rack-load': 'حتى 1.75 طن',
            'expected-life': 'حتى 10 سنوات',
        },
        'product-m6': {
            'product-name': 'باليتة M6 ثقيلة التحمل',
            'dimensions': '1000 × 1200 × 150 ملم',
            'design': '3 SKID',
            'static-load': 'حتى 10.0 طن',
            'dynamic-load': 'حتى 4.0 طن',
            'rack-load': 'حتى 2.0 طن',
            'expected-life': 'حتى 10 سنوات',
        },
        'product-m7': {
            'product-name': 'باليتة M7 ثقيلة التحمل',
            'dimensions': '1200 × 1200 × 150 ملم',
            'design': '3 SKID',
            'static-load': 'حتى 10.0 طن',
            'dynamic-load': 'حتى 4.0 طن',
            'rack-load': 'حتى 2.0 طن',
            'expected-life': 'حتى 10 سنوات',
        },
        'product-m8': {
            'product-name': 'باليتة M8 ثقيلة التحمل',
            'dimensions': '1140 × 1140 × 150 ملم',
            'design': '3 SKID',
            'static-load': 'حتى 10.0 طن',
            'dynamic-load': 'حتى 4.0 طن',
            'rack-load': 'حتى 2 طن',
            'expected-life': 'حتى 10 سنوات',
        },
        'product-m9': {
            'product-name': 'باليتة M9 ثقيلة التحمل',
            'dimensions': '1100 × 1100 × 150 ملم',
            'design': '3 SKID',
            'static-load': 'حتى 10.0 طن',
            'dynamic-load': 'حتى 4.0 طن',
            'rack-load': 'حتى 2 طن',
            'expected-life': 'حتى 10 سنوات',
        },
        'product-double-deck': {
            'product-name': 'وجه مزدوج',
            'dimensions': '1000 × 1200 × 130 ملم',
            'design': 'وجه مزدوج',
            'weight': '7.2 كيلو',
            'static-load': '1 طن',
            'dynamic-load': '1 طن',
            'rack-load': 'غير قابلة للرف',
            'expected-life': 'درجة تصدير',
        },
        'product-9-leg': {
            'product-name': '9 أرجل',
            'dimensions': '1000 × 1200 × 140 ملم',
            'design': '9-أرجل',
            'weight': '5.5 كيلو',
            'static-load': '0.75 طن',
            'dynamic-load': '0.75 طن',
            'rack-load': 'غير قابلة للرف',
            'expected-life': 'درجة تصدير',
        },
        'product-rental': {
            'product-name': 'باليتة الإيجار',
            'dimensions': '1000 × 1200 × 150 ملم',
            'design': 'ثقيلة التحمل',
            'static-load': 'حتى 10.0 طن',
            'dynamic-load': 'حتى 4.0 طن',
            'rack-load': 'حتى 2.0 طن',
            'expected-life': '+10 سنوات',
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
                    value: item.value,
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
    console.log(`✅ Bulk update complete: ${result.length} items updated`);

    // 6. Verify samples
    const verifyRes = await fetch('http://localhost:3001/api/content/page/plastic-pallets');
    const verifyData = await verifyRes.json();

    console.log('\n🔍 Verification samples:');
    console.log('  heavy-duty-hero/heavy-duty-title:', JSON.stringify(verifyData['heavy-duty-hero']?.['heavy-duty-title']));
    console.log('  product-m1/product-name:', JSON.stringify(verifyData['product-m1']?.['product-name']));
    console.log('  product-m4/design:', JSON.stringify(verifyData['product-m4']?.['design']));
    console.log('  product-double-deck/product-name:', JSON.stringify(verifyData['product-double-deck']?.['product-name']));
    console.log('  product-9-leg/product-name:', JSON.stringify(verifyData['product-9-leg']?.['product-name']));
    console.log('  product-rental/product-name:', JSON.stringify(verifyData['product-rental']?.['product-name']));
    console.log('  product-specs/dimensions-label:', JSON.stringify(verifyData['product-specs']?.['dimensions-label']));
    console.log('  cta/cta-title:', JSON.stringify(verifyData['cta']?.['cta-title']));
}

seedViaApi().catch(e => { console.error('❌ FAILED:', e.message); process.exit(1); });