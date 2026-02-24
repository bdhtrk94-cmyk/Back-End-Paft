/**
 * Seeds Arabic content for Transport Logistics page - Plain JS (run with: node src/seeds/seed-transport-logistics-arabic.js)
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
        hostname: 'localhost', port: 3001, path: '/api/content/page/transport-logistics',
        method: 'GET'
    });
    const data = contentRes.data;
    console.log('✅ Fetched transport-logistics. Sections:', Object.keys(data));

    // 3. ALL translations
    const translations = {
        // === Hero Section ===
        'hero': {
            'badge-text': 'مجموعة منتجات PAFT',
            'title': 'مواد النقل واللوجستيات',
            'description': 'حاويات IBC القابلة للطي المبتكرة، صناديق بلاستيكية قابلة لإعادة الاستخدام، فواصل الألواح، وحوامل الجالون — مصممة لسلاسل التوريد الحديثة بأقصى كفاءة واستدامة.',
        },

        // === Products Section Header ===
        'products': {
            'section-title': 'كتالوج المنتجات',
            'section-subtitle': 'حاويات IBC قابلة للطي · صناديق RPC · إكسسوارات',
        },

        // === Product 1: Foldable IBC ===
        'product-1': {
            'title': 'حاوية IBC قابلة للطي - 1000 لتر',
            'spec-headers': 'أنواع الشاحنات,مقطورة قياسية 2.6 متر,قطار طريق ضخم 3 متر',
            'spec-row-1': 'IC 1040,208,270',
            'spec-row-2': 'IBC قياسي صناعي,130,180',
            'spec-row-3': 'معدل التحسين,60% أكثر,50% أكثر',
            'price-label': 'عند الاتصال',
        },

        // === Product 2: RPC 6419 ===
        'product-2': {
            'title': 'RPC 6419',
            'subtitle': '600×400×195 ملم',
            'spec-row-1': 'البعد الخارجي,600*400*195 ملم',
            'spec-row-2': 'البعد الداخلي,576*376*180 ملم',
            'spec-row-3': 'الوزن الفارغ,1.8 كجم',
            'spec-row-4': 'السعة,39 لتر',
            'spec-row-5': 'حمولة الوحدة,20 كجم',
            'price-label': 'عند الاتصال',
        },

        // === Product 3: RPC 6422 ===
        'product-3': {
            'title': 'RPC 6422',
            'subtitle': '600×400×225 ملم',
            'spec-row-1': 'البعد الخارجي,600*400*225 ملم',
            'spec-row-2': 'البعد الداخلي,576*376*212 ملم',
            'spec-row-3': 'الوزن الفارغ,2.0 كجم',
            'spec-row-4': 'السعة,47 لتر',
            'spec-row-5': 'حمولة الوحدة,22 كجم',
            'price-label': 'عند الاتصال',
        },

        // === Product 4: RPC 6430 ===
        'product-4': {
            'title': 'RPC 6430',
            'subtitle': '600×400×300 ملم',
            'spec-row-1': 'البعد الخارجي,600*400*300 ملم',
            'spec-row-2': 'البعد الداخلي,576*376*291 ملم',
            'spec-row-3': 'الوزن الفارغ,2.8 كجم',
            'spec-row-4': 'السعة,61 لتر',
            'spec-row-5': 'حمولة الوحدة,30 كجم',
            'price-label': 'عند الاتصال',
        },

        // === Product 5: Large Foldable Crate ===
        'product-5': {
            'title': 'صندوق قابل للطي كبير',
            'subtitle': '800×600×984 ملم',
            'spec-row-1': 'البعد الخارجي,800*600*984 ملم',
            'spec-row-2': 'البعد الداخلي,760*560*852 ملم',
            'spec-row-3': 'ارتفاع الطي,334 ملم',
            'spec-row-4': 'الوزن الفارغ,25 كجم',
            'spec-row-5': 'السعة,368 لتر',
            'spec-row-6': 'حمولة الوحدة,250 كجم',
            'price-label': 'عند الاتصال',
        },

        // === Product 6: RPC 6411 ===
        'product-6': {
            'title': 'RPC 6411',
            'subtitle': '600×400×115 ملم',
            'spec-row-1': 'البعد الخارجي,600*400*115 ملم',
            'spec-row-2': 'البعد الداخلي,576*376*105 ملم',
            'spec-row-3': 'الوزن الفارغ,1.5 كجم',
            'spec-row-4': 'السعة,23 لتر',
            'spec-row-5': 'حمولة الوحدة,15 كجم',
            'price-label': 'عند الاتصال',
        },

        // === Product 7: Sheet Separators ===
        'product-7': {
            'title': 'فواصل الألواح',
        },

        // === Product 8: Gallon Racks ===
        'product-8': {
            'title': 'حوامل الجالون',
            'features': 'طقم 4 قطع,طقم 8 قطع',
        },

        // === CTA Section ===
        'cta': {
            'cta-title': 'هل تحتاج عرض سعر مخصص؟',
            'cta-description': 'نحن نقدم حلول مخصصة للصناديق وحاويات IBC وإكسسوارات اللوجستيات',
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
        hostname: 'localhost', port: 3001, path: '/api/content/page/transport-logistics',
        method: 'GET'
    });
    const v = verifyRes.data;
    console.log('\n🔍 Verification:');
    console.log('  hero/title:', v['hero'] && v['hero']['title'] && v['hero']['title'].valueAr);
    console.log('  products/section-title:', v['products'] && v['products']['section-title'] && v['products']['section-title'].valueAr);
    console.log('  product-1/title:', v['product-1'] && v['product-1']['title'] && v['product-1']['title'].valueAr);
    console.log('  product-2/title:', v['product-2'] && v['product-2']['title'] && v['product-2']['title'].valueAr);
    console.log('  product-5/title:', v['product-5'] && v['product-5']['title'] && v['product-5']['title'].valueAr);
    console.log('  product-7/title:', v['product-7'] && v['product-7']['title'] && v['product-7']['title'].valueAr);
    console.log('  product-8/title:', v['product-8'] && v['product-8']['title'] && v['product-8']['title'].valueAr);
    console.log('  cta/cta-title:', v['cta'] && v['cta']['cta-title'] && v['cta']['cta-title'].valueAr);
}

seedViaApi().catch(e => { console.error('❌ FAILED:', e.message); process.exit(1); });
