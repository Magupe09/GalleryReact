import React from 'react';
import { motion } from 'framer-motion';
//import styles from './AnimatedText.module.css'; // Importa el módulo CSS

function AnimatedText({ text, type = 'word', delay = 0.05, className = '' }) {
  const textArray = type === 'word' ? text.split(' ') : text.split('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay,
      },
    },
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 200,
      },
    },
  };

  return (
    // Usa la clase pasada por props, que ahora vendrá del módulo CSS de App.jsx
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {textArray.map((item, index) => (
        <motion.span
          key={index}
          variants={childVariants}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {item}
          {type === 'word' && index < textArray.length - 1 && ' '}
        </motion.span>
      ))}
    </motion.div>
  );
}

export default AnimatedText;
