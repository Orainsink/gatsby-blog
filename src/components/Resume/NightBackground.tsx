import { ReactElement, useCallback, useEffect, useRef } from 'react';
import { CanvasContainer } from './Resume.styles';
import { SkyCanvasInterface } from './types';

interface Star {
  x: number;
  y: number;
  r: number;
  expandState: boolean;
  opacity: number;
}

class NightSkyCanvas implements SkyCanvasInterface {
  ctx;
  width = 0;
  height = 0;
  stars: Star[] = [];
  private config = {
    backgroundColor: '#141619',
    maxStarRadius: 1.8,
    spacing: 70,
    opacity: {
      min: 0.1,
      max: 0.7,
    },
  };
  private frameId = 0;

  constructor(readonly canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')!;
    this.init();

    window.addEventListener('resize', this.init.bind(this));
  }

  private init(): void {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.createStars();
  }

  private randomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

  private createStars(): void {
    const stars = [];
    const { width, height } = this;
    const {
      spacing,
      maxStarRadius,
      opacity: { min, max },
    } = this.config;

    for (let x = 0; x < width; x += spacing) {
      for (let y = 0; y < height; y += spacing) {
        const star = {
          x: x + this.randomInt(spacing),
          y: y + this.randomInt(spacing),
          r: Math.random() * maxStarRadius,
          expandState: Math.random() - 0.5 > 0,
          opacity: Math.random() * (max - min) + min,
        };
        stars.push(star);
      }
    }
    this.stars = stars;
  }

  private fillCircle(
    { x, y, r }: Pick<Star, 'x' | 'y' | 'r'>,
    fillStyle: string
  ): void {
    this.ctx.beginPath();
    this.ctx.fillStyle = fillStyle;
    this.ctx.arc(x, y, r, 0, Math.PI * 2);
    this.ctx.fill();
  }

  private renderMoon(): void {
    const color = '#fea';
    const moon = {
      x: this.height / 3,
      y: this.width / 3,
      r: 40,
    };

    this.fillCircle(moon, color);
    this.fillCircle(
      {
        x: moon.x - moon.r / 3,
        y: moon.y - moon.r / 3,
        r: moon.r,
      },
      this.config.backgroundColor
    );
  }

  private renderStars(): void {
    this.stars.forEach((star) => {
      this.updatedOpacity(star);
      this.fillCircle(star, `rgba(255, 255, 255, ${star.opacity}`);
    });
  }

  private updatedOpacity(star: Star) {
    const opacity = star.opacity;
    if (opacity >= 1) {
      star.opacity -= 0.01;
      star.expandState = false;
    } else if (opacity <= 0) {
      star.opacity += 0.01;
      star.expandState = true;
    } else {
      star.opacity = star.expandState
        ? star.opacity + 0.01
        : star.opacity - 0.01;
    }
  }

  stop(): void {
    window.removeEventListener('resize', this.init);
    cancelAnimationFrame(this.frameId);
  }

  clear(): void {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  render(): void {
    this.clear();

    this.renderStars();
    this.renderMoon();

    this.frameId = requestAnimationFrame(this.render.bind(this));
  }
}

export const NightBackground = (): ReactElement => {
  const canvas = useRef<NightSkyCanvas | null>(null);
  const skyCanvasRefCallback = useCallback((node: HTMLCanvasElement | null) => {
    if (node) {
      canvas.current = new NightSkyCanvas(node);
      canvas.current.render();
    }
  }, []);

  useEffect(() => {
    return () => canvas.current?.stop();
  }, []);

  return (
    <CanvasContainer>
      <canvas ref={skyCanvasRefCallback}></canvas>
    </CanvasContainer>
  );
};
