export default function Testimonials({ content, language }) {
  if (!content) return null;

  return (
    <section className="testimonials" style={{
      background: 'var(--bg-secondary)',
      padding: '96px 0'
    }}>
      <div className="container">
        <h2 style={{
          fontSize: 'clamp(32px, 4vw, 48px)',
          fontWeight: '800',
          color: 'var(--text-primary)',
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          {content.sectionTitle}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card" style={{
            textAlign: 'center',
            padding: '32px 24px'
          }}>
            <div style={{
              fontSize: '64px',
              marginBottom: '24px',
              background: 'var(--accent-yellow-100)',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px'
            }}>
              🎓
            </div>
            <p style={{
              fontSize: '18px',
              fontStyle: 'italic',
              lineHeight: '1.6',
              color: 'var(--text-primary)',
              marginBottom: '32px'
            }}>
              "{content.description}"
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '32px',
              textAlign: 'center'
            }}>
              <div>
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  color: 'var(--primary-blue)',
                  marginBottom: '12px'
                }}>
                  使命
                </h4>
                <p style={{
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.5'
                }}>
                  {content.mission}
                </p>
              </div>
              <div>
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  color: 'var(--primary-blue)',
                  marginBottom: '12px'
                }}>
                  愿景
                </h4>
                <p style={{
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.5'
                }}>
                  {content.vision}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}