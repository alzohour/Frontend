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
  selectedCityId: string | null;
  onSelectCity: (id: string | null) => void;
  whatsappUrl: string;
}

export default function CoverageMap({ cities, selectedCityId, onSelectCity, whatsappUrl }: CoverageMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Create bounds from all city locations so all pins are automatically in view
    const latLngs = cities.map((c) => L.latLng(c.lat, c.lng));
    const bounds = L.latLngBounds(latLngs);

    // Initialize Map with zoom that shows all pins
    const map = L.map(mapContainerRef.current, {
      scrollWheelZoom: false,
      zoomControl: true,
      attributionControl: false,
    });

    // Fit bounds with generous padding so every pin and label is fully visible
    map.fitBounds(bounds, {
      padding: [70, 70],
      maxZoom: 11,
    });

    // Clean modern light basemap tiles (CartoDB Voyager)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd',
    }).addTo(map);

    mapInstanceRef.current = map;

    // Custom teardrop SVG marker icon for each city
    cities.forEach((city) => {
      const isSelected = city.id === selectedCityId;

      const customIcon = L.divIcon({
        className: 'custom-leaflet-pin-wrapper',
        html: `
          <div class="leaflet-map-pin ${isSelected ? 'active' : ''}" id="pin-${city.id}">
            <div class="pin-radar-ring"></div>
            <div class="pin-marker-head">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <div class="pin-marker-label">${city.name}</div>
          </div>
        `,
        iconSize: [44, 54],
        iconAnchor: [22, 50],
      });

      const marker = L.marker([city.lat, city.lng], { icon: customIcon }).addTo(map);

      // Interactive popup showing neighborhoods & booking button
      const districtsHtml = city.districts
        .map((d) => `<span class="map-popup-chip">${d}</span>`)
        .join('');

      const popupContent = `
        <div class="map-popup-card">
          <div class="map-popup-header">
            <h4>${city.name}</h4>
            <span class="map-popup-badge">${city.badge}</span>
          </div>
          <p class="map-popup-sub">الأحياء المخدومة فوراً:</p>
          <div class="map-popup-chips">
            ${districtsHtml}
          </div>
          <a href="${whatsappUrl}?text=${encodeURIComponent(`السلام عليكم، أرغب في طلب خدمة تنظيف في ${city.name}`)}" 
             target="_blank" 
             rel="noreferrer" 
             class="map-popup-btn"
             style="color: #ffffff !important; text-decoration: none !important; background: #0f8a65 !important;">
            <span style="color: #ffffff !important; font-weight: 800;">احجز فريق العمل في ${city.name} عبر واتساب</span>
            <span style="color: #ffffff !important; font-weight: 800;">←</span>
          </a>
        </div>
      `;

      marker.bindPopup(popupContent, {
        closeButton: true,
        className: 'custom-leaflet-popup',
        maxWidth: 320,
      });

      marker.on('click', () => {
        onSelectCity(city.id);
      });

      markersRef.current[city.id] = marker;
    });

    const timer = setTimeout(() => {
      map.invalidateSize();
      map.fitBounds(bounds, { padding: [70, 70], maxZoom: 11 });
    }, 250);

    const handleResize = () => {
      map.invalidateSize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update selection and pan/open popup
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    if (!selectedCityId) {
      // If null/all, fit all bounds
      const latLngs = cities.map((c) => L.latLng(c.lat, c.lng));
      map.fitBounds(L.latLngBounds(latLngs), { padding: [70, 70], maxZoom: 11 });
      map.closePopup();
      return;
    }

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
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <div class="pin-marker-label">${city.name}</div>
          </div>
        `,
        iconSize: [44, 54],
        iconAnchor: [22, 50],
      });

      marker.setIcon(newIcon);

      if (isSelected) {
        map.setView([city.lat, city.lng], 12, { animate: true });
        marker.openPopup();
      }
    });
  }, [selectedCityId, cities]);

  return (
    <div className="leaflet-wide-map-wrapper">
      <div ref={mapContainerRef} className="leaflet-wide-map-canvas" />
    </div>
  );
}
