import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import UnitDashboard from './pages/UnitDashboard';
import HomeDashboard from './pages/HomeDashboard';
import NovelReader from './components/NovelReader';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeDashboard />} />
          <Route path="unit/:unitId" element={<UnitDashboard />} />
          <Route path="unit/:unitId/:section" element={<UnitDashboard />} />
          <Route path="roman" element={<NovelReader />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
