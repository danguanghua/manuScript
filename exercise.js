/*
 * @Author: Danylko
 * @Date: 2022-08-09 19:31:47
 * @LastEditors: Danylko
 * @LastEditTime: 2022-08-18 09:19:16
 * @Description: 手写练习
 */

const { on } = require("koa");

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function Promise(executor) {
    let self = this;
    self.status = PENDING;
    self.onFulfilled = [];
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
            setTimeout(()=>{
                try {
                    let x = onFulfilled(self.value);
                    resolvePromise(promise2, x, resolve, reject);
                }
                catch(e) {
                    reject(e);
                }
            })
        }
        else if (self.status === REJECTED) {
            setTimeout(()=>{
                try {
                    let x = onRejected(self.reason);
                    resolvePromise(promise2, x, resolve, reject);
                }
                catch(e) {
                    reject(e);
                }
            })
        }
        else if (self.status === PENDING) {
            self.onFulfilled.push(()=>{
                setTimeout(()=>{
                    try {
                        let x = onFulfilled(self.value);
                        resolvePromise(promise2, x, resolve, reject);
                    }
                    catch(e) {
                        reject(e);
                    }
                })
            })
            self.onRejected.push(()=>{
                setTimeout(()=>{
                    try {
                        let x = onRejected(self.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    }
                    catch(e) {
                        reject(e);
                    }
                })
            })
        }
    })
    return promise2;
}

function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        reject(new TypeError('chain cycle'));
    }

    if (x && typeof x === 'object' || typeof x === 'function'){
        let used = false;
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, (y) => {
                    if (used) return ;
                    used = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, (r) =>{
                    if (used) return ;
                    used = true;
                    reject(r);
                })
            }
            else {
                if (used) return ;
                used = true;
                resolve(x);
            }
        }
        catch(e) {
            if (used) return;
            used = true;
            reject(e);
        }
    }
    else {
        resolve(x);
    }
}
module.exports = Promise;

Promise.defer = Promise.deferred = function() {
    let res = {};
    res.promise = new Promise((resolve, reject) => {
        res.resolve = resolve;
        res.reject = reject;
    })
    return res;
}


Promise.all = function(promises) {
    return new Promise((resolve, reject) =>{
        let index = 0;
        const res = [];
        if (promises.length === 0) {
            resolve(res);
        }
        else {
            function processValue(i, data) {
                res[i] = data;
                if (++index === promises.length) {
                    resolve(res);
                }
            }
            for (let i = 0; i < promises.length; i ++) {
                Promise.resolve(promises[i]).then((data) =>{
                    processValue(i, data);
                }, (err) => {
                    reject(err);
                    return ;
                })
            }
        }
    })
}

Promise.race = function(promises) {
    return new Promise((resolve, reject) =>{
        if (promises.length === 0) {
            return ;
        }
        for (let i = 0; i < promises.length; i ++) {
            Promise.Resolve(promises[i]).then((data) =>{
                resolve(data);
                return ;
            }, (err) => {
                reject(err);
                return ;
            })
        }
    })
}

function debounce(fn,  delay = 500) {
    let timer = null;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(()=>{
            fn.apply(this, args);
        }, delay)
    }
}

function throttle(fn, delay = 500) {
    let flag = true;
    return function (...args) {
        if (!flag) return ;
        flag = false;
        setTimeout(()=>{
            fn.apply(this, args);
            flag = true;
        }, delay);
    }
}

function flatten(arr) {
    let  res = [];
    for (const item of arr) {
        if (item instanceof Array) {
            res = res.concat(flatten(item));
        }
        else {
            res.push(item);
        }
    }
    return res;
}

const arr = [1,[2,[3,4], 6], 5]
console.log(flatten(arr));

function curry(fn, args) {
    args = args || [];
    return function() {
        const subArgs = args.slice(0);
        for (let i = 0; i < arguments.length; i ++) {
            subArgs.push(arguments[i]);
        }

        if (fn.length <= subArgs.length) {
            return fn.apply(this, subArgs);
        }
        else {
            return curry.call(this, fn, subArgs);
        }
    }
}

function add(a, b, c, d) {
    return a + b + c + d;
}
let res = curry(add)(1)(2)(3,4);
res = curry(add)(1, 2, 3, 4);
console.log(res);

function shallowClone(obj) {
    if (typeof obj !== 'object' || obj === null) return ;
    const res = obj instanceof Array ? [] : {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            res[key] = obj[key];
        }
    }
    return res;
}

function deepClone(obj) {
    if (typeof obj !== 'object' || obj === null) return ;
    const res = obj instanceof Array ? [] : {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            res[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key];
        }
    }
    return res;
}

obj = {
    a : 10,
    b : {
        c : 10,
    }
}
console.log(deepClone(obj))
let rs = deepClone(obj)
console.log(obj.b === rs.b)


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

function quickSort(nums) {
    let left = 0, right = nums.length - 1;
    main(nums, left, right);
    return nums;
    function main(nums, left, right) {
        if (nums.length === 1) return;
        let index = parition(nums, left, right);
        if (left < index - 1) main(nums, left, index - 1);
        if (index < right) main(nums, index, right);
    }
    function parition(nums, left, right) {
        let pivot = nums[Math.floor((left + right) / 2)];
        while(left <= right) {
            while(nums[left] < pivot) left ++;
            while(nums[right] > pivot) right --;
            if (left <= right) {
                [nums[left], nums[right]] = [nums[right], nums[left]];
            }
        }
        return left;
    }
}

const nums = [5, 2, 20, 8, 3, 1];
console.log(quickSort(nums))

console.log(1)