import { DataSource } from 'typeorm';
import { Product } from '../products/entities/product.entity';

export async function showProducts(dataSource: DataSource) {
  const productRepository = dataSource.getRepository(Product);

  const products = await productRepository.find({
    order: { sortOrder: 'ASC' }
  });

  console.log(`Found ${products.length} products:`);
  products.forEach(product => {
    console.log(`- ${product.name} (${product.category}) - ${product.dimensions}`);
  });
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
      await showProducts(dataSource);
      await dataSource.destroy();
    } catch (error) {
      console.error('Error showing products:', error);
      process.exit(1);
    }
  });
}