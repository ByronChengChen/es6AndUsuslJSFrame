/**
 * Created by chengkang on 2018/3/8.
 */
//strict 1 整个文件都会使用 严格模式
//"use strict"
function doStuff(){
    // use strict is enabled here!
}


//strict 2 plane = 5; 未声明变量 使用严格模式,这里会报错
var plane = 5;

//strict 3 检查对象中的重复键
var zombie = {
    eyeLeft : 0,
    eyeRight: 1
    // ... a lot of keys ...
    //eyeLeft : 1 这段代码会抛出一个错误因为 eyeLeft 出现了两次。这比你用眼睛去找错误要快多了。
}

//strict 4 重复的参数
//function run(fromWhom, fromWhom){}

//strict 5 限制函数中的arguments
/*
var run = function(fromWhom){
    arguments[0] = 'alien';
    alert(fromWhom);
}
run('zombie');
// alert: 'alien';
    */

var run = function(fromWhom){
    "use strict";
    arguments[0] = 'alien';
    alert(fromWhom);
}
run('zombie');
// alert: 'zombie';
