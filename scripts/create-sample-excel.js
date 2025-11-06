#!/usr/bin/env node

/**
 * 创建示例Excel文件
 * 用于测试Excel内容导入工具
 */

import xlsx from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 示例数据
const sampleData = [
  {
    pageId: 'academy',
    section: 'hero',
    fieldKey: 'title',
    zh: '51Talk Academy 专业英语教育',
    en: '51Talk Academy Professional English Education',
    ar: '51Talk Academy تعليم الإنجليزية الاحتراف',
    imagePath: '/images/academy/hero-title.png'
  },
  {
    pageId: 'academy',
    section: 'hero',
    fieldKey: 'subtitle',
    zh: '为全球学习者提供专业英语课程',
    en: 'Professional English courses for global learners',
    ar: 'دورات إنجليزية احترافية للمتعلمين حول العالم',
    imagePath: '/images/academy/hero-subtitle.png'
  },
  {
    pageId: 'academy',
    section: 'hero',
    fieldKey: 'description',
    zh: '我们致力于为每一位学习者提供最优质的英语教育体验，通过智能化的教学方法和专业的师资团队，帮助您快速提升英语水平。',
    en: 'We are committed to providing the highest quality English education experience for every learner. Through intelligent teaching methods and professional teaching teams, we help you quickly improve your English proficiency.',
    ar: 'نحن ملتزمون بتقديم أفضل تجربة تعليمية باللغة الإنجليزية لكل متعلم. من خلال أساليب التدريب الذكية وفرق التدريب المحترفة، نساعدك على تحسين إتقانك باللغة الإنجليزية بسرعة.',
    imagePath: ''
  },
  {
    pageId: 'academy',
    section: 'hero',
    fieldKey: 'ctaText',
    zh: '立即开始学习',
    en: 'Start Learning Now',
    ar: 'ابدأ التعلم الآن',
    imagePath: '/images/academy/hero-button.png'
  },
  {
    pageId: 'academy',
    section: 'features',
    fieldKey: 'title',
    zh: '我们的优势',
    en: 'Our Advantages',
    ar: 'ميزاتنا',
    imagePath: '/images/academy/features-title.png'
  },
  {
    pageId: 'academy',
    section: 'features',
    fieldKey: 'feature1Title',
    zh: '专业师资团队',
    en: 'Professional Teaching Team',
    ar: 'فريق تدريس محترف',
    imagePath: '/images/academy/feature-1.png'
  },
  {
    pageId: 'academy',
    section: 'features',
    fieldKey: 'feature1Desc',
    zh: '经验丰富的母语教师，持有国际认证证书',
    en: 'Experienced native-speaking teachers with international certifications',
    ar: 'معلمون أصليون ذوو خبرة مع شهادات دولية معتمدة',
    imagePath: ''
  },
  {
    pageId: 'academy',
    section: 'features',
    fieldKey: 'feature2Title',
    zh: '灵活学习时间',
    en: 'Flexible Learning Time',
    ar: 'وقت تعلم مرن',
    imagePath: '/images/academy/feature-2.png'
  },
  {
    pageId: 'academy',
    section: 'features',
    fieldKey: 'feature2Desc',
    zh: '随时随地在线学习，根据自己的节奏安排学习计划',
    en: 'Learn online anytime, anywhere, and arrange your study schedule according to your own pace',
    ar: 'تعلم عبر الإنترنت في أي وقت ومكان، ورتب جدول الدراسة حسب وتيرتك الخاص',
    imagePath: ''
  },
  {
    pageId: 'academy',
    section: 'features',
    fieldKey: 'feature3Title',
    zh: '个性化学习方案',
    en: 'Personalized Learning Plans',
    ar: 'خطط تعلم مخصصة',
    imagePath: '/images/academy/feature-3.png'
  },
  {
    pageId: 'academy',
    section: 'features',
    fieldKey: 'feature3Desc',
    zh: 'AI智能推荐系统，根据您的水平和目标定制专属学习路径',
    en: 'AI intelligent recommendation system, customizing exclusive learning paths based on your level and goals',
    ar: 'نظام توصية ذكي بالذكاء الاصطناعي، يخصص مسارات تعليمية حصرية بناءً على مستواك وأهدافك',
    imagePath: ''
  },
  {
    pageId: 'academy',
    section: 'courses',
    fieldKey: 'title',
    zh: '课程体系',
    en: 'Course System',
    ar: 'نظام الدورات',
    imagePath: '/images/academy/courses-title.png'
  },
  {
    pageId: 'academy',
    section: 'courses',
    fieldKey: 'course1Title',
    zh: '商务英语进阶',
    en: 'Business English Advanced',
    ar: 'الإنجليزية التجارية المتقدمة',
    imagePath: '/images/academy/course-1.png'
  },
  {
    pageId: 'academy',
    section: 'courses',
    fieldKey: 'course1Desc',
    zh: '适合职场人士，提升商务沟通和演讲能力',
    en: 'Suitable for professionals, enhancing business communication and presentation skills',
    ar: 'مناسب للمحترفين، يعزز مهارات التواصل التجاري والعرض التقديمي',
    imagePath: ''
  },
  {
    pageId: 'academy',
    section: 'courses',
    fieldKey: 'course2Title',
    zh: '雅思冲刺课程',
    en: 'IELTS Intensive Course',
    ar: 'دورة الإيلتس المكثفة',
    imagePath: '/images/academy/course-2.png'
  },
  {
    pageId: 'academy',
    section: 'courses',
    fieldKey: 'course2Desc',
    zh: '系统化雅思备考，听说读写全面覆盖',
    en: 'Systematic IELTS preparation, comprehensive coverage of listening, speaking, reading, and writing',
    ar: 'إعداد منهجي لاختبار الإيلتس، تغطية شاملة للاستماع والتحدث والقراءة والكتابة',
    imagePath: ''
  },
  {
    pageId: 'academy',
    section: 'testimonials',
    fieldKey: 'title',
    zh: '学员评价',
    en: 'Student Testimonials',
    ar: 'تقييمات الطلاب',
    imagePath: '/images/academy/testimonials-title.png'
  },
  {
    pageId: 'academy',
    section: 'testimonials',
    fieldKey: 'testimonial1Name',
    zh: '张先生',
    en: 'Mr. Zhang',
    ar: 'السيد تشانغ',
    imagePath: '/images/academy/student-1.png'
  },
  {
    pageId: 'academy',
    section: 'testimonials',
    fieldKey: 'testimonial1Content',
    zh: '通过51Talk的系统学习，我在3个月内就通过了雅思考试，老师们非常专业！',
    en: 'Through 51Talk\'s systematic learning, I passed the IELTS exam in just 3 months. The teachers are very professional!',
    ar: 'من خلال التعلم المنهجي في 51Talk، نجحت في اجتياز اختبار الإيلتس في 3 أشهر فقط. المعلمون محترفون جدًا!',
    imagePath: ''
  },
  {
    pageId: 'academy',
    section: 'cta',
    fieldKey: 'title',
    zh: '准备开始您的英语学习之旅了吗？',
    en: 'Ready to start your English learning journey?',
    ar: 'هل أنت مستعد لبدء رحلة تعلم اللغة الإنجليزية؟',
    imagePath: '/images/academy/cta-title.png'
  },
  {
    pageId: 'academy',
    section: 'cta',
    fieldKey: 'buttonText',
    zh: '免费试听课程',
    en: 'Free Trial Lesson',
    ar: 'درسة تجريبية مجانية',
    imagePath: '/images/academy/cta-button.png'
  }
];

// 创建工作簿
const wb = xlsx.utils.book_new();

// 创建内容模板工作表
const ws = xlsx.utils.json_to_sheet(sampleData);
xlsx.utils.book_append_sheet(wb, ws, 'ContentTemplate');

// 创建字段参考工作表
const referenceData = [
  { Field: 'pageId', Description: '页面ID，用于匹配页面变体配置', Required: '是' },
  { Field: 'section', Description: '页面区块名称，如hero、features等', Required: '是' },
  { Field: 'fieldKey', Description: '字段键名，用于标识具体字段', Required: '是' },
  { Field: 'zh', Description: '中文内容', Required: '否' },
  { Field: 'en', Description: '英文内容', Required: '否' },
  { Field: 'ar', Description: '阿拉伯语内容', Required: '否' },
  { Field: 'imagePath', Description: '图片路径，相对路径', Required: '否' }
];

const wsRef = xlsx.utils.json_to_sheet(referenceData);
xlsx.utils.book_append_sheet(wb, wsRef, 'FieldReference');

// 保存Excel文件
const outputPath = path.join(__dirname, '../51Talk_Academy_LandingPage.xlsx');
xlsx.writeFile(wb, outputPath);

console.log('✅ 示例Excel文件已创建:', outputPath);
console.log('📊 包含内容模板工作表和字段参考工作表');
console.log('📝 总计:', sampleData.length, '行数据');