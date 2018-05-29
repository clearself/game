(function(){
	//背景类
	var Land = window.Land = function(){
		this.image = game.R.land;
		this.y = game.canvas.height*.75;
		this.w = 336;
		this.h = 112;
		this.speed = 1;
		this.x = 0;
	}
	Land.prototype.render = function(){
		game.ctx.drawImage(this.image,this.x,this.y);
		game.ctx.drawImage(this.image,this.x+this.w,this.y);
		game.ctx.drawImage(this.image,this.x+this.w*2,this.y);
		//补大地
		game.ctx.fillStyle = '#ded895';
		game.ctx.fillRect(0,this.y+this.h-10,game.canvas.width,game.canvas.height-this.y -this.h +10);
	}
	//更新背景
	Land.prototype.update = function(){
		this.x-=this.speed;
		if(this.x<-this.w){
			this.x = 0;
		}
	}
})()
