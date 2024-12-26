'use client';

import { useEffect, useRef } from 'react';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

interface MapComponentProps {
  positions: any;
  zoom?: number;
  cls?: string;
}

export default function DynamicMap({
  positions,
  zoom = 13,
  cls,
}: MapComponentProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: 'https://i.ibb.co/nbs9xd1/delivery-truck.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    // Initialize map
    mapRef.current = L.map(mapContainerRef.current).setView(
      [19.076, 72.8777],
      zoom,
    );

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
    }).addTo(mapRef.current);

    // Add markers if positions exist
    if (positions) {
      const markers = positions.map((pos: any) =>
        L.marker([pos.latitude, pos.longitude])
          .bindPopup(pos?.name ?? '')
          .addTo(mapRef.current!),
      );

      // Fit bounds to show all markers
      if (markers.length > 0) {
        const group = L.featureGroup(markers);
        mapRef.current.fitBounds(group.getBounds(), {});
      }
    }

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [positions, zoom]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setZoom(zoom);
    }
  }, [zoom]);

  return (
    <div className={`h-full w-full ${cls || ''}`}>
      <div
        ref={mapContainerRef}
        className="h-full w-full rounded-[1px] bg-gray-100"
      />
    </div>
  );
}
