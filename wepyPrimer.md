# wepy语法基础
## app.wpy文件

## wepy.mixin 兼容式混合
* 对于组件methods响应事件，以及小程序页面事件将采用兼容式混合，即先响应组件本身响应事件，然后再响应混合对象中响应事件。注意，这里事件的执行顺序跟Vue中相反，Vue中是先执行mixin中的函数， 再执行组件本身的函数。

## 小程序断点调试
* 微信开发者工具:sources->sources 打断点

## 小程序的异步操作

## Component组件
* 生命周期，属性，方法

```
	 customData = {}  // 自定义数据

    customFunction ()　{}  //自定义方法

    onLoad () {}  // 在Page和Component共用的生命周期函数

    onShow () {}  // 只在Page中存在的页面生命周期函数

    config = {};  // 只在Page实例中存在的配置数据，对应于原生的page.json文件

    data = {};  // 页面所需数据均需在这里声明，可用于模板数据绑定

    components = {};  // 声明页面中所引用的组件，或声明组件中所引用的子组件

    mixins = [];  // 声明页面所引用的Mixin实例

    computed = {};  //组件中有任何数据发生了改变，那么所有计算属性就都会被重新计算。

    watch = {};  // 声明数据watcher（详见后文介绍）

    methods = {};  // 声明页面wxml中标签的事件处理函数。注意，此处只用于声明页面wxml中标签的bind、catch事件，自定义方法需以自定义方法的方式声明

    events = {};  // 声明组件之间的事件处理函数
```
* watch

```
 // 监听器函数名必须跟需要被监听的data对象中的属性num同名，
  // 其参数中的newValue为属性改变后的新值，oldValue为改变前的旧值
  watch = {
      num (newValue, oldValue) {
          console.log(`num value: ${oldValue} -> ${newValue}`)
      }
  }

```

* computed
	* computed计算属性，是一个有返回值的函数，可直接被当作绑定数据来使用。因此类似于data属性，代码中可通过this.计算属性名来引用，模板中也可通过{{ 计算属性名 }}来绑定数据。
	* 需要注意的是，只要是组件中有任何数据发生了改变，那么所有计算属性就都会被重新计算。

* **一个组件内使用多个同一类型的子组件：需要注意的是，WePY中的组件都是静态组件，是以组件ID作为唯一标识的，每一个ID都对应一个组件实例，当页面引入两个相同ID的组件时，这两个组件共用同一个实例与数据，当其中一个组件数据变化时，另外一个也会一起变化。如果需要避免这个问题，则需要分配多个组件ID和实例。代码如下：**
	* **注意：WePY中，在父组件template模板部分插入驼峰式命名的子组件标签时，不能将驼峰式命名转换成短横杆式命名(比如将childCom转换成child-com)，这与Vue中的习惯是不一致。**

```
counter1: Counter,
counter2: Counter,

<view class="counterview">
<counter1 @index-emit.user="counterEmit" />
</view>
      
<view class="counterview">
<counter2 :num.sync="mynum"></counter2>
</view>
```

* 组件通信
wepy.component基类提供$broadcast、$emit、$invoke三个方法用于组件之间的通信和交互，如：
	* **broadcast**
	$broadcast事件是由父组件发起，所有子组件都会收到此广播事件，除非事件被手动取消。事件广播的顺序为广度优先搜索顺序，如上图，如果页面Page_Index发起一个$broadcast事件，那么按先后顺序依次接收到该事件的组件为
	<img src="https://cloud.githubusercontent.com/assets/2182004/20554688/800089e6-b198-11e6-84c5-352d2d0e2f7e.png">
	
	```
	eg:
	//父组件发出广播
	this.$broadcast('index-broadcast', 1, 3, 4);
	//子组件需要在events中订阅广播
	events = {
      'index-broadcast': (...args) => {
      	  //最后一个参数是广播事件
        let $event = args[args.length - 1]
        console.log(`${this.$name} receive ${$event.name} from ${$event.source.name}`)
        for (let index = 0; index < args.length; index++) {
          const element = args[index];
          console.log(element);
        }
      }
    }
	```
	* **emit** emit与$broadcast正好相反，事件发起组件的所有祖先组件会依次接收到$emit事件。如果组件ComE发起一个$emit事件，那么接收到事件的先后顺序为：组件ComA、页面Page_Index。如下图：
	<img src="https://cloud.githubusercontent.com/assets/2182004/20554704/9997932c-b198-11e6-9840-3edae2194f47.png">

	* **invoke** invoke是一个页面或组件对另一个组件中的方法的直接调用，通过传入组件路径找到相应的组件，然后再调用其方法。
	* 
		```
		比如，想在页面Page_Index中调用组件ComA的某个方法：
		this.$invoke('ComA', 'someMethod', 'someArgs');
		```
		
* wepy数据绑定方式 脏数据检查
	* WePY使用脏数据检查对setData进行封装，在函数运行周期结束时执行脏数据检查，一来可以不用关心页面多次setData是否会有性能上的问题，二来可以更加简洁去修改数据实现绑定，不用重复去写setData方法。代码如下：
	
	```
	this.title = 'this is title';
	```
	* 需注意的是，在异步函数中更新数据的时，必须手动调用$apply方法，才会触发脏数据检查流程的运行。如：
	
	```
	setTimeout(() => {
    this.title = 'this is title';
    this.$apply();
}, 3000);
	```
* **props 传值**
	* **静态传值** 静态传值为父组件向子组件传递常量数据，因此只能传递String字符串类型。在父组件template模板部分的组件标签中，使用子组件props对象中所声明的属性名作为其属性名来接收父组件传递的值。
	
	```
	//father.wpy
	<template>
		<child :title="mytitle"></child>
	</template>
	
	//child.wpy
	props = {
	    title: String
	};
	
	onLoad () {
	    console.log(this.title); // mytitle
	}
	```
	* **sync** 父组件数据绑定至子组件
	* **twoWay** 子组件数据绑定至父组件
	* **注意** 注意：下文示例中的twoWay为true时，表示子组件向父组件单向动态传值，而twoWay为false(默认值，可不写
	
	```
	//parent.wpy
<child :title="parentTitle" :syncTitle.sync="parentTitle" :twoWayTitle="parentTitle"></child>

	// child.wpy
	props = {
    // 静态传值
    title: String,

    // 父向子单向动态传值
    syncTitle: {
        type: String,
        default: 'null'
    },

    twoWayTitle: {
        type: Number,
        default: 'nothing',
        twoWay: true
    }
};
onLoad () {
    console.log(this.title); // p-title
    console.log(this.syncTitle); // p-title
    console.log(this.twoWayTitle); // p-title

    this.title = 'c-title';
    console.log(this.$parent.parentTitle); // p-title.
    this.twoWayTitle = 'two-way-title';
    this.$apply();
    console.log(this.$parent.parentTitle); // two-way-title.  --- twoWay为true时，子组件props中的属性值改变时，会同时改变父组件对应的值
    this.$parent.parentTitle = 'p-title-changed';
    this.$parent.$apply();
    console.log(this.title); // 'c-title';
    console.log(this.syncTitle); // 'p-title-changed' --- 有.sync修饰符的props属性值，当在父组件中改变时，会同时改变子组件对应的值。
}

	```

* 组件的循环渲染 repeat 类似于原生微信的**block**

```
// index.wpy
<template>
    <!-- 注意，使用for属性，而不是使用wx:for属性 -->
    <repeat for="{{list}}" key="index" index="index" item="item">
        <!-- 插入<script>脚本部分所声明的child组件，同时传入item -->
        <child :item="item"></child>
    </repeat>
</template>

<script>
	import wepy from 'wepy';
    // 引入child组件文件
    import Child from '../components/child';
    export default class Index extends wepy.component {
        components = {
            // 声明页面中要使用到的Child组件的ID为child
            child: Child
        }
        data = {
            list: [{id: 1, title: 'title1'}, {id: 2, title: 'title2'}]
        }
    }
</script>
```


## slot 组件内容分发插槽

* WePY中的slot插槽作为内容分发标签的空间占位标签，便于在父组件中通过对相当于扩展板卡的内容分发标签的“插拔”，更为灵活、方便地对子组件进行内容分发。

* 具体使用方法是，首先在子组件template模板部分中声明slot标签作为内容插槽，同时必须在其name属性中指定插槽名称，还可设置默认的标签内容；然后在引入了该带有插槽的子组件的父组件template模板部分中声明用于“插拔”的内容分发标签。

* 注意，这些父组件中的内容分发标签必须具有slot属性，并且其值为子组件中对应的插槽名称，这样父组件内容分发标签中的内容会覆盖掉子组件对应插槽中的默认内容。

* 另外，要特别注意的是，父组件中一旦声明了对应于子组件插槽的内容分发标签，即便没有内容，子组件插槽中的默认内容也不会显示出来，只有删除了父组件中对应的内容分发标签，才能显示出来。

* 示例：在Panel组件中有以下模板：

```
<view class="panel">
    <slot name="title">默认标题</slot>
    <slot name="content">默认内容</slot>
</view>

在父组件中使用Pannel子组件时，可以这样使用：

<panel>
    <view slot="title">新的标题</view>
    <view slot="content">
        <text>新的内容</text>
    </view>
</panel>
```

### 自定义标签选择器问题
* 自定义标签选择器的优先级 **子组件样式的子选择器>父组件的选择器>子组件样式并列的选择器**

*子组件*

```
<style lang="less">
.panel {
  //子组件样式的子选择器
  // .subtitle {
  //   padding-bottom: 20rpx;
  //   font-size: 14px;
  //   color: red;
  // }
}
  //子组件样式并列的选择器
.subtitle {
  padding-bottom: 20rpx;
  font-size: 14px;
  color: blue;
}
</style>
<template>
  <view class="panel">
    <slot name="title">Title</slot>
    <slot name="contentslot">默认内容</slot>
    <slot>
    </slot>
  </view>
</template>
<script>
import wepy from 'wepy';

export default class Panel extends wepy.component {}
</script>

```

*父组件* 

```
***其他代码
<panel>
      <view class="title" slot="title">pannel slot title 测试数据绑定</view>
      <view class="subtitle">pannel slot title2测试数据绑定</view>
      <view class="subtitle" slot="contentslot">pannel slot title2测试数据绑定</view>
      <text class="subtitle">text</text>
    </panel>
***其他代码
```

## 微信原生组件有view,text等等 ui组件
* 官方文档 https://mp.weixin.qq.com/debug/wxadoc/dev/component/

## npm 第三方库
* npm package.json配置
* npm第三方插件查找 https://www.npmjs.com/package/框架名称
* eg 使用 wepy-com-toast
	* 查看文档https://www.npmjs.com/package/wepy-com-toast
	* wepy-com-toast 有个错误，需要使用<toast/>才能使用
	
	```
	<template>
  		<view class="container">
  		***
  		<button @tap="toast" size="mini">第三方组件</button>
  		<toast />
  		<>
	  </view>
	</template>
	
	toast() {
      let promise = this.$invoke('toast', 'show', {
        title: '自定义标题',
        img:
          'https://raw.githubusercontent.com/kiinlam/wetoast/master/images/star.png'
      });

      promise.then(d => {
        console.log('toast done');
      });
    },
	```

## 原生小程序 WXML 提供两种文件引用方式import和include。

## npm 如何使用第三方库
* [Nprogress & nanobar](https://www.cnblogs.com/y114113/p/6289629.html)的使用

## wepy框架在使用过程中的问题
* 有时候修改了代码，可是还是不能及时渲染，这时候可以停止 wepy的实时编译，再次重新实时编译就行

