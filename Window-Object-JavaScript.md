# JavaScript 内置对象 Window 概览

> 作为一个强迫症晚期患者，在书写文档时习惯单词首字符大写，在实际的调用中请勿掉坑。
> Window 对象在 JavaScript 中调用时为小写字符。

## 浏览器对象模型（BOM）

浏览器对象模型（BOM）使 JavaScript 与浏览器之间能够进行相关 “**通讯**”。
目前，浏览器对象模型（Browser Object Model）尚无正式标准。
但由于现代浏览器已经（几乎）实现了 JavaScript 交互性方面的相同方法和属性，因此常被认为是 BOM 的方法和属性。

## Window 对象

所有的浏览器都支持 Window 对象，其表示浏览器中打开的窗口，即当前窗口顶层对象。

> 如果文档中包含框架 \( frame / iframe 标签 \) ，浏览器会为 HTML 文档创建一个 Window 对象，并为每一个框架创建一个额外的 Window 对象。

所有 JavaScript 全局对象、函数以及变量都将自动成为 Window 对象的成员，所有的 JavaScript 对象都是在其内部运行。

例如： `console / alert / confirm` 。

```js
window.alert('Hi, Tom!')
// 等于
alert('Hi, Tom!')
```

甚至 HTML DOM 的 Document 也是 Window 对象成员之一。

```js
window.document.getElementById('id_name')
// 等于
document.getElementById('id_name')
```

上述两个示例能够看出 Window 对象作为顶层对象，在书写时可以省略进而直接调用相关属性或方法集合。

## Window 对象集合

| 集合 | 集合描述 |
| :--- | :--- |
| frames\[\] | 返回该窗口中所有的命名框架。 |

该集合是 Window 对象的数组，每个 Window 对象在窗口中含有一个框架或 &lt;iframe&gt;。属性 frames.length 存放数组 frames\[\] 中含有的元素个数。**注意，frames\[\] 数组中引用的框架可能还包括框架，它们自己也具有 frames\[\] 数组**。

**要引用窗口中的一个框架，可以使用如下的语法：**

```js
// 当前窗口的框架
frame[i]
// 当前窗口的框架
self.frame[i]
// 窗口名为 recordTheLife 的框架
recordTheLife.frame[i]
```

**要引用一个窗口的父窗口或父框架，可以使用如下的语法：**

```js
// 当前窗口的父窗口
parent
// 当前窗口的父窗口
self.parent
// 窗口名为 recordTheLife 的父窗口
recordTheLife.parent
```

**要从顶层窗口含有的任何一个框架中引用它，可以使用如下的语法：**

```js
// 当前窗口的顶层窗口
top
// 当前窗口的顶层窗口
self.top
// 框架 recordTheLife 的顶层窗口
recordTheLife.top
```

新的顶层浏览器窗口使用 `Window.open()` 函数创建。当调用该函数时，应把 `open()` 调用的返回时存储于变量中，然后使用该变量来引用新窗口。
新窗口的 `opener` 属性反过来引用了打开它的那个窗口。

## Window 对象属性

| 属性名称 | 属性描述 |
| :--- | :--- |
| innerHeight | 浏览器窗口的内部高度\(不含工具栏和滚动条\) |
| innerWidth | 浏览器窗口的内部宽度\(不含工具栏和滚动条\) |

** \* 针对 Internet Explorer 8、7、6、5 需要使用兼容性写法**

```js
document.documentElement.clientHeight
document.documentElement.clientWidth
```

或者

```js
document.body.clientHeight
document.body.clientWidth
```

**敲黑板、划重点，下方为含有所有版本浏览器的写法**

```js
var _width = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth

var _height = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;
```

| 属性名称 | 属性描述 |
| :--- | :--- |
| name | 设置或返回窗口的名称 |
| opener | 返回对创建此窗口的窗口的引用 |
| closed | 返回窗口是否已被关闭 |
| defaultStatus | 设置或返回窗口状态栏中的默认文本 |
| status | 设置窗口状态栏的文本 |
| document | 对 Document 对象的只读引用 |
| history | 对 History 对象的只读引用 |
| length | 设置或返回窗口中的框架数量 |
| location | 用于窗口或框架的 Location 对象 |
| Navigator | 对 Navigator 对象的只读引用 |
| outerHeight | 返回窗口的外部高度 |
| outerWidth | 返回窗口的外部宽度 |
| pageXOffset | 设置或返回当前页面相对于窗口显示区左边缘距离 |
| pageYOffset | 设置或返回当前页面相对于窗口显示区上边缘距离 |
| Screen | 对 Screen 对象的只读引用 |
| screenLeft / screenTop / screenX / screenY | 只读属性，声明了窗口的左上角在屏幕的 X 坐标和 Y 坐标。IE、Safari 和 Opera 支持 screenLeft 和 screenTop；Google Chrome 和 Firefox 支持 screenX 和 screenY。 |
| parent | 返回父窗口 |
| self | 返回对当前窗口的引用 |
| window | window 属性等价于 self 属性，它包含了对窗口自身的引用 |
| top | 返回最顶层的先辈窗口 |
| screenX | 返回浏览器左边界到屏幕左边界的水平距离 |
| screenY | 返回浏览器上边界到屏幕上边界的垂直距离 |

## Window 对象方法

### 对话窗体类

| 方法名称 | 方法描述 |
| :--- | :--- |
| alert\(\) | 显示带有一段消息和一个确认按钮的警告框 |
| confirm\(\) | 显示带有一段消息以及确认按钮和取消按钮的对话框 |
| prompt\(\) | 显示可提示用户输入的对话框 |
| createPopup\(\) | 创建一个 Pop-up 窗口 |

#### 关于 createPopup\(\)

经过测试，目前该函数无法使用，当然可能是使用的方式或有不当，下方为源码（[来源于 w3school](http://www.w3school.com.cn/tiy/t.asp?f=hdom_window_popup)）：

```js
function show_popup()
{
var _popup = window.createPopup()
var _popupBody= _popup.document.body
_popupBody.style.backgroundColor="red"
_popupBody.style.border="solid black 1px"
_popupBody.innerHTML="这是一个 pop-up！在 pop-up 外面点击，即可关闭它！"
_popup.show(150,150,200,50,document.body)
}
```

##### 测试方式及结果

| 系统 | 版本号 |
| :--- | :--- |
| Mac OS | 10.13.3 |

| 浏览器类型 | 版本号 | 是否可用 |
| :--- | :--- | :--- |
| Safari | 11.0.3 | 不可用 |
| Google Chrome | 65.0.3325.162（正式版本） | 不可用 |
| Firefox | 58.0.2 | 不可用 |

使用上述配置分别运行 `show_popup()` 函数，均不可执行，均出现 **window.createPopup is not a function** 异常。

### 窗体创建及焦点类

| 方法名称 | 方法描述 |
| :--- | :--- |
| open\(\) | 打开一个新的浏览器窗口或查找一个已命名的窗口 |
| close\(\) | 关闭浏览器窗口 |
| focus\(\) | 把键盘焦点给与一个浏览器窗口 |
| blur\(\) | 把键盘焦点从顶层窗口移开 |

### 窗口及内容区域的调整类

| 方法名称 | 方法描述 |
| :--- | :--- |
| moveBy\(\) | 相对当前窗口的坐标把它移动指定的像素 |
| moveTo\(\) | 把窗口的左上角移动到指定的坐标 |
| resizeBy\(\) | 按照指定的像素调整窗口的大小 |
| resizeTo\(\) | 把窗口的大小调整到指定的宽度和高度 |
| scrollBy\(\) | 按照指定的像素值来滚动内容 |
| scrollTo\(\) | 把内容滚动到指定的坐标 |

### 定时器及其他

| 方法名称 | 方法描述 |
| :--- | :--- |
| setTimeout\(\) | 在指定的毫秒数后调用函数或计算表达式 |
| clearTimeout\(\) | 取消由 setTimeout\(\) 方法设置的 timeout |
| setInterval\(\) | 按照指定的周期（以毫秒计）来调用函数或计算表达式 |
| clearInterval\(\) | 取消由 setInterval\(\) 设置的 timeout |
| print\(\) | 打印当前窗口的内容 |

参考文献 [w3school](http://www.w3school.com.cn/)
