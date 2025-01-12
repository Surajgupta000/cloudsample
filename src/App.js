// src/App.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Graph from './components/Graph';
import Table2 from './components/Table2';

const App = () => (
  <AppProvider>
    <div className="flex flex-col min-h-screen max-h-screen max-w-screen">
      <Navbar />
      <div className="flex-grow container mx-auto py-4 overflow-auto">
        <div className="flex flex-col gap-4 h-full">
          {/* Graph Row */}
          <div className="flex flex-row gap-4 py-4 h-full max-h-[65vh] shadow-md ">
            <div className="w-full h-fill">
              <Graph />
            </div>
          </div>

          {/* Table Row */}
          <div className="flex-grow p-4 bg-white shadow-md rounded overflow-auto h-fill">
            <Table2 />
          </div>
        </div>
      </div>
    </div>
  </AppProvider>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

export default App;
