// src/App.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Graph from './components/Graph';
import Table1 from './components/Table1';
import Table2 from './components/Table2';

const App = () => (
  <AppProvider>
    <Navbar />
    <div className="p-4 space-y-4">
      <div className="flex">
        <div className="w-1/2">
          <Graph />
        </div>
        <div className="w-1/2">
          <Table1 />
        </div>
      </div>
      <Table2 />
    </div>
  </AppProvider>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

export default App;
