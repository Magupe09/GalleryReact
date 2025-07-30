// src/components/GearMenu.jsx
import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './GearMenu.module.css';

/**
 * Componente GearMenu: Implementa un engranaje animado con scroll que funciona como menú desplegable.
 *
 * @param {object} props - Propiedades del componente.
 * @param {string} [props.className=''] - Clases CSS adicionales para el contenedor principal.
 */
function GearMenu({ className = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const gearRef = useRef(null); // Referencia para el propio elemento del engranaje

  // Hook de Framer Motion para obtener el progreso del scroll.
  // 'target' es el documento (scroll global de la página).
  // 'offset' define el rango de scroll en píxeles donde ocurre la animación.
  // La animación completa del engranaje ocurrirá en los primeros 800 píxeles de scroll.
  const { scrollYProgress } = useScroll({
    target: typeof document !== 'undefined' ? document.documentElement : undefined, // Monitorea el scroll global
    offset: [0, 800] ,// La animación ocurre entre 0px y 800px de scroll del documento
    layoutEffect: false
  });

  // Definimos cómo se transformará la escala del engranaje con el progreso del scroll.
  // Mapea el progreso del scroll (0 a 1) a un rango de escala.
  // Empieza MUY GRANDE (100x) y termina en 1x (tamaño normal de botón).
  const scale = useTransform(scrollYProgress, [0, 1], [100, 1]); // <<< AJUSTADO: Escala inicial a 100x

  // Definimos cómo se transformará la rotación del engranaje con el progreso del scroll.
  // Gira muchas veces (ej. 20 vueltas) mientras se encoge.
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360 * 20]); // <<< AJUSTADO: Más rotaciones

  // Definimos la opacidad para que aparezca y se desvanezca suavemente.
  // Empieza invisible (0), se hace visible rápidamente (1) y permanece visible.
  const opacity = useTransform(scrollYProgress, [0, 0.05, 1], [0, 1, 1]); // Aparece en los primeros 5% del scroll

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    // El contenedor principal del GearMenu.
    // Ahora tiene 'position: fixed' en el CSS para que se quede en el viewport.
    <motion.div
      ref={gearRef}
      className={`${styles.gearMenuContainer} ${className}`}
      style={{ scale, rotate, opacity }} // Aplicamos todas las transformaciones
      onClick={toggleMenu}
    >
      {/* SVG del Engranaje */}
      <svg
        className={styles.gearIcon}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gearGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00c6ff" />
            <stop offset="100%" stopColor="#0072ff" />
          </linearGradient>
        </defs>
        <path
          fill="url(#gearGradient)"
          d="M50,2 A48,48 0 0 1 98,50 A48,48 0 0 1 50,98 A48,48 0 0 1 2,50 A48,48 0 0 1 50,2 M50,10 A40,40 0 0 0 10,50 A40,40 0 0 0 50,90 A40,40 0 0 0 90,50 A40,40 0 0 0 50,10 Z M50,35 A15,15 0 0 0 35,50 A15,15 0 0 0 50,65 A15,15 0 0 0 65,50 A15,15 0 0 0 50,35 Z M50,40 A10,10 0 0 0 40,50 A10,10 0 0 0 50,60 A10,10 0 0 0 60,50 A10,10 0 0 0 50,40 Z M50,2 L55,10 L45,10 Z M50,98 L55,90 L45,90 Z M98,50 L90,55 L90,45 Z M2,50 L10,55 L10,45 Z M85.355,14.645 L78.284,21.716 L70.707,14.149 Z M14.645,85.355 L21.716,78.284 L14.149,70.707 Z M85.355,85.355 L78.284,78.284 L70.707,85.851 Z M14.645,14.645 L21.716,21.716 L14.149,29.293 Z"
        />
      </svg>

      {/* Menú Desplegable */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className={styles.dropdownMenu}
          onClick={(e) => e.stopPropagation()}
        >
          <a href="#projects" className={styles.menuItem}>Proyectos</a>
          <a href="/path/to/your/cv.pdf" target="_blank" rel="noopener noreferrer" className={styles.menuItem}>Descargar CV</a>
        </motion.div>
      )}
    </motion.div>
  );
}

export default GearMenu;
