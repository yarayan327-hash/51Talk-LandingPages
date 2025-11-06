export default function Hero({ content, language }) {
  if (!content) return null;

  return (
    <section className="hero" style={{
      background: `linear-gradient(135deg, var(--primary-blue) 0%, var(--primary-600) 100%)`,
      color: 'white',
      padding: '120px 0'
    }}>
      <div className="container">
        <h1 style={{
          fontSize: 'clamp(32px, 5vw, 64px)',
          fontWeight: '800',
          marginBottom: '24px',
          lineHeight: 1.2
        }}>
          {content.title}
        </h1>
        <p style={{
          fontSize: 'clamp(16px, 2vw, 24px)',
          marginBottom: '32px',
          opacity: 0.9,
          lineHeight: 1.5,
          maxWidth: '800px'
        }}>
          {content.subtitle}
        </p>
        <button className="btn btn-secondary">
          {content.ctaText}
        </button>
      </div>
    </section>
  );
}