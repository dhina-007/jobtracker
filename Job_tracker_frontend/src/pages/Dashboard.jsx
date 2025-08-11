import React, { useEffect, useState } from 'react';
import API from '../api';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const [counts, setCounts] = useState([]);

  useEffect(() => {
    API.get('/applications/status-counts')
      .then(res => setCounts(res.data))
      .catch(err => console.error(err));
  }, []);

  const labels = counts.map(c => c.status);
  const data = counts.map(c => c.count);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Applications by status',
        data,
      }
    ],
  };

  return (
    <div>
      <h2>Dashboard</h2>
      {counts.length === 0 ? (
        <p>No data yet. Add some applications.</p>
      ) : (
        <div style={{ maxWidth: 500 }}>
          <Pie data={chartData} />
        </div>
      )}
      <div className="mt-4">
        <h5>Quick stats</h5>
        <ul>
          {counts.map(c => <li key={c.status}>{c.status}: {c.count}</li>)}
        </ul>
      </div>
    </div>
  );
}
