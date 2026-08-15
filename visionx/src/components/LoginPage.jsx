import { useState, useEffect } from "react";

/* ── storage helpers ── */
function getUsers() {
  try { return JSON.parse(localStorage.getItem("vx_users") || "[]"); }
  catch { return []; }
}
function saveUsers(u) {
  try { localStorage.setItem("vx_users", JSON.stringify(u)); } catch {}
}

/* seed demo account safely */
function ensureDemoUser() {
  try {
    const users = getUsers();
    if (!users.find((u) => u.email === "gurudev@visionx.ai")) {
      saveUsers([...users, { email: "gurudev@visionx.ai", password: "visionx123", name: "Gurudev", role: "Project Owner" }]);
    }
  } catch {}
}

export default function LoginPage({ onLogin }) {
  const [mode, setMode]           = useState("login");
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [showPass, setShowPass]   = useState(false);
  const [name, setName]           = useState("");
  const [role, setRole]           = useState("Project Owner");
  const [confirmPass, setConfirm] = useState("");
  const [error, setError]         = useState("");
  const [loading, setLoading]     = useState(false);

  /* seed on first render */
  useEffect(() => { ensureDemoUser(); }, []);

  function reset() {
    setEmail(""); setPassword(""); setName("");
    setConfirm(""); setError(""); setShowPass(false);
  }
  function switchMode(m) { reset(); setMode(m); }

  /* ── SIGN IN ── */
  function handleLogin(e) {
    e.preventDefault();
    setError("");
    if (!email.trim()) return setError("Enter your email.");
    if (!password)     return setError("Enter your password.");
    setLoading(true);
    setTimeout(() => {
      const user = getUsers().find(
        (u) => u.email === email.trim().toLowerCase() && u.password === password
      );
      if (user) { onLogin(user); }
      else { setError("Incorrect email or password. Need an account? Click Create Account."); }
      setLoading(false);
    }, 600);
  }

  /* ── SIGN UP ── */
  function handleSignup(e) {
    e.preventDefault();
    setError("");
    if (!name.trim())             return setError("Enter your name.");
    if (!email.includes("@"))     return setError("Enter a valid email.");
    if (password.length < 6)      return setError("Password must be at least 6 characters.");
    if (password !== confirmPass) return setError("Passwords do not match.");
    const users = getUsers();
    if (users.find((u) => u.email === email.trim().toLowerCase()))
      return setError("Account already exists — please sign in.");
    setLoading(true);
    setTimeout(() => {
      const newUser = { email: email.trim().toLowerCase(), password, name: name.trim(), role };
      saveUsers([...users, newUser]);
      onLogin(newUser);
      setLoading(false);
    }, 600);
  }

  function useDemoAccount() {
    setEmail("gurudev@visionx.ai");
    setPassword("visionx123");
    setError("");
    setMode("login");
  }

  return (
    <div className="login-page">
      <div className="login-grid-bg" />
      <div className="login-orb login-orb-1" />
      <div className="login-orb login-orb-2" />

      <div className="login-card">
        {/* LOGO */}
        <div className="login-logo">
          <div className="login-logo-mark">V</div>
          <div>
            <h1>VISIONX</h1>
            <span>AI Innovation Studio</span>
          </div>
        </div>

        <div className="login-divider" />

        {/* TABS */}
        <div className="login-tabs">
          <button className={`login-tab ${mode === "login"  ? "active" : ""}`} onClick={() => switchMode("login")}>Sign In</button>
          <button className={`login-tab ${mode === "signup" ? "active" : ""}`} onClick={() => switchMode("signup")}>Create Account</button>
        </div>

        <h2 className="login-title">{mode === "login" ? "Welcome back" : "Get started"}</h2>
        <p className="login-sub">
          {mode === "login" ? "Sign in to your VisionX workspace" : "Create your account — takes 30 seconds"}
        </p>

        {/* ── SIGN IN ── */}
        {mode === "login" && (
          <form className="login-form" onSubmit={handleLogin}>
            <div className="login-field">
              <label>EMAIL ADDRESS</label>
              <input type="email" value={email} autoFocus required
                onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
            </div>
            <div className="login-field">
              <label>PASSWORD</label>
              <div className="login-pass-wrapper">
                <input type={showPass ? "text" : "password"} value={password} required
                  onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
                <button type="button" className="login-show-pass" onClick={() => setShowPass(p => !p)}>
                  {showPass ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            {error && <div className="login-error">{error}</div>}

            <button type="submit" className="login-submit" disabled={loading}>
              {loading ? <span className="login-spinner" /> : <>Sign In <span>→</span></>}
            </button>

            {/* DEMO SHORTCUT */}
            <button type="button" className="login-demo-btn" onClick={useDemoAccount}>
              ⚡ Fill Demo Credentials
            </button>

            <p className="login-switch-text">
              No account?{" "}
              <button type="button" className="login-link" onClick={() => switchMode("signup")}>Create one free</button>
            </p>
          </form>
        )}

        {/* ── SIGN UP ── */}
        {mode === "signup" && (
          <form className="login-form" onSubmit={handleSignup}>
            <div className="login-field">
              <label>FULL NAME</label>
              <input type="text" value={name} autoFocus required
                onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
            </div>
            <div className="login-field">
              <label>EMAIL ADDRESS</label>
              <input type="email" value={email} required
                onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
            </div>
            <div className="login-field">
              <label>YOUR ROLE</label>
              <select value={role} onChange={(e) => setRole(e.target.value)} className="login-select">
                <option>Project Owner</option>
                <option>Developer</option>
                <option>Designer</option>
                <option>Product Manager</option>
                <option>Student / Researcher</option>
                <option>Client</option>
                <option>Other</option>
              </select>
            </div>
            <div className="login-field">
              <label>PASSWORD</label>
              <div className="login-pass-wrapper">
                <input type={showPass ? "text" : "password"} value={password} required
                  onChange={(e) => setPassword(e.target.value)} placeholder="Min 6 characters" />
                <button type="button" className="login-show-pass" onClick={() => setShowPass(p => !p)}>
                  {showPass ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>
            <div className="login-field">
              <label>CONFIRM PASSWORD</label>
              <input type="password" value={confirmPass} required
                onChange={(e) => setConfirm(e.target.value)} placeholder="Re-enter password" />
            </div>

            {error && <div className="login-error">{error}</div>}

            <button type="submit" className="login-submit" disabled={loading}>
              {loading ? <span className="login-spinner" /> : <>Create Account <span>→</span></>}
            </button>

            <p className="login-switch-text">
              Have an account?{" "}
              <button type="button" className="login-link" onClick={() => switchMode("login")}>Sign in</button>
            </p>
          </form>
        )}

        <div className="login-hint">
          <span>Demo account:</span> gurudev@visionx.ai / visionx123
        </div>

        <div className="login-footer">
          <span className="status-dot" /> VISIONX SYSTEM ONLINE
        </div>
      </div>
    </div>
  );
}
