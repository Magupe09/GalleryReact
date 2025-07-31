import React from 'react';
import styles from './ProyectsModal.module.css';

// Datos de proyectos de ejemplo
const projects = [
  { id: 1, title: 'Project: Gemini', year: '2023', poster: 'https://placehold.co/400x600/1a1a1a/cccccc?text=Project: Gemini' },
  { id: 2, title: 'Quantum Leap', year: '2022', poster: 'https://placehold.co/400x600/1a1a1a/cccccc?text=Quantum+Leap' },
  { id: 3, title: 'Web Weaver', year: '2021', poster: 'https://placehold.co/400x600/1a1a1a/cccccc?text=Web+Weaver' },
  { id: 4, title: 'Infinite Scroll', year: '2020', poster: 'https://placehold.co/400x600/1a1a1a/cccccc?text=Infinite+Scroll' },
  { id: 5, title: 'Pixel Perfect', year: '2019', poster: 'https://placehold.co/400x600/1a1a1a/cccccc?text=Pixel+Perfect' },
  { id: 6, title: 'Code Odyssey', year: '2018', poster: 'https://placehold.co/400x600/1a1a1a/cccccc?text=Code+Odyssey' },
];

/**
 * Componente ProjectsModal: Un modal que muestra proyectos en formato de póster.
 * @param {object} props - Propiedades del componente.
 * @param {function} props.onClose - Función para cerrar el modal.
 */
function ProjectsModal({ onClose }) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2 className={styles.modalTitle}>Proyectos</h2>
        <div className={styles.projectsGrid}>
          {projects.map((project) => (
            <div key={project.id} className={styles.projectPoster}>
              <img src={project.poster} alt={`Poster de ${project.title}`} className={styles.posterImage} />
              <div className={styles.posterOverlay}>
                <h3 className={styles.posterTitle}>{project.title}</h3>
                <p className={styles.posterYear}>{project.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectsModal;
