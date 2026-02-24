/**
 * Seeds Arabic content for Plastic Pallets page - Plain JS version (run with: node src/seeds/seed-plastic-pallets-arabic.js)
 */
const http = require('http');

function httpRequest(options, body) {
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try { resolve({ status: res.statusCode, data: JSON.parse(data) }); }
                catch { resolve({ status: res.statusCode, data }); }
            });
        });
        req.on('error', reject);
        if (body) req.write(JSON.stringify(body));
        req.end();
    });
}

async function seedViaApi() {
    // 1. Login
    const loginRes = await httpRequest({
        hostname: 'localhost', port: 3001, path: '/api/auth/login',
        method: 'POST', headers: { 'Content-Type': 'application/json' }
    }, { email: 'admin@paft.com', password: 'admin123' });
    
    if (loginRes.status !== 201 && loginRes.status !== 200) throw new Error('Login failed');
    const token = loginRes.data.access_token;
    console.log('✅ Logged in');

    // 2. Fetch content
    const contentRes = await httpRequest({
        hostname: 'localhost', port: 3001, path: '/api/content/page/plastic-pallets',
        method: 'GET'
    });
    const data = contentRes.data;
    console.log('✅ Fetched plastic-pallets. Sections:', Object.keys(data));

    // 3. ALL translations from index.html
    const translations = {
        // === Page Sections ===
        'heavy-duty-hero': {
            'heavy-duty-title': 'باليتات',
            'heavy-duty-highlight': 'ثقيلة التحمل',
            'heavy-duty-description': 'باليتات PAFT للخدمة الشاقة مصممة لتقديم أعلى قيمة مقابل المال في منطقة الشرق الأوسط وشمال أفريقيا، وتوفر متانة استثنائية مع أقل معدلات كسر سنوية. مصنوعة من مواد مركبة بكر عالية الجودة ومعززة بقضبان معدنية. هذه الباليتات لها عمر افتراضي يزيد عن 10 سنوات وتأتي مع ضمان تصنيع لمدة 5 سنوات. يمكن لباليتات PAFT تحمل أحمال رفوف استثنائية تصل إلى 2 طن مع أقصى انحراف 15 ملم.',
        },
        'info-cards': {
            'design-title': 'التصميم',
            'design-content': 'الأفضل للاستخدام في نظام الرفوف • يمكن تعزيزها بما يصل إلى 10 قضبان معدنية وبسماكة تصل إلى 2.0 ملم • متوافقة مع RFID لتتبع الباليتات والتي يمكن دمجها مع أي نظام إدارة مستودعات • دخول حر للباليتة اليدوية • موانع انزلاق للمنتج والرافعات الشوكية والباليتة نفسها • سطح علوي وسفلي مثقب لسهولة التنظيف ودوران التخزين البارد • شعارات العملاء محفورة على جانبي الباليتة • حل تتبع كامل متاح مع الباليتات.',
            'material-title': 'المواد',
            'material-content': 'يمكن إنتاجها بـ 6 تركيبات مختلفة مع HDPE/ PP • مادة مركبة عالية التأثير • مادة بكر • مواد معاد تدويرها جزئياً بالإضافة إلى إضافات تحسين - اختياري • إضافات مطاط ومقاومة الأشعة فوق البنفسجية - اختياري • قضبان تعزيز فولاذية مطلية بمقاوم الكهرباء الساكنة • مواد وإضافات معتمدة لدرجة الطعام • تصميم صحي معتمد.',
        },
        'video': {
            'title': 'اختبار',
            'highlight': 'المنتج',
            'description': 'شاهد اختبارات الجودة الصارمة أثناء العمل',
        },
        'light-duty-hero': {
            'title': 'باليتات',
            'highlight': 'خفيفة التحمل',
            'description': 'عدة باليتات تبدأ من 7 كيلو/باليتة نماذج جديدة بوزن أثقل يمكنها تحمل حتى 1.5 طن. جانب آخر من تركيزنا على الابتكار ذو القيمة مقابل المال هو باليتات التصدير الخفيفة الوزن، نحن نقدم عدة نماذج تبدأ بوزن منخفض جداً 7.0 كيلو للباليتة الواحدة. مصنوعة من البلاستيك المعاد تدويره وهي مثالية للتطبيقات أحادية الاستخدام. على عكس الباليتات الخشبية، هذه لا تتطلب معالجات خاصة، وتلبي جميع المعايير الصحية والبيئية. مقاومة للماء وبأسعار تنافسية تبدأ من 8 دولار أمريكي فقط/قطعة، وهي مثالية للصناعات ذات الأحمال الديناميكية حتى 1.5 طن.',
        },
        'light-duty-info': {
            'feature1': '100% مواد معاد تدويرها',
            'feature2': 'دخول من 4 جهات',
            'feature3': 'مقاوم للانزلاق',
            'feature4': 'معتمد SPM 15',
            'feature5': 'بدون مسامير، لا ضرر للمنتج',
            'feature6': 'نظام الرفوف غير متاح',
        },
        'rental-hero': {
            'title': 'باليتات',
            'highlight': 'الإيجار',
            'description': 'تقدم PAFT نهجاً مبتكراً وفريداً لتخزين المنتجات عبر خدمة الإيجار المرنة المصممة خصيصاً لتلبية الاحتياجات المحددة لكل عميل، مما يتيح لك تحويل تكاليف الباليتات من CAPEX إلى OPEX. تشمل خيارات الإيجار لدينا الحماية من سوء الاستخدام والإساءة ويمكن ترتيبها لفترات قصيرة وطويلة المدى، مما يوفر حلاً فعالاً من حيث التكلفة دون الحاجة لاستثمار رأسمالي.',
        },
        'cta': {
            'title': 'هل تحتاج',
            'highlight': 'حلول مخصصة؟',
            'description': 'يمكننا تصنيع باليتات وفقاً لمتطلباتك الخاصة',
            'button1-text': 'اطلب عرض سعر ←',
            'button2-text': 'تواصل مع فريقنا',
        },

        // === Product Spec Labels ===
        'product-specs': {
            'dimensions-label': 'الأبعاد',
            'design-label': 'تصميم الباليتة',
            'weight-label': 'وزن الباليتة',
            'static-load-label': 'الحمولة الثابتة',
            'dynamic-load-label': 'الحمولة الديناميكية',
            'rack-load-label': 'حمولة الرف',
            'expected-life-label': 'العمر الافتراضي المتوقع',
        },

        // === Heavy Duty Products ===
        'product-m1': {
            'product-m1-product-name': 'باليتة M1 ثقيلة التحمل',
            'product-m1-dimensions': '1000 × 1200 × 150 ملم',
            'product-m1-design': '3 SKID',
            'product-m1-static-load': 'حتى 10.0 طن',
            'product-m1-dynamic-load': 'حتى 4.0 طن',
            'product-m1-rack-load': 'حتى 1.75 طن',
            'product-m1-expected-life': 'حتى 10 سنوات',
        },
        'product-m2': {
            'product-m2-product-name': 'باليتة M2 ثقيلة التحمل',
            'product-m2-dimensions': '1100 × 1300 × 150 ملم',
            'product-m2-design': '3 SKID',
            'product-m2-static-load': 'حتى 8.0 طن',
            'product-m2-dynamic-load': 'حتى 3.0 طن',
            'product-m2-rack-load': 'حتى 2 طن',
            'product-m2-expected-life': 'حتى 10 سنوات',
        },
        'product-m4': {
            'product-m4-product-name': 'باليتة M4 ثقيلة التحمل',
            'product-m4-dimensions': '1000 × 1200 × 150 ملم',
            'product-m4-design': 'وجه مزدوج',
            'product-m4-static-load': 'حتى 6.0 طن',
            'product-m4-dynamic-load': 'حتى 2.5 طن',
            'product-m4-rack-load': 'حتى 1.5 طن',
            'product-m4-expected-life': 'حتى 10 سنوات',
        },
        'product-m5': {
            'product-m5-product-name': 'باليتة M5 ثقيلة التحمل',
            'product-m5-dimensions': '800 × 1200 × 150 ملم',
            'product-m5-design': '3 SKID',
            'product-m5-static-load': 'حتى 8.0 طن',
            'product-m5-dynamic-load': 'حتى 3 طن',
            'product-m5-rack-load': 'حتى 1.75 طن',
            'product-m5-expected-life': 'حتى 10 سنوات',
        },
        'product-m6': {
            'product-m6-product-name': 'باليتة M6 ثقيلة التحمل',
            'product-m6-dimensions': '1000 × 1200 × 150 ملم',
            'product-m6-design': '3 SKID',
            'product-m6-static-load': 'حتى 10.0 طن',
            'product-m6-dynamic-load': 'حتى 4.0 طن',
            'product-m6-rack-load': 'حتى 2.0 طن',
            'product-m6-expected-life': 'حتى 10 سنوات',
        },
        'product-m7': {
            'product-m7-product-name': 'باليتة M7 ثقيلة التحمل',
            'product-m7-dimensions': '1200 × 1200 × 150 ملم',
            'product-m7-design': '3 SKID',
            'product-m7-static-load': 'حتى 10.0 طن',
            'product-m7-dynamic-load': 'حتى 4.0 طن',
            'product-m7-rack-load': 'حتى 2.0 طن',
            'product-m7-expected-life': 'حتى 10 سنوات',
        },
        'product-m8': {
            'product-m8-product-name': 'باليتة M8 ثقيلة التحمل',
            'product-m8-dimensions': '1140 × 1140 × 150 ملم',
            'product-m8-design': '3 SKID',
            'product-m8-static-load': 'حتى 10.0 طن',
            'product-m8-dynamic-load': 'حتى 4.0 طن',
            'product-m8-rack-load': 'حتى 2 طن',
            'product-m8-expected-life': 'حتى 10 سنوات',
        },
        'product-m9': {
            'product-m9-product-name': 'باليتة M9 ثقيلة التحمل',
            'product-m9-dimensions': '1100 × 1100 × 150 ملم',
            'product-m9-design': '3 SKID',
            'product-m9-static-load': 'حتى 10.0 طن',
            'product-m9-dynamic-load': 'حتى 4.0 طن',
            'product-m9-rack-load': 'حتى 2 طن',
            'product-m9-expected-life': 'حتى 10 سنوات',
        },

        // === Light Duty Products ===
        'product-double-deck': {
            'product-double-deck-product-name': 'وجه مزدوج',
            'product-double-deck-dimensions': '1000 × 1200 × 130 ملم',
            'product-double-deck-design': 'وجه مزدوج',
            'product-double-deck-weight': '7.2 كيلو',
            'product-double-deck-static-load': '1 طن',
            'product-double-deck-dynamic-load': '1 طن',
            'product-double-deck-rack-load': 'غير قابلة للرف',
            'product-double-deck-expected-life': 'درجة تصدير',
        },
        'product-9-leg': {
            'product-9-leg-product-name': '9 أرجل',
            'product-9-leg-dimensions': '1000 × 1200 × 140 ملم',
            'product-9-leg-design': '9-أرجل',
            'product-9-leg-weight': '5.5 كيلو',
            'product-9-leg-static-load': '0.75 طن',
            'product-9-leg-dynamic-load': '0.75 طن',
            'product-9-leg-rack-load': 'غير قابلة للرف',
            'product-9-leg-expected-life': 'درجة تصدير',
        },

        // === Rental Product ===
        'product-rental': {
            'product-rental-product-name': 'باليتة الإيجار',
            'product-rental-dimensions': '1000 × 1200 × 150 ملم',
            'product-rental-design': 'ثقيلة التحمل',
            'product-rental-static-load': 'حتى 10.0 طن',
            'product-rental-dynamic-load': 'حتى 4.0 طن',
            'product-rental-rack-load': 'حتى 2.0 طن',
            'product-rental-expected-life': '+10 سنوات',
        },
    };

    // 4. Build updates
    const updates = [];
    for (const [section, keys] of Object.entries(translations)) {
        for (const [key, valueAr] of Object.entries(keys)) {
            const item = data[section] && data[section][key];
            if (item) {
                updates.push({ id: item.id, value: item.value, valueAr });
            } else {
                console.warn('⚠️ Not found:', section + '/' + key);
            }
        }
    }
    console.log('📦 Prepared', updates.length, 'updates');

    // 5. Send bulk update
    const updateRes = await httpRequest({
        hostname: 'localhost', port: 3001, path: '/api/content/bulk-update',
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
    }, updates);

    if (updateRes.status !== 200) throw new Error('Bulk update failed: ' + JSON.stringify(updateRes.data));
    console.log('✅ Bulk update complete:', updateRes.data.length, 'items updated');

    // 6. Verify
    const verifyRes = await httpRequest({
        hostname: 'localhost', port: 3001, path: '/api/content/page/plastic-pallets',
        method: 'GET'
    });
    const v = verifyRes.data;
    console.log('\n🔍 Verification:');
    console.log('  heavy-duty-title:', v['heavy-duty-hero'] && v['heavy-duty-hero']['heavy-duty-title'] && v['heavy-duty-hero']['heavy-duty-title'].valueAr);
    console.log('  M1 name:', v['product-m1'] && v['product-m1']['product-m1-product-name'] && v['product-m1']['product-m1-product-name'].valueAr);
    console.log('  M4 design:', v['product-m4'] && v['product-m4']['product-m4-design'] && v['product-m4']['product-m4-design'].valueAr);
    console.log('  Double Deck:', v['product-double-deck'] && v['product-double-deck']['product-double-deck-product-name'] && v['product-double-deck']['product-double-deck-product-name'].valueAr);
    console.log('  9-Leg:', v['product-9-leg'] && v['product-9-leg']['product-9-leg-product-name'] && v['product-9-leg']['product-9-leg-product-name'].valueAr);
    console.log('  Rental:', v['product-rental'] && v['product-rental']['product-rental-product-name'] && v['product-rental']['product-rental-product-name'].valueAr);
    console.log('  Specs label:', v['product-specs'] && v['product-specs']['dimensions-label'] && v['product-specs']['dimensions-label'].valueAr);
}

seedViaApi().catch(e => { console.error('❌ FAILED:', e.message); process.exit(1); });
