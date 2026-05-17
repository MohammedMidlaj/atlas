"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import world from "world-atlas/countries-110m.json";
import type { FeatureCollection, Geometry, GeoJsonProperties } from "geojson";
import type { GeometryCollection, Topology } from "topojson-specification";
import { cn } from "@/lib/utils/cn";
import type { Country } from "@/lib/types";

// MVP mapping (world-atlas uses ISO numeric ids)
const ISO2_TO_NUMERIC: Record<string, number> = {
  IN: 356,
  AE: 784,
  GE: 268,
  JP: 392,
  IS: 352,
  PE: 604,
};
const NUMERIC_TO_ISO2: Record<number, string> = Object.fromEntries(
  Object.entries(ISO2_TO_NUMERIC).map(([k, v]) => [v, k])
);
function getStatus(countries: Country[], featureId: number): Country["status"] {
  const iso2 = NUMERIC_TO_ISO2[featureId];
  if (!iso2) return "locked";
  return countries.find((c) => c.iso2 === iso2)?.status ?? "locked";
}

export function WorldMap2D({
  className,
  countries,
  onCountryClick,
}: {
  className?: string;
  countries: Country[];
  onCountryClick?: (iso2: string) => void;
}) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [tooltip, setTooltip] = useState<{ name: string; x: number; y: number } | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [panStart, setPanStart] = useState<{ x: number; y: number } | null>(null);
  const [isZoomEnabled, setIsZoomEnabled] = useState(false);

  const geo = useMemo(() => {
    type WorldTopology = Topology<{
      countries: GeometryCollection<GeoJsonProperties>;
    }>;
    const topology = world as unknown as WorldTopology;
    const fc = feature(
      topology,
      topology.objects.countries
    ) as unknown as FeatureCollection<Geometry, GeoJsonProperties>;

    const features = fc.features
      .filter((f) => Boolean(f.geometry) && f.id != null)
      .map((f) => ({ ...f, id: Number(f.id) }));

    return { features };
  }, []);

  const { path } = useMemo(() => {
    // Slightly larger scale than before for readability
    const projection = geoMercator().translate([500, 300]).scale(175);
    const path = geoPath(projection);
    return { path };
  }, []);

  const minZoom = 1;
  const maxZoom = 4;

  function clampZoom(v: number) {
    return Math.max(minZoom, Math.min(maxZoom, v));
  }

  function zoomIn() {
    setZoom((z) => clampZoom(Number((z + 0.25).toFixed(2))));
  }

  function zoomOut() {
    setZoom((z) => clampZoom(Number((z - 0.25).toFixed(2))));
  }

  function resetView() {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }

  return (
    <div className={cn("relative w-full", className)}>
      <div className="absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-xl border border-atlas-border bg-atlas-surface2/95 p-1.5 backdrop-blur">
        <button
          onClick={zoomOut}
          disabled={zoom <= minZoom}
          className="h-8 w-8 rounded-lg border border-atlas-border text-atlas-text disabled:text-atlas-subtle disabled:opacity-40 hover:bg-atlas-surface transition"
          aria-label="Zoom out"
          title="Zoom out"
        >
          -
        </button>
        <button
          onClick={resetView}
          className="px-2.5 h-8 rounded-lg border border-atlas-border text-xs text-atlas-muted hover:text-atlas-text hover:bg-atlas-surface transition"
          aria-label="Reset map zoom"
          title="Reset view"
        >
          {Math.round(zoom * 100)}%
        </button>
        <button
          onClick={zoomIn}
          disabled={zoom >= maxZoom}
          className="h-8 w-8 rounded-lg border border-atlas-border text-atlas-text disabled:text-atlas-subtle disabled:opacity-40 hover:bg-atlas-surface transition"
          aria-label="Zoom in"
          title="Zoom in"
        >
          +
        </button>
      </div>

      <svg
        viewBox="0 0 1000 600"
        className="w-full h-auto block"
        role="img"
        aria-label="World map"
        shapeRendering="crispEdges"
        onClick={() => setIsZoomEnabled(true)}
        onWheel={(e) => {
          if (!isZoomEnabled) return;
          e.preventDefault();
          const delta = e.deltaY < 0 ? 0.15 : -0.15;
          setZoom((z) => clampZoom(Number((z + delta).toFixed(2))));
        }}
        onPointerDown={(e) => {
          if (zoom <= 1) return;
          setDragStart({ x: e.clientX, y: e.clientY });
          setPanStart({ ...pan });
        }}
        onPointerMove={(e) => {
          if (!dragStart || !panStart || zoom <= 1) return;
          const maxX = (1000 * (zoom - 1)) / 2;
          const maxY = (600 * (zoom - 1)) / 2;
          const nextX = panStart.x + (e.clientX - dragStart.x);
          const nextY = panStart.y + (e.clientY - dragStart.y);
          setPan({
            x: Math.max(-maxX, Math.min(maxX, nextX)),
            y: Math.max(-maxY, Math.min(maxY, nextY)),
          });
        }}
        onPointerUp={() => {
          setDragStart(null);
          setPanStart(null);
        }}
        onPointerLeave={() => {
          setDragStart(null);
          setPanStart(null);
          setTooltip(null);
          setIsZoomEnabled(false);
        }}
        style={{ touchAction: "none", cursor: zoom > 1 ? "grab" : "default" }}
      >
        <rect x="0" y="0" width="1000" height="600" fill="transparent" />

        <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`} transformOrigin="500 300">
          {geo.features.map((f) => {
            const id = f.id as number;
            const status = getStatus(countries, id);
            const visited = status === "visited";
            const wishlist = status === "wishlist";
            const iso2 = NUMERIC_TO_ISO2[id];
            const hovered = hoveredId === id;

            const fill = visited
              ? "var(--atlas-map-visited-fill)"
              : wishlist
              ? "var(--atlas-map-wishlist-fill)"
              : "var(--atlas-map-locked-fill)";

            const stroke = visited
              ? "var(--atlas-map-visited-stroke)"
              : wishlist
              ? "var(--atlas-map-wishlist-stroke)"
              : "var(--atlas-map-locked-stroke)";

            const strokeWidth = visited ? 1.25 : wishlist ? 1.15 : 0.85;

            return (
              <motion.path
                key={`2d-${id}`}
                d={path(f) ?? ""}
                fill={fill}
                stroke={stroke}
                strokeWidth={strokeWidth}
                vectorEffect="non-scaling-stroke"
                strokeLinejoin="round"
                initial={false}
                animate={{
                  opacity: hovered ? 1 : 0.95,
                }}
                transition={{ duration: 0.12, ease: [0.2, 0.8, 0.2, 1] }}
                onMouseEnter={(e) => {
                  setHoveredId(id);
                  const name = (f.properties as { name?: string })?.name;
                  if (!name) return;
                  const rect = e.currentTarget.ownerSVGElement?.getBoundingClientRect();
                  if (!rect) return;
                  setTooltip({
                    name,
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                  });
                }}
                onMouseMove={(e) => {
                  const name = (f.properties as { name?: string })?.name;
                  if (!name) return;
                  const rect = e.currentTarget.ownerSVGElement?.getBoundingClientRect();
                  if (!rect) return;
                  setTooltip({
                    name,
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                  });
                }}
                onMouseLeave={() => {
                  setHoveredId(null);
                  setTooltip(null);
                }}
                onClick={() => {
                  if (iso2 && onCountryClick) onCountryClick(iso2);
                }}
                style={{
                  cursor: iso2 ? "pointer" : "default",
                }}
              />
            );
          })}
        </g>
      </svg>
      {tooltip && (
        <div
          className="pointer-events-none absolute z-20 rounded-lg border border-atlas-border bg-atlas-surface2/95 px-2.5 py-1.5 text-xs text-atlas-text shadow-[0_8px_24px_rgba(0,0,0,0.45)] backdrop-blur"
          style={{ left: tooltip.x + 10, top: tooltip.y - 30 }}
        >
          {tooltip.name}
        </div>
      )}
    </div>
  );
}

