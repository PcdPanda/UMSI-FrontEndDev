
let obj = {
    prop1: "value 1",
    prop2: "value 2"
}

console.log("obj.prop1:", obj.prop1);
let { prop1, prop2 } = obj;

obj.prop1 = "new value";
prop1 = "Anothew new value";

console.log("prop1:" , prop1);
console.log("obj.prop1:" , obj.prop1);

console.log("prop2:" , prop2);

function proper({prop1}) {
    console.log("in proper(), prop1:", prop1);
}
proper(obj);

function proper2(anObject) {
    let prop1 = anObject.prop1;
    console.log("in proper2(), prop1:", prop1);
}
proper2(obj);
