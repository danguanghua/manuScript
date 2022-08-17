/*
 * @Author: Danylko
 * @Date: 2022-08-04 20:08:03
 * @LastEditors: Danylko
 * @LastEditTime: 2022-08-04 20:50:54
 * @Description: 数组去重
 */

function dup1(arr) {
    const obj = {}, res = [];
    for (let i = 0; i < arr.length; i ++) {
        if (!obj.hasOwnProperty(arr[i])) {
            res.push(arr[i]);
            obj[arr[i]] = 0;
        }
    }
    return res;
}

function dup2(arr) {
    const res = [...new Set(arr)];
    return res;
} 

function dup3(arr) {
    const res = [];
    arr.filter((item, index) => {
        if (arr.indexOf(item) === index ) {
            res.push(item);
        }
    })
    return res;
}

function dup4(arr) {
    const res = arr.reduce((pre, cur) =>{
        return pre.includes(cur) ? pre : [...pre, cur];
    }, [])
    return res;
}

const arr = [1,1,2,5,3,7,2];
const res = dup4(arr);
console.log(res);

