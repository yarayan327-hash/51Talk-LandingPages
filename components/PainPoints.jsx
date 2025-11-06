export default function PainPoints({ content, language }) {
  if (!content) return null;

  const isRTL = language === 'ar';
  const points = [
    content['points[0]'],
    content['points[1]'],
    content['points[2]']
  ].filter(Boolean);

  return (
    <section className="painpoints" style={{
      background: 'var(--bg-secondary)',
      padding: '120px 0 96px',
      direction: isRTL ? 'rtl' : 'ltr'
    }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <h2 style={{
          fontSize: 'clamp(32px, 4vw, 48px)',
          fontWeight: '800',
          color: 'var(--text-primary)',
          marginBottom: '32px',
          textAlign: 'center'
        }}>
          {content.sectionTitle}
        </h2>
        <p style={{
          textAlign: 'center',
          fontSize: '18px',
          marginBottom: '80px',
          color: 'var(--text-secondary)',
          maxWidth: '800px',
          margin: '0 auto 80px'
        }}>
          {content.description}
        </p>

        {/* Centered cards layout */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
          {points.map((point, index) => (
            <div key={index} className="painpoint-item" style={{
              position: 'relative',
              width: '80%',
              maxWidth: '800px',
              minHeight: '280px'
            }}>
              <div className="painpoint-card" style={{
                background: '#00B5FF',
                borderRadius: '40px',
                padding: '60px 80px',
                width: '100%',
                boxShadow: '0 20px 40px rgba(0, 181, 255, 0.2)',
                position: 'relative',
                overflow: 'visible',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '40px'
              }}>
                {/* Text content */}
                <div style={{
                  flex: '1',
                  color: 'white',
                  textAlign: isRTL ? 'right' : 'left',
                  paddingRight: isRTL ? '0' : '100px',
                  paddingLeft: isRTL ? '100px' : '0'
                }}>
                  <h3 style={{
                    fontSize: 'clamp(32px, 4vw, 40px)',
                    fontWeight: '800',
                    marginBottom: '16px',
                    lineHeight: 1.2
                  }}>
                    {index === 0 && (language === 'zh' ? '语言学习挑战' : language === 'ar' ? 'تحديات تعلم اللغة' : 'Language Learning Challenges')}
                    {index === 1 && (language === 'zh' ? '沟通障碍困扰' : language === 'ar' ? 'مشاكل التواصل' : 'Communication Barriers')}
                    {index === 2 && (language === 'zh' ? '学习时间紧张' : language === 'ar' ? 'وقت التعلم المحدود' : 'Limited Study Time')}
                  </h3>
                  <p style={{
                    fontSize: 'clamp(18px, 2.5vw, 22px)',
                    fontWeight: '400',
                    lineHeight: 1.6,
                    opacity: 0.95,
                    marginBottom: '0'
                  }}>
                    {index === 0 && (language === 'zh' ? '缺乏母语环境，难以提升口语表达能力' : language === 'ar' ? 'نقص البيئة اللغوية الأم، صعوبة في تحسين مهارات التحدث' : 'Lack of native environment, difficult to improve speaking skills')}
                    {index === 1 && (language === 'zh' ? '缺乏练习机会，不敢开口说英语' : language === 'ar' ? 'نقص فرص الممارسة، الخوف من التحدث باللغة الإنجليزية' : 'Lack of practice opportunities, afraid to speak English')}
                    {index === 2 && (language === 'zh' ? '工作繁忙，无法安排固定的学习时间' : language === 'ar' ? 'العمل المزدحم، عدم القدرة على تحديد وقت ثابت للتعلم' : 'Busy work schedule, unable to set fixed study time')}
                  </p>
                </div>

                {/* Character image with overflow effect */}
                <div className="painpoint-character" style={{
                  position: 'absolute',
                  [isRTL ? 'left' : 'right']: '-60px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: '10',
                  filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))'
                }}>
                  <img
                    src="/images/headache.png"
                    alt="Pain point expression"
                    style={{
                      width: '200px',
                      height: '200px',
                      objectFit: 'contain',
                      borderRadius: '20px',
                      background: 'rgba(253, 231, 0, 0.3)',
                      padding: '10px',
                      backdropFilter: 'blur(5px)'
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .painpoint-item {
            width: 95% !important;
            minHeight: 'auto' !important;
          }

          .painpoint-card {
            padding: 40px 30px !important;
            flex-direction: column !important;
            text-align: center !important;
            gap: 20px !important;
          }

          .painpoint-character {
            position: relative !important;
            ${isRTL ? 'left' : 'right'}: auto !important;
            top: auto !important;
            transform: none !important;
            margin: '20px 0' !important;
          }

          .painpoint-character img {
            width: 120px !important;
            height: 120px !important;
          }

          .painpoint-card > div:first-child {
            padding: 0 !important;
            text-align: center !important;
          }

          .painpoint-card h3 {
            font-size: clamp(24px, 6vw, 32px) !important;
            margin-bottom: 12px !important;
          }

          .painpoint-card p {
            font-size: clamp(16px, 4vw, 18px) !important;
          }
        }

        @media (max-width: 480px) {
          .painpoint-card {
            padding: 30px 20px !important;
          }

          .painpoint-character img {
            width: 100px !important;
            height: 100px !important;
          }
        }
      `}</style>
    </section>
  );
}