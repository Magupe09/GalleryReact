// src/components/HeroAvatar/HeroAvatar.jsx
import React from 'react';
import { motion } from 'framer-motion';

// Importa tu imagen de avatar
import myAvatarImage from '../assets/AvatarPortafolio2.png'; // <<< Asegúrate de que esta ruta y nombre de archivo sean correctos

function HeroAvatar({ className = '' }) {
  return (
    // Usa la clase pasada por props, que ahora vendrá del módulo CSS de App.jsx
    <motion.div
      className={className}
      initial={{ opacity: 0, x: -400 }}
      animate={{ opacity: 1, x: -100 }}
      transition={{ duration: 3, ease: "easeOut" }}
    >
      <img
        src={myAvatarImage}
        alt="Tu Avatar Profesional"
        style={{
          maxWidth: '100%',
          height: '500px',
          display: 'block'
        }}
      />
    </motion.div>
  );
}

export default HeroAvatar;
