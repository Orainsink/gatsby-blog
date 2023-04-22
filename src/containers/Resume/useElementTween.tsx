import gsap from 'gsap';
import { useEffect } from 'react';

export const useElementTween = () => {
  useEffect(() => {
    const eleTween = gsap.to('*[data-el]', {
      opacity: 1,
      transform: 'translateY(0)',
      stagger: 0.3,
    });

    return () => {
      eleTween.kill();
    };
  }, []);
};
