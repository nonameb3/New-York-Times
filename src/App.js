import React from 'react';
import './App.css';

import Router from './Router';

function App() {
  return (
    <>
      <div className="main-header">
        <h1>New York Times</h1>
      </div>
      <div className="main-content">
        <Router />
      </div>
      <div className="main-footer">
        <p>© DVELOPER WARAPHON ROONNAPAI - 2020</p>
      </div>
    </>
  );
}

export default App;
