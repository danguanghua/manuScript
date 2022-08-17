/*
 * @Author: Danylko
 * @Date: 2022-07-30 07:21:32
 * @LastEditors: Danylko
 * @LastEditTime: 2022-07-30 07:26:18
 * @Description: 请填写简介
 */
function rearrangeArray( nums ) {
    // write code here
//         const res = 0;
    nums.sort((a, b) => a - b);
    let count = 0;
    let i = 1;
    const n = nums.length;
    for (count = 0; count < n - 1; count ++) {
        if (nums[i] === nums[i - 1])  {
            let tmp = nums[i];
            console.log(tmp)
            for (let j = i + 1; j < n; j ++) {
                nums[j - 1] = nums[j]; 
            }
            nums[n - 1] = tmp;
        } else {
            i ++;
        }
    }
    console.log(nums)
    return i;
}
// function rearrangeArray( nums ) {
//     // write code here
//     let count = 0;
//     let i = 1;
//     const n = nums.length;
//     for (count = 0; count < n - 1; count ++) {
//         if (nums[i] === nums[i - 1])  {
//             let tmp = nums[i];
//             // console.log(tmp)
//             for (let j = i + 1; j < n; j ++) {
//                 nums[j - 1] = nums[j]; 
//             }
//             nums[n - 1] = tmp;
//         } else {
//             i ++;
//         }
//     }
//     for (let j = nums.length - 1; j >= 0; j --)  {
//         if (nums[j] <= nums[j - 1]) {
//             nums.pop();
//         }
//     }
//     console.log(nums)
//     return ;
// }

console.log(rearrangeArray([2,3,3,24,4,5] ))