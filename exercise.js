/*
 * @Author: Danylko
 * @Date: 2022-08-09 19:31:47
 * @LastEditors: Danylko
 * @LastEditTime: 2022-08-09 20:49:45
 * @Description:  手写练习
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
            setTimeout(()=> {
                self.status = FULFILLED;
                self.value = value;
                self.onFulfilled.forEach((fn) => fn());
            })
        }
    }
    function reject(reason) {
        if (self.status === PENDING) {
            setTimeout(()=>{
                self.status = REJECTED;
                self.reason = reason;
                self.onRejected.forEach((fn) => fn());
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
    onRejected = typeof onRejected === 'function' ? onRejected : (reason) => { throw reason};
    let self = this;
    let promise2 = new Promise((resolve, reject) => {
        if (self.status === FULFILLED) {
            setTimeout(()=> {
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
        reject(new TypeError('chaining cycling'));
    }

    if (x && typeof x === 'object' || typeof x === 'function') {
        let used = false;
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, (y) =>{
                    if (used) return ;
                    used = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, (r) =>{
                    if (used) return;
                    used = true;
                    reject(r);
                })
            }
            else {
                if (used) return ;
                used = true;
                resolve(x);
            }
        } catch(e) {
            if (used) return ;
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

