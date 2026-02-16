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

const PAGE = 'innovative-solutions';

const innovativeSolutionsContent = [
    // ─── Hero Section ───
    { page: PAGE, section: 'hero', key: 'title-line1', value: 'WE BRING', sortOrder: 1 },
    { page: PAGE, section: 'hero', key: 'title-highlight', value: 'INNOVATION', sortOrder: 2 },
    { page: PAGE, section: 'hero', key: 'title-line2', value: 'TO SUPPLY CHAIN', sortOrder: 3 },

    // ─── Smart Pallets Section ───
    { page: PAGE, section: 'smart-pallets', key: 'badge', value: 'Smart Plastic Pallets', sortOrder: 10 },
    { page: PAGE, section: 'smart-pallets', key: 'title-plain', value: 'Intelligent', sortOrder: 11 },
    { page: PAGE, section: 'smart-pallets', key: 'title-highlight', value: 'Logistics Assets', sortOrder: 12 },
    { page: PAGE, section: 'smart-pallets', key: 'description', value: 'PAFT Smart Plastic Pallets are designed as intelligent logistics assets. Each pallet carries a unique RFID identity that stores and transmits its full lifecycle data, transforming traditional pallets into smart, trackable units within the warehouse ecosystem.', sortOrder: 13 },
    { page: PAGE, section: 'smart-pallets', key: 'features', value: 'Full Life Traceability,RFID-Enabled,Real-Time Tracking,ERP Integration', sortOrder: 14 },

    // ─── RFID Technology Section ───
    { page: PAGE, section: 'rfid-tech', key: 'title-plain', value: 'RFID Technology', sortOrder: 20 },
    { page: PAGE, section: 'rfid-tech', key: 'title-highlight', value: 'Integration', sortOrder: 21 },
    { page: PAGE, section: 'rfid-tech', key: 'subtitle', value: 'The core components powering our smart warehouse ecosystem', sortOrder: 22 },
    { page: PAGE, section: 'rfid-tech', key: 'card-1-title', value: 'RFID Tags', sortOrder: 23 },
    { page: PAGE, section: 'rfid-tech', key: 'card-1-desc', value: 'Embedded RFID tags provide unique identification and real-time tracking for every pallet.', sortOrder: 24 },
    { page: PAGE, section: 'rfid-tech', key: 'card-2-title', value: 'Readers & Antennas', sortOrder: 25 },
    { page: PAGE, section: 'rfid-tech', key: 'card-2-desc', value: 'Installed on forklifts, racks, aisles, and gates to capture movement automatically.', sortOrder: 26 },
    { page: PAGE, section: 'rfid-tech', key: 'card-3-title', value: 'Cloud iWMS Platform', sortOrder: 27 },
    { page: PAGE, section: 'rfid-tech', key: 'card-3-desc', value: 'All RFID data is processed instantly through PAFT iWMS with ERP synchronization.', sortOrder: 28 },

    // ─── Process Flow Section ───
    { page: PAGE, section: 'process-flow', key: 'title-plain', value: 'How PAFT iWMS', sortOrder: 30 },
    { page: PAGE, section: 'process-flow', key: 'title-highlight', value: 'Works', sortOrder: 31 },
    { page: PAGE, section: 'process-flow', key: 'subtitle', value: 'A seamless 5-step process from pallet to ERP', sortOrder: 32 },
    { page: PAGE, section: 'process-flow', key: 'step-1-title', value: 'Smart Pallets', sortOrder: 33 },
    { page: PAGE, section: 'process-flow', key: 'step-1-desc', value: 'Each plastic pallet is RFID-enabled, providing full life traceability.', sortOrder: 34 },
    { page: PAGE, section: 'process-flow', key: 'step-2-title', value: 'Smart Forklifts', sortOrder: 35 },
    { page: PAGE, section: 'process-flow', key: 'step-2-desc', value: 'Automatic reading of pallets during handling without manual scanning.', sortOrder: 36 },
    { page: PAGE, section: 'process-flow', key: 'step-3-title', value: 'Smart Racks & Aisles', sortOrder: 37 },
    { page: PAGE, section: 'process-flow', key: 'step-3-desc', value: 'Instant location tracking and optimized storage management.', sortOrder: 38 },
    { page: PAGE, section: 'process-flow', key: 'step-4-title', value: 'Smart Gates', sortOrder: 39 },
    { page: PAGE, section: 'process-flow', key: 'step-4-desc', value: 'Accurate inbound and outbound recording at warehouse gates.', sortOrder: 40 },
    { page: PAGE, section: 'process-flow', key: 'step-5-title', value: 'ERP Integration', sortOrder: 41 },
    { page: PAGE, section: 'process-flow', key: 'step-5-desc', value: 'Real-time synchronization between iWMS and ERP systems.', sortOrder: 42 },

    // ─── Business Impact Section ───
    { page: PAGE, section: 'business-impact', key: 'title-plain', value: 'Business', sortOrder: 50 },
    { page: PAGE, section: 'business-impact', key: 'title-highlight', value: 'Impact', sortOrder: 51 },
    { page: PAGE, section: 'business-impact', key: 'description', value: 'PAFT iWMS enables real-time inventory tracking, improved accuracy, reduced labor costs, faster operations, and full warehouse visibility—positioning PAFT as a leader in smart pallet and warehouse automation solutions.', sortOrder: 52 },
    { page: PAGE, section: 'business-impact', key: 'stat-1-value', value: '99.9%', sortOrder: 53 },
    { page: PAGE, section: 'business-impact', key: 'stat-1-label', value: 'Inventory Accuracy', sortOrder: 54 },
    { page: PAGE, section: 'business-impact', key: 'stat-2-value', value: '3×', sortOrder: 55 },
    { page: PAGE, section: 'business-impact', key: 'stat-2-label', value: 'Faster Operations', sortOrder: 56 },
    { page: PAGE, section: 'business-impact', key: 'stat-3-value', value: '40%', sortOrder: 57 },
    { page: PAGE, section: 'business-impact', key: 'stat-3-label', value: 'Cost Reduction', sortOrder: 58 },
    { page: PAGE, section: 'business-impact', key: 'stat-4-value', value: '100%', sortOrder: 59 },
    { page: PAGE, section: 'business-impact', key: 'stat-4-label', value: 'Full Visibility', sortOrder: 60 },

    // ─── RFID Understanding Section ───
    { page: PAGE, section: 'rfid-understanding', key: 'badge', value: 'Understanding RFID', sortOrder: 70 },
    { page: PAGE, section: 'rfid-understanding', key: 'title-plain', value: 'Radio Frequency', sortOrder: 71 },
    { page: PAGE, section: 'rfid-understanding', key: 'title-highlight', value: 'Identification', sortOrder: 72 },
    { page: PAGE, section: 'rfid-understanding', key: 'paragraph-1', value: 'Radio Frequency Identification (RFID) technology uses electromagnetic fields to automatically identify and track tags attached to objects. This technology significantly enhances the visibility and traceability of inventory items, making it an essential tool for modern warehouses.', sortOrder: 73 },
    { page: PAGE, section: 'rfid-understanding', key: 'paragraph-2', value: 'Unlike traditional barcode systems that require line-of-sight scanning, RFID enables contactless reading of multiple items simultaneously. This capability dramatically speeds up inventory counts and reduces human error, allowing warehouse staff to focus on higher-value tasks while the system handles tracking automatically.', sortOrder: 74 },

    // ─── Challenges Section ───
    { page: PAGE, section: 'challenges', key: 'badge', value: 'Challenges & Considerations', sortOrder: 80 },
    { page: PAGE, section: 'challenges', key: 'title-plain', value: 'Implementation', sortOrder: 81 },
    { page: PAGE, section: 'challenges', key: 'title-highlight', value: 'Success', sortOrder: 82 },
    { page: PAGE, section: 'challenges', key: 'paragraph-1', value: 'While the PAFT iWMS offers numerous advantages, businesses must consider potential challenges such as initial setup costs and training requirements. Understanding these factors is crucial for a successful implementation and maximizing benefits.', sortOrder: 83 },
    { page: PAGE, section: 'challenges', key: 'paragraph-2', value: 'However, the long-term ROI typically outweighs these initial investments. PAFT provides comprehensive onboarding support and training programs to ensure your team is fully equipped to leverage the system\u2019s capabilities from day one.', sortOrder: 84 },
    { page: PAGE, section: 'challenges', key: 'quote', value: 'PAFT provides comprehensive onboarding support to ensure your team is fully equipped from day one.', sortOrder: 85 },

    // ─── Conclusion / CTA Section ───
    { page: PAGE, section: 'conclusion', key: 'title-plain', value: 'Transform Your', sortOrder: 90 },
    { page: PAGE, section: 'conclusion', key: 'title-highlight', value: 'Operations', sortOrder: 91 },
    { page: PAGE, section: 'conclusion', key: 'paragraph-1', value: 'The PAFT iWMS with RFID technology revolutionizes inventory management. By embracing this innovative solution, businesses can achieve unprecedented levels of efficiency, accuracy, and operational excellence in their warehouse operations.', sortOrder: 92 },
    { page: PAGE, section: 'conclusion', key: 'paragraph-2', value: 'From real-time tracking to seamless ERP integration, PAFT provides a complete ecosystem that transforms how you manage inventory. Take the first step towards smarter warehouse management.', sortOrder: 93 },
    { page: PAGE, section: 'conclusion', key: 'cta-primary', value: 'Request a Demo →', sortOrder: 94 },
    { page: PAGE, section: 'conclusion', key: 'cta-secondary', value: 'Explore Products', sortOrder: 95 },
];

async function addInnovativeSolutionsContent() {
    try {
        console.log('🔌 Connecting to database...');
        await dataSource.initialize();
        console.log('✅ Database connection established');

        const contentRepository = dataSource.getRepository(Content);

        console.log('🧹 Clearing existing innovative-solutions content...');
        await contentRepository.delete({ page: PAGE });
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
