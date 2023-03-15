import { ReactElement, useCallback, useEffect, useRef } from 'react';
import { CanvasContainer } from './Resume.styles';
import { SkyCanvasInterface } from './types';

interface Circle {
  color: number;
  left: number;
  top: number;
  size: number;
  leftSpeed: number;
  topSpeed: number;
  expandState: boolean;
}

class DaySkyCanvas implements SkyCanvasInterface {
  ctx;
  width = 0;
  height = 0;
  circles: Circle[] = [];
  private config = {
    opacity: 0.6,
    numCircles: 30,
    minSpeed: -2,
    maxSpeed: 2,
    size: {
      min: 1,
      max: 10,
    },
    expandState: true,
  };
  private colors = [
    `rgba(255, 223, 109, ${this.config.opacity})`,
    `rgba(158, 227, 251, ${this.config.opacity})`,
    `rgba(209, 209, 209, ${this.config.opacity})`,
    `rgba(13, 182, 88, ${this.config.opacity})`,
    `rgba(137, 2, 93, ${this.config.opacity})`,
  ];

  private frameId = 0;

  constructor(readonly canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')!;
    this.init();
    this.createCircles();

    window.addEventListener('resize', this.init.bind(this));
  }

  private init(): void {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  createCircles(): void {
    const { colors, width, height } = this;
    const {
      expandState,
      maxSpeed,
      minSpeed,
      numCircles,
      size: { min, max },
    } = this.config;
    const circles = [];

    for (let i = 0; i < numCircles; i++) {
      const color = Math.floor(Math.random() * colors.length) + 1;
      const left = Math.floor(Math.random() * (width + 1));
      const top = Math.floor(Math.random() * (height + 1));
      const size = Math.floor(Math.random() * (max - min + 1)) + min;

      let leftSpeed =
        (Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed) / 10;
      let topSpeed =
        (Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed) / 10;

      while (leftSpeed === 0 || topSpeed === 0) {
        leftSpeed =
          (Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed) /
          10;
        topSpeed =
          (Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed) /
          10;
      }

      const circle: Circle = {
        color,
        left,
        top,
        size,
        leftSpeed,
        topSpeed,
        expandState,
      };
      circles.push(circle);
    }

    this.circles = circles;
  }

  private updateCircleLeft(circle: Circle, width: number): void {
    if (circle.left > width + circle.size) {
      circle.left = 0 - circle.size;
    } else if (circle.left < 0 - circle.size) {
      circle.left = width + circle.size;
    } else {
      circle.left = circle.left + circle.leftSpeed;
    }
  }

  private updateCircleTop(circle: Circle, height: number): void {
    if (circle.top > height + circle.size) {
      circle.top = 0 - circle.size;
    } else if (circle.top < 0 - circle.size) {
      circle.top = height + circle.size;
    } else {
      circle.top = circle.top + circle.topSpeed;
    }
  }

  private updateCircleSize(circle: Circle): void {
    const { min, max } = this.config.size;
    if (
      circle.size < max &&
      circle.size > min &&
      circle.expandState === false
    ) {
      circle.size = circle.size - 0.01;
    } else if (
      circle.size < max &&
      circle.size > min &&
      circle.expandState === true
    ) {
      circle.size = circle.size + 0.01;
    } else if (circle.size >= max && circle.expandState === true) {
      circle.expandState = false;
      circle.size = circle.size - 0.01;
    } else if (circle.size <= min && circle.expandState === false) {
      circle.expandState = true;
      circle.size = circle.size + 0.01;
    }
  }

  renderCircles(): void {
    const { circles, colors, ctx, width, height } = this;

    circles.forEach((curCircle) => {
      ctx.fillStyle = colors[curCircle.color - 1];
      ctx.beginPath();

      this.updateCircleLeft(curCircle, width);
      this.updateCircleTop(curCircle, height);
      this.updateCircleSize(curCircle);

      ctx.arc(
        curCircle.left,
        curCircle.top,
        curCircle.size,
        0,
        2 * Math.PI,
        false
      );

      ctx.closePath();
      ctx.fill();
    });
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

    this.renderCircles();

    this.frameId = requestAnimationFrame(this.render.bind(this));
  }
}

export const DayBackground = (): ReactElement => {
  const canvas = useRef<DaySkyCanvas | null>(null);
  const skyCanvasRefCallback = useCallback((node: HTMLCanvasElement | null) => {
    if (node) {
      canvas.current = new DaySkyCanvas(node);
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
