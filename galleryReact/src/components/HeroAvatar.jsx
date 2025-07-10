// src/components/HeroAvatar/HeroAvatar.jsx
import React from 'react';
import { motion } from 'framer-motion';
// Importa tu imagen de avatar
import myAvatarImage from '../assets/avatar.png'; // <<< Ruta corregida

function HeroAvatar({ className = '' }) {
  return (
    <motion.div
      className={className}
      // Aquí aplicaremos animaciones de Framer Motion más adelante
      // Por ahora, solo es una imagen
      initial={{ opacity: 0, x: -100 }} // Que aparezca desde la izquierda
      animate={{ opacity: 1, x: 0 }}   // Y se deslice a su posición
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <img
        src={myAvatarImage}
        alt="Tu Avatar Profesional"
        style={{
          maxWidth: '100%', // Asegura que la imagen no se desborde
          height: 'auto',
          display: 'block'
        }}
      />
    </motion.div>
  );
}

export default HeroAvatar;