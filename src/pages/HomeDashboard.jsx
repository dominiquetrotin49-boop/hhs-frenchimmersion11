import React from 'react';
import { GraduationCap, Sparkles } from 'lucide-react';
import './HomeDashboard.css';

export default function HomeDashboard() {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header glass-panel">
        <div>
          <p className="unit-subtitle">Bienvenue !</p>
          <h2 className="unit-title text-gradient">Menu Principal</h2>
        </div>
      </header>

      <div className="dashboard-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
        <div className="glass-panel" style={{ padding: '4rem', maxWidth: '800px', borderRadius: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <div style={{ background: 'var(--primary-color)', padding: '1.5rem', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 25px rgba(255, 94, 98, 0.3)' }}>
              <GraduationCap size={64} />
            </div>
          </div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--text-color)' }}>
            Bienvenue sur <br />
            <span className="text-gradient">Pre-AP French Studies Honors</span>
          </h1>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8', opacity: 0.9, marginBottom: '2rem' }}>
            Bonjour à tous ! Ce site est votre plateforme d'apprentissage interactive. 
            Sélectionnez un <strong>module de cours</strong> dans le menu de gauche pour commencer à explorer les leçons de grammaire, 
            les exercices de vocabulaire, les pratiques d'écriture et nos simulations immersives.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--primary-color)', fontWeight: 'bold' }}>
            <Sparkles size={20} />
            <span>Prêt à apprendre ? Choisissez une unité pour commencer !</span>
            <Sparkles size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}
