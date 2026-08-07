import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, Volume2 } from 'lucide-react';
import './AvatarWelcome.css';

export default function AvatarWelcome() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSpeaker, setCurrentSpeaker] = useState(null);
  const [voices, setVoices] = useState([]);
  
  const isCancelledRef = useRef(false);

  useEffect(() => {
    const loadVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
    };
    
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    
    return () => {
      window.speechSynthesis.cancel();
      isCancelledRef.current = true;
    };
  }, []);

  const dialogue = [
    { speaker: 'lea', text: "Salut ! Bienvenue dans la classe de français immersion onze." },
    { speaker: 'hugo', text: "C'est notre plateforme d'apprentissage. Tu vas voir, c'est grave cool !" },
    { speaker: 'lea', text: "Grave ! Clique sur un module dans le menu de gauche pour démarrer." },
    { speaker: 'hugo', text: "Il y a de la grammaire, du vocabulaire, et même des trucs pour écrire..." },
    { speaker: 'lea', text: "...et surtout des simulations hyper immersives !" },
    { speaker: 'hugo', text: "Bref, lance-toi vite dans une unité." },
    { speaker: 'lea', text: "Et n'oublie pas, c'est bon les paupe tartes !" }
  ];

  const playConversation = async (e) => {
    if (e) e.stopPropagation();

    if (isPlaying) {
      window.speechSynthesis.cancel();
      isCancelledRef.current = true;
      setIsPlaying(false);
      setCurrentSpeaker(null);
      return;
    }
    
    setIsPlaying(true);
    isCancelledRef.current = false;
    window.speechSynthesis.cancel();
    
    const frenchVoices = voices.filter(v => v.lang.startsWith('fr'));
    
    for (let i = 0; i < dialogue.length; i++) {
      if (isCancelledRef.current) break;
      
      const line = dialogue[i];
      setCurrentSpeaker(line.speaker);

      await new Promise((resolve) => {
        const utterance = new SpeechSynthesisUtterance(line.text);
        utterance.lang = 'fr-FR';
        
        if (line.speaker === 'lea') {
          utterance.pitch = 1.4; 
          utterance.rate = 1.0;
          const femaleVoice = frenchVoices.find(v => v.name.includes('Amelie') || v.name.includes('Amélie'));
          if (femaleVoice) utterance.voice = femaleVoice;
          else if (frenchVoices.length > 0) utterance.voice = frenchVoices[0];
        } else if (line.speaker === 'hugo') {
          utterance.pitch = 1.2;
          utterance.rate = 1.05;
          const maleVoice = frenchVoices.find(v => /thomas|paul|bernard|male/i.test(v.name));
          if (maleVoice) utterance.voice = maleVoice;
          else if (frenchVoices.length > 1) utterance.voice = frenchVoices[1];
          else if (frenchVoices.length > 0) utterance.voice = frenchVoices[0];
        }

        utterance.onend = () => {
          setTimeout(resolve, 250);
        };
        utterance.onerror = resolve; 
        
        window.speechSynthesis.speak(utterance);
      });
    }
    
    setIsPlaying(false);
    setCurrentSpeaker(null);
    isCancelledRef.current = false;
  };

  return (
    <div className="avatar-welcome-card glass-panel">
      <div className="avatar-container">
        <div className={`avatar-card ${currentSpeaker === 'lea' ? 'speaking' : ''}`}>
          <img src="/avatars/lea.jpg" alt="Léa" className="avatar-img" />
          <div className="avatar-badge lea-badge">
            <span>Léa</span>
            {currentSpeaker === 'lea' && <Volume2 className="speak-icon" size={16} />}
          </div>
        </div>

        <div className={`avatar-card ${currentSpeaker === 'hugo' ? 'speaking' : ''}`}>
          <img src="/avatars/hugo.jpg" alt="Hugo" className="avatar-img" />
          <div className="avatar-badge hugo-badge">
            <span>Hugo</span>
            {currentSpeaker === 'hugo' && <Volume2 className="speak-icon" size={16} />}
          </div>
        </div>
      </div>

      <button className={`avatar-play-btn ${isPlaying ? 'playing' : ''}`} onClick={playConversation}>
        {isPlaying ? (
          <>
            <Square size={20} /> Arrêter
          </>
        ) : (
          <>
            <Play size={20} /> Écouter Léa & Hugo
          </>
        )}
      </button>
    </div>
  );
}
