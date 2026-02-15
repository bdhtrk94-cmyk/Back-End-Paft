import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Product } from '../products/entities/product.entity';

dotenv.config();

const products = [
  {
    name: 'Heavy Duty Plastic Pallet – 1200×1000mm',
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.8,
    reviewCount: 234,
    category: 'Plastic Pallets',
    image:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=400&fit=crop',
    badge: 'Best Seller',
    inStock: true,
    description:
      'High-load capacity pallet designed for heavy industrial use. Resistant to moisture, chemicals, and impact.',
    fullDescription:
      'The Heavy Duty Plastic Pallet (1200×1000mm) is engineered for the most demanding industrial environments. Built from virgin HDPE, it supports dynamic loads up to 1,500 kg and static loads up to 5,000 kg. Its closed-deck design prevents debris from falling through, making it ideal for pharmaceutical and food processing plants.\n\nKey features include reinforced steel-rod inserts for maximum rigidity, four-way forklift entry, and a non-slip textured surface. The pallet is fully washable at high temperatures and resistant to acids, alkalis, and organic solvents.\n\nCertifications: ISO 8611, EUR/EPAL compatible dimensions. Available in blue, black, or grey.',
  },
  {
    name: 'Euro Pallet – 1200×800mm Stackable',
    price: 64.5,
    originalPrice: undefined,
    rating: 4.6,
    reviewCount: 189,
    category: 'Plastic Pallets',
    image:
      'https://images.unsplash.com/photo-1553413077-190dd305871c?w=400&h=400&fit=crop',
    badge: undefined,
    inStock: true,
    description:
      'Standard Euro-size pallet with stackable design. Perfect for warehouse and logistics operations.',
    fullDescription:
      'The Euro Pallet (1200×800mm) follows the standard European pallet dimensions, making it compatible with all major racking systems and transport vehicles. Its stackable design allows up to 8 pallets to be stacked when loaded, saving valuable warehouse space.\n\nConstructed from injection-moulded polypropylene, it weighs only 15 kg yet supports dynamic loads of 1,200 kg. The open-deck design facilitates drainage and air circulation, making it suitable for cold storage and outdoor use.\n\nFeatures include anti-slip rubber inserts, RFID tag integration slots, and a 10-year warranty against manufacturing defects.',
  },
  {
    name: 'Lightweight Export Pallet – Nestable',
    price: 34.99,
    originalPrice: undefined,
    rating: 4.4,
    reviewCount: 156,
    category: 'Plastic Pallets',
    image:
      'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&h=400&fit=crop',
    badge: 'Eco-Friendly',
    inStock: true,
    description:
      'Space-saving nestable pallet ideal for one-way shipping and exports. Made from recycled HDPE.',
    fullDescription:
      "The Lightweight Export Pallet is specifically designed for international shipping where pallet return is not practical. Weighing just 6 kg, it significantly reduces freight costs compared to wooden alternatives while being ISPM-15 exempt — no heat treatment or fumigation required.\n\nIts nestable 9-foot design allows 40+ pallets to fit in the space of 12 conventional pallets. Made from 100% post-consumer recycled HDPE, this pallet supports PAFT's sustainability commitment.\n\nLoad capacity: 1,000 kg dynamic / 2,500 kg static. Available in black only. Custom printing available for branding.",
  },
  {
    name: '1000L IBC Container – Food Grade',
    price: 289.0,
    originalPrice: 349.0,
    rating: 4.9,
    reviewCount: 98,
    category: 'IBC Containers',
    image:
      'https://images.unsplash.com/photo-1590067531879-4f453be3f7bf?w=400&h=400&fit=crop',
    badge: 'Premium',
    inStock: true,
    description:
      'Food-grade IBC with UN certification. Perfect for liquid storage and transportation.',
    fullDescription:
      'The 1000L IBC Container is manufactured to the highest food-grade standards, featuring a blow-moulded HDPE inner bottle with a galvanised steel cage frame. UN 31HA1/Y certified for transporting hazardous and non-hazardous liquids.\n\nThe container includes a 150mm top fill cap and a 50mm butterfly discharge valve (DN50). The steel pallet base allows four-way forklift access and is compatible with IBC tilting frames for complete product discharge.\n\nIdeal for food ingredients, beverages, industrial chemicals, and cosmetic raw materials. Every container is batch-tested for FDA and EU food contact compliance. Stackable up to 4 units high when filled.',
  },
  {
    name: 'Reconditioned IBC – 1000L',
    price: 149.99,
    originalPrice: undefined,
    rating: 4.3,
    reviewCount: 67,
    category: 'IBC Containers',
    image:
      'https://images.unsplash.com/photo-1581922814484-0b48460d7e3c?w=400&h=400&fit=crop',
    badge: undefined,
    inStock: true,
    description:
      'Professionally cleaned and inspected reconditioned IBC container. Cost-effective solution.',
    fullDescription:
      'Our Reconditioned IBC Containers go through a rigorous 7-step cleaning and inspection process to ensure they meet quality standards for reuse. Each container is pressure-washed, chemically sanitised, and fitted with a brand new inner bottle lining.\n\nThe steel cage is inspected for structural integrity, and any damaged components are replaced with genuine parts. Each reconditioned IBC comes with a test certificate and a 6-month warranty.\n\nThis is a cost-effective and environmentally responsible alternative to purchasing new containers, reducing waste and your carbon footprint. Not suitable for food-grade applications.',
  },
  {
    name: 'Stackable Storage Crate – 600×400mm',
    price: 24.99,
    originalPrice: undefined,
    rating: 4.5,
    reviewCount: 312,
    category: 'Crates & Bins',
    image:
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=400&h=400&fit=crop',
    badge: undefined,
    inStock: true,
    description:
      'Versatile stackable crate for organized storage. Ventilated sides for fresh produce.',
    fullDescription:
      'The Stackable Storage Crate (600×400mm) is a versatile solution for warehousing, retail, and agriculture. Its reinforced rim and interlocking base allow secure stacking up to 10 units high, while the ventilated side walls ensure optimal air circulation for perishable goods.\n\nManufactured from food-safe polypropylene, these crates are suitable for direct contact with fresh produce, meat, and bakery products. They withstand temperatures from -30°C to +70°C.\n\nAvailable in 4 heights (120mm, 170mm, 220mm, 270mm) to suit different applications. Compatible with dollies and roller conveyors. Smooth inner surfaces allow easy cleaning.',
  },
  {
    name: 'Folding Crate – Collapsible 600×400mm',
    price: 32.5,
    originalPrice: undefined,
    rating: 4.7,
    reviewCount: 201,
    category: 'Crates & Bins',
    image:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=400&fit=crop',
    badge: 'Space Saver',
    inStock: true,
    description:
      'Collapse to 25% height when empty. Ideal for return logistics and seasonal use.',
    fullDescription:
      'The Folding Crate (600×400mm) revolutionises return logistics by collapsing to just 25% of its assembled height. When empty, these crates fold flat in seconds, dramatically reducing the space and cost of transporting them back to distribution centres.\n\nThe patented side-wall hinge mechanism allows over 100,000 fold/unfold cycles without degradation. When assembled, the crate is as rigid as a solid-wall equivalent, supporting loads up to 20 kg.\n\nIdeal for retail order picking, seasonal peaks, and e-commerce fulfilment. Available with optional attached lids for secure transit. Colour-coding available for product segregation.',
  },
  {
    name: 'Heavy Duty Storage Bin – 800×600mm',
    price: 45.0,
    originalPrice: 59.99,
    rating: 4.6,
    reviewCount: 144,
    category: 'Crates & Bins',
    image:
      'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop',
    badge: undefined,
    inStock: true,
    description:
      'Industrial-grade storage bin with reinforced walls. Built for heavy parts and tools.',
    fullDescription:
      'The Heavy Duty Storage Bin (800×600mm) is built for the toughest industrial environments. With walls 4mm thick and reinforced corners, it handles heavy automotive parts, metal components, and machine tools with ease.\n\nThe ergonomic hand grips make handling comfortable even when the bin is loaded to its 50 kg capacity. An optional label holder on two sides enables clear identification in busy warehouses.\n\nCompatible with all major shelving and racking systems. The solid base prevents small parts from slipping through, while drain holes can be added as a custom option. Available in blue, red, green, and grey.',
  },
  {
    name: 'Pallet Collar Set – Wooden Frame',
    price: 18.99,
    originalPrice: undefined,
    rating: 4.2,
    reviewCount: 89,
    category: 'Pallet Accessories',
    image:
      'https://images.unsplash.com/photo-1612197527762-8cfb8dc0d361?w=400&h=400&fit=crop',
    badge: undefined,
    inStock: true,
    description:
      'Hinged wooden collar to convert flat pallets into box pallets. Stackable when not in use.',
    fullDescription:
      'The Pallet Collar Set transforms any standard pallet into a sturdy box pallet in seconds. Made from kiln-dried pine with galvanised steel hinges, each collar is 200mm tall and can be stacked up to 6 layers high for a total height of 1,200mm.\n\nThe hinged corners allow the collars to fold flat when not in use, saving up to 80% storage space. Each set includes 4 corner hinges and is ISPM-15 compliant for international shipping.\n\nPerfect for creating modular storage solutions, protecting goods during transit, and organising warehouse space. Available in standard Euro (1200×800mm) and industrial (1200×1000mm) sizes.',
  },
  {
    name: 'Anti-Slip Rubber Pallet Mat',
    price: 12.5,
    originalPrice: undefined,
    rating: 4.4,
    reviewCount: 176,
    category: 'Pallet Accessories',
    image:
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=400&fit=crop',
    badge: undefined,
    inStock: true,
    description:
      'Prevents load shifting during transport. Fits all standard pallet sizes.',
    fullDescription:
      'The Anti-Slip Rubber Pallet Mat is an essential accessory for secure load transportation. Made from recycled rubber granules bonded with polyurethane, it provides a high-friction surface that prevents boxes and packages from sliding during transit.\n\nEach mat is 3mm thick and can be cut to fit any pallet size. The open-cell structure allows water drainage, preventing moisture build-up between the mat and pallet. Reusable for hundreds of shipments.\n\nCoefficient of friction: >0.7 (dry), >0.5 (wet). Temperature range: -40°C to +80°C. Sold individually or in packs of 25 for volume discounts.',
  },
  {
    name: 'Pallet Wrapping Stretch Film – 500mm',
    price: 8.99,
    originalPrice: undefined,
    rating: 4.1,
    reviewCount: 298,
    category: 'Pallet Accessories',
    image:
      'https://images.unsplash.com/photo-1560472355-536de3962603?w=400&h=400&fit=crop',
    badge: 'Value Pack',
    inStock: true,
    description:
      'Strong and transparent stretch film for pallet wrapping. 300m per roll.',
    fullDescription:
      'PAFT Stretch Film (500mm wide, 300m per roll) is a premium machine and hand-wrap compatible film designed for securing pallet loads. Made from high-performance LLDPE, it offers excellent cling, puncture resistance, and load retention.\n\nThe film stretches up to 300% of its original length, providing maximum coverage with minimum product usage. Its crystal-clear transparency allows barcode scanning through the film without unwrapping.\n\n23 micron thickness, each roll weighs 3.2 kg. Available in clear, black (opaque), and coloured options. Also available in pre-stretched version for hand-wrapping applications. Minimum order: 6 rolls.',
  },
  {
    name: 'Custom Pallet Design Service',
    price: 499.0,
    originalPrice: undefined,
    rating: 5.0,
    reviewCount: 42,
    category: 'Custom Solutions',
    image:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop',
    badge: 'Bespoke',
    inStock: true,
    description:
      'Work with our engineering team to design pallets tailored to your specific requirements.',
    fullDescription:
      "The Custom Pallet Design Service gives you direct access to PAFT's engineering team to create pallets perfectly tailored to your application. Whether you need unusual dimensions, specific load configurations, integrated RFID tracking, or branded colours — we design and manufacture to your exact specifications.\n\nThe process includes: initial consultation, 3D CAD design with FEA stress analysis, prototype production, load testing to ISO 8611, and full production run. Lead time from design approval to delivery is typically 6–8 weeks.\n\nMinimum order quantity for custom pallets is 500 units. Price includes design consultation and one prototype; production costs are quoted separately based on specifications.",
  },
  {
    name: 'Hygienic Pallet – Cleanroom Grade',
    price: 159.0,
    originalPrice: undefined,
    rating: 4.8,
    reviewCount: 56,
    category: 'Plastic Pallets',
    image:
      'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=400&h=400&fit=crop',
    badge: 'Hygienic',
    inStock: true,
    description:
      'Smooth, sealed surface pallet for pharmaceutical and food production cleanrooms. Easy to sanitize.',
    fullDescription:
      'The Hygienic Pallet is designed specifically for cleanroom environments in pharmaceutical, biotech, and food production facilities. Its seamless, closed-deck construction eliminates crevices where bacteria could harbour, and the ultra-smooth surface allows complete CIP (Clean-in-Place) sanitisation.\n\nMade from FDA-approved virgin polypropylene in ISO Class 7 cleanroom conditions. The pallet generates near-zero particulate contamination and is compatible with gamma irradiation sterilisation.\n\nMeets GMP requirements and has full traceability — each pallet is laser-engraved with a unique serial number. Load capacity: 1,000 kg dynamic. Available in white and light blue.',
  },
  {
    name: 'Rackable Pallet – 1200×1000mm',
    price: 109.0,
    originalPrice: 139.0,
    rating: 4.7,
    reviewCount: 134,
    category: 'Plastic Pallets',
    image:
      'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=400&fit=crop',
    badge: undefined,
    inStock: true,
    description:
      'Engineered for racking systems. High deflection resistance under heavy loads.',
    fullDescription:
      'The Rackable Pallet (1200×1000mm) is specifically engineered for use in selective, drive-in, and push-back racking systems. Reinforced with internal steel tubes, it maintains less than 10mm deflection under a 1,000 kg load across a 1,200mm racking span.\n\nThe three-runner base provides excellent stability on racking beams, while the closed top deck prevents products from falling through. Compatible with automated storage and retrieval systems (AS/RS).\n\nTested and certified to AS 4068-1993 for racking applications. 10-year warranty. Available in standard black or custom colours for orders above 200 units.',
  },
  {
    name: 'Drum Spill Containment Pallet',
    price: 199.99,
    originalPrice: undefined,
    rating: 4.5,
    reviewCount: 78,
    category: 'Custom Solutions',
    image:
      'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=400&fit=crop',
    badge: undefined,
    inStock: true,
    description:
      'Spill containment pallet for drums and hazardous materials. Regulatory compliant.',
    fullDescription:
      'The Drum Spill Containment Pallet is an essential safety product for storing and handling drums containing hazardous liquids. With a sump capacity of 250 litres (4-drum version), it exceeds EPA, OSHA, and local environmental regulations for secondary containment.\n\nThe removable polyethylene grate allows easy cleaning of the sump, while the low-profile design keeps drum loading height manageable. Fork pockets on all four sides allow easy repositioning.\n\nChemically resistant to oils, fuels, solvents, and most concentrated acids. Available in 1-drum, 2-drum, and 4-drum configurations. Optional ramp accessory available for drum trolley access.',
  },
  {
    name: 'Attached Lid Container – 600×400mm',
    price: 38.5,
    originalPrice: undefined,
    rating: 4.6,
    reviewCount: 167,
    category: 'Crates & Bins',
    image:
      'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=400&h=400&fit=crop',
    badge: undefined,
    inStock: true,
    description:
      'Secure attached-lid design prevents loss. Tamper-evident options available.',
    fullDescription:
      'The Attached Lid Container (600×400mm) combines security with convenience. The permanently hinged lid eliminates the problem of lost or mismatched lids, while the snap-lock closure keeps contents secure during transport and storage.\n\nWhen open, the lid folds back flat against the container side. When the container is empty, it nests inside other containers to save space — reducing empty return transport costs by up to 65%.\n\nOptional tamper-evident cable tie points and padlock lugs available for high-security applications. Load capacity: 25 kg. Compatible with all 600×400mm modular logistics equipment. Available in 5 colours for sortation and identification.',
  },
];

async function seed() {
  const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'paft_cms',
    entities: [Product],
    synchronize: true,
  });

  await dataSource.initialize();
  console.log('Connected to database');

  const repo = dataSource.getRepository(Product);

  // Clear existing products and re-seed to include fullDescription
  await repo.clear();
  console.log('Cleared existing products');

  for (const p of products) {
    const product = repo.create(p);
    await repo.save(product);
  }

  console.log(`✅ Seeded ${products.length} products successfully!`);
  await dataSource.destroy();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
