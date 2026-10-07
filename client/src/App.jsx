import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MapPage from './pages/MapPage';
import LocationDetail from './pages/LocationDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MapPage />} />
          <Route path="/locations/:id" element={<LocationDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;