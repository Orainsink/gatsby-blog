import gsap from 'gsap';
import { useEffect } from 'react';

export const useAnimation = () => {
  useEffect(() => {
    const leftLineTween = gsap.to('div[data-line="left"]', {
      height: '100%',
      duration: 0.5,
      stagger: 0.2,
    });
    const rightLineTween = gsap.to('div[data-line="right"]', {
      height: '100%',
      duration: 0.3,
      stagger: 0.2,
    });
    const bottomLineTween = gsap.to('div[data-line="bottom"]', {
      width: '100%',
      duration: 0.5,
      stagger: 0.2,
    });
    const topLineTween = gsap.to('div[data-line="top"]', {
      width: '100%',
      duration: 0.3,
      stagger: 0.2,
    });

    const leftColumnTween = gsap.to('div[data-column]', {
      keyframes: [
        {
          top: 40,
          ease: 'power2.out',
          delay: 1,
        },
        {
          top: -20,
          ease: 'power2.out',
          delay: 1,
        },
        {
          top: -90,
          ease: 'power2.out',
          delay: 1,
        },
        {
          top: 40,
          ease: 'power2.out',
          delay: 1,
        },
      ],
      repeat: -1,
    });

    const textLineTween = gsap.to('div[data-text]', {
      width: (_, target) =>
        target.dataset.text === 'incomplete' ? '60%' : '100%',
      duration: 0.6,
      stagger: 0.2,
      delay: 2,
    });

    const nodeTween = gsap.to('div[data-node]', {
      top: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.3,
    });

    return () => {
      leftLineTween.kill();
      rightLineTween.kill();
      bottomLineTween.kill();
      topLineTween.kill();
      leftColumnTween.kill();
      textLineTween.kill();
      nodeTween.kill();
    };
  }, []);
};
