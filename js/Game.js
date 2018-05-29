(function(){
	var Game = window.Game = function(params){
		this.canvas = document.getElementById(params.id);
		this.ctx = this.canvas.getContext('2d');
		this.ResourceUrl = params.RUrl;
		this.fno = 0;
		this.init();
		//读取所有资源
		var self = this;
		this.loadAllResource(function(){
			self.start();
		});
		
	}
	Game.prototype.init = function(){
		var windowW = document.documentElement.clientWidth;
		var windowH= document.documentElement.clientHeight;
		if(windowW > 414){
			windowW = 414;
		}else if(windowW < 320){
			windowW = 320;
		}
		if(windowH > 736){
			windowH = 736;
		}else if(windowH < 568){
			windowH = 500;
		}
		this.canvas.width = windowW;
		this.canvas.height = windowH;
	}
	Game.prototype.loadAllResource = function(callback){
		this.R = {};
		var self = this;
		var alreadyDoneNumber = 0;
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				var RObj = JSON.parse(xhr.responseText);
				for(var i = 0;i < RObj.image.length; i++ ){
					//创建一个同名key
					self.R[RObj.image[i].name] = new Image();
					//请求
					self.R[RObj.image[i].name].src = RObj.image[i].url;
					//监听
					self.R[RObj.image[i].name].onload = function(){
						alreadyDoneNumber ++;
						//清屏
						self.ctx.clearRect(0,0,self.canvas.width, self.canvas.height);
						
						var txt = '正在加载'+ alreadyDoneNumber + '/'+ RObj.image.length +',请稍后！'
						self.ctx.textAlign = 'center';
						self.ctx.font = '16px 微软雅黑';
						self.ctx.fillText(txt,self.canvas.width/2, self.canvas.height*(1-.618));
						if(alreadyDoneNumber === RObj.image.length){
							callback();
						}
					}
				}
			}
		}
		xhr.open('get',this.ResourceUrl,true);
		xhr.send(null);
	}
	Game.prototype.start = function(){
		var self = this;
		//实例化背景
		this.background =  new Background();
		//实例化大地
		this.land = new Land();
		this.timer = setInterval(function(){
			self.ctx.clearRect(0,0,self.canvas.width, self.canvas.height);
			self.fno ++;
			//背景更新渲染
			self.background.update();
			self.background.render();
			//
			self.land.update();
			self.land.render();
			//打印贞编号
			self.ctx.font='16px consolas';
			self.ctx.textalign = 'left';
			self.ctx.fillText('fno:'+ self.fno,50,50);
			
		},20)
	}
})()
