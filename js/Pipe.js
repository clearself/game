(function(){
	//背景类
	var Pipe = window.Pipe = function(){
		this.imagedown = game.R.pipe_down;
		this.imageup = game.R.pipe_up;
		this.allHeight = game.canvas.height*0.75;
		this.intspace = 120;
		this.picHeight = 320;
		this.dowHeight = 120+parseInt(Math.random()*200);
		this.upHeight = this.allHeight - this.dowHeight - this.intspace;
		this.x = game.canvas.width;
		game.PipeArr.push(this);
	}
	Pipe.prototype.render = function(){
		//上面管子
		game.ctx.drawImage(this.imagedown, 0, this.picHeight-this.dowHeight, 52, this.dowHeight, this.x, 0, 52, this.dowHeight);
		//下面管子
		game.ctx.drawImage(this.imageup, 0, 0, 52, this.upHeight, this.x, this.intspace + this.dowHeight, 52, this.upHeight);
	}
	//更新背景
	Pipe.prototype.update = function(){
		this.x--;
	}
})()
