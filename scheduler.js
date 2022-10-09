/*
 * @Author: Danylko
 * @Date: 2022-08-19 15:13:16
 * @LastEditors: Danylko
 * @LastEditTime: 2022-08-21 17:10:01
 * @Description: 异步调度器，保证最多运行两个任务
 */

class Scheduler {
    constructor() {
        this.tasks = [];
        this.concurrent = 0;
    }
    add(promiseCreator) {
        return new Promise(resolve => {
            this.tasks.push(()=> promiseCreator().then(resolve));
            this.runTask();
        })
    }
    runTask(){
        if (this.concurrent >= 2) return ;
        let currentTask = this.tasks.shift();
        if (currentTask) {
            this.concurrent ++;
            currentTask().then(()=>{
                this.concurrent --;
                this.runTask();
            })
        }
    }
}

const timeout = (time) => new Promise(resolve =>{
    setTimeout(resolve, time);
})

const scheduler = new Scheduler();
const addTask = (time, order) => {
    scheduler.add(()=> timeout(time)).then(()=>console.log(order))
}

addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");



  
 

