import React, { useEffect, useState } from 'react';
import API from '../api';
import { useNavigate, useParams } from 'react-router-dom';

const STATUS_OPTIONS = ['Applied','Interview','Offer','Rejected'];

export default function ApplicationForm() {
  const [form, setForm] = useState({
    companyName: '',
    jobTitle: '',
    dateApplied: '',
    jobLink: '',
    status: 'Applied',
    notes: ''
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      API.get(`/applications/${id}`)
        .then(res => {
          // convert date to yyyy-mm-dd if present
          const data = res.data;
          setForm({
            companyName: data.companyName || '',
            jobTitle: data.jobTitle || '',
            dateApplied: data.dateApplied || '',
            jobLink: data.jobLink || '',
            status: data.status || 'Applied',
            notes: data.notes || ''
          });
        })
        .catch(err => alert('Load failed: ' + err));
    }
  }, [id, isEdit]);

  function handleChange(e) {
    setForm({...form, [e.target.name]: e.target.value});
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isEdit) {
      API.put(`/applications/${id}`, form)
        .then(() => navigate('/applications'))
        .catch(err => alert('Update failed: ' + err));
    } else {
      API.post('/applications', form)
        .then(() => navigate('/applications'))
        .catch(err => alert('Create failed: ' + err));
    }
  }

  return (
    <div>
      <h2>{isEdit ? 'Edit' : 'Add'} Application</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Company Name</label>
          <input name="companyName" required className="form-control" value={form.companyName} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Job Title</label>
          <input name="jobTitle" required className="form-control" value={form.jobTitle} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Date Applied</label>
          <input name="dateApplied" type="date" className="form-control" value={form.dateApplied || ''} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Job Link</label>
          <input name="jobLink" className="form-control" value={form.jobLink} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select name="status" className="form-select" value={form.status} onChange={handleChange}>
            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Notes</label>
          <textarea name="notes" className="form-control" value={form.notes} onChange={handleChange} />
        </div>

        <button className="btn btn-primary" type="submit">Save</button>
        <button className="btn btn-secondary ms-2" type="button" onClick={() => navigate('/applications')}>Cancel</button>
      </form>
    </div>
  );
}
