/**
 * Created by chengkang on 2018/3/8.
 */
//iterable 1 遍历Array可以采用下标循环，遍历Map和Set就无法使用下标。为了统一集合类型，ES6标准引入了新的iterable类型，Array、Map和Set都属于iterable类型。
//iterable 2 for ... of 可以遍历 array,set,map
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

//iterable 3 for ... of 和 for ... in 区别,
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

//iterable 4 for each
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

