import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import './UnitAvatarSpeaker.css';

export default function UnitAvatarSpeaker({ avatar = 'lea', audioSrc = '/audio/unit1_intro_lea.mp3', name = 'Léa', speechFallbackText = '' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSpeaker, setActiveSpeaker] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      window.speechSynthesis.cancel();
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setActiveSpeaker(null);
      return;
    }

    setIsPlaying(true);
    if (avatar === 'duo' || avatar === 'both') {
      setActiveSpeaker('lea');
    }

    const audio = new Audio(audioSrc);
    audioRef.current = audio;

    audio.ontimeupdate = () => {
      if (avatar === 'duo' || avatar === 'both') {
        const cur = audio.currentTime;
        if (
          (cur >= 0 && cur < 5.4) ||
          (cur >= 12.5 && cur < 23.5) ||
          (cur >= 29.8)
        ) {
          setActiveSpeaker('lea');
        } else {
          setActiveSpeaker('hugo');
        }
      }
    };

    audio.onended = () => {
      setIsPlaying(false);
      setActiveSpeaker(null);
    };

    audio.onerror = () => {
      // SpeechSynthesis Fallback if audio file is not present
      if (speechFallbackText) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(speechFallbackText);
        utterance.lang = 'fr-FR';
        utterance.pitch = avatar === 'lea' ? 1.4 : 1.2;
        utterance.rate = 1.0;
        utterance.onend = () => { setIsPlaying(false); setActiveSpeaker(null); };
        utterance.onerror = () => { setIsPlaying(false); setActiveSpeaker(null); };
        window.speechSynthesis.speak(utterance);
      } else {
        setIsPlaying(false);
        setActiveSpeaker(null);
      }
    };

    audio.play().catch(() => {
      setIsPlaying(false);
      setActiveSpeaker(null);
    });
  };

  const isDuo = avatar === 'duo' || avatar === 'both';

  return (
    <div 
      className={`unit-avatar-speaker-card ${isPlaying ? 'speaking' : ''} ${isDuo ? 'duo-card' : ''}`} 
      onClick={togglePlay}
      title={`Cliquer pour écouter le message de ${name}`}
    >
      {isDuo ? (
        <div className="unit-avatar-duo-wrapper">
          <div className={`avatar-duo-item ${activeSpeaker === 'lea' ? 'speaking-item' : ''}`}>
            <img src="/avatars/lea.jpg" alt="Léa" className="unit-avatar-img" />
          </div>
          <div className={`avatar-duo-item ${activeSpeaker === 'hugo' ? 'speaking-item' : ''}`}>
            <img src="/avatars/hugo.jpg" alt="Hugo" className="unit-avatar-img" />
          </div>
          <div className="unit-avatar-play-overlay duo-overlay">
            {isPlaying ? <VolumeX size={22} className="play-icon" /> : <Volume2 size={22} className="play-icon" />}
          </div>
        </div>
      ) : (
        <div className="unit-avatar-wrapper">
          <img src={avatar === 'hugo' ? '/avatars/hugo.jpg' : '/avatars/lea.jpg'} alt={name} className="unit-avatar-img" />
          <div className="unit-avatar-play-overlay">
            {isPlaying ? <VolumeX size={22} className="play-icon" /> : <Volume2 size={22} className="play-icon" />}
          </div>
        </div>
      )}

      <div className="unit-avatar-info">
        <div className="unit-avatar-name-row">
          <Sparkles size={14} className="sparkle-icon" />
          <span className="unit-avatar-name">Message de {name}</span>
        </div>
        <span className="unit-avatar-hint">{isPlaying ? 'Écoute en cours...' : 'Cliquez pour écouter'}</span>
      </div>
    </div>
  );
}
