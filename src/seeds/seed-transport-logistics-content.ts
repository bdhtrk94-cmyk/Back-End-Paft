import { DataSource } from 'typeorm';
import { Content } from '../content/entities/content.entity';

export async function seedTransportLogisticsContent(dataSource: DataSource) {
    const contentRepository = dataSource.getRepository(Content);

    // Delete existing content for this page so we can re-seed with correct data
    await contentRepository.delete({ page: 'transport-logistics' });
    console.log('🗑️  Cleared existing transport-logistics content');

    const transportLogisticsContent = [
        // ── Hero Section ──
        {
            page: 'transport-logistics',
            section: 'hero',
            key: 'badge-text',
            value: 'PAFT Product Range',
            sortOrder: 1,
        },
        {
            page: 'transport-logistics',
            section: 'hero',
            key: 'title',
            value: 'Transport & Logistics Items',
            sortOrder: 2,
        },
        {
            page: 'transport-logistics',
            section: 'hero',
            key: 'description',
            value: 'Innovative foldable IBCs, reusable plastic crates, sheet separators, and gallon racks — engineered for modern supply chains with maximum efficiency and sustainability.',
            sortOrder: 3,
        },

        // ── Products Section Title ──
        {
            page: 'transport-logistics',
            section: 'products',
            key: 'section-title',
            value: 'Our Catalogue',
            sortOrder: 10,
        },
        {
            page: 'transport-logistics',
            section: 'products',
            key: 'section-subtitle',
            value: 'Foldable IBCs · RPC Crates · Accessories',
            sortOrder: 11,
        },

        // ── Product 1: Foldable IBC ──
        {
            page: 'transport-logistics',
            section: 'product-1',
            key: 'title',
            value: 'Foldable IBC - 1000 Lit',
            sortOrder: 20,
        },
        {
            page: 'transport-logistics',
            section: 'product-1',
            key: 'image',
            value: 'https://paft.eg/wp-content/uploads/2025/11/WhatsApp_Image_2025-11-25_at_5.14.27_PM-removebg-preview.png',
            sortOrder: 21,
        },
        {
            page: 'transport-logistics',
            section: 'product-1',
            key: 'subtitle',
            value: '',
            sortOrder: 22,
        },
        {
            page: 'transport-logistics',
            section: 'product-1',
            key: 'spec-headers',
            value: 'Types of Truck, 2.6m Standard Trailer, 3m Mega road train',
            sortOrder: 23,
        },
        {
            page: 'transport-logistics',
            section: 'product-1',
            key: 'spec-row-1',
            value: 'IC 1040, 208, 270',
            sortOrder: 24,
        },
        {
            page: 'transport-logistics',
            section: 'product-1',
            key: 'spec-row-2',
            value: 'Industry standard IBC, 130, 180',
            sortOrder: 25,
        },
        {
            page: 'transport-logistics',
            section: 'product-1',
            key: 'spec-row-3',
            value: 'Improvement rate, 60% More, 50% More',
            sortOrder: 26,
        },
        {
            page: 'transport-logistics',
            section: 'product-1',
            key: 'price-label',
            value: 'On Call',
            sortOrder: 27,
        },

        // ── Product 2: RPC 6419 ──
        {
            page: 'transport-logistics',
            section: 'product-2',
            key: 'title',
            value: 'RPC 6419',
            sortOrder: 30,
        },
        {
            page: 'transport-logistics',
            section: 'product-2',
            key: 'image',
            value: 'https://paft.eg/wp-content/uploads/2026/02/WhatsApp_Image_2026-02-05_at_4.37.38_PM-removebg-preview.png',
            sortOrder: 31,
        },
        {
            page: 'transport-logistics',
            section: 'product-2',
            key: 'subtitle',
            value: '600x400x195mm',
            sortOrder: 32,
        },
        {
            page: 'transport-logistics',
            section: 'product-2',
            key: 'spec-row-1',
            value: 'External Dimension, 600*400*195 mm',
            sortOrder: 33,
        },
        {
            page: 'transport-logistics',
            section: 'product-2',
            key: 'spec-row-2',
            value: 'Internal Dimension, 576*376*180 mm',
            sortOrder: 34,
        },
        {
            page: 'transport-logistics',
            section: 'product-2',
            key: 'spec-row-3',
            value: 'Tare weight, 1.8 KG',
            sortOrder: 35,
        },
        {
            page: 'transport-logistics',
            section: 'product-2',
            key: 'spec-row-4',
            value: 'Volume capacity, 39 L',
            sortOrder: 36,
        },
        {
            page: 'transport-logistics',
            section: 'product-2',
            key: 'spec-row-5',
            value: 'Unit load, 20 KG',
            sortOrder: 37,
        },
        {
            page: 'transport-logistics',
            section: 'product-2',
            key: 'price-label',
            value: 'On Call',
            sortOrder: 38,
        },

        // ── Product 3: RPC 6422 ──
        {
            page: 'transport-logistics',
            section: 'product-3',
            key: 'title',
            value: 'RPC 6422',
            sortOrder: 40,
        },
        {
            page: 'transport-logistics',
            section: 'product-3',
            key: 'image',
            value: 'https://paft.eg/wp-content/uploads/2026/02/WhatsApp_Image_2026-02-05_at_4.40.55_PM-removebg-preview.png',
            sortOrder: 41,
        },
        {
            page: 'transport-logistics',
            section: 'product-3',
            key: 'subtitle',
            value: '600x400x225mm',
            sortOrder: 42,
        },
        {
            page: 'transport-logistics',
            section: 'product-3',
            key: 'spec-row-1',
            value: 'External Dimension, 600*400*225 mm',
            sortOrder: 43,
        },
        {
            page: 'transport-logistics',
            section: 'product-3',
            key: 'spec-row-2',
            value: 'Internal Dimension, 576*376*212 mm',
            sortOrder: 44,
        },
        {
            page: 'transport-logistics',
            section: 'product-3',
            key: 'spec-row-3',
            value: 'Tare weight, 2.0 KG',
            sortOrder: 45,
        },
        {
            page: 'transport-logistics',
            section: 'product-3',
            key: 'spec-row-4',
            value: 'Volume capacity, 47 L',
            sortOrder: 46,
        },
        {
            page: 'transport-logistics',
            section: 'product-3',
            key: 'spec-row-5',
            value: 'Unit load, 22 KG',
            sortOrder: 47,
        },
        {
            page: 'transport-logistics',
            section: 'product-3',
            key: 'price-label',
            value: 'On Call',
            sortOrder: 48,
        },

        // ── Product 4: RPC 6430 ──
        {
            page: 'transport-logistics',
            section: 'product-4',
            key: 'title',
            value: 'RPC 6430',
            sortOrder: 50,
        },
        {
            page: 'transport-logistics',
            section: 'product-4',
            key: 'image',
            value: 'https://paft.eg/wp-content/uploads/2026/02/image-removebg-preview-1.png',
            sortOrder: 51,
        },
        {
            page: 'transport-logistics',
            section: 'product-4',
            key: 'subtitle',
            value: '600x400x300mm',
            sortOrder: 52,
        },
        {
            page: 'transport-logistics',
            section: 'product-4',
            key: 'spec-row-1',
            value: 'External Dimension, 600*400*300 mm',
            sortOrder: 53,
        },
        {
            page: 'transport-logistics',
            section: 'product-4',
            key: 'spec-row-2',
            value: 'Internal Dimension, 576*376*291 mm',
            sortOrder: 54,
        },
        {
            page: 'transport-logistics',
            section: 'product-4',
            key: 'spec-row-3',
            value: 'Tare weight, 2.8 KG',
            sortOrder: 55,
        },
        {
            page: 'transport-logistics',
            section: 'product-4',
            key: 'spec-row-4',
            value: 'Volume capacity, 61 L',
            sortOrder: 56,
        },
        {
            page: 'transport-logistics',
            section: 'product-4',
            key: 'spec-row-5',
            value: 'Unit load, 30 KG',
            sortOrder: 57,
        },
        {
            page: 'transport-logistics',
            section: 'product-4',
            key: 'price-label',
            value: 'On Call',
            sortOrder: 58,
        },

        // ── Product 5: Large Foldable Crate ──
        {
            page: 'transport-logistics',
            section: 'product-5',
            key: 'title',
            value: 'Large Foldable Crate',
            sortOrder: 60,
        },
        {
            page: 'transport-logistics',
            section: 'product-5',
            key: 'image',
            value: 'https://paft.eg/wp-content/uploads/2026/02/image-removebg-preview.png',
            sortOrder: 61,
        },
        {
            page: 'transport-logistics',
            section: 'product-5',
            key: 'subtitle',
            value: '800x600x984mm',
            sortOrder: 62,
        },
        {
            page: 'transport-logistics',
            section: 'product-5',
            key: 'spec-row-1',
            value: 'External Dimension, 800*600*984 mm',
            sortOrder: 63,
        },
        {
            page: 'transport-logistics',
            section: 'product-5',
            key: 'spec-row-2',
            value: 'Internal Dimension, 760*560*852 mm',
            sortOrder: 64,
        },
        {
            page: 'transport-logistics',
            section: 'product-5',
            key: 'spec-row-3',
            value: 'Folding height, 334 mm',
            sortOrder: 65,
        },
        {
            page: 'transport-logistics',
            section: 'product-5',
            key: 'spec-row-4',
            value: 'Tare weight, 25 KG',
            sortOrder: 66,
        },
        {
            page: 'transport-logistics',
            section: 'product-5',
            key: 'spec-row-5',
            value: 'Volume capacity, 368 L',
            sortOrder: 67,
        },
        {
            page: 'transport-logistics',
            section: 'product-5',
            key: 'spec-row-6',
            value: 'Unit load, 250 KG',
            sortOrder: 68,
        },
        {
            page: 'transport-logistics',
            section: 'product-5',
            key: 'price-label',
            value: 'On Call',
            sortOrder: 69,
        },

        // ── Product 6: RPC 6411 ──
        {
            page: 'transport-logistics',
            section: 'product-6',
            key: 'title',
            value: 'RPC 6411',
            sortOrder: 70,
        },
        {
            page: 'transport-logistics',
            section: 'product-6',
            key: 'image',
            value: 'https://paft.eg/wp-content/uploads/2026/02/WhatsApp_Image_2026-02-05_at_4.06.42_PM-removebg-preview-2.png',
            sortOrder: 71,
        },
        {
            page: 'transport-logistics',
            section: 'product-6',
            key: 'subtitle',
            value: '600x400x115mm',
            sortOrder: 72,
        },
        {
            page: 'transport-logistics',
            section: 'product-6',
            key: 'spec-row-1',
            value: 'External Dimension, 600*400*115 mm',
            sortOrder: 73,
        },
        {
            page: 'transport-logistics',
            section: 'product-6',
            key: 'spec-row-2',
            value: 'Internal Dimension, 576*376*105 mm',
            sortOrder: 74,
        },
        {
            page: 'transport-logistics',
            section: 'product-6',
            key: 'spec-row-3',
            value: 'Tare weight, 1.5 KG',
            sortOrder: 75,
        },
        {
            page: 'transport-logistics',
            section: 'product-6',
            key: 'spec-row-4',
            value: 'Volume capacity, 23 L',
            sortOrder: 76,
        },
        {
            page: 'transport-logistics',
            section: 'product-6',
            key: 'spec-row-5',
            value: 'Unit load, 15 KG',
            sortOrder: 77,
        },
        {
            page: 'transport-logistics',
            section: 'product-6',
            key: 'price-label',
            value: 'On Call',
            sortOrder: 78,
        },

        // ── Product 7: Sheet Separators ──
        {
            page: 'transport-logistics',
            section: 'product-7',
            key: 'title',
            value: 'Sheet Separators',
            sortOrder: 80,
        },
        {
            page: 'transport-logistics',
            section: 'product-7',
            key: 'image',
            value: 'https://paft.eg/wp-content/uploads/2025/11/WhatsApp_Image_2025-11-25_at_5.14.26_PM-removebg-preview.png',
            sortOrder: 81,
        },

        // ── Product 8: Gallon Racks ──
        {
            page: 'transport-logistics',
            section: 'product-8',
            key: 'title',
            value: 'Gallon Racks',
            sortOrder: 90,
        },
        {
            page: 'transport-logistics',
            section: 'product-8',
            key: 'image',
            value: 'https://paft.eg/wp-content/uploads/2025/06/f2883d_1160983ac47f4db8b0586f4a4f0d4a93_mv2-removebg-preview-1.png',
            sortOrder: 91,
        },
        {
            page: 'transport-logistics',
            section: 'product-8',
            key: 'features',
            value: 'The 4 pc\'s Set, The 8 pc\'s Set',
            sortOrder: 92,
        },

        // ── CTA Section ──
        {
            page: 'transport-logistics',
            section: 'cta',
            key: 'cta-title',
            value: 'Need a Custom Quote?',
            sortOrder: 100,
        },
        {
            page: 'transport-logistics',
            section: 'cta',
            key: 'cta-description',
            value: 'We offer tailored solutions for crates, IBCs, and logistics accessories',
            sortOrder: 101,
        },
    ];

    const contentEntities = transportLogisticsContent.map(item =>
        contentRepository.create(item),
    );
    await contentRepository.save(contentEntities);
    console.log(`✅ Transport Logistics content seeded successfully (${contentEntities.length} items)`);
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
            await seedTransportLogisticsContent(dataSource);
            await dataSource.destroy();
        } catch (error) {
            console.error('Error seeding transport-logistics content:', error);
            process.exit(1);
        }
    });
}
