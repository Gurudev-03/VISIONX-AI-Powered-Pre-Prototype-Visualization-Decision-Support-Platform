export default function Prototype({ concept, onBack, onApproval }) {
  if (!concept) {
    return (
      <div style={{ padding: "60px 0", textAlign:"center", color:"#536174" }}>
        No concept selected.
        <br />
        <button className="back-button" style={{ marginTop:20 }} onClick={onBack}>← Go Back</button>
      </div>
    );
  }

  const score = Math.round(
    (concept.trafficFlow + concept.waitingTime + concept.pedestrianSafety) / 3
  );
  const themeColor = concept.themeColor || "#22d3ee";

  const systems = [
    {
      num: "01",
      title: "Detection Layer",
      desc: "Sensors and AI cameras monitor environment conditions and activity in real time.",
      items: concept.technologies.slice(0, 2),
    },
    {
      num: "02",
      title: "Decision Engine",
      desc: "AI analyses collected data and determines optimal actions based on defined objectives.",
      items: ["Adaptive AI logic", "Real-time optimisation"],
    },
    {
      num: "03",
      title: "Safety & Compliance Layer",
      desc: "Dedicated logic protects high-priority users and ensures regulatory compliance.",
      items: ["Priority management", "Safety monitoring & alerts"],
    },
    {
      num: "04",
      title: "Control & Output Layer",
      desc: "Translates AI decisions into physical or digital actions and API responses.",
      items: concept.technologies.slice(2),
    },
  ];

  const stages = [
    ["01", "Concept",    "Problem and solution defined."],
    ["02", "Hologram",   "AI simulation visualized."],
    ["03", "Prototype",  "System architecture prepared."],
    ["04", "Deployment", "Real-world implementation."],
  ];

  return (
    <section className="prototype-section">
      <button className="back-button" onClick={onBack}>← AI Analysis</button>

      {/* HERO */}
      <div className="prototype-hero" style={{ borderColor: themeColor + "40" }}>
        <div className="prototype-hero-content">
          <span className="badge" style={{ borderColor: themeColor + "60", color: themeColor }}>
            PROTOTYPE WORKSPACE
          </span>
          <h2>Build: {concept.name}</h2>
          <p>
            Translate the selected AI concept into a structured pre-prototype specification —
            detection systems, decision logic, safety layers and deployment requirements, all in one workspace.
          </p>
          <div className="prototype-status">
            <span className="status-dot" />
            PROTOTYPE MODEL READY
          </div>
        </div>

        <div className="prototype-score" style={{ borderColor: themeColor, boxShadow: `0 0 40px ${themeColor}30` }}>
          <strong style={{ color: themeColor }}>{score}</strong>
          <span>DESIGN SCORE</span>
        </div>
      </div>

      {/* SYSTEM CARDS */}
      <div className="prototype-grid">
        {systems.map((sys) => (
          <div className="prototype-card" key={sys.num} style={{ borderColor: themeColor + "20" }}>
            <span style={{ color: themeColor }}>SYSTEM {sys.num}</span>
            <h3>{sys.title}</h3>
            <p>{sys.desc}</p>
            {sys.items.map((item) => (
              <div className="prototype-feature" key={item}>
                <span style={{ color: themeColor }}>✓</span> {item}
              </div>
            ))}
            <div className="prototype-card-number" style={{ color: themeColor + "40" }}>{sys.num}</div>
          </div>
        ))}
      </div>

      {/* SUCCESS RATE BANNER */}
      <div className="prototype-success-banner" style={{ borderColor: themeColor + "30" }}>
        <div>
          <span className="selected-label" style={{ color: themeColor }}>PREDICTED SUCCESS RATE</span>
          <p>Based on AI evaluation across all {concept.features.length} metrics</p>
        </div>
        <div className="prototype-success-value" style={{ color: "#22c55e" }}>
          {concept.successRate}%
        </div>
      </div>

      {/* TECH STACK */}
      <div className="prototype-plan" style={{ marginTop: 18 }}>
        <div className="prototype-plan-header">
          <div>
            <span className="selected-label" style={{ color: themeColor }}>TECHNOLOGY STACK</span>
            <h3>Core components</h3>
          </div>
          <span className="generated" style={{ borderColor: themeColor + "50", color: themeColor }}>
            {concept.technologies.length} SYSTEMS
          </span>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:10, marginTop:18 }}>
          {concept.technologies.map((tech, i) => (
            <div key={tech} style={{
              padding:"14px 16px",
              border:`1px solid ${themeColor}25`,
              borderRadius:10,
              background:"#0a111b",
              display:"flex", alignItems:"center", gap:12
            }}>
              <div style={{
                width:28, height:28, borderRadius:8, background: themeColor + "20",
                display:"flex", alignItems:"center", justifyContent:"center",
                color: themeColor, fontSize:10, fontWeight:700
              }}>{String(i+1).padStart(2,"0")}</div>
              <span style={{ color:"#c7d5e8", fontSize:11 }}>{tech}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ROADMAP */}
      <div className="prototype-plan">
        <div className="prototype-plan-header">
          <div>
            <span className="selected-label" style={{ color: themeColor }}>DEVELOPMENT PLAN</span>
            <h3>From concept to deployment</h3>
          </div>
          <span className="generated" style={{ borderColor: themeColor + "50", color: themeColor }}>4 STAGES</span>
        </div>

        <div className="roadmap">
          {stages.map(([num, title, desc], i) => (
            <div key={num} style={{ display:"flex", alignItems:"flex-start", flex:1, gap:0 }}>
              <div className={`roadmap-item ${i < 3 ? "active" : ""}`}>
                <div className="roadmap-dot" style={i < 3 ? { background:`${themeColor}25`, borderColor: themeColor, color: themeColor } : {}}>
                  {num}
                </div>
                <div>
                  <strong>{title}</strong>
                  <p>{desc}</p>
                </div>
              </div>
              {i < 3 && <div className="roadmap-line" />}
            </div>
          ))}
        </div>
      </div>

      {/* ACTION */}
      <div className="prototype-action" style={{ borderColor: themeColor + "40" }}>
        <div>
          <strong>Prototype specification complete</strong>
          <p>Review and approve the concept to proceed, or send it directly to your client.</p>
        </div>
        <button className="generate-button" style={{ background: themeColor }} onClick={onApproval}>
          Review &amp; Approve <span>→</span>
        </button>
      </div>
    </section>
  );
}
