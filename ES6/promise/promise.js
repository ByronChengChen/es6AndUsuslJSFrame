/**
 * Created by chengkang on 2018/3/19.
 */
//'use strict';

'use strict';

new Promise((reslove,reject)=>{
    console.log("use promise");
    var timeOut = Math.random()*2;
    if(timeOut>2){
        reslove("bigger than 2");
    }else{
        reject("lower than 2");
    }
}).then((result)=>{
    console.log(result);
}).catch((errorINfo)=>{
    console.log(errorINfo);
});

console.log("after promise");

// 清除log:
var logging = document.getElementById('test-promise-log');
while (logging.children.length > 1) {
    logging.removeChild(logging.children[logging.children.length - 1]);
}

// 输出log到页面:
function log(s) {
    var p = document.createElement('p');
    p.innerHTML = s;
    logging.appendChild(p);
}

//then 和 catch 的参数来自于 reslove 和 reject的入参
new Promise(function(success,fail){
    log("start promise");
    var timeOut = Math.random()*2;
    log("timeOut:"+timeOut);
    setTimeout(function(){
        if(timeOut<1){
            log("call resolve");
            success("200 ok");
        }else{
            log("call reject");
            fail("timeOut in:"+timeOut+"seconds");
        }
    },timeOut*1000);
}).then(function(success){
    log("done:"+success+","+"params.type:"+typeof(success));
}).catch(function(fail){
    log("failed:"+fail);
})


var logging2 = document.getElementById('test-promise2-log');
while (logging2.children.length > 1) {
    logging2.removeChild(logging2.children[logging2.children.length - 1]);
}

function log2(s) {
    var p = document.createElement('p');
    p.innerHTML = s;
    logging2.appendChild(p);
}

// 0.5秒后返回input*input的计算结果:
function multiply(input) {
    return new Promise(function (resolve, reject) {
        log2('calculating ' + input + ' x ' + input + '...');
        setTimeout(resolve, 500, input * input);
    });
}

//var timeoutID = scope.setTimeout(function[, delay, param1, param2, ...]);
// 0.5秒后返回input+input的计算结果:
function add(input) {
    return new Promise(function (resolve, reject) {
        log2('calculating ' + input + ' + ' + input + '...');
        setTimeout(resolve, 500, input + input);
    });
}

var p = new Promise(function (resolve, reject) {
    log2('start new Promise...');
    resolve(123);
});

p.then(multiply)
    .then(add)
    .then(multiply)
    .then(add)
    .then(function (result) {
        log2('Got value: ' + result);
    });

var p1 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 500, 'P1');
});
var p2 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 400, 'P2');
});
// 同时执行p1和p2，并在它们都完成后执行then:
Promise.all([p2, p1]).then(function (results) {
    console.log(results); // 获得一个Array: ['P1', 'P2']
});

//有些时候，多个异步任务是为了容错
var p1 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 500, 'P1');
});
var p2 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 600, 'P2');
});
Promise.race([p1, p2]).then(function (result) {
    console.log(result); // 'P1'
});