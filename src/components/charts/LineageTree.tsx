"use client";

import React, { useMemo, useState, useRef, useEffect, useCallback } from "react";
import { type LineageNode } from "@/data/lineageData";

interface LineageTreeProps {
  data: LineageNode[];
  onNodeClick: (node: LineageNode) => void;
}

interface TreeLayoutNode extends LineageNode {
  x: number;
  y: number;
  depth: number;
  children: TreeLayoutNode[];
}

const NODE_W = 170;
const NODE_H = 52;
const H_GAP = 60;
const V_GAP = 14;

export default function LineageTree({ data, onNodeClick }: LineageTreeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewBox, setViewBox] = useState({ x: 0, y: 0, w: 1200, h: 650 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const lastTouchRef = useRef<{ x: number; y: number } | null>(null);
  const lastPinchDistRef = useRef<number | null>(null);

  const layout = useMemo(() => {
    const nodesById: Record<string, TreeLayoutNode> = {};
    data.forEach(n => {
      nodesById[n.id] = { ...n, x: 0, y: 0, depth: 0, children: [] };
    });

    const roots: TreeLayoutNode[] = [];
    data.forEach(n => {
      if (n.parent && nodesById[n.parent]) {
        nodesById[n.parent].children.push(nodesById[n.id]);
      } else {
        roots.push(nodesById[n.id]);
      }
    });

    let currentY = 20;
    const MAX_ROWS = 25;

    function positionNodes(node: TreeLayoutNode, startX: number, depth: number): { minY: number, maxY: number } {
      node.depth = depth;
      node.x = startX;

      if (node.children.length === 0) {
        node.y = currentY;
        currentY += NODE_H + V_GAP;
        return { minY: node.y, maxY: node.y + NODE_H };
      }

      const leafChildren = node.children.filter(c => c.children.length === 0);
      const branchChildren = node.children.filter(c => c.children.length > 0);

      let minY = Infinity;
      let maxY = -Infinity;

      branchChildren.forEach(child => {
        const bounds = positionNodes(child, startX + NODE_W + H_GAP, depth + 1);
        minY = Math.min(minY, bounds.minY);
        maxY = Math.max(maxY, bounds.maxY);
      });

      if (leafChildren.length > 0) {
        const leafStartX = startX + NODE_W + H_GAP;
        let startY = currentY;
        
        leafChildren.forEach((child, index) => {
          const col = Math.floor(index / MAX_ROWS);
          const row = index % MAX_ROWS;
          
          child.depth = depth + 1;
          child.x = leafStartX + col * (NODE_W + H_GAP * 0.4); 
          child.y = startY + row * (NODE_H + V_GAP);
          
          minY = Math.min(minY, child.y);
          maxY = Math.max(maxY, child.y + NODE_H);
        });
        
        const numRows = Math.min(leafChildren.length, MAX_ROWS);
        currentY += numRows * (NODE_H + V_GAP) + V_GAP;
      }

      node.y = (minY + maxY) / 2 - NODE_H / 2;
      minY = Math.min(minY, node.y);
      maxY = Math.max(maxY, node.y + NODE_H);
      
      return { minY, maxY };
    }

    roots.forEach(root => positionNodes(root, 20, 0));

    return {
      nodes: Object.values(nodesById),
      links: data.filter(n => n.parent && nodesById[n.parent]).map(n => ({
        source: nodesById[n.parent!],
        target: nodesById[n.id],
        relationship: n.relationship
      }))
    };
  }, [data]);

  const resetZoom = useCallback(() => {
    if (layout.nodes.length > 0) {
      const minX = Math.min(...layout.nodes.map(n => n.x));
      const maxX = Math.max(...layout.nodes.map(n => n.x)) + NODE_W + 20;
      const minY = Math.min(...layout.nodes.map(n => n.y));
      const maxY = Math.max(...layout.nodes.map(n => n.y)) + NODE_H + 20;
      
      const treeW = (maxX - minX) + 60;
      const treeH = (maxY - minY) + 60;
      
      const zoomX = 1200 / treeW;
      const zoomY = 650 / treeH;
      const newZoom = Math.max(0.05, Math.min(4, Math.min(zoomX, zoomY)));
      
      const visW = 1200 / newZoom;
      const visH = 650 / newZoom;
      const treeCenterX = minX - 30 + treeW / 2;
      const treeCenterY = minY - 30 + treeH / 2;
      
      setZoom(newZoom);
      setViewBox({ x: treeCenterX - visW / 2, y: treeCenterY - visH / 2, w: 1200, h: 650 });
    }
  }, [layout]);

  const focusOnRoots = useCallback(() => {
    if (layout.nodes.length > 0) {
      const roots = layout.nodes.filter(n => n.depth === 0);
      if (roots.length > 0) {
        const rootY = roots[0].y;
        const rootX = roots[0].x;
        
        setZoom(1);
        setViewBox({
          x: rootX - 60,
          y: rootY - 300,
          w: 1200,
          h: 650
        });
      } else {
        resetZoom();
      }
    }
  }, [layout, resetZoom]);

  const applyZoom = useCallback((factor: number) => {
    setZoom(z => {
      const newZoom = Math.max(0.05, Math.min(4, z * factor));
      if (newZoom === z) return z;
      
      const currentVisW = 1200 / z;
      const currentVisH = 650 / z;
      const newVisW = 1200 / newZoom;
      const newVisH = 650 / newZoom;
      
      setViewBox(vb => ({
        ...vb,
        x: vb.x + (currentVisW - newVisW) / 2,
        y: vb.y + (currentVisH - newVisH) / 2,
        w: 1200,
        h: 650
      }));
      
      return newZoom;
    });
  }, []);

  const zoomIn = () => applyZoom(1.3);
  const zoomOut = () => applyZoom(1 / 1.3);

  const handleWheel = (e: React.WheelEvent) => {
    applyZoom(e.deltaY > 0 ? 0.9 : 1.1);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const ratioX = (1200 / zoom) / rect.width;
    const ratioY = (650 / zoom) / rect.height;
    const ratio = Math.max(ratioX, ratioY);
    
    const dx = (e.clientX - dragStart.x) * ratio;
    const dy = (e.clientY - dragStart.y) * ratio;
    
    setViewBox(vb => ({ ...vb, x: vb.x - dx, y: vb.y - dy }));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => setIsDragging(false);

  // ── Touch Handlers (mobile panning + pinch-to-zoom) ──────────────
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      lastTouchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      lastPinchDistRef.current = null;
    } else if (e.touches.length === 2) {
      lastTouchRef.current = null;
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      lastPinchDistRef.current = Math.sqrt(dx * dx + dy * dy);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault(); // prevent page scroll
    if (!containerRef.current) return;

    if (e.touches.length === 1 && lastTouchRef.current) {
      const touch = e.touches[0];
      const rect = containerRef.current.getBoundingClientRect();
      const ratioX = (1200 / zoom) / rect.width;
      const ratioY = (650 / zoom) / rect.height;
      const ratio = Math.max(ratioX, ratioY);

      const dx = (touch.clientX - lastTouchRef.current.x) * ratio;
      const dy = (touch.clientY - lastTouchRef.current.y) * ratio;

      setViewBox(vb => ({ ...vb, x: vb.x - dx, y: vb.y - dy }));
      lastTouchRef.current = { x: touch.clientX, y: touch.clientY };
    } else if (e.touches.length === 2 && lastPinchDistRef.current !== null) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const factor = dist / lastPinchDistRef.current;
      applyZoom(factor);
      lastPinchDistRef.current = dist;
    }
  };

  const handleTouchEnd = () => {
    lastTouchRef.current = null;
    lastPinchDistRef.current = null;
  };

  useEffect(() => { focusOnRoots(); }, [focusOnRoots]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "650px",
        background: "var(--paper-warm)",
        borderRadius: "8px",
        border: "1px solid var(--border)",
        overflow: "hidden",
        cursor: isDragging ? "grabbing" : "grab",
        position: "relative",
        touchAction: "none" /* prevent browser scroll/zoom on touch */
      }}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Zoom Controls */}
      <div style={{ position: "absolute", top: "0.75rem", right: "0.75rem", display: "flex", flexDirection: "column", gap: "0.35rem", zIndex: 10 }}>
        <button onClick={zoomIn} style={ctrlBtn}>+</button>
        <button onClick={zoomOut} style={ctrlBtn}>−</button>
        <button onClick={resetZoom} style={{ ...ctrlBtn, fontSize: "9px", letterSpacing: "0.05em" }}>FIT</button>
      </div>

      <svg
        width="100%"
        height="100%"
        viewBox={`${viewBox.x} ${viewBox.y} ${1200 / zoom} ${650 / zoom}`}
        preserveAspectRatio="xMidYMid meet"
        style={{
          userSelect: "none"
        }}
      >
        {/* Links */}
        {layout.links.map((link, i) => {
          const s = link.source;
          const t = link.target;
          const exitX = s.x + NODE_W;
          const exitY = s.y + NODE_H / 2;
          const entryX = t.x;
          const entryY = t.y + NODE_H / 2;
          const midX = (exitX + entryX) / 2;

          return (
            <g key={`link-${i}`}>
              <path
                d={`M ${exitX} ${exitY} C ${midX} ${exitY}, ${midX} ${entryY}, ${entryX} ${entryY}`}
                fill="none"
                stroke={link.relationship === 'Asset Acquisition' ? "var(--slate-light)" : "var(--border)"}
                strokeWidth="1.5"
                opacity={link.target.children.length === 0 ? "0.35" : "1"}
                strokeDasharray={link.relationship === 'Asset Acquisition' ? "4 3" : "0"}
              />
            </g>
          );
        })}

        {/* Nodes */}
        {layout.nodes.map((node) => {
          const isUni = node.isUnicorn;
          const fill = isUni ? "var(--navy)" : "var(--white)";
          const stroke = isUni ? "var(--gold)" : "var(--border)";
          const textCol = isUni ? "#fff" : "var(--navy)";
          const subCol = isUni ? "rgba(255,255,255,0.6)" : "var(--slate-light)";

          return (
            <g
              key={node.id}
              transform={`translate(${node.x}, ${node.y})`}
              onClick={() => onNodeClick(node)}
              style={{ cursor: "pointer" }}
            >
              <rect
                width={NODE_W}
                height={NODE_H}
                rx="5"
                ry="5"
                fill={fill}
                stroke={stroke}
                strokeWidth={isUni ? "1.5" : "1"}
                style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.06))" }}
              />
              <text x="10" y="20" style={{ fontFamily: "'Inter',sans-serif", fontSize: "11px", fontWeight: 700, fill: textCol }}>
                {node.name.length > 22 ? node.name.substring(0, 20) + "…" : node.name}
              </text>
              <text x="10" y="35" style={{ fontFamily: "'Roboto Mono'", fontSize: "8.5px", fill: subCol }}>
                {node.year || "—"} · {node.type.toUpperCase()}
              </text>
              <text x="10" y="46" style={{ fontFamily: "'Inter',sans-serif", fontSize: "7.5px", fill: subCol, opacity: 0.7 }}>
                {node.description ? (node.description.length > 30 ? node.description.substring(0, 28) + "…" : node.description) : ""}
              </text>
              {isUni && (
                <text x={NODE_W - 12} y="16" textAnchor="end" style={{ fontSize: "10px", fill: "var(--gold)" }}>★</text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div style={{
        position: "absolute", bottom: "0.6rem", right: "0.6rem",
        background: "rgba(255,255,255,0.95)", padding: "0.4rem 0.7rem",
        borderRadius: "5px", border: "1px solid var(--border)",
        display: "flex", gap: "1rem", fontSize: "0.65rem",
        fontFamily: "'Roboto Mono'", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", zIndex: 10
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
          <div style={{ width: "10px", height: "10px", background: "var(--navy)", border: "1px solid var(--gold)", borderRadius: "2px" }} />
          <span>Unicorn</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
          <div style={{ width: "10px", height: "10px", background: "var(--white)", border: "1px solid var(--border)", borderRadius: "2px" }} />
          <span>Entity</span>
        </div>
        <div className="hidden-mobile" style={{ color: "var(--slate-light)" }}>Drag to pan · Scroll to zoom</div>
        <div className="hidden-desktop" style={{ color: "var(--slate-light)" }}>Touch to pan · Pinch to zoom</div>
      </div>
    </div>
  );
}

const ctrlBtn: React.CSSProperties = {
  width: "28px", height: "28px",
  background: "var(--white)", border: "1px solid var(--border)", borderRadius: "5px",
  display: "flex", alignItems: "center", justifyContent: "center",
  cursor: "pointer", fontFamily: "'Roboto Mono'", fontSize: "16px", fontWeight: 700,
  color: "var(--navy)", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", transition: "all 0.1s"
};
