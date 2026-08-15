import { useState, useEffect } from "react";

export default function Topbar({ label, domain, theme, user }) {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const tc = theme?.color || "#22d3ee";
  const steps = ["/","concepts","concept","visualization","analysis","prototype","approval"];

  return (
    <header className="topbar">
      <div>
        <p className="breadcrumb">
          {user?.name?.toUpperCase() || "WORKSPACE"}&nbsp;/&nbsp;
          <span style={{ color:tc }}>{theme?.name?.toUpperCase() || "INNOVATION"}</span>
        </p>
        <h2 style={{ display:"flex", alignItems:"center", gap:10 }}>
          {label}
          <span style={{
            padding:"2px 10px",
            background:tc+"18",
            border:`1px solid ${tc}30`,
            borderRadius:100,
            fontSize:9,
            color:tc,
            fontWeight:700,
            letterSpacing:1
          }}>
            LIVE
          </span>
        </h2>
      </div>

      <div style={{ display:"flex", alignItems:"center", gap:16 }}>
        {/* Domain badge */}
        {theme && (
          <div className="domain-badge" style={{ borderColor:tc+"50", color:tc, background:tc+"0a" }}>
            <span style={{ fontSize:14 }}>{theme.icon}</span>
            <span>{theme.name}</span>
          </div>
        )}

        {/* Live clock */}
        <div className="topbar-clock">
          <div className="tc-time" style={{ color:tc }}>
            {time.toLocaleTimeString([], { hour:"2-digit", minute:"2-digit", second:"2-digit" })}
          </div>
          <div className="tc-date">
            {time.toLocaleDateString([], { day:"numeric", month:"short", year:"numeric" })}
          </div>
        </div>

        {/* Status */}
        <div className="status">
          <span className="status-dot"/>
          SYSTEM ONLINE
        </div>
      </div>
    </header>
  );
}
