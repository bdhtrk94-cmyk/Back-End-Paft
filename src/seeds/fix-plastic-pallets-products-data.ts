import { DataSource } from 'typeorm';
import { Content } from '../content/entities/content.entity';

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'paft_cms',
  entities: [Content],
  synchronize: false,
});

async function fixPlasticPalletsProductsData() {
  await AppDataSource.initialize();
  const contentRepo = AppDataSource.getRepository(Content);

  console.log('🔧 Fixing Plastic Pallets Products Data...');

  // Heavy Duty Products Data
  const heavyDutyProducts = [
    {
      section: 'product-m1',
      data: {
        'product-name': 'M1 Heavy Duty Pallet',
        'dimensions': '1000 × 1200 × 150 mm',
        'design': 'Heavy Duty',
        'static-load': 'Up to 10.0 Tons',
        'dynamic-load': 'Up to 4.0 Tons',
        'rack-load': 'Up to 2.0 Tons',
        'expected-life': '10+ Years'
      }
    },
    {
      section: 'product-m2',
      data: {
        'product-name': 'M2 Heavy Duty Pallet',
        'dimensions': '1000 × 1200 × 150 mm',
        'design': 'Heavy Duty',
        'static-load': 'Up to 10.0 Tons',
        'dynamic-load': 'Up to 4.0 Tons',
        'rack-load': 'Up to 2.0 Tons',
        'expected-life': '10+ Years'
      }
    },
    {
      section: 'product-m4',
      data: {
        'product-name': 'M4 Heavy Duty Pallet',
        'dimensions': '1000 × 1200 × 150 mm',
        'design': 'Heavy Duty',
        'static-load': 'Up to 10.0 Tons',
        'dynamic-load': 'Up to 4.0 Tons',
        'rack-load': 'Up to 2.0 Tons',
        'expected-life': '10+ Years'
      }
    },
    {
      section: 'product-m5',
      data: {
        'product-name': 'M5 Heavy Duty Pallet',
        'dimensions': '1000 × 1200 × 150 mm',
        'design': 'Heavy Duty',
        'static-load': 'Up to 10.0 Tons',
        'dynamic-load': 'Up to 4.0 Tons',
        'rack-load': 'Up to 2.0 Tons',
        'expected-life': '10+ Years'
      }
    },
    {
      section: 'product-m6',
      data: {
        'product-name': 'M6 Heavy Duty Pallet',
        'dimensions': '1000 × 1200 × 150 mm',
        'design': 'Heavy Duty',
        'static-load': 'Up to 10.0 Tons',
        'dynamic-load': 'Up to 4.0 Tons',
        'rack-load': 'Up to 2.0 Tons',
        'expected-life': '10+ Years'
      }
    },
    {
      section: 'product-m7',
      data: {
        'product-name': 'M7 Heavy Duty Pallet',
        'dimensions': '1000 × 1200 × 150 mm',
        'design': 'Heavy Duty',
        'static-load': 'Up to 10.0 Tons',
        'dynamic-load': 'Up to 4.0 Tons',
        'rack-load': 'Up to 2.0 Tons',
        'expected-life': '10+ Years'
      }
    },
    {
      section: 'product-m8',
      data: {
        'product-name': 'M8 Heavy Duty Pallet',
        'dimensions': '1000 × 1200 × 150 mm',
        'design': 'Heavy Duty',
        'static-load': 'Up to 10.0 Tons',
        'dynamic-load': 'Up to 4.0 Tons',
        'rack-load': 'Up to 2.0 Tons',
        'expected-life': '10+ Years'
      }
    },
    {
      section: 'product-m9',
      data: {
        'product-name': 'M9 Heavy Duty Pallet',
        'dimensions': '1000 × 1200 × 150 mm',
        'design': 'Heavy Duty',
        'static-load': 'Up to 10.0 Tons',
        'dynamic-load': 'Up to 4.0 Tons',
        'rack-load': 'Up to 2.0 Tons',
        'expected-life': '10+ Years'
      }
    }
  ];

  // Light Duty Products Data
  const lightDutyProducts = [
    {
      section: 'product-double-deck',
      data: {
        'product-name': 'Double Deck Light Pallet',
        'dimensions': '1000 × 1200 × 150 mm',
        'design': 'Light Duty',
        'weight': '7 kg',
        'static-load': 'Up to 3.0 Tons',
        'dynamic-load': 'Up to 1.5 Tons',
        'rack-load': 'N/A',
        'expected-life': '5+ Years'
      }
    },
    {
      section: 'product-9-leg',
      data: {
        'product-name': '9 Leg Light Pallet',
        'dimensions': '1000 × 1200 × 150 mm',
        'design': 'Light Duty',
        'weight': '8 kg',
        'static-load': 'Up to 3.0 Tons',
        'dynamic-load': 'Up to 1.5 Tons',
        'rack-load': 'N/A',
        'expected-life': '5+ Years'
      }
    }
  ];

  // Rental Product Data
  const rentalProducts = [
    {
      section: 'product-rental',
      data: {
        'product-name': 'Rental Pallet',
        'dimensions': '1000 × 1200 × 150 mm',
        'design': 'Rental Service',
        'static-load': 'Up to 5.0 Tons',
        'dynamic-load': 'Up to 2.0 Tons',
        'rack-load': 'Up to 1.5 Tons',
        'expected-life': 'Flexible Terms'
      }
    }
  ];

  // Combine all products
  const allProducts = [...heavyDutyProducts, ...lightDutyProducts, ...rentalProducts];

  // Process each product
  for (const product of allProducts) {
    console.log(`\n📦 Processing ${product.section}...`);
    
    for (const [key, value] of Object.entries(product.data)) {
      try {
        // Check if content already exists
        const existingContent = await contentRepo.findOne({
          where: {
            page: 'plastic-pallets',
            section: product.section,
            key: key
          }
        });

        if (existingContent) {
          // Update existing content
          existingContent.value = value;
          await contentRepo.save(existingContent);
          console.log(`   ✅ Updated ${key}: ${value}`);
        } else {
          // Create new content
          const newContent = contentRepo.create({
            page: 'plastic-pallets',
            section: product.section,
            key: key,
            value: value
          });
          await contentRepo.save(newContent);
          console.log(`   ➕ Created ${key}: ${value}`);
        }
      } catch (error) {
        console.error(`   ❌ Error processing ${key}:`, error);
      }
    }
  }

  console.log('\n🎉 Plastic Pallets Products Data Fixed Successfully!');
  
  // Show summary
  const allContent = await contentRepo.find({
    where: { page: 'plastic-pallets' }
  });
  
  const productSections = allContent
    .filter(item => item.section.startsWith('product-'))
    .reduce((acc, item) => {
      if (!acc[item.section]) acc[item.section] = [];
      acc[item.section].push(item.key);
      return acc;
    }, {} as Record<string, string[]>);

  console.log('\n📊 Summary of Product Sections:');
  Object.keys(productSections).sort().forEach(section => {
    console.log(`   ${section}: ${productSections[section].length} fields`);
    productSections[section].forEach(key => {
      console.log(`      - ${key}`);
    });
  });

  await AppDataSource.destroy();
}

fixPlasticPalletsProductsData().catch(console.error);