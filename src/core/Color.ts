// import { interpolate } from '../utils/bezier';
// import { getPath } from '../utils/paths';
// import { getEasing } from '../utils/easing';

import { Matrix } from "../np";
import { types } from "./utils/arrays";

function clip(ini: number, fin: number, val: number ): number {
  return Math.max(ini, Math.min(fin, ~~val));
}

function adjust(val: number): number {
  return clip(0, 255, val);
}

export class Color {
  color: Matrix;
  constructor(a?: number | string | Color, b?: number, c?: number, d?: number | string, e?: string) {

    if ( a instanceof Color ) {
      this.color = a.color.clone();
      return this;
    }

    let tp = types([ a, b, c, d, e ]);

    this.color = Matrix.random(1, 4).multiply(255);
    this.color.set(0, 0, adjust( this.color.get(0, 0) ) );
    this.color.set(0, 1, adjust( this.color.get(0, 1) ) );
    this.color.set(0, 2, adjust( this.color.get(0, 2) ) );
    this.color.set(0, 3, 1);

    switch( tp ) {
      case 'nnnns': {
        if ( (<string>e).match(/cmyk/i) ) {
          this.fromCMYK(<number>a, <number>b, <number>c, <number>d);
        } else if ( (<string>e).match(/rgba/i) ) {
          this.fromRGBA(<number>a, <number>b, <number>c, <number>d);
        } else {
          throw new TypeError(`Unknown format color ${e}`);
        }
        break;
      }
      case 'nnnnu': {
        this.fromRGBA(<number>a, <number>b, <number>c, <number>d);
        break;
      }
      case 'nnnsu': {
        if ( (<string>d).match(/cmy/i) ) {
          // this.fromCMYK(a, b, c, 1);
        } else if ( (<string>d).match(/ryb/i) ) {
          // this.fromRYB(a, b, c);
        } else if ( (<string>d).match(/hsv/i) ) {
          // this.fromHSV(a, b, c);
        } else {
          throw new TypeError(`Unknown format color ${e}`);
        }
        break;
      }
      case 'nnnuu': {
        this.fromRGB(<number>a, <number>b, <number>c);
        break;
      }
      case 'suuuu': {
        this.fromString(<string>a);
        break;
      }
      case 'uuuuu': {
        /// Allow for random generation
        break;
      }
      default: {
        console.log('Invalid parameters: ', arguments);
        // throw new TypeError(`Invalid parameters`);
      }
    }
  }

  set(k: number, v: number) {
    this.color.set(0, k, v);
  }

  fromCMYK(C: number, M: number, Y: number, K: number) {
    throw new ReferenceError('CMYK not supported yet');
  }

  fromRGB(r: number, g: number, b: number) {
    this.color.set(0, 0, adjust(r));
    this.color.set(0, 1, adjust(g));
    this.color.set(0, 2, adjust(b));
  }

  fromRGBA(r: number, g: number, b: number, a: number) {
    this.fromRGB(r, g, b);
    this.color.set(0, 3, clip(0, 1, a));
  }

  fromString(s: string) {
    let rgbaReg = /$rgba\(([0-9]*),([0-9]*),([0-9]*),([0-9]*)\)$/;
    let rgbReg = /^rgb\(([0-9]*),([0-9]*),([0-9]*)\)$/;
    let str = s.replace(/\s/g, '');

    if ( rgbaReg.test(str) ) {
      let a = str.replace(rgbaReg, '$1 $2 $3 $4').split(' ').map(Number);
      this.fromRGBA(a[0], a[1], a[2], a[3]);
    } else if ( rgbReg.test(str) ) {
      let a = str.replace(rgbReg, '$1 $2 $3').split(' ').map(Number);
      this.fromRGB(a[0], a[1], a[2]);
    } else {
      throw new TypeError('String format other than rgb() or rgba() not supported yet');
    }
  }

  // interpolate(col, alpha, easing) {
    // let pathType = getPath('straight_path');
    // let easingType = ( typeof easing === 'function' ) ? easing : getEasing(easing);
    // let temp = interpolate(this.color, col.color, alpha, easingType, pathType).tolist();
    // temp = temp.map((e, p) => ((p < 3) ? adjust(e) : e));
    // temp[3] = nj.clip(temp[3], 0, 1).get(0);
    // this.color = nj.array(temp);
    // return this;
  // }

  clone() {
    let res = new Color(0, 0, 0);
    res.color = this.color.clone();
    return res;
  }

  toHex() {
    let temp = this.color.data[0];
    temp[3] = adjust(temp[3] * 255);
    let res = temp.map(e => ('00' + e.toString(16)).substr(-2, 2));
    return '#' + res.join('');
  }
}