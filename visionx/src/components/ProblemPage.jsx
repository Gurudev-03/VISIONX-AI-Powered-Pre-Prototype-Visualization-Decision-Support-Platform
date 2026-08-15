import { useMemo } from "react";
import { SIH_THEMES } from "../data/domainEngine";

const THEMES_LIST = Object.entries(SIH_THEMES).map(([key, v]) => ({ key, ...v }));

/* Wide variety of prompts across every domain */
const QUICK_PROMPTS = [
  { label: "🚦 Traffic", text: "Heavy traffic congestion and pedestrian safety issues near a school during peak hours" },
  { label: "🌾 Farming", text: "Small farmers cannot detect crop diseases early, leading to massive yield loss" },
  { label: "❤️ Health", text: "Rural hospitals lack real-time patient monitoring, causing delayed emergency response" },
  { label: "🏃 Sports", text: "Athletes have no AI coaching system to prevent injuries and optimize performance" },
  { label: "💧 Water", text: "Leaking water pipelines go undetected for months, wasting millions of litres daily" },
  { label: "🎓 Education", text: "Students in remote villages cannot access quality education due to teacher shortage" },
  { label: "⚡ Energy", text: "Village communities lack reliable electricity, depending on expensive diesel generators" },
  { label: "🏭 Factory", text: "Manufacturing plant has frequent machine breakdowns causing production downtime" },
  { label: "🌍 Pollution", text: "Air quality in industrial zones is dangerously high with no early warning system" },
  { label: "📦 Logistics", text: "Last-mile delivery to remote areas is unreliable, expensive and very slow" },
  { label: "🏛 Heritage", text: "Ancient monuments are deteriorating and tourists have no immersive experience system" },
  { label: "🔒 Security", text: "University campus has no intelligent threat detection or emergency response system" },
  { label: "🧠 Mental", text: "College students face severe mental health crisis with no accessible support system" },
  { label: "🚨 Disaster", text: "Flood-prone villages have no early warning system for disaster preparedness" },
  { label: "♿ Access", text: "Visually impaired people cannot navigate public transport or city spaces independently" },
  { label: "🚀 Space", text: "Satellite data is not being used to help farmers predict weather and plan irrigation" },
];

export default function ProblemPage({ problem, setProblem, domain, theme, onGenerate }) {
  const wordCount = useMemo(
    () => (problem.trim() ? problem.trim().split(/\s+/).length : 0),
    [problem]
  );
  const tc = theme?.color || "#22d3ee";
  const detectedTheme = THEMES_LIST.find(t => t.key === domain);

  return (
    <div>
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-content">
          <div className="badge" style={{ borderColor: tc + "50", color: tc }}>
            VISIONX · UNIVERSAL AI ENGINE · SIH 2026
          </div>
          <h3>
            Describe <span style={{ color: tc }}>any problem</span> in the world.
          </h3>
          <p>
            Traffic, health, farming, sports, education, disaster, environment — VisionX AI
            understands any problem statement, detects the domain automatically, and generates
            10 tailored solution concepts with a live 3D hologram prototype.
          </p>

          {/* Live domain detection badge */}
          {domain && domain !== "general" && detectedTheme && (
            <div className="detected-domain" style={{ borderColor: tc + "50", background: tc + "10" }}>
              <span className="dd-dot" style={{ background: tc, boxShadow: `0 0 8px ${tc}` }} />
              <span style={{ color: "#6a8090" }}>Domain detected:</span>
              <span style={{ color: tc, fontWeight: 700 }}>{detectedTheme.icon} {detectedTheme.name}</span>
            </div>
          )}

          {/* theme chips */}
          <div className="theme-chips">
            {THEMES_LIST.slice(0, 18).map(t => (
              <span key={t.key} className={`theme-chip ${domain === t.key ? "theme-chip-active" : ""}`}
                style={domain === t.key ? { borderColor: t.color, color: t.color, background: t.color + "15" } : {}}>
                {t.icon} {t.name}
              </span>
            ))}
          </div>
        </div>

        <div className="hero-orb">
          <div className="orb-ring ring-one" style={{ borderColor: tc + "40" }} />
          <div className="orb-ring ring-two" style={{ borderColor: tc + "20" }} />
          <div className="orb-core" style={{ background: `radial-gradient(circle at 35% 30%, ${tc}99, #1a4a8a 60%, #0a1628)` }}>VX</div>
        </div>
      </section>

      {/* ── STEP 01 — Input ── */}
      <section className="workspace">
        <div className="section-header">
          <div>
            <span className="step" style={{ color: tc }}>01</span>
            <div>
              <h3>Describe your problem</h3>
              <p>Write in plain English — any domain, any scale, any language style.</p>
            </div>
          </div>
          <span className="required">REQUIRED</span>
        </div>

        <div className="input-card" style={{ borderColor: problem.trim() ? tc + "30" : "rgba(255,255,255,0.07)" }}>
          <label>PROBLEM STATEMENT — ANY DOMAIN IN THE WORLD</label>
          <textarea
            value={problem}
            onChange={e => setProblem(e.target.value)}
            placeholder={`Describe any real-world challenge:\n\n• "Farmers lose 40% of crop yield due to undetected pest attacks"\n• "Students in rural areas have no access to quality teachers"\n• "Athletes sustain injuries due to lack of biomechanics monitoring"\n• "Flooding in coastal villages has no early warning system"\n\nVisionX will understand it and generate 10 smart solutions.`}
            style={{ minHeight: 160 }}
          />
          <div className="input-footer">
            <span>{wordCount} words · {problem.length} characters</span>
            <span style={{ color: tc }}>
              {domain && domain !== "general"
                ? `✓ Domain: ${detectedTheme?.icon || ""} ${detectedTheme?.name || domain}`
                : "Auto-detects domain as you type"}
            </span>
          </div>
        </div>

        {/* ── QUICK PROMPTS ── */}
        <div className="quick-prompts">
          <span className="quick-label">QUICK EXAMPLES — CLICK TO USE</span>
          <div className="quick-grid">
            {QUICK_PROMPTS.map(q => (
              <button key={q.text} className="quick-chip"
                style={problem === q.text ? { borderColor: tc + "60", color: tc, background: tc + "08" } : {}}
                onClick={() => setProblem(q.text)}>
                {q.label} — {q.text.slice(0, 52)}…
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── GENERATE ── */}
      <div className="generate-section" style={{ marginTop: 26, borderColor: tc + "20" }}>
        <div>
          <strong>Generate 10 AI solution concepts</strong>
          <p>Works for any problem in the world — universal AI engine auto-detects context and builds relevant solutions.</p>
        </div>
        <button
          className="generate-button"
          disabled={!problem.trim()}
          onClick={onGenerate}
          style={{ background: problem.trim() ? tc : "#1a2a3a", cursor: problem.trim() ? "pointer" : "not-allowed" }}
        >
          Generate 10 Concepts <span>→</span>
        </button>
      </div>

      {/* how it works explainer */}
      <div className="how-it-works">
        <div className="hiw-title">HOW VISIONX WORKS</div>
        <div className="hiw-steps">
          {[
            [tc, "01", "You describe any problem", "In plain English — no technical knowledge needed"],
            [tc, "02", "AI detects domain + context", "Understands what kind of problem it is automatically"],
            [tc, "03", "10 concepts generated", "Each tailored to your specific problem with success score"],
            [tc, "04", "7-phase hologram walkthrough", "Watch the full solution journey in 3D — problem to prototype"],
          ].map(([c, n, title, sub]) => (
            <div key={n} className="hiw-step">
              <div className="hiw-num" style={{ background: c + "20", color: c, borderColor: c + "40" }}>{n}</div>
              <div>
                <div className="hiw-step-title">{title}</div>
                <div className="hiw-step-sub">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
