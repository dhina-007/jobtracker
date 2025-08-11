import React, { useEffect, useState } from 'react';
import API from '../api';
import { Link, useNavigate } from 'react-router-dom';

export default function ApplicationList() {
  const [applications, setApplications] = useState([]);
  const [q, setQ] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchApps();
  }, []);

  function fetchApps() {
    API.get('/applications')
      .then(res => setApplications(res.data))
      .catch(err => console.error(err));
  }

  function handleDelete(id) {
    if (!confirm('Delete this application?')) return;
    API.delete(`/applications/${id}`)
      .then(() => fetchApps())
      .catch(err => alert('Delete failed: ' + err));
  }

  const filtered = applications.filter(a =>
    a.companyName.toLowerCase().includes(q.toLowerCase()) ||
    a.jobTitle.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Applications</h2>
        <div>
          <Link to="/applications/new" className="btn btn-primary">Add Application</Link>
        </div>
      </div>

      <div className="mb-3">
        <input className="form-control" placeholder="Search by company or role..." value={q}
               onChange={e => setQ(e.target.value)} />
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Company</th>
            <th>Role</th>
            <th>Date Applied</th>
            <th>Status</th>
            <th style={{width:180}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 && <tr><td colSpan="5">No applications found.</td></tr>}
          {filtered.map(app => (
            <tr key={app.id}>
              <td>{app.companyName}</td>
              <td>{app.jobTitle}</td>
              <td>{app.dateApplied || '-'}</td>
              <td>{app.status || '-'}</td>
              <td className="table-actions">
                <Link className="btn btn-sm btn-info" to={`/applications/${app.id}`}>View</Link>
                <Link className="btn btn-sm btn-warning" to={`/applications/edit/${app.id}`}>Edit</Link>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(app.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
