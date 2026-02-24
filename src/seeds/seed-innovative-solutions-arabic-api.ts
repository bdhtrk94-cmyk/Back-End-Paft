/**
 * Seed Arabic translations for the Innovative Solutions page
 * Run: npx ts-node src/seeds/seed-innovative-solutions-arabic-api.ts
 * Or via API call from any HTTP client
 */

const API_BASE = 'http://localhost:3001/api';

interface ContentItem {
    id: number;
    value: string;
    valueAr?: string;
}

// All Arabic translations keyed by section|key format
const translations: Record<string, string> = {
    // ─── Hero ───
    'hero|title-line1': 'نحن نقدم',
    'hero|title-highlight': 'الابتكار',
    'hero|title-line2': 'لسلسلة التوريد',

    // ─── Smart Pallets ───
    'smart-pallets|badge': 'البالتات البلاستيكية الذكية',
    'smart-pallets|title-plain': 'أصول لوجستية',
    'smart-pallets|title-highlight': 'ذكية',
    'smart-pallets|description': 'البالتات البلاستيكية الذكية من PAFT مصممة كأصول لوجستية ذكية. كل بالتة تحمل هوية RFID فريدة تخزن وتنقل بيانات دورة حياتها الكاملة، محولةً البالتات التقليدية إلى وحدات ذكية قابلة للتتبع داخل منظومة المستودعات.',
    'smart-pallets|features': 'تتبع دورة الحياة الكاملة, تقنية RFID مدمجة, تتبع فوري, تكامل مع أنظمة ERP',

    // ─── RFID Tech ───
    'rfid-tech|title-plain': 'تقنية RFID',
    'rfid-tech|title-highlight': 'والتكامل',
    'rfid-tech|subtitle': 'المكونات الأساسية التي تشغّل منظومة المستودعات الذكية',
    'rfid-tech|card-1-title': 'علامات RFID',
    'rfid-tech|card-1-desc': 'علامات RFID المدمجة توفر تعريفًا فريدًا وتتبعًا فوريًا لكل بالتة.',
    'rfid-tech|card-2-title': 'أجهزة القراءة والهوائيات',
    'rfid-tech|card-2-desc': 'مثبتة على الرافعات الشوكية والأرفف والممرات والبوابات لالتقاط الحركة تلقائيًا.',
    'rfid-tech|card-3-title': 'منصة iWMS السحابية',
    'rfid-tech|card-3-desc': 'تتم معالجة جميع بيانات RFID فوريًا عبر نظام PAFT iWMS مع المزامنة مع ERP.',

    // ─── Process Flow ───
    'process-flow|title-plain': 'كيف يعمل',
    'process-flow|title-highlight': 'PAFT iWMS',
    'process-flow|subtitle': 'عملية سلسة من 5 خطوات من البالتة إلى نظام ERP',
    'process-flow|step-1-title': 'البالتات الذكية',
    'process-flow|step-1-desc': 'كل بالتة بلاستيكية مزودة بتقنية RFID، مما يوفر تتبعًا كاملاً لدورة حياتها.',
    'process-flow|step-2-title': 'الرافعات الشوكية الذكية',
    'process-flow|step-2-desc': 'قراءة تلقائية للبالتات أثناء المناولة بدون مسح يدوي.',
    'process-flow|step-3-title': 'الأرفف والممرات الذكية',
    'process-flow|step-3-desc': 'تتبع فوري للموقع وإدارة مُحسّنة للتخزين.',
    'process-flow|step-4-title': 'البوابات الذكية',
    'process-flow|step-4-desc': 'تسجيل دقيق للوارد والصادر عند بوابات المستودع.',
    'process-flow|step-5-title': 'تكامل ERP',
    'process-flow|step-5-desc': 'مزامنة فورية بين نظام iWMS وأنظمة ERP.',

    // ─── Business Impact ───
    'business-impact|title-plain': 'التأثير',
    'business-impact|title-highlight': 'التجاري',
    'business-impact|description': 'نظام PAFT iWMS يتيح تتبع المخزون الفوري، وتحسين الدقة، وخفض تكاليف العمالة، وتسريع العمليات، ورؤية شاملة للمستودع — مما يجعل PAFT رائدة في حلول البالتات الذكية وأتمتة المستودعات.',
    'business-impact|stat-1-label': 'دقة المخزون',
    'business-impact|stat-1-value': '٩٩.٩٪',
    'business-impact|stat-2-label': 'عمليات أسرع',
    'business-impact|stat-2-value': '٣×',
    'business-impact|stat-3-label': 'خفض التكاليف',
    'business-impact|stat-3-value': '٤٠٪',
    'business-impact|stat-4-label': 'رؤية شاملة',
    'business-impact|stat-4-value': '١٠٠٪',

    // ─── RFID Understanding ───
    'rfid-understanding|badge': 'فهم تقنية RFID',
    'rfid-understanding|title-plain': 'تحديد الهوية',
    'rfid-understanding|title-highlight': 'بالترددات الراديوية',
    'rfid-understanding|paragraph-1': 'تستخدم تقنية تحديد الهوية بالترددات الراديوية (RFID) المجالات الكهرومغناطيسية للتعرف التلقائي على العلامات المرفقة بالأشياء وتتبعها. تعزز هذه التقنية بشكل كبير رؤية وتتبع عناصر المخزون، مما يجعلها أداة أساسية للمستودعات الحديثة.',
    'rfid-understanding|paragraph-2': 'على عكس أنظمة الباركود التقليدية التي تتطلب المسح بخط مباشر، تتيح تقنية RFID القراءة اللاتلامسية لعدة عناصر في وقت واحد. هذه القدرة تسرّع بشكل كبير جرد المخزون وتقلل الأخطاء البشرية، مما يسمح لموظفي المستودع بالتركيز على المهام ذات القيمة الأعلى بينما يتولى النظام التتبع تلقائيًا.',

    // ─── Challenges ───
    'challenges|badge': 'التحديات والاعتبارات',
    'challenges|title-plain': 'نجاح',
    'challenges|title-highlight': 'التطبيق',
    'challenges|paragraph-1': 'بينما يقدم نظام PAFT iWMS مزايا عديدة، يجب على الشركات مراعاة التحديات المحتملة مثل تكاليف الإعداد الأولية ومتطلبات التدريب. فهم هذه العوامل أمر بالغ الأهمية لنجاح التطبيق وتحقيق أقصى استفادة.',
    'challenges|paragraph-2': 'ومع ذلك، فإن العائد على الاستثمار على المدى الطويل عادةً ما يفوق هذه الاستثمارات الأولية. توفر PAFT دعم تأهيل شامل وبرامج تدريب لضمان جاهزية فريقك الكاملة للاستفادة من إمكانيات النظام من اليوم الأول.',
    'challenges|quote': 'توفر PAFT دعم تأهيل شامل لضمان جاهزية فريقك الكاملة من اليوم الأول.',

    // ─── Conclusion ───
    'conclusion|title-plain': 'حوّل',
    'conclusion|title-highlight': 'عملياتك',
    'conclusion|paragraph-1': 'نظام PAFT iWMS مع تقنية RFID يثور إدارة المخزون. من خلال تبني هذا الحل المبتكر، يمكن للشركات تحقيق مستويات غير مسبوقة من الكفاءة والدقة والتميز التشغيلي في عمليات المستودعات.',
    'conclusion|paragraph-2': 'من التتبع الفوري إلى التكامل السلس مع ERP، توفر PAFT منظومة متكاملة تغير طريقة إدارة المخزون. اتخذ الخطوة الأولى نحو إدارة مستودعات أكثر ذكاءً.',
    'conclusion|cta-primary': 'اطلب عرضًا توضيحيًا ←',
    'conclusion|cta-secondary': 'استكشف المنتجات',
};

async function seedArabicTranslations() {
    console.log('🚀 Seeding Arabic translations for Innovative Solutions...');

    try {
        // 1. Fetch existing content
        const res = await fetch(`${API_BASE}/content/page/innovative-solutions`);
        if (!res.ok) throw new Error(`Failed to fetch content: ${res.status}`);
        const data = await res.json();

        console.log('📦 Sections found:', Object.keys(data));

        // 2. Build updates
        const updates: { id: number; value: string; valueAr: string }[] = [];

        Object.entries(translations).forEach(([compositeKey, arabicValue]) => {
            const [section, key] = compositeKey.split('|');
            if (data[section] && data[section][key]) {
                const item: ContentItem = data[section][key];
                updates.push({
                    id: item.id,
                    value: item.value,
                    valueAr: arabicValue,
                });
            } else {
                console.warn(`⚠️ Key not found: ${section} → ${key}`);
            }
        });

        console.log(`📝 Prepared ${updates.length} updates`);

        // 3. Login to get token
        const loginRes = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@paft.com', password: 'admin123' }),
        });
        if (!loginRes.ok) throw new Error(`Login failed: ${loginRes.status}`);
        const { access_token } = await loginRes.json();

        // 4. Send bulk update
        const updateRes = await fetch(`${API_BASE}/content/bulk-update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`,
            },
            body: JSON.stringify({ updates }),
        });

        if (!updateRes.ok) throw new Error(`Bulk update failed: ${updateRes.status}`);

        const result = await updateRes.json();
        console.log('✅ Arabic translations seeded successfully!', result);
        console.log(`   Updated ${updates.length} content items`);
    } catch (err) {
        console.error('❌ Error:', err);
    }
}

seedArabicTranslations();
