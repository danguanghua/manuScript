/*
 * @Author: Danylko
 * @Date: 2022-09-26 09:57:49
 * @LastEditors: Danylko
 * @LastEditTime: 2022-09-26 09:57:49
 * @Description: 请填写简介
 */

function subArrNum(nums, k) {
    let l = 0, r = 0, res = 0, sum = 0;
    while(r < nums.length) {
        sum += nums[r];
        if (sum === k) {
            res ++;
        }
        while(sum > k) {
            sum -= nums[l];
            if (sum === k) {
                res ++;
            }
            l ++;
        }
        r ++;
    }
    return res;
}

nums = [1,1,1]
nums2 = [1,2,3]
console.log(subArrNum(nums, 2));
console.log(subArrNum(nums2, 3))

console.log('5' - 3)
['1','2','3'].map(parseInt)

var a = b = 1
console.log(a, b)
var m = 1, j = k = 0;
// console.log(j, k)
function add(n) {
    return n = n + 1;
}

y = add(m);
function add(n) {
    return n = n + 3;
}
z = add(m);
console.log(y, z)

var name = 'world';
(function(){
    console.log(name)
    if (typeof name === 'undefined') {
        var name = 'jack';
        console.log('goodbye' + name)
    }
    else {
        console.log('hello' + name)
    }
})()

var a = {n: 1};
var b = a;
a.x  = {n: 2};
console.log(a.x)
console.log('a', a.x) 	
console.log('b', b.x)

console.log(undefined === null);
console.log(undefined == null)

let map = Array.from(new Array(5), () => new Array(4).fill(false));
console.log(map)

function A() {
    let a = 0;
    return function() {
        a ++;
        console.log(a);
    }
}
let b = A();
// let c = A();
b();
b();
b();

gc = 1
console.log(gc)