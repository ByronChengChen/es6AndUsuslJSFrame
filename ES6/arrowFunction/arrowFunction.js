//箭头函数内部的this是词法作用域，由上下文确定。
//箭头函数基本上都是在方法内部，总之都是以非方法的方式使用，如果将箭头函数当做一个方法使用会怎样呢？
//可以看到，作为方法的箭头函数this指向全局window对象，而普通函数则指向调用它的对象
"use strict"
var obj = {
    i: 10,
    //作为方法的箭头函数
    b: () => console.log('arrow fun4 b() this.i:' +  this.i + ' this:' + this),
    //普通函数
    c: function() {
        console.log('arrow fun4 c() this.i:' + this.i + ' this:' + this + '\n');
    },
    //方法内部的箭头函数,以非方法的方式使用
    geti : function(){
        var fun = () => this.i;
        console.log('arrow fun4 geti this.i:' + this.i + ' this:' + this + '\n');
        return fun();
    }
}
obj.b();  // undefined window{...}
obj.c();  // 10 Object {...}
obj.geti();