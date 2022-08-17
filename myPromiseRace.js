/*
 * @Author: Danylko
 * @Date: 2022-07-28 22:04:12
 * @LastEditors: Danylko
 * @LastEditTime: 2022-07-28 22:10:06
 * @Description: Promise.race()
 */

Promise.race = function(promises) {
    return new Promise((resolve, reject) => {
        if (promises.length ===0) {
            return ;
        }
        else {
            for (let i = 0; i < promises.length; i ++) {
                Promise.resolve(promises[i]).then((data) => {
                    resolve(data);
                    return;
                }, (e) => {
                    reject(e);
                    return ;
                })
            }
        }
    })
}

Promise.race([
    new Promise((resolve, reject) => { setTimeout(() => { resolve(100) }, 1000) }),
    undefined,
    new Promise((resolve, reject) => { setTimeout(() => { reject(100) }, 100) })
]).then((data) => {
    console.log('success ', data);
}, (err) => {
    console.log('err ',err);
});

Promise.race([
    new Promise((resolve, reject) => { setTimeout(() => { resolve(100) }, 1000) }),
    new Promise((resolve, reject) => { setTimeout(() => { resolve(200) }, 200) }),
    new Promise((resolve, reject) => { setTimeout(() => { reject(100) }, 100) })
]).then((data) => {
    console.log(data);
}, (err) => {
    console.log(err);
});