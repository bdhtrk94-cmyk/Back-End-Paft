/**
 * Seeds Arabic content for Transport Logistics page using the API bulkUpdate endpoint.
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

    // 2. Fetch current transport-logistics content to get IDs
    const contentRes = await fetch('http://localhost:3001/api/content/page/transport-logistics');
    if (!contentRes.ok) throw new Error('Fetch failed');
    const data = await contentRes.json();
    console.log('✅ Fetched transport-logistics content');

    // 3. Build translations map: section -> key -> arabic value
    const translations: Record<string, Record<string, string>> = {
        'hero': {
            'badge-text': 'منتجات بافت',
            'title': 'النقل و اللوجستيات',
            'description': 'حاويات IBC قابلة للطي مبتكرة، صناديق بلاستيكية قابلة لإعادة الاستخدام، فواصل الألواح، وحوامل الجالون — مصممة لسلاسل التوريد الحديثة بأقصى كفاءة واستدامة.',
        },
        'products': {
            'section-title': 'كتالوجنا',
            'section-subtitle': 'حاويات IBC قابلة للطي · صناديق RPC · إكسسوارات',
        },
        'product-1': {
            'title': 'حاوية IBC قابلة للطي',
            'subtitle': 'حاوية سوائب وسيطة',
            'price-label': 'السعر حسب الطلب',
        },
        'product-2': {
            'title': 'صندوق RPC 6419',
            'subtitle': 'صندوق بلاستيكي قابل لإعادة الاستخدام',
        },
        'product-3': {
            'title': 'صندوق RPC 6422',
            'subtitle': 'صندوق بلاستيكي قابل لإعادة الاستخدام',
        },
        'product-4': {
            'title': 'صندوق RPC 6430',
            'subtitle': 'صندوق بلاستيكي قابل لإعادة الاستخدام',
        },
        'product-5': {
            'title': 'صندوق قابل للطي كبير',
            'subtitle': 'صندوق تخزين كبير الحجم',
        },
        'product-6': {
            'title': 'صندوق RPC 6411',
            'subtitle': 'صندوق بلاستيكي قابل لإعادة الاستخدام',
        },
        'product-7': {
            'title': 'فواصل الألواح',
        },
        'product-8': {
            'title': 'حوامل الجالون',
            'features': 'تصميم قابل للتكديس,متين ومقاوم,سهل التنظيف,متعدد الاستخدامات',
        },
        'cta': {
            'cta-title': 'هل تحتاج عرض سعر مخصص؟',
            'cta-description': 'نقدم حلولاً مخصصة للصناديق وحاويات IBC وإكسسوارات اللوجستيات',
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

    // 6. Verify
    const verifyRes = await fetch('http://localhost:3001/api/content/page/transport-logistics');
    const verifyData = await verifyRes.json();
    const sample = verifyData['hero']?.['title'];
    console.log(`\n🔍 Verify hero/title:`, JSON.stringify(sample));
    const sample2 = verifyData['cta']?.['cta-title'];
    console.log(`🔍 Verify cta/cta-title:`, JSON.stringify(sample2));
}

seedViaApi().catch(e => { console.error('❌ FAILED:', e.message); process.exit(1); });
