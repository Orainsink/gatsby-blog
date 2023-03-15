import { useCallback, useEffect, useRef } from 'react';
import { CanvasContainer } from './Resume.styles';

interface Circle {
  color: number;
  left: number;
  top: number;
  size: number;
  leftSpeed: number;
  topSpeed: number;
  expandState: boolean;
}

interface DaySkyCanvasInterface {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  circles: Circle[];
  width: number;
  height: number;

  render(): void;
  stop(): void;
}

class DaySkyCanvas implements DaySkyCanvasInterface {
  ctx;
  width = 0;
  height = 0;
  circles: Circle[] = [];
  // SETTINGS
  private opacity = 0.6;
  private colors = [
    'rgba(22, 255, 255,' + this.opacity + ')',
    'rgba(22, 240, 255,' + this.opacity + ')',
    'rgba(22, 255, 240,' + this.opacity + ')',
    'rgba(22, 240, 255,' + this.opacity + ')',
    'rgba(22, 240, 240,' + this.opacity + ')',
  ];
  private minSize = 1; // the minimum size of the circles in px
  private maxSize = 10; // the maximum size of the circles in px
  private numCircles = 30; // the number of circles
  private minSpeed = -2; // the minimum speed, recommended: -maxspeed
  private maxSpeed = 2; // the maximum speed of the circles
  private expandState = true; // the direction of expansion
  private xVal = 0;
  private frameId = 0;

  constructor(readonly canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')!;
    this.init();

    window.addEventListener('resize', this.init.bind(this));
  }

  private init() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.createCircles();
  }

  createCircles() {
    const circles = [];

    for (let i = 0; i < this.numCircles; i++) {
      const color =
        Math.floor(Math.random() * (this.colors.length - 1 + 1)) + 1;
      const left = Math.floor(Math.random() * (this.width - 0 + 1)) + 0;
      const top = Math.floor(Math.random() * (this.height - 0 + 1)) + 0;
      const size =
        Math.floor(Math.random() * (this.maxSize - this.minSize + 1)) +
        this.minSize;
      const expandState = this.expandState;

      let leftSpeed =
        (Math.floor(Math.random() * (this.maxSpeed - this.minSpeed + 1)) +
          this.minSpeed) /
        10;
      let topSpeed =
        (Math.floor(Math.random() * (this.maxSpeed - this.minSpeed + 1)) +
          this.minSpeed) /
        10;

      while (leftSpeed === 0 || topSpeed === 0) {
        leftSpeed =
          (Math.floor(Math.random() * (this.maxSpeed - this.minSpeed + 1)) +
            this.minSpeed) /
          10;
        topSpeed =
          (Math.floor(Math.random() * (this.maxSpeed - this.minSpeed + 1)) +
            this.minSpeed) /
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

  build() {
    const { circles } = this;

    circles.forEach((curCircle) => {
      this.ctx.fillStyle = this.colors[curCircle.color - 1];

      this.ctx.beginPath();
      if (curCircle.left > this.width + curCircle.size) {
        curCircle.left = 0 - curCircle.size;
        this.ctx.arc(
          curCircle.left,
          curCircle.top,
          curCircle.size,
          0,
          2 * Math.PI,
          false
        );
      } else if (curCircle.left < 0 - curCircle.size) {
        curCircle.left = this.width + curCircle.size;
        this.ctx.arc(
          curCircle.left,
          curCircle.top,
          curCircle.size,
          0,
          2 * Math.PI,
          false
        );
      } else {
        curCircle.left = curCircle.left + curCircle.leftSpeed;
        this.ctx.arc(
          curCircle.left,
          curCircle.top,
          curCircle.size,
          0,
          2 * Math.PI,
          false
        );
      }

      if (curCircle.top > this.height + curCircle.size) {
        curCircle.top = 0 - curCircle.size;
        this.ctx.arc(
          curCircle.left,
          curCircle.top,
          curCircle.size,
          0,
          2 * Math.PI,
          false
        );
      } else if (curCircle.top < 0 - curCircle.size) {
        curCircle.top = this.height + curCircle.size;
        this.ctx.arc(
          curCircle.left,
          curCircle.top,
          curCircle.size,
          0,
          2 * Math.PI,
          false
        );
      } else {
        curCircle.top = curCircle.top + curCircle.topSpeed;
        if (
          curCircle.size !== this.maxSize &&
          curCircle.size !== this.minSize &&
          curCircle.expandState === false
        ) {
          curCircle.size = curCircle.size - 0.1;
        } else if (
          curCircle.size !== this.maxSize &&
          curCircle.size !== this.minSize &&
          curCircle.expandState === true
        ) {
          curCircle.size = curCircle.size + 0.1;
        } else if (
          curCircle.size === this.maxSize &&
          curCircle.expandState === true
        ) {
          curCircle.expandState = false;
          curCircle.size = curCircle.size - 0.1;
        } else if (
          curCircle.size === this.minSize &&
          curCircle.expandState === false
        ) {
          curCircle.expandState = true;
          curCircle.size = curCircle.size + 0.1;
        }
        this.ctx.arc(
          curCircle.left,
          curCircle.top,
          curCircle.size,
          0,
          2 * Math.PI,
          false
        );
      }

      this.ctx.closePath();
      this.ctx.fill();
      // this.ctx.ellipse;
    });
  }

  render() {
    // clear the canvas
    this.ctx.clearRect(0, 0, this.width, this.height);

    // draw the next frame
    this.xVal++;
    this.build();

    // request a new frame
    this.frameId = requestAnimationFrame(this.render.bind(this));
  }

  stop(): void {
    window.removeEventListener('resize', this.init);
    cancelAnimationFrame(this.frameId);
  }
}

export const DayBackground = () => {
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
