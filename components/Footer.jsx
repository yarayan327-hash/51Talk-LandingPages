export default function Footer({ language }) {
  return (
    <footer className="footer" style={{
      background: 'var(--text-primary)',
      color: 'white',
      padding: '48px 0',
      textAlign: 'center'
    }}>
      <div className="container">
        <p style={{
          fontSize: '16px',
          fontWeight: '500',
          marginBottom: '8px'
        }}>
          &copy; 2024 51Talk Academy. All rights reserved.
        </p>
        <p style={{
          fontSize: '14px',
          opacity: 0.8,
          marginBottom: '16px'
        }}>
          Powered by Excel Content Importer
        </p>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '24px',
          marginTop: '24px'
        }}>
          <span style={{
            fontSize: '14px',
            opacity: 0.7,
            cursor: 'pointer',
            transition: 'opacity 0.2s ease'
          }}>
            Privacy Policy
          </span>
          <span style={{
            fontSize: '14px',
            opacity: 0.7,
            cursor: 'pointer',
            transition: 'opacity 0.2s ease'
          }}>
            Terms of Service
          </span>
          <span style={{
            fontSize: '14px',
            opacity: 0.7,
            cursor: 'pointer',
            transition: 'opacity 0.2s ease'
          }}>
            Contact Us
          </span>
        </div>
      </div>
    </footer>
  );
}