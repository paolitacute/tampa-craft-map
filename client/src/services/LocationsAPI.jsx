const BASE_URL = 'http://localhost:3001/api/locations';

const getAllLocations = async () => {
  const response = await fetch(BASE_URL);
  return response.json();
};

const getLocationById = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`);
  return response.json();
};

export default { getAllLocations, getLocationById };