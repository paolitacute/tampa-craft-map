import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import LocationsAPI from '../services/LocationsAPI';
import EventsAPI from '../services/EventsAPI';

const LocationDetail = () => {
  const { id } = useParams(); // Gets the unique ID from the URL
  const [location, setLocation] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const locationData = await LocationsAPI.getLocationById(id);
      const eventsData = await EventsAPI.getEventsByLocation(id);
      setLocation(locationData);
      setEvents(eventsData);
    };
    fetchData();
  }, [id]);

  if (!location) return <h2>Loading...</h2>;

  return (
    <div>
      <Link to="/">← Back to Map</Link>
      <h2>{location.title}</h2>
      <p>{location.address}</p>
      <p>{location.description}</p>

      <h3>Upcoming Events</h3>
      {events.length > 0 ? (
        <ul>
          {events.map(event => (
            <li key={event.id}>
              <strong>{event.title}</strong> - {new Date(event.date).toLocaleString()}
              <p>{event.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No events scheduled here yet.</p>
      )}
    </div>
  );
};

export default LocationDetail;