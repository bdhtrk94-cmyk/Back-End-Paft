import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { ContentService } from '../content/content.service';

async function seedCompleteTransportLogistics() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const contentService = app.get(ContentService);

    try {
        console.log('🚛 Starting complete transport-logistics content seeding...');

        // Complete content data with English and Arabic
        const contentData = [
            // ── Hero Section ──
            {
                page: 'transport-logistics',
                section: 'hero',
                key: 'badge-text',
                value: 'PAFT Product Range',
                valueAr: 'منتجات بافت',
                sortOrder: 1
            },
            {
                page: 'transport-logistics',
                section: 'hero',
                key: 'title',
                value: 'Transport & Logistics Items',
                valueAr: 'النقل و اللوجستيات',
                sortOrder: 2
            },
            {
                page: 'transport-logistics',
                section: 'hero',
                key: 'description',
                value: 'Innovative foldable IBCs, reusable plastic crates, sheet separators, and gallon racks — engineered for modern supply chains with maximum efficiency and sustainability.',
                valueAr: 'حاويات IBC قابلة للطي مبتكرة، صناديق بلاستيكية قابلة لإعادة الاستخدام، فواصل الألواح، وحوامل الجالون — مصممة لسلاسل التوريد الحديثة بأقصى كفاءة واستدامة.',
                sortOrder: 3
            },

            // ── Products Section Title ──
            {
                page: 'transport-logistics',
                section: 'products',
                key: 'section-title',
                value: 'Our Catalogue',
                valueAr: 'كتالوجنا',
                sortOrder: 1
            },
            {
                page: 'transport-logistics',
                section: 'products',
                key: 'section-subtitle',
                value: 'Foldable IBCs · RPC Crates · Accessories',
                valueAr: 'حاويات IBC قابلة للطي · صناديق RPC · إكسسوارات',
                sortOrder: 2
            },

            // ── Product 1: Foldable IBC ──
            {
                page: 'transport-logistics',
                section: 'product-1',
                key: 'title',
                value: 'Foldable IBC - 1000 Lit',
                valueAr: 'حاوية IBC قابلة للطي - 1000 لتر',
                sortOrder: 1
            },
            {
                page: 'transport-logistics',
                section: 'product-1',
                key: 'image',
                value: 'https://paft.eg/wp-content/uploads/2025/11/WhatsApp_Image_2025-11-25_at_5.14.27_PM-removebg-preview.png',
                valueAr: 'https://paft.eg/wp-content/uploads/2025/11/WhatsApp_Image_2025-11-25_at_5.14.27_PM-removebg-preview.png',
                sortOrder: 2
            },
            {
                page: 'transport-logistics',
                section: 'product-1',
                key: 'subtitle',
                value: 'Intermediate Bulk Container',
                valueAr: 'حاوية سوائب وسيطة',
                sortOrder: 3
            },
            {
                page: 'transport-logistics',
                section: 'product-1',
                key: 'spec-headers',
                value: 'Types of Truck,2.6m Standard Trailer,3m Mega road train',
                valueAr: 'أنواع الشاحنات,مقطورة قياسية 2.6م,قطار طريق ميجا 3م',
                sortOrder: 4
            },
            {
                page: 'transport-logistics',
                section: 'product-1',
                key: 'spec-row-1',
                value: 'IC 1040,208,270',
                valueAr: 'IC 1040,208,270',
                sortOrder: 5
            },
            {
                page: 'transport-logistics',
                section: 'product-1',
                key: 'spec-row-2',
                value: 'Industry standard IBC,130,180',
                valueAr: 'IBC المعيار الصناعي,130,180',
                sortOrder: 6
            },
            {
                page: 'transport-logistics',
                section: 'product-1',
                key: 'spec-row-3',
                value: 'Improvement rate,60% More,50% More',
                valueAr: 'معدل التحسن,60% أكثر,50% أكثر',
                sortOrder: 7
            },
            {
                page: 'transport-logistics',
                section: 'product-1',
                key: 'price-label',
                value: 'On Call',
                valueAr: 'حسب التواصل',
                sortOrder: 8
            },

            // ── Product 2: RPC 6419 ──
            {
                page: 'transport-logistics',
                section: 'product-2',
                key: 'title',
                value: 'RPC 6419',
                valueAr: 'RPC 6419',
                sortOrder: 1
            },
            {
                page: 'transport-logistics',
                section: 'product-2',
                key: 'image',
                value: 'https://paft.eg/wp-content/uploads/2026/02/WhatsApp_Image_2026-02-05_at_4.37.38_PM-removebg-preview.png',
                valueAr: 'https://paft.eg/wp-content/uploads/2026/02/WhatsApp_Image_2026-02-05_at_4.37.38_PM-removebg-preview.png',
                sortOrder: 2
            },
            {
                page: 'transport-logistics',
                section: 'product-2',
                key: 'subtitle',
                value: '600x400x195mm',
                valueAr: '600x400x195mm',
                sortOrder: 3
            },
            {
                page: 'transport-logistics',
                section: 'product-2',
                key: 'spec-row-1',
                value: 'External Dimension,600*400*195 mm',
                valueAr: 'الأبعاد الخارجية,600*400*195 ملم',
                sortOrder: 4
            },
            {
                page: 'transport-logistics',
                section: 'product-2',
                key: 'spec-row-2',
                value: 'Internal Dimension,576*376*180 mm',
                valueAr: 'الأبعاد الداخلية,576*376*180 ملم',
                sortOrder: 5
            },
            {
                page: 'transport-logistics',
                section: 'product-2',
                key: 'spec-row-3',
                value: 'Empty Weight,1.8 kg',
                valueAr: 'الوزن الفارغ,1.8 كيلو',
                sortOrder: 6
            },
            {
                page: 'transport-logistics',
                section: 'product-2',
                key: 'spec-row-4',
                value: 'Volume Capacity,39 L',
                valueAr: 'السعة الحجمية,39 لتر',
                sortOrder: 7
            },
            {
                page: 'transport-logistics',
                section: 'product-2',
                key: 'spec-row-5',
                value: 'Unit Load,20 kg',
                valueAr: 'حمولة الوحدة,20 كيلو',
                sortOrder: 8
            },
            {
                page: 'transport-logistics',
                section: 'product-2',
                key: 'price-label',
                value: 'On Call',
                valueAr: 'حسب التواصل',
                sortOrder: 9
            },

            // ── Product 3: RPC 6422 ──
            {
                page: 'transport-logistics',
                section: 'product-3',
                key: 'title',
                value: 'RPC 6422',
                valueAr: 'RPC 6422',
                sortOrder: 1
            },
            {
                page: 'transport-logistics',
                section: 'product-3',
                key: 'image',
                value: 'https://paft.eg/wp-content/uploads/2026/02/WhatsApp_Image_2026-02-05_at_4.40.55_PM-removebg-preview.png',
                valueAr: 'https://paft.eg/wp-content/uploads/2026/02/WhatsApp_Image_2026-02-05_at_4.40.55_PM-removebg-preview.png',
                sortOrder: 2
            },
            {
                page: 'transport-logistics',
                section: 'product-3',
                key: 'subtitle',
                value: '600x400x225mm',
                valueAr: '600x400x225mm',
                sortOrder: 3
            },
            {
                page: 'transport-logistics',
                section: 'product-3',
                key: 'spec-row-1',
                value: 'External Dimension,600*400*225 mm',
                valueAr: 'الأبعاد الخارجية,600*400*225 ملم',
                sortOrder: 4
            },
            {
                page: 'transport-logistics',
                section: 'product-3',
                key: 'spec-row-2',
                value: 'Internal Dimension,576*376*212 mm',
                valueAr: 'الأبعاد الداخلية,576*376*212 ملم',
                sortOrder: 5
            },
            {
                page: 'transport-logistics',
                section: 'product-3',
                key: 'spec-row-3',
                value: 'Empty Weight,2.0 kg',
                valueAr: 'الوزن الفارغ,2.0 كيلو',
                sortOrder: 6
            },
            {
                page: 'transport-logistics',
                section: 'product-3',
                key: 'spec-row-4',
                value: 'Volume Capacity,47 L',
                valueAr: 'السعة الحجمية,47 لتر',
                sortOrder: 7
            },
            {
                page: 'transport-logistics',
                section: 'product-3',
                key: 'spec-row-5',
                value: 'Unit Load,22 kg',
                valueAr: 'حمولة الوحدة,22 كيلو',
                sortOrder: 8
            },
            {
                page: 'transport-logistics',
                section: 'product-3',
                key: 'price-label',
                value: 'On Call',
                valueAr: 'حسب التواصل',
                sortOrder: 9
            },

            // ── Product 4: RPC 6430 ──
            {
                page: 'transport-logistics',
                section: 'product-4',
                key: 'title',
                value: 'RPC 6430',
                valueAr: 'RPC 6430',
                sortOrder: 1
            },
            {
                page: 'transport-logistics',
                section: 'product-4',
                key: 'image',
                value: 'https://paft.eg/wp-content/uploads/2026/02/image-removebg-preview-1.png',
                valueAr: 'https://paft.eg/wp-content/uploads/2026/02/image-removebg-preview-1.png',
                sortOrder: 2
            },
            {
                page: 'transport-logistics',
                section: 'product-4',
                key: 'subtitle',
                value: '600x400x300mm',
                valueAr: '600x400x300mm',
                sortOrder: 3
            },
            {
                page: 'transport-logistics',
                section: 'product-4',
                key: 'spec-row-1',
                value: 'External Dimension,600*400*300 mm',
                valueAr: 'الأبعاد الخارجية,600*400*300 ملم',
                sortOrder: 4
            },
            {
                page: 'transport-logistics',
                section: 'product-4',
                key: 'spec-row-2',
                value: 'Internal Dimension,576*376*291 mm',
                valueAr: 'الأبعاد الداخلية,576*376*291 ملم',
                sortOrder: 5
            },
            {
                page: 'transport-logistics',
                section: 'product-4',
                key: 'spec-row-3',
                value: 'Empty Weight,2.8 kg',
                valueAr: 'الوزن الفارغ,2.8 كيلو',
                sortOrder: 6
            },
            {
                page: 'transport-logistics',
                section: 'product-4',
                key: 'spec-row-4',
                value: 'Volume Capacity,61 L',
                valueAr: 'السعة الحجمية,61 لتر',
                sortOrder: 7
            },
            {
                page: 'transport-logistics',
                section: 'product-4',
                key: 'spec-row-5',
                value: 'Unit Load,30 kg',
                valueAr: 'حمولة الوحدة,30 كيلو',
                sortOrder: 8
            },
            {
                page: 'transport-logistics',
                section: 'product-4',
                key: 'price-label',
                value: 'On Call',
                valueAr: 'حسب التواصل',
                sortOrder: 9
            },

            // ── Product 5: Large Foldable Crate ──
            {
                page: 'transport-logistics',
                section: 'product-5',
                key: 'title',
                value: 'Large Foldable Crate',
                valueAr: 'صندوق قابل للطي كبير',
                sortOrder: 1
            },
            {
                page: 'transport-logistics',
                section: 'product-5',
                key: 'image',
                value: 'https://paft.eg/wp-content/uploads/2026/02/image-removebg-preview.png',
                valueAr: 'https://paft.eg/wp-content/uploads/2026/02/image-removebg-preview.png',
                sortOrder: 2
            },
            {
                page: 'transport-logistics',
                section: 'product-5',
                key: 'subtitle',
                value: '800x600x984mm',
                valueAr: '800x600x984ملم',
                sortOrder: 3
            },
            {
                page: 'transport-logistics',
                section: 'product-5',
                key: 'spec-row-1',
                value: 'External Dimension,800*600*984 mm',
                valueAr: 'الأبعاد الخارجية,800*600*984 ملم',
                sortOrder: 4
            },
            {
                page: 'transport-logistics',
                section: 'product-5',
                key: 'spec-row-2',
                value: 'Internal Dimension,760*560*852 mm',
                valueAr: 'الأبعاد الداخلية,760*560*852 ملم',
                sortOrder: 5
            },
            {
                page: 'transport-logistics',
                section: 'product-5',
                key: 'spec-row-3',
                value: 'Folding Height,334 mm',
                valueAr: 'ارتفاع الطي,334 ملم',
                sortOrder: 6
            },
            {
                page: 'transport-logistics',
                section: 'product-5',
                key: 'spec-row-4',
                value: 'Empty Weight,25 kg',
                valueAr: 'الوزن الفارغ,25 كيلو',
                sortOrder: 7
            },
            {
                page: 'transport-logistics',
                section: 'product-5',
                key: 'spec-row-5',
                value: 'Volume Capacity,368 L',
                valueAr: 'السعة الحجمية,368 لتر',
                sortOrder: 8
            },
            {
                page: 'transport-logistics',
                section: 'product-5',
                key: 'spec-row-6',
                value: 'Unit Load,250 kg',
                valueAr: 'حمولة الوحدة,250 كيلو',
                sortOrder: 9
            },
            {
                page: 'transport-logistics',
                section: 'product-5',
                key: 'price-label',
                value: 'On Call',
                valueAr: 'حسب التواصل',
                sortOrder: 10
            },

            // ── Product 6: RPC 6411 ──
            {
                page: 'transport-logistics',
                section: 'product-6',
                key: 'title',
                value: 'RPC 6411',
                valueAr: 'RPC 6411',
                sortOrder: 1
            },
            {
                page: 'transport-logistics',
                section: 'product-6',
                key: 'image',
                value: 'https://paft.eg/wp-content/uploads/2026/02/WhatsApp_Image_2026-02-05_at_4.06.42_PM-removebg-preview-2.png',
                valueAr: 'https://paft.eg/wp-content/uploads/2026/02/WhatsApp_Image_2026-02-05_at_4.06.42_PM-removebg-preview-2.png',
                sortOrder: 2
            },
            {
                page: 'transport-logistics',
                section: 'product-6',
                key: 'subtitle',
                value: '600x400x115mm',
                valueAr: '600x400x115mm',
                sortOrder: 3
            },
            {
                page: 'transport-logistics',
                section: 'product-6',
                key: 'spec-row-1',
                value: 'External Dimension,600*400*115 mm',
                valueAr: 'الأبعاد الخارجية,600*400*115 ملم',
                sortOrder: 4
            },
            {
                page: 'transport-logistics',
                section: 'product-6',
                key: 'spec-row-2',
                value: 'Internal Dimension,576*376*105 mm',
                valueAr: 'الأبعاد الداخلية,576*376*105 ملم',
                sortOrder: 5
            },
            {
                page: 'transport-logistics',
                section: 'product-6',
                key: 'spec-row-3',
                value: 'Empty Weight,1.5 kg',
                valueAr: 'الوزن الفارغ,1.5 كيلو',
                sortOrder: 6
            },
            {
                page: 'transport-logistics',
                section: 'product-6',
                key: 'spec-row-4',
                value: 'Volume Capacity,23 L',
                valueAr: 'السعة الحجمية,23 لتر',
                sortOrder: 7
            },
            {
                page: 'transport-logistics',
                section: 'product-6',
                key: 'spec-row-5',
                value: 'Unit Load,15 kg',
                valueAr: 'حمولة الوحدة,15 كيلو',
                sortOrder: 8
            },
            {
                page: 'transport-logistics',
                section: 'product-6',
                key: 'price-label',
                value: 'On Call',
                valueAr: 'حسب التواصل',
                sortOrder: 9
            },

            // ── Product 7: Sheet Separators ──
            {
                page: 'transport-logistics',
                section: 'product-7',
                key: 'title',
                value: 'Sheet Separators',
                valueAr: 'فواصل الألواح',
                sortOrder: 1
            },
            {
                page: 'transport-logistics',
                section: 'product-7',
                key: 'image',
                value: 'https://paft.eg/wp-content/uploads/2025/11/WhatsApp_Image_2025-11-25_at_5.14.26_PM-removebg-preview.png',
                valueAr: 'https://paft.eg/wp-content/uploads/2025/11/WhatsApp_Image_2025-11-25_at_5.14.26_PM-removebg-preview.png',
                sortOrder: 2
            },

            // ── Product 8: Gallon Racks ──
            {
                page: 'transport-logistics',
                section: 'product-8',
                key: 'title',
                value: 'Gallon Racks',
                valueAr: 'رفوف الجالونات',
                sortOrder: 1
            },
            {
                page: 'transport-logistics',
                section: 'product-8',
                key: 'image',
                value: 'https://paft.eg/wp-content/uploads/2025/06/f2883d_1160983ac47f4db8b0586f4a4f0d4a93_mv2-removebg-preview-1.png',
                valueAr: 'https://paft.eg/wp-content/uploads/2025/06/f2883d_1160983ac47f4db8b0586f4a4f0d4a93_mv2-removebg-preview-1.png',
                sortOrder: 2
            },
            {
                page: 'transport-logistics',
                section: 'product-8',
                key: 'features',
                value: '4 Piece Set,8 Piece Set',
                valueAr: 'طقم 4 قطع,طقم 8 قطع',
                sortOrder: 3
            },

            // ── CTA Section ──
            {
                page: 'transport-logistics',
                section: 'cta',
                key: 'cta-title',
                value: 'Need a Custom Quote?',
                valueAr: 'هل تحتاج عرض سعر مخصص؟',
                sortOrder: 1
            },
            {
                page: 'transport-logistics',
                section: 'cta',
                key: 'cta-description',
                value: 'We offer tailored solutions for crates, IBCs, and logistics accessories',
                valueAr: 'نقدم حلولاً مخصصة للصناديق وحاويات IBC وإكسسوارات اللوجستيات',
                sortOrder: 2
            }
        ];

        console.log(`📦 Prepared ${contentData.length} content items`);

        // Clear existing content first
        console.log('🗑️ Clearing existing transport-logistics content...');
        const existingContent = await contentService.findByPage('transport-logistics');
        for (const item of existingContent) {
            await contentService.remove(item.id);
        }

        // Add all content items
        let successCount = 0;
        for (const item of contentData) {
            try {
                await contentService.create(item);
                successCount++;
                console.log(`✅ Added: ${item.section}.${item.key}`);
            } catch (error) {
                console.error(`❌ Failed to add ${item.section}.${item.key}:`, error.message);
            }
        }

        console.log(`\n🎉 Seeding completed! ${successCount}/${contentData.length} items added successfully`);

        // Verify by fetching some key items
        console.log('\n🔍 Verification:');
        const verifyData = await contentService.findByPage('transport-logistics');
        const heroTitle = verifyData.find(item => item.section === 'hero' && item.key === 'title');
        const product1Title = verifyData.find(item => item.section === 'product-1' && item.key === 'title');
        const ctaTitle = verifyData.find(item => item.section === 'cta' && item.key === 'cta-title');
        
        console.log('Hero title:', JSON.stringify({ value: heroTitle?.value, valueAr: heroTitle?.valueAr }));
        console.log('Product 1 title:', JSON.stringify({ value: product1Title?.value, valueAr: product1Title?.valueAr }));
        console.log('CTA title:', JSON.stringify({ value: ctaTitle?.value, valueAr: ctaTitle?.valueAr }));

    } catch (error) {
        console.error('❌ Error during seeding:', error);
    } finally {
        await app.close();
    }
}

seedCompleteTransportLogistics().catch(console.error);