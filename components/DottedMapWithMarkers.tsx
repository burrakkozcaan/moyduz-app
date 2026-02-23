"use client";

import React, { useMemo } from "react";
import DottedMap from "dotted-map";

const defaultMarkers = [
  { lat: 40.7128, lng: -74.006, size: 0.3 },
  { lat: 34.0522, lng: -118.2437, size: 0.3 },
  { lat: 51.5074, lng: -0.1278, size: 0.3 },
  { lat: -33.8688, lng: 151.2093, size: 0.3 },
  { lat: 48.8566, lng: 2.3522, size: 0.3 },
  { lat: 35.6762, lng: 139.6503, size: 0.3 },
  { lat: 55.7558, lng: 37.6176, size: 0.3 },
  { lat: 39.9042, lng: 116.4074, size: 0.3 },
  { lat: 28.6139, lng: 77.209, size: 0.3 },
  { lat: -23.5505, lng: -46.6333, size: 0.3 },
  { lat: 1.3521, lng: 103.8198, size: 0.3 },
  { lat: 25.2048, lng: 55.2708, size: 0.3 },
  { lat: 52.52, lng: 13.405, size: 0.3 },
  { lat: 19.4326, lng: -99.1332, size: 0.3 },
  { lat: -26.2041, lng: 28.0473, size: 0.3 },
];

type Marker = { lat: number; lng: number; size?: number };

export function DottedMapWithMarkers({
  markers = defaultMarkers,
  className,
  dotColor = "#94a3b880",
  dotRadius = 0.22,
  pinColor = "#f0502380",
}: {
  markers?: Marker[];
  className?: string;
  dotColor?: string;
  dotRadius?: number;
  pinColor?: string;
}) {
  const svgString = useMemo(() => {
    const map = new DottedMap({ height: 55, grid: "diagonal" });
    markers.forEach((m) =>
      map.addPin({
        lat: m.lat,
        lng: m.lng,
        svgOptions: { color: pinColor, radius: m.size ?? 0.3 },
      })
    );
    return map.getSVG({
      shape: "circle",
      color: dotColor,
      radius: dotRadius,
      backgroundColor: "rgba(247,247,247,1)",
    });
  }, [markers, dotColor, dotRadius, pinColor]);

  return (
    <div
      className={className}
      style={{ aspectRatio: "2 / 1" }}
      aria-hidden
    >
      <div
        className="h-full w-full [&_svg]:h-full [&_svg]:w-full [&_svg]:object-contain"
        dangerouslySetInnerHTML={{ __html: svgString }}
      />
    </div>
  );
}
