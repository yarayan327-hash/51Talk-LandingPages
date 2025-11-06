export default function Methodology({ content, language }) {
  if (!content) return null;

  const steps = [
    content['steps[0]'],
    content['steps[1]'],
    content['steps[2]']
  ].filter(Boolean);

  return (
    <section className="methodology" style={{
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
        <p style={{
          textAlign: 'center',
          fontSize: '18px',
          marginBottom: '64px',
          color: 'var(--text-secondary)',
          maxWidth: '800px',
          margin: '0 auto 64px'
        }}>
          {content.description}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="card" style={{
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
                margin: '0 auto 16px'
              }}>
                {index === 0 ? '📚' : index === 1 ? '👨‍🏫' : '✏️'}
              </div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: 'var(--text-primary)',
                marginBottom: '12px'
              }}>
                {step}
              </h3>
              <p style={{
                fontSize: '14px',
                color: 'var(--text-secondary)',
                lineHeight: '1.6'
              }}>
                {content.detail}
              </p>
            </div>
          ))}
        </div>
        {content.illustrationImage && (
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <div style={{
              fontSize: '72px',
              opacity: 0.7,
              marginBottom: '16px'
            }}>
              🎨
            </div>
            <p style={{ color: '#718096', fontSize: '14px' }}>
              {content.illustrationImage}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}