// src/components/DynamicManifest.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // No necesitamos AnimatePresence si remountamos el contenedor
import styles from './DynamicManifest.module.css';

/**
 * Componente DynamicManifest: Muestra frases con animación de "emerger y apilar" en bucle.
 *
 * @param {object} props - Propiedades del componente.
 * @param {string[]} props.phrases - Array de frases a mostrar.
 * @param {string} [props.className=''] - Clases CSS adicionales para el contenedor principal.
 */
function DynamicManifest({ phrases, className = '' }) {
  // Estado para forzar la re-animación de la secuencia completa.
  // Cuando 'sequenceKey' cambia, el contenedor 'motion.div' se remonta,
  // reiniciando todas las animaciones de sus hijos.
  const [sequenceKey, setSequenceKey] = useState(0);

  // Define las variantes para el contenedor de las frases.
  // Usamos 'staggerChildren' para que las frases aparezcan una tras otra.
  const containerVariants = {
    hidden: { opacity: 0 }, // Estado inicial del contenedor (invisible)
    visible: {
      opacity: 1, // El contenedor se hace visible
      transition: {
        staggerChildren: 1, // Retraso (en segundos) entre la animación de cada frase hija
        delayChildren: 0.5,   // Retraso (en segundos) antes de que empiece la primera frase
      },
    },
  };

  // Define las variantes para cada frase individual.
  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -200, // Comienza 200px a la izquierda (como si estuviera detrás del texto vertical)
      y: 0,    // Posición Y inicial (se ajustará con 'custom' para apilarse)
    },
    visible: (i) => ({ // 'i' es el index del item, pasado por la prop 'custom'
      opacity: 1,
      x: 0, // Se mueve a su posición horizontal final (0px de desplazamiento)
      y: i * 35, // Se apila verticalmente: cada frase se desplaza 35px hacia abajo (ajusta según font-size/line-height)
      transition: {
        type: "spring", // Animación tipo muelle para un efecto más dinámico
        stiffness: 100, // Rigidez del muelle (más alto = más rápido/rígido)
        damping: 10,    // Amortiguación del muelle (más bajo = más rebote)
        opacity: { duration: 0.5 }, // Duración de la opacidad
        x: { duration: 1.0 },       // Duración del movimiento horizontal
        y: { duration: 1.0 },       // Duración del movimiento vertical
      },
    }),
  };

  // useEffect para manejar el bucle de la animación completa.
  // Reinicia la animación cambiando 'sequenceKey' después de un tiempo.
  useEffect(() => {
    if (phrases.length === 0) return; // No hacer nada si no hay frases

    // Calculamos la duración total de la secuencia de aparición de todas las frases.
    // Esto incluye el delay inicial, el stagger entre frases y la duración de la animación de una frase.
    const totalAnimationDuration =
      containerVariants.visible.transition.delayChildren +
      (phrases.length - 1) * containerVariants.visible.transition.staggerChildren +
      itemVariants.visible(0).transition.x.duration; // Usamos la duración de 'x' como referencia

    // Añadimos un tiempo extra para que las frases permanezcan visibles antes de reiniciar.
    const loopDelay = totalAnimationDuration + 3; // 3 segundos extra de visibilidad

    // Configuramos un temporizador para reiniciar la animación.
    const timer = setTimeout(() => {
      setSequenceKey((prevKey) => prevKey + 1); // Incrementa la key para forzar el remount y re-animación
    }, loopDelay * 1000); // Convertir a milisegundos

    // Limpieza: Cuando el componente se desmonte o las dependencias cambien,
    // limpiamos el temporizador para evitar fugas de memoria.
    return () => clearTimeout(timer);
  }, [phrases, sequenceKey]); // Las dependencias aseguran que el efecto se reinicie si las frases o la key cambian

  return (
    <div className={`${className} ${styles.dynamicManifestContainer}`}>
      {/* El 'motion.div' principal que contendrá todas las frases. */}
      {/* Su 'key' se cambia para forzar la re-animación de toda la secuencia. */}
      <motion.div
        key={sequenceKey} // Cuando sequenceKey cambia, este div se remonta y la animación se reinicia
        variants={containerVariants} // Aplicamos las variantes del contenedor
        initial="hidden"           // Estado inicial al montar
        animate="visible"          // Estado al que se anima
        className={styles.phrasesWrapper} // Clase para estilos CSS del wrapper
      >
        {phrases.map((phrase, index) => (
          <motion.p
            key={index} // Clave única para cada frase individual (importante para React)
            variants={itemVariants} // Aplicamos las variantes de la frase
            custom={index} // Pasamos el index como custom prop para calcular la posición 'y'
            className={styles.manifestPhrase} // Clase para estilos CSS de la frase
          >
            {phrase}
          </motion.p>
        ))}
      </motion.div>
    </div>
  );
}

export default DynamicManifest;
