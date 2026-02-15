import { DataSource } from 'typeorm';
import { Content } from '../content/entities/content.entity';

export async function seedOurJourneyContent(dataSource: DataSource) {
  const contentRepository = dataSource.getRepository(Content);

  // Check if content already exists
  const existingContent = await contentRepository.findOne({
    where: { page: 'our-journey' },
  });

  if (existingContent) {
    console.log('Our Journey content already exists, skipping seed...');
    return;
  }

  const ourJourneyContent = [
    // Hero Section
    {
      page: 'our-journey',
      section: 'hero',
      key: 'badge-text',
      value: 'Our Journey',
      sortOrder: 1,
    },
    {
      page: 'our-journey',
      section: 'hero',
      key: 'title',
      value: 'Building the Future',
      sortOrder: 2,
    },
    {
      page: 'our-journey',
      section: 'hero',
      key: 'description',
      value: 'Over a decade of innovation, growth, and relentless pursuit of excellence in industrial packaging solutions.',
      sortOrder: 3,
    },
    {
      page: 'our-journey',
      section: 'hero',
      key: 'stat1-value',
      value: '15+',
      sortOrder: 4,
    },
    {
      page: 'our-journey',
      section: 'hero',
      key: 'stat1-label',
      value: 'Years of Innovation',
      sortOrder: 5,
    },
    {
      page: 'our-journey',
      section: 'hero',
      key: 'stat2-value',
      value: '12',
      sortOrder: 6,
    },
    {
      page: 'our-journey',
      section: 'hero',
      key: 'stat2-label',
      value: 'Key Milestones',
      sortOrder: 7,
    },
    {
      page: 'our-journey',
      section: 'hero',
      key: 'stat3-value',
      value: '4',
      sortOrder: 8,
    },
    {
      page: 'our-journey',
      section: 'hero',
      key: 'stat3-label',
      value: 'Growth Eras',
      sortOrder: 9,
    },
    {
      page: 'our-journey',
      section: 'hero',
      key: 'stat4-value',
      value: '300%',
      sortOrder: 10,
    },
    {
      page: 'our-journey',
      section: 'hero',
      key: 'stat4-label',
      value: 'Capacity Growth',
      sortOrder: 11,
    },

    // Timeline Milestones
    {
      page: 'our-journey',
      section: 'timeline',
      key: 'milestone1-year',
      value: '2010',
      sortOrder: 1,
    },
    {
      page: 'our-journey',
      section: 'timeline',
      key: 'milestone1-title',
      value: 'Started to own molds design and manufacturing',
      sortOrder: 2,
    },
    {
      page: 'our-journey',
      section: 'timeline',
      key: 'milestone2-year',
      value: '2012',
      sortOrder: 3,
    },
    {
      page: 'our-journey',
      section: 'timeline',
      key: 'milestone2-title',
      value: 'Started co-manufacturing pallets in China',
      sortOrder: 4,
    },
    {
      page: 'our-journey',
      section: 'timeline',
      key: 'milestone3-year',
      value: '2013',
      sortOrder: 5,
    },
    {
      page: 'our-journey',
      section: 'timeline',
      key: 'milestone3-title',
      value: 'Developed 5th Generation mold for heavy duty steel reinforced plastic pallets with R&D center in UAE',
      sortOrder: 6,
    },
    {
      page: 'our-journey',
      section: 'timeline',
      key: 'milestone4-year',
      value: '2014',
      sortOrder: 7,
    },
    {
      page: 'our-journey',
      section: 'timeline',
      key: 'milestone4-title',
      value: 'Launched woodchip export pallets production in Egypt',
      sortOrder: 8,
    },
    {
      page: 'our-journey',
      section: 'timeline',
      key: 'milestone5-year',
      value: '2017',
      sortOrder: 9,
    },
    {
      page: 'our-journey',
      section: 'timeline',
      key: 'milestone5-title',
      value: 'Replaced woodchip pallets with plastic export pallets',
      sortOrder: 10,
    },
    {
      page: 'our-journey',
      section: 'timeline',
      key: 'milestone6-year',
      value: '2018',
      sortOrder: 11,
    },
    {
      page: 'our-journey',
      section: 'timeline',
      key: 'milestone6-title',
      value: 'Started manufacturing Plastic Pallets in Morocco while adding new molds to the portfolio',
      sortOrder: 12,
    },
    {
      page: 'our-journey',
      section: 'timeline',
      key: 'milestone7-year',
      value: '2019',
      sortOrder: 13,
    },
    {
      page: 'our-journey',
      section: 'timeline',
      key: 'milestone7-title',
      value: 'Built new manufacturing facility with 7 times production capacity and moved Head Office',
      sortOrder: 14,
    },
    {
      page: 'our-journey',
      section: 'timeline',
      key: 'milestone8-year',
      value: '2021',
      sortOrder: 15,
    },
    {
      page: 'our-journey',
      section: 'timeline',
      key: 'milestone8-title',
      value: 'Full acquisition of PAFT business by Eng. Ahmed Alhakim',
      sortOrder: 16,
    },
    {
      page: 'our-journey',
      section: 'timeline',
      key: 'milestone9-year',
      value: '2022',
      sortOrder: 17,
    },
    {
      page: 'our-journey',
      section: 'timeline',
      key: 'milestone9-title',
      value: 'Expanding production capacity by 300% & Launching Square Pallets',
      sortOrder: 18,
    },
    {
      page: 'our-journey',
      section: 'timeline',
      key: 'milestone10-year',
      value: '2023',
      sortOrder: 19,
    },
    {
      page: 'our-journey',
      section: 'timeline',
      key: 'milestone10-title',
      value: 'PAFT started offering warehousing turnkey solutions and expanding in governmental projects',
      sortOrder: 20,
    },
    {
      page: 'our-journey',
      section: 'timeline',
      key: 'milestone11-year',
      value: '2024',
      sortOrder: 21,
    },
    {
      page: 'our-journey',
      section: 'timeline',
      key: 'milestone11-title',
      value: 'Launch NWMS, Technical Schools Expansion, Poly AL Launch',
      sortOrder: 22,
    },
    {
      page: 'our-journey',
      section: 'timeline',
      key: 'milestone12-year',
      value: '2025',
      sortOrder: 23,
    },
    {
      page: 'our-journey',
      section: 'timeline',
      key: 'milestone12-title',
      value: 'Introducing Petrochemicals pallet, Expanding Recycling Line & Setting Full Lab in Place',
      sortOrder: 24,
    },

    // Era Labels
    {
      page: 'our-journey',
      section: 'eras',
      key: 'era1-label',
      value: '1st Era',
      sortOrder: 1,
    },
    {
      page: 'our-journey',
      section: 'eras',
      key: 'era1-subtitle',
      value: 'Foundation & R&D',
      sortOrder: 2,
    },
    {
      page: 'our-journey',
      section: 'eras',
      key: 'era1-range',
      value: '2010 – 2013',
      sortOrder: 3,
    },
    {
      page: 'our-journey',
      section: 'eras',
      key: 'era2-label',
      value: '2nd Era',
      sortOrder: 4,
    },
    {
      page: 'our-journey',
      section: 'eras',
      key: 'era2-subtitle',
      value: 'Expansion & Innovation',
      sortOrder: 5,
    },
    {
      page: 'our-journey',
      section: 'eras',
      key: 'era2-range',
      value: '2014 – 2018',
      sortOrder: 6,
    },
    {
      page: 'our-journey',
      section: 'eras',
      key: 'era3-label',
      value: '3rd Era',
      sortOrder: 7,
    },
    {
      page: 'our-journey',
      section: 'eras',
      key: 'era3-subtitle',
      value: 'Growth & Acquisition',
      sortOrder: 8,
    },
    {
      page: 'our-journey',
      section: 'eras',
      key: 'era3-range',
      value: '2019 – 2022',
      sortOrder: 9,
    },
    {
      page: 'our-journey',
      section: 'eras',
      key: 'era4-label',
      value: '4th Era',
      sortOrder: 10,
    },
    {
      page: 'our-journey',
      section: 'eras',
      key: 'era4-subtitle',
      value: 'Scale & Diversification',
      sortOrder: 11,
    },
    {
      page: 'our-journey',
      section: 'eras',
      key: 'era4-range',
      value: '2023 – 2025',
      sortOrder: 12,
    },

    // CTA Section
    {
      page: 'our-journey',
      section: 'cta',
      key: 'title',
      value: 'The Journey Continues',
      sortOrder: 1,
    },
    {
      page: 'our-journey',
      section: 'cta',
      key: 'description',
      value: 'Join us as we shape the future of industrial packaging solutions across the MENA region and beyond.',
      sortOrder: 2,
    },
    {
      page: 'our-journey',
      section: 'cta',
      key: 'button1-text',
      value: 'Partner With Us →',
      sortOrder: 3,
    },
    {
      page: 'our-journey',
      section: 'cta',
      key: 'button2-text',
      value: 'Learn About PAFT',
      sortOrder: 4,
    },
  ];

  await contentRepository.save(ourJourneyContent);
  console.log('Our Journey content seeded successfully!');
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
      await seedOurJourneyContent(dataSource);
      await dataSource.destroy();
    } catch (error) {
      console.error('Error seeding our-journey content:', error);
      process.exit(1);
    }
  });
}