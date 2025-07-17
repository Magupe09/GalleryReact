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

      {/* Primera Sección: Hero Section */}
      <section style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        
        justifyContent: 'space-between',
       // padding: '20px',
        // --- position: sticky y top: 0 se mantienen comentados para asegurar el scroll ---
        position: 'relative',
        // top: 0,
        // ----------------------------------------------------------------------------------
        backgroundColor: '#1a1a1a', // Color de fondo para la primera sección
        zIndex: 10,
      }}>
       
        {/* Mitad derecha para el Perfil y Texto */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '40px', paddingTop: '60px'}}>
          {/* Pasa las clases del módulo CSS a los componentes AnimatedText */}
          <AnimatedText
            text="MagupeDev"
            className={styles.heroTitle} // Usando la clase del módulo
            type="char"
            delay={0.03}
          />
          <AnimatedText
            text="Desarrollador Front-End | Entusiasta UI/UX"
            className={styles.heroSubtitle} // Usando la clase del módulo
            type="word"
            delay={0.08}
          />
        </div>
         {/* Mitad izquierda para el Avatar */}
         <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '10px 200px' }}>
          {/* Pasa la clase del módulo CSS al componente HeroAvatar */}
          <HeroAvatar className={styles.heroAvatar} />
        </div>
        
          {/* Aquí irá la animación de los átomos de skills más adelante */}
           {/* ¡Aquí va la animación de los átomos de skills! */}
           <SkillAtoms className={styles.skillAtomsAbsolute} />

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
        {/* Aquí irán tus ProjectCards */}
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
        {/* Aquí irá tu contenido final */}
      </section>
    </div>
  );
}

export default App;
