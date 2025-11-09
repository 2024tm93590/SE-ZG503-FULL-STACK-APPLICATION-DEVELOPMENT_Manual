import React, { useEffect, useState, useContext } from 'react';
import API, { setAuthToken } from '../api/api';
import { AuthContext } from '../context/AuthContext';

export default function BorrowingRequests() {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [form, setForm] = useState({ equipmentId: '', purpose: '' });

  useEffect(() => {
    if (user) setAuthToken(user.token);
    fetchRequests();
  }, [user]);

  const fetchRequests = async () => {
    const res = await API.get('/requests');
    setRequests(res.data);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await API.post('/requests', {...form, userId: user.id});
    setForm({ equipmentId:'', purpose:'' });
    fetchRequests();
  };

  return (
    <div>
      <h2>Borrowing Requests</h2>
      {user.role === 'student' && (
        <form onSubmit={handleCreate} style={{ display:'flex', gap:'10px', marginBottom:'20px' }}>
          <input placeholder="Equipment ID" value={form.equipmentId} onChange={e=>setForm({...form,equipmentId:e.target.value})} />
          <input placeholder="Purpose" value={form.purpose} onChange={e=>setForm({...form,purpose:e.target.value})} />
          <button type="submit" style={{ cursor:'pointer' }}>Request</button>
        </form>
      )}
      <ul>
        {requests.map(r => (
          <li key={r.id}>{r.userId} requested {r.equipmentId} - Status: {r.status}</li>
        ))}
      </ul>
    </div>
  );
}
