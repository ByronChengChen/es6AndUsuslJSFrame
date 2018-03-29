### use strict
* //strict 1 整个文件都会使用 严格模式
* //strict 2 plane = 5; 未声明变量 使用严格模式,会报错
* //strict 3检查对象中的重复键
* //strict 4 重复的参数
* //strict 5 限制函数中的arguments

	```
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
	```
### set 和 map
* //map 1 “名字”-“成绩”的对照表

	```
		var m = new Map([['Michael', 95], ['Bob', 75], ['Tracy', 85]]);
		m.get('Michael'); // 95
	```

* //map 2 初始化Map需要一个二维数组，或者直接初始化一个空Map。Map具有以下方法：

```
	var m = new Map(); // 空Map
	m.set('Adam', 67); // 添加新的key-value
	m.set('Bob', 59);
	m.has('Adam'); // 是否存在key 'Adam': true
	m.get('Adam'); // 67
	m.delete('Adam'); // 删除key 'Adam'
	m.get('Adam'); // undefined
```

* //map 3 由于一个key只能对应一个value，所以，多次对一个key放入value，后面的值会把前面的值冲掉：

```
	var m = new Map();
	m.set('Adam', 67);
	m.set('Adam', 88);
	m.get('Adam'); // 88
```

* //set 1 Set和Map类似，也是一组key的集合，但不存储value。由于key不能重复，所以，在Set中，没有重复的key。

```
	//set2  要创建一个Set，需要提供一个Array作为输入，或者直接创建一个空Set：
	var s1 = new Set(); // 空Set
	var s2 = new Set([1, 2, 3]); // 含1, 2, 3
```

* //set 2 重复元素在Set中自动被过滤：

```
	var s = new Set([1, 2, 3, 3, '3']);
	s; // Set {1, 2, 3, "3"}
	// 注意数字3和字符串'3'是不同的元素。
```

* //set 3 通过add(key)方法可以添加元素到Set中，可以重复添加，但不会有效果：

```
	s.add(4);
	s; // Set {1, 2, 3, 4}
	s.add(4);
	s; // 仍然是 Set {1, 2, 3, 4}
```

* //set 4 通过delete(key)方法可以删除元素：

### iterable 
* //iterable 1 遍历Array可以采用下标循环，遍历Map和Set就无法使用下标。为了统一集合类型，ES6标准引入了新的iterable类型，Array、Map和Set都属于iterable类型。
* //iterable 2 for ... of 可以遍历 array,set,map

```
var a = ['A', 'B', 'C'];
var s = new Set(['A', 'B', 'C']);
var m = new Map([[1, 'x'], [2, 'y'], [3, 'z']]);
for (var x of a) { // 遍历Array
    console.log(x);
}
for (var x of s) { // 遍历Set
    console.log(x);
}
for (var x of m) { // 遍历Map
    console.log(x[0] + '=' + x[1]);
}

```

* //iterable 3 for ... of 和 for ... in 区别,

```
// 当我们手动给Array对象添加了额外的属性后，for ... in循环将带来意想不到的意外效果：
//var a = ['A', 'B', 'C'];
//a.name = 'Hello';
//for (var x in a) {
//    console.log(x); // '0', '1', '2', 'name'
//}

var a = ['A', 'B', 'C'];
a.name = 'Hello';
for (var x of a) {
    console.log(x); // 'A', 'B', 'C'
}
```

* //iterable 4 for each

```
a.forEach(function (element, index, array) {
    // element: 指向当前元素的值
    // index: 指向当前索引
    // array: 指向Array对象本身
    console.log(element + ', index = ' + index);
});
//Set与Array类似，但Set没有索引，因此回调函数的前两个参数都是元素本身：
var s = new Set(['A', 'B', 'C']);
s.forEach(function (element, sameElement, set) {
    console.log(element);
});
//Map的回调函数参数依次为value、key和map本身：
var m = new Map([[1, 'x'], [2, 'y'], [3, 'z']]);
m.forEach(function (value, key, map) {
    console.log(value);
});
//如果对某些参数不感兴趣，由于JavaScript的函数调用不要求参数必须一致，因此可以忽略它们。例如，只需要获得Array的element：
var a = ['A', 'B', 'C'];
a.forEach(function (element) {
    console.log(element);
});
```

###arguments

* //arguments 1 JavaScript还有一个免费赠送的关键字arguments，它只在函数内部起作用，并且永远指向当前函数的调用者传入的所有参数。arguments类似Array但它不是一个Array：

```
function foo(x) {
    console.log('x = ' + x); // 10
    for (var i=0; i<arguments.length; i++) {
        console.log('arg ' + i + ' = ' + arguments[i]); // 10, 20, 30
    }
}
foo(10, 20, 30);
```

* //arguments 2 利用arguments，你可以获得调用者传入的所有参数。也就是说，即使函数不定义任何参数，还是可以拿到参数的值：

```
function abs() {
    if (arguments.length === 0) {
        return 0;
    }
    var x = arguments[0];
    return x >= 0 ? x : -x;
}

abs(); // 0
abs(10); // 10
abs(-9); // 9
```

* //arguments 3 实际上arguments最常用于判断传入参数的个数。你可能会看到这样的写法：

``` 
// foo(a[, b], c)
// 接收2~3个参数，b是可选参数，如果只传2个参数，b默认为null：
function foo(a, b, c) {
    if (arguments.length === 2) {
        // 实际拿到的参数是a和b，c为undefined
        c = b; // 把b赋给c
        b = null; // b变为默认值
    }
    // ...
}

//要把中间的参数b变为“可选”参数，就只能通过arguments判断，然后重新调整参数并赋值。
// foo(a[, b], c)
// 接收2~3个参数，b是可选参数，如果只传2个参数，b默认为null：
function foo(a, b, c) {
    if (arguments.length === 2) {
        // 实际拿到的参数是a和b，c为undefined
        c = b; // 把b赋给c
        b = null; // b变为默认值
    }
    // ...
}
```

* // arguments 4 rest 为了获取除了已定义参数a、b之外的参数，我们不得不用arguments，并且循环要从索引2开始以便排除前两个参数，这种写法很别扭，只是为了获得额外的rest参数，有没有更好的方法？

```
// rest参数只能写在最后，前面用...标识，从运行结果可知，传入的参数先绑定a、b，多余的参数以数组形式交给变量rest，所以，不再需要arguments我们就获取了全部参数。
// 如果传入的参数连正常定义的参数都没填满，也不要紧，rest参数会接收一个空数组
function foo(a, b, ...rest) {
    console.log('a = ' + a);
    console.log('b = ' + b);
    console.log(rest);
}

foo(1, 2, 3, 4, 5);
// 结果:
// a = 1
// b = 2
// Array [ 3, 4, 5 ]

foo(1);
// 结果:
// a = 1
// b = undefined
// Array []
```


### return语句 前面我们讲到了JavaScript引擎有一个在行末自动添加分号的机制，这可能让你栽到return语句的一个大坑：
```
//function foo() {
//    return; // 自动添加了分号，相当于return undefined;
//    { name: 'foo' }; // 这行语句已经没法执行到了
//}

//所以正确的多行写法是：

function foo() {
    return { // 这里不会自动加分号，因为{表示语句尚未结束
        name: 'foo'
    };
}
```

### method
* // method 1 由于JavaScript的函数可以嵌套，此时，内部函数可以访问外部函数定义的变量，反过来则不行：

```
function foo() {
    var x = 1;
    function bar() {
        var y = x + 1; // bar可以访问foo的变量x!
    }
    var z = y + 1; // ReferenceError! foo不可以访问bar的变量y!
}
```

* // method 2 JavaScript的函数在查找变量时从自身函数定义开始，从“内”向“外”查找。如果内部函数定义了与外部函数重名的变量，则内部函数的变量将“屏蔽”外部函数的变量。

```
function foo() {
    var x = 1;
    function bar() {
        var x = 'A';
        console.log('x in bar() = ' + x); // 'A'
    }
    console.log('x in foo() = ' + x); // 1
    bar();
}
```

* // method 3 变量提升
//JavaScript的函数定义有个特点，它会先扫描整个函数体的语句，把所有申明的变量“提升”到函数顶部：

```
//虽然是strict模式，但语句var x = 'Hello, ' + y;并不报错，原因是变量y在稍后申明了。但是console.log显示Hello, undefined，说明变量y的值为undefined。这正是因为JavaScript引擎自动提升了变量y的声明，但不会提升变量y的赋值。
function foo() {
    'use strict';
    var x = 'Hello, ' + y;
    console.log(x);
    var y = 'Bob';
}

foo();
```

* // method 4 全局作用域
//不在任何函数内定义的变量就具有全局作用域。实际上，JavaScript默认有一个全局对象window，全局作用域的变量实际上被绑定到window的一个属性：

```
var course = 'Learn JavaScript';
alert(course); // 'Learn JavaScript'
alert(window.course); // 'Learn JavaScript'
// 因此，直接访问全局变量course和访问window.course是完全一样的。

// method 5 顶层函数的定义也被视为一个全局变量，并绑定到window对象
function foo() {
    alert('foo');
}

foo(); // 直接调用foo()
window.foo(); // 通过window.foo()调用
```

* // method 5 alert

```
window.alert('调用window.alert()');
// 把alert保存到另一个变量:
var old_alert = window.alert;
// 给alert赋一个新函数:
window.alert = function () {}
alert('无法用alert()显示了!');
// 恢复alert:
window.alert = old_alert;
alert('又可以用alert()了!');
```

* // method 6 名字空间 许多著名的JavaScript库都是这么干的：jQuery，YUI，underscore等等。
//减少冲突的一个方法是把自己的所有变量和函数全部绑定到一个全局变量中
// 唯一的全局变量MYAPP:

```
var MYAPP = {};

// 其他变量:
MYAPP.name = 'myapp';
MYAPP.version = 1.0;

// 其他函数:
MYAPP.foo = function () {
    return 'foo';
};
```

* // method 7 局部作用域 由于JavaScript的变量作用域实际上是函数内部，我们在for循环等语句块中是无法定义具有局部作用域的变量的：

```
function foo() {
    for (var i=0; i<100; i++) {
        //
    }
    i += 100; // 仍然可以引用变量i
}

// 为了解决块级作用域，ES6引入了新的关键字let，用let替代var可以申明一个块级作用域的变量：
function foo() {
    var sum = 0;
    for (let i=0; i<100; i++) {
        sum += i;
    }
    // SyntaxError:
    i += 1;
}
```

* // method 8 常量

```
//由于var和let申明的是变量，如果要申明一个常量，在ES6之前是不行的，我们通常用全部大写的变量来表示“这是一个常量，不要修改它的值”：
//ES6标准引入了新的关键字const来定义常量，const与let都具有块级作用域：
const PI = 3.14;
PI = 3; // 某些浏览器不报错，但是无效果！
PI; // 3.14
```

* // method 9 解构赋值

```
//什么是解构赋值？我们先看看传统的做法，如何把一个数组的元素分别赋值给几个变量：
var array = ['hello', 'JavaScript', 'ES6'];
var x = array[0];
var y = array[1];
var z = array[2];

//现在，在ES6中，可以使用解构赋值，直接对多个变量同时赋值：

// 如果浏览器支持解构赋值就不会报错:
var [x, y, z] = ['hello', 'JavaScript', 'ES6'];
// 如果需要从一个对象中取出若干属性，也可以使用解构赋值，便于快速获取对象的指定属性：
var person = {
    name: '小明',
    age: 20,
    gender: 'male',
    passport: 'G-12345678',
    school: 'No.4 middle school'
};
var {name, age, passport} = person;
// name, age, passport分别被赋值为对应属性:
console.log('name = ' + name + ', age = ' + age + ', passport = ' + passport);
//对一个对象进行解构赋值时，同样可以直接对嵌套的对象属性进行赋值，只要保证对应的层次是一致的：
var person = {
    name: '小明',
    age: 20,
    gender: 'male',
    passport: 'G-12345678',
    school: 'No.4 middle school',
    address: {
        city: 'Beijing',
        street: 'No.1 Road',
        zipcode: '100001'
    }
};
var {name, address: {city, zip}} = person;
name; // '小明'
city; // 'Beijing'
zip; // undefined, 因为属性名是zipcode而不是zip
// 注意: address不是变量，而是为了让city和zip获得嵌套的address对象的属性:
address; // Uncaught ReferenceError: address is not defined

//如果要使用的变量名和属性名不一致，可以用下面的语法获取：
var person = {
    name: '小明',
    age: 20,
    gender: 'male',
    passport: 'G-12345678',
    school: 'No.4 middle school'
};

// 把passport属性赋值给变量id:
let {name, passport:id} = person;
name; // '小明'
id; // 'G-12345678'
// 注意: passport不是变量，而是为了让变量id获得passport属性:
passport; // Uncaught ReferenceError: passport is not defined

//解构赋值还可以使用默认值，这样就避免了不存在的属性返回undefined的问题：
var person = {
    name: '小明',
    age: 20,
    gender: 'male',
    passport: 'G-12345678'
};

// 如果person对象没有single属性，默认赋值为true:
var {name, single=true} = person;
name; // '小明'
single; // true

//有些时候，如果变量已经被声明了，再次赋值的时候，正确的写法也会报语法错误：
// 声明变量:
var x, y;
// 解构赋值:
{x, y} = { name: '小明', x: 100, y: 200};
// 语法错误: Uncaught SyntaxError: Unexpected token =
// 这是因为JavaScript引擎把{开头的语句当作了块处理，于是=不再合法。解决方法是用小括号括起来：
({x, y} = { name: '小明', x: 100, y: 200});

//使用场景
//解构赋值在很多时候可以大大简化代码。例如，交换两个变量x和y的值，可以这么写，不再需要临时变量：
var x=1, y=2;
[x, y] = [y, x]
// 快速获取当前页面的域名和路径：
var {hostname:domain, pathname:path} = location;
//如果一个函数接收一个对象作为参数，那么，可以使用解构直接把对象的属性绑定到变量中。例如，下面的函数可以快速创建一个Date对象：
function buildDate({year, month, day, hour=0, minute=0, second=0}) {
    return new Date(year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second);
}
//它的方便之处在于传入的对象只需要year、month和day这三个属性：
buildDate({ year: 2017, month: 1, day: 1 });
// Sun Jan 01 2017 00:00:00 GMT+0800 (CST)
//也可以传入hour、minute和second属性：
buildDate({ year: 2017, month: 1, day: 1, hour: 20, minute: 15 });
// Sun Jan 01 2017 20:15:00 GMT+0800 (CST)
```