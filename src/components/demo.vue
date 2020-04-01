<template>
  <div id="app">
		<input type="text" id="search"/>
		<div class="search_box"></div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  data(){
	return {
		searchItems: ["呵呵", "嘿嘿", "你好啊", "我不好", "真的么", "真的是真的么"],
		a:1
	}  
  },
  mounted(){
    var that = this;
    let test = () => {
        console.log(1);
    };
    // 滚动事件
	window.addEventListener('scroll', that.debounce(test, 1000));
	that.search();
  },
  methods:{
    debounce:function(fn,wait) {
      var timer = null;
      return function () {
			if(timer !== null) 
				clearTimeout(timer);
			timer = setTimeout(fn, wait);
      }
    },
	search:function(){
		let _this = this;
		let dom = document.querySelector("#search");
		dom.addEventListener("input",_this.debounce(() => {
			let val = dom.value;
			let box = document.querySelector(".search_box");
			box.innerHTML = "";
			if(val == "")
				return;
			let result = _this.searchItems.filter((item) => {
				return item.indexOf(val) !== -1;
			});
			if(result.length == 0){
				dom.classList.remove("show");
				return;
			}
			box.classList.add("show");
			let fragment = document.createDocumentFragment();
			result.map((item) => {
				let li = document.createElement("li");
				li.innerHTML = item;
				fragment.appendChild(li);
			});
			box.appendChild(fragment);
		},500));		
	}
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  height: 1800px;
}

#search{
	position: relative;
	width: 200px;
}

.search_box{
	position: absolute;
	width: 200px;
	height: auto;
	display: none;
	box-shadow: 0 0 5px #000;
}

.search_box li{
	list-style: none;
	padding: 5px 0 5px 10px;
	font-size: 1rem;
}

.show{
	display: block;
}
</style>
