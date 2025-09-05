import React, { useRef } from 'react';
import { useInView } from 'framer-motion';

function AnimatedSection({ children, className = '', ...rest }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });

  return (
    <section ref={ref} className={className} {...rest}>
      <span
        style={{
          transform: isInView ? 'none' : 'translateY(24px)',
          opacity: isInView ? 1 : 0,
          transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.15s',
          display: 'block',
        }}
      >
        {children}
      </span>
    </section>
  );
}

export default AnimatedSection;


