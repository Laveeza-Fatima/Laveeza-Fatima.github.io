/* ==========================================================================
   PORTFOLIO CONTENT
   Everything on the site is generated from this file. Edit freely.
   Text wrapped in *asterisks* is rendered in the italic serif accent.
   ========================================================================== */

window.PORTFOLIO = {
  name: "Laveeza Fatima",
  initials: "LF",
  role: "Electrical Engineer · Co-Founder, Verafo",
  location: "Islamabad, Pakistan",
  timeZone: "Asia/Karachi",
  status: "Open to internships",
  email: "laveezafatima73@gmail.com",
  phone: "+92 326 7747746",
  resume: "Laveeza_Fatima_CV.pdf",  // your CV (replace this file to update it; set to "" to hide the buttons)
  portrait: "media/portrait.jpg",

  hero: {
    lines: ["Circuits, code", "& *AI agents*", "that do real work."],
    intro:
      "Third-year Electrical Engineering student at NUST SEECS and Co-Founder at Verafo. I build AI agents and automation systems for businesses, prediction tools for e-commerce, and verify digital chip designs.",
  },

  about: {
    lead:
      "I'm a third-year Electrical Engineering student at *NUST SEECS*, co-founder of *Verafo*, and a builder of AI systems that real businesses use. My work runs from *digital chip verification* and embedded hardware to AI agents, automation and e-commerce prediction.",
    body:
      "This summer I verified digital designs at the NUST Chip Design Centre with SystemVerilog, UVM and Cadence Xcelium. I like problems where hardware, software and people meet. Whether it's a checkout that shouldn't offer Cash on Delivery to a risky buyer, or a salon that keeps missing bookings after midnight, I start from the real-world pain, then design the system, wire it up and test it until it holds.",
    stats: [
      { value: 2, suffix: " days", label: "To start filling a Belgian salon's empty calendar" },
      { value: 18, suffix: "%", label: "Fewer returns for a brand by Verafo in 30 days" },
      { value: 5, suffix: "+", label: "E-commerce brands on the Verafo network" },
      { value: 24, suffix: "/7", label: "AI agents, always on" },
    ],
  },

  skills: [
    "AI Agents", "n8n", "SystemVerilog", "UVM", "Digital IC Design", "Shopify Functions", "Remix", "Supabase", "Prompt Engineering",
    "Arduino", "Embedded C", "Power Electronics", "Proteus", "C++ / Qt", "AutoCAD",
  ],

  /* ---- Projects ----------------------------------------------------------
     image:      cover image (otherwise generated art from colors + pattern)
     highlights: big numbers in the case study
     flow:       "how it works" pipeline steps
     journey:    before → after stages
     gallery:    images / videos  { type, src, poster, caption, tall }
     links:      [{ label, url, primary }]
  ------------------------------------------------------------------------- */
  projects: [
    {
      slug: "verafo",
      title: "Verafo",
      category: "AI & Software",
      year: "2026 →",
      role: "Co-Founder",
      client: "In development, testing on real brand data",
      stack: ["Remix", "Shopify Functions", "Polaris", "Supabase", "Prisma", "Vercel"],
      image: "media/verafo-hero.jpg",
      summary:
        "Pakistan's first e-commerce prediction engine. Verafo tells sellers which Cash-on-Delivery orders will actually deliver, before they ship. I'm the co-founder leading the technical side of Verafo.",
      overview:
        "In Pakistan a large share of Cash-on-Delivery parcels are refused at the door, and the seller pays the courier both ways for nothing. Verafo reads each buyer's trail (what they ordered, when, and whether they accepted or returned it) and scores them before the seller ships. Every brand that joins makes the network smarter. As co-founder I lead the technical side, from the prediction engine to the Shopify integration.",
      highlights: [
        { value: "18%", label: "Fewer returns for a brand by Verafo in 30 days" },
        { value: "16%", label: "Sales growth for another brand in one month" },
        { value: "5+", label: "E-commerce brands on the network" },
        { value: "3 in 10", label: "COD orders come back without it" },
      ],
      flow: [
        "Seller connects their store",
        "Every buyer gets a risk score",
        "Risky COD orders flagged before shipping",
        "Network learns from every delivery",
      ],
      outcomes: [
        "18% fewer returns for a brand in 30 days",
        "16% sales growth for another brand in one month",
        "One-click setup inside Shopify",
        "Sellers decide when to offer Cash on Delivery",
        "A dashboard of returns avoided",
      ],
      gallery: [
        { type: "image", src: "media/verafo-cover.jpg", caption: "Verafo: Pakistan's first commerce prediction engine" },
        { type: "image", src: "media/verafo-problem.jpg", caption: "The problem: refused COD parcels" },
        { type: "image", src: "media/verafo-blindspot.jpg", caption: "Why blocklists aren't enough" },
        { type: "image", src: "media/verafo-how.jpg", caption: "How the prediction works" },
        { type: "image", src: "media/verafo-pitch.jpg", caption: "Pitching Verafo" },
        { type: "image", src: "media/verafo-store.jpg", caption: "The seller's view: returns eating revenue" },
      ],
      links: [{ label: "Verafo on Instagram", url: "https://www.instagram.com/verafo.ai/", primary: true }],
    },
    {
      slug: "ai-booking-agent",
      title: "AI Booking Agent",
      category: "AI & Software",
      year: "2026",
      role: "Design, build & automation",
      client: "Live for an international salon in Belgium",
      stack: ["n8n", "LLM APIs", "AI tool-calling", "Webhooks & REST APIs", "Google Workspace", "Custom chat UI"],
      image: "media/booking-cover.jpg",
      summary:
        "An AI booking agent that took an international salon in Belgium from an empty calendar to fully booked. It answers clients 24/7, checks live availability, quotes prices and books the slot.",
      overview:
        "Salons, dental clinics and aesthetics studios lose clients when messages go unanswered after hours. I built an AI agent that runs the whole booking conversation, from the first “hey” to a confirmed slot, so the team only steps in to verify payment. Our first international client, a salon in Belgium, had the system customised for her business.",
      highlights: [
        { value: "Full", label: "Calendar, fully booked after launch" },
        { value: "2 days", label: "Until bookings started filling in" },
        { value: "24/7", label: "Always answering clients" },
        { value: "Global", label: "International client closed" },
      ],
      flow: [
        "Client messages any time",
        "Agent understands the request",
        "Checks live availability",
        "Quotes and collects payment proof",
        "Books and confirms the slot",
      ],
      results: {
        title: "Results for our client in Belgium",
        note: "Client and customer names are blurred for privacy.",
        items: [
          { src: "media/result-before.jpg", label: "Before", caption: "An empty calendar" },
          { src: "media/result-2days.jpg", label: "After 2 days", caption: "Bookings start filling in" },
          { src: "media/result-booked.jpg", label: "Now", caption: "Salon fully booked" },
        ],
      },
      journey: [
        {
          label: "Version 1",
          title: "Basic chatbot",
          points: [
            "Default chat window",
            "Text-only payment confirmation",
            "Simple time slots",
          ],
          media: { type: "video", src: "media/booking-chat-v1.mp4", poster: "media/booking-chat-v1-poster.jpg" },
        },
        {
          label: "Version 2 · demo on a sample salon",
          title: "Production-ready agent",
          points: [
            "Custom branded chat experience",
            "Clients upload payment proof right in the chat",
            "Smart scheduling that blocks the real service time",
            "Offers alternatives when the first choice is busy",
            "The team confirms payment before a booking is final",
          ],
          media: { type: "video", src: "media/booking-chat-v2.mp4", poster: "media/booking-chat-v2-poster.jpg", tall: true },
        },
      ],
      outcomes: [
        "A Belgian salon's calendar went from empty to fully booked",
        "Replies instantly, day and night",
        "No double bookings",
        "Every booking and payment recorded",
        "Customised to each business's services and prices",
      ],
      next: [
        "WhatsApp & Instagram DM channels",
        "Dental clinics and aesthetics studios",
        "Multi-location businesses",
        "Reminders and no-show follow-ups",
      ],
      gallery: [
        { type: "video", src: "media/booking-backend.mp4", poster: "media/booking-backend-poster.jpg", caption: "Behind the scenes on a demo setup" },
        { type: "image", src: "media/booking-n8n.jpg", caption: "A simplified version of the workflow (the production build stays private)" },
        { type: "image", src: "media/chat-pricing.jpg", caption: "Pricing per artist tier", tall: true },
        { type: "image", src: "media/chat-available.jpg", caption: "Live availability check", tall: true },
        { type: "image", src: "media/chat-summary.jpg", caption: "Receipt-style booking summary", tall: true },
        { type: "image", src: "media/booking-sheet.jpg", caption: "Every booking recorded automatically" },
        { type: "image", src: "media/booking-calendar.jpg", caption: "A calendar for each team member" },
        { type: "image", src: "media/booking-drive.jpg", caption: "Payment proofs saved automatically" },
      ],
      links: [],
    },
    {
      slug: "echo",
      title: "Echo",
      category: "AI & Software",
      year: "2026",
      role: "Design & build",
      client: "Open-source project",
      stack: ["n8n", "Gemini", "RAG", "Supabase pgvector", "WhatsApp Cloud API"],
      image: "media/echo-cover.jpg",
      summary:
        "A support agent that learns from your team. It answers customers from the business's own documents, asks the owner on WhatsApp when it isn't sure, and turns every reply into permanent knowledge.",
      overview:
        "Most support bots make up answers and never get smarter. Echo does neither. It answers only from the business's own documents. When it isn't confident, it logs the question and asks the owner on WhatsApp. The owner simply swipes to reply, and that answer becomes knowledge, so the next customer gets it instantly. Every unanswered question makes Echo better.",
      highlights: [
        { value: "0", label: "Made-up answers: it asks instead of guessing" },
        { value: "1 swipe", label: "For the owner to teach it something new" },
        { value: "RAG", label: "Answers from the business's own documents" },
        { value: "24/7", label: "Always answering customers" },
      ],
      flow: [
        "Customer asks a question",
        "Echo searches the business's documents",
        "Confident → answers with the source",
        "Not sure → asks the owner on WhatsApp",
        "Owner's reply becomes new knowledge",
      ],
      outcomes: [
        "Interactive live demo: chat as a customer, answer as the owner, watch Echo learn",
        "A live list of questions the business hasn't documented yet",
        "Works for online stores, clinics, agencies and SaaS support",
        "Open source: workflows, database setup and docs on GitHub",
      ],
      gallery: [
        { type: "image", src: "media/echo-demo.jpg", caption: "A question Echo couldn't answer goes to the owner on WhatsApp; her reply is learned and the next customer gets it instantly" },
      ],
      links: [
        { label: "Try the live demo", url: "https://laveeza-fatima.github.io/echo-support-agent/", primary: true },
        { label: "View on GitHub", url: "https://github.com/Laveeza-Fatima/echo-support-agent" },
      ],
    },
    {
      slug: "ledger",
      title: "Ledger",
      category: "AI & Software",
      year: "2026",
      role: "Design & build",
      client: "Open-source project",
      stack: ["n8n", "Gemini", "Document AI", "Supabase", "WhatsApp Cloud API", "Node.js tests"],
      image: "media/ledger-cover.jpg",
      summary:
        "An AI invoice auditor that catches the invoices you shouldn't pay: duplicates, overcharges, wrong totals and changed bank details, before any money leaves the account.",
      overview:
        "Supplier invoices arrive by email. Ledger reads each PDF with AI, checks it against supplier records, contract prices and payment history, and holds anything suspicious, then alerts the owner on WhatsApp. AI does the reading; clear, tested rules make the pay-or-hold decision, so every verdict is explainable and never made up.",
      highlights: [
        { value: "PKR 101K", label: "Protected in the demo inbox" },
        { value: "5", label: "Checks on every invoice" },
        { value: "11", label: "Automated tests, all passing" },
        { value: "0", label: "Payments to a changed bank account" },
      ],
      flow: [
        "Invoice PDF arrives by email",
        "AI reads the invoice",
        "Checked against contracts & history",
        "Suspicious → put on hold",
        "Owner alerted on WhatsApp",
      ],
      outcomes: [
        "Catches bank-detail fraud, duplicate invoices, overcharges and wrong totals",
        "Shows exactly how much money each hold protected",
        "One tested rules engine shared by the demo, the workflow and the tests",
        "Open source: workflow, database setup, tests and docs on GitHub",
      ],
      gallery: [
        { type: "image", src: "media/ledger-demo.jpg", caption: "An invoice asking to be paid into a new bank account: held, PKR 49,560 protected" },
        { type: "image", src: "media/ledger-price.jpg", caption: "A supplier charging above the agreed contract price: held for the exact overcharge" },
      ],
      links: [
        { label: "Try the live demo", url: "https://laveeza-fatima.github.io/ledger-invoice-auditor/", primary: true },
        { label: "View on GitHub", url: "https://github.com/Laveeza-Fatima/ledger-invoice-auditor" },
      ],
    },
    {
      slug: "nova",
      title: "Nova AI Receptionist",
      category: "AI & Software",
      year: "2026",
      role: "Design & build",
      client: "Open-source template",
      stack: ["n8n", "AI Agent", "Gemini", "Google Sheets"],
      image: "media/nova-demo.jpg",
      summary:
        "An AI receptionist that answers customer questions from a Google Sheet, qualifies people who want to book, and saves every lead for the team.",
      overview:
        "Nova is an open, ready-to-import n8n template for small service businesses. The owner keeps answers in a simple Google Sheet; Nova never invents prices or hours, collects contact details one question at a time, and logs every lead automatically.",
      highlights: [
        { value: "24/7", label: "Answers and captures leads" },
        { value: "0", label: "Invented prices or hours" },
        { value: "10 min", label: "To set up from the template" },
        { value: "MIT", label: "Open-source licence" },
      ],
      outcomes: [
        "Answers only from the business's own knowledge sheet",
        "Collects name, contact and need, then saves the lead",
        "Live demo page plus importable n8n workflow",
      ],
      gallery: [
        { type: "image", src: "media/nova-demo.jpg", caption: "Nova answers a price question, then books a facial and saves the lead" },
      ],
      links: [
        { label: "Try the live demo", url: "https://laveeza-fatima.github.io/ai-receptionist-agent/", primary: true },
        { label: "View on GitHub", url: "https://github.com/Laveeza-Fatima/ai-receptionist-agent" },
      ],
    },
    {
      slug: "voice-home-automation",
      title: "Voice Home Automation",
      category: "Hardware",
      year: "IoT",
      role: "Design, build & firmware",
      client: "Solo project",
      stack: ["Arduino Mega", "HC-05 Bluetooth", "Relays", "Servo", "Embedded C", "Google Assistant"],
      image: "media/iot.jpg",
      summary:
        "Control lights, a fan and a door lock with your voice: Google Assistant → Bluetooth → Arduino Mega → relays and motors.",
      overview:
        "A voice-controlled home automation system designed for convenience, accessibility and energy efficiency. It's especially useful for people with limited mobility.",
      challenge:
        "Reliable command recognition from a phone, low-latency switching, and a design that scales to more appliances.",
      solution:
        "Google Assistant and a Bluetooth controller app send commands over an HC-05 module to an Arduino Mega. The Arduino parses them and drives relays (lights, fan) and a servo (door lock).",
      outcomes: [
        "Recognised predefined voice commands reliably",
        "Switched appliances with no noticeable delay",
        "Seamless operation within Bluetooth range",
        "Modular, so more devices can be added easily",
      ],
      gallery: [
        { type: "video", src: "media/iot-demo.mp4", poster: "media/iot-demo-poster.jpg", caption: "Live demo" },
        { type: "image", src: "media/iot.jpg", caption: "The hardware build" },
      ],
      links: [{ label: "View on GitHub", url: "https://github.com/Laveeza-Fatima/IOT-based-voice-controlled-home-automation-system", primary: true }],
    },
    {
      slug: "buck-converter",
      title: "Buck Converter",
      category: "Hardware",
      year: "Power",
      role: "Design & testing",
      client: "Team: A. Mohsin, L. Fatima, F. Habib, R. Irum, H. Sultan",
      stack: ["555 Timer", "IRFZ44N MOSFET", "SB340 Schottky", "LC filter", "PWM"],
      image: "media/buck.jpg",
      summary: "A PWM step-down DC-DC converter that regulates 9–25 V down to 1–24 V, built and verified on hardware.",
      overview:
        "Design, simulation and hardware build of a buck converter, tested by driving a DC motor and LEDs under varying loads.",
      challenge: "Keep the output stable across a wide input range and different loads, using discrete, low-cost parts.",
      solution:
        "A 555 timer generates the PWM that switches an IRFZ44N MOSFET. The inductor stores and releases energy through a Schottky freewheeling diode, and an LC filter smooths the output. Vout = D × Vin, adjusted by potentiometer.",
      highlights: [
        { value: "9–25 V", label: "Input range" },
        { value: "1–24 V", label: "Adjustable output" },
        { value: "1.5 A", label: "Max output current" },
        { value: "62.7%", label: "Measured efficiency" },
      ],
      outcomes: ["Stepped down across the full input range", "Stable under motor and LED loads", "Mean 15.5 V in → 9.72 V out"],
      gallery: [{ type: "image", src: "media/buck.jpg", caption: "Hardware on the breadboard" }],
      links: [{ label: "View on GitHub", url: "https://github.com/Laveeza-Fatima/Buck-Converter-DC-DC-", primary: true }],
    },
    {
      slug: "engine-shaft",
      title: "Engine Shaft",
      category: "CAD",
      year: "3D print",
      role: "CAD & fabrication",
      client: "Solo project",
      stack: ["AutoCAD", "FDM 3D printing", "Slicer", "PLA/ABS"],
      image: "media/shaft-cp.jpg",
      summary: "A simple engine shaft modelled in AutoCAD and 3D-printed as a physical prototype.",
      overview: "An end-to-end CAD-to-part workflow: model, export, slice and print.",
      challenge: "Turn 2D sketches into accurate 3D parts that assemble and print cleanly.",
      solution: "Extrude and revolve operations in AutoCAD, exported to STL, sliced to G-code and printed on an FDM printer.",
      outcomes: ["Complete 3D assembly in AutoCAD", "CAD → STL → G-code pipeline", "Physical 3D-printed prototype"],
      gallery: [
        { type: "image", src: "media/shaft-cp.jpg", caption: "Assembled shaft" },
        { type: "image", src: "media/shaft-1.jpg", caption: "End ring" },
        { type: "image", src: "media/shaft-2.jpg", caption: "Rod" },
        { type: "image", src: "media/shaft-3.jpg", caption: "Bearing cap" },
      ],
      links: [{ label: "View on GitHub", url: "https://github.com/Laveeza-Fatima/Engine-shaft-3D-modelling-AutoCAD", primary: true }],
    },
    {
      slug: "fire-smoke-alarm",
      title: "Fire & Smoke Alarm",
      category: "Hardware",
      year: "EE-222",
      role: "Embedded design",
      client: "Team: L. Fatima, M. S. Zamir, M. I. Khan, A. Shafaat",
      stack: ["Arduino UNO", "MQ-2 sensor", "IR flame sensor", "I2C LCD", "Proteus"],
      summary: "Dual-sensor fire and smoke detection with an instant buzzer alarm, built for under PKR 3,000.",
      overview: "Real-time monitoring with an MQ-2 gas/smoke sensor and an IR flame sensor on an ATmega328P.",
      challenge: "Detect fire or dangerous smoke instantly and reliably, on a tight budget.",
      solution: "Analog smoke readings through the ADC plus a digital flame signal, compared against thresholds. The buzzer fires immediately and an LCD shows live status.",
      outcomes: ["Real-time dual-sensor detection", "Minimal-latency alarm", "Low-cost build under PKR 3,000"],
      colors: ["#ff5a1f", "#ffb347"],
      pattern: "waves",
      links: [{ label: "View on GitHub", url: "https://github.com/Laveeza-Fatima/Fire-and-Smoke-detection-alarm-system", primary: true }],
    },
    {
      slug: "password-circuit",
      title: "4-Digit Lock",
      category: "Hardware",
      year: "Logic",
      role: "Digital logic design",
      client: "Team: L. Fatima, B. A. Tayyab, R. Irum",
      stack: ["74LS74", "74LS85", "CD4555", "Proteus"],
      summary: "A 4-digit password lock built purely from logic ICs. No microcontroller.",
      overview: "D flip-flops store each digit, a demultiplexer enforces sequential entry, and a comparator verifies the code.",
      challenge: "Build secure, sequential password entry with discrete logic alone.",
      solution: "A CD4555 demux activates one stage at a time, 74LS74 flip-flops latch the input, and a 74LS85 comparator checks it. OR logic drives the buzzer.",
      outcomes: ["Fully verified in Proteus", "Purely hardware, no code", "Modular design that expands to more digits"],
      colors: ["#3d8bff", "#9fd3ff"],
      pattern: "grid",
      links: [{ label: "View on GitHub", url: "https://github.com/Laveeza-Fatima/4-digit-password-protected-circuit", primary: true }],
    },
    {
      slug: "neuroflip",
      title: "NeuroFlip",
      category: "AI & Software",
      year: "C++ / Qt",
      role: "Game development",
      client: "Team: L. Fatima, R. Irum",
      stack: ["C++", "Qt Widgets", "QPropertyAnimation", "QTimer"],
      summary: "A memory card-matching game with animated flips and three difficulty levels.",
      overview: "Match hidden pairs on 4×4, 6×6 or 8×8 grids to train short-term memory.",
      challenge: "Smooth animation and clean game-state handling in a desktop GUI.",
      solution: "Qt Widgets with QPropertyAnimation for card flips, QTimer for reveal timing, a live tries counter and a scoreboard.",
      outcomes: ["3 difficulty levels", "Animated flips & fade transitions", "Real-time tries counter and scoreboard"],
      colors: ["#7b5cff", "#ff4d8d"],
      pattern: "rings",
      links: [{ label: "View on GitHub", url: "https://github.com/Laveeza-Fatima/NeuroFlip-MemoryGame-C-", primary: true }],
    },
  ],

  services: [
    {
      title: "AI Agents & Automation",
      text: "Custom AI agents and automation systems for any business process: customer support, lead handling, sales follow-ups, data entry, reporting and bookings, connected to the tools a team already uses.",
      tags: ["n8n", "LLM APIs (Gemini, OpenAI)", "AI tool-calling", "Webhooks & REST APIs", "Supabase", "Google Workspace", "Chat & WhatsApp integrations", "Prompt engineering"],
    },
    {
      title: "Shopify App Development",
      text: "Public Shopify apps with checkout Functions, webhooks and embedded admin screens that look native.",
      tags: ["Remix", "Shopify Functions", "Polaris", "Supabase", "Webhooks"],
    },
    {
      title: "Hardware & Digital IC",
      text: "Digital design verification, sensor systems, microcontroller firmware and power electronics, from simulation to working hardware.",
      tags: ["SystemVerilog", "UVM", "Cadence Xcelium", "Arduino", "Embedded C", "Proteus"],
    },
    {
      title: "Software & CAD",
      text: "Desktop apps in C++/Qt and mechanical parts from AutoCAD model to 3D print.",
      tags: ["C++", "Qt", "AutoCAD", "3D printing"],
    },
  ],

  experience: [
    { period: "Aug 2026 — Now", role: "Co-Founder", company: "Verafo", note: "Pakistan's first e-commerce prediction engine: data-driven tools that predict buyer behaviour and cut COD returns." },
    { period: "Jun — Aug 2026", role: "Digital Verification Intern", company: "NUST Chip Design Centre", note: "Testbenches, functional verification, debugging and coverage analysis with SystemVerilog, UVM and Cadence Xcelium." },
    { period: "2026", role: "AI Automation Builder", company: "Freelance", note: "AI agents and automation systems for businesses, including an international client in Belgium." },
    { period: "2024 — 2028", role: "BS Electrical Engineering, 5th semester", company: "NUST SEECS", note: "Embedded systems, digital IC design and machine learning." },
  ],

  socials: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/laveeza-fatima-320a2031b/" },
    { label: "GitHub", url: "https://github.com/Laveeza-Fatima" },
    { label: "Verafo", url: "https://www.instagram.com/verafo.ai/" },
  ],
};
