/*
 * @Author: Danylko
 * @Date: 2022-10-09 10:47:40
 * @LastEditors: Danylko
 * @LastEditTime: 2022-10-09 10:47:40
 * @Description: 树转数组
 */
/**
 * 树结构数组扁平化
 * @param {*} data 树结构的数组
 * @returns 
 */
 function treeToArray(data) {
    return data.reduce((pre, cur) => {
      const { children = [], ...item } = cur;  
      return pre.concat([{ ...item }], treeToArray(children)) 
    }, []);
}

/** 树状形结构数据treeData */
const treeData = [
    {
      id: 2, title: '中国', parent_id: 0,
      children: [
        {
          id: 3, title: '广东省', parent_id: 2,
          children: [
            {
              id: 4, title: '广州市', parent_id: 3,
              children: [
                { id: 5, title: '天河区', parent_id: 4 }
              ]
            }
          ]
        },
        { id: 6, title: '湖南省', parent_id: 2 }
      ]
    },
    { id: 1, title: '俄罗斯', parent_id: 0, },
  ]
  
treeToArray(treeData)

