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

async function addUILabels() {
  try {
    await AppDataSource.initialize();
    console.log('✅ Database connected');

    const contentRepo = AppDataSource.getRepository(Content);

    const uiLabels = [
      { key: 'open-datasheet', value: 'Open Datasheet', valueAr: 'فتح ورقة البيانات', sortOrder: 150 },
      { key: 'download-pdf', value: 'Download PDF', valueAr: 'تحميل PDF', sortOrder: 151 },
    ];

    console.log('🔄 Adding UI labels...');

    for (const label of uiLabels) {
      const existing = await contentRepo.findOne({
        where: {
          page: 'raw-materials',
          section: 'ui-labels',
          key: label.key,
        },
      });

      if (existing) {
        existing.value = label.value;
        existing.valueAr = label.valueAr;
        existing.sortOrder = label.sortOrder;
        await contentRepo.save(existing);
        console.log(`✅ Updated: ${label.key}`);
      } else {
        const newContent = contentRepo.create({
          page: 'raw-materials',
          section: 'ui-labels',
          key: label.key,
          value: label.value,
          valueAr: label.valueAr,
          sortOrder: label.sortOrder,
        });
        await contentRepo.save(newContent);
        console.log(`✅ Created: ${label.key}`);
      }
    }

    console.log('\n✅ UI labels added successfully!');

    await AppDataSource.destroy();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

addUILabels();
