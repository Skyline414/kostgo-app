import React, { createContext, useContext, useMemo, useState } from 'react';
import { FILTER_ALL, KOSTS } from '../data/kosts';

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

  const filteredKosts = useMemo(() => KOSTS.filter(item => {
    const query = search.trim().toLowerCase();
    return (item.name.toLowerCase().includes(query) || item.location.toLowerCase().includes(query))
      && (filter === FILTER_ALL || item.type === filter);
  }), [filter, search]);

  const toggleFavorite = id => setFavorites(previous => (
    previous.includes(id)
      ? previous.filter(item => item !== id)
      : [...previous, id]
  ));
  const addBooking = id => setBookings(previous => (
    previous.includes(id) ? previous : [...previous, id]
  ));

  return (
    <AppContext.Provider value={{
      search, setSearch, filter, setFilter, favorites, bookings,
      filteredKosts, toggleFavorite, addBooking,
    }}>
      {children}
    </AppContext.Provider>
  );
}
