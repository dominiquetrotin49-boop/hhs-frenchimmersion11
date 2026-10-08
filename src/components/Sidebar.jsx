import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Film, GraduationCap } from 'lucide-react';
import './Sidebar.css';

const units = [
  { id: 'reprise', name: '', title: 'Reprise', icon: BookOpen },
  { id: '1', name: 'Unité 1', title: 'Liberté de la presse', icon: BookOpen },
  { id: '2', name: 'Unité 2', title: 'L\'éducation', icon: BookOpen },
  { id: '3', name: 'Unité 3', title: 'La technologie', icon: BookOpen },
  { id: '4', name: 'Unité 4', title: 'Les arts et la culture', icon: BookOpen },
  { id: '5', name: 'Unité 5', title: 'Les droits des femmes', icon: BookOpen },
  { id: '6', name: 'Unité 6', title: 'Halte aux inégalités', icon: BookOpen },
  { id: 'film1', name: 'Film 1', title: 'Mini-unité Film', icon: Film },
  { id: 'film2', name: 'Film 2', title: 'Mini-unité Film', icon: Film },
];

export default function Sidebar() {
  const isVercel = (typeof window !== "undefined" && (
    window.location.hostname.includes("vercel") || 
    window.location.hostname.includes("vercel.app")
  )) || (typeof process !== "undefined" && process.env && (process.env.IS_VERCEL === "1" || process.env.VERCEL_URL));

  return (
    <aside className="sidebar glass-panel">
      <div className="sidebar-header">
        <NavLink to="/" className="logo-container" style={{ textDecoration: 'none', color: 'inherit' }}>
          <GraduationCap className="logo-icon" size={32} />
          <h1 className="logo-text">Français<br/><span className="text-gradient">Immersion 11</span></h1>
        </NavLink>
      </div>
      
      <nav className="sidebar-nav">
        <p className="nav-section-title">Ressources Générales</p>
        <ul className="nav-list" style={{ marginBottom: '1.2rem' }}>
          <li>
            <NavLink
              to="/roman"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              style={{ background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.15), rgba(245, 158, 11, 0.25))', border: '1px solid #f59e0b' }}
            >
              <BookOpen className="nav-icon" style={{ color: '#fbbf24' }} size={20} />
              <div className="nav-text">
                <span className="unit-name" style={{ color: '#fbbf24', fontWeight: 'bold' }}>Roman Interactif</span>
                <span className="unit-title" style={{ color: '#fcd34d' }}>Le Secret du Manuscrit</span>
              </div>
            </NavLink>
          </li>
        </ul>

        <p className="nav-section-title">Modules de cours</p>
        <ul className="nav-list">
          {units.map((unit) => {
            const Icon = unit.icon;
            const isLocked = isVercel && ['3', '4', '5', '6', 'film1', 'film2'].includes(unit.id);
            return (
              <li key={unit.id}>
                <NavLink 
                  to={`/unit/${unit.id}`} 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  <Icon className="nav-icon" size={20} />
                  <div className="nav-text">
                    {unit.name && <span className="unit-name">{unit.name}</span>}
                    {unit.title && (
                      <span className="unit-title">
                        {unit.title} {isLocked ? ' 🔒' : ''}
                      </span>
                    )}
                  </div>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
