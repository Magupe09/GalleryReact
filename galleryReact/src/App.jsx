// src/App.jsx
import React, { useRef,useState } from 'react';
import './index.css';

import styles from './App.module.css';

import AnimatedText from './components/AnimatedText';
import HeroAvatar from './components/HeroAvatar';
import SkillAtoms from './components/SkillAtoms';
//import CyclingText from './components/CyclingText';
import DynamicManifest from './components/DynamicManifest';
import AITerminal from './components/AITerminal';
import GearMenu from './components/GearMenu';
//import ProyectsModal from './components/ProyectsModal';







function App() {

  const manifestoPhrases = [
    "Transformo ideas en código.",
    "Diseño experiencias intuitivas.",
    "La lógica se encuentra con el arte.",
    "Construyendo el futuro digital."
  ];

  // Referencia para la primera sección (Hero Section) para el scroll del engranaje
  const heroSectionRef = useRef(null);
  
  

  return (
    <div className={styles.mainScrollContainer} style={{
      height: '100vh',
      position: 'relative',
      overflow:'hidden'
      
    }}>
      

     
      <section
        ref={heroSectionRef}
        style={{
          height: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'stretch',
          justifyContent: 'space-between',
          padding: '20px',
          position: 'relative',
          backgroundColor: 'black',
          zIndex: 10,
        }}>

        {/* --- Columna Izquierda: Contenedor Principal (flex-direction: column) --- */}
        <div style={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column', // Esta columna principal sigue apilando sus hijos verticalmente
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingRight: '20px',
          gap: '60px',
          position: 'relative',
          marginLeft: '65px'
        }}>
          {/* --- NUEVO: Contenedor para Título y Subtítulo (flex-direction: row) --- */}
          {/* Este div hará que el título y subtítulo se coloquen uno al lado del otro */}
          <div style={{
            display: 'flex',
            flexDirection: 'row', // <<< ¡CLAVE! Ahora los wrappers de texto se alinean horizontalmente
            justifyContent: 'flex-start', // Centra el bloque de texto vertical
            alignItems: 'flex-end', // Alinea la base de los textos verticales (ajusta a 'center' si prefieres)
            // marginBottom: '10px', // Espacio entre este bloque de texto y el CyclingText
            width: '100%', // Ocupa el ancho completo para centrar bien
          }}>
            {/* Contenedor para el Título Vertical (MagupeDev) */}
            <div className={styles.verticalTitleWrapper}>
              <AnimatedText
                text="MagupeDev"
                className={styles.heroTitle}
                type="char"
                delay={0.03}
              />
            </div>

            {/* Contenedor para el Subtítulo Vertical (Desarrollador Front-End) */}
            <div className={styles.verticalSubtitleWrapper}>
              <AnimatedText
                text="Desarrollador Front-End | Entusiasta UI/UX"
                className={styles.heroSubtitle}
                type="word"
                delay={0.08}
              />
            </div>
          </div>

          {/* <<< NUEVO: AITerminal posicionado absolutamente */}
          <div
            className={styles.aiTerminalWrapper} // Nueva clase para el wrapper de la terminal
            style={{
              position: 'absolute',
              // Ajusta 'top' para posicionarlo debajo del texto vertical y encima del manifiesto
              // Este valor dependerá de la altura total del bloque de texto vertical y el gap
              // Puedes experimentar con 'top' o 'bottom' + 'height' para ubicarlo
              top: '25%', // Posición inicial, ajusta según necesidad
              left: '53%',
              transform: 'translateX(-50%)',
              maxWidth: '70%', // Ocupará la mayor parte del ancho de la columna
              width: '100%',
              zIndex: 20, // Asegura que esté por encima de otros elementos si se superponen
            }}
          >
            <AITerminal />
          </div>
          {/* -------------------------------------------------- */}
          {/* --- FIN del nuevo contenedor --- */}

          <div className={styles.manifestoBlock} style={{
            position: 'absolute', // Saca del flujo normal
            bottom: '5px',      // A 20px de la parte inferior de la columna izquierda
            left: '65%',         // A 50% del lado izquierdo de la columna izquierda
            transform: 'translateX(-50%)', // Centra horizontalmente el div
            maxWidth: '100%',     // Mantiene el ancho máximo
            width: '100%',       // Ocupa el 100% del ancho disponible para maxWidth
          }}>
            {/* <<< CAMBIO CLAVE: Reemplazamos CyclingText por DynamicManifest */}
            <DynamicManifest
              phrases={manifestoPhrases} // Le pasamos las frases
            />
            {/* -------------------------------------------------- */}
          </div>
        </div>

        {/* --- Columna Derecha: Avatar y Skills --- */}
        <div style={{
          flex: 1,
          minWidth: '300px',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          position: 'relative',
          //paddingLeft: '20px',
        }}>
          <HeroAvatar className={styles.heroAvatar} />
          <SkillAtoms className={styles.skillAtomsAbsolute} />
        </div>

       
      </section>
    </div>
  );
}

export default App;