import { useEffect, useRef } from "react";

interface StoreLocation {
  name: string;
  neighborhood: string;
  address: string;
  lat: number;
  lng: number;
}

export function StoreMap({ locations }: { locations: StoreLocation[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<unknown>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    let map: { remove: () => void } | null = null;
    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled) return;

      if (!document.querySelector('link[data-leaflet-css]')) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        link.setAttribute("data-leaflet-css", "true");
        document.head.appendChild(link);
      }

      map = L.map(containerRef.current!).setView([40.722, -73.980], 12);
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map as any);

      const pinSvg =
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36">` +
        `<path d="M12 0C5.37 0 0 5.37 0 12c0 9 12 24 12 24s12-15 12-24C24 5.37 18.63 0 12 0z" fill="#4a6741" filter="drop-shadow(0 2px 4px rgba(0,0,0,.35))"/>` +
        `<circle cx="12" cy="11" r="5" fill="white" fill-opacity="0.92"/>` +
        `</svg>`;

      const icon = L.divIcon({
        className: "",
        html: pinSvg,
        iconSize: [24, 36],
        iconAnchor: [12, 36],
        popupAnchor: [0, -38],
      });

      for (const loc of locations) {
        L.marker([loc.lat, loc.lng], { icon })
          .bindPopup(
            `<div style="font-family:'Inter',system-ui,sans-serif;min-width:150px;line-height:1.45;padding:2px 0">` +
            `<div style="font-weight:600;font-size:13px;color:#1a1a1a">${loc.name}</div>` +
            `<div style="font-size:11px;color:#4a6741;margin-top:2px;font-weight:500">${loc.neighborhood}</div>` +
            `<div style="font-size:11px;color:#777;margin-top:3px">${loc.address}</div>` +
            `</div>`,
            { maxWidth: 240, className: "stesh-popup" }
          )
          .addTo(map as any);
      }
    })();

    return () => {
      cancelled = true;
      if (map) {
        map.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return <div ref={containerRef} style={{ height: "100%", width: "100%" }} />;
}
