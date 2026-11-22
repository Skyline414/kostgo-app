import React, { createContext, useContext, useMemo, useState } from 'react';
import { FILTER_ALL, KOSTS } from '../data/kosts';
import { USERS } from '../data/users';

const AppContext = createContext(null);

export function useApp() {
  const value = useContext(AppContext);
  if (!value) throw new Error('useApp must be used inside AppProvider');
  return value;
}

export function AppProvider({ children }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState(FILTER_ALL);
  const [favorites, setFavorites] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [kosts, setKosts] = useState(KOSTS);
  const [users, setUsers] = useState(USERS);
  const [currentUser, setCurrentUser] = useState(null);

  const filteredKosts = useMemo(() => kosts.filter(item => {
    const query = search.trim().toLowerCase();
    return (item.name.toLowerCase().includes(query) || item.location.toLowerCase().includes(query))
      && (filter === FILTER_ALL || item.type === filter);
  }), [filter, search, kosts]);

  const toggleFavorite = id => setFavorites(previous => (
    previous.includes(id)
      ? previous.filter(item => item !== id)
      : [...previous, id]
  ));
  const addBooking = id => setBookings(previous => (
    previous.includes(id) ? previous : [...previous, id]
  ));

  const addKost = kost => setKosts(previous => {
    const nextId = previous.reduce((max, item) => Math.max(max, item.id), 0) + 1;
    return [...previous, { ...kost, id: nextId }];
  });
  const updateKost = (id, changes) => setKosts(previous => (
    previous.map(item => (item.id === id ? { ...item, ...changes } : item))
  ));
  // Kost yang dihapus juga dibersihkan dari favorit dan booking.
  const deleteKost = id => {
    setKosts(previous => previous.filter(item => item.id !== id));
    setFavorites(previous => previous.filter(item => item !== id));
    setBookings(previous => previous.filter(item => item !== id));
  };

  const addUser = user => setUsers(previous => [...previous, user]);
  const login = user => setCurrentUser(user);
  const logout = () => setCurrentUser(null);

  return (
    <AppContext.Provider value={{
      search, setSearch, filter, setFilter, favorites, bookings,
      kosts, filteredKosts, toggleFavorite, addBooking,
      addKost, updateKost, deleteKost,
      users, addUser, currentUser, login, logout,
    }}>
      {children}
    </AppContext.Provider>
  );
}
