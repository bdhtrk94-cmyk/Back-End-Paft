import { DataSource } from 'typeorm';
import { Content } from '../content/entities/content.entity';

export async function fixVideoText(dataSource: DataSource) {
  const contentRepository = dataSource.getRepository(Content);

  // Find the watch-video-text content
  const videoContent = await contentRepository.findOne({
    where: { 
      page: 'home',
      section: 'video-hero',
      key: 'watch-video-text'
    },
  });

  if (videoContent) {
    videoContent.value = 'Watch Video';
    await contentRepository.save(videoContent);
    console.log('Video text updated successfully!');
  } else {
    console.log('Video content not found');
  }
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
      await fixVideoText(dataSource);
      await dataSource.destroy();
    } catch (error) {
      console.error('Error fixing video text:', error);
      process.exit(1);
    }
  });
}