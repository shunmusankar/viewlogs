import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SuccessLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/successlogs')
      .then(response => {
        setLogs(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) {
    console.error("Network Error:", error.message);
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Success Logs</h1>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>
            <pre><strong>Message:</strong></pre>
            <pre>{log.message}</pre>
            
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SuccessLogs;
