/**
 * Seeds Arabic content for ALL 4 pages using the API bulkUpdate endpoint.
 * Run with: node src/seeds/seed-all-arabic.js
 */

const API = 'http://localhost:3001/api';

async function login() {
    const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@paft.com', password: 'admin123' }),
    });
    if (!res.ok) throw new Error('Login failed: ' + await res.text());
    const { access_token } = await res.json();
    return access_token;
}

async function fetchPage(page) {
    const res = await fetch(`${API}/content/page/${page}`);
    if (!res.ok) throw new Error(`Fetch ${page} failed`);
    return res.json();
}

async function bulkUpdate(token, updates) {
    const res = await fetch(`${API}/content/bulk-update`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
    });
    if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Bulk update failed (${res.status}): ${errText}`);
    }
    return res.json();
}

function buildUpdates(data, translations) {
    const updates = [];
    let notFound = 0;
    for (const [section, keys] of Object.entries(translations)) {
        for (const [key, valueAr] of Object.entries(keys)) {
            const item = data[section] && data[section][key];
            if (item) {
                updates.push({ id: item.id, value: item.value, valueAr });
            } else {
                console.warn(`  ⚠️ Not found: ${section}/${key}`);
                notFound++;
            }
        }
    }
    return { updates, notFound };
}

// ─────────────────── TRANSLATIONS ───────────────────

const plasticPalletsTranslations = {
    'heavy-duty-hero': {
        'heavy-duty-title': 'طبالي',
        'heavy-duty-highlight': 'ثقيلة التحمل',
        'heavy-duty-description': 'طبالي بافت الثقيلة مصممة لتقديم أعلى قيمة مقابل المال في منطقة الشرق الأوسط وشمال أفريقيا، مع متانة استثنائية وأقل معدلات كسر سنوية. مصنوعة من مواد مركبة بكر عالية الجودة ومعززة بقضبان معدنية، وعمر افتراضي يتجاوز 10 سنوات مع ضمان تصنيع لمدة 5 سنوات.',
    },
    'info-cards': {
        'design-title': 'التصميم',
        'design-content': 'مثالية لنظام الأرفف • يمكن تعزيزها بحتى 10 قضبان معدنية بسُمك يصل إلى 2.0 مم • متوافقة مع RFID لتتبع الطبالي • مدخل حر لعربة اليد • مانعات انزلاق • سطح علوي وسفلي مثقب • شعارات العملاء منقوشة على الجانبين • حل تتبع كامل متاح',
        'material-title': 'المواد',
        'material-content': 'يمكن إنتاجها بـ 6 تركيبات مختلفة من HDPE/PP • مادة مركبة عالية الصدمات • مواد بكر • مواد معاد تدويرها جزئياً مع إضافات تعزيز (اختياري) • إضافات مطاطية وحماية من الأشعة فوق البنفسجية (اختياري) • قضبان فولاذية مطلية كهروستاتيكياً • مادة معتمدة للاستخدام الغذائي • تصميم صحي معتمد',
    },
    'video': {
        'video-title': 'اختبار',
        'video-highlight': 'المنتج',
        'video-description': 'شاهد اختبارات الجودة الصارمة أثناء العمل',
        'watch-video-text': 'شاهد الفيديو',
    },
    'light-duty-hero': {
        'light-duty-title': 'طبالي',
        'light-duty-highlight': 'خفيفة التحمل',
        'light-duty-description': 'عدة طبالي تبدأ من 7 كجم/طبلية. مصنوعة من البلاستيك المعاد تدويره، مثالية للاستخدام لمرة واحدة. على عكس الطبالي الخشبية، لا تحتاج لمعالجات خاصة، وتلبي جميع المعايير الصحية والبيئية.',
    },
    'light-duty-info': {
        'feature1': 'مادة معاد تدويرها 100%',
        'feature2': 'مدخل من 4 اتجاهات',
        'feature3': 'مانع للانزلاق',
        'feature4': 'شهادة SPM 15',
        'feature5': 'بدون مسامير، بدون تلف للمنتج',
        'feature6': 'نظام الأرفف غير متاح',
    },
    'rental-hero': {
        'rental-title': 'طبالي',
        'rental-highlight': 'للتأجير',
        'rental-description': 'تقدم بافت نهجاً مبتكراً وفريداً لتخزين المنتجات عبر خدمة التأجير المرنة المصممة لتلبية الاحتياجات الخاصة لكل عميل، مما يتيح لك تحويل تكاليف الطبالي من نفقات رأسمالية إلى نفقات تشغيلية.',
    },
    'cta': {
        'cta-title': 'هل تحتاج',
        'cta-highlight': 'حلول مخصصة؟',
        'cta-description': 'يمكننا تصنيع طبالي وفقاً لمتطلباتك الخاصة',
        'cta-button1-text': 'اطلب عرض سعر ←',
        'cta-button2-text': 'تواصل مع فريقنا',
    },
};

const transportLogisticsTranslations = {
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

const rawMaterialsTranslations = {
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
    },
    'material-1': {
        'title': 'HDPE بكر',
        'polymer': 'بولي إيثيلين عالي الكثافة',
        'source': 'بكر',
        'color': 'طبيعي/مخصص',
        'additives': 'مثبت UV، مضاد للأكسدة',
    },
    'material-2': {
        'title': 'PP بكر',
        'polymer': 'بولي بروبيلين',
        'source': 'بكر',
        'color': 'طبيعي/مخصص',
        'additives': 'مثبت UV، مقوي الصدمات',
    },
    'material-3': {
        'title': 'HDPE معاد تدويره',
        'polymer': 'بولي إيثيلين عالي الكثافة',
        'source': 'معاد تدويره',
        'color': 'أسود/رمادي',
        'additives': 'إضافات تعزيز',
    },
    'material-4': {
        'title': 'مركب مخصص',
        'polymer': 'خليط HDPE/PP',
        'source': 'بكر + معاد تدويره',
        'color': 'مخصص',
        'additives': 'تركيبة مخصصة',
    },
    'material-5': {
        'title': 'درجة غذائية',
        'polymer': 'HDPE غذائي',
        'source': 'بكر',
        'color': 'أبيض/أزرق',
        'additives': 'درجة غذائية معتمدة',
    },
    'sheet-1': {
        'title': 'ورقة بيانات المواد الثقيلة',
        'subtitle': 'مواصفات مفصلة لتطبيقات التحميل الثقيل',
        'badges': 'HDPE,بكر,معتمد ISO',
        'description': 'مواصفات شاملة تغطي الخواص الفيزيائية والميكانيكية والحرارية لمواد الطبالي الثقيلة.',
    },
    'sheet-2': {
        'title': 'ورقة بيانات المواد الخفيفة',
        'subtitle': 'مواصفات تطبيقات التحميل الخفيف',
        'badges': 'HDPE,معاد تدويره,صديق للبيئة',
        'description': 'بيانات الأداء وشهادات المطابقة لمنتجات الطبالي خفيفة التحمل.',
    },
};

const innovativeSolutionsTranslations = {
    'hero': {
        'title-line1': 'نقدم',
        'title-highlight': 'الابتكار',
        'title-line2': 'لسلسلة التوريد',
    },
    'smart-pallets': {
        'badge': 'طبالي بلاستيكية ذكية',
        'title-plain': 'أصول لوجستية',
        'title-highlight': 'ذكية',
        'description': 'طبالي بافت البلاستيكية الذكية مصممة كأصول لوجستية ذكية. كل طبلية تحمل هوية RFID فريدة تخزن وتنقل بيانات دورة حياتها الكاملة.',
        'features': 'تتبع دورة الحياة الكاملة,مُمكّن بتقنية RFID,تتبع في الوقت الحقيقي,تكامل مع ERP',
    },
    'rfid-tech': {
        'title-plain': 'تقنية RFID',
        'title-highlight': 'التكامل',
        'subtitle': 'المكونات الأساسية التي تشغل منظومة المستودع الذكي',
        'card-1-title': 'علامات RFID',
        'card-1-desc': 'علامات RFID مدمجة توفر تعريفاً فريداً وتتبعاً في الوقت الحقيقي لكل طبلية.',
        'card-2-title': 'أجهزة القراءة والهوائيات',
        'card-2-desc': 'مثبتة على الرافعات الشوكية والأرفف والممرات والبوابات لالتقاط الحركة تلقائياً.',
        'card-3-title': 'منصة iWMS السحابية',
        'card-3-desc': 'جميع بيانات RFID تتم معالجتها فورياً عبر نظام iWMS من بافت مع مزامنة ERP.',
    },
    'process-flow': {
        'title-plain': 'كيف يعمل نظام iWMS',
        'title-highlight': 'من بافت',
        'subtitle': 'عملية سلسة من 5 خطوات من الطبلية إلى ERP',
        'step-1-title': 'طبالي ذكية',
        'step-1-desc': 'كل طبلية بلاستيكية مُمكّنة بتقنية RFID، مما يوفر تتبعاً كاملاً لدورة الحياة.',
        'step-2-title': 'رافعات ذكية',
        'step-2-desc': 'قراءة تلقائية للطبالي أثناء المناولة دون مسح يدوي.',
        'step-3-title': 'أرفف وممرات ذكية',
        'step-3-desc': 'تتبع فوري للموقع وإدارة مُحسّنة للتخزين.',
        'step-4-title': 'بوابات ذكية',
        'step-4-desc': 'تسجيل دقيق للوارد والصادر عند بوابات المستودع.',
        'step-5-title': 'تكامل ERP',
        'step-5-desc': 'مزامنة في الوقت الحقيقي بين iWMS وأنظمة ERP.',
    },
    'business-impact': {
        'title-plain': 'التأثير',
        'title-highlight': 'التجاري',
        'description': 'يتيح نظام iWMS من بافت تتبع المخزون في الوقت الحقيقي، ودقة محسّنة، وتقليل تكاليف العمالة، وعمليات أسرع، ورؤية كاملة للمستودع.',
        'stat-1-label': 'دقة المخزون',
        'stat-1-value': '99.9%',
        'stat-2-label': 'عمليات أسرع',
        'stat-2-value': '3×',
        'stat-3-label': 'خفض التكاليف',
        'stat-3-value': '40%',
        'stat-4-label': 'رؤية كاملة',
        'stat-4-value': '100%',
    },
    'rfid-understanding': {
        'badge': 'فهم RFID',
        'title-plain': 'تعريف الترددات',
        'title-highlight': 'الراديوية',
        'paragraph-1': 'تستخدم تقنية التعريف بالترددات الراديوية (RFID) المجالات الكهرومغناطيسية لتحديد وتتبع العلامات المرفقة بالأشياء تلقائياً.',
        'paragraph-2': 'على عكس أنظمة الباركود التقليدية التي تتطلب مسحاً بخط النظر، تتيح RFID القراءة اللاسلكية لعناصر متعددة في وقت واحد.',
    },
    'challenges': {
        'badge': 'التحديات والاعتبارات',
        'title-plain': 'نجاح',
        'title-highlight': 'التنفيذ',
        'paragraph-1': 'بينما يقدم نظام iWMS من بافت مزايا عديدة، يجب على الشركات مراعاة التحديات المحتملة مثل تكاليف الإعداد الأولية ومتطلبات التدريب.',
        'paragraph-2': 'ومع ذلك، عادة ما يفوق العائد على الاستثمار طويل الأجل هذه الاستثمارات الأولية. توفر بافت دعماً شاملاً للإعداد وبرامج تدريبية.',
        'quote': 'توفر بافت دعماً شاملاً للإعداد لضمان جهوزية فريقك الكاملة من اليوم الأول.',
    },
    'conclusion': {
        'title-plain': 'حوّل',
        'title-highlight': 'عملياتك',
        'paragraph-1': 'يحدث نظام iWMS مع تقنية RFID من بافت ثورة في إدارة المخزون.',
        'paragraph-2': 'من التتبع في الوقت الحقيقي إلى التكامل السلس مع ERP، توفر بافت منظومة متكاملة تحول طريقة إدارتك للمخزون.',
        'cta-primary': 'اطلب عرضاً توضيحياً ←',
        'cta-secondary': 'استكشف المنتجات',
    },
};

// ─────────────────── MAIN ───────────────────

async function main() {
    console.log('🚀 Starting Arabic content seeding for all 4 pages...\n');

    const token = await login();
    console.log('✅ Logged in\n');

    const pages = [
        { name: 'plastic-pallets', translations: plasticPalletsTranslations },
        { name: 'transport-logistics', translations: transportLogisticsTranslations },
        { name: 'raw-materials', translations: rawMaterialsTranslations },
        { name: 'innovative-solutions', translations: innovativeSolutionsTranslations },
    ];

    for (const page of pages) {
        console.log(`\n📄 Processing: ${page.name}`);
        try {
            const data = await fetchPage(page.name);
            console.log(`  ✅ Fetched content`);

            const { updates, notFound } = buildUpdates(data, page.translations);
            console.log(`  📦 Prepared ${updates.length} updates (${notFound} not found)`);

            if (updates.length > 0) {
                const result = await bulkUpdate(token, updates);
                console.log(`  ✅ Updated ${result.length} items`);
            }

            // Verify
            const verifyData = await fetchPage(page.name);
            const sections = Object.keys(page.translations);
            const firstSection = sections[0];
            const firstKey = Object.keys(page.translations[firstSection])[0];
            const sample = verifyData[firstSection] && verifyData[firstSection][firstKey];
            console.log(`  🔍 Verify ${firstSection}/${firstKey}: valueAr = "${sample ? sample.valueAr : 'NOT FOUND'}"`);

        } catch (err) {
            console.error(`  ❌ Failed for ${page.name}:`, err.message);
        }
    }

    console.log('\n🎉 Done seeding all pages!');
}

main().catch(e => { console.error('❌ FATAL:', e.message); process.exit(1); });
