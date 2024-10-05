import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

function Dashboard() {
  const [gpus, setGpus] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/gpus')
      .then(response => setGpus(response.data))
      .catch(error => console.error('Error fetching GPUs:', error));
  }, []);

  return (
    <div className="dashboard">
      <h1>GPU Dashboard</h1>
      <div className="gpu-list">
        {gpus.map(gpu => (
          <div key={gpu.id} className={`gpu-item ${gpu.status.toLowerCase()}`}>
            <h3>{gpu.name}</h3>
            <p>Status: {gpu.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;