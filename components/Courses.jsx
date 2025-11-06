export default function Courses({ content, language }) {
  if (!content) return null;

  const courses = [
    {
      title: content['courses[0]'],
      description: content.description,
      icon: '📚',
      level: content.level || 'A2-B2'
    }
  ].filter(course => course.title);

  return (
    <section className="courses" style={{
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div key={index} className="card" style={{
              padding: '32px 24px',
              textAlign: 'center'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px'
              }}>
                <div style={{
                  fontSize: '48px',
                  marginRight: '16px',
                  background: 'var(--accent-yellow-100)',
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {course.icon}
                </div>
                <div>
                  <span style={{
                    background: 'var(--primary-blue)',
                    color: 'white',
                    padding: '6px 16px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    {course.level}
                  </span>
                </div>
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: 'var(--text-primary)',
                marginBottom: '16px'
              }}>
                {course.title}
              </h3>
              <p style={{
                fontSize: '16px',
                color: 'var(--text-secondary)',
                lineHeight: '1.6'
              }}>
                {course.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}