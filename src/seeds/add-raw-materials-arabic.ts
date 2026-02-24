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

async function addRawMaterialsArabic() {
  try {
    await AppDataSource.initialize();
    console.log('✅ Database connected');

    const contentRepo = AppDataSource.getRepository(Content);

    // Arabic translations for Raw Materials page
    const arabicTranslations: { [key: string]: string } = {
      // Hero Section
      'hero-badge-text': 'توريد المواد الخام',
      'hero-title': 'مواد مستدامة',
      'hero-description': 'التزامنا بالاستدامة يدفع الابتكار في تكنولوجيا البوليمر. نطور مواد متقدمة تقلل من التأثير البيئي مع تقديم أداء متفوق. استكشف محفظة منتجاتنا الصديقة للبيئة المصممة لمستقبل أكثر خضرة.',
      'hero-stat-1-value': '5',
      'hero-stat-1-label': 'درجات المواد',
      'hero-stat-2-value': '100%',
      'hero-stat-2-label': 'قابل لإعادة التدوير',
      'hero-stat-3-value': 'HDPE',
      'hero-stat-3-label': 'قاعدة البوليمر',
      'hero-stat-4-value': 'ISO',
      'hero-stat-4-label': 'معتمد',

      // Material 1
      'material-1-title': 'HDPE المعاد تدويره - درجة عادية',
      'material-1-polymer': 'بولي إيثيلين عالي الكثافة معاد تدويره',
      'material-1-source': 'زجاجات، حاويات، خردة صناعية',
      'material-1-color': 'أبيض، أسود أو ملون',
      'material-1-additives': 'مثبتات، أصباغ، مضادات أكسدة',

      // Material 2
      'material-2-title': 'HDPE المعاد تدويره - معدل تدفق متوسط',
      'material-2-polymer': 'بولي إيثيلين عالي الكثافة معاد تدويره',
      'material-2-source': 'زجاجات، حاويات، خردة صناعية',
      'material-2-color': 'أبيض، أسود أو ملون',
      'material-2-additives': 'مثبتات، أصباغ، مضادات أكسدة',

      // Material 3
      'material-3-title': 'HDPE المعاد تدويره - معدل تدفق عالي',
      'material-3-polymer': 'بولي إيثيلين عالي الكثافة معاد تدويره',
      'material-3-source': 'زجاجات، حاويات، خردة صناعية',
      'material-3-color': 'أبيض، أسود أو ملون',
      'material-3-additives': 'مثبتات، أصباغ، مضادات أكسدة',

      // Material 4
      'material-4-title': 'HDPE المعاد تدويره - أداء عالي',
      'material-4-polymer': 'بولي إيثيلين عالي الكثافة معاد تدويره',
      'material-4-source': 'زجاجات، حاويات، خردة صناعية',
      'material-4-color': 'أبيض، أسود أو ملون',
      'material-4-additives': 'مثبتات، أصباغ، مضادات أكسدة',

      // Material 5
      'material-5-title': 'HDPE المعاد تدويره - أداء متوسط',
      'material-5-polymer': 'بولي إيثيلين عالي الكثافة معاد تدويره',
      'material-5-source': 'زجاجات، حاويات، خردة صناعية',
      'material-5-color': 'أبيض، أسود أو ملون',
      'material-5-additives': 'مثبتات، أصباغ، مضادات أكسدة',

      // Sheet 1
      'sheet-1-title': 'HDPE المعاد تدويره - درجة عادية',
      'sheet-1-subtitle': 'أداء قياسي',
      'sheet-1-badges': 'قولبة بالحقن, صلابة عالية, قابل لإعادة التدوير',
      'sheet-1-description': 'HDPE المعاد تدويره - الدرجة العادية يوفر أداءً قياسيًا موثوقًا للتطبيقات ذات الأغراض العامة. يوفر هذا البولي إيثيلين عالي الكثافة المعاد تدويره خصائص ميكانيكية جيدة ومقاومة كيميائية وقابلية للمعالجة بسعر اقتصادي. مناسب لمجموعة واسعة من تطبيقات القولبة بالحقن بما في ذلك الصناديق والحاويات والأدوات المنزلية والمكونات الصناعية.',

      // Sheet 2
      'sheet-2-title': 'HDPE المعاد تدويره - أداء متوسط',
      'sheet-2-subtitle': 'تأثير محسّن',
      'sheet-2-badges': 'قولبة بالنفخ, مقاوم للتشقق, قابل لإعادة التدوير 100%',
      'sheet-2-description': 'HDPE المعاد تدويره - الأداء المتوسط هو درجة متوسطة الأداء توفر مقاومة محسّنة للصدمات وخصائص ميكانيكية محسّنة مقارنة بالدرجة العادية. تجمع هذه التركيبة المتوازنة بين الصلابة الجيدة والمتانة الفائقة، مما يجعلها مناسبة للتطبيقات الصعبة. قوة الصدمات المحسّنة تضمن الموثوقية حتى تحت الضغط.',

      // Sheet 3
      'sheet-3-title': 'HDPE المعاد تدويره - أداء عالي',
      'sheet-3-subtitle': 'أقصى متانة',
      'sheet-3-badges': 'أنابيب الضغط, متانة طويلة الأمد, مثبت ضد الأشعة فوق البنفسجية',
      'sheet-3-description': 'HDPE المعاد تدويره - الأداء العالي يوفر أقصى متانة وهو أعلى درجة أداء في محفظة HDPE المعاد تدويرها لدينا. توفر هذه الدرجة المتميزة خصائص ميكانيكية استثنائية ومقاومة فائقة للتشقق الإجهادي ومتانة ممتازة للتطبيقات الأكثر تطلبًا. مثالي للمكونات الصناعية الثقيلة والهياكل عالية الإجهاد.',

      // Sheet 4
      'sheet-4-title': 'HDPE المعاد تدويره - معدل تدفق متوسط',
      'sheet-4-subtitle': 'معالجة متوازنة',
      'sheet-4-badges': 'أغراض عامة, تشطيب ممتاز, قابل لإعادة التدوير',
      'sheet-4-description': 'HDPE المعاد تدويره - معدل التدفق المتوسط يتميز بخصائص معالجة متوازنة لتطبيقات القولبة بالحقن والبثق. توفر هذه الدرجة خصائص تدفق ممتازة مع الحفاظ على قوة ميكانيكية جيدة واستقرار الأبعاد. معدل التدفق المتوسط يتيح ملء فعال للقوالب ذات التعقيد المعتدل.',

      // Sheet 5
      'sheet-5-title': 'HDPE المعاد تدويره - معدل تدفق عالي',
      'sheet-5-subtitle': 'أوقات دورة سريعة',
      'sheet-5-badges': 'قولبة الجدران الرقيقة, إنتاج عالي, مثبت ضد الأشعة فوق البنفسجية',
      'sheet-5-description': 'HDPE المعاد تدويره - معدل التدفق العالي مصمم لتطبيقات وقت الدورة السريع وقولبة الجدران الرقيقة. توفر هذه المادة سريعة التدفق قابلية معالجة ممتازة مع ملء سريع للقالب وأوقات تبريد قصيرة، مما يحسن كفاءة الإنتاج بشكل كبير. مثالي للتصنيع عالي الحجم للحاويات ذات الجدران الرقيقة.',

      // CTA Section
      'cta-cta-title': 'هل تحتاج مواد مخصصة؟',
      'cta-cta-description': 'اتصل بفريق المواد لدينا للحصول على تركيبات بوليمر مخصصة ودعم فني',
      
      // Section Titles
      'materials-section-title': 'موادنا',
      'materials-section-subtitle': 'اكتشف مجموعتنا من حلول البوليمر المستدامة',
      'datasheets-section-title': 'أوراق بيانات المنتج',
      'datasheets-section-subtitle': 'استكشف مجموعتنا الشاملة من مواد البوليمر المستدامة',
      
      // CTA Buttons
      'cta-button-sample': 'اطلب عينة ←',
      'cta-button-contact': 'تواصل مع المبيعات',
    };

    console.log('🔄 Updating Raw Materials content with Arabic translations...');

    let updatedCount = 0;
    for (const [fullKey, valueAr] of Object.entries(arabicTranslations)) {
      // Split the key into section and key
      const parts = fullKey.split('-');
      let section = '';
      let key = '';
      
      // Handle different key formats
      if (fullKey.startsWith('hero-')) {
        section = 'hero';
        key = fullKey.replace('hero-', '');
      } else if (fullKey.startsWith('material-')) {
        const match = fullKey.match(/^(material-\d+)-(.+)$/);
        if (match) {
          section = match[1];
          key = match[2];
        }
      } else if (fullKey.startsWith('sheet-')) {
        const match = fullKey.match(/^(sheet-\d+)-(.+)$/);
        if (match) {
          section = match[1];
          key = match[2];
        }
      } else if (fullKey.startsWith('cta-')) {
        section = 'cta';
        key = fullKey.replace('cta-', '');
      }

      const content = await contentRepo.findOne({
        where: {
          page: 'raw-materials',
          section: section,
          key: key,
        },
      });

      if (content) {
        content.valueAr = valueAr;
        await contentRepo.save(content);
        console.log(`✅ Updated: ${section} - ${key}`);
        updatedCount++;
      } else {
        console.log(`⚠️  Not found: ${section} - ${key}`);
      }
    }

    console.log(`\n✅ Successfully updated ${updatedCount} entries with Arabic translations`);
    console.log('✅ Raw Materials Arabic content added successfully!');

    await AppDataSource.destroy();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

addRawMaterialsArabic();
