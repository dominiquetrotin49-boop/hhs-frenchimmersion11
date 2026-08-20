import React from 'react';
import { GraduationCap, Sparkles } from 'lucide-react';
import AvatarWelcome from '../components/AvatarWelcome';
import './HomeDashboard.css';

export default function HomeDashboard() {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header glass-panel">
        <div>
          <p className="unit-subtitle">Bienvenue !</p>
          <h2 className="unit-title text-gradient">La classe de français immersion 11</h2>
        </div>
      </header>

      <div className="dashboard-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
        <AvatarWelcome />

        <div className="glass-panel" style={{ padding: '3rem 4rem', maxWidth: '800px', borderRadius: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <div style={{ background: 'var(--primary-color)', padding: '1.2rem', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 25px rgba(255, 94, 98, 0.3)' }}>
              <GraduationCap size={48} />
            </div>
          </div>
          <h1 style={{ fontSize: '2.2rem', marginBottom: '1.2rem', color: 'var(--text-color)' }}>
            Bienvenue sur votre plateforme <br />
            <span className="text-gradient">Français Immersion 11</span>
          </h1>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', opacity: 0.9, marginBottom: '2rem' }}>
            Bonjour à tous ! Ce site est votre plateforme d'apprentissage interactive. 
            Sélectionnez un <strong>module de cours</strong> dans le menu de gauche pour commencer à explorer les leçons de grammaire, 
            les exercices de vocabulaire, les pratiques d'écriture et nos simulations immersives.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--primary-color)', fontWeight: 'bold', marginBottom: '2rem' }}>
            <Sparkles size={20} />
            <span>Prêt à apprendre ? Choisissez une unité ou lisez notre roman interactif !</span>
            <Sparkles size={20} />
          </div>

          <div 
            onClick={() => window.location.href = '/roman'}
            style={{ 
              background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(245, 158, 11, 0.3))', 
              border: '1px solid #f59e0b', 
              padding: '1.5rem', 
              borderRadius: '16px', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              textAlign: 'left',
              marginBottom: '1rem'
            }}
          >
            <div>
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#fbbf24', fontWeight: 'bold' }}>📖 NOUVEAUTÉ — Roman Électronique</span>
              <h3 style={{ margin: '0.2rem 0', color: '#f8fafc', fontSize: '1.2rem' }}>Le Secret du Manuscrit Francophone</h3>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#cbd5e1' }}>Suivez les aventures de Léa & Hugo à travers 6 chapitres audio interactifs avec fiches de vocabulaire et quiz !</p>
            </div>
            <button style={{ padding: '0.7rem 1.2rem', background: '#f59e0b', border: 'none', borderRadius: '10px', color: '#0f172a', fontWeight: 'bold', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              Lire le Roman →
            </button>
          </div>

          <div 
            onClick={() => window.location.href = '/unit/reprise'}
            style={{ 
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.3))', 
              border: '1px solid #3b82f6', 
              padding: '1.5rem', 
              borderRadius: '16px', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              textAlign: 'left'
            }}
          >
            <div>
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#60a5fa', fontWeight: 'bold' }}>🕵️ JEU DE REVISION — L'Amnésique en Ligne</span>
              <h3 style={{ margin: '0.2rem 0', color: '#f8fafc', fontSize: '1.2rem' }}>Aidez le voyageur !</h3>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#cbd5e1' }}>Posez-lui des questions pour l'aider à retrouver son objet et son souvenir perdus.</p>
            </div>
            <button style={{ padding: '0.7rem 1.2rem', background: '#3b82f6', border: 'none', borderRadius: '10px', color: '#fff', fontWeight: 'bold', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              Jouer →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

