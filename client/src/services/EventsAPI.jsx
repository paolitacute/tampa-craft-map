const BASE_URL = 'http://localhost:3001/api/events';

const getAllEvents = async () => {
  const response = await fetch(BASE_URL);
  return response.json();
};

const getEventsByLocation = async (locationId) => {
  const response = await fetch(`${BASE_URL}/location/${locationId}`);
  return response.json();
};

export default { getAllEvents, getEventsByLocation };