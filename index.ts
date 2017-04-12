let storage = {};

export function SimpleTag(tag: string) {
  return function decorator(target: any) {
    storage[tag] = storage[tag] || new WeakSet();
    storage[tag].add(target);
  };
}
export function SimpleObjectTag(tag: string) {
  return function decorator(target: any): any {
    let ctor: Function = function () {
      storage[tag] = storage[tag] || new WeakSet();
      storage[tag].add(this);
    };

    ctor.prototype = Object.create(target.prototype);
    ctor.prototype.constructor = target;
    return ctor;
  }
}
@SimpleTag('classes')
@SimpleObjectTag('tagged')
class Foo1 {

  public test1: number;
}

@SimpleTag('classes')
@SimpleObjectTag('tagged')
class Foo2 {

  public test2: number;
}

@SimpleTag('classes')
class Foo3 {

  public test2: number;
}

//

console.log(storage);

// let foo1Constructor = storage['classes'].get;
// let foo2Constructor = storage['classes'][1];

// console.log((new foo1Constructor()) instanceof Foo1);
console.log((new Foo1()) instanceof Foo1);
// console.log((new foo2Constructor()) instanceof Foo2);
console.log((new Foo2()) instanceof Foo2);

new Foo2();
new Foo2();

console.log(storage);

storage['classes'].forEach((item) => {
  console.log(item);
});
