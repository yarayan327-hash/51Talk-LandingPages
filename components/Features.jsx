export default function Features({ content, language }) {
  if (!content) return null;

  const features = [
    {
      title: content.feature1Title,
      description: content.feature1Desc,
      icon: '👨‍🏫'
    },
    {
      title: content.feature2Title,
      description: content.feature2Desc,
      icon: '⏰'
    },
    {
      title: content.feature3Title,
      description: content.feature3Desc,
      icon: '🤖'
    }
  ];

  return (
    <section className="features">
      <div className="container">
        <h2>{content.title}</h2>
        <div className="grid grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="feature-item card">
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}