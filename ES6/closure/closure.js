/**
 * Created by chengkang on 2018/3/19.
 */
//返回闭包时牢记的一点就是：返回函数不要引用任何循环变量，或者后续会发生变化的变量。
function count() {
    var arr = [];
    for (var i=1; i<=3; i++) {
        arr.push(function () {
            return i * i;
        });
    }
    return arr;
}

var results = count();
var f1 = results[0];
var f2 = results[1];
var f3 = results[2];
var r1 = f1();
var r2 = f2();
var r3 = f3();

console.log("r1:"+r1);
console.log("r2:"+r2);
console.log("r3:"+r3);

//创建一个匿名函数并立刻执行
(function (x) { return x * x }) (3);

function count2() {
    var arr = [];
    for (var i=1; i<=3; i++) {
        //匿名函数立即使用了i
        arr.push((function (n) {
            return function () {
                return n * n;
            }
        })(i));
    }
    return arr;
}

var newResults = count2();
var newF = newResults[0];
var newF2 = newResults[1];
var newF3 = newResults[2];

var r11 = newF();
var r22 = newF2();
var r33 = newF3();

console.log("r11:"+r11);
console.log("r22:"+r22);
console.log("r33:"+r33);

//Java和C++，要在对象内部封装一个私有变量，可以用private修饰一个成员变量
//闭包就是携带状态的函数，并且它的状态可以完全对外隐藏起来。
//借助闭包，同样可以封装一个私有变量。
function create_counter(initial) {
    var x = initial || 0;
    return {
        inc: function () {
            x += 1;
            return x;
        }
    }
}

var c1 = create_counter();
console.log("c1.inc():"+c1.inc());
console.log("c1.inc():"+c1.inc());
console.log("c1.inc():"+c1.inc());

//闭包还可以把多参数的函数变成单参数的函数。
//典型使用 x的n次方,并提取出平方和立方
function pow(n){
    return function (x){
        return Math.pow(x,n);
    }
}

pow2 = pow(2);
console.log("pow(2,2):"+pow2(2));
console.log("pow(3,2):"+pow2(3));
console.log("pow(4,2):"+pow2(4));

pow3 = pow(3);
console.log("pow(2,3):"+pow3(2));
console.log("pow(3,3):"+pow3(3));
console.log("pow(4,3):"+pow3(4));