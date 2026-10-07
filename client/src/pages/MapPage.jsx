import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import LocationsAPI from '../services/LocationsAPI';

const MapPage = () => {
  const [locations, setLocations] = useState([]);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const navigate = useNavigate();

  // Load the API key from Vite's environment variables
  maptilersdk.config.apiKey = import.meta.env.VITE_MAPTILER_API_KEY;

  // 1. Fetch locations from your backend
  useEffect(() => {
    const fetchLocations = async () => {
      const data = await LocationsAPI.getAllLocations();
      setLocations(data);
    };
    fetchLocations();
  }, []);

  // 2. Initialize the Map
  useEffect(() => {
    if (map.current) return; // Prevent map from initializing multiple times

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [-82.4572, 27.9506], // Center on Tampa Bay: [longitude, latitude]
      zoom: 10
    });
  }, []);

  // 3. Add markers to the map once data is loaded
  useEffect(() => {
    if (!map.current || locations.length === 0) return;

    locations.forEach(location => {
      // Create a popup DOM element
      const popupNode = document.createElement('div');
      popupNode.innerHTML = `
        <h3 style="margin: 0 0 5px 0;">${location.title}</h3>
        <p style="margin: 0 0 10px 0; font-size: 12px;">${location.address}</p>
        <button id="btn-${location.id}" style="padding: 5px 10px; cursor: pointer; background: #007bff; color: white; border: none; border-radius: 4px;">
          View Events
        </button>
      `;

      const popup = new maptilersdk.Popup({ offset: 25 }).setDOMContent(popupNode);

      // Create the marker and add to map
      const marker = new maptilersdk.Marker({ color: "#FF0000" })
        .setLngLat([location.longitude, location.latitude])
        .setPopup(popup)
        .addTo(map.current);

      // Attach click event to the custom button inside the popup
      popup.on('open', () => {
        const btn = document.getElementById(`btn-${location.id}`);
        if (btn) {
          btn.addEventListener('click', () => {
            navigate(`/locations/${location.id}`);
          });
        }
      });
    });
  }, [locations, navigate]);

  return (
    <div>
      <header style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f8f9fa' }}>
        <h1 style={{ margin: 0 }}>Tampa Bay Crafting & Events Map</h1>
      </header>
      <div className="map-wrap" style={{ position: 'relative', width: '100%', height: '85vh' }}>
        <div ref={mapContainer} className="map" style={{ position: 'absolute', width: '100%', height: '100%' }} />
      </div>
    </div>
  );
};

export default MapPage;