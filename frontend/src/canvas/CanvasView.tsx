import { useRef, useState, useCallback } from "react";
import { useCanvasStore } from "../store/useCanvasStore";
import NodeRenderer from "./NodeRenderer";
import EdgeRenderer from "./EdgeRenderer";

export default function CanvasView() {
  const { graph, viewport, setViewport, selectNode } = useCanvasStore();
  const svgRef = useRef<SVGSVGElement>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      const scaleFactor = e.deltaY > 0 ? 0.92 : 1.08;
      const newZoom = Math.min(Math.max(viewport.zoom * scaleFactor, 0.15), 4);

      // Zoom toward cursor
      const rect = svgRef.current?.getBoundingClientRect();
      if (rect) {
        const cx = e.clientX - rect.left;
        const cy = e.clientY - rect.top;
        const worldX = (cx - viewport.x) / viewport.zoom;
        const worldY = (cy - viewport.y) / viewport.zoom;
        const newX = cx - worldX * newZoom;
        const newY = cy - worldY * newZoom;
        setViewport({ x: newX, y: newY, zoom: newZoom });
      } else {
        setViewport({ ...viewport, zoom: newZoom });
      }
    },
    [viewport, setViewport]
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === svgRef.current || (e.target as SVGElement).tagName === "rect" && (e.target as SVGElement).getAttribute("data-bg") === "true") {
      selectNode(null);
    }
    if (e.button === 0) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - viewport.x, y: e.clientY - viewport.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setViewport({
        ...viewport,
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  return (
    <svg
      ref={svgRef}
      className="canvas-svg"
      style={{
        width: "100%",
        height: "100%",
        cursor: isPanning ? "grabbing" : "grab",
      }}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Background */}
      <rect
        data-bg="true"
        width="100%"
        height="100%"
        fill="transparent"
      />

      <g transform={`translate(${viewport.x}, ${viewport.y}) scale(${viewport.zoom})`}>
        {/* Grid dots */}
        <defs>
          <pattern
            id="grid-dots"
            width={40}
            height={40}
            patternUnits="userSpaceOnUse"
          >
            <circle cx={20} cy={20} r={1} fill="#d1d5db" opacity={0.5} />
          </pattern>
        </defs>
        <rect
          x={-5000}
          y={-5000}
          width={10000}
          height={10000}
          fill="url(#grid-dots)"
        />

        {/* Edges layer */}
        <g className="edges-layer">
          {graph.edges.map((edge) => (
            <EdgeRenderer key={edge.id} edge={edge} nodes={graph.nodes} />
          ))}
        </g>

        {/* Nodes layer */}
        <g className="nodes-layer">
          {graph.nodes.map((node) => (
            <NodeRenderer key={node.id} node={node} />
          ))}
        </g>
      </g>

      {/* Empty state */}
      {graph.nodes.length === 0 && (
        <g>
          <text
            x="50%"
            y="45%"
            textAnchor="middle"
            fontSize={20}
            fill="#9ca3af"
            fontFamily="system-ui, sans-serif"
          >
            Start by describing a diagram below
          </text>
          <text
            x="50%"
            y="52%"
            textAnchor="middle"
            fontSize={14}
            fill="#d1d5db"
            fontFamily="system-ui, sans-serif"
          >
            e.g. "Design a scalable chat application architecture"
          </text>
        </g>
      )}
    </svg>
  );
}
