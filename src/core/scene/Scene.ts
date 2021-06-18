import { Shape } from "../geometries";

export class Scene extends Shape {
  cnv: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  paused: boolean;
  constructor(x1: number, y1: number, x2: number, y2: number, cw: number, ch: number) {
    super();
    this.cnv = document.createElement('canvas');
    this.cnv.width = cw;
    this.cnv.height = ch;
    this.ctx = <CanvasRenderingContext2D> this.cnv.getContext('2d');
    this.paused = true;
  }

  add(s: Shape) {
    if ( s === this ) {
      return ReferenceError("A shape can't be it's own child");
    }
    this.subShape.push(s);
  }

  pause() {
    this.paused = true;
  }

  resume() {
    this.paused = false;
  }

  draw() {
    if ( !this.paused ) {
      return;
    }

    let subshapes = this.getAllShapes();
    let ctx = this.ctx;

    ctx.fillStyle = 'transparent';
    ctx.strokeStyle = "2px solid black";

    let drawLoop = () => {
      for (let i = 0, maxi = subshapes.length; i < maxi; i += 1) {
        let pts = subshapes[i].points;

        if ( pts.length > 0 ) {
          ctx.beginPath();
          ctx.moveTo(pts[0].x, pts[0].y);

          for (let j = 1, maxj = pts.length; j < maxj; j += 1) {
            ctx.lineTo(pts[j].x, pts[j].y);
          }

          ctx.stroke();
        }
      }

      !this.paused && window.requestAnimationFrame(drawLoop);
    }
  }
}