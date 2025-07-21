// src/App.jsx
import React from 'react';
import './index.css'; // Importa tu CSS global (contiene html, body, #root)

// Importa los módulos CSS para este componente
import styles from './App.module.css';

// Importaciones de otros componentes
import AnimatedText from './components/AnimatedText';
import HeroAvatar from './components/HeroAvatar';
import SkillAtoms from './components/SkillAtoms';
import CyclingText from './components/CyclingText';

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

      {/* Primera Sección: Hero Section (ahora en dos columnas) */}
      <section style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'row', // <<< CAMBIO CLAVE: Volvemos a 'row' para dos columnas
        alignItems: 'stretch', // Asegura que las columnas hijas ocupen toda la altura
        justifyContent: 'space-between', // Distribuye el espacio entre las columnas
        padding: '20px', // Mantenemos padding general para la sección
        position: 'relative', // Necesario para posicionar elementos absolutamente dentro de ella si fuera el caso
        backgroundColor: '#1a1a1a',
        zIndex: 10,
      }}>

        {/* --- Columna Izquierda: Título Vertical y Descripción Dinámica --- */}
        <div style={{
          flex: 1, // Ocupa la mitad del espacio disponible
          minWidth: 0, // Importante para Flexbox
          display: 'flex',
          flexDirection: 'column', // Contenido de esta columna en vertical
          justifyContent: 'center', // Centra el contenido verticalmente
          alignItems: 'center', // Centra el contenido horizontalmente
          paddingRight: '20px', // Espacio entre columnas
        }}>
          {/* Contenedor para el Título Vertical (MagupeDev) */}
          <div className={styles.verticalTitleWrapper}> {/* Usaremos esta clase para rotar */}
            <AnimatedText
              text="MagupeDev"
              className={styles.heroTitle}
              type="char"
              delay={0.03}
            />
          </div>

          {/* Contenedor para el Subtítulo Vertical (Desarrollador Front-End) */}
          <div className={styles.verticalSubtitleWrapper}> {/* Usaremos esta clase para rotar */}
            <AnimatedText
              text="Desarrollador Front-End | Entusiasta UI/UX"
              className={styles.heroSubtitle}
              type="word"
              delay={0.08}
            />
          </div>

          {/* Manifiesto Dinámico (CyclingText) */}
          <div style={{ marginTop: '40px', maxWidth: '80%' }}> {/* Espacio y ancho para el CyclingText */}
            <CyclingText
              phrases={manifestoPhrases}
              interval={4000}
              className={styles.heroDescription}
            />
          </div>
        </div>

        {/* --- Columna Derecha: Avatar y Skills --- */}
        <div style={{
          flex: 1, // Ocupa la otra mitad del espacio disponible
          minWidth: 0, // Importante para Flexbox
          display: 'flex',
          justifyContent: 'center', // Centra el avatar horizontalmente
          alignItems: 'center',    // Centra el avatar verticalmente
          position: 'relative',    // <<< ¡CRÍTICO! SkillAtoms se posicionará absolutamente dentro de este div
          paddingLeft: '20px', // Espacio entre columnas
        }}>
          <HeroAvatar className={styles.heroAvatar} />

          {/* Animación de los átomos de skills (posicionamiento absoluto dentro de esta columna) */}
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
