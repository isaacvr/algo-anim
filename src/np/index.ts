export class Matrix {
  shape: number[];
  data: number[][];
  constructor(n: number, m: number, f?: Function) {
    this.shape = [n || 1, m || 1];
    this.data = [];

    this.init(f || (() => 0) );
  }

  private init(f: Function) {
    this.data.length = 0;
    let n = this.shape[0];
    let m = this.shape[1];
    
    for (let i = 0; i < n; i += 1) {
      let row = [];
      for (let j = 0; j < m; j += 1) {
        row.push( f(i, j) );
      }
      this.data.push(row);
    }
  }

  static zeros(n: number, m: number) {
    return new Matrix(n, m);
  }

  static ones(n: number, m: number) {
    return new Matrix(n, m, () => 1);
  }

  static iden(n: number, m: number) {
    return new Matrix(n, m, (x: number, y: number) => x === y ? 1 : 0 );
  }

  static random(n: number, m: number) {
    return new Matrix(n, m, () => Math.random());
  }

  get(i: number, j: number): number {
    return this.data[i][j];
  }

  set(i: number, j: number, v: number): number {
    return (this.data[i][j] = v);
  }

  clone() {
    let res = new Matrix(this.shape[0], this.shape[1]);
    res.data = this.data.map(r => r.map(e => e));
    return res;
  }

  add(m: Matrix): Matrix {
    if ( this.shape[0] === m.shape[0] && this.shape[1] === m.shape[1] ) {
      return new Matrix(this.shape[0], this.shape[1], (i: number, j: number) => this.data[i][j] + m.data[i][j]);
    } else {
      throw new TypeError("Can't add two matrices with shapes " + this.shapeStr() + " and " + m.shapeStr());
    }
  }

  sub(m: Matrix): Matrix {
    if ( this.shape[0] === m.shape[0] && this.shape[1] === m.shape[1] ) {
      return new Matrix(this.shape[0], this.shape[1], (i: number, j: number) => this.data[i][j] - m.data[i][j]);
    } else {
      throw new TypeError("Can't add matrices with shapes " + this.shapeStr() + " and " + m.shapeStr());
    }
  }

  private matrixMul(m: Matrix): Matrix {
    if ( this.shape[1] === m.shape[0] ) {
      let res = new Matrix(this.shape[0], m.shape[1]);
      
      for (let i = 0, maxi = this.shape[0]; i < maxi; i += 1) {
        for (let j = 0, maxj = m.shape[1]; j < maxj; j += 1) {
          for (let k = 0, maxk = this.shape[1]; k < maxk; k += 1) {
            res.data[i][j] += this.data[i][k] * m.data[k][j];
          }
        }
      }

      return res;
    } else {
      throw new TypeError("Can't multiply matrices with shapes " + this.shapeStr() + " and " + m.shapeStr());
    }
  }

  multiply(n: number | Matrix): Matrix {
    if ( typeof n === 'number' ) {
      return new Matrix(this.shape[0], this.shape[1], (i: number, j: number) => this.data[i][j] * n);
    }
    return this.matrixMul(n);
  }

  shapeStr() {
    return `(${ this.shape.join(', ') })`;
  }
}