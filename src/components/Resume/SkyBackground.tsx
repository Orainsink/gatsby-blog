import { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';

const CanvasContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  canvas {
    width: 100%;
    height: 100%;
  }
`;

interface Star {
  x: number;
  y: number;
  r: number;
}

interface SkyCanvasInterface {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  stars: Star[];
  width: number;
  height: number;

  render(timestamp?: number): void;
  stop(): void;
}

class SkyCanvas implements SkyCanvasInterface {
  stars: Star[] = [];
  ctx;
  width;
  height;
  private counter = 0;
  private readonly backgroundColor = '#141619';
  private readonly maxStarRadius = 1.8;
  private readonly spacing = 70;
  private prevTime = 0;
  private frameId = 0;
  private readonly opacity = {
    min: 0.1,
    max: 0.7,
  };

  constructor(readonly canvas: HTMLCanvasElement) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.init();
    this.ctx = canvas.getContext('2d')!;

    window.addEventListener('resize', this.init.bind(this));

    this.createStars();
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

    for (let x = 0; x < this.width; x += this.spacing) {
      for (let y = 0; y < this.height; y += this.spacing) {
        const star = {
          x: x + this.randomInt(this.spacing),
          y: y + this.randomInt(this.spacing),
          r: Math.random() * this.maxStarRadius,
        };
        stars.push(star);
      }
    }
    this.stars = stars;
  }

  private fillCircle({ x, y, r }: Star, fillStyle: string): void {
    this.ctx.beginPath();
    this.ctx.fillStyle = fillStyle;
    this.ctx.arc(x, y, r, 0, Math.PI * 2);
    this.ctx.fill();
  }

  private renderMoon() {
    const color = '#fea';
    const moon = {
      x: this.height / 3,
      y: this.width / 3,
      r: 40,
    };

    this.fillCircle(moon, color);
    // render a smaller circle above the moon to give it that well-known moon-shape
    this.fillCircle(
      {
        x: moon.x - moon.r / 3,
        y: moon.y - moon.r / 3,
        r: moon.r,
      },
      this.backgroundColor
    );
  }

  private getOpacity(factor: number): number {
    const { min, max } = this.opacity;
    const opacityIncrement = (max - min) * Math.abs(Math.sin(factor));
    const opacity = min + opacityIncrement;
    return opacity;
  }

  stop(): void {
    window.removeEventListener('resize', this.init);
    cancelAnimationFrame(this.frameId);
  }

  render(timestamp = 0): void {
    const interval = timestamp - this.prevTime;

    if (interval > 500) {
      this.prevTime = timestamp;

      this.ctx.fillRect(0, 0, this.width, this.height);
      this.stars.forEach((star, i) => {
        const factor = this.counter * i;
        const opacity = this.getOpacity(factor);
        this.fillCircle(star, `rgba(255, 255, 255, ${opacity}`);
      });
      this.renderMoon();
      this.counter = this.counter + 1;
    }

    this.frameId = requestAnimationFrame(this.render.bind(this));
  }
}

export const SkyBackground = () => {
  const canvas = useRef<SkyCanvas | null>(null);
  const skyCanvasRefCallback = useCallback((node: HTMLCanvasElement | null) => {
    if (node) {
      canvas.current = new SkyCanvas(node);
      canvas.current.render();
    }
  }, []);

  useEffect(() => {
    return () => canvas.current?.stop();
  }, []);

  return (
    <CanvasContainer>
      <canvas id="sky-canvas" ref={skyCanvasRefCallback}></canvas>
    </CanvasContainer>
  );
};
