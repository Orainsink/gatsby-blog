export interface SkyCanvasInterface {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;

  render(): void;
  stop(): void;
}
