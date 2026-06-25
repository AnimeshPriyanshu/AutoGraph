import { create } from "zustand";
import type { Graph, GraphNode } from "../types/graph";

interface Viewport {
  x: number;
  y: number;
  zoom: number;
}

interface CanvasState {
  graph: Graph;
  viewport: Viewport;
  selectedNodeId: string | null;
  prompt: string;
  isLoading: boolean;

  setGraph: (graph: Graph) => void;
  addNode: (node: GraphNode) => void;
  moveNode: (id: string, x: number, y: number) => void;
  selectNode: (id: string | null) => void;
  setViewport: (viewport: Viewport) => void;
  setPrompt: (prompt: string) => void;
  setIsLoading: (loading: boolean) => void;
  clearGraph: () => void;
}

export const useCanvasStore = create<CanvasState>((set) => ({
  graph: { nodes: [], edges: [] },
  viewport: { x: 0, y: 0, zoom: 1 },
  selectedNodeId: null,
  prompt: "",
  isLoading: false,

  setGraph: (graph) => set({ graph }),
  addNode: (node) =>
    set((state) => ({
      graph: { ...state.graph, nodes: [...state.graph.nodes, node] },
    })),
  moveNode: (id, x, y) =>
    set((state) => ({
      graph: {
        ...state.graph,
        nodes: state.graph.nodes.map((n) =>
          n.id === id ? { ...n, x, y } : n
        ),
      },
    })),
  selectNode: (id) => set({ selectedNodeId: id }),
  setViewport: (viewport) => set({ viewport }),
  setPrompt: (prompt) => set({ prompt }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  clearGraph: () => set({ graph: { nodes: [], edges: [] } }),
}));
