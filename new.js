/*
 * @Author: Danylko
 * @Date: 2022-07-25 15:11:19
 * @LastEditors: Danylko
 * @LastEditTime: 2022-07-26 06:34:32
 * @Description: 手写new
 */


/**
 * @description: 
 * @param {*} Constr
 * @param {array} args
 * @return {*}
 */
function myNew(Constr, ...args) {
    if (typeof Constr !== 'function') {
        throw new TypeError(Constr + 'is not a constructor');
    } 
    const instance = {};
    instance.__proto__ = Constr.prototype instanceof Object ? Constr.prototype : Object.prototype;
    const res = Constr.call(instance,...args);
    return res instanceof Object ? res : instance;
}
function Father(name, age) {
    this.name = name;
    this.age = age;
}
const son = myNew(Father, '12', 'Lisa');
console.log(son);
// function F(){}
// F.prototype = null
// const obj1 = new F()
// const obj2 = myNew(F)

// console.log(Object.getPrototypeOf(obj1))
// console.log(Object.getPrototypeOf(obj2))

function myNew(constructor, ...args) {
    if (typeof constructor !== 'function') {
        throw new TypeError(constructor + 'is not constructor');
    }
    const obj = {};
    obj.__ptoto__ = constructor.prototype instanceof Object ? constructor.prototype : Object.prototype;
    const res = constructor.call(obj, ...args);
    return res instanceof Object ? res : obj;
}

function father(name, age) {
    this.name = name;
    this.age = age;
}

const test = myNew(father, 'Danylko', 27);
console.log(test)