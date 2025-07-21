// src/App.jsx
import React from 'react';
import './index.css'; // Importa tu CSS global (contiene html, body, #root)

// Importa los módulos CSS para este componente
import styles from './App.module.css';

// Importaciones de otros componentes
import AnimatedText from './components/AnimatedText';
import HeroAvatar from './components/HeroAvatar';
import SkillAtoms from './components/SkillAtoms';

function App() {
  return (
    // Usa la clase del módulo CSS para el contenedor principal
    <div className={styles.mainScrollContainer} style={{
      // Las propiedades de altura y posición se mantienen aquí
      // ya que son específicas del layout del scroll
      height: '300vh',
      position: 'relative',
    }}>

      {/* Primera Sección: Hero Section (ahora en columna) */}
      <section style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column', // <<< CLAVE: Ahora es una columna
        alignItems: 'center',    // Centra el contenido horizontalmente en la columna
        justifyContent: 'center', // Centra el contenido verticalmente en la columna (ajustaremos con padding)
        padding: '20px',         // Mantenemos padding general para la sección
        position: 'relative',    // Necesario para posicionar SkillAtoms si fuera un hijo directo de section
        backgroundColor: '#1a1a1a',
        zIndex: 10,
      }}>

        {/* Contenedor para el Perfil y Texto (parte superior de la columna) */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Centra el texto en su propio contenedor
          justifyContent: 'flex-start', // Alinea el texto arriba en su propio contenedor
          paddingTop: '5vh', // Ajusta este valor para mover el texto hacia abajo desde el borde superior
          paddingBottom: '2vh', // Espacio entre el texto y el avatar/skills
          width: '100%', // Ocupa todo el ancho disponible en la columna
          maxWidth: '800px', // Limita el ancho del texto en pantallas grandes
        }}>
          <AnimatedText
            text="MagupeDev"
            className={styles.heroTitle}
            type="char"
            delay={0.03}
          />
          <AnimatedText
            text="Desarrollador Front-End | Entusiasta UI/UX"
            className={styles.heroSubtitle}
            type="word"
            delay={0.08}
          />
        </div>

        {/* Contenedor para el Avatar y los Skills (parte inferior de la columna) */}
        <div style={{
          position: 'relative', // ¡CRÍTICO! Hace que SkillAtoms se posicione absolutamente dentro de este div
          display: 'flex',
          justifyContent: 'flex-end', // Centra el avatar horizontalmente
          alignItems: 'center',    // Centra el avatar verticalmente
          width: '100%', // Ocupa todo el ancho disponible en la columna
          height: 'auto', // Se ajusta a la altura del avatar
          flexGrow: 1, // Permite que este div crezca y ocupe el espacio restante
          paddingTop: '20px', // Espacio superior para el avatar si es necesario
        }}>
          <HeroAvatar className={styles.heroAvatar} />

          {/* Animación de los átomos de skills (posicionamiento absoluto dentro de este div) */}
          {/* El className skillAtomsAbsolute ahora se ajustará a este nuevo contenedor */}
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
