/**
 * Created by chengkang on 2018/3/23.
 */
//async await的用法
//1 await 阻塞 async函数内部的执行，知道await 等待的promise 得到了决议，async函数才继续执行
//2 await 返回结果，如果await后面返回的是promise，则await返回结果为promise的决议结果
//3 如果await后面返回的不是promise，则await会将后面的表达式包装成一个promise对象，然后返回表达式的值。这样做意义不大，实际中都是await 一个promise
//4 await 只能在 async 函数内部被使用，而且async函数内部再定义的函数使用await 也会出错。

var g_time = 0;
var excuteLontTime = function excuteLontTime(time){
    console.log("before excute");
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("do promise"+time);
            resolve(time);
        },time);
    });
}

async function doSomethingLongTime() {
    function b(){
        //await excuteLontTime(1);报错
    }
    async function c(){
        console.log("before call c");
        await excuteLontTime(2000);//不会报错
        console.log("after call c");
    }
    c();

    console.log("before do");
    console.log(await excuteLontTime(3000));
    console.log(await excuteLontTime(2000));
    console.log("after do");
}

console.log("before call doSomethingLongTime");
doSomethingLongTime();
console.log("after call doSomethingLongTime");


