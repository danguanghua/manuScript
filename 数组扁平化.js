/*
 * @Author: Danylko
 * @Date: 2022-08-04 20:59:53
 * @LastEditors: Danylko
 * @LastEditTime: 2022-08-04 20:59:53
 * @Description: 数组扁平化
 */

function flatten(arr) {
    let res = [];
    arr.forEach((item, index, arr) => {
        if (Array.isArray(item)) {
            res = res.concat(flatten(arr[index]));
        }
        else res.push(item);
    });
    return res;
}

const arr = [1,[2,[3,4,5],1],2]
const res = flatten(arr);
console.log(res);