
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Product } from '../products/entities/product.entity';

dotenv.config();

// Heavy Duty Products (M1, M2, M4, M5, M6, M7, M8, M9)
const heavyDutyProducts = [
    {
        name: 'M1 Heavy Duty Pallet',
        slug: 'm1-heavy-duty',
        category: 'heavy-duty',
        image: 'https://paft.eg/wp-content/uploads/2025/11/Screenshot_2025-11-26_212516-removebg-preview.png',
        dimensions: '1000 × 1200 × 150 mm',
        design: '3 SKID',
        staticLoad: 'Up to 10.0 Tons',
        dynamicLoad: 'Up to 4.0 Tons',
        rackLoad: 'Up to 1.75 Tons',
        expectedLife: 'Up to 10 Years',
        price: 0,
        inStock: true,
        rating: 5,
        reviewCount: 0,
        description: 'Heavy Duty Pallet - 3 SKID Design',
        fullDescription: 'Dimensions: 1000 × 1200 × 150 mm\nDesign: 3 SKID\nStatic Load: Up to 10.0 Tons\nDynamic Load: Up to 4.0 Tons\nRack Load: Up to 1.75 Tons\nExpected Life: Up to 10 Years'
    },
    {
        name: 'M2 Heavy Duty Pallet',
        slug: 'm2-heavy-duty',
        category: 'heavy-duty',
        image: 'https://paft.eg/wp-content/uploads/2025/11/Screenshot_2025-11-26_212441-removebg-preview.png',
        dimensions: '1100 × 1300 × 150 mm',
        design: '3 SKID',
        staticLoad: 'Up to 8.0 Tons',
        dynamicLoad: 'Up to 3.0 Tons',
        rackLoad: 'Up to 2 Tons',
        expectedLife: 'Up to 10 Years',
        price: 0,
        inStock: true,
        rating: 5,
        reviewCount: 0,
        description: 'Heavy Duty Pallet - 3 SKID Design',
        fullDescription: 'Dimensions: 1100 × 1300 × 150 mm\nDesign: 3 SKID\nStatic Load: Up to 8.0 Tons\nDynamic Load: Up to 3.0 Tons\nRack Load: Up to 2 Tons\nExpected Life: Up to 10 Years'
    },
    {
        name: 'M4 Heavy Duty Pallet',
        slug: 'm4-heavy-duty',
        category: 'heavy-duty',
        image: 'https://paft.eg/wp-content/uploads/2025/11/Screenshot_2025-11-26_212558-removebg-preview.png',
        dimensions: '1000 × 1200 × 150 mm',
        design: 'Double Face',
        staticLoad: 'Up to 6.0 Tons',
        dynamicLoad: 'Up to 2.5 Tons',
        rackLoad: 'Up to 1.5 Tons',
        expectedLife: 'Up to 10 Years',
        price: 0,
        inStock: true,
        rating: 5,
        reviewCount: 0,
        description: 'Heavy Duty Pallet - Double Face Design',
        fullDescription: 'Dimensions: 1000 × 1200 × 150 mm\nDesign: Double Face\nStatic Load: Up to 6.0 Tons\nDynamic Load: Up to 2.5 Tons\nRack Load: Up to 1.5 Tons\nExpected Life: Up to 10 Years'
    },
    {
        name: 'M5 Heavy Duty Pallet',
        slug: 'm5-heavy-duty',
        category: 'heavy-duty',
        image: 'https://paft.eg/wp-content/uploads/2025/11/Screenshot_2025-11-26_212704-removebg-preview.png',
        dimensions: '800 × 1200 × 150 mm',
        design: '3 SKID',
        staticLoad: 'Up to 8.0 Tons',
        dynamicLoad: 'Up to 3 Tons',
        rackLoad: 'Up to 1.75 Tons',
        expectedLife: 'Up to 10 Years',
        price: 0,
        inStock: true,
        rating: 5,
        reviewCount: 0,
        description: 'Heavy Duty Pallet - 3 SKID Design',
        fullDescription: 'Dimensions: 800 × 1200 × 150 mm\nDesign: 3 SKID\nStatic Load: Up to 8.0 Tons\nDynamic Load: Up to 3 Tons\nRack Load: Up to 1.75 Tons\nExpected Life: Up to 10 Years'
    },
    {
        name: 'M6 Heavy Duty Pallet',
        slug: 'm6-heavy-duty',
        category: 'heavy-duty',
        image: 'https://paft.eg/wp-content/uploads/2025/11/Screenshot_2025-11-26_212637-removebg-preview.png',
        dimensions: '1000 × 1200 × 150 mm',
        design: '3 SKID',
        staticLoad: 'Up to 10.0 Tons',
        dynamicLoad: 'Up to 4.0 Tons',
        rackLoad: 'Up to 2.0 Tons',
        expectedLife: 'Up to 10 Years',
        price: 0,
        inStock: true,
        rating: 5,
        reviewCount: 0,
        description: 'Heavy Duty Pallet - 3 SKID Design',
        fullDescription: 'Dimensions: 1000 × 1200 × 150 mm\nDesign: 3 SKID\nStatic Load: Up to 10.0 Tons\nDynamic Load: Up to 4.0 Tons\nRack Load: Up to 2.0 Tons\nExpected Life: Up to 10 Years'
    },
    {
        name: 'M7 Heavy Duty Pallet',
        slug: 'm7-heavy-duty',
        category: 'heavy-duty',
        image: 'https://paft.eg/wp-content/uploads/2025/11/Screenshot_2025-11-26_212322-removebg-preview.png',
        dimensions: '1200 × 1200 × 150 mm',
        design: '3 SKID',
        staticLoad: 'Up to 10.0 Tons',
        dynamicLoad: 'Up to 4.0 Tons',
        rackLoad: 'Up to 2.0 Tons',
        expectedLife: 'Up to 10 Years',
        price: 0,
        inStock: true,
        rating: 5,
        reviewCount: 0,
        description: 'Heavy Duty Pallet - 3 SKID Design',
        fullDescription: 'Dimensions: 1200 × 1200 × 150 mm\nDesign: 3 SKID\nStatic Load: Up to 10.0 Tons\nDynamic Load: Up to 4.0 Tons\nRack Load: Up to 2.0 Tons\nExpected Life: Up to 10 Years'
    },
    {
        name: 'M8 Heavy Duty Pallet',
        slug: 'm8-heavy-duty',
        category: 'heavy-duty',
        image: 'https://paft.eg/wp-content/uploads/2025/11/Screenshot_2025-11-26_212322-removebg-preview.png',
        dimensions: '1140 × 1140 × 150 mm',
        design: '3 SKID',
        staticLoad: 'Up to 10.0 Tons',
        dynamicLoad: 'Up to 4.0 Tons',
        rackLoad: 'Up to 2 Tons',
        expectedLife: 'Up to 10 Years',
        price: 0,
        inStock: true,
        rating: 5,
        reviewCount: 0,
        description: 'Heavy Duty Pallet - 3 SKID Design',
        fullDescription: 'Dimensions: 1140 × 1140 × 150 mm\nDesign: 3 SKID\nStatic Load: Up to 10.0 Tons\nDynamic Load: Up to 4.0 Tons\nRack Load: Up to 2 Tons\nExpected Life: Up to 10 Years'
    },
    {
        name: 'M9 Heavy Duty Pallet',
        slug: 'm9-heavy-duty',
        category: 'heavy-duty',
        image: 'https://paft.eg/wp-content/uploads/2025/11/Screenshot_2025-11-26_212516-removebg-preview.png',
        dimensions: '1100 × 1100 × 150 mm',
        design: '3 SKID',
        staticLoad: 'Up to 10.0 Tons',
        dynamicLoad: 'Up to 4.0 Tons',
        rackLoad: 'Up to 2 Tons',
        expectedLife: 'Up to 10 Years',
        price: 0,
        inStock: true,
        rating: 5,
        reviewCount: 0,
        description: 'Heavy Duty Pallet - 3 SKID Design',
        fullDescription: 'Dimensions: 1100 × 1100 × 150 mm\nDesign: 3 SKID\nStatic Load: Up to 10.0 Tons\nDynamic Load: Up to 4.0 Tons\nRack Load: Up to 2 Tons\nExpected Life: Up to 10 Years'
    }
];

// Light Duty Products (Double Deck, 9 Leg)
const lightDutyProducts = [
    {
        name: 'Double Deck',
        slug: 'double-deck-light',
        category: 'light-duty',
        image: 'https://paft.eg/wp-content/uploads/2025/11/WhatsApp_Image_2025-11-25_at_11.31.19_AM-removebg-preview.png',
        dimensions: '1000 × 1200 × 130 mm',
        design: 'Double Deck',
        weight: '7.2 kg', // Mapped to weight field
        staticLoad: '1 Ton',
        dynamicLoad: '1 Ton',
        rackLoad: 'Non-Rackable',
        expectedLife: 'Export Grade',
        price: 0,
        inStock: true,
        rating: 5,
        reviewCount: 0,
        description: 'Light Duty Pallet - Double Deck Design',
        fullDescription: 'Dimensions: 1000 × 1200 × 130 mm\nDesign: Double Deck\nWeight: 7.2 kg\nStatic Load: 1 Ton\nDynamic Load: 1 Ton\nRack Load: Non-Rackable\nExpected Life: Export Grade'
    },
    {
        name: '9 Leg',
        slug: '9-leg-light',
        category: 'light-duty',
        image: 'https://paft.eg/wp-content/uploads/2025/11/WhatsApp_Image_2025-11-25_at_11.45.00_AM-removebg-preview.png',
        dimensions: '1000 × 1200 × 140 mm',
        design: '9-Leg',
        weight: '5.5 kg',
        staticLoad: '0.75 Ton',
        dynamicLoad: '0.75 Ton',
        rackLoad: 'Non-Rackable',
        expectedLife: 'Export Grade',
        price: 0,
        inStock: true,
        rating: 5,
        reviewCount: 0,
        description: 'Light Duty Pallet - 9-Leg Design',
        fullDescription: 'Dimensions: 1000 × 1200 × 140 mm\nDesign: 9-Leg\nWeight: 5.5 kg\nStatic Load: 0.75 Ton\nDynamic Load: 0.75 Ton\nRack Load: Non-Rackable\nExpected Life: Export Grade'
    }
];

// Rental Product
const rentalProducts = [
    {
        name: 'Rental Pallet',
        slug: 'rental-pallet',
        category: 'rental',
        image: 'https://paft.eg/wp-content/uploads/2025/11/output-onlinepngtools.png',
        dimensions: '1000 × 1200 × 150 mm',
        design: 'Heavy Duty',
        staticLoad: 'Up to 10.0 Tons',
        dynamicLoad: 'Up to 4.0 Tons',
        rackLoad: 'Up to 2.0 Tons',
        expectedLife: '10+ Years',
        price: 0,
        inStock: true,
        rating: 5,
        reviewCount: 0,
        description: 'Rental Pallet Service',
        fullDescription: 'Dimensions: 1000 × 1200 × 150 mm\nDesign: Heavy Duty\nStatic Load: Up to 10.0 Tons\nDynamic Load: Up to 4.0 Tons\nRack Load: Up to 2.0 Tons\nExpected Life: 10+ Years'
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
        synchronize: false,
    });

    await dataSource.initialize();
    console.log('Connected to database');

    const repo = dataSource.getRepository(Product);

    const allProducts = [...heavyDutyProducts, ...lightDutyProducts, ...rentalProducts];

    // Logic: 
    // 1. Delete existing products in these categories
    // 2. Insert new products

    const categories = ['heavy-duty', 'light-duty', 'rental'];
    for (const cat of categories) {
        console.log(`Clearing existing products in category: ${cat}`);
        const existing = await repo.find({ where: { category: cat } });
        if (existing.length > 0) {
            await repo.remove(existing);
            console.log(`Deleted ${existing.length} products`);
        }
    }

    console.log('Inserting new products...');
    for (const p of allProducts) {
        const product = repo.create(p);
        await repo.save(product);
        console.log(`Inserted: ${p.name}`);
    }

    console.log(`✅ Seeded ${allProducts.length} products successfully with correct slugs!`);
    await dataSource.destroy();
}

seed().catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
});
