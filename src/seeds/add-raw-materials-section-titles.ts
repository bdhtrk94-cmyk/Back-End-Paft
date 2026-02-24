import { DataSource } from 'typeorm';
import { Content } from '../content/entities/content.entity';

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'paft_cms',
  entities: [Content],
  synchronize: false,
});

async function addSectionTitles() {
  try {
    await AppDataSource.initialize();
    console.log('✅ Database connected');

    const contentRepo = AppDataSource.getRepository(Content);

    // New content entries
    const newEntries = [
      // Materials Section
      { section: 'materials-section', key: 'title', value: 'Our Materials', valueAr: 'موادنا', sortOrder: 130 },
      { section: 'materials-section', key: 'subtitle', value: 'Discover our range of sustainable polymer solutions', valueAr: 'اكتشف مجموعتنا من حلول البوليمر المستدامة', sortOrder: 131 },
      
      // Datasheets Section
      { section: 'datasheets-section', key: 'title', value: 'Product Data Sheets', valueAr: 'أوراق بيانات المنتج', sortOrder: 140 },
      { section: 'datasheets-section', key: 'subtitle', value: 'Explore our comprehensive range of sustainable polymer materials', valueAr: 'استكشف مجموعتنا الشاملة من مواد البوليمر المستدامة', sortOrder: 141 },
      
      // CTA Buttons
      { section: 'cta', key: 'button-sample', value: 'Request a Sample →', valueAr: 'اطلب عينة ←', sortOrder: 122 },
      { section: 'cta', key: 'button-contact', value: 'Contact Sales', valueAr: 'تواصل مع المبيعات', sortOrder: 123 },
    ];

    console.log('🔄 Adding new section titles...');

    for (const entry of newEntries) {
      // Check if entry already exists
      const existing = await contentRepo.findOne({
        where: {
          page: 'raw-materials',
          section: entry.section,
          key: entry.key,
        },
      });

      if (existing) {
        // Update existing
        existing.value = entry.value;
        existing.valueAr = entry.valueAr;
        existing.sortOrder = entry.sortOrder;
        await contentRepo.save(existing);
        console.log(`✅ Updated: ${entry.section} - ${entry.key}`);
      } else {
        // Create new
        const newContent = contentRepo.create({
          page: 'raw-materials',
          section: entry.section,
          key: entry.key,
          value: entry.value,
          valueAr: entry.valueAr,
          sortOrder: entry.sortOrder,
        });
        await contentRepo.save(newContent);
        console.log(`✅ Created: ${entry.section} - ${entry.key}`);
      }
    }

    console.log('\n✅ Section titles added successfully!');

    await AppDataSource.destroy();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

addSectionTitles();
