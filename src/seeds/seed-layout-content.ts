import { DataSource } from 'typeorm';
import { Content } from '../content/entities/content.entity';

export async function seedLayoutContent(dataSource: DataSource) {
    const contentRepository = dataSource.getRepository(Content);

    // All layout content entries (header nav, dropdown descriptions, footer)
    const layoutEntries = [
        // ── Header Navigation Labels ──
        { page: 'layout', section: 'nav', key: 'home', value: 'Home', valueAr: 'الرئيسية', sortOrder: 1 },
        { page: 'layout', section: 'nav', key: 'company', value: 'Company', valueAr: 'الشركة', sortOrder: 2 },
        { page: 'layout', section: 'nav', key: 'about', value: 'About', valueAr: 'من نحن', sortOrder: 3 },
        { page: 'layout', section: 'nav', key: 'our-journey', value: 'Our Journey', valueAr: 'رحلتنا', sortOrder: 4 },
        { page: 'layout', section: 'nav', key: 'products', value: 'Products', valueAr: 'المنتجات', sortOrder: 5 },
        { page: 'layout', section: 'nav', key: 'plastic-pallets', value: 'Plastic Pallets', valueAr: 'البالتات البلاستيكية', sortOrder: 6 },
        { page: 'layout', section: 'nav', key: 'transport-logistics', value: 'Transport-Logistics Items', valueAr: 'مستلزمات النقل', sortOrder: 7 },
        { page: 'layout', section: 'nav', key: 'raw-materials', value: 'Raw Material Supply', valueAr: 'توريد المواد الخام', sortOrder: 8 },
        { page: 'layout', section: 'nav', key: 'innovative-solutions', value: 'Innovative Solutions', valueAr: 'الحلول المبتكرة', sortOrder: 9 },
        { page: 'layout', section: 'nav', key: 'coverage', value: 'Coverage', valueAr: 'التغطية', sortOrder: 10 },
        { page: 'layout', section: 'nav', key: 'clients', value: 'Clients', valueAr: 'العملاء', sortOrder: 11 },
        { page: 'layout', section: 'nav', key: 'markets', value: 'Markets', valueAr: 'الأسواق', sortOrder: 12 },
        { page: 'layout', section: 'nav', key: 'shop', value: 'Shop', valueAr: 'المتجر', sortOrder: 13 },
        { page: 'layout', section: 'nav', key: 'contact', value: 'Contact', valueAr: 'تواصل معنا', sortOrder: 14 },
        { page: 'layout', section: 'nav', key: 'get-quote', value: 'Get Quote', valueAr: 'احصل على عرض', sortOrder: 15 },

        // ── Dropdown Descriptions ──
        { page: 'layout', section: 'nav-desc', key: 'about', value: 'Who we are & our vision', valueAr: 'من نحن وما رؤيتنا', sortOrder: 1 },
        { page: 'layout', section: 'nav-desc', key: 'our-journey', value: 'Our milestones & growth', valueAr: 'إنجازاتنا ونمونا', sortOrder: 2 },
        { page: 'layout', section: 'nav-desc', key: 'markets', value: 'Our worldwide presence', valueAr: 'حضورنا العالمي', sortOrder: 3 },
        { page: 'layout', section: 'nav-desc', key: 'plastic-pallets', value: 'Heavy & light duty pallets', valueAr: 'بالتات ثقيلة وخفيفة الحمل', sortOrder: 4 },
        { page: 'layout', section: 'nav-desc', key: 'transport-logistics', value: 'IBCs, crates & accessories', valueAr: 'حاويات IBC وصناديق ومستلزمات', sortOrder: 5 },
        { page: 'layout', section: 'nav-desc', key: 'raw-materials', value: 'Recycled HDPE polymers', valueAr: 'بوليمرات HDPE المعاد تدويرها', sortOrder: 6 },
        { page: 'layout', section: 'nav-desc', key: 'innovative-solutions', value: 'Vision-driven supply chain tech', valueAr: 'تقنيات سلسلة التوريد المبتكرة', sortOrder: 7 },
        { page: 'layout', section: 'nav-desc', key: 'clients', value: 'Our trusted partners & brands', valueAr: 'شركاؤنا وعلاماتنا الموثوقة', sortOrder: 8 },

        // ── Footer Content ──
        { page: 'layout', section: 'footer', key: 'brand-description', value: 'Leading manufacturer of premium plastic pallets in Egypt, committed to quality, sustainability, and innovation in logistics solutions.', valueAr: 'الشركة الرائدة في تصنيع البالتات البلاستيكية الفاخرة في مصر، ملتزمون بالجودة والاستدامة والابتكار في حلول اللوجستيات.', sortOrder: 1 },
        { page: 'layout', section: 'footer', key: 'quick-links-title', value: 'Quick Links', valueAr: 'روابط سريعة', sortOrder: 2 },
        { page: 'layout', section: 'footer', key: 'contact-info-title', value: 'Contact Info', valueAr: 'معلومات التواصل', sortOrder: 3 },
        { page: 'layout', section: 'footer', key: 'business-hours-title', value: 'Business Hours', valueAr: 'ساعات العمل', sortOrder: 4 },
        { page: 'layout', section: 'footer', key: 'link-products', value: 'Products', valueAr: 'المنتجات', sortOrder: 5 },
        { page: 'layout', section: 'footer', key: 'link-about', value: 'About Us', valueAr: 'من نحن', sortOrder: 6 },
        { page: 'layout', section: 'footer', key: 'link-contact', value: 'Contact', valueAr: 'تواصل معنا', sortOrder: 7 },
        { page: 'layout', section: 'footer', key: 'link-shop', value: 'Shop', valueAr: 'المتجر', sortOrder: 8 },
        { page: 'layout', section: 'footer', key: 'link-admin', value: 'Admin', valueAr: 'الإدارة', sortOrder: 9 },
        { page: 'layout', section: 'footer', key: 'contact-email', value: 'info@paft.com', valueAr: 'info@paft.com', sortOrder: 10 },
        { page: 'layout', section: 'footer', key: 'contact-phone', value: '+20 123 456 7890', valueAr: '+20 123 456 7890', sortOrder: 11 },
        { page: 'layout', section: 'footer', key: 'contact-address', value: '123 Industrial Zone, Manufacturing District, Cairo, Egypt', valueAr: '123 المنطقة الصناعية، حي التصنيع، القاهرة، مصر', sortOrder: 12 },
        { page: 'layout', section: 'footer', key: 'business-hours', value: 'Sunday - Thursday: 9:00 AM - 6:00 PM', valueAr: 'الأحد - الخميس: 9:00 ص - 6:00 م', sortOrder: 13 },
        { page: 'layout', section: 'footer', key: 'cta-text', value: 'Ready to get started?', valueAr: 'هل أنت مستعد للبدء؟', sortOrder: 14 },
        { page: 'layout', section: 'footer', key: 'cta-link', value: 'Contact Us', valueAr: 'تواصل معنا', sortOrder: 15 },
        { page: 'layout', section: 'footer', key: 'copyright', value: '© 2025 PAFT Plastic Pallets. All rights reserved.', valueAr: '© 2025 PAFT للبالتات البلاستيكية. جميع الحقوق محفوظة.', sortOrder: 16 },
        { page: 'layout', section: 'footer', key: 'privacy-policy', value: 'Privacy Policy', valueAr: 'سياسة الخصوصية', sortOrder: 17 },
        { page: 'layout', section: 'footer', key: 'terms-of-service', value: 'Terms of Service', valueAr: 'شروط الخدمة', sortOrder: 18 },
    ];

    let created = 0;
    let skipped = 0;

    for (const entry of layoutEntries) {
        const existing = await contentRepository.findOne({
            where: { page: entry.page, section: entry.section, key: entry.key },
        });

        if (existing) {
            // Update valueAr if missing
            if (!existing.valueAr && entry.valueAr) {
                existing.valueAr = entry.valueAr;
                await contentRepository.save(existing);
                console.log(`  ✏️  Updated Arabic for ${entry.section}/${entry.key}`);
            } else {
                skipped++;
            }
        } else {
            await contentRepository.save(contentRepository.create(entry));
            created++;
            console.log(`  ✅ Created ${entry.section}/${entry.key}`);
        }
    }

    console.log(`\nLayout content seeding complete: ${created} created, ${skipped} already existed.`);
}

// Run this script directly
if (require.main === module) {
    import('typeorm').then(async ({ DataSource }) => {
        const dataSource = new DataSource({
            type: 'mysql',
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '3306'),
            username: process.env.DB_USERNAME || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_DATABASE || 'paft_cms',
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            synchronize: false,
        });

        try {
            await dataSource.initialize();
            console.log('🌱 Seeding layout content (header + footer)...');
            await seedLayoutContent(dataSource);
            await dataSource.destroy();
            console.log('✅ Done!');
        } catch (error) {
            console.error('❌ Error seeding layout content:', error);
            process.exit(1);
        }
    });
}
