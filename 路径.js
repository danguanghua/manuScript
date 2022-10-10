/*
 * @Author: Danylko
 * @Date: 2022-09-08 19:52:35
 * @LastEditors: Danylko
 * @LastEditTime: 2022-09-08 19:52:36
 * @Description: 请填写简介
 */


function DagPathNum(nodes) {
  // write code here
  let n = nodes.length;
  let map = Array.from(new Array(n), () => new Array(n).fill(false));
  for (let i = 0; i < nodes.length; i++) {
    for (let j = 0; j < nodes[i].length; j++) {
      map[i][nodes[i][j]] = true;
    }
  }
  console.log(map);
  let count = 0;
  function fun(i) {
    console.log("i:", i);
    if (i == n - 1) count++;
    for (let j = 0; j < n; j++) {
      if (map[i][j]) {
        fun(j);
      }
    }
  }
  fun(0)
  return count;
}

let dd = [1,3]
let aa = dd.concat([1,2,3], [2,3,4]);
console.log(aa)