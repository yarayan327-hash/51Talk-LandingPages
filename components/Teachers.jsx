export default function Teachers({ content, language }) {
  if (!content) return null;

  const teachers = [
    {
      name: content['teachers[0]'],
      title: content.title,
      intro: content.intro
    }
  ].filter(teacher => teacher.name);

  return (
    <section className="teachers" style={{
      background: 'var(--bg-primary)',
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teachers.map((teacher, index) => (
            <div key={index} className="card" style={{
              textAlign: 'center',
              padding: '32px 24px'
            }}>
              <div style={{
                fontSize: '72px',
                marginBottom: '24px',
                background: 'var(--accent-yellow-100)',
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px'
              }}>
                👨‍🏫
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: 'var(--text-primary)',
                marginBottom: '8px'
              }}>
                {teacher.name}
              </h3>
              <p style={{
                color: 'var(--primary-blue)',
                fontWeight: '600',
                marginBottom: '16px',
                fontSize: '16px'
              }}>
                {teacher.title}
              </p>
              <p style={{
                fontStyle: 'italic',
                lineHeight: '1.6',
                color: 'var(--text-secondary)',
                fontSize: '15px'
              }}>
                "{teacher.intro}"
              </p>
            </div>
          ))}
        </div>
        {content.carouselEnabled && (
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <span style={{
              fontSize: '16px',
              color: 'var(--text-secondary)',
              fontWeight: '500'
            }}>
              • 了解更多师资团队 →
            </span>
          </div>
        )}
      </div>
    </section>
  );
}