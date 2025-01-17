import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const { setSelectedUser, users } = useContext(AppContext);
  
   const handleUserChange = (e) => { // Added function to handle user change
    const selectedUserId = e.target.value;
    const selectedUser = users.find(user => user.userId === selectedUserId);
    setSelectedUser(selectedUser.userName); // Set the selected user's name
  };
  return (
    <nav className="bg-blue-600 p-4 text-white flex items-center shadow-md">
      <div className="text-lg font-semibold">Dashboard</div>
      <div className="flex w-full justify-center items-center">
        <label className="mr-2">Select User:</label>
        <select
          className="bg-white text-black p-2 rounded w-48"
          onChange={(e) => setSelectedUser(e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>Select User</option>
          {users.map(user => (
            <option key={user.userId} value={user.userId}>{user.userName}</option>
          ))}
        </select>
      </div>
    </nav>
  );
};

export default Navbar;
