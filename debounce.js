/*
 * @Author: Danylko
 * @Date: 2022-07-19 08:38:46
 * @LastEditors: Danylko
 * @LastEditTime: 2022-07-19 08:47:30
 * @Description: 防抖
 */

const debounce = (fun, delay = 500) => {
    let timer = null;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(()=>{
            fun.apply(this, args);
        }, delay)
    }
}
console.log(Math.max(2,3,4,5))