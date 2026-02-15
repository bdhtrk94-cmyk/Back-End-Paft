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

async function fixHeavyDutyLightDutyData() {
  await AppDataSource.initialize();
  const contentRepo = AppDataSource.getRepository(Content);

  console.log('🔧 Fixing Heavy Duty and Light Duty plastic pallets data...');

  // First, let's check what data currently exists
  const existingData = await contentRepo.find({
    where: { page: 'plastic-pallets' },
    order: { section: 'ASC', key: 'ASC' }
  });

  console.log('📊 Current data sections:');
  const sections = {};
  existingData.forEach(item => {
    if (!sections[item.section]) sections[item.section] = [];
    sections[item.section].push(item.key);
  });
  
  Object.keys(sections).sort().forEach(section => {
    console.log(`   ${section}: ${sections[section].length} items`);
  });

  // Heavy Duty Products Data (M4-M9)
  const heavyDutyProducts = [
    {
      section: 'product-m4',
      data: {
        'product-name': 'M4 Heavy Duty',
        'dimensions': '1200 x 1000 x 150 mm',
        'design': '3 Runners',
        'weight': '18 kg',
        'static-load': '8000 kg',
        'dynamic-load': '2000 kg',
        'rack-load': '2000 kg',
        'expected-life': '10+ years'
      }
    },
    {
      section: 'product-m5',
      data: {
        'product-name': 'M5 Heavy Duty',
        'dimensions': '1200 x 800 x 150 mm',
        'design': '3 Runners',
        'weight': '16 kg',
        'static-load': '7000 kg',
        'dynamic-load': '1800 kg',
        'rack-load': '1800 kg',
        'expected-life': '10+ years'
      }
    },
    {
      section: 'product-m6',
      data: {
        'product-name': 'M6 Heavy Duty',
        'dimensions': '1100 x 1100 x 150 mm',
        'design': '3 Runners',
        'weight': '17 kg',
        'static-load': '7500 kg',
        'dynamic-load': '1900 kg',
        'rack-load': '1900 kg',
        'expected-life': '10+ years'
      }
    },
    {
      section: 'product-m7',
      data: {
        'product-name': 'M7 Heavy Duty',
        'dimensions': '1000 x 1200 x 150 mm',
        'design': '3 Runners',
        'weight': '18 kg',
        'static-load': '8000 kg',
        'dynamic-load': '2000 kg',
        'rack-load': '2000 kg',
        'expected-life': '10+ years'
      }
    },
    {
      section: 'product-m8',
      data: {
        'product-name': 'M8 Heavy Duty',
        'dimensions': '800 x 1200 x 150 mm',
        'design': '3 Runners',
        'weight': '15 kg',
        'static-load': '6500 kg',
        'dynamic-load': '1600 kg',
        'rack-load': '1600 kg',
        'expected-life': '10+ years'
      }
    },
    {
      section: 'product-m9',
      data: {
        'product-name': 'M9 Heavy Duty',
        'dimensions': '600 x 800 x 150 mm',
        'design': '3 Runners',
        'weight': '12 kg',
        'static-load': '5000 kg',
        'dynamic-load': '1200 kg',
        'rack-load': '1200 kg',
        'expected-life': '10+ years'
      }
    }
  ];

  // Light Duty Products Data
  const lightDutyProducts = [
    {
      section: 'product-double-deck',
      data: {
        'product-name': 'Double Deck Light',
        'dimensions': '1200 x 1000 x 150 mm',
        'design': 'Double Deck',
        'weight': '8 kg',
        'static-load': '1000 kg',
        'dynamic-load': '800 kg',
        'rack-load': 'N/A',
        'expected-life': '5+ years'
      }
    },
    {
      section: 'product-9-leg',
      data: {
        'product-name': '9 Leg Light',
        'dimensions': '1200 x 1000 x 150 mm',
        'design': '9 Legs',
        'weight': '7 kg',
        'static-load': '1200 kg',
        'dynamic-load': '900 kg',
        'rack-load': 'N/A',
        'expected-life': '5+ years'
      }
    }
  ];

  // Rental Pallet Data (fix if incorrect)
  const rentalPalletData = {
    section: 'product-rental',
    data: {
      'product-name': 'Rental Pallet',
      'dimensions': '1200 x 1000 x 150 mm',
      'design': 'Standard',
      'weight': '15 kg',
      'static-load': '3000 kg',
      'dynamic-load': '1500 kg',
      'rack-load': '1500 kg',
      'expected-life': '8+ years'
    }
  };

  // Combine all products
  const allProducts = [...heavyDutyProducts, ...lightDutyProducts, rentalPalletData];

  let addedCount = 0;
  let updatedCount = 0;

  for (const product of allProducts) {
    console.log(`\n🔧 Processing ${product.section}...`);
    
    for (const [key, value] of Object.entries(product.data)) {
      // Check if this content already exists
      const existing = await contentRepo.findOne({
        where: {
          page: 'plastic-pallets',
          section: product.section,
          key: key
        }
      });

      if (existing) {
        // Update existing content
        existing.value = value;
        await contentRepo.save(existing);
        console.log(`   ✅ Updated ${key}: ${value}`);
        updatedCount++;
      } else {
        // Create new content
        const newContent = contentRepo.create({
          page: 'plastic-pallets',
          section: product.section,
          key: key,
          value: value
        });
        await contentRepo.save(newContent);
        console.log(`   ➕ Added ${key}: ${value}`);
        addedCount++;
      }
    }
  }

  console.log(`\n✅ Data fix completed!`);
  console.log(`   📊 Added: ${addedCount} items`);
  console.log(`   🔄 Updated: ${updatedCount} items`);

  // Verify the data
  console.log('\n🔍 Verifying updated data...');
  const updatedData = await contentRepo.find({
    where: { page: 'plastic-pallets' },
    order: { section: 'ASC', key: 'ASC' }
  });

  const updatedSections = {};
  updatedData.forEach(item => {
    if (!updatedSections[item.section]) updatedSections[item.section] = [];
    updatedSections[item.section].push(item.key);
  });
  
  console.log('📊 Updated data sections:');
  Object.keys(updatedSections).sort().forEach(section => {
    console.log(`   ${section}: ${updatedSections[section].length} items`);
  });

  await AppDataSource.destroy();
}

fixHeavyDutyLightDutyData().catch(console.error);