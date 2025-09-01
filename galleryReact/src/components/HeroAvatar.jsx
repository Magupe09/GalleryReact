// src/components/HeroAvatar/HeroAvatar.jsx
import React from 'react';
import { motion } from 'framer-motion';

// Importa tu imagen de avatar
import myAvatarImage from '../assets/AvatarPortafolio2.png'; // <<< Asegúrate de que esta ruta y nombre de archivo sean correctos
import styles from './HeroAvatar.module.css';
function HeroAvatar({ className = '' }) {
  return (
    // Usa la clase pasada por props, que ahora vendrá del módulo CSS de App.jsx
    <motion.div 
      className={`${styles.avatarContainer} ${className}`}
      initial={{ opacity: 0, x: 0, scale: 0.8 }} // ← x: 0 y scale para animación
      animate={{ opacity: 1, x: 0, scale: 1 }}   // ← x: 0 y scale para animación
      transition={{ duration: 3, ease: "easeOut" }}
      style={{
                // Pasamos la ruta de la silueta a una variable CSS
                '--shadow-image': `url(${myAvatarImage})`
              }}
    >
      <img
        src={myAvatarImage}
        className={styles.avatarImage}
        alt="Tu Avatar Profesional"
        style={{
          maxWidth: '270%',
          height: '400px',
          display: 'block'
        }}
      />
    </motion.div>
  );
}

export default HeroAvatar;
