/*
 * @Author: Danylko
 * @Date: 2022-07-19 08:45:14
 * @LastEditors: Danylko
 * @LastEditTime: 2022-07-19 08:47:28
 * @Description: 节流
 */

const throttle = (fun, delay = 500) => {
    let flag = true;
    return function(...args) {
        if (!flag) return;
        flag = false;
        setTimeout(()=>{
            fun.apply(this, args);
            flag = true;
        }, dalay)
    }
}