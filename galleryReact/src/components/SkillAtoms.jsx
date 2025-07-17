// src/components/SkillAtoms.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './SkillAtoms.module.css';

// --- IMPORTACIONES DIRECTAS DE TUS LOGOS ---
import htmlLogo from '../assets/sKills/HTML5.png';
import typescriptLogo from '../assets/sKills/Typescript.png';
import figmaLogo from '../assets/sKills/figma.png';
import jsLogo from '../assets/sKills/javascript.svg';
import reactLogo from '../assets/sKills/logo-react.svg';
import sqlLogo from '../assets/sKills/sql.svg';
// Asegúrate de que estas rutas y nombres de archivo coincidan EXACTAMENTE
// con los archivos en tu carpeta src/assets/sKills/


// Aquí mapeamos los logos importados a tus datos de skills.
const skillsData = [
  // Añadimos 'direction': 1 para horario, -1 para antihorario
  { name: 'JavaScript', src: jsLogo, orbitRadius: 100, angle: 0, orbitSpeed: 10, selfRotateSpeed: 5, direction: 1 },
  { name: 'React', src: reactLogo, orbitRadius: 120, angle: 60, orbitSpeed: 12, selfRotateSpeed: 7, direction: -1 },
  { name: 'Figma', src: figmaLogo, orbitRadius: 80, angle: 120, orbitSpeed: 8, selfRotateSpeed: 4, direction: 1 },
  { name: 'HTML', src: htmlLogo, orbitRadius: 110, angle: 180, orbitSpeed: 11, selfRotateSpeed: 6, direction: -1 },
  { name: 'TypeScript', src: typescriptLogo, orbitRadius: 90, angle: 240, orbitSpeed: 9, selfRotateSpeed: 5, direction: 1 },
  { name: 'SQL', src: sqlLogo, orbitRadius: 130, angle: 300, orbitSpeed: 13, selfRotateSpeed: 8, direction: -1 },
];


function SkillAtoms({ className = '' }) {
  const [loadedSkills, setLoadedSkills] = useState([]);

  useEffect(() => {
    setLoadedSkills(skillsData);
  }, []);

  return (
    <div className={`${className} ${styles.skillAtomsContainer}`}>
      <motion.div
        className={styles.orbitSystem}
        // Animación de rotación del sistema completo
        animate={{ rotate: 360 }}
        transition={{
          duration: 99999, // Duración de una rotación completa del sistema
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {loadedSkills.map((skill, index) => {
          const angleRad = (skill.angle * Math.PI) / 180;
          const xPos = skill.orbitRadius * Math.cos(angleRad);
          const yPos = skill.orbitRadius * Math.sin(angleRad);

          return (
            <motion.img
              key={skill.name}
              src={skill.src}
              alt={skill.name}
              className={styles.skillLogo}
              style={{
                position: 'absolute',
                left: `calc(50% + ${xPos}px)`,
                top: `calc(50% + ${yPos}px)`,
                transform: 'translate(-50%, -50%)', // Asegúrate de que esto esté aquí
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: 1,
                scale: 1,
                // --- CAMBIO CLAVE PARA ROTACIÓN INDIVIDUAL EN SENTIDOS OPUESTOS ---
                rotate: 360 * skill.direction // Usa la dirección para 360 o -360 grados
              }}
              transition={{
                delay: index * 0.1,
                duration: 0.5, // Duración de la animación de entrada
                rotate: { // Transición para la rotación individual del logo
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
