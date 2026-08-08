import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import './UnitAvatarSpeaker.css';

export default function UnitAvatarSpeaker({ avatar = 'lea', audioSrc = '/audio/unit1_intro_lea.mp3', name = 'Léa', speechFallbackText = '' }) {
  const [isPlaying, setIsPlaying] = useState(false);
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
      return;
    }

    setIsPlaying(true);

    const audio = new Audio(audioSrc);
    audioRef.current = audio;

    audio.onended = () => {
      setIsPlaying(false);
    };

    audio.onerror = () => {
      // SpeechSynthesis Fallback if audio file is not present
      if (speechFallbackText) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(speechFallbackText);
        utterance.lang = 'fr-FR';
        utterance.pitch = avatar === 'lea' ? 1.4 : 1.2;
        utterance.rate = 1.0;
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => setIsPlaying(false);
        window.speechSynthesis.speak(utterance);
      } else {
        setIsPlaying(false);
      }
    };

    audio.play().catch(() => {
      setIsPlaying(false);
    });
  };

  const imageSrc = avatar === 'hugo' ? '/avatars/hugo.jpg' : '/avatars/lea.jpg';

  return (
    <div 
      className={`unit-avatar-speaker-card ${isPlaying ? 'speaking' : ''}`} 
      onClick={togglePlay}
      title={`Cliquer pour écouter le message de ${name}`}
    >
      <div className="unit-avatar-wrapper">
        <img src={imageSrc} alt={name} className="unit-avatar-img" />
        <div className="unit-avatar-play-overlay">
          {isPlaying ? <VolumeX size={22} className="play-icon" /> : <Volume2 size={22} className="play-icon" />}
        </div>
      </div>

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
