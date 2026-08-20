'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

type Props = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export function AnimatedSection({ children, className = '', id }: Props) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const prefersReducedMotion = useReducedMotion();

  // O conteúdo nasce visível e só é escondido depois que o JS monta. Sem isto
  // o HTML do servidor sai com opacity:0 e, se o JS não rodar (falha de rede,
  // crawler, erro de hidratação), metade da página fica invisível para sempre.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // A animação vai na própria <section>. Antes havia um <span display:block>
  // entre a section e os filhos, o que colapsava qualquer grid/flex declarado
  // no className — as colunas viravam uma coluna só.
  const animate = mounted && !prefersReducedMotion;
  const hidden = animate && !isInView;

  return (
    <section
      ref={ref}
      id={id}
      className={className}
      style={
        animate
          ? {
              transform: hidden ? 'translateY(24px)' : 'none',
              opacity: hidden ? 0 : 1,
              transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.15s',
            }
          : undefined
      }
    >
      {children}
    </section>
  );
}
