import { Border } from "../Border";
import { Color } from "../Color";
import { Vector3D } from "../Vector3D";

export abstract class Shape {
  subShape: Shape[];
  points: Vector3D[];
  color: Color;
  border: Border;
  fill: Color;

  constructor() {
    this.subShape = [];
    this.points = [];
    this.color = new Color();
    this.border = new Border();
    this.fill = new Color();
  }

  getAllShapes(): Shape[] {
    let res: Shape[] = this.subShape.reduce((acc: Shape[], s) => [ ...acc, ...s.getAllShapes() ], []);
    res.unshift(this);
    return res;
  }
}