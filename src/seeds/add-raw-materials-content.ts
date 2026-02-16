import { DataSource } from 'typeorm';
import { Content } from '../content/entities/content.entity';

const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'paft_cms',
    entities: [Content],
    synchronize: false,
});

const rawMaterialsContent = [
    // Hero Section
    { page: 'raw-materials', section: 'hero', key: 'badge-text', value: 'Raw Material Supply', sortOrder: 1 },
    { page: 'raw-materials', section: 'hero', key: 'title', value: 'Sustainable<br />Materials', sortOrder: 2 },
    { page: 'raw-materials', section: 'hero', key: 'description', value: 'Our commitment to sustainability drives innovation in polymer technology. We develop advanced materials that minimize environmental impact while delivering superior performance. Explore our eco-conscious product portfolio designed for a greener future.', sortOrder: 3 },

    // Stats
    { page: 'raw-materials', section: 'stats', key: 'stat-1-value', value: '5', sortOrder: 10 },
    { page: 'raw-materials', section: 'stats', key: 'stat-1-label', value: 'Material Grades', sortOrder: 11 },
    { page: 'raw-materials', section: 'stats', key: 'stat-2-value', value: '100%', sortOrder: 12 },
    { page: 'raw-materials', section: 'stats', key: 'stat-2-label', value: 'Recyclable', sortOrder: 13 },
    { page: 'raw-materials', section: 'stats', key: 'stat-3-value', value: 'HDPE', sortOrder: 14 },
    { page: 'raw-materials', section: 'stats', key: 'stat-3-label', value: 'Polymer Base', sortOrder: 15 },
    { page: 'raw-materials', section: 'stats', key: 'stat-4-value', value: 'ISO', sortOrder: 16 },
    { page: 'raw-materials', section: 'stats', key: 'stat-4-label', value: 'Certified', sortOrder: 17 },

    // Section Headers
    { page: 'raw-materials', section: 'materials-grid', key: 'section-title', value: 'Our Materials', sortOrder: 20 },
    { page: 'raw-materials', section: 'materials-grid', key: 'section-subtitle', value: 'Discover our range of sustainable polymer solutions', sortOrder: 21 },

    { page: 'raw-materials', section: 'data-sheets', key: 'section-title', value: 'Product Data Sheets', sortOrder: 22 },
    { page: 'raw-materials', section: 'data-sheets', key: 'section-subtitle', value: 'Explore our comprehensive range of sustainable polymer materials', sortOrder: 23 },

    // Material 1: Regular Grade
    { page: 'raw-materials', section: 'material-1', key: 'title', value: 'Recycled HDPE - Regular Grade', sortOrder: 30 },
    { page: 'raw-materials', section: 'material-1', key: 'image', value: 'https://paft.eg/wp-content/uploads/2025/10/picture.png', sortOrder: 31 },
    { page: 'raw-materials', section: 'material-1', key: 'polymer', value: 'Recycled high-density polyethylene', sortOrder: 32 },
    { page: 'raw-materials', section: 'material-1', key: 'source', value: 'Bottles, containers, industrial scrap', sortOrder: 33 },
    { page: 'raw-materials', section: 'material-1', key: 'color', value: 'White, black or colored', sortOrder: 34 },
    { page: 'raw-materials', section: 'material-1', key: 'additives', value: 'Stabilizers, pigments, antioxidants', sortOrder: 35 },
    { page: 'raw-materials', section: 'material-1', key: 'link', value: 'https://paft.eg/mat1', sortOrder: 36 },

    // Material 2: Medium Flow
    { page: 'raw-materials', section: 'material-2', key: 'title', value: 'Recycled HDPE - Medium Flow Rate', sortOrder: 40 },
    { page: 'raw-materials', section: 'material-2', key: 'image', value: 'https://paft.eg/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-08-at-3.14.00-PM.jpeg', sortOrder: 41 },
    { page: 'raw-materials', section: 'material-2', key: 'polymer', value: 'Recycled high-density polyethylene', sortOrder: 42 },
    { page: 'raw-materials', section: 'material-2', key: 'source', value: 'Bottles, containers, industrial scrap', sortOrder: 43 },
    { page: 'raw-materials', section: 'material-2', key: 'color', value: 'White, black or colored', sortOrder: 44 },
    { page: 'raw-materials', section: 'material-2', key: 'additives', value: 'Stabilizers, pigments, antioxidants', sortOrder: 45 },
    { page: 'raw-materials', section: 'material-2', key: 'link', value: 'https://paft.eg/mat4', sortOrder: 46 },

    // Material 3: High Flow
    { page: 'raw-materials', section: 'material-3', key: 'title', value: 'Recycled HDPE - High Flow Rate', sortOrder: 50 },
    { page: 'raw-materials', section: 'material-3', key: 'image', value: 'https://paft.eg/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-08-at-3.13.59-PM.jpeg', sortOrder: 51 },
    { page: 'raw-materials', section: 'material-3', key: 'polymer', value: 'Recycled high-density polyethylene', sortOrder: 52 },
    { page: 'raw-materials', section: 'material-3', key: 'source', value: 'Bottles, containers, industrial scrap', sortOrder: 53 },
    { page: 'raw-materials', section: 'material-3', key: 'color', value: 'White, black or colored', sortOrder: 54 },
    { page: 'raw-materials', section: 'material-3', key: 'additives', value: 'Stabilizers, pigments, antioxidants', sortOrder: 55 },
    { page: 'raw-materials', section: 'material-3', key: 'link', value: 'https://paft.eg/mat5', sortOrder: 56 },

    // Material 4: High Performance
    { page: 'raw-materials', section: 'material-4', key: 'title', value: 'Recycled HDPE - High Performance', sortOrder: 60 },
    { page: 'raw-materials', section: 'material-4', key: 'image', value: 'https://paft.eg/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-08-at-3.14.00-PM-1.jpeg', sortOrder: 61 },
    { page: 'raw-materials', section: 'material-4', key: 'polymer', value: 'Recycled high-density polyethylene', sortOrder: 62 },
    { page: 'raw-materials', section: 'material-4', key: 'source', value: 'Bottles, containers, industrial scrap', sortOrder: 63 },
    { page: 'raw-materials', section: 'material-4', key: 'color', value: 'White, black or colored', sortOrder: 64 },
    { page: 'raw-materials', section: 'material-4', key: 'additives', value: 'Stabilizers, pigments, antioxidants', sortOrder: 65 },
    { page: 'raw-materials', section: 'material-4', key: 'link', value: 'https://paft.eg/mat3', sortOrder: 66 },

    // Material 5: Mid Performance
    { page: 'raw-materials', section: 'material-5', key: 'title', value: 'Recycled HDPE - Mid Performance', sortOrder: 70 },
    { page: 'raw-materials', section: 'material-5', key: 'image', value: 'https://paft.eg/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-08-at-3.14.01-PM.jpeg', sortOrder: 71 },
    { page: 'raw-materials', section: 'material-5', key: 'polymer', value: 'Recycled high-density polyethylene', sortOrder: 72 },
    { page: 'raw-materials', section: 'material-5', key: 'source', value: 'Bottles, containers, industrial scrap', sortOrder: 73 },
    { page: 'raw-materials', section: 'material-5', key: 'color', value: 'White, black or colored', sortOrder: 74 },
    { page: 'raw-materials', section: 'material-5', key: 'additives', value: 'Stabilizers, pigments, antioxidants', sortOrder: 75 },
    { page: 'raw-materials', section: 'material-5', key: 'link', value: 'https://paft.eg/mat2', sortOrder: 76 },

    // Data Sheet 1: Regular
    { page: 'raw-materials', section: 'sheet-1', key: 'title', value: 'Recycled HDPE - Regular Grade', sortOrder: 100 },
    { page: 'raw-materials', section: 'sheet-1', key: 'subtitle', value: 'Standard Performance', sortOrder: 101 },
    { page: 'raw-materials', section: 'sheet-1', key: 'badges', value: 'Injection Molding,High Stiffness,Recyclable', sortOrder: 102 },
    { page: 'raw-materials', section: 'sheet-1', key: 'description', value: 'Recycled HDPE - Regular Grade offers reliable standard performance for general-purpose applications. This recycled high-density polyethylene provides good mechanical properties, chemical resistance, and processability at an economical price point. Suitable for a wide range of injection molding applications including crates, boxes, containers, household items, and industrial parts where standard performance characteristics are required.', sortOrder: 103 },
    { page: 'raw-materials', section: 'sheet-1', key: 'datasheetUrl', value: 'https://paft.eg/mat1', sortOrder: 104 },
    { page: 'raw-materials', section: 'sheet-1', key: 'pdfUrl', value: 'https://paft.eg/wp-content/uploads/2025/10/Materials-Datasheet-r-HDPE-Reqular-mat-1-003.pdf', sortOrder: 105 },

    // Data Sheet 2: Mid Perf
    { page: 'raw-materials', section: 'sheet-2', key: 'title', value: 'Recycled HDPE - Mid Performance', sortOrder: 110 },
    { page: 'raw-materials', section: 'sheet-2', key: 'subtitle', value: 'Enhanced Impact', sortOrder: 111 },
    { page: 'raw-materials', section: 'sheet-2', key: 'badges', value: 'Blow Molding,ESCR Resistant,100% Recyclable', sortOrder: 112 },
    { page: 'raw-materials', section: 'sheet-2', key: 'description', value: 'Recycled HDPE - Mid Performance is a mid-performance grade offering enhanced impact resistance and improved mechanical properties compared to regular grade. This balanced formulation combines good stiffness with superior toughness, making it suitable for demanding applications. Enhanced impact strength ensures reliability even under stress, perfect for industrial containers, transport packaging, technical parts, and applications requiring durability in challenging environments.', sortOrder: 113 },
    { page: 'raw-materials', section: 'sheet-2', key: 'datasheetUrl', value: 'https://paft.eg/mat2', sortOrder: 114 },
    { page: 'raw-materials', section: 'sheet-2', key: 'pdfUrl', value: 'https://paft.eg/wp-content/uploads/2025/10/Materials-Datasheet-r-HDPE-Mid.-Perf.-mat-2-004.pdf', sortOrder: 115 },

    // Data Sheet 3: High Perf
    { page: 'raw-materials', section: 'sheet-3', key: 'title', value: 'Recycled HDPE - High Performance', sortOrder: 120 },
    { page: 'raw-materials', section: 'sheet-3', key: 'subtitle', value: 'Maximum Toughness', sortOrder: 121 },
    { page: 'raw-materials', section: 'sheet-3', key: 'badges', value: 'Pressure Pipes,Long-Term Durability,UV Stabilized', sortOrder: 122 },
    { page: 'raw-materials', section: 'sheet-3', key: 'description', value: 'Recycled HDPE - High Performance delivers maximum toughness and is the highest performance grade in our recycled HDPE portfolio. This premium grade offers exceptional mechanical properties, superior stress crack resistance, and outstanding durability for the most demanding applications. Ideal for heavy-duty industrial components, high-stress structural parts, large containers, and critical applications where maximum material performance and long-term reliability are essential.', sortOrder: 123 },
    { page: 'raw-materials', section: 'sheet-3', key: 'datasheetUrl', value: 'https://paft.eg/mat3', sortOrder: 124 },
    { page: 'raw-materials', section: 'sheet-3', key: 'pdfUrl', value: 'https://paft.eg/wp-content/uploads/2025/10/Materials-Datasheet-r-HDPE-HI.-Perf.-mat-3-copy.pdf', sortOrder: 125 },

    // Data Sheet 4: Med Flow
    { page: 'raw-materials', section: 'sheet-4', key: 'title', value: 'Recycled HDPE - Medium Flow Rate', sortOrder: 130 },
    { page: 'raw-materials', section: 'sheet-4', key: 'subtitle', value: 'Balanced Processing', sortOrder: 131 },
    { page: 'raw-materials', section: 'sheet-4', key: 'badges', value: 'General Purpose,Excellent Finish,Recyclable', sortOrder: 132 },
    { page: 'raw-materials', section: 'sheet-4', key: 'description', value: 'Recycled HDPE - Medium Flow Rate features balanced processing characteristics for injection molding and extrusion applications. This grade offers excellent flow properties while maintaining good mechanical strength and dimensional stability. The medium flow rate enables efficient filling of molds with moderate complexity, making it ideal for containers, caps, closures, and technical parts requiring a balance between processability and performance.', sortOrder: 133 },
    { page: 'raw-materials', section: 'sheet-4', key: 'datasheetUrl', value: 'https://paft.eg/mat4', sortOrder: 134 },
    { page: 'raw-materials', section: 'sheet-4', key: 'pdfUrl', value: 'https://paft.eg/wp-content/uploads/2025/10/Materials-Datasheet-r-HDPE-Mid.-MFR-mat-4-copy-002.pdf', sortOrder: 135 },

    // Data Sheet 5: High Flow
    { page: 'raw-materials', section: 'sheet-5', key: 'title', value: 'Recycled HDPE - High Flow Rate', sortOrder: 140 },
    { page: 'raw-materials', section: 'sheet-5', key: 'subtitle', value: 'Fast Cycle Times', sortOrder: 141 },
    { page: 'raw-materials', section: 'sheet-5', key: 'badges', value: 'Thin-Wall Molding,High Output,UV Stabilized', sortOrder: 142 },
    { page: 'raw-materials', section: 'sheet-5', key: 'description', value: 'Recycled HDPE - High Flow Rate is engineered for fast cycle time applications and thin-wall molding. This free-flowing material offers excellent processability with rapid mold filling and short cooling times, significantly improving production efficiency. Ideal for high-volume manufacturing of thin-wall containers, packaging components, closures, and applications where fast processing and high output are critical. Perfect for maximizing productivity while maintaining consistent quality.', sortOrder: 143 },
    { page: 'raw-materials', section: 'sheet-5', key: 'datasheetUrl', value: 'https://paft.eg/mat5', sortOrder: 144 },
    { page: 'raw-materials', section: 'sheet-5', key: 'pdfUrl', value: 'https://paft.eg/wp-content/uploads/2025/10/Materials-Datasheet-r-HDPE-HI.-MFR-mat-5-copy.pdf', sortOrder: 145 },

    // CTA Section
    { page: 'raw-materials', section: 'cta', key: 'cta-title', value: 'Ready to go Sustainable?', sortOrder: 150 },
    { page: 'raw-materials', section: 'cta', key: 'cta-description', value: 'Let us help you transition to high-grade recycled materials without compromising on quality', sortOrder: 151 },
];

async function addRawMaterialsContent() {
    try {
        console.log('🔌 Connecting to database...');
        await dataSource.initialize();
        console.log('✅ Database connection established');

        const contentRepository = dataSource.getRepository(Content);

        console.log('🧹 Clearing existing raw-materials content...');
        await contentRepository.delete({ page: 'raw-materials' });
        console.log('✅ Existing content cleared');

        console.log('📦 Adding raw-materials content...');

        for (const contentData of rawMaterialsContent) {
            const content = contentRepository.create(contentData);
            await contentRepository.save(content);
            console.log(`✅ Added: ${content.section} - ${content.key}`);
        }

        console.log(`\n🎉 Successfully added ${rawMaterialsContent.length} content items!`);

    } catch (error) {
        console.error('❌ Error adding content:', error);
    } finally {
        if (dataSource.isInitialized) {
            await dataSource.destroy();
            console.log('🔌 Database connection closed');
        }
    }
}

addRawMaterialsContent();
