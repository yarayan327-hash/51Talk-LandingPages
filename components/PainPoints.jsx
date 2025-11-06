export default function PainPoints({ content, language }) {
  if (!content) return null;

  const points = [
    content['points[0]'],
    content['points[1]'],
    content['points[2]']
  ].filter(Boolean);

  return (
    <section className="features" style={{
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
          {points.map((point, index) => (
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
                {index === 0 ? '😟' : index === 1 ? '🗣️' : '👨‍👩‍👧‍👦'}
              </div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: 'var(--text-primary)',
                marginBottom: '12px'
              }} dangerouslySetInnerHTML={{ __html: point }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}