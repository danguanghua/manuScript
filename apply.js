/*
 * @Author: Danylko
 * @Date: 2022-07-25 17:11:14
 * @LastEditors: Danylko
 * @LastEditTime: 2022-07-26 06:34:30
 * @Description: 手写apply
 */
/**
 * @description: 手写apply
 * @param {*} context this指向对象
 * @param {*} args apply参数
 * @return {*}
 */
Function.prototype.myApply = function(context, args = []) {
    const obj = context || window;
    const fn = Symbol();
    obj[fn] = this;
    const res = args.length > 0 ? obj[fn](args) : obj[fn]();
    delete obj[fn];
    return res;
}

function foo() {
	console.log(this.name);
}
const obj = {
	name: 'xys'
};
foo.myApply(obj); 