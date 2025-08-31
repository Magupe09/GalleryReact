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
  { name: 'JavaScript', src: jsLogo, orbitRadius: 100, angle: 0, orbitSpeed: 10, selfRotateSpeed: 2, direction: 1 },
  { name: 'React', src: reactLogo, orbitRadius: 120, angle: 60, orbitSpeed: 12, selfRotateSpeed: 1.5, direction: -1 },
  { name: 'Figma', src: figmaLogo, orbitRadius: 80, angle: 120, orbitSpeed: 8, selfRotateSpeed: 3, direction: 1 },
  { name: 'HTML', src: htmlLogo, orbitRadius: 110, angle: 180, orbitSpeed: 11, selfRotateSpeed: 2.5, direction: -1 },
  { name: 'TypeScript', src: typescriptLogo, orbitRadius: 90, angle: 240, orbitSpeed: 9, selfRotateSpeed: 1.8, direction: 1 },
  { name: 'SQL', src: sqlLogo, orbitRadius: 130, angle: 300, orbitSpeed: 13, selfRotateSpeed: 3.5, direction: -1 },
];

// --- CONSTANTES PARA EL EFECTO DE ESTELA (¡¡AJUSTADAS PARA NITIDEZ Y JUNTAS!!) ---
const NUM_TRAIL_COPIES = 7; // Número de copias moderado
const TRAIL_ANGULAR_OFFSET_FACTOR = 0.02; // <<< MUCHO MÁS PEQUEÑO: Para que las copias estén muy juntas
const TRAIL_FADE_DURATION = 1.8; // Duración del desvanecimiento (un poco más rápida que antes)
const TRAIL_INITIAL_OPACITY = 0.4; // <<< MÁS BAJA: Las copias empiezan más transparentes
const TRAIL_MIN_SCALE = 0.05; // <<< MÁS PEQUEÑA: Las copias se encogen más agresivamente


function SkillAtoms({ className = '' }) {
  const [loadedSkills, setLoadedSkills] = useState([]);

  useEffect(() => {
    setLoadedSkills(skillsData);
  }, []);

  return (
    <div className={`${className} ${styles.skillAtomsContainer}`}>
      <motion.div className={styles.orbitSystem}>
        {loadedSkills.map((skill, skillIndex) => {
          const xPos = skill.orbitRadius;
          const yPos = 0;

          return ([...Array(NUM_TRAIL_COPIES + 1)].map((_, copyIndex) => {
            const isMainLogo = copyIndex === 0;
            
            const orbitDelay = (copyIndex * TRAIL_ANGULAR_OFFSET_FACTOR) * skill.orbitSpeed;

            const opacity = isMainLogo ? 1 : TRAIL_INITIAL_OPACITY * (1 - (copyIndex / NUM_TRAIL_COPIES));
            const scale = isMainLogo ? 1 : TRAIL_MIN_SCALE + (1 - (copyIndex / NUM_TRAIL_COPIES)) * (1 - TRAIL_MIN_SCALE);

            return (
              <motion.div
                key={`${skill.name}-orbit-wrapper-${copyIndex}`}
                className={styles.individualOrbitWrapper}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '100%',
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{ rotate: 360 * skill.direction }}
                transition={{
                  duration: skill.orbitSpeed,
                  ease: "linear",
                  repeat: Infinity,
                  delay: orbitDelay,
                }}
              >
                <motion.img
                  key={`${skill.name}-logo-${copyIndex}`}
                  src={skill.src}
                  alt={skill.name}
                  className={styles.skillLogo}
                  style={{
                    position: 'absolute',
                    left: `calc(50% + ${xPos}px)`,
                    top: `calc(50% + ${yPos}px)`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: isMainLogo ? 2 : 1, // <<< NUEVO: Z-index para asegurar que el principal esté arriba
                  }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{
                    opacity: opacity,
                    scale: scale,
                    rotate: 360 * skill.direction
                  }}
                  transition={{
                    delay: orbitDelay,
                    duration: isMainLogo ? 0.01 : TRAIL_FADE_DURATION, // Duración de entrada del principal casi instantánea
                    rotate: {
                      duration: skill.selfRotateSpeed,
                      ease: "linear",
                      repeat: Infinity
                    }
                  }}
                />
              </motion.div>
            );
          }));
        })}
      </motion.div>
    </div>
  );
}

export default SkillAtoms;
