import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SuccessLogs from './SuccessLogs';
import ErrorLogs from './ErrorLogs';


const App = () => {
  return (
    <Router>
      <div>
        <h1 className='h1r'>MongoDB Message Logs</h1>
        <nav>
          <ul>
            
              <Link to="/successlogs"><button>Success Logs</button></Link><br></br>
            
            
              <Link to="/errorlogs"><button>Error Logs</button></Link>
            
          </ul>
        </nav>

        <Routes>
          <Route path="/successlogs" element={<SuccessLogs />} />
          <Route path="/errorlogs" element={<ErrorLogs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
