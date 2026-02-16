
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Content } from '../content/entities/content.entity';

dotenv.config();

// Re-defining the product data to ensure consistency with the products table
// This matches the data from file.tsx and seed-final-plastic-pallets.ts

const heavyDutyContent = [
    { section: 'product-m1', name: 'M1 Heavy Duty Pallet', dimensions: '1000 × 1200 × 150 mm', design: '3 SKID', staticLoad: 'Up to 10.0 Tons', dynamicLoad: 'Up to 4.0 Tons', rackLoad: 'Up to 1.75 Tons', expectedLife: 'Up to 10 Years' },
    { section: 'product-m2', name: 'M2 Heavy Duty Pallet', dimensions: '1100 × 1300 × 150 mm', design: '3 SKID', staticLoad: 'Up to 8.0 Tons', dynamicLoad: 'Up to 3.0 Tons', rackLoad: 'Up to 2 Tons', expectedLife: 'Up to 10 Years' },
    { section: 'product-m4', name: 'M4 Heavy Duty Pallet', dimensions: '1000 × 1200 × 150 mm', design: 'Double Face', staticLoad: 'Up to 6.0 Tons', dynamicLoad: 'Up to 2.5 Tons', rackLoad: 'Up to 1.5 Tons', expectedLife: 'Up to 10 Years' },
    { section: 'product-m5', name: 'M5 Heavy Duty Pallet', dimensions: '800 × 1200 × 150 mm', design: '3 SKID', staticLoad: 'Up to 8.0 Tons', dynamicLoad: 'Up to 3 Tons', rackLoad: 'Up to 1.75 Tons', expectedLife: 'Up to 10 Years' },
    { section: 'product-m6', name: 'M6 Heavy Duty Pallet', dimensions: '1000 × 1200 × 150 mm', design: '3 SKID', staticLoad: 'Up to 10.0 Tons', dynamicLoad: 'Up to 4.0 Tons', rackLoad: 'Up to 2.0 Tons', expectedLife: 'Up to 10 Years' },
    { section: 'product-m7', name: 'M7 Heavy Duty Pallet', dimensions: '1200 × 1200 × 150 mm', design: '3 SKID', staticLoad: 'Up to 10.0 Tons', dynamicLoad: 'Up to 4.0 Tons', rackLoad: 'Up to 2.0 Tons', expectedLife: 'Up to 10 Years' },
    { section: 'product-m8', name: 'M8 Heavy Duty Pallet', dimensions: '1140 × 1140 × 150 mm', design: '3 SKID', staticLoad: 'Up to 10.0 Tons', dynamicLoad: 'Up to 4.0 Tons', rackLoad: 'Up to 2 Tons', expectedLife: 'Up to 10 Years' },
    { section: 'product-m9', name: 'M9 Heavy Duty Pallet', dimensions: '1100 × 1100 × 150 mm', design: '3 SKID', staticLoad: 'Up to 10.0 Tons', dynamicLoad: 'Up to 4.0 Tons', rackLoad: 'Up to 2 Tons', expectedLife: 'Up to 10 Years' },
];

const lightDutyContent = [
    { section: 'product-double-deck', name: 'Double Deck', dimensions: '1000 × 1200 × 130 mm', design: 'Double Deck', weight: '7.2 kg', staticLoad: '1 Ton', dynamicLoad: '1 Ton', rackLoad: 'Non-Rackable', expectedLife: 'Export Grade' },
    { section: 'product-9-leg', name: '9 Leg', dimensions: '1000 × 1200 × 140 mm', design: '9-Leg', weight: '5.5 kg', staticLoad: '0.75 Ton', dynamicLoad: '0.75 Ton', rackLoad: 'Non-Rackable', expectedLife: 'Export Grade' },
];

const rentalContent = [
    { section: 'product-rental', name: 'Rental Pallet', dimensions: '1000 × 1200 × 150 mm', design: 'Heavy Duty', staticLoad: 'Up to 10.0 Tons', dynamicLoad: 'Up to 4.0 Tons', rackLoad: 'Up to 2.0 Tons', expectedLife: '10+ Years' },
];

async function seedContent() {
    const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 3306,
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_DATABASE || 'paft_cms',
        entities: [Content],
        synchronize: false,
    });

    await dataSource.initialize();
    console.log('Connected to database to sync content');

    const contentRepo = dataSource.getRepository(Content);
    const page = 'plastic-pallets';

    const allItems = [...heavyDutyContent, ...lightDutyContent, ...rentalContent];

    for (const item of allItems) {
        const { section, name, dimensions, design, staticLoad, dynamicLoad, rackLoad, expectedLife, weight } = item as any;

        const fields: Record<string, string> = {
            'product-name': name,
            'dimensions': dimensions,
            'design': design,
            'static-load': staticLoad,
            'dynamic-load': dynamicLoad,
            'rack-load': rackLoad,
            'expected-life': expectedLife
        };

        if (weight) {
            fields['weight'] = weight;
        }

        for (const [key, value] of Object.entries(fields)) {
            // Check if content exists
            let content = await contentRepo.findOne({
                where: { page, section, key }
            });

            if (content) {
                content.value = value;
                await contentRepo.save(content);
                console.log(`Updated content: ${section} - ${key}`);
            } else {
                content = contentRepo.create({
                    page,
                    section,
                    key,
                    value: value,
                    sortOrder: 0
                });
                await contentRepo.save(content);
                console.log(`Created content: ${section} - ${key}`);
            }
        }
    }

    console.log('✅ Synced plastic pallets content successfully!');
    await dataSource.destroy();
}

seedContent().catch((err) => {
    console.error('Content seed failed:', err);
    process.exit(1);
});
