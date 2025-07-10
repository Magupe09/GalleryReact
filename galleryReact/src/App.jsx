// src/App.jsx
import React from 'react';
import './index.css'; // Importa tu CSS global

// Importaciones corregidas: asumiendo que los componentes están directamente en src/components/
import AnimatedText from './components/AnimatedText';
import HeroAvatar from './components/HeroAvatar';

function App() {
  return (
    // Contenedor principal que define la altura total de la página para el scroll
    // 3 secciones * 100vh = 300vh
    <div className="main-scroll-container" style={{
      height: '300vh', // Altura total de la página para permitir el scroll
      //position: 'relative', // Necesario para que 'position: sticky' en las secciones funcione correctamente
      // Puedes añadir un color de fondo general aquí si no quieres que las secciones se superpongan visualmente al inicio
      // backgroundColor: '#0d0d0d',
    }}>

      {/* Primera Sección: Hero Section */}
      <section style={{
        height: '100vh', // Ocupa el 100% de la altura de la ventana visible
        width: '100%',
        display: 'flex',
        flexDirection: 'row', // Divide la sección en dos columnas (avatar y texto)
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
       // position: 'sticky', // Hace que esta sección se "pegue" en la parte superior
       // top: 0,              // Se pega en la parte superior del viewport
        backgroundColor: '#1a1a1a', // Color de fondo para la primera sección
        zIndex: 10, // Asegura que esté por encima de posibles fondos dinámicos si los añades
      }}>
        {/* Mitad izquierda para el Avatar */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <HeroAvatar className="hero-avatar" />
        </div>

        {/* Mitad derecha para el Perfil y Texto */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', paddingLeft: '40px' }}>
          <AnimatedText
            text="Mauricio Gualteros Pereira"
            className="hero-title"
            type="char" // Animar por carácter
            delay={0.03}
          />
          <AnimatedText
            text="Desarrollador Full-Stack | Entusiasta UI/UX"
            className="hero-subtitle"
            type="word" // Animar por palabra
            delay={0.08}
          />
          {/* Aquí irá la animación de los átomos de skills más adelante */}
        </div>
      </section>

      {/* Segunda Sección: Proyectos */}
      <section style={{
        height: '100vh', // Ocupa el 100% de la altura de la ventana visible
        width: '100%',
        backgroundColor: '#2a2a2a', // Color de fondo diferente para esta sección
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white', // Color de texto para esta sección
        zIndex: 9, // Menor que la Hero Section para que se deslice por debajo
      }}>
        <h2>Sección de Proyectos (Mundo 2)</h2>
        {/* Aquí irán tus ProjectCards */}
      </section>

      {/* Tercera Sección: Contacto/Experiencia */}
      <section style={{
        height: '100vh', // Ocupa el 100% de la altura de la ventana visible
        width: '100%',
        backgroundColor: '#3a3a3a', // Otro color de fondo diferente
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white', // Color de texto para esta sección
        zIndex: 8, // Menor que la sección de proyectos
      }}>
        <h2>Sección 3 (Mundo 3 - Contacto/Experiencia)</h2>
        {/* Aquí irá tu contenido final */}
      </section>
    </div>
  );
}

export default App;
