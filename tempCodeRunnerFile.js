/*
 * @Author: Danylko
 * @Date: 2022-08-15 07:25:45
 * @LastEditors: Danylko
 * @LastEditTime: 2022-08-15 09:13:14
 * @Description: 排序
 */
//冒泡
/**
 * @description: 
 * @param {*} arr
 * @return {*}
 */
function bubbleSort(arr) {
    console.time('bubble')
    let flag = true;
    for (let i = arr.length - 1; i >= 0; i --) {
        for (let j = 0; j < i; j ++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                flag = false;
            }
        }
        if (flag) return arr;
    }
    console.timeEnd('bubble')
    return arr;
}

//选择排序
function selectSort(arr) {
    for (let i = 0; i < arr.length; i ++) {
        let min = i;
        for (let j = i; j < arr.length; j ++) {
            if (arr[j] < arr[min]) {
                min = j;
            }
        }
        if (arr[i] !== arr[min]) {
            [arr[i], arr[min]] = [arr[min], arr[i]]
        }
    }
    return arr
}

//插入排序
function insertSort(arr) {
    for (let i = 1; i < arr.length; i ++) {
        let tmp = arr[i];
        let j = i - 1;
        while(j >= 0 && tmp < arr[j]) {
            arr[j + 1] = arr[j];
            j --;
        }
        arr[j + 1] = tmp;
        // console.log(arr)
    }
    return arr;
}

//归并排序
function mergeSort(arr) {
    return main(arr);
    // return arr;
    function main(arr) {
        if (arr.length === 1) return arr;
        let mid = Math.floor(arr.length / 2);
        let left = arr.slice(0, mid);
        let right = arr.slice(mid);
        // console.log(left, right)
        return merge(main(left), main(right));
    }

    function merge(left, right) {
        let il = 0, ir = 0;
        let res = [];
        while(il < left.length && ir < right.length) {
            if (left[il] < right[ir]) {
                res.push(left[il]);
                il ++;
            }
            else {
                res.push(right[ir]);
                ir ++;
            }
        }
        return res.concat(left.slice(il)).concat(right.slice(ir));
    }
}

// 快速排序
function quickSort(arr) {
    let left = 0, right = arr.length - 1;
    main(arr, left, right);
    return arr;
    function main(arr, left, right) {
        if (arr.length === 1) {
            return ;
        }
        let index = parition(arr, left, right);
        // console.log(index)
        if (left < index - 1) {
            main(arr, left, index - 1);
        }
        if (index < right) {
            main(arr, index, right);
        }
    }
    function parition(arr, left, right) {
        // console.log(left, right)
        let pivot = arr[Math.floor((left + right) / 2)];
        // console.log(pivot)
        while(left <= right) {
            while(pivot < arr[right]) {
                right --;
            }
            while(pivot > arr[left]) {
                left ++;
            }
            if (left <= right) {
                [arr[left], arr[right]] = [arr[right], arr[left]];
                left ++;
                right --;
            }
        }
        return left;
    }
}

// 堆排序
function heapSort(arr) {
    heapBuild(arr);
    for (let i = arr.length - 1; i > 0; i --) {
        [arr[i], arr[0]] = [arr[0], arr[i]];
        heapify(arr, i, 0)
    }
    return arr;
    function heapBuild(arr) {
        let mid = Math.floor(arr.length / 2);
        for (let i = mid; i >= 0; i --) {
            heapify(arr, arr.length, i);
        }
        return arr;
    }
    function heapify(arr, headSize, i) {
        let left = 2 * i + 1, right = 2 * i + 2, largest = i;
        if (left < headSize && arr[left] > arr[largest]) {
            largest = left;
        }
        if (right < headSize && arr[right] > arr[largest]) {
            largest = right;
        }
        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            heapify(arr, headSize, largest);
        }
        return arr;
    }
}
arr1 = [1,2,3,4,5,5,7,8,9,12]
arr = [2,35,68,1,5,4,9,24,46,0]
console.log(heapSort(arr));

