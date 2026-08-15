import { useNavigate } from "react-router-dom";

const NAV = [
  { path:"/",               icon:"⌂", label:"Dashboard",   step:1 },
  { path:"/concepts",       icon:"◇", label:"Concepts",    step:2 },
  { path:"/concept",        icon:"◈", label:"Idea Details",step:3 },
  { path:"/visualization",  icon:"⬡", label:"Hologram",    step:4 },
  { path:"/analysis",       icon:"▥", label:"Analysis",    step:5 },
  { path:"/prototype",      icon:"◫", label:"Prototype",   step:6 },
  { path:"/approval",       icon:"✓", label:"Approval",    step:7 },
];

export default function Sidebar({ currentPath, user, onLogout, themeColor="#22d3ee" }) {
  const navigate   = useNavigate();
  const initials   = (user?.name || "G").charAt(0).toUpperCase();
  const currentIdx = NAV.findIndex(n => n.path === currentPath);

  return (
    <aside className="sidebar">
      {/* LOGO */}
      <div className="logo">
        <div className="logo-mark" style={{ background:`linear-gradient(135deg, ${themeColor}, #2767ff)`, boxShadow:`0 0 20px ${themeColor}50` }}>V</div>
        <div>
          <h1>VISIONX</h1>
          <span style={{ color:themeColor }}>AI Innovation Studio</span>
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div className="sidebar-progress">
        <div className="sp-label">
          <span>WORKFLOW</span>
          <span style={{ color:themeColor }}>{Math.max(0,currentIdx)}/{NAV.length-1}</span>
        </div>
        <div className="sp-track">
          <div className="sp-fill" style={{ width:`${(Math.max(0,currentIdx)/(NAV.length-1))*100}%`, background:themeColor }}/>
        </div>
      </div>

      {/* NAV */}
      <nav>
        {NAV.map((item, i) => {
          const isActive = currentPath === item.path;
          const isDone   = i < currentIdx;
          return (
            <button key={item.path}
              className={`nav-item ${isActive?"active":""}`}
              style={isActive ? { boxShadow:`inset 2px 0 0 ${themeColor}`, color:themeColor, background:`${themeColor}12` }
                : isDone ? { color:"#3a5268" } : {}}
              onClick={() => navigate(item.path)}
            >
              <div className="nav-step-indicator"
                style={isActive ? { background:themeColor, color:"#020914" }
                  : isDone ? { background:"#1a3a1a", color:"#22c55e", border:"1px solid #22c55e30" }
                  : { background:"rgba(255,255,255,0.04)", color:"#3a5268" }}>
                {isDone ? "✓" : item.step}
              </div>
              <span>{item.label}</span>
              {isActive && <div className="nav-active-dot" style={{ background:themeColor }}/>}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        {/* SIH BADGE */}
        <div className="sih-badge">
          <span style={{ color:themeColor, fontSize:11 }}>🏆</span>
          <div>
            <div style={{ color:themeColor, fontSize:8, fontWeight:800, letterSpacing:1 }}>SIH 2026 READY</div>
            <div style={{ color:"#3a5268", fontSize:7.5 }}>18 themes supported</div>
          </div>
        </div>

        <button className="nav-item logout-btn" onClick={onLogout} style={{ marginTop:6 }}>
          <div className="nav-step-indicator" style={{ background:"rgba(239,68,68,0.1)", color:"#f87171", border:"1px solid rgba(239,68,68,0.2)" }}>⏻</div>
          <span>Sign Out</span>
        </button>

        <div className="user-card">
          <div className="avatar" style={{ background:themeColor, color:"#020914", fontWeight:800 }}>{initials}</div>
          <div>
            <strong>{user?.name || "User"}</strong>
            <span>{user?.role || "Member"}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
