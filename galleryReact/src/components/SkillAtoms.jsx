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
// Hemos ajustado orbitRadius, angle y speed para cada skill.
const skillsData = [
  // name: Nombre de la skill
  // src: Variable importada del logo
  // orbitRadius: Distancia del logo al centro de la órbita (en píxeles)
  // angle: Ángulo inicial en grados (0 es a la derecha, 90 arriba, etc.)
  // orbitSpeed: Velocidad de rotación de la órbita (mayor número = más rápido)
  // selfRotateSpeed: Velocidad de rotación del logo sobre su propio eje (opcional)

  { name: 'JavaScript', src: jsLogo, orbitRadius: 100, angle: 0, orbitSpeed: 10, selfRotateSpeed: 5 },
  { name: 'React', src: reactLogo, orbitRadius: 120, angle: 60, orbitSpeed: 12, selfRotateSpeed: 7 },
  { name: 'Figma', src: figmaLogo, orbitRadius: 80, angle: 120, orbitSpeed: 8, selfRotateSpeed: 4 },
  { name: 'HTML', src: htmlLogo, orbitRadius: 110, angle: 180, orbitSpeed: 11, selfRotateSpeed: 6 },
  { name: 'TypeScript', src: typescriptLogo, orbitRadius: 90, angle: 240, orbitSpeed: 9, selfRotateSpeed: 5 },
  { name: 'SQL', src: sqlLogo, orbitRadius: 130, angle: 300, orbitSpeed: 13, selfRotateSpeed: 8 },
  // Añade más skills aquí. Ajusta orbitRadius, angle, orbitSpeed, selfRotateSpeed para cada uno.
];


function SkillAtoms({ className = '' }) {
  const [loadedSkills, setLoadedSkills] = useState([]);

  useEffect(() => {
    setLoadedSkills(skillsData);
  }, []);

  return (
    <div className={`${className} ${styles.skillAtomsContainer}`}>
      {/* Contenedor del Sistema de Órbitas */}
      {/* Este div rota, y los logos se posicionan absolutamente dentro de él */}
      <motion.div
        className={styles.orbitSystem}
        // Animación de rotación del sistema completo
        animate={{ rotate: 360 }}
        transition={{
          duration: 20, // Duración de una rotación completa del sistema
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {loadedSkills.map((skill, index) => {
          // --- ¡¡¡ESTE BLOQUE DE CÓDIGO FALTABA!!! ---
          // Convertir ángulo de grados a radianes
          const angleRad = (skill.angle * Math.PI) / 180;
          // Calcular la posición X e Y en el círculo
          const xPos = skill.orbitRadius * Math.cos(angleRad);
          const yPos = skill.orbitRadius * Math.sin(angleRad);
          // --- FIN DEL BLOQUE FALTANTE ---

          return (
            <motion.img
              key={skill.name}
              src={skill.src}
              alt={skill.name}
              className={styles.skillLogo}
              style={{
                position: 'absolute',
                // Posicionamiento calculado usando trigonometría
                left: `calc(50% + ${xPos}px)`, // <<< Ahora usando xPos
                top: `calc(50% + ${yPos}px)`,   // <<< Ahora usando yPos
                // Centrar el logo en su posición calculada
                transform: 'translate(-50%, -50%)',
                // width y height ya no deberían estar aquí, deben venir del CSS Module
                // width: '50px', // Eliminado, ya está en CSS Module
                // height: '50px', // Eliminado, ya está en CSS Module
              }}
              // Animación de entrada para cada logo
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1,
                // Opcional: Rotación individual del logo sobre su propio eje
                rotate: 360 // Gira 360 grados sobre sí mismo
              }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
                rotate: { // Transición para la rotación individual
                  duration: skill.selfRotateSpeed, // Usa la velocidad definida para cada skill
                  ease: "linear",
                  repeat: Infinity
                }
              }}
            />
          );
        })}
      </motion.div>
    </div>
  );
}

export default SkillAtoms;
