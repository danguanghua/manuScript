/*
 * @Author: Danylko
 * @Date: 2022-07-24 09:31:07
 * @LastEditors: Danylko
 * @LastEditTime: 2022-07-24 09:31:08
 * @Description: 背包问题
 */

//01背包
/**
 * @description: 
 * @params {Number} n 物品数量
 * @params {Number} m 背包容积
 * @params {Number[][]} goods 每个物品对应的体积和价值
 * @return {*}
 */
function backpack01(n, m, goods) {
    const dp = new Array(n + 1).fill(0).map(() => new Array(m + 1).fill(0));
    for (let i = 1; i <= n; i ++) {
        for (let j = 1; j <= m; j ++) {
            if (j < goods[i - 1][0]) {
                dp[i][j] = dp[i - 1][j]
            }
            else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - goods[i - 1][0]] + goods[i - 1][1]);
            }
        }
    }
    return dp[n][m];
}
function backpack(n, m, goods) {
    const dp = new Array(m + 1).fill(0);
    for (let i = 0; i < n; i ++) {
        for (let j = m; j >= goods[i][0]; j --) {
            dp[j] = Math.max(dp[j], dp[j - goods[i][0]] + goods[i][1]);
        }
    }
    return dp[m];
}

function backpackFull(n, m, goods) {
    const dp = new Array(m + 1).fill(0);

    for (let i = 0; i < n; i ++) {
        for (let j = goods[i][0]; j <= m; j ++) {
            dp[j] = Math.max(dp[j], dp[j - goods[i][0]] + goods[i][1]);
        }
    }

    return dp[m];
}
let n = 4, m = 5;
const goods = [[4,5],[1,2],[2,4],[3,4]]
console.log(backpack01(n, m, goods));