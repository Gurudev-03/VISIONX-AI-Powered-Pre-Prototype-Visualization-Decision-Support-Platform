function SuccessBar({ value, color = "#22d3ee" }) {
  const barColor = value >= 88 ? "#22c55e" : value >= 78 ? "#facc15" : "#f97316";
  return (
    <div className="success-bar-wrapper">
      <div className="success-bar-track">
        <div className="success-bar-fill" style={{ width: `${value}%`, background: barColor }} />
      </div>
      <span className="success-bar-label" style={{ color: barColor }}>{value}%</span>
    </div>
  );
}

export default function ConceptGallery({ concepts, theme, onSelect, onBack }) {
  const themeColor = theme?.color || "#22d3ee";

  return (
    <section className="concept-page">
      <button className="back-button" onClick={onBack}>← Problem Definition</button>

      <div className="page-intro">
        <div>
          <span className="step" style={{ color: themeColor }}>03</span>
          <div>
            <h3>Concept Gallery</h3>
            <p>
              <span style={{ color: themeColor }}>{theme?.icon} {theme?.name}</span>
              {" "}— {concepts.length} AI-generated solutions, each with a hologram preview and success rate.
            </p>
          </div>
        </div>
        <div className="concept-count" style={{ borderColor: themeColor + "50", color: themeColor }}>
          {concepts.length}<span>IDEAS</span>
        </div>
      </div>

      <div className="concept-gallery">
        {concepts.map((concept) => (
          <article className="concept-block" key={concept.id}>
            <div className="concept-top">
              <div className="concept-number" style={{ borderColor: themeColor + "60", color: themeColor }}>
                {String(concept.id).padStart(2, "0")}
              </div>
              <span className="concept-tag" style={{ borderColor: themeColor + "50", color: themeColor, background: themeColor + "12" }}>
                {concept.tag}
              </span>
            </div>

            <div className="concept-content">
              <span className="concept-label">AI GENERATED CONCEPT</span>
              <h3>{concept.name}</h3>
              <p>{concept.description}</p>
              <div className="concept-features">
                {concept.features.slice(0, 3).map((f) => (
                  <div className="feature-chip" key={f} style={{ borderColor: themeColor + "30" }}>
                    <span style={{ color: themeColor }}>✓</span> {f}
                  </div>
                ))}
              </div>
            </div>

            <div className="success-section">
              <span className="success-title">SUCCESS RATE</span>
              <SuccessBar value={concept.successRate} color={themeColor} />
            </div>

            <div className="concept-metrics">
              <div className="gallery-metric">
                <span>PERFORMANCE</span>
                <strong style={{ color: themeColor }}>{concept.trafficFlow}%</strong>
              </div>
              <div className="gallery-metric">
                <span>SAFETY</span>
                <strong style={{ color: themeColor }}>{concept.pedestrianSafety}%</strong>
              </div>
              <div className="gallery-metric">
                <span>TIME SAVE</span>
                <strong style={{ color: themeColor }}>{concept.waitingTime}%</strong>
              </div>
            </div>
            <div className="concept-meta">
              <span>Cost: <strong>{concept.cost}</strong></span>
              <span>Complexity: <strong>{concept.complexity}</strong></span>
            </div>

            <button
              className="concept-open-button"
              style={{ borderColor: themeColor + "50", color: themeColor }}
              onClick={() => onSelect(concept.id)}
            >
              Explore &amp; Hologram <span>→</span>
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
