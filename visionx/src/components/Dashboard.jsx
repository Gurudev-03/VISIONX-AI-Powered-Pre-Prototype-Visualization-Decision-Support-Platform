function Dashboard({ onGenerate }) {
  return (
    <section className="workspace">

      <div className="hero">
        <div className="hero-content">

          <span className="badge">
            AI TRAFFIC CONCEPT STUDIO
          </span>

          <h3>
            Design the future of
            <span> urban mobility.</span>
          </h3>

          <p>
            Transform a real-world traffic problem into
            measurable, visual and prototype-ready
            intelligent infrastructure concepts.
          </p>
        </div>

        <div className="hero-orb">
          <div className="orb-ring ring-one" />
          <div className="orb-ring ring-two" />
          <div className="orb-core">VX</div>
        </div>
      </div>

      <div className="section-header dashboard-section">
        <div>
          <span className="step">01</span>

          <div>
            <h3>Define the traffic challenge</h3>
            <p>
              Describe the problem your system should solve.
            </p>
          </div>
        </div>

        <span className="required">REQUIRED</span>
      </div>

      <div className="input-card">
        <label>TRAFFIC PROBLEM STATEMENT</label>

        <textarea
          defaultValue="Traffic congestion and pedestrian safety issues around a school during peak arrival and departure hours."
          placeholder="Describe the traffic problem..."
        />

        <div className="input-footer">
          <span>AI READY</span>
          <span>Problem definition</span>
        </div>
      </div>

      <div className="objectives">
        <div className="objective-header">
          <div>
            <span className="step">02</span>

            <div>
              <h3>Primary objectives</h3>
              <p>
                Select the outcomes that matter most.
              </p>
            </div>
          </div>
        </div>

        <div className="objective-grid">

          <div className="objective selected">
            <span className="objective-icon">↗</span>
            <strong>Improve Traffic Flow</strong>
            <span>Reduce congestion and queues</span>
          </div>

          <div className="objective selected">
            <span className="objective-icon">◉</span>
            <strong>Improve Safety</strong>
            <span>Protect pedestrians and students</span>
          </div>

          <div className="objective">
            <span className="objective-icon">◌</span>
            <strong>Reduce Waiting</strong>
            <span>Minimize unnecessary delays</span>
          </div>

        </div>
      </div>

      <div className="generate-section">

        <div>
          <strong>
            Ready to generate traffic concepts?
          </strong>

          <p>
            VisionX will evaluate the problem and
            create intelligent design alternatives.
          </p>
        </div>

        <button
          className="generate-button"
          onClick={onGenerate}
        >
          Generate Concepts
          <span>→</span>
        </button>

      </div>

    </section>
  );
}

export default Dashboard;