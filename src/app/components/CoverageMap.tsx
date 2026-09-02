'use client';

import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface CityCoverage {
  id: string;
  name: string;
  districts: string[];
  badge: string;
  lat: number;
  lng: number;
}

interface CoverageMapProps {
  cities: CityCoverage[];
  selectedCityId: string;
  onSelectCity: (id: string) => void;
}

export default function CoverageMap({ cities, selectedCityId, onSelectCity }: CoverageMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // already initialized

    // Center on Dammam / Khobar metro area
    const map = L.map(mapContainerRef.current, {
      center: [26.35, 50.12],
      zoom: 11,
      scrollWheelZoom: false,
      zoomControl: true,
      attributionControl: false,
    });

    // Clean, crisp Google Maps-style light tiles (CartoDB Voyager)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd',
    }).addTo(map);

    mapInstanceRef.current = map;

    // Add Custom Markers for each city
    cities.forEach((city) => {
      const isSelected = city.id === selectedCityId;
      
      const customIcon = L.divIcon({
        className: 'custom-leaflet-pin-wrapper',
        html: `
          <div class="leaflet-map-pin ${isSelected ? 'active' : ''}" id="pin-${city.id}">
            <div class="pin-radar-ring"></div>
            <div class="pin-marker-head">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <div class="pin-marker-label">${city.name}</div>
          </div>
        `,
        iconSize: [40, 50],
        iconAnchor: [20, 48],
      });

      const marker = L.marker([city.lat, city.lng], { icon: customIcon }).addTo(map);

      marker.on('click', () => {
        onSelectCity(city.id);
        map.setView([city.lat, city.lng], 12, { animate: true });
      });

      markersRef.current[city.id] = marker;
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update marker active styles and pan when selectedCityId changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    cities.forEach((city) => {
      const isSelected = city.id === selectedCityId;
      const marker = markersRef.current[city.id];
      if (!marker) return;

      const newIcon = L.divIcon({
        className: 'custom-leaflet-pin-wrapper',
        html: `
          <div class="leaflet-map-pin ${isSelected ? 'active' : ''}" id="pin-${city.id}">
            <div class="pin-radar-ring"></div>
            <div class="pin-marker-head">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <div class="pin-marker-label">${city.name}</div>
          </div>
        `,
        iconSize: [40, 50],
        iconAnchor: [20, 48],
      });

      marker.setIcon(newIcon);

      if (isSelected) {
        mapInstanceRef.current?.setView([city.lat, city.lng], 12, { animate: true });
      }
    });
  }, [selectedCityId, cities]);

  return (
    <div className="leaflet-map-wrapper">
      <div ref={mapContainerRef} className="leaflet-map-container" />
      
      {/* Overlay Badge in Corner */}
      <div className="map-stat-floating-card">
        <div className="map-stat-icon">📍</div>
        <div className="map-stat-text">
          <div className="map-stat-count">+15</div>
          <div className="map-stat-sub">منطقة وحي نخدمها في جميع أنحاء الشرقية</div>
        </div>
      </div>
    </div>
  );
}
