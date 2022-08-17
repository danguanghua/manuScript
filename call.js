/*
 * @Author: Danylko
 * @Date: 2022-07-25 16:06:12
 * @LastEditors: Danylko
 * @LastEditTime: 2022-07-26 06:34:31
 * @Description: 手写call
 */
/**
 * @description: 
 * @param {*} context
 * @param {array} args
 * @return {*}
 */
Function.prototype.myCall = function(context, ...args) {
    const obj = context || window;
    args = args || [];
    const fn = Symbol();
    obj[fn] = this;
    const res = args.length > 0 ? obj[fn](...args) : obj[fn]();
    delete obj[fn];
    return res;
}

function foo() {
	console.log(this.name);
}
const obj = {
	name: 'xys'
};
foo.myCall(obj); 
var name = 'xys2';
foo.myCall();
