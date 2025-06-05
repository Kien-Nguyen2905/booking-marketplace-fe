import React from 'react';
import { motion } from 'motion/react';

const SectionImage = () => {
  return (
    <motion.div
      className="w-full h-[550px] overflow-hidden pt-10"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <motion.img
        className="w-full h-full object-cover"
        src="/images/banner2.jpg"
        alt="Featured accommodation"
        transition={{ duration: 0.7 }}
      />
    </motion.div>
  );
};

export default SectionImage;
