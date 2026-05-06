# AutoGraph

> AI-native infinite whiteboard for intelligent diagram generation, collaborative system design, and architecture visualization.

![AutoGraph Banner](./assets/banner.png)

---

## 🚀 Overview

AutoGraph is an AI-assisted collaborative whiteboard that transforms natural language into interactive diagrams.

Users can:

* Generate system designs using AI
* Create flowcharts instantly
* Collaborate in real-time
* Edit diagrams interactively
* Export diagrams in multiple formats
* Build architecture visually using natural language

Unlike traditional whiteboards, AutoGraph focuses on:

* intelligent graph generation
* structured diagram understanding
* architecture-aware editing
* AI-assisted visual engineering

---

# ✨ Features

## 🧠 AI Diagram Generation

Generate diagrams from prompts.

Example:

```txt
Design a scalable chat application architecture
```

AutoGraph converts prompts into:

* nodes
* edges
* labels
* layouts
* connections

---

## 🎨 Infinite Canvas

* Zoom
* Pan
* Drag & Drop
* Resize
* Multi-selection
* Smooth rendering

---

## 🔗 Smart Connection Engine

* Auto-routing edges
* Intelligent spacing
* Collision avoidance
* Dynamic graph updates

---

## ⚡ Real-Time Collaboration

Multiple users can:

* edit simultaneously
* track cursors
* sync changes live
* collaborate on architectures

---

## 📊 Graph Layout Algorithms

Supports:

* DAG layouts
* force-directed graphs
* hierarchical layouts
* tree structures

---

## 🧩 AI Editing

Example:

```txt
Add Redis cache between API and database
```

AutoGraph intelligently updates existing diagrams.

---

## 📤 Export System

Export diagrams as:

* PNG
* SVG
* PDF
* Mermaid
* JSON

---

# 🏗️ System Architecture

```txt
┌────────────────────┐
│      Frontend      │
│ React + TypeScript │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│    Canvas Engine   │
│      tldraw        │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│    AI Processor    │
│ Gemini / OpenAI    │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ Structured JSON API│
│ FastAPI Backend    │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│Realtime Collaboration│
│ Yjs + WebSockets   │
└────────────────────┘
```

---

# 🛠️ Tech Stack

| Layer            | Technology         |
| ---------------- | ------------------ |
| Frontend         | React + TypeScript |
| Styling          | Tailwind CSS       |
| Canvas Engine    | tldraw             |
| Backend          | FastAPI            |
| AI Layer         | Gemini / OpenAI    |
| Realtime         | Yjs + WebSockets   |
| Database         | PostgreSQL         |
| State Management | Zustand            |
| Graph Layout     | dagre / elkjs      |
| Deployment       | Vercel + Railway   |

---

# 📂 Project Structure

```bash
autograph/
│
├── frontend/
│   ├── components/
│   ├── canvas/
│   ├── hooks/
│   ├── store/
│   └── pages/
│
├── backend/
│   ├── api/
│   ├── ai/
│   ├── models/
│   ├── services/
│   └── websocket/
│
├── shared/
│   ├── schemas/
│   └── types/
│
├── assets/
├── docs/
└── README.md
```

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/autograph.git
cd autograph
```

---

## 2️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 3️⃣ Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

---

# 🔑 Environment Variables

Create a `.env` file.

```env
OPENAI_API_KEY=your_key
DATABASE_URL=your_database_url
WEBSOCKET_URL=your_websocket_url
```

---

# 🧠 Example AI Response Format

```json
{
  "nodes": [
    {
      "id": "1",
      "type": "service",
      "label": "API Gateway",
      "x": 300,
      "y": 100
    }
  ],
  "edges": [
    {
      "source": "1",
      "target": "2"
    }
  ]
}
```

---

# 🎯 Roadmap

## Phase 1

* [x] Infinite canvas
* [x] Shape rendering
* [x] Basic AI generation

## Phase 2

* [ ] Real-time collaboration
* [ ] Smart graph layouts
* [ ] AI editing engine

## Phase 3

* [ ] Voice-to-diagram
* [ ] Plugin system
* [ ] Architecture templates
* [ ] AI-assisted wireframing

## Phase 4

* [ ] Multi-agent architecture generation
* [ ] Deployment optimization
* [ ] Public sharing links
* [ ] Version history

---

# 🔥 Future Ideas

* AI-generated UML diagrams
* Infrastructure simulation
* Live architecture validation
* Diagram-to-code generation
* GitHub repository visualization
* AI-assisted system design interviews

---

# 🧪 Example Prompts

```txt
Design a Netflix-like infrastructure
```

```txt
Generate a compiler pipeline flowchart
```

```txt
Create an authentication microservice architecture
```

```txt
Visualize a distributed caching system
```

---

# 🤝 Contributing

Contributions are welcome.

1. Fork repository
2. Create feature branch
3. Commit changes
4. Open pull request

---

# 📜 License

MIT License

---

# 🌟 Inspiration

Inspired by:

* Excalidraw
* tldraw
* Miro
* Figma
* modern AI-native developer tools

---

# 👨‍💻 Author

Built by Animesh.

---

# ⭐ Support

If you like the project:

* Star the repository
* Share feedback
* Open issues
* Contribute ideas

---

## 🚀 AutoGraph

> Turning ideas into intelligent diagrams.
