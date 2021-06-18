import { Vector3D } from "../Vector3D";
import { Shape } from "./Shape";

export class Point extends Shape {
  constructor(x: number, y: number, z: number) {
    super();
    this.points.push( new Vector3D(x, y, z) );
  }
}