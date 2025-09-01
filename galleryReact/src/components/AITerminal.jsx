// src/components/AITerminal.jsx
import React, { useState, useRef, useEffect } from 'react';
import styles from './ALTerminal.module.css';


/**
 * Componente AITerminal: Simula una terminal interactiva para obtener "insights" de IA.
 * Permite al usuario escribir una pregunta y recibe una respuesta generada por Gemini.
 *
 * @param {object} props - Propiedades del componente.
 * @param {string} [props.className=''] - Clases CSS adicionales para el contenedor principal.
 */

function AITerminal({ className = '' }) {
    // Estado para el texto que el usuario ingresa en la terminal
    const [input, setInput] = useState('');
    // Estado para el historial de la conversación (preguntas y respuestas)
    const [chatHistory, setChatHistory] = useState([]);
    // Estado para indicar si la IA está "pensando"
    const [isLoading, setIsLoading] = useState(false);
    // Referencia para hacer scroll automático al final del historial
    const messagesEndRef = useRef(null);
  
    // Efecto para hacer scroll al final cada vez que el historial cambia
    useEffect(() => {
      scrollToBottom();
    }, [chatHistory]);
  
    // Función para hacer scroll al final del contenedor de mensajes
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
  
    // Función para manejar el envío de la pregunta
    const handleSendMessage = async (e) => {
      e.preventDefault(); // Previene el comportamiento por defecto del formulario
  
      if (input.trim() === '') return; // No enviar si el input está vacío
  
      const userMessage = input.trim();
      // Añadir el mensaje del usuario al historial
      setChatHistory((prev) => [...prev, { role: 'user', text: userMessage }]);
      setInput(''); // Limpiar el input
  
      setIsLoading(true); // Activar el indicador de carga
  
      try {
        // Preparar el payload para la API de Gemini
        const payload = {
          contents: [{ role: "user", parts: [{ text: userMessage }] }],
        };
        // <<< CAMBIO CLAVE: TU CLAVE API INSERTADA AQUÍ >>>
        const apiKey = "AIzaSyA1EMY0gj2cnQtCIG9XvKngckcKS_8mqic"; // ¡Tu clave API real!
        // <<< ----------------------------------------->>>
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
  
        console.log('Enviando solicitud a Gemini API:', payload);
        console.log('URL de la API:', apiUrl);
  
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
  
        console.log('Respuesta de la API (raw):', response);
  
        if (!response.ok) {
          const errorBody = await response.text();
          console.error(`Error HTTP: ${response.status} - ${response.statusText}`, errorBody);
          throw new Error(`Error de la API: ${response.status} ${response.statusText} - ${errorBody}`);
        }
  
        const result = await response.json();
        console.log('Resultado de la API (JSON):', result);
  
        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
          const aiResponse = result.candidates[0].content.parts[0].text;
          setChatHistory((prev) => [...prev, { role: 'ai', text: aiResponse }]);
        } else {
          setChatHistory((prev) => [...prev, { role: 'ai', text: 'Error: La IA no proporcionó un texto válido.' }]);
          console.error('Error en la estructura de la respuesta de la IA:', result);
        }
      } catch (error) {
        console.error('Error al llamar a la API de Gemini:', error);
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
  