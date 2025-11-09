import React, { useContext, useEffect, useState } from 'react';
import API from '../api/api';
import { AuthContext } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [equipment, setEquipment] = useState([]);
  const [stats, setStats] = useState({ totalItems: 0, borrowedItems: 0 });

  useEffect(() => {
    if (!user) return; // if not logged in, don't fetch

    const fetchData = async () => {
      try {
        // Axios automatically sends token from API instance
        const eqRes = await API.get('/equipment');
        const statsRes = await API.get('/statistics');

        setEquipment(eqRes.data);
        setStats(statsRes.data);
      } catch (err) {
        console.error('Error fetching dashboard data:', err.response?.data || err.message);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div>
      <h2>Dashboard</h2>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '8px' }}>Total Items: {stats.totalItems}</div>
        <div style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '8px' }}>Borrowed Items: {stats.borrowedItems}</div>
      </div>

      <h3>Equipment List</h3>
      <ul>
        {equipment.map(e => (
          <li key={e.id} style={{ marginBottom: '5px' }}>
            {e.name} - {e.category} - {e.availability ? 'Available' : 'Unavailable'}
          </li>
        ))}
      </ul>
    </div>
  );
}
