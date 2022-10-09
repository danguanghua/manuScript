/*
 * @Author: Danylko
 * @Date: 2022-09-07 17:05:01
 * @LastEditors: Danylko
 * @LastEditTime: 2022-09-07 17:06:53
 * @Description: 请填写简介
 */
function tt(n) {
    // const n = parseInt(read_line());
const dp = new Array(n + 1);
dp[1] = 1, dp[2] = 1, dp[3] = 1;
for (let i = 4; i <= n; i ++) {
  dp[i] = (dp[i - 1] + dp[i - 2] + dp[i - 3]) % 1000000007;
//   console(dp[i])
}
// console.log(dp[n]);
    return dp[n]
}
console.log(tt(5))