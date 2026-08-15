import { useState } from "react";

export default function EmailClient({ concept, problem, user, onClose }) {
  const [to, setTo] = useState("");
  const [clientName, setClientName] = useState("");
  const [extraNote, setExtraNote] = useState("");
  const [status, setStatus] = useState(null); // null | "sending" | "sent" | "error"

  const score = concept
    ? Math.round((concept.trafficFlow + concept.waitingTime + concept.pedestrianSafety) / 3)
    : 0;

  const subject = concept
    ? `VisionX Proposal: ${concept.name} — ${concept.tag}`
    : "VisionX Project Proposal";

  const emailBody = `Dear ${clientName || "Client"},

I hope this message finds you well. I am reaching out to present a solution concept developed using VisionX AI Innovation Studio for the following challenge:

PROJECT BRIEF
─────────────────────────────────────────
${problem || "Please see the attached concept details below."}

PROPOSED SOLUTION: ${concept?.name || "—"}
─────────────────────────────────────────
${concept?.description || ""}

KEY CAPABILITIES
${concept?.features?.map((f, i) => `  ${i + 1}. ${f}`).join("\n") || ""}

TECHNOLOGY STACK
${concept?.technologies?.map((t, i) => `  ${i + 1}. ${t}`).join("\n") || ""}

PERFORMANCE METRICS
  • Success Rate       : ${concept?.successRate ?? "—"}%
  • Performance Index  : ${concept?.trafficFlow ?? "—"}%
  • Safety Index       : ${concept?.pedestrianSafety ?? "—"}%
  • Time Reduction     : ${concept?.waitingTime ?? "—"}%
  • Overall Score      : ${score}/100

INNOVATION DETAILS
${concept?.innovation || ""}

EXPECTED OUTCOMES
${concept?.problemSolved || ""}

IMPLEMENTATION
  • Estimated Cost       : ${concept?.cost || "—"}
  • Complexity Level     : ${concept?.complexity || "—"}

${extraNote ? `ADDITIONAL NOTES\n${extraNote}\n\n` : ""}This proposal has been AI-validated by VisionX and is ready to proceed to prototype development pending your approval.

Please reply to this email or contact us directly to schedule a walkthrough of the 3D hologram visualization.

Warm regards,
${user?.name || "Gurudev"}
${user?.role || "Project Owner"} — VisionX AI Studio
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VisionX AI Innovation Studio | Visualize Before You Build
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

  function sendEmail() {
    if (!to.trim() || !to.includes("@")) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    // Build a mailto: link and open it (works in all browsers without a backend)
    const mailtoUrl = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    setTimeout(() => {
      window.open(mailtoUrl, "_blank");
      setStatus("sent");
    }, 1200);
  }

  return (
    <div className="email-overlay">
      <div className="email-modal">
        {/* HEADER */}
        <div className="email-header">
          <div>
            <span className="badge">CLIENT PROPOSAL</span>
            <h2>Send to Client</h2>
            <p>Forward the VisionX concept proposal to your client via email.</p>
          </div>
          <button className="email-close" onClick={onClose}>✕</button>
        </div>

        {/* STATUS */}
        {status === "sent" && (
          <div className="email-status success">
            ✓ &nbsp; Email client opened. Please send from your email app.
          </div>
        )}
        {status === "error" && (
          <div className="email-status error">
            ✕ &nbsp; Please enter a valid client email address.
          </div>
        )}

        <div className="email-body">
          {/* LEFT — fields */}
          <div className="email-fields">
            <div className="email-field">
              <label>CLIENT EMAIL</label>
              <input
                type="email"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="client@company.com"
              />
            </div>

            <div className="email-field">
              <label>CLIENT NAME (optional)</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Mr. / Ms. Client Name"
              />
            </div>

            <div className="email-field">
              <label>SUBJECT</label>
              <input type="text" value={subject} readOnly />
            </div>

            <div className="email-field">
              <label>ADDITIONAL NOTES (optional)</label>
              <textarea
                rows={3}
                value={extraNote}
                onChange={(e) => setExtraNote(e.target.value)}
                placeholder="Any specific points to highlight for this client..."
              />
            </div>

            <div className="email-concept-snapshot">
              <div>
                <span>CONCEPT</span>
                <strong>{concept?.name || "—"}</strong>
              </div>
              <div>
                <span>SUCCESS RATE</span>
                <strong style={{ color: "#22c55e" }}>{concept?.successRate ?? "—"}%</strong>
              </div>
              <div>
                <span>OVERALL SCORE</span>
                <strong>{score}/100</strong>
              </div>
              <div>
                <span>COST</span>
                <strong>{concept?.cost || "—"}</strong>
              </div>
            </div>

            <button
              className={`generate-button email-send-btn ${status === "sending" ? "loading" : ""}`}
              onClick={sendEmail}
              disabled={status === "sending"}
            >
              {status === "sending" ? (
                <span className="login-spinner" />
              ) : (
                <>Send Proposal to Client <span>✉</span></>
              )}
            </button>
          </div>

          {/* RIGHT — preview */}
          <div className="email-preview">
            <div className="email-preview-label">EMAIL PREVIEW</div>
            <pre className="email-preview-body">{emailBody}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
