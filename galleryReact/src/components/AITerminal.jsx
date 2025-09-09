// src/components/AITerminal.jsx
import React, { useState, useRef, useEffect } from 'react';
import styles from './ALTerminal.module.css';

function AITerminal({ className = '' }) {
    const [input, setInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    
    // NUEVO: Control para evitar scroll en la primera carga
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [hasUserInteracted, setHasUserInteracted] = useState(false);

    // Efecto modificado: Solo hace scroll después de interacción del usuario
    useEffect(() => {
      // No hacer scroll en el primer render
      if (isFirstRender) {
        setIsFirstRender(false);
        return;
      }
      
      // Solo hacer scroll si el usuario ya ha interactuado
      if (hasUserInteracted) {
        scrollToBottom();
      }
    }, [chatHistory]);

    const scrollToBottom = () => {
      // Hacer scroll SOLO dentro del contenedor de mensajes, no en toda la página
      const messagesContainer = messagesEndRef.current?.parentElement;
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    };

    const handleSendMessage = async (e) => {
      e.preventDefault();

      if (input.trim() === '') return;

      // NUEVO: Marcar que el usuario ha interactuado
      if (!hasUserInteracted) {
        setHasUserInteracted(true);
      }

      const userMessage = input.trim();
      setChatHistory((prev) => [...prev, { role: 'user', text: userMessage }]);
      setInput('');

      setIsLoading(true);

      try {
        const payload = {
          contents: [{ role: "user", parts: [{ text: userMessage }] }],
        };
        const apiKey = "AIzaSyA1EMY0gj2cnQtCIG9XvKngckcKS_8mqic";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          const errorBody = await response.text();
          throw new Error(`Error de la API: ${response.status} ${response.statusText} - ${errorBody}`);
        }

        const result = await response.json();

        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
          const aiResponse = result.candidates[0].content.parts[0].text;
          setChatHistory((prev) => [...prev, { role: 'ai', text: aiResponse }]);
        } else {
          setChatHistory((prev) => [...prev, { role: 'ai', text: 'Error: La IA no proporcionó un texto válido.' }]);
        }
      } catch (error) {
        setChatHistory((prev) => [...prev, { role: 'ai', text: `Error de conexión o API: ${error.message || error}.` }]);
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className={`${styles.terminalContainer} ${className}`}>
        <div className={styles.terminalHeader}>
          <span className={styles.terminalDot} style={{ backgroundColor: '#ff5f56' }}></span>
          <span className={styles.terminalDot} style={{ backgroundColor: '#ffbd2e' }}></span>
          <span className={styles.terminalDot} style={{ backgroundColor: '#27c93f' }}></span>
          <span className={styles.terminalTitle}>AI Insight Terminal</span>
        </div>
        <div className={styles.terminalBody}>
          <div className={styles.terminalMessages}>
            {chatHistory.length === 0 && (
              <p className={styles.aiMessage}>
                <span className={styles.aiPrompt}>AI &gt;</span> Hola, soy tu asistente de IA. Pregúntame algo sobre desarrollo web o tecnología.
              </p>
            )}
            {chatHistory.map((msg, index) => (
              <p key={index} className={msg.role === 'user' ? styles.userMessage : styles.aiMessage}>
                <span className={msg.role === 'user' ? styles.userPrompt : styles.aiPrompt}>
                  {msg.role === 'user' ? 'Tú >' : 'AI >'}
                </span>{' '}
                {msg.text}
              </p>
            ))}
            {isLoading && (
              <p className={styles.aiMessage}>
                <span className={styles.aiPrompt}>AI &gt;</span> Pensando...
              </p>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSendMessage} className={styles.terminalInputForm}>
            <span className={styles.userPrompt}>Tú &gt;</span>
            <input
              type="text"
              className={styles.terminalInput}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pregunta aquí..."
              disabled={isLoading}
            />
            <button type="submit" className={styles.terminalSubmitButton} disabled={isLoading}>
              Enviar
            </button>
          </form>
        </div>
      </div>
    );
}

export default AITerminal;