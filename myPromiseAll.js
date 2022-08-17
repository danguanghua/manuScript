/*
 * @Author: Danylko
 * @Date: 2022-07-28 21:33:20
 * @LastEditors: Danylko
 * @LastEditTime: 2022-07-28 22:02:14
 * @Description: promise.all()
 */
// import Promise from myPromise.js
Promise.all = function (promises) {
    return new Promise((resolve, reject) => {
        let index = 0;
        const result = [];
        if (promises.length === 0) {
            resolve(result);
        } 
        else {
            function processValue(i, data) {
                result[i] = data;
                if (++index === promises.length) {
                    resolve(result);
                }
            }
            for (let i = 0; i < promises.length; i ++) {
                Promise.resolve(promises[i]).then((data) => {
                    processValue(i, data);
                }, (e)=>{
                    reject(e);
                    return ;
                })
            }
        }
    })
}

var promise1 = new Promise((resolve, reject) => {
    resolve(3);
})
var promise2 = 42;
var promise3 = new Promise(function(resolve, reject) {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then(function(values) {
  console.log(values); //[3, 42, 'foo']
},(err)=>{
    console.log(err)
});

var p = Promise.all([]); // will be immediately resolved
var p2 = Promise.all([1337, "hi"]); // non-promise values will be ignored, but the evaluation will be done asynchronously
console.log(p);
console.log(p2)
setTimeout(function(){
    console.log('the stack is now empty');
    console.log(p2);
});