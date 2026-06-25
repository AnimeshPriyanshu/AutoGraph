from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional

router = APIRouter()


class GenerateRequest(BaseModel):
    prompt: Optional[str] = None


@router.post("/generate")
def generate(req: GenerateRequest):
    """Return a mock graph structure based on the prompt.
    In production this would call an LLM to generate the graph."""

    prompt_lower = (req.prompt or "").lower()

    # Simple keyword-based mock responses
    if any(w in prompt_lower for w in ["chat", "messaging", "message"]):
        nodes = [
            {"id": "1", "type": "client", "label": "Mobile Client", "x": 400, "y": 50},
            {"id": "2", "type": "client", "label": "Web Client", "x": 150, "y": 50},
            {"id": "3", "type": "service", "label": "API Gateway", "x": 300, "y": 200},
            {"id": "4", "type": "service", "label": "Chat Service", "x": 150, "y": 350},
            {"id": "5", "type": "service", "label": "Notification Service", "x": 450, "y": 350},
            {"id": "6", "type": "database", "label": "Message DB", "x": 50, "y": 500},
            {"id": "7", "type": "cache", "label": "Redis Cache", "x": 300, "y": 500},
            {"id": "8", "type": "queue", "label": "Message Queue", "x": 500, "y": 500},
        ]
        edges = [
            {"id": "e1", "source": "2", "target": "3", "label": "WebSocket"},
            {"id": "e2", "source": "1", "target": "3", "label": "WebSocket"},
            {"id": "e3", "source": "3", "target": "4", "label": "Route"},
            {"id": "e4", "source": "3", "target": "5", "label": "Events"},
            {"id": "e5", "source": "4", "target": "6", "label": "Persist"},
            {"id": "e6", "source": "4", "target": "7", "label": "Cache"},
            {"id": "e7", "source": "5", "target": "8", "label": "Publish"},
            {"id": "e8", "source": "8", "target": "4", "label": "Consume"},
        ]

    elif any(w in prompt_lower for w in ["netflix", "stream", "video", "media"]):
        nodes = [
            {"id": "1", "type": "client", "label": "User Device", "x": 300, "y": 50},
            {"id": "2", "type": "service", "label": "CDN Edge", "x": 300, "y": 200},
            {"id": "3", "type": "service", "label": "API Gateway", "x": 100, "y": 200},
            {"id": "4", "type": "service", "label": "Recommendation Engine", "x": 500, "y": 200},
            {"id": "5", "type": "service", "label": "Video Transcoder", "x": 100, "y": 380},
            {"id": "6", "type": "service", "label": "Content Service", "x": 300, "y": 380},
            {"id": "7", "type": "database", "label": "Content DB", "x": 500, "y": 380},
            {"id": "8", "type": "cache", "label": "Redis Cluster", "x": 200, "y": 530},
            {"id": "9", "type": "queue", "label": "Transcode Queue", "x": 420, "y": 530},
        ]
        edges = [
            {"id": "e1", "source": "1", "target": "2", "label": "Stream"},
            {"id": "e2", "source": "1", "target": "3", "label": "API Call"},
            {"id": "e3", "source": "3", "target": "4", "label": "Query"},
            {"id": "e4", "source": "3", "target": "6", "label": "Content"},
            {"id": "e5", "source": "5", "target": "2", "label": "Upload"},
            {"id": "e6", "source": "6", "target": "7", "label": "Store"},
            {"id": "e7", "source": "6", "target": "8", "label": "Cache"},
            {"id": "e8", "source": "9", "target": "5", "label": "Process"},
            {"id": "e9", "source": "6", "target": "9", "label": "Enqueue"},
        ]

    else:
        # Generic fallback graph
        nodes = [
            {"id": "1", "type": "client", "label": "Frontend App", "x": 300, "y": 50},
            {"id": "2", "type": "service", "label": "API Server", "x": 300, "y": 220},
            {"id": "3", "type": "service", "label": "Auth Service", "x": 100, "y": 220},
            {"id": "4", "type": "service", "label": "Business Logic", "x": 500, "y": 220},
            {"id": "5", "type": "database", "label": "PostgreSQL", "x": 400, "y": 400},
            {"id": "6", "type": "cache", "label": "Redis Cache", "x": 200, "y": 400},
            {"id": "7", "type": "queue", "label": "Task Queue", "x": 100, "y": 400},
        ]
        edges = [
            {"id": "e1", "source": "1", "target": "2", "label": "HTTP"},
            {"id": "e2", "source": "2", "target": "3", "label": "Verify"},
            {"id": "e3", "source": "2", "target": "4", "label": "Route"},
            {"id": "e4", "source": "4", "target": "5", "label": "Query"},
            {"id": "e5", "source": "4", "target": "6", "label": "Cache"},
            {"id": "e6", "source": "4", "target": "7", "label": "Background"},
        ]

    return {"nodes": nodes, "edges": edges}
