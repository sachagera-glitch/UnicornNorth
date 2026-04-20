"use client";

import { useState } from "react";

interface SankeyNode { id: string; label: string; x: number; color: string; }
interface SankeyLink { source: string; target: string; value: number; }

const NODES: SankeyNode[] = [
  { id: "canada", label: "Canada ($2.15T)", x: 0, color: "#00204E" },
  { id: "ontario", label: "Ontario", x: 1, color: "#003080" },
  { id: "quebec", label: "Québec", x: 1, color: "#003080" },
  { id: "bc", label: "British Columbia", x: 1, color: "#003080" },
  { id: "atlantic", label: "Atlantic", x: 1, color: "#003080" },
  { id: "prairies", label: "Prairies", x: 1, color: "#003080" },
  { id: "ottawa", label: "Ottawa-Gat.", x: 2, color: "#8B0000" },
  { id: "toronto", label: "Toronto", x: 2, color: "#8B0000" },
  { id: "kwc", label: "Kitchener", x: 2, color: "#8B0000" },
  { id: "montreal", label: "Montréal", x: 2, color: "#8B0000" },
  { id: "vancouver", label: "Vancouver", x: 2, color: "#8B0000" },
  { id: "calgary", label: "Calgary", x: 2, color: "#8B0000" },
  { id: "atlantic_cma", label: "Atlantic CMAs", x: 2, color: "#8B0000" },
  { id: "telecom", label: "Telecom", x: 3, color: "#C9A84C" },
  { id: "ecommerce", label: "E-commerce", x: 3, color: "#C9A84C" },
  { id: "software", label: "Software", x: 3, color: "#C9A84C" },
  { id: "ai", label: "AI/DeepTech", x: 3, color: "#C9A84C" },
  { id: "fintech", label: "Fintech", x: 3, color: "#C9A84C" },
  { id: "other_sector", label: "Other", x: 3, color: "#C9A84C" },
];

const LINKS: SankeyLink[] = [
  { source: "canada", target: "ontario", value: 45 },
  { source: "canada", target: "quebec", value: 20 },
  { source: "canada", target: "bc", value: 20 },
  { source: "canada", target: "atlantic", value: 8 },
  { source: "canada", target: "prairies", value: 7 },
  { source: "ontario", target: "ottawa", value: 22 },
  { source: "ontario", target: "toronto", value: 15 },
  { source: "ontario", target: "kwc", value: 8 },
  { source: "quebec", target: "montreal", value: 20 },
  { source: "bc", target: "vancouver", value: 20 },
  { source: "prairies", target: "calgary", value: 7 },
  { source: "atlantic", target: "atlantic_cma", value: 8 },
  { source: "ottawa", target: "telecom", value: 16 },
  { source: "ottawa", target: "ecommerce", value: 4 },
  { source: "ottawa", target: "software", value: 2 },
  { source: "toronto", target: "ai", value: 5 },
  { source: "toronto", target: "fintech", value: 4 },
  { source: "toronto", target: "other_sector", value: 6 },
  { source: "kwc", target: "telecom", value: 4 },
  { source: "kwc", target: "software", value: 4 },
  { source: "montreal", target: "ecommerce", value: 8 },
  { source: "montreal", target: "fintech", value: 6 },
  { source: "montreal", target: "other_sector", value: 6 },
  { source: "vancouver", target: "other_sector", value: 12 },
  { source: "vancouver", target: "ai", value: 8 },
  { source: "calgary", target: "fintech", value: 4 },
  { source: "calgary", target: "other_sector", value: 3 },
  { source: "atlantic_cma", target: "fintech", value: 4 },
  { source: "atlantic_cma", target: "other_sector", value: 4 },
];

export default function NarwhalFlow() {
  const [hoveredLink, setHoveredLink] = useState<number | null>(null);
  const W = 1050, H = 500, PAD = 100, NODE_W = 16;
  const levelX = [0,1,2,3].map(l => PAD + l * ((W - 2*PAD - NODE_W) / 3));

  const nodePositions: Record<string, {x:number;y:number;h:number}> = {};
  [0,1,2,3].forEach(l => {
    const nodesInLevel = NODES.filter(n => n.x === l);
    const availH = H - 2*PAD;
    const nodeH = Math.min(availH / nodesInLevel.length - 8, 50);
    const totalH = nodesInLevel.length * nodeH + (nodesInLevel.length - 1) * 8;
    const startY = PAD + (availH - totalH) / 2;
    nodesInLevel.forEach((node, i) => {
      nodePositions[node.id] = { x: levelX[l], y: startY + i*(nodeH+8), h: nodeH };
    });
  });

  const linkPaths = LINKS.map((link, i) => {
    const src = nodePositions[link.source], tgt = nodePositions[link.target];
    if (!src || !tgt) return null;
    const srcX = src.x + NODE_W, srcY = src.y + src.h/2;
    const tgtX = tgt.x, tgtY = tgt.y + tgt.h/2;
    const midX = (srcX + tgtX) / 2;
    return {
      path: `M${srcX},${srcY} C${midX},${srcY} ${midX},${tgtY} ${tgtX},${tgtY}`,
      thickness: Math.max(link.value * 0.4, 1.5), index: i,
    };
  });

  return (
    <section id="flow" className="section">
      <div className="section-header">
        <h2>The Narwhal Flow</h2>
        <div className="divider" />
        <p>Value distribution: National → Province → CMA → Sector.</p>
      </div>
      <div className="chart-container" style={{ overflowX: "auto" }}>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", minWidth: 600 }}>
          {linkPaths.map(lp => lp && (
            <path key={lp.index} d={lp.path} fill="none"
              stroke={hoveredLink === lp.index ? "var(--burgundy)" : "var(--slate-light)"}
              strokeWidth={lp.thickness}
              strokeOpacity={hoveredLink === lp.index ? 0.8 : 0.2}
              onMouseEnter={() => setHoveredLink(lp.index)}
              onMouseLeave={() => setHoveredLink(null)}
              style={{ cursor: "pointer", transition: "stroke-opacity 0.2s" }}
            />
          ))}
          {NODES.map(node => {
            const pos = nodePositions[node.id];
            return pos ? (
              <g key={node.id}>
                <rect x={pos.x} y={pos.y} width={NODE_W} height={pos.h} fill={node.color} rx={1} />
                <text x={node.x === 3 ? pos.x + NODE_W + 6 : pos.x - 6} y={pos.y + pos.h/2 + 1}
                  textAnchor={node.x === 3 ? "start" : "end"} dominantBaseline="middle"
                  style={{ fontFamily: "'Roboto Mono'", fontSize: 10, fill: "var(--navy)", fontWeight: 500 }}>
                  {node.label}
                </text>
              </g>
            ) : null;
          })}
        </svg>
      </div>
    </section>
  );
}
