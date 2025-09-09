// src/App.jsx
import React, { useRef, useState, useEffect } from 'react';
import './index.css';

import styles from './App.module.css';

import AnimatedText from './components/AnimatedText';
import HeroAvatar from './components/HeroAvatar';
import SkillAtoms from './components/SkillAtoms';
//import CyclingText from './components/CyclingText';
import DynamicManifest from './components/DynamicManifest';
import AITerminal from './components/AITerminal';
import GearMenu from './components/GearMenu';
import ProjectsModal from './components/ProjectsModal';








function App() {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);


  const manifestoPhrases = [
    "Transformo ideas en código.",
    "Diseño experiencias intuitivas.",
    "La lógica se encuentra con el arte.",
    "Construyendo el futuro digital."
  ];

  // Referencia para la primera sección (Hero Section) para el scroll del engranaje
  const heroSectionRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);


  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    console.log('Estado del modal (isModalOpen):', isModalOpen);
  }, [isModalOpen]);
  // <<< FIN NUEVO >>
  

useEffect(() => {
  // Solo inicia la animación después de que la página esté completamente cargada
  const timer = setTimeout(() => setShowAnimation(true), 600);
  return () => clearTimeout(timer);
}, []);




  return (
    <div className={styles.mainContainer}>
      {/* --- EL BOTÓN DE ENGRANAJE QUE ABRE EL MODAL --- */}
      {/* Le pasamos la función handleOpenModal a la prop 'onClick' */}
      <GearMenu onClick={handleOpenModal} />

      {/* --- EL MODAL DE PROYECTOS QUE SE MUESTRA CONDICIONALMENTE --- */}
      {/* Solo se renderiza si isModalOpen es true, y le pasamos la función handleCloseModal */}
      {isModalOpen && <ProjectsModal onClose={handleCloseModal} />}



      <section
        ref={heroSectionRef}
        className={styles.heroSection}
      >



        <div className={styles.leftColumnGrid}>

          <div className={styles.column1}>
            {/* --- TÍTULO PRINCIPAL --- */}
            <div className={styles.titleBlock}>
              {showAnimation ? (
                <AnimatedText
                  text="MagupeDev"
                  className={styles.heroTitle}
                  type="char"
                  delay={0.03}
                />
              ) : (
                <div className={styles.heroTitle}>MagupeDev</div>
              )}
            </div>

            {/* --- SUBTÍTULO --- */}
            <div className={styles.subtitleBlock}>
              <AnimatedText
                text="Desarrollador Front-End | Entusiasta UI/UX"
                className={styles.heroSubtitle}
                type="word"
                delay={0.08}
              />
            </div>
          </div>
          {/* Segunda columna: Contenedor para los dos hijos restantes */}
          <div className={styles.column2}>

            {/* --- MANIFIESTO (opcional, al final) --- */}
            <div className={styles.manifestoBlock}>
              <DynamicManifest
                phrases={manifestoPhrases} // Le pasamos las frases
              />
            </div>
            {/* --- AI TERMINAL ---  */}
            <div className={styles.aiTerminalContainer}>
              <AITerminal />
            </div>
          





            {/* --- GEAR MENU --- */}
            <div className={styles.gearMenuContainer}>
              {/* GearMenu ya está fijo en la pantalla, pero aquí podemos agregar un espacio */}
            </div>

          </div>
        </div>
        <div className={styles.rightColumnGrid}>
          {/* --- HERO AVATAR --- */}
          <div className={styles.avatarContainer}>
            <HeroAvatar className={styles.heroAvatar} />
          </div>

          {/* --- SKILL ATOMS (justo encima del avatar) --- */}
          <div className={styles.skillAtomsContainer}>
            <SkillAtoms className={styles.skillAtomsAbsolute} />
          </div>

        </div>








      </section >
    </div >
  );
}

export default App;