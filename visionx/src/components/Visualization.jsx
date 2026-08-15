function Visualization({
  concept,
  onBack,
  onAnalysis,
}) {
  if (!concept) return null;

  return (
    <section className="visualization-page">

      <button
        className="back-button"
        onClick={onBack}
      >
        ← Concept Details
      </button>

      <div className="visualization-title">

        <div>
          <span className="step">04</span>

          <div>
            <h3>Interactive Visualization</h3>

            <p>
              Pre-prototype traffic environment
            </p>
          </div>
        </div>

        <span className="generated">
          LIVE MODEL
        </span>

      </div>

      <div className="vx-3d-container">

        <div className="vx-3d-header">

          <div>
            <div className="vx-brand">
              VISIONX
            </div>

            <div className="vx-subtitle">
              INTELLIGENT INTERSECTION MODEL
            </div>
          </div>

          <div className="vx-live">
            <strong>● LIVE SIMULATION</strong>
            <span>AI TRAFFIC SYSTEM ACTIVE</span>
          </div>

        </div>

        <div className="vx-metrics">

          <div className="vx-metrics-title">
            SYSTEM TELEMETRY
          </div>

          <div className="vx-metric">
            <span>Traffic Flow</span>
            <strong>
              {concept.trafficFlow}%
            </strong>
          </div>

          <div className="vx-metric">
            <span>Waiting</span>
            <strong>
              {concept.waitingTime}%
            </strong>
          </div>

          <div className="vx-metric">
            <span>Safety</span>
            <strong>
              {concept.pedestrianSafety}%
            </strong>
          </div>

          <div className="vx-metric">
            <span>AI Control</span>
            <strong>ON</strong>
          </div>

          <div className="vx-active">
            ● SENSOR NETWORK ACTIVE
          </div>

        </div>

        <div className="road-scene">

          <div className="road horizontal-road" />

          <div className="road vertical-road" />

          <div className="road-center horizontal-center" />

          <div className="road-center vertical-center" />

          <div className="lane-mark lane-1" />
          <div className="lane-mark lane-2" />
          <div className="lane-mark lane-3" />
          <div className="lane-mark lane-4" />

          <div className="traffic-light tl-1">
            <span className="light red" />
            <span className="light yellow" />
            <span className="light green" />
          </div>

          <div className="traffic-light tl-2">
            <span className="light red" />
            <span className="light yellow" />
            <span className="light green" />
          </div>

          <div className="vehicle vehicle-1">🚗</div>
          <div className="vehicle vehicle-2">🚙</div>
          <div className="vehicle vehicle-3">🚌</div>
          <div className="vehicle vehicle-4">🚕</div>

          <div className="pedestrian-zone">
            <span>PEDESTRIAN ZONE</span>
          </div>

          <div className="sensor-zone sensor-one">
            AI SENSOR
          </div>

          <div className="sensor-zone sensor-two">
            AI SENSOR
          </div>

          <div className="intersection-core">
            AI
          </div>

        </div>

        <div className="vx-sensor-label">
          <strong>
            {concept.shortName}
          </strong>

          <span>
            {concept.visualElements[0]}
          </span>
        </div>

        <div className="vx-controls">
          Drag to explore • Scroll to zoom • AI simulation active
        </div>

      </div>

      <div className="visualization-summary">

        <div>
          <span>TRAFFIC FLOW</span>
          <strong>{concept.trafficFlow}%</strong>
        </div>

        <div>
          <span>WAITING IMPROVEMENT</span>
          <strong>{concept.waitingTime}%</strong>
        </div>

        <div>
          <span>SAFETY</span>
          <strong>
            {concept.pedestrianSafety}%
          </strong>
        </div>

        <div>
          <span>SYSTEM STATUS</span>
          <strong>ACTIVE</strong>
        </div>

      </div>

      <div className="generate-section">

        <div>
          <strong>
            Continue to AI evaluation
          </strong>

          <p>
            Compare the concept against performance
            objectives before creating the prototype.
          </p>
        </div>

        <button
          className="generate-button"
          onClick={onAnalysis}
        >
          Run Analysis
          <span>→</span>
        </button>

      </div>

    </section>
  );
}

export default Visualization;