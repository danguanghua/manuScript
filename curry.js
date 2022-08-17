/*
 * @Author: Danylko
 * @Date: 2022-08-02 21:52:40
 * @LastEditors: Danylko
 * @LastEditTime: 2022-08-02 22:30:07
 * @Description: 手写柯里化
 */

/**
 * @description: 
 * @param {*} fn
 * @param {array} args
 * @return {*}
 */
const myCurry = (fn, ...args) => {
    return fn.length <= args.length ? fn(...args) : myCurry.bind(null, fn, ...args);
}
function sum(a, b, c, d) {
    console.log(a + b + c + d);
}

const fn = myCurry(sum);

fn(1, 2, 3, 4); // 6
fn(1, 2)(3)(4); // 6
fn(1)(2, 3, 4); // 6
fn(1)(2)(3)(4); // 6


/**
 * @description: 
 * @param {*} fn
 * @param {*} args
 * @return {*}
 */
function myCurry1(fn, args) {
    // let length = fn.length;
    args = args || [];
    return function() {
        let subArgs = args.slice(0);
        for (let i = 0; i < arguments.length; i ++) {
            subArgs.push(arguments[i]);
        }
        if (subArgs.length >= fn.length) {
            return fn.apply(this, subArgs);
        } else {
            return myCurry1.call(this, fn, subArgs);
        }
    }
}

function sum(a, b, c, d) {
    console.log(a + b + c + d);
}

const fn = myCurry1(sum);

fn(1, 2, 3, 4); // 6
fn(1, 2)(3)(4); // 6
fn(1)(2, 3, 4); // 6
fn(1)(2)(3)(4); // 6






