/*
 * @Author: Danylko
 * @Date: 2022-07-14 16:30:15
 * @LastEditors: Danylko
 * @LastEditTime: 2022-08-01 22:45:28
 * @Description: 请填写简介
 */

// const { on } = require("koa");

function myNew(Constr, ...args) {
    if (typeof Constr !=== 'function') {
        throw new TypeError(Constr + 'is not a constructor')
    }
    const obj = {};
    obj.__proto__ = Constr.prototype instanceof Object ? Constr.prototype : Object.prototype;
    const res = Constr.call(obj, ...args);
    return res instanceof Object ? res : obj;
}

function debounce(fn, delay) {
    let timer = null;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(()=>{
            fn.apply(this, args);
        }, delay)
    }
}

function thtottle(fn, delay) {
    let flag = true //事件没有被触发的标记
    return function(...args) {
        if (!flag) return ;
        setTimeout(()=>{
            fn.apply(this, args);
            flag = true;
        },delay)
    }
}
Function.prototype.myCall = function(context, ...args) {
    const obj = content || window;
    args = args || [];
    const fn = Symbol();
    obj[fn] = this;
    const res = args.length > 0 ? obj[fn](...args) : obj[fn]();
    delete obj[fn];
    return res;
}

Function.prototype.maApply = function(context, args = []) {
    const obj = context || window;
    const fn = Symbol();
    obj[fn] = this;
    const res = args.length > 0? obj[fn](args) : obj[fn]();
    return res;
}

Function.prototype.myBind = function(context, ...args) {
    const obj = context || window;
    args = args || [];
    const fn = this;
    return function func(...newArgs) {
        if (fn instanceof func) {
            return new fn([...args, ...newArgs])
        }
        return fn.apply(obj, [...args, ...newArgs]);
    }

}

function myCurry(fn, args) {
    args = args || [];
    return function() {
        const newArgs = args.slice(0);
        for (let i = 0; i < arguments.length; i ++) {
            newArgs.push(arguments[i]);
        }
        if (newArgs.length >= fn.length ) {
            return fn.apply(this, newArgs);
        }
        else {
            return myCurry.call(this, fn, newArgs);
        }
    }
}
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
function Promise(executor) {
    let self = this;
    self.status = PENDING;
    self.onFulfilled =[];
    self.onRejected = [];
    function resolve(value) {
        if (self.status === PENDING) {
            setTimeout(()=>{
                self.status = FULFILLED;
                self.value = value;
                self.onFulfilled.forEach(fn => fn());
            })

        }
    }
    function reject(reason) {
        if (self.status === PENDING) {
            setTimeout(()=>{
                self.status = REJECTED;
                self.reason = reason;
                self.onRejected.forEach(fn => fn());
            })
        }
    }
    try {
        executor(resolve, reject);
    } catch(e) {
        reject(e);
    }
}
Promise.prototype.then = function(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason};
    let self = this;
    let promise2 = new Promise((resolve, reject) => {
        if (self.status === FULFILLED) {
            setTimeout(()=> {
                try {
                    let x = onFulfilled(self.value);
                    resolvePromise(promise2, x, resolve, reject);
                } catch(e) {
                    reject(e);
                }
            })
        } else if (self.status === REJECTED) {
            setTimeout(()=> {
                try {
                    let x = onRejected(self.reason);
                    resolvePromise(promise2, x, resolve, reject);
                } catch(e) {
                    reject(e);
                }
            })
        } else if (self.status === PENDING) {
            self.onFulfilled.push(()=>{
                setTimeout(()=> {
                    try {
                        let x = onFulfilled(self.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch(e) {
                        reject(e);
                    }
                })
            })
            self.onRejected.push(()=>{
                setTimeout(()=>{
                    try {
                        let x = onRejected(self.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch(e) {
                        reject(e);
                    }
                })
            })
        }
    })
    return promise2
}
function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        // throw new TypeError('chaining cycle');
        reject(new TypeError('chaining cycle'))
    }

    if (x &&  typeof x === 'object' ||  typeof x === 'function') {
        let used = false;
       try {
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, (y)=>{
                    if (used) return;
                    used = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, (r)=>{
                    if (used) return;
                    used = true;
                    reject(r);
                })
            } else {
                if (used) return;
                used = true;
                resolve(x);
            }
       } catch(e) {
            if (used) return;
            used = true;
            reject(e);
       }
    } else {
        resolve(x);
    }
}

Promise.all = function(promises) {
    return new Promise((resolve, reject) =>{
        let index = 0;
        const res = [];
        if (promises.length === 0 ) {
            resolve(res);
        } else {
            function processValue(i, data) {
                res[i] = data;
                if (++index === promises.length) {
                    resolve(res);
                }
            }
            for (let i = 0; i < promises.length; i ++) {
                Promise.resolve(promises[i]).then((data) => {
                    processValue(i, data);
                }, (err)=>{
                    reject(err);
                    return ;
                })
            }
        }
    })
}

Promise.race = function(promises) {
    return new Promise((reslove, reject) =>{
        if (promises.length === 0) {
            return ;
        }
        else {
            for(let i = 0; i < promises.length; i ++) {
                Promise.resolve(promises[i]).then((data)=>{
                    resolve(data);
                    return ;
                }, (err)=>{
                    reject(err);
                    return ;
                })
            }
        }
    })
}

module.exports = Promise;

Promise.defer = Promise.deferred = function(){
    let res = {};
    res.promise = new Promise((resolve, reject) => {
        res.resolve = resolve;
        res.reject = reject;
    })
    return res;
}

var js = {
    da : 1
}

var dd = JSON.parse(JSON.stringify(js));
console.log(js == dd);
console.log(js === dd)
console.log(JSON.stringify(js))

const set = new Set([1,1,2,2,2,4,5,3]);
console.log(set);
console.log(Array.from(set));

const map = new Map();

map.set(3, [[0, 0]]);
if (map.has(3)) {
	map.set(3, map.get(3).push([1,1]));
}        
console.log(map);

let obj = {name: "Mark", age:30};
console.log(Object.keys(obj).length)

let r = 'a'
console.log(r.toUpperCase())

let a = [1,6,4];
console.log(a.toString())
// console.log(a.toLocalString())
console.log(a.join(''))

var b = function b() {
    console.log('xx');
}
b();