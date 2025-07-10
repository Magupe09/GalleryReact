// src/components/AnimatedText/AnimatedText.jsx
import React from 'react';
import { motion } from 'framer-motion';

function AnimatedText({ text, type = 'word', delay = 0.05, className = '' }) {
  // 1. Divide el texto según el 'type'
  // Si type es 'word', divide por espacios; si es 'char', divide cada caracter.
  const textArray = type === 'word' ? text.split(' ') : text.split('');

  // 2. Define las variantes del contenedor (padre)
  // Estas variantes controlan cómo se comporta el contenedor principal
  // y, crucialmente, cómo escalona las animaciones de sus hijos.
  const containerVariants = {
    hidden: { opacity: 0 }, // Estado inicial del contenedor: invisible
    visible: {
      opacity: 1, // Estado final del contenedor: visible
      transition: {
        staggerChildren: delay, // La magia: retrasa la animación de cada hijo por 'delay' segundos
      },
    },
  };

  // 3. Define las variantes para cada hijo (letra/palabra individual)
  // Estas variantes definen la animación de cada elemento de texto individual.
  const childVariants = {
    hidden: {
      opacity: 0, // Inicia invisible
      y: 20,      // Inicia 20px más abajo
      scale: 0.8, // Inicia un poco más pequeño
    },
    visible: {
      opacity: 1, // Termina visible
      y: 0,       // Termina en su posición normal
      scale: 1,   // Termina en su tamaño normal
      transition: {
        type: 'spring',   // Tipo de animación "resorte" para un movimiento más natural
        damping: 12,      // La cantidad de "amortiguación" en el resorte (cuánto se detiene)
        stiffness: 200,   // La "rigidez" del resorte (qué tan rápido rebota)
      },
    },
  };

  return (
    // motion.div es el contenedor padre que orquesta las animaciones de sus hijos
    <motion.div
      className={className} // Permite pasar clases CSS para estilos externos
      variants={containerVariants} // Aplica las variantes del contenedor
      initial="hidden"            // Establece el estado inicial de la animación
      animate="visible"           // Anima al estado "visible" al montar el componente
    >
      {/* Mapea cada palabra/carácter a un motion.span individual */}
      {textArray.map((item, index) => (
        <motion.span
          key={index} // Una key única es necesaria para que React maneje la lista de elementos
          variants={childVariants} // Aplica las variantes del hijo a cada span
          // Estos estilos son cruciales para que cada span se anime individualmente
          // y mantenga los espacios entre palabras.
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {item}
          {/* Si estamos animando por palabra, añade un espacio después de cada palabra (excepto la última) */}
          {type === 'word' && index < textArray.length - 1 && ' '}
        </motion.span>
      ))}
    </motion.div>
  );
}

export default AnimatedText;