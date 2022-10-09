/*
 * @Author: Danylko
 * @Date: 2022-10-09 10:30:59
 * @LastEditors: Danylko
 * @LastEditTime: 2022-10-09 10:31:00
 * @Description: array转树
 */

/**
 * @description: 
 * @param {*} data
 * @param {*} result
 * @param {*} pid
 * @return {*}
 */
function getChildren(data, result, pid) {
    for (const item of data) {
      if (item.parent_id === pid) {
        const newItem = { children: [], ...item }
        result.push(newItem)
        getChildren(data, newItem.children, item.id)
      }
    }
  }
  
  function arrayToTree(data, pid) {
    let result = []
    getChildren(data, result, pid)
    return result
  }

  /** 数组结构数据 */
const arrayData = [
    { id: 2, title: '中国', parent_id: 0 },
    { id: 3, title: '广东省', parent_id: 2 },
    { id: 4, title: '广州市', parent_id: 3 },
    { id: 5, title: '天河区', parent_id: 4 },
    { id: 6, title: '湖南省', parent_id: 2 },
    { id: 1, title: '俄罗斯', parent_id: 0 }
  ]
  
console.log(arrayToTree(arrayData, 0))