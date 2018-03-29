/**
 * Created by chengkang on 2018/3/19.
 */
function * foo(x){
    yield x+1;
    yield x+1;
    return x;
}

var f = foo(1);
console.log("f.next():"+f.next().value);
console.log("f.next():"+f.next().value);
console.log("f.next():"+f.next().value);
console.log("f.next():"+f.next().value);

function * counter(){
    var sum = 0;
    for(var i=1;i<4;i++){
        yield ++sum;
    }
}

var f2 = counter();
console.log("f2.next():"+f2.next().value);
console.log("f2.next():"+f2.next().value);
console.log("f2.next():"+f2.next().value);
console.log("f2.next():"+f2.next().value);
console.log("f2.next():"+f2.next().value);

function* next_id() {
    var sum = 1;
    while (1){
        yield sum++;
    }
}

// 测试:
var
    x,
    pass = true,
    g = next_id();
for (x = 1; x < 100; x ++) {
    var r = g.next().value;
    if (r !== x) {
        pass = false;
        console.log('测试失败! r:'+r+"x:"+x);
        //break;
    }
}
if (pass) {
    console.log('测试通过!');
}