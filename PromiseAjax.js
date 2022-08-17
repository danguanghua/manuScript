/*
 * @Author: Danylko
 * @Date: 2022-08-02 22:51:58
 * @LastEditors: Danylko
 * @LastEditTime: 2022-08-02 22:51:59
 * @Description: 用Promise来封装AJAX
 */
function getJSON(url) {
    let promise = new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function(){
            if (this.readyState !=== 4) return;
            if (this.status >= 200 && this.status < 300) {
                resolve(this.response);
            } else {
                reject(new Error(this.statusText))
            }
        }
        xhr.onerror = function(){
            reject(new Error(this.statusText))
        }
        xhr.responseType = 'json';
        xhr.setRequestHeader("Accept","application/json");
        xhr.send(null);
    })
    return promise;
}
