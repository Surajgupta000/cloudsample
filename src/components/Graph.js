import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Table1 from './Table1';

ChartJS.register(ArcElement, Tooltip, Legend);

const Graph = () => {
  const { resolvedTerritory, data } = useContext(AppContext);
  const [selectedCallType, setSelectedCallType] = useState(null);

  if (!resolvedTerritory) {
    return <p>Graph will be displayed here once a user is selected.</p>;
  }

  const userAccounts = data.accountsByTerritory?.[resolvedTerritory] || [];
  if (userAccounts.length === 0) {
    return <p>No accounts found for the selected user ({resolvedTerritory}).</p>;
  }

  const calls = userAccounts.flatMap((account) => data.callsByAccount[account.id] || []);
  if (calls.length === 0) {
    return <p>No call data available for the selected user's accounts.</p>;
  }

  const callTypeCounts = calls.reduce((acc, call) => {
    acc[call.callType] = (acc[call.callType] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(callTypeCounts),
    datasets: [
      {
        data: Object.values(callTypeCounts),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  const onPieClick = (event, chartElements) => {
    if (chartElements.length > 0) {
      const index = chartElements[0].index;
      const callType = chartData.labels[index];
      setSelectedCallType(callType);
      document.getElementById('Table1').scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-row">
      <h2>Graph for {resolvedTerritory}</h2>
      <Pie
        data={chartData}
        options={{
          onClick: (event, chartElements) => onPieClick(event, chartElements),
        }}
      />
      <div className="ml-4">
        {selectedCallType && (
          <div id="Table1">
            <Table1 callType={selectedCallType} territory={resolvedTerritory} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Graph;
