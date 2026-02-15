import { DataSource } from 'typeorm';

export async function addPalletFields(dataSource: DataSource) {
  console.log('Adding pallet fields to products table...');

  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();

  try {
    // Check if columns already exist
    const table = await queryRunner.getTable('products');
    const hasSlug = table?.findColumnByName('slug');
    
    if (hasSlug) {
      console.log('Pallet fields already exist, skipping...');
      return;
    }

    // Add new columns
    await queryRunner.query(`
      ALTER TABLE products 
      ADD COLUMN slug VARCHAR(255) NULL,
      ADD COLUMN dimensions VARCHAR(100) NULL,
      ADD COLUMN design VARCHAR(100) NULL,
      ADD COLUMN weight VARCHAR(50) NULL,
      ADD COLUMN static_load VARCHAR(50) NULL,
      ADD COLUMN dynamic_load VARCHAR(50) NULL,
      ADD COLUMN rack_load VARCHAR(50) NULL,
      ADD COLUMN expected_life VARCHAR(50) NULL,
      ADD COLUMN is_active BOOLEAN DEFAULT TRUE,
      ADD COLUMN sort_order INT DEFAULT 0
    `);

    console.log('Pallet fields added successfully!');
  } catch (error) {
    console.error('Error adding pallet fields:', error);
    throw error;
  } finally {
    await queryRunner.release();
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
      await addPalletFields(dataSource);
      await dataSource.destroy();
    } catch (error) {
      console.error('Error:', error);
      process.exit(1);
    }
  });
}