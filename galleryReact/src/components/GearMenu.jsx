import React from 'react';
import styles from './GearMenu.module.css';
import ProjectsModal from './ProjectsModal.jsx';

/**
 * Componente GearMenu: Botón con forma de engranaje de bicicleta.
 * @param {object} props - Propiedades del componente.
 * @param {function} props.onClick - Función que se ejecuta al hacer clic en el botón.
 */
function GearMenu({ onClick }) {

  return (
    <button className={styles.gearButton} onClick={onClick}>
      
      <svg
        className={styles.gearIcon}
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M25 5C14.7 5 6.4 13.3 6.4 23.6v.7c0 1.2.6 2.3 1.6 3l16.1 9.3c.9.5 2 .5 2.9 0l16.1-9.3c1-.6 1.6-1.8 1.6-3v-.7C43.6 13.3 35.3 5 25 5zm0 3.3c7.5 0 13.6 6.1 13.6 13.6v.7c0 .8-.4 1.5-1.1 1.9L25 35.4 12.5 29.5c-.7-.4-1.1-1.1-1.1-1.9v-.7c0-7.5 6.1-13.6 13.6-13.6zm0 4.1c-5.1 0-9.2 4.1-9.2 9.2s4.1 9.2 9.2 9.2 9.2-4.1 9.2-9.2-4.1-9.2-9.2-9.2z"
          fill="#00c6ff"
        />
      </svg>
      
    
    </button>
  );
}

export default GearMenu;
