/* 
  我们将来在开发的时候，肯定会有很多重复使用的代码
  这些代码我们应该封装起来，以提高工作效率

  怎么封装呢？
    通常我们喜欢把方法封装到对象身上
*/
var kits = {};

kits.dispatchZero = function (num) {
  if (num < 10) {
    num = '0' + num;
  }
  return num;
}

// 把方法都放到对象的身上
kits.formatDate = function () {
  var date = new Date();
  // 把年月日时分秒获取
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = this.dispatchZero(month);
  var day = date.getDate();
  day = this.dispatchZero(day);
  var hour = date.getHours();
  hour = this.dispatchZero(hour);
  var minute = this.dispatchZero(date.getMinutes());
  var second = this.dispatchZero(date.getSeconds());
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}

kits.randomInt = function(n,m){
  return Math.floor(Math.random() * (m-n+1) + n);
}

// 常见的给id的方式1
// 当前时间戳 + 大的随机数
kits.getId = function(){
  // 返回一个不容易重复的id
  let date = new Date();
  let time = date.getTime();// 得到的是从1970年1月1日到现在为止的毫秒总数
  // 然后在得到一个足够大的随机数，把毫秒和随机数相连，作为新的id
  let r = this.randomInt(100000,999999);
  // 把两个数字连起来
  let id = time + '' + r;
  return id;
}
//随机一个获取rgb格式的颜色
function random(n, m) {
  return Math.floor(Math.random() * (m - n + 1) + n);
}

function randomColor() {
  var r = random(0, 255);
  var g = random(0, 255);
  var b = random(0, 255);
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}
//获取一个随机的十六进制的颜色
kits.getColor=function() {
  //定义字符串变量colorValue存放可以构成十六进制颜色值的值
  var colorValue = "0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f";
  //以","为分隔符，将colorValue字符串分割为字符数组["0","1",...,"f"]
  var colorArray = colorValue.split(",");
  var color = "#";//定义一个存放十六进制颜色值的字符串变量，先将#存放进去
  //使用for循环语句生成剩余的六位十六进制值
  for (var i = 0; i < 6; i++) {
    //colorArray[Math.floor(Math.random()*16)]随机取出
    // 由16个元素组成的colorArray的某一个值，然后将其加在color中，
    //字符串相加后，得出的仍是字符串
    color += colorArray[Math.floor(Math.random() * 16)];
  }
  return color;
}
// 时间
btn.onclick = function () {
  // 获取文本域的内容
  let content = text.value;
  if (content.trim().length === 0) {
    alert('请输入文字，再发布');
    return;
  }
  // 生成一个时间
  let time = kits.formatDate();
  // 生成一个id
  let id = kits.getId();
  // console.log(time);
  // 生成新的li
  let li = document.createElement('li');
  li.innerHTML = '<p class="content">' + content + '</p>' +
    '<span class="del" data-id="'+ id +'">删除</span>' +
    '<span class="time">' + time + '</span>';
  // 插入到ul的最前面
  ul.insertBefore(li, ul.children[0]);
  // 把文本域清空
  text.value = "";

  /* 
    点击之后，为了我们刷新之后还是有数据，把这些数据存储起来
      有多条数据 —— 使用数组的方式存储 - 需要在外面先定义一个数组
      数组里面方法每条数据
        每条数据包含至少两个东西
          - 内容
          - 发布的时间
          就是用对象进行存储
          {content:'内容',time:'发布时间'}
      每次点击就是一个新的对象，放到数组里面，把数组存到本地存储里面即可
  */
  let obj = {
    // 需要一个id以便在删除的时候能够找到这条数据
    id: id,
    content: content,
    time: time
  }
  datas.unshift(obj);
  // 把数组存储到localStorage里面
  let json = JSON.stringify(datas);
  localStorage.setItem('wbshuju', json);
}