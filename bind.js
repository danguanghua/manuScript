/*
 * @Author: Danylko
 * @Date: 2022-07-25 20:54:33
 * @LastEditors: Danylko
 * @LastEditTime: 2022-07-26 06:34:28
 * @Description: 手写bind
 */
/**
 * @description: 
 * @param {*} context
 * @param {array} args
 * @return {*}
 */
Function.prototype.myBind = function(context, ...args) {
    const obj = context || window;
    args = args || [];
    const fn = this;
    return function func(...newArgs) {
        if (fn instanceof func) {
            return new fn([...args, ...newArgs]);
        }
        return fn.apply(obj, [...args, ...newArgs]);
    }
}
