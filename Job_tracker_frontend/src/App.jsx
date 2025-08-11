import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ApplicationList from './pages/ApplicationList';
import ApplicationForm from './pages/ApplicationForm';
import ApplicationDetails from './pages/ApplicationDetails';

export default function App() {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">JobTracker</Link>
          <div className="d-flex">
            <Link to="/" className="btn btn-outline-primary me-2">Dashboard</Link>
            <Link to="/applications" className="btn btn-outline-secondary">Applications</Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/applications" element={<ApplicationList />} />
        <Route path="/applications/new" element={<ApplicationForm />} />
        <Route path="/applications/edit/:id" element={<ApplicationForm />} />
        <Route path="/applications/:id" element={<ApplicationDetails />} />
      </Routes>
    </div>
  );
}
