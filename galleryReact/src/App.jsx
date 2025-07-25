// src/App.jsx
import React from 'react';
import './index.css';

import styles from './App.module.css';

import AnimatedText from './components/AnimatedText';
import HeroAvatar from './components/HeroAvatar';
import SkillAtoms from './components/SkillAtoms';
//import CyclingText from './components/CyclingText';
import DynamicManifest from './components/DynamicManifest';

function App() {
  const manifestoPhrases = [
    "Transformo ideas en código.",
    "Diseño experiencias intuitivas.",
    "La lógica se encuentra con el arte.",
    "Construyendo el futuro digital."
  ];

  return (
    <div className={styles.mainScrollContainer} style={{
      height: '300vh',
      position: 'relative',
    }}>

      <section style={{
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
          position: 'relative'
          
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

      {/* Segunda Sección: Proyectos */}
      <section style={{
        height: '100vh',
        width: '100%',
        backgroundColor: '#2a2a2a',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        zIndex: 9,
      }}>
        <h2>Sección de Proyectos (Mundo 2)</h2>
      </section>

      {/* Tercera Sección: Contacto/Experiencia */}
      <section style={{
        height: '100vh',
        width: '100%',
        backgroundColor: '#3a3a3a',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        zIndex: 8,
      }}>
        <h2>Sección 3 (Mundo 3 - Contacto/Experiencia)</h2>
      </section>
    </div>
  );
}

export default App;