function types(arr: any[]) {
  let res = [];

  for (let i = 0, maxi = arr.length; i < maxi; i += 1) {
    if ( Array.isArray(arr[i]) ) {
      res.push('a');
    } else switch( typeof arr[i] ) {
      case 'number':
      case 'string':
      case 'object':
      case 'undefined':
      case 'function': {
        res.push( ( typeof arr[i] )[0] );
        break;
      }
      default: {
        res.push('?');
        break;
      }
    }
  }

  return res.join('');
}

function range(a?: number, b?: number, s?: number) {

  let tp = types([a, b, s]);
  let ini: number, fin: number, step: number;

  if ( tp === 'uuu' ) {
    throw new ReferenceError('Range expected at least 1 argument, got 0.');
  } else if ( tp === 'nuu' ) {
    ini = 0, fin = <number>a, step = 1;
  } else if ( tp === 'nnu' ) {
    ini = <number>a, fin = <number>b, step = 1;
  } else if ( tp === 'nnn' ) {
    ini = <number>a, fin = <number>b, step = <number>s;
  } else {
    return [];
  }

  if ( step === 0 ) {
    throw new TypeError('Range step argument must not be zero');
  }

  if ( (step < 0 && ini <= fin) || (step > 0 && ini >= fin) ) {
    return [];
  }

  let ret = [];

  do {
    ret.push(ini);
    ini += step;
  } while( (step < 0 && ini > fin) || (step > 0 && ini < fin) );

  return ret;

}

function sum(arr: number[]) {
  return arr.reduce((acc, e) => acc + e, 0);
}

function equal(arr: any[], val: any) {
  return arr.map((e) => e === val ? 1 : 0);
}

function notEqual(arr: any[], val: any) {
  return arr.map((e) => e != val ? 1 : 0);
}

function gt(arr: any[], val: any) {
  return arr.map((e) => e > val ? 1 : 0);
}

function gte(arr: any[], val: any) {
  return arr.map((e) => e >= val ? 1 : 0);
}

function lt(arr: any[], val: any) {
  return arr.map((e) => e < val ? 1 : 0);
}

function lte(arr: any[], val: any) {
  return arr.map((e) => e <= val ? 1 : 0);
}

function list_update(l1: any[], l2: any[]) {
  return l1.filter(e => l2.indexOf(e) < 0).concat(l2);
}

export {
  types,
  range,
  sum,
  equal,
  notEqual,
  gt,
  gte,
  lt,
  lte,
  list_update
};