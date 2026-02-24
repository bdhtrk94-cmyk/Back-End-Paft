// Seed script: Header nav + Footer content for the layout page
// Run: node seed-header-footer.mjs

const BASE_URL = 'http://localhost:3001/api';

const items = [
  // ── NAV LABELS ──────────────────────────────────────────────────────────────
  { page: 'layout', section: 'nav', key: 'home',                  value: 'Home',                       valueAr: 'الرئيسية',                       sortOrder: 1  },
  { page: 'layout', section: 'nav', key: 'company',               value: 'Company',                    valueAr: 'الشركة',                         sortOrder: 2  },
  { page: 'layout', section: 'nav', key: 'about',                 value: 'About',                      valueAr: 'من نحن',                         sortOrder: 3  },
  { page: 'layout', section: 'nav', key: 'our-journey',           value: 'Our Journey',                valueAr: 'رحلتنا',                         sortOrder: 4  },
  { page: 'layout', section: 'nav', key: 'products',              value: 'Products',                   valueAr: 'المنتجات',                       sortOrder: 5  },
  { page: 'layout', section: 'nav', key: 'plastic-pallets',       value: 'Plastic Pallets',            valueAr: 'البالتات البلاستيكية',           sortOrder: 6  },
  { page: 'layout', section: 'nav', key: 'transport-logistics',   value: 'Transport-Logistics Items',  valueAr: 'مستلزمات النقل واللوجستيات',    sortOrder: 7  },
  { page: 'layout', section: 'nav', key: 'raw-materials',         value: 'Raw Material Supply',        valueAr: 'توريد المواد الخام',             sortOrder: 8  },
  { page: 'layout', section: 'nav', key: 'innovative-solutions',  value: 'Innovative Solutions',       valueAr: 'الحلول المبتكرة',                sortOrder: 9  },
  { page: 'layout', section: 'nav', key: 'coverage',              value: 'Coverage',                   valueAr: 'التغطية',                        sortOrder: 10 },
  { page: 'layout', section: 'nav', key: 'clients',               value: 'Clients',                    valueAr: 'العملاء',                        sortOrder: 11 },
  { page: 'layout', section: 'nav', key: 'markets',               value: 'Markets',                    valueAr: 'الأسواق',                        sortOrder: 12 },
  { page: 'layout', section: 'nav', key: 'shop',                  value: 'Shop',                       valueAr: 'المتجر',                         sortOrder: 13 },
  { page: 'layout', section: 'nav', key: 'contact',               value: 'Contact',                    valueAr: 'تواصل معنا',                     sortOrder: 14 },
  { page: 'layout', section: 'nav', key: 'get-quote',             value: 'Get Quote',                  valueAr: 'احصل على عرض',                   sortOrder: 15 },

  // ── NAV DROPDOWN DESCRIPTIONS ────────────────────────────────────────────────
  { page: 'layout', section: 'nav-desc', key: 'about',                value: 'Who we are & our vision',              valueAr: 'من نحن وما رؤيتنا',                      sortOrder: 1 },
  { page: 'layout', section: 'nav-desc', key: 'our-journey',          value: 'Our milestones & growth',              valueAr: 'إنجازاتنا ونمونا',                       sortOrder: 2 },
  { page: 'layout', section: 'nav-desc', key: 'markets',              value: 'Our worldwide presence',               valueAr: 'حضورنا العالمي',                         sortOrder: 3 },
  { page: 'layout', section: 'nav-desc', key: 'plastic-pallets',      value: 'Heavy & light duty pallets',           valueAr: 'بالتات ثقيلة وخفيفة الحمل',             sortOrder: 4 },
  { page: 'layout', section: 'nav-desc', key: 'transport-logistics',  value: 'IBCs, crates & accessories',           valueAr: 'حاويات IBC وصناديق ومستلزمات',          sortOrder: 5 },
  { page: 'layout', section: 'nav-desc', key: 'raw-materials',        value: 'Recycled HDPE polymers',               valueAr: 'بوليمرات HDPE المعاد تدويرها',           sortOrder: 6 },
  { page: 'layout', section: 'nav-desc', key: 'innovative-solutions', value: 'Vision-driven supply chain tech',      valueAr: 'تقنيات سلسلة التوريد المبتكرة',          sortOrder: 7 },
  { page: 'layout', section: 'nav-desc', key: 'clients',              value: 'Our trusted partners & brands',        valueAr: 'شركاؤنا وعلاماتنا التجارية الموثوقة',   sortOrder: 8 },

  // ── FOOTER ───────────────────────────────────────────────────────────────────
  { page: 'layout', section: 'footer', key: 'brand-description',  value: 'Leading manufacturer of premium plastic pallets in Egypt, committed to quality, sustainability, and innovation in logistics solutions.', valueAr: 'الشركة الرائدة في تصنيع البالتات البلاستيكية الفاخرة في مصر، ملتزمون بالجودة والاستدامة والابتكار في حلول اللوجستيات.', sortOrder: 1 },
  { page: 'layout', section: 'footer', key: 'quick-links-title',  value: 'Quick Links',       valueAr: 'روابط سريعة',        sortOrder: 2  },
  { page: 'layout', section: 'footer', key: 'link-products',      value: 'Products',          valueAr: 'المنتجات',           sortOrder: 3  },
  { page: 'layout', section: 'footer', key: 'link-about',         value: 'About Us',          valueAr: 'من نحن',             sortOrder: 4  },
  { page: 'layout', section: 'footer', key: 'link-contact',       value: 'Contact',           valueAr: 'تواصل معنا',         sortOrder: 5  },
  { page: 'layout', section: 'footer', key: 'link-shop',          value: 'Shop',              valueAr: 'المتجر',             sortOrder: 6  },
  { page: 'layout', section: 'footer', key: 'link-admin',         value: 'Admin',             valueAr: 'الإدارة',            sortOrder: 7  },
  { page: 'layout', section: 'footer', key: 'contact-info-title', value: 'Contact Info',      valueAr: 'معلومات التواصل',    sortOrder: 8  },
  { page: 'layout', section: 'footer', key: 'business-hours-title',value: 'Business Hours',   valueAr: 'ساعات العمل',        sortOrder: 9  },
  { page: 'layout', section: 'footer', key: 'cta-text',           value: 'Ready to get started?', valueAr: 'هل أنت مستعد للبدء؟', sortOrder: 10 },
  { page: 'layout', section: 'footer', key: 'cta-link',           value: 'Contact Us',        valueAr: 'تواصل معنا',         sortOrder: 11 },
  { page: 'layout', section: 'footer', key: 'copyright',          value: '© 2025 PAFT Plastic Pallets. All rights reserved.', valueAr: '© 2025 PAFT للبالتات البلاستيكية. جميع الحقوق محفوظة.', sortOrder: 12 },
  { page: 'layout', section: 'footer', key: 'privacy-policy',     value: 'Privacy Policy',    valueAr: 'سياسة الخصوصية',    sortOrder: 13 },
  { page: 'layout', section: 'footer', key: 'terms-of-service',   value: 'Terms of Service',  valueAr: 'شروط الخدمة',        sortOrder: 14 },
];

// Login to get token
async function getToken() {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@paft.com', password: 'admin123' }),
  });
  const data = await res.json();
  if (!data.access_token) throw new Error('Login failed: ' + JSON.stringify(data));
  return data.access_token;
}

async function main() {
  console.log('🔐 Logging in...');
  const token = await getToken();
  console.log('✅ Logged in\n');

  let created = 0, failed = 0;

  for (const item of items) {
    const res = await fetch(`${BASE_URL}/content`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(item),
    });

    if (res.ok) {
      created++;
      console.log(`✅ [${item.section}] ${item.key}`);
    } else {
      failed++;
      const err = await res.text();
      console.error(`❌ [${item.section}] ${item.key} — ${res.status}: ${err}`);
    }
  }

  console.log(`\n🎉 Done! Created: ${created}, Failed: ${failed}`);
}

main().catch(console.error);
