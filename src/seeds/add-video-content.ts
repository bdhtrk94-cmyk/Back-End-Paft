import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { ContentService } from '../content/content.service';

async function addVideoContent() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const contentService = app.get(ContentService);

    try {
        console.log('🎬 Adding video watch text to plastic-pallets page...');

        // Check if video-watch-text already exists
        try {
            const existingContent = await contentService.findByPageAndSection('plastic-pallets', 'video');
            const watchTextItem = existingContent['video-watch-text'];
            
            if (watchTextItem) {
                console.log('⚠️  video-watch-text already exists, updating...');
                await contentService.update(watchTextItem.id, {
                    value: 'WATCH VIDEO',
                    valueAr: 'شاهد الفيديو'
                });
                console.log('✅ Updated video-watch-text');
            } else {
                throw new Error('Not found');
            }
        } catch (error) {
            // Create new content
            await contentService.create({
                page: 'plastic-pallets',
                section: 'video',
                key: 'video-watch-text',
                value: 'WATCH VIDEO',
                valueAr: 'شاهد الفيديو',
                sortOrder: 4
            });
            console.log('✅ Created video-watch-text');
        }

        console.log('\n🎬 Video content addition completed!');

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await app.close();
    }
}

addVideoContent().catch(console.error);