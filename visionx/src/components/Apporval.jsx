import { useState } from "react";
import EmailClient from "./EmailClient";

export default function Approval({ selectedConcept, problem, user, onBack, onViewConcept }) {
  const [status, setStatus] = useState(null);
  const [showEmail, setShowEmail] = useState(false);
  const concept = selectedConcept;

  return (
    <section className="approval-page">
      <button className="back-button" onClick={onBack}>← Prototype</button>

      <div className="approval-card">
        <div
          className="approval-icon"
          style={
            status === "approved"
              ? { borderColor: "#22c55e", color: "#22c55e", boxShadow: "0 0 30px rgba(34,197,94,0.25)" }
              : status === "revision"
              ? { borderColor: "#f97316", color: "#f97316" }
              : {}
          }
        >
          {status === "approved" ? "✓" : status === "revision" ? "↻" : "◎"}
        </div>

        <span className="badge">
          {status === "approved" ? "APPROVED" : status === "revision" ? "REVISION REQUESTED" : "CLIENT REVIEW"}
        </span>

        <h2>
          {status === "approved" ? "Concept Approved" : status === "revision" ? "Revision Requested" : "Awaiting Decision"}
        </h2>

        <p>
          {status === "approved"
            ? "The concept has passed AI evaluation and is cleared for prototype development."
            : status === "revision"
            ? "Revision requested — the team will update the concept and resubmit."
            : "Review the concept and either approve it or request changes."}
        </p>

        <div className="approval-status">
          <div><span>CONCEPT</span><strong>{concept?.name || "—"}</strong></div>
          <div><span>SUCCESS RATE</span><strong style={{ color:"#22c55e" }}>{concept?.successRate ?? "—"}%</strong></div>
          <div>
            <span>STATUS</span>
            <strong style={{ color: status === "approved" ? "#22c55e" : status === "revision" ? "#f97316" : "#67aaff" }}>
              {status === "approved" ? "APPROVED" : status === "revision" ? "REVISION" : "PENDING"}
            </strong>
          </div>
        </div>

        <div className="approval-actions">
          <button className="generate-button" onClick={() => setStatus("approved")}>
            Approve Concept <span>✓</span>
          </button>
          <button className="view-concept" onClick={() => setStatus("revision")}>
            Request Changes <span>↻</span>
          </button>
        </div>

        {/* POST-APPROVE ACTIONS */}
        {status === "approved" && (
          <div className="approval-post-actions">
            <button className="email-trigger-btn" onClick={() => setShowEmail(true)}>
              <span>✉</span>
              Send Proposal to Client
            </button>

            <div className="generate-section" style={{ marginTop: 16, borderRadius: 12, padding:"18px 22px" }}>
              <div>
                <strong>Ready for prototype development</strong>
                <p>VisionX pre-prototype validation complete. Start a new project or send to client.</p>
              </div>
              <button className="generate-button" onClick={onViewConcept}>
                New Project <span>→</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* EMAIL MODAL */}
      {showEmail && (
        <EmailClient
          concept={concept}
          problem={problem}
          user={user}
          onClose={() => setShowEmail(false)}
        />
      )}
    </section>
  );
}
