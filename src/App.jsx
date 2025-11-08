import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import MealAnalyzer from './pages/MealAnalyzer';
import History from './pages/History';
import Favourites from './pages/Favourites';
import Achievements from './pages/Achievements';
import Account from './pages/Account';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/analyze" element={<MealAnalyzer />} />
        <Route path="/history" element={<History />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </Layout>
  );
}

export default App;
