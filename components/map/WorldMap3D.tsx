"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import world from "world-atlas/countries-110m.json";
import { cn } from "@/lib/utils/cn";
import type { Country } from "@/lib/types";
import type { FeatureCollection, Geometry, GeoJsonProperties } from "geojson";
import type { GeometryCollection, Topology } from "topojson-specification";

// Only the countries we need to “unlock” for MVP coloring.
// These ids match ISO numeric codes used by world-atlas topojson.
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

function getStatus(
  countries: Country[],
  featureId: number
): Country["status"] {
  const iso2 = NUMERIC_TO_ISO2[featureId];
  if (!iso2) return "locked";
  return countries.find((c) => c.iso2 === iso2)?.status ?? "locked";
}

export function WorldMap3D({
  className,
  countries,
  onCountryClick,
}: {
  className?: string;
  countries: Country[];
  onCountryClick?: (iso2: string) => void;
}) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const geo = useMemo(() => {
    type WorldTopology = Topology<{
      countries: GeometryCollection<GeoJsonProperties>;
    }>;

    const topology = world as unknown as WorldTopology;

    const fc = feature(
      topology,
      topology.objects.countries
    ) as unknown as FeatureCollection<Geometry, GeoJsonProperties>;

    // Normalize ids (world-atlas uses numeric ids)
    const features = fc.features
      .filter((f) => Boolean(f.geometry) && f.id != null)
      .map((f) => ({ ...f, id: Number(f.id) }));

    return { features };
  }, []);

  const { path } = useMemo(() => {
    const projection = geoMercator().translate([500, 300]).scale(160);
    const path = geoPath(projection);
    return { path };
  }, []);

  return (
    <div className={cn("relative w-full", className)}>
      <svg
        viewBox="0 0 1000 600"
        className="w-full h-auto block"
        role="img"
        aria-label="World map"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
      >
        <defs>
          <filter id="atlas-softShadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000000" floodOpacity="0.55" />
          </filter>
          <filter id="atlas-depthShadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="6" dy="9" stdDeviation="5" floodColor="#000000" floodOpacity="0.55" />
          </filter>
          <linearGradient id="atlas-land" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="rgba(255,255,255,0.12)" />
            <stop offset="1" stopColor="rgba(255,255,255,0.06)" />
          </linearGradient>
          <linearGradient id="atlas-landTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgba(255,255,255,0.18)" />
            <stop offset="1" stopColor="rgba(255,255,255,0.08)" />
          </linearGradient>
        </defs>

        {/* Background vignette */}
        <rect
          x="0"
          y="0"
          width="1000"
          height="600"
          fill="transparent"
        />

        {/* Extruded “depth” layer */}
        <g transform="translate(10, 12)" opacity="0.95" filter="url(#atlas-depthShadow)">
          {geo.features.map((f) => {
            const id = f.id as number;
            const status = getStatus(countries, id);
            const visited = status === "visited";
            const wishlist = status === "wishlist";

            const fill = visited
              ? "var(--atlas-map-3d-visited-depth)"
              : wishlist
              ? "var(--atlas-map-3d-wishlist-depth)"
              : "var(--atlas-map-3d-locked-depth)";

            return (
              <path
                key={`depth-${id}`}
                d={path(f) ?? ""}
                fill={fill}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth={0.7}
                vectorEffect="non-scaling-stroke"
                strokeLinejoin="round"
              />
            );
          })}
        </g>

        {/* Top land layer */}
        <g filter="url(#atlas-softShadow)">
          {geo.features.map((f) => {
            const id = f.id as number;
            const status = getStatus(countries, id);
            const visited = status === "visited";
            const wishlist = status === "wishlist";
            const hovered = hoveredId === id;

            const iso2 = NUMERIC_TO_ISO2[id];

            const baseFill = "url(#atlas-landTop)";
            const fill = visited
              ? "var(--atlas-map-3d-visited-fill)"
              : wishlist
              ? "var(--atlas-map-3d-wishlist-fill)"
              : baseFill;

            const stroke = visited
              ? "rgba(62,231,163,0.70)"
              : wishlist
              ? "rgba(0,212,255,0.55)"
              : "rgba(255,255,255,0.10)";

            const strokeWidth = visited ? 1.2 : wishlist ? 1.1 : 0.7;

            return (
              <motion.path
                key={`top-${id}`}
                d={path(f) ?? ""}
                fill={fill}
                stroke={stroke}
                strokeWidth={strokeWidth}
                vectorEffect="non-scaling-stroke"
                strokeLinejoin="round"
                initial={false}
                animate={{
                  opacity: hovered ? 1 : 0.92,
                  filter: hovered
                    ? visited
                      ? "drop-shadow(0 0 12px rgba(62,231,163,0.40))"
                      : wishlist
                      ? "drop-shadow(0 0 12px rgba(0,212,255,0.30))"
                      : "drop-shadow(0 0 10px rgba(255,255,255,0.12))"
                    : "none",
                }}
                transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
                onMouseEnter={() => setHoveredId(id)}
                onMouseLeave={() => setHoveredId(null)}
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

      {/* subtle gloss */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl" />
    </div>
  );
}

