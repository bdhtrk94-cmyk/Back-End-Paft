import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { ContentService } from '../content/content.service';

async function addStaticTextsTransportLogistics() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const contentService = app.get(ContentService);

    try {
        console.log('📝 Adding static texts for transport-logistics page...');

        // Static texts data with English and Arabic
        const staticTexts = [
            // UI Labels
            {
                page: 'transport-logistics',
                section: 'ui-labels',
                key: 'rpc-series-badge',
                value: 'RPC Series',
                valueAr: 'سلسلة RPC',
                sortOrder: 1
            },
            {
                page: 'transport-logistics',
                section: 'ui-labels',
                key: 'accessory-badge',
                value: 'Accessory',
                valueAr: 'إكسسوار',
                sortOrder: 2
            },
            {
                page: 'transport-logistics',
                section: 'ui-labels',
                key: 'contact-specs-text',
                value: 'Contact us for specifications and pricing details.',
                valueAr: 'تواصل معنا للحصول على تفاصيل المواصفات والأسعار.',
                sortOrder: 3
            },
            {
                page: 'transport-logistics',
                section: 'ui-labels',
                key: 'price-range-label',
                value: 'Price Range',
                valueAr: 'نطاق السعر',
                sortOrder: 4
            },
            {
                page: 'transport-logistics',
                section: 'ui-labels',
                key: 'get-quote-button',
                value: 'Get a Quote →',
                valueAr: 'احصل على عرض سعر ←',
                sortOrder: 5
            },
            {
                page: 'transport-logistics',
                section: 'ui-labels',
                key: 'contact-sales-button',
                value: 'Contact Sales',
                valueAr: 'تواصل مع المبيعات',
                sortOrder: 6
            },
            {
                page: 'transport-logistics',
                section: 'ui-labels',
                key: 'scroll-explore-text',
                value: 'Scroll to explore',
                valueAr: 'مرر لاستكشاف المزيد',
                sortOrder: 7
            }
        ];

        console.log(`📦 Prepared ${staticTexts.length} static text items`);

        // Add all static text items
        let successCount = 0;
        for (const item of staticTexts) {
            try {
                await contentService.create(item);
                successCount++;
                console.log(`✅ Added: ${item.section}.${item.key}`);
            } catch (error) {
                console.error(`❌ Failed to add ${item.section}.${item.key}:`, error.message);
            }
        }

        console.log(`\n🎉 Static texts seeding completed! ${successCount}/${staticTexts.length} items added successfully`);

        // Verify by fetching some key items
        console.log('\n🔍 Verification:');
        const verifyData = await contentService.findByPageAndSection('transport-logistics', 'ui-labels');
        console.log(`Found ${verifyData.length} ui-labels items`);
        
        const rpcBadge = verifyData.find(item => item.key === 'rpc-series-badge');
        const getQuoteBtn = verifyData.find(item => item.key === 'get-quote-button');
        
        console.log('RPC Badge:', JSON.stringify({ value: rpcBadge?.value, valueAr: rpcBadge?.valueAr }));
        console.log('Get Quote Button:', JSON.stringify({ value: getQuoteBtn?.value, valueAr: getQuoteBtn?.valueAr }));

    } catch (error) {
        console.error('❌ Error during seeding:', error);
    } finally {
        await app.close();
    }
}

addStaticTextsTransportLogistics().catch(console.error);