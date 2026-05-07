from pydantic import BaseModel
from typing import List

class Node(BaseModel):
    id: str
    type: str
    label: str
    x: int
    y: int

class Edge(BaseModel):
    source: str
    target: str

class Graph(BaseModel):
    nodes: List[Node]
    edges: List[Edge]