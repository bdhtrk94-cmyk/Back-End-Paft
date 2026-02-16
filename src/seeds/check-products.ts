
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Product } from '../products/entities/product.entity';

dotenv.config();

async function checkProducts() {
    try {
        const AppDataSource = new DataSource({
            type: 'mysql',
            host: process.env.DB_HOST || 'localhost',
            port: Number(process.env.DB_PORT) || 3306,
            username: process.env.DB_USERNAME || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_DATABASE || 'paft_cms',
            entities: [Product],
            synchronize: false,
        });

        await AppDataSource.initialize();
        console.log('Database connected');

        const productRepository = AppDataSource.getRepository(Product);
        const categories = ['heavy-duty', 'light-duty', 'rental'];

        for (const category of categories) {
            const count = await productRepository.count({ where: { category } });
            console.log(`Category '${category}': ${count} products found`);

            if (count > 0) {
                const products = await productRepository.find({ where: { category }, take: 2 });
                console.log(`Sample products for ${category}:`, products.map(p => ({ id: p.id, name: p.name, slug: p.slug })));
            }
        }

        const allCategories = await productRepository
            .createQueryBuilder('product')
            .select('product.category', 'category')
            .addSelect('COUNT(product.id)', 'count')
            .groupBy('product.category')
            .getRawMany();

        console.log('All product categories in DB:', allCategories);

        await AppDataSource.destroy();
    } catch (error) {
        console.error('Error checking products:', error);
    }
}

checkProducts();
