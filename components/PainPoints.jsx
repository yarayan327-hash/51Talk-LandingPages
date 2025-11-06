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
      <div className="container">
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

        {/* Hero-style layout with background container */}
        {points.map((point, index) => (
          <div key={index} className="painpoint-item" style={{
            marginBottom: index < points.length - 1 ? '120px' : '0',
            position: 'relative',
            minHeight: '400px'
          }}>
            <div className="painpoint-content" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: isRTL ? 'flex-start' : 'flex-end',
              position: 'relative',
              flexDirection: isRTL ? 'row-reverse' : 'row',
              gap: '60px'
            }}>
              {/* Background container with rounded corners */}
              <div className="painpoint-background" style={{
                background: 'var(--primary-blue)',
                borderRadius: '40px',
                padding: isRTL ? '80px 120px 80px 60px' : '80px 60px 80px 120px',
                maxWidth: '600px',
                width: '100%',
                flex: '1',
                boxShadow: '0 20px 40px rgba(38, 183, 255, 0.15)',
                position: 'relative',
                overflow: 'visible'
              }}>
                <div style={{
                  color: 'white',
                  textAlign: isRTL ? 'right' : 'left'
                }}>
                  <h3 style={{
                    fontSize: 'clamp(40px, 5vw, 48px)',
                    fontWeight: '800',
                    marginBottom: '16px',
                    lineHeight: 1.2,
                    margin: isRTL ? '0 0 16px 0' : '0 0 16px 0'
                  }}>
                    {index === 0 && '语言学习挑战'}
                    {index === 1 && '沟通障碍困扰'}
                    {index === 2 && '学习时间紧张'}
                  </h3>
                  <p style={{
                    fontSize: 'clamp(22px, 3vw, 26px)',
                    fontWeight: '400',
                    lineHeight: 1.6,
                    opacity: 0.95,
                    marginBottom: '0'
                  }}>
                    {index === 0 && '缺乏母语环境，难以提升口语表达能力'}
                    {index === 1 && '缺乏练习机会，不敢开口说英语'}
                    {index === 2 && '工作繁忙，无法安排固定的学习时间'}
                  </p>
                </div>
              </div>

              {/* Character image with overflow effect */}
              <div className="painpoint-character" style={{
                position: 'absolute',
                [isRTL ? 'left' : 'right']: isRTL ? '-40px' : '-40px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: '10',
                filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.2))'
              }}>
                <div style={{
                  fontSize: '180px',
                  width: '180px',
                  height: '180px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '50%',
                  backdropFilter: 'blur(10px)'
                }}>
                  {index === 0 ? '😟' : index === 1 ? '🗣️' : '👨‍👩‍👧‍👦'}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .painpoint-item {
            min-height: auto !important;
            margin-bottom: 80px !important;
          }

          .painpoint-content {
            flex-direction: column !important;
            gap: 40px !important;
            align-items: center !important;
            justify-content: center !important;
            text-align: center !important;
          }

          .painpoint-background {
            padding: 60px 40px !important;
            text-align: center !important;
          }

          .painpoint-character {
            position: relative !important;
            ${isRTL ? 'left' : 'right'}: auto !important;
            top: auto !important;
            transform: none !important;
            margin-bottom: '-60px';
          }

          .painpoint-character > div {
            font-size: 120px !important;
            width: 120px !important;
            height: 120px !important;
          }

          .painpoint-background h3 {
            font-size: clamp(32px, 6vw, 36px) !important;
          }

          .painpoint-background p {
            font-size: clamp(18px, 4vw, 22px) !important;
          }
        }
      `}</style>
    </section>
  );
}