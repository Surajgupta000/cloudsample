import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const { setSelectedUser, users } = useContext(AppContext);

  return (
    <nav className="bg-blue-500 p-4 text-white flex flex-col items-center">
      <p>Select User</p>
      <select
        className="bg-white text-black p-2 rounded w-64"
        onChange={(e) => setSelectedUser(e.target.value)} // Use inline handler
        defaultValue=""
      >
        <option value="" disabled>Select User</option>
        {users.map(user => (
          <option key={user.userId} value={user.userId}>{user.userName}</option>
        ))}
      </select>
    </nav>
  );
};

export default Navbar;
