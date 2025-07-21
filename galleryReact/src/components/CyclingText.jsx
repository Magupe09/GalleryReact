// src/components/CyclingText.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './CyclingText.module.css';

/**
 * Componente CyclingText: Muestra frases en ciclo con animaciones y efecto de brillo.
 *
 * @param {object} props - Propiedades del componente.
 * @param {string[]} props.phrases - Array de frases a mostrar.
 * @param {number} [props.interval=3000] - Tiempo en milisegundos entre cada frase.
 * @param {string} [props.className=''] - Clases CSS adicionales para el contenedor principal.
 */
function CyclingText({ phrases, interval = 3000, className = '' }) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhraseIndex((prevIndex) =>
        (prevIndex + 1) % phrases.length
      );
    }, interval);

    return () => clearInterval(timer);
  }, [phrases, interval]);

  // Definimos las variantes de animación para Framer Motion
  const textVariants = {
    initial: { opacity: 0, y: 30, filter: 'drop-shadow(0 0 0px rgba(0,255,255,0))' }, // Estado inicial: invisible, un poco abajo, sin brillo
    animate: {
      opacity: 1,
      y: 0,
      filter: [ // Animación de brillo/pulso
        'drop-shadow(0 0 0px rgba(0,255,255,0))',    // Sin brillo
        'drop-shadow(0 0 8px rgba(0,255,255,0.8))',  // Brillo máximo
        'drop-shadow(0 0 0px rgba(0,255,255,0))'     // Vuelve a sin brillo
      ],
      transition: {
        opacity: { duration: 0.8, ease: "easeOut" },
        y: { duration: 0.8, ease: "easeOut" },
        filter: { // Transición específica para el filtro de brillo
          duration: 2.5, // Duración de un ciclo completo de brillo
          repeat: Infinity, // Repetir infinitamente mientras la frase está visible
          ease: "easeInOut",
          delay: 0.5 // Pequeño retraso antes de que empiece el brillo
        }
      }
    },
    exit: { opacity: 0, y: -30, filter: 'drop-shadow(0 0 0px rgba(0,255,255,0))', transition: { duration: 0.5, ease: "easeIn" } }, // Estado de salida: invisible, un poco arriba, sin brillo
  };

  return (
    <div className={`${className} ${styles.cyclingTextContainer}`}>
      <AnimatePresence mode="wait">
        <motion.p
          key={currentPhraseIndex}
          variants={textVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className={styles.cyclingPhrase}
        >
          {phrases[currentPhraseIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

export default CyclingText;
