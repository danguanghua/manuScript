/*
 * @Author: Danylko
 * @Date: 2022-08-04 19:42:59
 * @LastEditors: Danylko
 * @LastEditTime: 2022-08-04 19:47:02
 * @Description: 手写浅拷贝
 */

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

const obj1 = {
    a : 1,
    b : {
        c : 2
    }
}

const obj2 = shallowClone(obj1);
console.log(obj2)
console.log(obj1.b === obj2.b)