import React, { useEffect, useState } from 'react';
import API from '../api';
import { useParams, Link } from 'react-router-dom';

export default function ApplicationDetails() {
  const { id } = useParams();
  const [app, setApp] = useState(null);

  useEffect(() => {
    API.get(`/applications/${id}`)
      .then(res => setApp(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!app) return <div>Loading...</div>;

  return (
    <div>
      <h2>{app.companyName} — {app.jobTitle}</h2>

      <dl className="row">
        <dt className="col-sm-3">Date Applied</dt>
        <dd className="col-sm-9">{app.dateApplied || '-'}</dd>

        <dt className="col-sm-3">Status</dt>
        <dd className="col-sm-9">{app.status || '-'}</dd>

        <dt className="col-sm-3">Job Link</dt>
        <dd className="col-sm-9">
          {app.jobLink ? <a href={app.jobLink} target="_blank" rel="noreferrer">{app.jobLink}</a> : '-'}
        </dd>

        <dt className="col-sm-3">Notes</dt>
        <dd className="col-sm-9">{app.notes || '-'}</dd>
      </dl>

      <Link to={`/applications/edit/${app.id}`} className="btn btn-warning me-2">Edit</Link>
      <Link to="/applications" className="btn btn-secondary">Back</Link>
    </div>
  );
}
