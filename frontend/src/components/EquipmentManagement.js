import React, { useEffect, useState, useContext } from 'react';
import API, { setAuthToken } from '../api/api';
import { AuthContext } from '../context/AuthContext';

export default function EquipmentManagement() {
  const { user } = useContext(AuthContext);
  const [equipment, setEquipment] = useState([]);
  const [form, setForm] = useState({ name: '', category: '', condition: '', quantity: 1 });

  useEffect(() => {
    if (user) setAuthToken(user.token);
    fetchEquipment();
  }, [user]);

  const fetchEquipment = async () => {
    const res = await API.get('/equipment');
    setEquipment(res.data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await API.post('/equipment', form);
    setForm({ name:'', category:'', condition:'', quantity:1 });
    fetchEquipment();
  };

  const handleDelete = async (id) => {
    await API.delete(`/equipment/${id}`);
    fetchEquipment();
  };

  return (
    <div>
      <h2>Equipment Management</h2>
      <form onSubmit={handleAdd} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
        <input placeholder="Category" value={form.category} onChange={e=>setForm({...form, category:e.target.value})} />
        <input placeholder="Condition" value={form.condition} onChange={e=>setForm({...form, condition:e.target.value})} />
        <input type="number" placeholder="Qty" value={form.quantity} onChange={e=>setForm({...form, quantity:e.target.value})} />
        <button type="submit" style={{ cursor:'pointer' }}>Add</button>
      </form>
      <ul>
        {equipment.map(e => (
          <li key={e.id}>{e.name} - {e.category} - {e.quantity} - <button onClick={()=>handleDelete(e.id)}>Delete</button></li>
        ))}
      </ul>
    </div>
  );
}
