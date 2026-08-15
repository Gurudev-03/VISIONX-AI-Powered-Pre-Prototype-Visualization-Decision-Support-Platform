/* ═══════════════════════════════════════════════════════════════
   VISIONX TECH STACK GENERATOR
   Generates full implementation tech stack for any concept
   including tools, versions, IDEs, frameworks, and suggestions
═══════════════════════════════════════════════════════════════ */

/* ── IDE & Tool recommendations (universal) ── */
export const UNIVERSAL_TOOLS = [
  {
    category: "IDE / Code Editor",
    icon: "💻",
    tools: [
      { name: "VS Code",          version: "v1.90+",    use: "Primary IDE for frontend & backend",    link: "code.visualstudio.com",    recommended: true  },
      { name: "IntelliJ IDEA",    version: "2024.1",    use: "Java / Spring Boot development",        link: "jetbrains.com/idea",       recommended: false },
      { name: "Spring Tool Suite", version: "4.22+",    use: "Spring Boot projects (Eclipse-based)",  link: "spring.io/tools",          recommended: true  },
      { name: "PyCharm",          version: "2024.1",    use: "Python / AI / ML development",          link: "jetbrains.com/pycharm",    recommended: false },
      { name: "Android Studio",   version: "Hedgehog",  use: "Android mobile app development",       link: "developer.android.com",    recommended: false },
    ],
  },
  {
    category: "Version Control",
    icon: "🔀",
    tools: [
      { name: "Git",          version: "2.45+",  use: "Source code version control",          link: "git-scm.com",         recommended: true },
      { name: "GitHub",       version: "Latest", use: "Code hosting + CI/CD pipelines",       link: "github.com",          recommended: true },
      { name: "GitLab",       version: "Latest", use: "Self-hosted Git + DevOps",             link: "gitlab.com",          recommended: false },
      { name: "GitHub Actions",version:"Latest", use: "Automated build, test, deploy",        link: "github.com/features/actions", recommended: true },
    ],
  },
  {
    category: "Design & Prototyping",
    icon: "🎨",
    tools: [
      { name: "Figma",        version: "Latest", use: "UI/UX design & prototyping",           link: "figma.com",           recommended: true },
      { name: "Draw.io",      version: "Latest", use: "System architecture diagrams",         link: "app.diagrams.net",    recommended: true },
      { name: "Lucidchart",   version: "Latest", use: "Flowcharts & ER diagrams",             link: "lucidchart.com",      recommended: false },
    ],
  },
  {
    category: "Testing",
    icon: "🧪",
    tools: [
      { name: "Postman",      version: "11.x",   use: "API testing & documentation",          link: "postman.com",         recommended: true },
      { name: "Jest",         version: "29.x",   use: "JavaScript unit testing",              link: "jestjs.io",           recommended: true },
      { name: "JUnit 5",      version: "5.10+",  use: "Java unit & integration testing",      link: "junit.org",           recommended: false },
      { name: "Selenium",     version: "4.x",    use: "Browser automation testing",           link: "selenium.dev",        recommended: false },
    ],
  },
  {
    category: "DevOps & Deployment",
    icon: "🚀",
    tools: [
      { name: "Docker",       version: "26.x",   use: "Containerisation",                    link: "docker.com",          recommended: true },
      { name: "Kubernetes",   version: "1.30+",  use: "Container orchestration",             link: "kubernetes.io",       recommended: false },
      { name: "Render / Railway", version:"Latest",use:"Free cloud deployment (beginners)", link:"render.com",           recommended: true },
      { name: "AWS / GCP / Azure", version:"Latest",use:"Production cloud infrastructure", link:"aws.amazon.com",       recommended: false },
      { name: "Nginx",        version: "1.26+",  use: "Reverse proxy & web server",          link: "nginx.org",           recommended: true },
    ],
  },
  {
    category: "Project Management",
    icon: "📋",
    tools: [
      { name: "Notion",       version: "Latest", use: "Documentation & planning",             link: "notion.so",           recommended: true },
      { name: "Trello",       version: "Latest", use: "Task management (Kanban)",             link: "trello.com",          recommended: true },
      { name: "Jira",         version: "Latest", use: "Agile sprint management",              link: "atlassian.com/jira",  recommended: false },
      { name: "Slack",        version: "Latest", use: "Team communication",                   link: "slack.com",           recommended: false },
    ],
  },
];

/* ── Tech stack templates per solution archetype ── */
const ARCH_TECH_STACKS = {
  AI_DETECTION: {
    layers: [
      {
        name: "Frontend Dashboard",
        color: "#22d3ee",
        stack: [
          { name:"React.js",      version:"18.x",    role:"UI framework",           type:"framework" },
          { name:"Vite",          version:"5.x",     role:"Build tool",             type:"tool"      },
          { name:"Chart.js",      version:"4.x",     role:"Real-time graphs",       type:"library"   },
          { name:"TailwindCSS",   version:"3.x",     role:"Styling",                type:"library"   },
          { name:"WebSocket",     version:"Native",  role:"Live data feed",         type:"protocol"  },
        ],
      },
      {
        name: "Backend API",
        color: "#a78bfa",
        stack: [
          { name:"Spring Boot",   version:"3.3.x",   role:"REST API framework",     type:"framework" },
          { name:"Java",          version:"21 LTS",  role:"Primary language",       type:"language"  },
          { name:"Spring Security",version:"6.x",   role:"Authentication & auth",   type:"library"   },
          { name:"Maven",         version:"3.9+",    role:"Dependency management",  type:"tool"      },
          { name:"Swagger UI",    version:"3.x",     role:"API documentation",      type:"tool"      },
        ],
      },
      {
        name: "AI / ML Engine",
        color: "#f43f5e",
        stack: [
          { name:"Python",        version:"3.11+",   role:"AI/ML language",         type:"language"  },
          { name:"TensorFlow",    version:"2.16+",   role:"Deep learning",          type:"framework" },
          { name:"OpenCV",        version:"4.9+",    role:"Computer vision",        type:"library"   },
          { name:"FastAPI",       version:"0.111+",  role:"AI model serving",       type:"framework" },
          { name:"YOLO v8",       version:"8.x",     role:"Object detection model", type:"model"     },
        ],
      },
      {
        name: "Database & Storage",
        color: "#22c55e",
        stack: [
          { name:"PostgreSQL",    version:"16.x",    role:"Primary relational DB",  type:"database"  },
          { name:"Redis",         version:"7.x",     role:"Cache & real-time store",type:"database"  },
          { name:"MongoDB",       version:"7.x",     role:"Unstructured sensor data",type:"database" },
          { name:"MinIO",         version:"Latest",  role:"Object / video storage", type:"storage"   },
        ],
      },
      {
        name: "IoT & Hardware",
        color: "#facc15",
        stack: [
          { name:"Raspberry Pi",  version:"5 / CM4", role:"Edge computing node",    type:"hardware"  },
          { name:"Arduino",       version:"Nano/Uno",role:"Sensor microcontroller", type:"hardware"  },
          { name:"MQTT",          version:"5.0",     role:"IoT messaging protocol", type:"protocol"  },
          { name:"Node-RED",      version:"3.x",     role:"IoT flow programming",   type:"tool"      },
        ],
      },
    ],
  },

  SMART_MONITORING: {
    layers: [
      {
        name: "Frontend Dashboard",
        color: "#22d3ee",
        stack: [
          { name:"React.js",      version:"18.x",    role:"Dashboard UI",           type:"framework" },
          { name:"Grafana",       version:"10.x",    role:"Metrics visualisation",  type:"tool"      },
          { name:"Socket.io",     version:"4.x",     role:"Live data updates",      type:"library"   },
          { name:"Leaflet.js",    version:"1.9+",    role:"Map visualisation",      type:"library"   },
        ],
      },
      {
        name: "Backend & API",
        color: "#a78bfa",
        stack: [
          { name:"Node.js",       version:"20 LTS",  role:"API server",             type:"runtime"   },
          { name:"Express.js",    version:"4.x",     role:"REST framework",         type:"framework" },
          { name:"Prisma ORM",    version:"5.x",     role:"Database ORM",           type:"library"   },
          { name:"JWT",           version:"9.x",     role:"Authentication",         type:"library"   },
        ],
      },
      {
        name: "IoT Data Pipeline",
        color: "#f43f5e",
        stack: [
          { name:"Apache Kafka",  version:"3.7+",    role:"Event streaming",        type:"platform"  },
          { name:"InfluxDB",      version:"2.7+",    role:"Time-series sensor DB",  type:"database"  },
          { name:"MQTT Broker",   version:"Mosquitto 2.x",role:"IoT messaging",    type:"tool"      },
          { name:"Python",        version:"3.11+",   role:"Data processing scripts",type:"language"  },
        ],
      },
      {
        name: "Database",
        color: "#22c55e",
        stack: [
          { name:"PostgreSQL",    version:"16.x",    role:"Main database",          type:"database"  },
          { name:"Redis",         version:"7.x",     role:"Session & cache",        type:"database"  },
          { name:"InfluxDB",      version:"2.7+",    role:"Time series data",       type:"database"  },
        ],
      },
    ],
  },

  MOBILE_PLATFORM: {
    layers: [
      {
        name: "Mobile App",
        color: "#22d3ee",
        stack: [
          { name:"React Native",  version:"0.74+",   role:"Cross-platform app",     type:"framework" },
          { name:"Expo",          version:"51.x",    role:"App development toolkit",type:"platform"  },
          { name:"React Navigation",version:"6.x",  role:"App navigation",         type:"library"   },
          { name:"Zustand",       version:"4.x",     role:"State management",       type:"library"   },
          { name:"Axios",         version:"1.7+",    role:"HTTP requests",          type:"library"   },
        ],
      },
      {
        name: "Backend API",
        color: "#a78bfa",
        stack: [
          { name:"Spring Boot",   version:"3.3.x",   role:"REST API server",        type:"framework" },
          { name:"Java",          version:"21 LTS",  role:"Backend language",       type:"language"  },
          { name:"Firebase",      version:"10.x",    role:"Push notifications",     type:"platform"  },
          { name:"Twilio",        version:"Latest",  role:"SMS / WhatsApp alerts",  type:"service"   },
        ],
      },
      {
        name: "Database",
        color: "#22c55e",
        stack: [
          { name:"Firebase Firestore",version:"9.x", role:"Real-time database",    type:"database"  },
          { name:"PostgreSQL",    version:"16.x",    role:"Structured data store",  type:"database"  },
          { name:"Cloudinary",    version:"Latest",  role:"Media storage & CDN",    type:"service"   },
        ],
      },
    ],
  },

  PREDICTIVE_AI: {
    layers: [
      {
        name: "ML Pipeline",
        color: "#f43f5e",
        stack: [
          { name:"Python",        version:"3.11+",   role:"ML language",            type:"language"  },
          { name:"Scikit-learn",  version:"1.5+",    role:"Classical ML models",    type:"library"   },
          { name:"TensorFlow",    version:"2.16+",   role:"Deep learning",          type:"framework" },
          { name:"Pandas",        version:"2.x",     role:"Data processing",        type:"library"   },
          { name:"Jupyter",       version:"7.x",     role:"Model development",      type:"tool"      },
        ],
      },
      {
        name: "Model Serving",
        color: "#a78bfa",
        stack: [
          { name:"FastAPI",       version:"0.111+",  role:"Model REST API",         type:"framework" },
          { name:"MLflow",        version:"2.x",     role:"Model registry",         type:"platform"  },
          { name:"Docker",        version:"26.x",    role:"Model containerisation", type:"tool"      },
          { name:"Celery",        version:"5.x",     role:"Async task queue",       type:"library"   },
        ],
      },
      {
        name: "Frontend & API Gateway",
        color: "#22d3ee",
        stack: [
          { name:"React.js",      version:"18.x",    role:"Prediction dashboard",   type:"framework" },
          { name:"Spring Boot",   version:"3.3.x",   role:"API gateway",            type:"framework" },
          { name:"Chart.js",      version:"4.x",     role:"Forecast charts",        type:"library"   },
        ],
      },
      {
        name: "Data Sources",
        color: "#22c55e",
        stack: [
          { name:"PostgreSQL",    version:"16.x",    role:"Historical data",        type:"database"  },
          { name:"Apache Spark",  version:"3.5+",    role:"Big data processing",    type:"platform"  },
          { name:"OpenWeather API",version:"3.0",    role:"Weather data feed",      type:"api"       },
        ],
      },
    ],
  },

  NLP_ASSISTANT: {
    layers: [
      {
        name: "AI / NLP Engine",
        color: "#f43f5e",
        stack: [
          { name:"Python",        version:"3.11+",   role:"NLP language",           type:"language"  },
          { name:"LangChain",     version:"0.2+",    use:"LLM orchestration",       type:"framework" },
          { name:"Hugging Face",  version:"4.41+",   role:"Pre-trained models",     type:"platform"  },
          { name:"spaCy",         version:"3.7+",    role:"NLP processing",         type:"library"   },
          { name:"FastAPI",       version:"0.111+",  role:"AI API server",          type:"framework" },
        ],
      },
      {
        name: "Chatbot Integration",
        color: "#22d3ee",
        stack: [
          { name:"WhatsApp Cloud API",version:"Latest",role:"WhatsApp messaging",  type:"api"       },
          { name:"Telegram Bot API",version:"Latest", role:"Telegram bot",         type:"api"       },
          { name:"Twilio",        version:"Latest",  role:"SMS / voice",            type:"service"   },
          { name:"React.js",      version:"18.x",    role:"Web chat UI",            type:"framework" },
        ],
      },
      {
        name: "Backend & DB",
        color: "#22c55e",
        stack: [
          { name:"Node.js",       version:"20 LTS",  role:"Chat backend",           type:"runtime"   },
          { name:"MongoDB",       version:"7.x",     role:"Conversation storage",   type:"database"  },
          { name:"Redis",         version:"7.x",     role:"Session management",     type:"database"  },
          { name:"Pinecone",      version:"Latest",  role:"Vector database (RAG)",  type:"database"  },
        ],
      },
    ],
  },
};

/* ── default fallback stack ── */
const DEFAULT_STACK = ARCH_TECH_STACKS.SMART_MONITORING;

/* ── map solution archetype to stack ── */
const TYPE_TO_STACK = {
  AI_DETECTION:        "AI_DETECTION",
  SMART_MONITORING:    "SMART_MONITORING",
  PREDICTIVE_AI:       "PREDICTIVE_AI",
  DIGITAL_TWIN:        "AI_DETECTION",
  MOBILE_PLATFORM:     "MOBILE_PLATFORM",
  BLOCKCHAIN_INTEGRITY:"SMART_MONITORING",
  DRONE_AERIAL:        "AI_DETECTION",
  AR_VISUALIZATION:    "MOBILE_PLATFORM",
  NLP_ASSISTANT:       "NLP_ASSISTANT",
  SOLAR_INFRA:         "SMART_MONITORING",
};

/* ── derive archetype from concept tag ── */
function getArchetype(concept) {
  const tag = concept?.tag || "";
  if (tag.includes("AI DETECTION") || tag.includes("AERIAL") || tag.includes("DIGITAL TWIN")) return "AI_DETECTION";
  if (tag.includes("IOT") || tag.includes("MONITORING") || tag.includes("BLOCKCHAIN") || tag.includes("GREEN")) return "SMART_MONITORING";
  if (tag.includes("PREDICTIVE") || tag.includes("PREDICTION")) return "PREDICTIVE_AI";
  if (tag.includes("MOBILE") || tag.includes("AR")) return "MOBILE_PLATFORM";
  if (tag.includes("NLP") || tag.includes("ASSISTANT")) return "NLP_ASSISTANT";
  return "SMART_MONITORING";
}

/* ── main function: generate full tech stack for a concept ── */
export function generateTechStack(concept) {
  const archetype = getArchetype(concept);
  const layers    = ARCH_TECH_STACKS[archetype]?.layers || DEFAULT_STACK.layers;

  /* inject concept-specific tech names from the concept's own technologies array */
  const injected = layers.map((layer, i) => ({
    ...layer,
    stack: layer.stack.map((item, j) => {
      /* replace first item of first layer with concept's own tech if available */
      if (i === 0 && j === 0 && concept?.technologies?.[0]) {
        return { ...item, name: concept.technologies[0], role: "Core technology" };
      }
      return item;
    }),
  }));

  return {
    layers: injected,
    tools: UNIVERSAL_TOOLS,
    timeline: generateTimeline(concept),
    architecture: generateArchText(concept, archetype),
  };
}

/* ── project timeline ── */
function generateTimeline(concept) {
  const complexity = concept?.complexity || "Medium";
  const baseWeeks  = complexity === "Low" ? 2 : complexity === "High" || complexity === "Very High" ? 5 : 3;
  return [
    { phase:"Week 1",      task:"Environment setup, architecture design, DB schema",   status:"plan" },
    { phase:`Week 2`,      task:"Backend API + DB implementation, unit tests",          status:"plan" },
    { phase:`Week ${baseWeeks}`,task:"AI/ML model training + integration",             status:"plan" },
    { phase:`Week ${baseWeeks+1}`,task:"Frontend dashboard + mobile app",              status:"plan" },
    { phase:`Week ${baseWeeks+2}`,task:"IoT/hardware integration + end-to-end tests",  status:"plan" },
    { phase:`Week ${baseWeeks+3}`,task:"Deployment, monitoring, client demo",          status:"plan" },
  ];
}

/* ── architecture description ── */
function generateArchText(concept, archetype) {
  const map = {
    AI_DETECTION:     "Microservices architecture with AI inference at the edge, REST API gateway (Spring Boot), React frontend and PostgreSQL + Redis data layer.",
    SMART_MONITORING: "Event-driven architecture using Kafka for IoT data streams, Node.js API server, Grafana dashboards and InfluxDB time-series storage.",
    PREDICTIVE_AI:    "ML pipeline with Python (TensorFlow/scikit-learn), FastAPI model serving, Spring Boot API gateway and React prediction dashboard.",
    MOBILE_PLATFORM:  "React Native cross-platform app, Spring Boot REST API backend, Firebase for real-time sync, PostgreSQL + Cloudinary for media.",
    NLP_ASSISTANT:    "LangChain + Hugging Face NLP engine, WhatsApp/Telegram bot integration, Node.js backend, MongoDB + Pinecone vector DB for RAG.",
  };
  return map[archetype] || map.SMART_MONITORING;
}
