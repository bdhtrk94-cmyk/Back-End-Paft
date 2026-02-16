
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Product } from '../products/entities/product.entity';

dotenv.config();

const heavyDutyProducts = [
    {
        name: 'M4 Heavy Duty Pallet',
        price: 120.0,
        category: 'heavy-duty',
        image: 'https://paft.eg/wp-content/uploads/2025/11/Screenshot_2025-11-26_212516-removebg-preview.png',
        description: '1200 x 1000 x 150 mm | 3 SKID | Static: 9T | Dynamic: 3.5T',
        fullDescription: 'Dimensions: 1200 x 1000 x 150 mm\nDesign: 3 SKID\nStatic Load: Up to 9.0 Tons\nDynamic Load: Up to 3.5 Tons\nRack Load: Up to 1.8 Tons\nExpected Life: 10+ Years',
        inStock: true,
        rating: 5,
        reviewCount: 12
    },
    {
        name: 'M5 Heavy Duty Pallet',
        price: 115.0,
        category: 'heavy-duty',
        image: 'https://paft.eg/wp-content/uploads/2025/11/Screenshot_2025-11-26_212516-removebg-preview.png',
        description: '1200 x 800 x 150 mm | 3 SKID | Static: 8.5T | Dynamic: 3.2T',
        fullDescription: 'Dimensions: 1200 x 800 x 150 mm\nDesign: 3 SKID\nStatic Load: Up to 8.5 Tons\nDynamic Load: Up to 3.2 Tons\nRack Load: Up to 1.6 Tons\nExpected Life: 10+ Years',
        inStock: true,
        rating: 4.8,
        reviewCount: 8
    },
    {
        name: 'M7 Heavy Duty Pallet',
        price: 130.0,
        category: 'heavy-duty',
        image: 'https://paft.eg/wp-content/uploads/2025/11/Screenshot_2025-11-26_212516-removebg-preview.png',
        description: '1200 x 1200 x 150 mm | 3 SKID | Static: 12T | Dynamic: 4.5T',
        fullDescription: 'Dimensions: 1200 x 1200 x 150 mm\nDesign: 3 SKID\nStatic Load: Up to 12.0 Tons\nDynamic Load: Up to 4.5 Tons\nRack Load: Up to 2.2 Tons\nExpected Life: 10+ Years',
        inStock: true,
        rating: 5,
        reviewCount: 15
    },
    {
        name: 'M9 Heavy Duty Pallet',
        price: 95.0,
        category: 'heavy-duty',
        image: 'https://paft.eg/wp-content/uploads/2025/11/Screenshot_2025-11-26_212516-removebg-preview.png',
        description: '800 x 1200 x 150 mm | 3 SKID | Static: 7T | Dynamic: 2.5T',
        fullDescription: 'Dimensions: 800 x 1200 x 150 mm\nDesign: 3 SKID\nStatic Load: Up to 7.0 Tons\nDynamic Load: Up to 2.5 Tons\nRack Load: Up to 1.2 Tons\nExpected Life: 10+ Years',
        inStock: true,
        rating: 4.7,
        reviewCount: 10
    }
];

const lightDutyProducts = [
    {
        name: 'Double Deck Light',
        price: 45.0,
        category: 'light-duty',
        image: 'https://paft.eg/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-24-at-12.57.33-PM.jpeg',
        description: '100% Recycled Material | 4 Ways Entry | Anti Slip',
        fullDescription: 'Dimensions: 1200 x 1000 x 150 mm\nDesign: Double Deck\nWeight: 8 kg\nStatic Load: 1000 kg\nDynamic Load: 800 kg\nFeature: No Nails, No Product Damage',
        inStock: true,
        rating: 4.5,
        reviewCount: 20
    },
    {
        name: '9 Leg Light',
        price: 40.0,
        category: 'light-duty',
        image: 'https://paft.eg/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-24-at-12.57.33-PM.jpeg',
        description: 'Space-saving nestable pallet | One-way shipping',
        fullDescription: 'Dimensions: 1200 x 1000 x 150 mm\nDesign: 9 Legs\nWeight: 7 kg\nStatic Load: 1200 kg\nDynamic Load: 900 kg\nFeature: SPM 15 Certified',
        inStock: true,
        rating: 4.6,
        reviewCount: 18
    }
];

const rentalProducts = [
    {
        name: 'Rental Pallet Service',
        price: 0.0, // Contact for pricing
        category: 'rental',
        image: 'https://paft.eg/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-08-at-3.13.59-PM.jpeg',
        description: 'Flexible rental service tailored to your specific needs',
        fullDescription: 'Convert pallet costs from CAPEX to OPEX. Misuse and abuse protection included. Short and long-term periods available. Cost-effective solution without capital investment.',
        inStock: true,
        rating: 5,
        reviewCount: 5
    }
];

async function seed() {
    const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 3306,
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_DATABASE || 'paft_cms',
        entities: [Product],
        synchronize: false, // Don't sync, just use existing tables
    });

    await dataSource.initialize();
    console.log('Connected to database');

    const repo = dataSource.getRepository(Product);

    const allNewProducts = [...heavyDutyProducts, ...lightDutyProducts, ...rentalProducts];

    // Check if these products already exist to avoid duplicates
    // We'll delete existing ones with these categories to ensure fresh data
    const categoriesToCheck = ['heavy-duty', 'light-duty', 'rental'];

    for (const category of categoriesToCheck) {
        const existing = await repo.find({ where: { category } });
        if (existing.length > 0) {
            console.log(`Found ${existing.length} existing products in category '${category}'. Deleting them to re-seed...`);
            await repo.remove(existing);
        }
    }

    for (const p of allNewProducts) {
        const product = repo.create(p);
        await repo.save(product);
        console.log(`Inserted product: ${p.name} (${p.category})`);
    }

    console.log(`✅ Seeded ${allNewProducts.length} plastic pallet products successfully!`);
    await dataSource.destroy();
}

seed().catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
});
