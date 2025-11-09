import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import EquipmentManagement from './components/EquipmentManagement';
import BorrowingRequests from './components/BorrowingRequests';
import './global.css';

function AppContent() {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      {/* Navigation */}
      <header style={{
        padding: '10px 20px',
        backgroundColor: '#282c34',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Link to="/" style={{ color: '#61dafb', textDecoration: 'none', fontWeight: 'bold' }}>Home</Link>

          {user && (
            <>
              <Link to="/dashboard" style={{ color: '#61dafb', textDecoration: 'none' }}>Dashboard</Link>
              {user.role === 'admin' && (
                <Link to="/equipment" style={{ color: '#61dafb', textDecoration: 'none' }}>Equipment Management</Link>
              )}
              <Link to="/requests" style={{ color: '#61dafb', textDecoration: 'none' }}>Borrowing Requests</Link>
            </>
          )}
        </div>

        <div>
          {!user ? (
            <>
              <Link to="/login" style={{ color: '#61dafb', textDecoration: 'none', marginRight: '10px' }}>Login</Link>
              <Link to="/signup" style={{ color: '#61dafb', textDecoration: 'none' }}>Signup</Link>
            </>
          ) : (
            <button
              onClick={logout}
              style={{
                padding: '5px 12px',
                cursor: 'pointer',
                backgroundColor: '#61dafb',
                color: '#282c34',
                border: 'none',
                borderRadius: '4px'
              }}
            >
              Logout
            </button>
          )}
        </div>
      </header>

      {/* Main content */}
      <main style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<h1>Welcome to the School Equipment Lending Portal</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute roles={['student','staff','admin']}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/equipment"
            element={
              <ProtectedRoute roles={['admin']}>
                <EquipmentManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/requests"
            element={
              <ProtectedRoute roles={['student','staff','admin']}>
                <BorrowingRequests />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
