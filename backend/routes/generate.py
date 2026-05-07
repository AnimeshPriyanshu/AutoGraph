from fastapi import APIRouter

router = APIRouter()

@router.post("/generate")
def generate():
    return {
        "nodes": [
            {
                "id": "1",
                "type": "service",
                "label": "API Server",
                "x": 300,
                "y": 200
            }
        ],
        "edges": []
    }