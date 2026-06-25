import { useCanvasStore } from "../store/useCanvasStore";
import type { GraphNode } from "../types/graph";

const NODE_COLORS: Record<GraphNode["type"], { bg: string; border: string; icon: string }> = {
  service: { bg: "#ede9fe", border: "#7c3aed", icon: "⚡" },
  database: { bg: "#dbeafe", border: "#2563eb", icon: "🗄" },
  queue: { bg: "#fef3c7", border: "#d97706", icon: "📨" },
  cache: { bg: "#d1fae5", border: "#059669", icon: "💾" },
  client: { bg: "#fce7f3", border: "#db2777", icon: "👤" },
  generic: { bg: "#f3f4f6", border: "#6b7280", icon: "📦" },
};

import { NODE_WIDTH, NODE_HEIGHT } from "../types/graph";

interface NodeRendererProps {
  node: GraphNode;
}

export default function NodeRenderer({ node }: NodeRendererProps) {
  const { selectedNodeId, selectNode, moveNode } = useCanvasStore();
  const isSelected = selectedNodeId === node.id;
  const colors = NODE_COLORS[node.type] || NODE_COLORS.generic;

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectNode(node.id);

    const startX = e.clientX;
    const startY = e.clientY;
    const startNodeX = node.x;
    const startNodeY = node.y;
    const viewport = useCanvasStore.getState().viewport;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const dx = (moveEvent.clientX - startX) / viewport.zoom;
      const dy = (moveEvent.clientY - startY) / viewport.zoom;
      moveNode(node.id, startNodeX + dx, startNodeY + dy);
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <g
      transform={`translate(${node.x}, ${node.y})`}
      onMouseDown={handleMouseDown}
      style={{ cursor: "grab" }}
    >
      {/* Shadow */}
      <rect
        x={3}
        y={3}
        width={NODE_WIDTH}
        height={NODE_HEIGHT}
        rx={12}
        fill="rgba(0,0,0,0.08)"
      />
      {/* Main body */}
      <rect
        width={NODE_WIDTH}
        height={NODE_HEIGHT}
        rx={12}
        fill={colors.bg}
        stroke={isSelected ? "#7c3aed" : colors.border}
        strokeWidth={isSelected ? 2.5 : 1.5}
      />
      {/* Left accent bar */}
      <rect
        x={0}
        y={0}
        width={5}
        height={NODE_HEIGHT}
        rx={3}
        fill={colors.border}
      />
      {/* Icon */}
      <text
        x={20}
        y={NODE_HEIGHT / 2 - 6}
        fontSize={20}
        dominantBaseline="middle"
      >
        {colors.icon}
      </text>
      {/* Label */}
      <text
        x={48}
        y={NODE_HEIGHT / 2 - 8}
        fontSize={14}
        fontWeight={600}
        fill="#1f2937"
        fontFamily="system-ui, sans-serif"
        dominantBaseline="middle"
      >
        {node.label}
      </text>
      {/* Type badge */}
      <text
        x={48}
        y={NODE_HEIGHT / 2 + 12}
        fontSize={11}
        fill="#6b7280"
        fontFamily="system-ui, sans-serif"
        dominantBaseline="middle"
      >
        {node.type}
      </text>
    </g>
  );
}
