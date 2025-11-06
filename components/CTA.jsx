export default function CTA({ content, language }) {
  if (!content) return null;

  return (
    <section className="cta" style={{
      background: `linear-gradient(135deg, var(--primary-blue) 0%, var(--primary-600) 100%)`,
      color: 'white',
      padding: '96px 0',
      textAlign: 'center'
    }}>
      <div className="container">
        <h2 style={{
          fontSize: 'clamp(28px, 4vw, 42px)',
          fontWeight: '800',
          marginBottom: '16px'
        }}>
          {content.title}
        </h2>
        <button className="btn btn-primary">
          {content.buttonText}
        </button>
      </div>
    </section>
  );
}