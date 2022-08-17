/*
 * @Author: Danylko
 * @Date: 2022-08-02 22:41:17
 * @LastEditors: Danylko
 * @LastEditTime: 2022-08-02 22:41:18
 * @Description: 实现AJAX
 */

const SERVER_URL = "/server";
let xhr = new XMLHttpRequest();
//创建HTTP请求
xhr.open('GET', SERVER_URL, true);
//设置状态监听函数
xhr.onreadystatechange = function() {
    if (this.readyState !== 4) return;
    if (this.status >= 200 && this.status < 300) {
        console.log(this.response);
    } else {
        console.error(this.statusText);
    }
}
//设置请求失败的监听函数
xhr.onerror = function() {
    console.error(this.statusText);
}
//设置请求头信息
xhr.responseType = "json";
xhr.setRequestHeader("Accept", "application/json");
//发送HTTP请求
xhr.send(null);


async function async1(){
    console.log('async1 start');
     await async2();
     console.log('async1 end')
 }
 async function async2(){
     console.log('async2')
 }
 console.log('script start');
 async1();
 console.log('script end')