export const NODE_WIDTH = 180;
export const NODE_HEIGHT = 72;

export interface GraphNode {
  id: string;
  type: "service" | "database" | "queue" | "cache" | "client" | "generic";
  label: string;
  x: number;
  y: number;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

export interface Graph {
  nodes: GraphNode[];
  edges: GraphEdge[];
}
