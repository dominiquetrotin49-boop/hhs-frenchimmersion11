import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import UnitDashboard from './pages/UnitDashboard';
import HomeDashboard from './pages/HomeDashboard';
import NovelReader from './components/NovelReader';
import Amnesique from './components/games/Amnesique';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeDashboard />} />
          <Route path="unit/:unitId" element={<UnitDashboard />} />
          <Route path="roman" element={<NovelReader />} />
          <Route path="reprise/amnesique" element={<Amnesique />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
