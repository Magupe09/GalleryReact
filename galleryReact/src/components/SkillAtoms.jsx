// src/components/SkillAtoms.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './SkillAtoms.module.css';

// --- IMPORTACIONES DIRECTAS DE TUS LOGOS ---
// Asegúrate de que estas rutas y nombres de archivo coincidan EXACTAMENTE
// con los archivos en tu carpeta src/assets/sKills/
import htmlLogo from '../assets/sKills/HTML5.png';
import typescriptLogo from '../assets/sKills/Typescript.png';
import figmaLogo from '../assets/sKills/figma.png';
import jsLogo from '../assets/sKills/javascript.svg';
import reactLogo from '../assets/sKills/logo-react.svg';
import sqlLogo from '../assets/sKills/sql.svg';
// Añade aquí todas tus otras importaciones de logos de forma similar


// Aquí mapeamos los logos importados a tus datos de skills.
const skillsData = [
  { name: 'JavaScript', src: jsLogo, orbitRadius: 100, angle: 0, orbitSpeed: 10, selfRotateSpeed: 5 },
  { name: 'React', src: reactLogo, orbitRadius: 120, angle: 60, orbitSpeed: 12, selfRotateSpeed: 7 },
  { name: 'Figma', src: figmaLogo, orbitRadius: 80, angle: 120, orbitSpeed: 8, selfRotateSpeed: 4 },
  { name: 'HTML', src: htmlLogo, orbitRadius: 110, angle: 180, orbitSpeed: 11, selfRotateSpeed: 6 },
  { name: 'TypeScript', src: typescriptLogo, orbitRadius: 90, angle: 240, orbitSpeed: 9, selfRotateSpeed: 5 },
  { name: 'SQL', src: sqlLogo, orbitRadius: 130, angle: 300, orbitSpeed: 13, selfRotateSpeed: 8 },
  // Añade más skills aquí. Ajusta initialX, initialY, orbitRadius, angle, speed para cada uno.
  // initialX/Y: Posición inicial relativa al centro del contenedor de órbita.
  // orbitRadius: Distancia desde el centro (lo usaremos más adelante para variar órbitas).
  // angle: Ángulo inicial en grados (0 es a la derecha, 90 arriba, etc.).
  // speed: Velocidad de rotación (lo usaremos más adelante).
];


function SkillAtoms({ className = '' }) {
  const [loadedSkills, setLoadedSkills] = useState([]);

  useEffect(() => {
    setLoadedSkills(skillsData);
  }, []);

  return (
    <div className={`${className} ${styles.skillAtomsContainer}`}>
      {/* Nuevo Contenedor del Sistema de Órbitas */}
      {/* Este div será el que se posicione en la mano y rote */}
      <motion.div
        className={styles.orbitSystem}
        // Animación de rotación (la aplicaremos aquí)
        animate={{ rotate: 360 }} // Gira 360 grados
        transition={{
          duration: 20, // Duración de una rotación completa
          ease: "linear", // Velocidad constante
          repeat: Infinity, // Repetir infinitamente
        }}
      >
        {loadedSkills.map((skill, index) => (
          <motion.img
            key={skill.name}
            src={skill.src}
            alt={skill.name}
            className={styles.skillLogo}
            style={{
              // Posicionamiento absoluto de cada logo dentro del sistema de órbita
              position: 'absolute',
              left: `calc(50% + ${skill.initialX}px)`, // 50% del ancho del padre + desplazamiento X
              top: `calc(50% + ${skill.initialY}px)`,   // 50% de la altura del padre + desplazamiento Y
              // Ajuste para centrar el logo en su posición calculada
              transform: 'translate(-50%, -50%)',
              width: '50px', // Tamaño de cada logo (puedes ajustar)
              height: '50px', // Tamaño de cada logo (puedes ajustar)
            }}
            // Animación de entrada para cada logo
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default SkillAtoms;
