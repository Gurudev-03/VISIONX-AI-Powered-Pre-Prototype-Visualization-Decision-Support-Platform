import { useState, Component } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";

import LoginPage        from "./components/LoginPage";
import AmbientBackground from "./components/AmbientBackground";
import Sidebar          from "./components/Sidebar";
import Topbar           from "./components/Topbar";
import ProblemPage      from "./components/ProblemPage";
import ConceptGallery   from "./components/ConceptGallery";
import ConceptDetails   from "./components/ConceptDetails";
import HologramScene    from "./components/HologramScene";
import AIChatbot        from "./components/AIChatbot";
import Analysis         from "./components/Analysis";
import Prototype        from "./components/Prototype";
import Approval         from "./components/Apporval";

import { generateConcepts, SIH_THEMES, detectDomain } from "./data/domainEngine";

/* ── Error boundaries ── */
class SafeBackground extends Component {
  constructor(p) { super(p); this.state = { crashed: false }; }
  static getDerivedStateFromError() { return { crashed: true }; }
  render() { return this.state.crashed ? null : this.props.children; }
}

class SafeHologram extends Component {
  constructor(p) { super(p); this.state = { crashed: false }; }
  static getDerivedStateFromError() { return { crashed: true }; }
  render() {
    if (this.state.crashed) return (
      <div className="vx-empty" style={{ height:400, flexDirection:"column", gap:12 }}>
        <span style={{ fontSize:32 }}>⬡</span>
        <span>3D hologram requires WebGL — try Chrome or Edge.</span>
      </div>
    );
    return this.props.children;
  }
}

/* ══════════════════════════════════════════
   MAIN APP
══════════════════════════════════════════ */
export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user,        setUser]        = useState(null);
  const [problem,     setProblem]     = useState("");
  const [objectives,  setObjectives]  = useState([]);
  const [concepts,    setConcepts]    = useState([]);
  const [selectedId,  setSelectedId]  = useState(null);

  const selectedConcept = concepts.find(c => c.id === selectedId) || null;
  const domain = problem ? detectDomain(problem) : "smartcity";
  const theme  = SIH_THEMES[domain] || SIH_THEMES.smartcity;

  /* ── Auth gate ── */
  if (!user) return <LoginPage onLogin={u => setUser(u)} />;

  function handleGenerate() {
    setConcepts(generateConcepts(problem));
    navigate("/concepts");
  }

  function handleSelect(id) {
    setSelectedId(id);
    navigate("/concept");
  }

  const LABELS = {
    "/":              "Dashboard",
    "/concepts":      "Concept Gallery",
    "/concept":       "Concept Details",
    "/visualization": "Hologram Visualization",
    "/analysis":      "AI Analysis",
    "/prototype":     "Prototype",
    "/approval":      "Approval",
  };
  const label = Object.entries(LABELS).find(([p]) => p !== "/" && location.pathname.startsWith(p))?.[1] ?? "Dashboard";

  return (
    <div className="app">
      <SafeBackground><AmbientBackground themeColor={theme.color} /></SafeBackground>
      <Sidebar currentPath={location.pathname} user={user} onLogout={() => setUser(null)} themeColor={theme.color} />

      <main className="main">
        <Topbar label={label} domain={domain} theme={theme} user={user} />

        <Routes>
          <Route path="/" element={
            <ProblemPage
              problem={problem} setProblem={setProblem}
              objectives={objectives} setObjectives={setObjectives}
              domain={domain} theme={theme}
              onGenerate={handleGenerate}
            />
          } />

          <Route path="/concepts" element={
            <ConceptGallery
              concepts={concepts} theme={theme}
              onSelect={handleSelect}
              onBack={() => navigate("/")}
            />
          } />

          <Route path="/concept" element={
            <ConceptDetails
              concept={selectedConcept}
              onBack={() => navigate("/concepts")}
              onVisualize={() => navigate("/visualization")}
            />
          } />

          <Route path="/visualization" element={
            <VisualizationPage
              concept={selectedConcept}
              onBack={() => navigate("/concept")}
              onAnalysis={() => navigate("/analysis")}
            />
          } />

          <Route path="/analysis" element={
            <Analysis
              concept={selectedConcept}
              onBack={() => navigate("/visualization")}
              onPrototype={() => navigate("/prototype")}
            />
          } />

          <Route path="/prototype" element={
            <Prototype
              concept={selectedConcept}
              onBack={() => navigate("/analysis")}
              onApproval={() => navigate("/approval")}
            />
          } />

          <Route path="/approval" element={
            <Approval
              selectedConcept={selectedConcept}
              problem={problem}
              user={user}
              onBack={() => navigate("/prototype")}
              onViewConcept={() => {
                setConcepts([]); setSelectedId(null); setProblem("");
                navigate("/");
              }}
            />
          } />
        </Routes>
      </main>
    </div>
  );
}

/* ══════════════════════════════════════════
   VISUALIZATION PAGE  (hologram + chatbot)
══════════════════════════════════════════ */
function VisualizationPage({ concept, onBack, onAnalysis }) {
  const [chatOpen, setChatOpen] = useState(false);
  if (!concept) return null;
  const tc = concept.themeColor || "#22d3ee";

  return (
    <section className="visualization-page">
      {/* top bar */}
      <div className="viz-topbar">
        <button className="back-button" onClick={onBack}>← Concept Details</button>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ color:tc, fontSize:9.5, letterSpacing:1, fontWeight:700 }}>{concept.tag}</span>
          <span className="generated" style={{ borderColor:tc+"60", color:tc }}>7-PHASE HOLOGRAM</span>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button
            className="chatbot-trigger-btn"
            style={{ borderColor:tc+"50", color:tc, background:tc+"10" }}
            onClick={() => setChatOpen(true)}
          >
            🤖 Ask AI Assistant
          </button>
          <button
            className="generate-button"
            style={{ background:tc, padding:"10px 18px" }}
            onClick={onAnalysis}
          >
            Run AI Analysis <span>→</span>
          </button>
        </div>
      </div>

      {/* 3D hologram */}
      <SafeHologram>
        <HologramScene concept={concept} />
      </SafeHologram>

      {/* metrics summary */}
      <div className="visualization-summary">
        <div><span>SUCCESS RATE</span><strong style={{ color:"#22c55e" }}>{concept.successRate}%</strong></div>
        <div><span>PERFORMANCE</span><strong style={{ color:tc }}>{concept.trafficFlow}%</strong></div>
        <div><span>SAFETY INDEX</span><strong style={{ color:tc }}>{concept.pedestrianSafety}%</strong></div>
        <div><span>TIME REDUCTION</span><strong style={{ color:tc }}>{concept.waitingTime}%</strong></div>
      </div>

      {/* AI chatbot modal */}
      <AIChatbot concept={concept} isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </section>
  );
}
