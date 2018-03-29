/**
 * Created by chengkang on 2018/3/16.
 */
function calSum(array){
    return array.reduce(function (x,y){
        return x+y;
    });
}

var arr = [1,2,3,4,5];
console.log("sum arr:" + calSum(arr));

function  calMultiply(array){
    return array.reduce(function (x,y){
        return x*y;
    });
}

console.log("multiply:"+calMultiply(arr));

function string2Int(s){
    var charArr = s.split("");
    var intArr = charArr.map(function(char){
        return {"0":0,"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9}[char];
    });
    return intArr.reduce(function (x,y){
        return x*10 + y;
    });
}

var resultString2Int = string2Int("12345");
console.log("string2Int(\"12345\"):" + resultString2Int + ",type:"+typeof(resultString2Int));

function normalize(arr) {
    return arr.map(function (str){
        var charArr = str.split("");
        var newArr = new Array;
        for(var i=0;i<charArr.length;i++){
            var char = charArr[i];
            if(0==i){
                newArr.push(char.toUpperCase());
            }else{
                newArr.push(char.toLowerCase());
            }
        }
        return newArr.reduce(function(x,y){
            return x+y;
        });
    })
}

if (normalize(['adam', 'LISA', 'barT']).toString() === ['Adam', 'Lisa', 'Bart'].toString()) {
    console.log('测试通过!');
}
else {
    console.log('测试失败!');
}

var arr = ['1', '2', '3'];
var r = arr.map(function (x){
    return parseInt(x);
});
console.log("r:"+r);

function parse2Int(x){
    return parseInt(x);
}

var r2 = arr.map(parse2Int);
console.log("r2:"+r2);

//parseInt 省略了参数
var r3 = arr.map(parseInt);
console.log("r3:"+r3);

//帅选素数
function get_primes(arr) {
    return arr.filter(function(x){
        let suFlag = false;
        if(x==1){
          return false;
        }else if(x==2){
            return true;
        }else {
            for(var element = 2;element<x;element++){
                if(x%element==0){
                    return false;
                }
            }
            return true;
        }
    });
}

var
    x,
    r4,
    arr = [];
for (x = 1; x < 100; x++) {
    arr.push(x);
}
r4 = get_primes(arr);
console.log("r4:"+r4);

var r5 = ['Google', 'apple', 'Microsoft'];
r5.sort(function (s1, s2) {
    x1 = s1.toUpperCase();
    x2 = s2.toUpperCase();
    if (x1 < x2) {
        return -1;
    }
    if (x1 > x2) {
        return 1;
    }
    return 0;
}); // ['apple', 'Google', 'Microsoft']
console.log("r5:"+r5);
