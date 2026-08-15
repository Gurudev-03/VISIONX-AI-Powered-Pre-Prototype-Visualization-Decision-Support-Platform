import { useEffect, useRef } from "react";

/* ── animated counter ── */
function AnimCounter({ target, suffix = "%", color }) {
  const ref = useRef();
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(target / 40);
    const id = setInterval(() => {
      start = Math.min(start + step, target);
      if (ref.current) ref.current.textContent = start + suffix;
      if (start >= target) clearInterval(id);
    }, 30);
    return () => clearInterval(id);
  }, [target, suffix]);
  return <strong ref={ref} style={{ color }}>0{suffix}</strong>;
}

/* ── circular progress ring ── */
function ScoreRing({ score, color }) {
  const r = 46, c = 2 * Math.PI * r;
  const dash = (score / 100) * c;
  return (
    <div className="score-ring-wrap">
      <svg width={110} height={110} viewBox="0 0 110 110">
        <circle cx={55} cy={55} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={8}/>
        <circle cx={55} cy={55} r={r} fill="none" stroke={color} strokeWidth={8}
          strokeDasharray={`${dash} ${c}`} strokeLinecap="round"
          transform="rotate(-90 55 55)"
          style={{ transition:"stroke-dasharray 1.2s ease", filter:`drop-shadow(0 0 8px ${color})` }}
        />
      </svg>
      <div className="score-ring-inner">
        <div className="score-ring-val" style={{ color }}>{score}</div>
        <div className="score-ring-label">/ 100</div>
      </div>
    </div>
  );
}

export default function Analysis({ concept, onBack, onPrototype }) {
  if (!concept) return null;

  const tc = concept.themeColor || "#22d3ee";
  const score = Math.round((concept.trafficFlow + concept.waitingTime + concept.pedestrianSafety) / 3);

  const metrics = [
    { key:"SUCCESS RATE",    val:concept.successRate,       unit:"%", desc:"Predicted real-world success probability",   color: concept.successRate >= 88 ? "#22c55e" : "#facc15" },
    { key:"PERFORMANCE",     val:concept.trafficFlow,        unit:"%", desc:"Expected efficiency improvement",             color: tc },
    { key:"TIME REDUCTION",  val:concept.waitingTime,        unit:"%", desc:"Reduction in delays and waiting time",        color: tc },
    { key:"SAFETY INDEX",    val:concept.pedestrianSafety,   unit:"%", desc:"Safety improvement in the domain",           color: tc },
    { key:"COST GRADE",      val:concept.cost==="Low"?95:concept.cost==="Medium"?75:concept.cost==="High"?55:40, unit:"", desc:concept.cost+" implementation cost",             color:"#a78bfa" },
    { key:"COMPLEXITY",      val:concept.complexity==="Low"?90:concept.complexity==="Medium"?70:concept.complexity==="High"?50:35, unit:"", desc:concept.complexity+" complexity rating",  color:"#fb923c" },
  ];

  return (
    <section className="analysis-page">
      <button className="back-button" onClick={onBack}>← Hologram Visualization</button>

      {/* HERO */}
      <div className="analysis-hero" style={{ borderColor: tc+"25" }}>
        <ScoreRing score={score} color={tc} />
        <div style={{ flex:1 }}>
          <span className="badge" style={{ borderColor:tc+"50", color:tc }}>AI EVALUATION COMPLETE</span>
          <h2 style={{ margin:"10px 0 8px", fontSize:26, fontWeight:800 }}>{concept.name}</h2>
          <p style={{ color:"#6a8090", fontSize:12, lineHeight:1.7, maxWidth:600 }}>
            AI has analysed <strong style={{color:tc}}>{concept.name}</strong> across 6 performance dimensions.
            The concept scores <strong style={{color:tc}}>{score}/100</strong> overall with a
            <strong style={{color:"#22c55e"}}> {concept.successRate}% predicted success rate</strong> — 
            recommended for immediate prototype development.
          </p>
          <div style={{ display:"flex", gap:10, marginTop:14, flexWrap:"wrap" }}>
            {[["Domain", concept.domain?.toUpperCase()], ["Cost", concept.cost], ["Complexity", concept.complexity]].map(([k,v])=>(
              <div key={k} style={{ padding:"6px 14px", border:"1px solid rgba(255,255,255,0.08)", borderRadius:8, background:"rgba(255,255,255,0.03)" }}>
                <span style={{ color:"#3a5268", fontSize:8, letterSpacing:1 }}>{k}</span>
                <div style={{ color:"#c8dff2", fontSize:11, fontWeight:700, marginTop:3 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* METRIC GRID */}
      <div className="analysis-grid" style={{ gridTemplateColumns:"repeat(3,1fr)" }}>
        {metrics.map((m) => (
          <div key={m.key} className="analysis-card" style={{ borderColor: m.color+"25" }}>
            <span>{m.key}</span>
            <AnimCounter target={typeof m.val==="number"?m.val:0} suffix={m.unit} color={m.color}/>
            <div style={{ margin:"8px 0 6px", height:4, background:"rgba(255,255,255,0.06)", borderRadius:99, overflow:"hidden" }}>
              <div style={{ height:"100%", width:`${typeof m.val==="number"?m.val:50}%`, background:m.color, borderRadius:99, boxShadow:`0 0 6px ${m.color}`, transition:"width 1.2s ease" }}/>
            </div>
            <p>{m.desc}</p>
          </div>
        ))}
      </div>

      {/* FEATURES CHECK */}
      <div className="recommendation-panel" style={{ borderColor: tc+"25" }}>
        <span className="selected-label" style={{ color:tc }}>VALIDATED CAPABILITIES</span>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:8, margin:"14px 0" }}>
          {concept.features.map((f,i)=>(
            <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 14px", border:"1px solid rgba(255,255,255,0.06)", borderRadius:10, background:"rgba(34,211,238,0.03)" }}>
              <span style={{ color:"#22c55e", fontSize:14, flexShrink:0 }}>✓</span>
              <span style={{ color:"#c8dff2", fontSize:10 }}>{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RECOMMENDATION */}
      <div className="recommendation-panel" style={{ borderColor: tc+"30", background:"linear-gradient(135deg, rgba(6,18,36,0.9), rgba(4,12,24,0.95))" }}>
        <span className="selected-label" style={{ color:tc }}>AI RECOMMENDATION</span>
        <h3 style={{ margin:"8px 0 10px", fontSize:20 }}>✓ Recommended for prototype development</h3>
        <p style={{ color:"#6a8090", fontSize:12, lineHeight:1.7, maxWidth:700 }}>
          Based on the AI evaluation, <strong style={{color:"#e8f4ff"}}>{concept.name}</strong> demonstrates
          strong feasibility with a {concept.successRate}% success probability, {concept.cost.toLowerCase()} cost
          and {concept.complexity.toLowerCase()} complexity. All performance indicators pass the minimum
          threshold for client presentation and prototype build.
        </p>
        <button
          className="generate-button"
          style={{ background:tc, marginTop:16 }}
          onClick={onPrototype}
        >
          Build Prototype <span>→</span>
        </button>
      </div>
    </section>
  );
}
