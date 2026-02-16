import { DataSource } from 'typeorm';
import { Content } from '../content/entities/content.entity';
import * as dotenv from 'dotenv';

dotenv.config();

const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'paft_cms',
    entities: [Content],
    synchronize: false,
});

const innovativeSolutionsContent = [
    // Hero Section
    { page: 'innovative-solutions', section: 'hero', key: 'title', value: 'Innovative Solutions', sortOrder: 1 },
    { page: 'innovative-solutions', section: 'hero', key: 'subtitle', value: 'Pioneering the future of sustainable plastics', sortOrder: 2 },
    { page: 'innovative-solutions', section: 'hero', key: 'description', value: 'We provide cutting-edge solutions for complex challenges in the plastic industry.', sortOrder: 3 },
    { page: 'innovative-solutions', section: 'hero', key: 'image', value: 'https://paft.eg/wp-content/uploads/2025/11/hero-innovative.jpg', sortOrder: 4 },

    // Intro Section
    { page: 'innovative-solutions', section: 'intro', key: 'heading', value: 'Why Choose Our Solutions?', sortOrder: 10 },
    { page: 'innovative-solutions', section: 'intro', key: 'text', value: 'Our innovative approach combines technology, sustainability, and efficiency.', sortOrder: 11 },

    // Solution 1
    { page: 'innovative-solutions', section: 'solution-1', key: 'title', value: 'Custom Compounding', sortOrder: 20 },
    { page: 'innovative-solutions', section: 'solution-1', key: 'description', value: 'Tailored material properties to meet specific industrial requirements.', sortOrder: 21 },
    { page: 'innovative-solutions', section: 'solution-1', key: 'icon', value: 'beaker', sortOrder: 22 },

    // Solution 2
    { page: 'innovative-solutions', section: 'solution-2', key: 'title', value: 'Recycling Technology', sortOrder: 30 },
    { page: 'innovative-solutions', section: 'solution-2', key: 'description', value: 'State-of-the-art recycling processes ensuring high purity and quality.', sortOrder: 31 },
    { page: 'innovative-solutions', section: 'solution-2', key: 'icon', value: 'recycle', sortOrder: 32 },

    // Solution 3
    { page: 'innovative-solutions', section: 'solution-3', key: 'title', value: 'Supply Chain Optimization', sortOrder: 40 },
    { page: 'innovative-solutions', section: 'solution-3', key: 'description', value: 'Efficient logistics and inventory management solutions.', sortOrder: 41 },
    { page: 'innovative-solutions', section: 'solution-3', key: 'icon', value: 'truck', sortOrder: 42 },

    // CTA Section
    { page: 'innovative-solutions', section: 'cta', key: 'title', value: 'Ready to Innovate?', sortOrder: 50 },
    { page: 'innovative-solutions', section: 'cta', key: 'buttonParams', value: 'Contact Us', sortOrder: 51 },
];

async function addInnovativeSolutionsContent() {
    try {
        console.log('🔌 Connecting to database...');
        await dataSource.initialize();
        console.log('✅ Database connection established');

        const contentRepository = dataSource.getRepository(Content);

        console.log('🧹 Clearing existing innovative-solutions content...');
        await contentRepository.delete({ page: 'innovative-solutions' });
        console.log('✅ Existing content cleared');

        console.log('📦 Adding innovative-solutions content...');

        for (const contentData of innovativeSolutionsContent) {
            const content = contentRepository.create(contentData);
            await contentRepository.save(content);
            console.log(`✅ Added: ${content.section} - ${content.key}`);
        }

        console.log(`\n🎉 Successfully added ${innovativeSolutionsContent.length} content items!`);

    } catch (error) {
        console.error('❌ Error adding content:', error);
    } finally {
        if (dataSource.isInitialized) {
            await dataSource.destroy();
            console.log('🔌 Database connection closed');
        }
    }
}

addInnovativeSolutionsContent();
