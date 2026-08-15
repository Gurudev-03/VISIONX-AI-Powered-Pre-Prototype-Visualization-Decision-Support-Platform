export const allConcepts = [
  {
    id: 1,
    name: "Adaptive Signal Control",
    shortName: "ADAPTIVE SIGNALS",
    scenario: "adaptive",
    tag: "TRAFFIC FLOW",
    description:
      "AI-powered traffic signals that dynamically adjust timing based on real-time vehicle density, reducing bottlenecks at peak hours.",
    innovation:
      "Machine learning models continuously analyze vehicle count from embedded road sensors and camera feeds. Signal durations are recalculated every 30 seconds to minimize cumulative wait time across all lanes.",
    problemSolved:
      "Peak-hour congestion drops by an estimated 72%. Average vehicle waiting time is reduced from 85 seconds to under 24 seconds during rush periods.",
    successRate: 87,
    trafficFlow: 82,
    waitingTime: 79,
    pedestrianSafety: 65,
    cost: "Medium",
    complexity: "Medium",
    features: [
      "Real-time signal timing",
      "Vehicle density detection",
      "Peak-hour optimization",
      "Cross-intersection sync",
    ],
    technologies: [
      "Computer Vision AI",
      "IoT Road Sensors",
      "Edge Computing Node",
      "REST Signal API",
    ],
    visualElements: ["Adaptive timing display", "Sensor pulse animation"],
  },
  {
    id: 2,
    name: "Pedestrian Priority Zone",
    shortName: "PEDESTRIAN PRIORITY",
    scenario: "pedestrian",
    tag: "SAFETY",
    description:
      "Smart crossing system that detects pedestrian presence near schools and hospitals and automatically extends crossing time while halting traffic.",
    innovation:
      "Thermal and depth cameras identify pedestrians up to 15 meters away. The system reserves a safe buffer before and after each crossing cycle, with audio and vibration alerts for visually impaired users.",
    problemSolved:
      "Pedestrian accidents near schools decrease by 86%. Parents report significantly higher confidence in child safety during morning drop-off.",
    successRate: 91,
    trafficFlow: 67,
    waitingTime: 88,
    pedestrianSafety: 94,
    cost: "Medium",
    complexity: "Medium",
    features: [
      "Pedestrian detection",
      "Extended crossing time",
      "School-zone priority",
      "Accessibility alerts",
    ],
    technologies: [
      "Thermal Imaging",
      "Depth Sensors",
      "Audio Alert System",
      "Vibration Feedback",
    ],
    visualElements: ["Pedestrian heatmap", "Safe crossing timer"],
  },
  {
    id: 3,
    name: "Smart Intersection AI",
    shortName: "SMART INTERSECTION",
    scenario: "intersection",
    tag: "AI CONTROL",
    description:
      "Full AI orchestration of a 4-way intersection combining adaptive signals, pedestrian management, emergency priority and real-time telemetry.",
    innovation:
      "A central AI engine fuses data from 8 sensor types and makes 200+ decisions per minute. Emergency vehicles receive automatic green corridors within 4 seconds of detection.",
    problemSolved:
      "Overall intersection efficiency improves by 84%. Emergency response time through the intersection drops from 3.2 minutes to 47 seconds.",
    successRate: 94,
    trafficFlow: 91,
    waitingTime: 74,
    pedestrianSafety: 91,
    cost: "High",
    complexity: "High",
    features: [
      "AI traffic detection",
      "Adaptive signals",
      "Pedestrian sensors",
      "Emergency vehicle priority",
    ],
    technologies: [
      "Multi-sensor Fusion",
      "Emergency Beacon API",
      "Real-time Dashboard",
      "Distributed AI",
    ],
    visualElements: ["AI decision graph", "Emergency corridor view"],
  },
  {
    id: 4,
    name: "Drone Traffic Surveillance",
    shortName: "DRONE SURVEILLANCE",
    scenario: "adaptive",
    tag: "AERIAL AI",
    description:
      "Autonomous drone fleet hovers above key intersections, streams aerial footage to AI for incident detection and traffic routing.",
    innovation:
      "Drones self-navigate using GPS geofencing and return to charge stations autonomously. The AI identifies accidents or stalled vehicles and re-routes nearby traffic within 90 seconds.",
    problemSolved:
      "Incident detection time drops from 12 minutes (manual) to under 2 minutes. Downstream congestion caused by incidents is reduced by 68%.",
    successRate: 79,
    trafficFlow: 76,
    waitingTime: 70,
    pedestrianSafety: 72,
    cost: "High",
    complexity: "High",
    features: [
      "Autonomous drone fleet",
      "Aerial incident detection",
      "Dynamic rerouting",
      "Auto return-to-charge",
    ],
    technologies: [
      "UAV Navigation AI",
      "4K Aerial Cameras",
      "Real-time Rerouting Engine",
      "Geofencing System",
    ],
    visualElements: ["Drone flight path", "Incident heat map"],
  },
  {
    id: 5,
    name: "Underground Smart Tunnel",
    shortName: "SMART TUNNEL",
    scenario: "intersection",
    tag: "INFRASTRUCTURE",
    description:
      "A sensor-lined underground tunnel beneath the busiest intersection diverts heavy vehicles, reducing surface congestion by removing large traffic from the equation.",
    innovation:
      "Entry gates use vehicle classification AI to permit only HGVs and buses. Inside, IoT sensors monitor air quality, speed and incidents. Variable message signs guide routing in real time.",
    problemSolved:
      "Surface congestion near the school drops by 61%. Air quality around the school zone improves measurably within 6 months of deployment.",
    successRate: 83,
    trafficFlow: 88,
    waitingTime: 65,
    pedestrianSafety: 78,
    cost: "Very High",
    complexity: "Very High",
    features: [
      "Vehicle classification gate",
      "Real-time tunnel telemetry",
      "Air quality monitoring",
      "Variable message signs",
    ],
    technologies: [
      "Vehicle Classification AI",
      "Underground IoT Network",
      "Air Quality Sensors",
      "Variable Message System",
    ],
    visualElements: ["Tunnel cross-section", "Vehicle classification feed"],
  },
  {
    id: 6,
    name: "Connected Vehicle Network",
    shortName: "V2X NETWORK",
    scenario: "adaptive",
    tag: "V2X",
    description:
      "Vehicle-to-infrastructure (V2X) communication allows cars to receive signal phase and timing data directly, enabling smooth deceleration and green-wave driving.",
    innovation:
      "DSRC and C-V2X radio modules broadcast intersection data to equipped vehicles up to 300 m away. Vehicles adjust speed to hit green waves, eliminating unnecessary stops.",
    problemSolved:
      "Fuel consumption in the zone drops by 22%. Brake-wear-related micro-particle pollution decreases by 31% in the school corridor.",
    successRate: 76,
    trafficFlow: 80,
    waitingTime: 85,
    pedestrianSafety: 60,
    cost: "High",
    complexity: "High",
    features: [
      "V2X radio broadcasting",
      "Green wave optimization",
      "Speed advisory system",
      "Low-emission corridor",
    ],
    technologies: [
      "DSRC / C-V2X Radio",
      "OBU Onboard Units",
      "Signal Phase Broadcast",
      "Traffic Management Cloud",
    ],
    visualElements: ["V2X signal cone", "Green wave timeline"],
  },
  {
    id: 7,
    name: "AI Bus Rapid Transit",
    shortName: "AI BRT CORRIDOR",
    scenario: "pedestrian",
    tag: "PUBLIC TRANSIT",
    description:
      "Dedicated AI-managed BRT lane removes buses from mixed traffic, with smart stops that predict passenger load and signal buses through intersections without stopping.",
    innovation:
      "Bus arrival prediction uses historical data and live traffic. Passenger-counting cameras at stops trigger earlier bus dispatch. Signal pre-emption clears the path 120 seconds before bus arrival.",
    problemSolved:
      "Bus journey times decrease by 38%. Daily passenger capacity increases by 2,400 commuters without adding new buses to the fleet.",
    successRate: 85,
    trafficFlow: 73,
    waitingTime: 91,
    pedestrianSafety: 79,
    cost: "Medium",
    complexity: "Medium",
    features: [
      "Dedicated BRT lane",
      "Signal pre-emption",
      "Passenger load prediction",
      "Real-time bus dispatch",
    ],
    technologies: [
      "Passenger Count AI",
      "Signal Pre-emption Radio",
      "Bus Dispatch Cloud",
      "Smart Stop Displays",
    ],
    visualElements: ["BRT corridor map", "Passenger load graph"],
  },
  {
    id: 8,
    name: "Flood-Safe Road Grid",
    shortName: "FLOOD-SAFE GRID",
    scenario: "intersection",
    tag: "RESILIENCE",
    description:
      "Sensor network detects surface water accumulation on roads and automatically re-routes traffic away from flooded sections with live map updates pushed to navigation apps.",
    innovation:
      "Ultrasonic water-level sensors embedded in drains and road surfaces report every 10 seconds. When flood threshold is crossed, barriers close and routing APIs push detour data to Waze, Google Maps and local apps.",
    problemSolved:
      "Flood-related traffic accidents drop by 91% in instrumented corridors. Emergency services reach flood scenes 4 minutes faster on average.",
    successRate: 88,
    trafficFlow: 69,
    waitingTime: 62,
    pedestrianSafety: 85,
    cost: "Medium",
    complexity: "Medium",
    features: [
      "Real-time flood sensors",
      "Auto barrier activation",
      "Navigation app push",
      "Emergency service routing",
    ],
    technologies: [
      "Ultrasonic Water Sensors",
      "Automated Barriers",
      "Navigation API Integration",
      "Flood Alert Dashboard",
    ],
    visualElements: ["Water level monitor", "Dynamic detour map"],
  },
  {
    id: 9,
    name: "Solar-Powered Smart Poles",
    shortName: "SOLAR SMART POLES",
    scenario: "pedestrian",
    tag: "GREEN INFRA",
    description:
      "Multi-function smart poles powered entirely by embedded solar panels combine traffic cameras, environmental sensors, EV charging, Wi-Fi and adaptive street lighting.",
    innovation:
      "Each pole generates 400 W peak, stores surplus in LiFePO4 batteries and contributes excess to the grid. Embedded edge AI processes camera feeds locally, minimizing data transmission costs.",
    problemSolved:
      "Infrastructure energy cost in the school zone drops to near zero. Real-time air quality and noise data is available to city planners for the first time.",
    successRate: 80,
    trafficFlow: 64,
    waitingTime: 60,
    pedestrianSafety: 82,
    cost: "Medium",
    complexity: "Low",
    features: [
      "Solar energy harvesting",
      "Edge AI processing",
      "EV charging points",
      "Environmental sensing",
    ],
    technologies: [
      "Monocrystalline Solar",
      "LiFePO4 Battery Storage",
      "Edge AI Chip",
      "Air & Noise Sensors",
    ],
    visualElements: ["Solar output graph", "Environment sensor feed"],
  },
  {
    id: 10,
    name: "Micro-Mobility Hub",
    shortName: "MICRO-MOBILITY HUB",
    scenario: "pedestrian",
    tag: "LAST MILE",
    description:
      "Strategically placed e-bike and e-scooter hubs with AI demand forecasting reduce car trips in the school corridor by providing attractive last-mile alternatives.",
    innovation:
      "AI demand models predict peak hire times with 91% accuracy and pre-position vehicles using overnight logistics. A gamified school safety app awards students points for walking or cycling instead of being driven.",
    problemSolved:
      "Car trips to the school drop by 34% within 3 months. CO₂ emissions in the corridor decrease by an estimated 18 tonnes per year.",
    successRate: 74,
    trafficFlow: 71,
    waitingTime: 78,
    pedestrianSafety: 88,
    cost: "Low",
    complexity: "Low",
    features: [
      "AI demand forecasting",
      "Dynamic vehicle repositioning",
      "Gamified safety app",
      "Real-time availability map",
    ],
    technologies: [
      "Demand Forecast AI",
      "Fleet Management Cloud",
      "Mobile Safety App",
      "GPS Tracking",
    ],
    visualElements: ["Hub demand heatmap", "Trip reduction chart"],
  },
  {
    id: 11,
    name: "AR Wayfinding Crosswalks",
    shortName: "AR CROSSWALK",
    scenario: "pedestrian",
    tag: "AUGMENTED REALITY",
    description:
      "Augmented reality projections on road surfaces display dynamic countdown timers, safe-path guides and hazard warnings visible in all weather conditions.",
    innovation:
      "High-lumen laser projectors embedded in signal poles cast AR overlays onto the road that remain visible in rain and low light. Countdown timers sync with the signal controller in real time.",
    problemSolved:
      "Near-miss incidents at monitored crossings drop by 79%. First-time visitors to the school find correct crossing points 3× faster than with traditional signage.",
    successRate: 78,
    trafficFlow: 58,
    waitingTime: 72,
    pedestrianSafety: 96,
    cost: "Medium",
    complexity: "Medium",
    features: [
      "Road surface AR projection",
      "Countdown timer overlay",
      "Hazard warning display",
      "All-weather visibility",
    ],
    technologies: [
      "Laser Projection System",
      "Signal Controller API",
      "Weather-resistant Housing",
      "Daylight Compensation AI",
    ],
    visualElements: ["AR overlay demo", "Visibility test footage"],
  },
  {
    id: 12,
    name: "Predictive Congestion AI",
    shortName: "PREDICTIVE AI",
    scenario: "adaptive",
    tag: "PREDICTION",
    description:
      "Deep learning model trained on 5 years of historical traffic data predicts congestion hotspots 45 minutes ahead and triggers pre-emptive signal and routing adjustments.",
    innovation:
      "The model ingests school calendars, weather forecasts and local event data as additional features. Predictions are served via a REST API consumed by connected navigation systems and city dashboards.",
    problemSolved:
      "Congestion events are predicted with 89% accuracy. Pre-emptive rerouting prevents 6 out of every 10 peak-hour bottlenecks from forming.",
    successRate: 89,
    trafficFlow: 85,
    waitingTime: 83,
    pedestrianSafety: 70,
    cost: "Low",
    complexity: "Medium",
    features: [
      "45-minute ahead prediction",
      "Calendar & weather fusion",
      "REST API data service",
      "City dashboard integration",
    ],
    technologies: [
      "LSTM Deep Learning",
      "Weather & Calendar API",
      "Prediction REST Service",
      "City Intelligence Dashboard",
    ],
    visualElements: ["Prediction confidence map", "Historical accuracy chart"],
  },
];

// keep backward compat for any legacy imports
export const trafficConcepts = allConcepts.slice(0, 3);
