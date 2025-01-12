import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

const Table2 = () => {
  const { resolvedTerritory, data, resolvedUserName } = useContext(AppContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const itemsPerPage = 10;

  useEffect(() => {
    if (resolvedTerritory) {
      const userAccounts = data.accountsByTerritory?.[resolvedTerritory] || [];
      const accountsData = userAccounts.map(account => {
        const calls = data.callsByAccount[account.id] || [];
        const emails = data.emailsByAccount[account.id] || [];
        const latestCallDate = calls.length ? new Date(Math.max(...calls.map(call => new Date(call.callDate)))) : 'N/A';
        const latestEmailDate = emails.length ? new Date(Math.max(...emails.map(email => new Date(email.emailDate)))) : 'N/A';
        return {
          accountName: account.name,
          totalCalls: calls.length,
          totalEmails: emails.length,
          latestCallDate: latestCallDate !== 'N/A' ? latestCallDate.toLocaleDateString() : 'N/A',
          latestEmailDate: latestEmailDate !== 'N/A' ? latestEmailDate.toLocaleDateString() : 'N/A',
        };
      });
      setFilteredAccounts(accountsData);
    }
  }, [resolvedTerritory, data]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAccounts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (!resolvedTerritory) {
    return <p>Please select a user to see the territory account details.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Territory Account Details for {resolvedUserName}</h2>

      <table className="min-w-full bg-white border border-gray-200 text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b text-center">Account Name</th>
            <th className="py-2 px-4 border-b text-center">Total Calls</th>
            <th className="py-2 px-4 border-b text-center">Total Emails</th>
            <th className="py-2 px-4 border-b text-center">Latest Call Date</th>
            <th className="py-2 px-4 border-b text-center">Latest Email Date</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((account, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b text-center">{account.accountName}</td>
              <td className="py-2 px-4 border-b text-center">{account.totalCalls}</td>
              <td className="py-2 px-4 border-b text-center">{account.totalEmails}</td>
              <td className="py-2 px-4 border-b text-center">{account.latestCallDate}</td>
              <td className="py-2 px-4 border-b text-center">{account.latestEmailDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button onClick={handlePrevPage} disabled={currentPage === 1} className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50">
          Previous
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50">
          Next
        </button>
      </div>
    </div>
  );
};

export default Table2;
