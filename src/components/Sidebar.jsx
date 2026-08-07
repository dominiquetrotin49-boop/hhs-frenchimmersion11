import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Film, GraduationCap } from 'lucide-react';
import './Sidebar.css';

const units = [
  { id: '1', name: 'Unité 1', title: 'Liberté de la presse', icon: BookOpen },
  { id: '2', name: 'Unité 2', title: 'L\'éducation', icon: BookOpen },
  { id: '3', name: 'Unité 3', title: 'La technologie', icon: BookOpen },
  { id: '4', name: 'Unité 4', title: 'La pauvreté', icon: BookOpen },
  { id: '5', name: 'Unité 5', title: 'Les droits des femmes', icon: BookOpen },
  { id: '6', name: 'Unité 6', title: 'Halte aux inégalités', icon: BookOpen },
  { id: 'film1', name: 'Film 1', title: 'Mini-unité Film', icon: Film },
  { id: 'film2', name: 'Film 2', title: 'Mini-unité Film', icon: Film },
];

export default function Sidebar() {
  return (
    <aside className="sidebar glass-panel">
      <div className="sidebar-header">
        <NavLink to="/" className="logo-container" style={{ textDecoration: 'none', color: 'inherit' }}>
          <GraduationCap className="logo-icon" size={32} />
          <h1 className="logo-text">Français<br/><span className="text-gradient">Immersion</span></h1>
        </NavLink>
      </div>
      
      <nav className="sidebar-nav">
        <p className="nav-section-title">Modules de cours</p>
        <ul className="nav-list">
          {units.map((unit) => {
            const Icon = unit.icon;
            return (
              <li key={unit.id}>
                <NavLink 
                  to={`/unit/${unit.id}`} 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  <Icon className="nav-icon" size={20} />
                  <div className="nav-text">
                    <span className="unit-name">{unit.name}</span>
                    <span className="unit-title">{unit.title}</span>
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
