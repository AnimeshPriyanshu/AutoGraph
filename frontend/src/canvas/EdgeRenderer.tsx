import type { GraphEdge, GraphNode } from "../types/graph";
import { NODE_WIDTH, NODE_HEIGHT } from "../types/graph";

interface EdgeRendererProps {
  edge: GraphEdge;
  nodes: GraphNode[];
}

export default function EdgeRenderer({ edge, nodes }: EdgeRendererProps) {
  const source = nodes.find((n) => n.id === edge.source);
  const target = nodes.find((n) => n.id === edge.target);

  if (!source || !target) return null;

  const sx = source.x + NODE_WIDTH / 2;
  const sy = source.y + NODE_HEIGHT;
  const tx = target.x + NODE_WIDTH / 2;
  const ty = target.y;

  // Determine if we need a downward or upward connection
  const goingDown = ty >= sy;

  // Control points for a nice curved bezier
  const cp1y = goingDown ? sy + Math.abs(ty - sy) * 0.4 : sy - Math.abs(ty - sy) * 0.4;
  const cp2y = goingDown ? ty - Math.abs(ty - sy) * 0.4 : ty + Math.abs(ty - sy) * 0.4;

  const pathD = `M ${sx} ${sy} C ${sx} ${cp1y}, ${tx} ${cp2y}, ${tx} ${ty}`;

  return (
    <g>
      <defs>
        <marker
          id={`arrow-${edge.id}`}
          viewBox="0 0 10 7"
          refX="10"
          refY="3.5"
          markerWidth={8}
          markerHeight={6}
          orient="auto-start-reverse"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
        </marker>
      </defs>
      {/* Shadow path */}
      <path
        d={pathD}
        fill="none"
        stroke="rgba(0,0,0,0.06)"
        strokeWidth={4}
        strokeLinecap="round"
      />
      {/* Main path */}
      <path
        d={pathD}
        fill="none"
        stroke="#94a3b8"
        strokeWidth={2}
        strokeLinecap="round"
        markerEnd={`url(#arrow-${edge.id})`}
      />
      {/* Edge label */}
      {edge.label && (
        <text
          x={(sx + tx) / 2}
          y={(sy + ty) / 2 - 8}
          textAnchor="middle"
          fontSize={11}
          fill="#9ca3af"
          fontFamily="system-ui, sans-serif"
          style={{ pointerEvents: "none" }}
        >
          {edge.label}
        </text>
      )}
    </g>
  );
}
