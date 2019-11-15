NodeList.prototype.forEach = Array.prototype.forEach;

var c = document.querySelectorAll('.myCanvas');

var resetBtn = document.querySelectorAll('button')[0];

// var viewWidth = window.innerWidth;
// var viewHeight = window.innerHeight;
var viewWidth = 300;
var viewHeight = 300;


c.forEach(function(e){
  e.ontouchstart = function(e){
      e.preventDefault();
  }

  e.width = viewWidth*0.8;
  e.height = viewHeight*0.8;

  var ctx = e.getContext("2d");
  var paint;
  var clickX = [];
  var clickY = [];
  var clickDrag = [];
  var paint;

  function addClick(x, y, dragging){
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
  }

  e.addEventListener("mousedown", function(){
    var mouseX = event.pageX - this.offsetLeft;
    var mouseY = event.pageY - this.offsetTop;

    paint = true;
    addClick(mouseX, mouseY);
    redraw();
  });


  e.addEventListener("touchstart", function(){
    var mouseX = event.pageX - this.offsetLeft;
    var mouseY = event.pageY - this.offsetTop;

    paint = true;
    addClick(mouseX, mouseY);
    redraw();
  });

  e.addEventListener("touchmove", function(){
    if(paint){
      addClick(event.pageX - this.offsetLeft, event.pageY - this.offsetTop, true);
	    redraw();
    }
  });
  e.addEventListener("mousemove", function(){
    if(paint){
      addClick(event.pageX - this.offsetLeft, event.pageY - this.offsetTop, true);
	    redraw();
    }
  });

  e.addEventListener("mouseup", function(){
    paint = false;
  });

  e.addEventListener("mouseleave", function(){
    paint = false;
  });

  function clearCanvas(){
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clears the canvas
  };

  function redraw(){
      clearCanvas();
      ctx.strokeStyle = "#000000";
      ctx.lineJoin = "round";
      ctx.lineWidth = 17;

      for(var i=0; i < clickX.length; i++) {
        ctx.beginPath();
        if(clickDrag[i] && i){
          ctx.moveTo(clickX[i-1], clickY[i-1]);
         }else{
           ctx.moveTo(clickX[i]-1, clickY[i]);
         }
         ctx.lineTo(clickX[i], clickY[i]);
         ctx.closePath();
         ctx.stroke();
      }
    }

  resetBtn.addEventListener("click", function(){
		clickX = [];
		clickY = [];
		clickDrag = [];
    clearCanvas();
  });


});