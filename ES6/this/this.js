/**
 * Created by chengkang on 2018/3/8.
 */

function getAge() {
    var y = new Date().getFullYear();
    return y - this.birth;
}

var xiaoming = {
    name: '小明',
    birth: 1990,
    age: getAge
};

xiaoming.age(); // 25, 正常结果
var age = getAge();// NaN
console.log("test1:" + age);


var xiaoming = {
    name: '小明',
    birth: 1990,
    age: function () {
        var y = new Date().getFullYear();
        return y - this.birth;
    }
};

var fn = xiaoming.age;
var age = fn(); // Uncaught TypeError: Cannot read property 'birth' of undefined
console.log("test2:" + age);// NaN


var xiaoming = {
    name: '小明',
    birth: 1990,
    age: function () {
        function getAgeFromBirth() {
            var y = new Date().getFullYear();
            return y - this.birth;
        }
        return getAgeFromBirth();
    }
};

var age = xiaoming.age(); // Uncaught TypeError: Cannot read property 'birth' of undefined
console.log("test3:" + age);//NaN


var xiaoming = {
    name: '小明',
    birth: 1990,
    age: function () {
        var that = this; // 在方法内部一开始就捕获this
        function getAgeFromBirth() {
            var y = new Date().getFullYear();
            return y - that.birth; // 用that而不是this
        }
        return getAgeFromBirth();
    }
};

var age =xiaoming.age(); // 28 廖的博客写的是25 三年了啊
console.log("test4:" + age);//NaN


//apply 要指定函数的this指向哪个对象，可以用函数本身的apply方法，它接收两个参数，第一个参数就是需要绑定的this变量，第二个参数是Array，表示函数本身的参数。
function getAge() {
    var y = new Date().getFullYear();
    return y - this.birth;
}


var xiaoming = {
    name: '小明',
    birth: 1990,
    age: getAge
};

xiaoming.age(); // 28
var age =getAge.apply(xiaoming, []); // 28, this指向xiaoming, 参数为空
console.log("test5:" + age);//NaN

//另一个与apply()类似的方法是call()
//apply()把参数打包成Array再传入； call()把参数按顺序传入。对普通函数调用，我们通常把this绑定为null。
//Math.max.apply(null, [3, 5, 4]); // 5
//Math.max.call(null, 3, 5, 4); // 5

//装饰器 之 方法包装
var count = 0;
var oldParseInt = parseInt; // 保存原函数

window.parseInt = function () {
    count += 1;
    return oldParseInt.apply(null, arguments); // 调用原函数
};
parseInt('10');
parseInt('20');
parseInt('30');
console.log('count = ' + count); // 3

var total = 3;
function toInt(data){
    return +data;
}
total+=toInt("11");
console.log("total:"+total);
//console.log("toint(255):"+toInt(255));