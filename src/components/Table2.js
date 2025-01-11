import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

const Table2 = () => {
  const { resolvedTerritory, data } = useContext(AppContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredEmails, setFilteredEmails] = useState([]);
  const itemsPerPage = 10;

  useEffect(() => {
    if (resolvedTerritory) {
      const userAccounts = data.accountsByTerritory?.[resolvedTerritory] || [];
      const emails = userAccounts.flatMap(account => data.emailsByAccount[account.id] || []);
      setFilteredEmails(emails);
    }
  }, [resolvedTerritory, data]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEmails.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEmails.length / itemsPerPage);

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
      <h2>Territory Account Details for {resolvedTerritory}</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Email ID</th>
            <th className="py-2">Account ID</th>
            <th className="py-2">Email Date</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(email => (
            <tr key={email.id}>
              <td className="py-2">{email.id}</td>
              <td className="py-2">{email.accountId}</td>
              <td className="py-2">{email.emailDate}</td>
              <td className="py-2">{email.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button onClick={handlePrevPage} disabled={currentPage === 1} className="bg-blue-500 text-white px-4 py-2 rounded">
          Previous
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="bg-blue-500 text-white px-4 py-2 rounded">
          Next
        </button>
      </div>
    </div>
  );
};

export default Table2;
