/*
 * @Author: Danylko
 * @Date: 2022-08-04 19:23:33
 * @LastEditors: Danylko
 * @LastEditTime: 2022-08-04 19:55:41
 * @Description: 手写深拷贝
 */

function deepClone(obj) {
    if (typeof obj !== 'object' || obj === null) return;
    const res = obj instanceof Array ? [] : {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            res[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key];
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

const obj2 = deepClone(obj1);
console.log(obj2)
console.log(obj1.b === obj2.b)
