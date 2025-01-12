import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

const Table1 = ({ callType, territory }) => {
  const { data } = useContext(AppContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredCalls, setFilteredCalls] = useState([]);
  const itemsPerPage = 10;

  useEffect(() => {
    const userAccounts = data.accountsByTerritory?.[territory] || [];
    const calls = userAccounts.flatMap(account => data.callsByAccount[account.id] || []);
    const filtered = calls.filter(call => call.callType === callType);
    setFilteredCalls(filtered);
  }, [callType, territory, data]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCalls.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCalls.length / itemsPerPage);

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

  return (
    <div>
      <h2 className="text-sm font-semibold mb-4 mt-3 text-center">Phone Details</h2>
      <table className="min-w-full bg-white border border-gray-200 text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b text-center">Call ID</th>
            <th className="py-2 px-4 border-b text-center">Account Name</th>
            <th className="py-2 px-4 border-b text-center">Call Date</th>
            <th className="py-2 px-4 border-b text-center">Call Status</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(calls => {
            const account = data.accounts.find(acc => acc.id === calls.accountId);
            return (
              <tr key={calls.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b text-center">{calls.id}</td>
                <td className="py-2 px-4 border-b text-center">{account ? account.name : 'Unknown'}</td>
                <td className="py-2 px-4 border-b text-center">{calls.callDate}</td>
                <td className="py-2 px-4 border-b text-center">{calls.callStatus}</td>
              </tr>
            );
          })}
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

export default Table1;
