import { generateJustification } from "../data/justification";

export default function ConceptDetails({ concept, onBack, onVisualize }) {
  if (!concept) {
    return (
      <div style={{ padding:"60px 0", textAlign:"center", color:"#536174" }}>
        No concept selected.
        <br />
        <button className="back-button" style={{ marginTop:20 }} onClick={onBack}>← Back to Gallery</button>
      </div>
    );
  }

  const tc    = concept.themeColor || "#22d3ee";
  const score = Math.round((concept.trafficFlow + concept.waitingTime + concept.pedestrianSafety) / 3);
  const just  = generateJustification(concept);

  return (
    <section className="details-page">
      <button className="back-button" onClick={onBack}>← Concept Gallery</button>

      {/* ── HERO HEADER ── */}
      <div className="details-header" style={{ borderColor: tc + "25" }}>
        <span className="badge" style={{ borderColor: tc + "50", color: tc }}>{concept.tag}</span>
        <h1>{concept.name}</h1>
        <p>{concept.description}</p>

        {/* quick stats row */}
        <div className="dh-stats">
          {[
            ["SUCCESS RATE", `${concept.successRate}%`, concept.successRate >= 88 ? "#22c55e" : concept.successRate >= 75 ? "#facc15" : "#f97316"],
            ["OVERALL SCORE", `${score}/100`, tc],
            ["COST",          concept.cost,   tc],
            ["COMPLEXITY",    concept.complexity, tc],
          ].map(([label, val, color]) => (
            <div key={label} className="dh-stat">
              <span>{label}</span>
              <strong style={{ color }}>{val}</strong>
            </div>
          ))}
        </div>
      </div>

      {/* ── MAIN GRID ── */}
      <div className="details-grid">

        {/* LEFT COLUMN */}
        <div className="details-main">

          {/* 01 — WHAT IT IS */}
          <article className="detail-card">
            <span className="step" style={{ color: tc }}>01 / INNOVATION</span>
            <h3>How it works</h3>
            <p>{concept.innovation}</p>
          </article>

          {/* 02 — STRONG JUSTIFICATION */}
          <article className="detail-card just-card" style={{ borderColor: tc + "30", background: `linear-gradient(135deg, rgba(6,18,36,0.9), rgba(4,12,24,0.95))` }}>
            <span className="step" style={{ color: tc }}>02 / STRONG JUSTIFICATION</span>
            <h3>Why this idea will work</h3>

            {/* Headline */}
            <div className="just-headline" style={{ borderColor: tc + "40", background: tc + "10" }}>
              <span style={{ color: tc, fontSize:18 }}>💡</span>
              <p style={{ color: "#e8f4ff" }}>{just.headline}</p>
            </div>

            {/* Why points */}
            <div className="just-points">
              {just.why.map((point, i) => (
                <div key={i} className="just-point">
                  <div className="just-point-num" style={{ background: tc + "20", color: tc, borderColor: tc + "40" }}>
                    {String(i+1).padStart(2,"0")}
                  </div>
                  <p>{point}</p>
                </div>
              ))}
            </div>
          </article>

          {/* 03 — REAL-WORLD EVIDENCE */}
          <article className="detail-card">
            <span className="step" style={{ color: tc }}>03 / REAL-WORLD EVIDENCE</span>
            <h3>Proven by data globally</h3>
            <div className="evidence-grid">
              {just.evidence.map((ev, i) => (
                <div key={i} className="evidence-card" style={{ borderColor: tc + "30" }}>
                  <div className="ev-stat" style={{ color: tc }}>{ev.stat}</div>
                  <p className="ev-claim">{ev.claim}</p>
                </div>
              ))}
            </div>
          </article>

          {/* 04 — RISKS MITIGATED */}
          <article className="detail-card">
            <span className="step" style={{ color: tc }}>04 / RISK MITIGATION</span>
            <h3>Challenges addressed</h3>
            <div className="risks-list">
              {just.risks.map((risk, i) => (
                <div key={i} className="risk-item">
                  <span className="risk-shield" style={{ color: "#22c55e" }}>🛡</span>
                  <p>{risk}</p>
                </div>
              ))}
            </div>
          </article>

          {/* 05 — FEATURES */}
          <article className="detail-card">
            <span className="step" style={{ color: tc }}>05 / CORE FEATURES</span>
            <h3>Key capabilities</h3>
            <div className="large-feature-list">
              {concept.features.map((f, i) => (
                <div className="large-feature" key={f} style={{ borderColor: tc + "20" }}>
                  <span style={{ background: tc + "20", color: tc }}>{String(i+1).padStart(2,"0")}</span>
                  <strong>{f}</strong>
                </div>
              ))}
            </div>
          </article>

          {/* 06 — TECH STACK */}
          <article className="detail-card">
            <span className="step" style={{ color: tc }}>06 / TECHNOLOGY</span>
            <h3>Implementation stack</h3>
            <div className="large-feature-list">
              {concept.technologies.map((t, i) => (
                <div className="large-feature" key={t} style={{ borderColor: tc + "20" }}>
                  <span style={{ background: tc + "20", color: tc }}>{String(i+1).padStart(2,"0")}</span>
                  <strong>{t}</strong>
                </div>
              ))}
            </div>
          </article>

          {/* 07 — ROI */}
          <article className="detail-card roi-card" style={{ borderColor: "#22c55e30" }}>
            <span className="step" style={{ color: "#22c55e" }}>07 / RETURN ON INVESTMENT</span>
            <h3>Financial justification</h3>
            <div className="roi-grid">
              <div className="roi-item" style={{ borderColor: "#22c55e30" }}>
                <span>ESTIMATED SAVINGS</span>
                <strong style={{ color:"#22c55e" }}>{just.roi.savings}</strong>
                <p>Projected annual cost reduction post-deployment</p>
              </div>
              <div className="roi-item" style={{ borderColor: "#facc1530" }}>
                <span>PAYBACK PERIOD</span>
                <strong style={{ color:"#facc15" }}>{just.roi.payback}</strong>
                <p>Time until total investment is recovered</p>
              </div>
              <div className="roi-item" style={{ borderColor: tc + "30" }}>
                <span>3-YEAR ROI</span>
                <strong style={{ color: tc }}>{just.roi.roi3yr}</strong>
                <p>Total return on investment over 36 months</p>
              </div>
            </div>
          </article>

          {/* 08 — WHY VISIONX PROCESS BENEFITS */}
          <article className="detail-card">
            <span className="step" style={{ color: tc }}>08 / WHY THIS PROCESS</span>
            <h3>Benefits of building with VisionX</h3>
            <p style={{ color:"#5a7080", fontSize:11, marginBottom:20 }}>
              Beyond the solution itself — here's why using the VisionX pre-prototype validation
              process gives you a decisive competitive advantage.
            </p>
            <div className="process-benefits-grid">
              {just.processBenefits.map((b, i) => (
                <div key={i} className="pb-card" style={{ borderColor: tc + "20" }}>
                  <div className="pb-top">
                    <span className="pb-icon">{b.icon}</span>
                    <div className="pb-stat-wrap">
                      <div className="pb-stat" style={{ color: tc }}>{b.stat}</div>
                      <div className="pb-stat-label">{b.statLabel}</div>
                    </div>
                  </div>
                  <h4 className="pb-title">{b.title}</h4>
                  <p className="pb-desc">{b.description}</p>
                </div>
              ))}
            </div>
          </article>

        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="details-sidebar">
          <div className="score-card highlight-card" style={{ borderColor: tc + "40" }}>
            <span>SUCCESS RATE</span>
            <strong style={{ color: concept.successRate >= 88 ? "#22c55e" : concept.successRate >= 75 ? "#facc15" : "#f97316", fontSize:32 }}>
              {concept.successRate}%
            </strong>
            <div className="score-bar-track">
              <div className="score-bar-fill" style={{ width:`${concept.successRate}%`, background: concept.successRate>=88 ? "#22c55e" : "#facc15" }} />
            </div>
          </div>

          <div className="score-card">
            <span>OVERALL SCORE</span>
            <strong>{score}/100</strong>
          </div>
          <div className="score-card">
            <span>PERFORMANCE INDEX</span>
            <strong style={{ color: tc }}>{concept.trafficFlow}%</strong>
          </div>
          <div className="score-card">
            <span>SAFETY INDEX</span>
            <strong style={{ color: tc }}>{concept.pedestrianSafety}%</strong>
          </div>
          <div className="score-card">
            <span>TIME REDUCTION</span>
            <strong style={{ color: tc }}>{concept.waitingTime}%</strong>
          </div>
          <div className="score-card">
            <span>IMPLEMENTATION COST</span>
            <strong>{concept.cost}</strong>
          </div>
          <div className="score-card">
            <span>COMPLEXITY</span>
            <strong>{concept.complexity}</strong>
          </div>

          {/* ROI mini */}
          <div className="score-card" style={{ borderColor:"#22c55e30", background:"rgba(20,83,45,0.08)" }}>
            <span>3-YEAR ROI</span>
            <strong style={{ color:"#22c55e", fontSize:24 }}>{just.roi.roi3yr}</strong>
            <p style={{ color:"#3a5268", fontSize:9, marginTop:6, lineHeight:1.5 }}>
              Payback: {just.roi.payback}
            </p>
          </div>

          {/* Sticky CTA */}
          <div className="sidebar-cta" style={{ borderColor: tc + "40", background: tc + "08" }}>
            <p style={{ color:"#8090a4", fontSize:11 }}>
              See this solution running live in a 3D hologram — all 7 phases animated.
            </p>
            <button className="generate-button" style={{ background: tc, width:"100%", justifyContent:"center" }} onClick={onVisualize}>
              Open 3D Hologram <span>→</span>
            </button>
          </div>
        </aside>
      </div>

      {/* BOTTOM CTA */}
      <div className="details-action" style={{ borderColor: tc + "30", marginTop:16 }}>
        <div>
          <strong>Ready to see it in action?</strong>
          <p>Watch the full 7-phase cinematic hologram — from problem to prototype, step by step.</p>
        </div>
        <button className="generate-button" style={{ background: tc }} onClick={onVisualize}>
          Open Hologram Visualization <span>→</span>
        </button>
      </div>
    </section>
  );
}
