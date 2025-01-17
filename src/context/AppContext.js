import React, { createContext, useState, useMemo } from 'react';
import accounts from '../data/accounts.json';
import calls from '../data/calls.json';
import emails from '../data/emails.json';
import users from '../data/users.json';

const AppContext = createContext();

const useParsedData = () => {
  const parsedData = useMemo(() => {
    // Map users to their territory and name
    const usersById = users.reduce((acc, user) => {
      acc[user.userId] = { territory: user.territory, userName: user.userName };
      return acc;
    }, {});

    // Group accounts by territory
    const accountsByTerritory = accounts.reduce((acc, account) => {
      if (!acc[account.territory]) acc[account.territory] = [];
      acc[account.territory].push(account);
      return acc;
    }, {});

    // Link calls to accounts by accountId
    const callsByAccount = calls.reduce((acc, call) => {
      if (!acc[call.accountId]) acc[call.accountId] = [];
      acc[call.accountId].push(call);
      return acc;
    }, {});

    // Link emails to accounts by accountId
    const emailsByAccount = emails.reduce((acc, email) => {
      if (!acc[email.accountId]) acc[email.accountId] = [];
      acc[email.accountId].push(email);
      return acc;
    }, {});

    return { usersById, accountsByTerritory, callsByAccount, emailsByAccount, accounts };
  }, []);

  return parsedData;
};

const AppProvider = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCallType, setSelectedCallType] = useState(null);
  const data = useParsedData();

  // Resolve the territory and user name from selected user
  const resolvedUser = selectedUser ? data.usersById[selectedUser] : null;
  const resolvedTerritory = resolvedUser ? resolvedUser.territory : null;
  const resolvedUserName = resolvedUser ? resolvedUser.userName : null;

  const handleSetSelectedUser = (user) => {
    setSelectedUser(user);
    setSelectedCallType(null); // Reset selected call type when user changes
  };

  return (
    <AppContext.Provider value={{ selectedUser, setSelectedUser: handleSetSelectedUser, resolvedTerritory, resolvedUserName, data, selectedCallType, setSelectedCallType, users }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
