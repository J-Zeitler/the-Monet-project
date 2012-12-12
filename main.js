var lines = false;
function toggleLines(){
	lines = lines ? false : true;
}

function run(){
	var canvas = document.getElementById('canvas');
	var W = window.innerWidth, H = window.innerHeight;
	canvas.width = W;
	canvas.height = H;
	var ctx = canvas.getContext('2d');

	var xOrigin = W/2, yOrigin = H/2;

	var particles = [];

	particles.push(new split());


	function split(p){
		
		var r = Math.random()*255>>0;
		var g = Math.random()*255>>0;
		var b = Math.random()*255>>0;
		this.color = "rgb("+r+", "+g+", "+b+")";

		this.x = (typeof p === "undefined") ? xOrigin : p.x;
		this.y = (typeof p === "undefined") ? yOrigin : p.y;
	}

	function draw(){
		if(!lines){
			ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
			ctx.fillRect(0, 0, W, H);
		}

		for(var i=0; i<particles.length; ++i){

			ctx.strokeStyle = particles[i].color;

			ctx.beginPath();
			ctx.globalAlpha = 1.0;
			ctx.moveTo(particles[i].x, particles[i].y);
			particles[i].x = particles[i].x+Math.random()*10-5;
			particles[i].y = particles[i].y+Math.random()*10-5;
			ctx.lineTo(particles[i].x, particles[i].y);
			ctx.stroke();

			if(particles.length<1000 && Math.random()<0.003){
				particles.push(new split(particles[i]));
			}
			if(particles[i].x > W || particles[i].x < 0 || particles[i].y > H || particles[i].y < 0){
				particles[i].x = xOrigin;
				particles[i].y = yOrigin;	
			}
		}
	}
	var drawing = setInterval(draw, 33);
}

window.onload = run;





