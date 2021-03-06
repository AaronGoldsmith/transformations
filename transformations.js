var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var graphic = new Array();

document.getElementById("pow").addEventListener("oninput",print_eqn);
document.getElementById("pow").addEventListener("onkeyup",print_eqn);
document.getElementById("pow").addEventListener("onmouseup",print_eqn);


document.getElementById("pow1");
document.getElementById("pow2");




var Points = [];
var size = 5;
var hidden = true;
var selected = -1;
var lastbutton = -1;


canvas.addEventListener("mousedown", handlemousedown);


// ---- FUNCTIONS ON GRAPHIC --- //
function flipX()
{
	for(var j = 0;j<graphic.length;j++)
	{
		var Pnts = graphic[j];
		for(var i = 0;i<Pnts.length;i++)
		{
			var current = Pnts[i];
			var cy;
			var b = 250-current["Y"];
			current["Y"] = 250 - (b*-1);
		}
	}
	refresh();

}

function flipY()
{
	for(var j = 0;j<graphic.length;j++)
	{
		var Pnts = graphic[j];
		for(var i = 0;i<Pnts.length;i++)
		{
			var current = Pnts[i];
			var cy;
			var b = current["X"]-250;
			current["X"] = 250 + (b*-1);
		}
	}
		refresh();
}

function flipYX()
{
	for(var j = 0;j<graphic.length;j++)
	{
		var Pnts = graphic[j];
		for(var i = 0;i<Pnts.length;i++)
		{
			var current = Pnts[i];
			var x = current["X"]-250;
			var y = 250-current["Y"];
			current["X"] = 250 + y;
			current["Y"] = 250 - x;
		}
	}
		refresh();
}

function transform()
{
	scale();
	rotate();
	translate();
	refresh();
}
function rotate()
{
	var theta = parseFloat(document.getElementById("rotate").value);
	if(isNaN(theta)==true){theta=0;}
	var s = Math.sin(theta);
	var c = Math.cos(theta);

	for(var j = 0;j<graphic.length;j++)
	{
		var Pnts = graphic[j];
		for(var i = 0;i<Pnts.length;i++)
		{
			var current = Pnts[i];
			var x = r2(current["X"]-250);
			var y = r2(250-current["Y"]);
			current["X"] = 250 + (x*c - y*s);
			current["Y"] = 250 - (x*s + y*c);
		}
	}

}
function translate()
{
	var transx = 5*parseFloat(document.getElementById("transx").value);
	var	transy = 5*parseFloat(document.getElementById("transy").value);
	if(isNaN(transx)==true){
		transx=0;}
	if(isNaN(transy)==true){transy=0;}
	for(var j = 0;j<graphic.length;j++)
	{
		var Pnts = graphic[j];
		for(var i = 0;i<Pnts.length;i++)
		{
			var current = Pnts[i];
			var x = r2(current["X"]-250);
			var y = r2(250-current["Y"]);
			current["X"] = 250 + (transx+x);
			current["Y"] = 250 - (transy+y);
		}
	}
}

function scale()
{
	var xScale = parseFloat(document.getElementById("scale-unitx").value);
	var yScale = parseFloat(document.getElementById("scale-unity").value);
	if(xScale==0){xScale=1;}
	if(yScale==0){yScale=1;}
	if(isNaN(xScale)==true){
		xScale=1;}
	if(isNaN(yScale)==true){yScale=1;}
	for(var j = 0;j<graphic.length;j++)
	{
		var Pnts = graphic[j];
		for(var i = 0;i<Pnts.length;i++)
		{
			var current = Pnts[i];
			var x = r2(current["X"]-250);
			var y = r2(250-current["Y"]);
			current["X"] = 250 + (xScale*x);
			current["Y"] = 250 - (yScale*y);
		}
	}
}
// --------------//
function Point(xCord,yCord) //functions as an object
{
	var point = {X:xCord, Y:yCord};
	return point;
}

function graph_funct(opt)
{
	var options = parseInt(opt);
	var Pnts = [];
	var start = 0;
	var end=canvas.width;
	var s = parseInt(document.getElementById("s").value);
	var e = parseInt(document.getElementById("e").value);
	if(isNaN(s)==false){
		start=s;}
	if(isNaN(e)==false){end=e;}
	var length = Math.abs(start-end)+1;
	if(length%4!=0)
	{
		howshort=(4-(length%4));
		isShort=true;
	}
	if(options==1) //y=x
	{
		for(var i = start;i<=end+1;i+=.5)
		{
			var p = new Point((i*5)+250,250-(i*5));
			if(p["X"]>0 && p["X"]<canvas.width+10 && p["Y"]>0 && p["Y"]<canvas.height+10)
			{
				Pnts.push(p);
			}
		}
	}
	else if(options==2||options==3||options==4) // x^2 , x^3, x^n
	{
		var pts = 16+(2*(length+howshort));
		console.log(options);
		var increment = length/pts;
		increment=r2(increment);

		console.log("pts: " + pts + " increment: " + increment);
		var i = 0;
		for(i = start;i<=end+1;i+=increment)
		{
			i=r2(i);
			var sqr;
			var n_val = parseFloat(document.getElementById("pow1").value);
			var a_val = parseFloat(document.getElementById("pow").value);
			var c_val = parseFloat(document.getElementById("pow2").value);
			if(i.toString().length<10)
			{
				if(i!=0){
					if(options==4){
						print_eqn();

						

						if(isNaN(n_val)==true){n_val=1;}
						if(isNaN(a_val)==true){a_val=1;}
						if(isNaN(c_val)==true){c_val=0;}
						sqr = 5*r2( (Math.pow(i,n_val)*a_val)+c_val);}

					else if(options==2||options==3)
					{
						sqr = 5*r2(Math.pow(i,options));
					}
				}
				else{sqr = 0;}
				var p = Point( (i*5)+250,252-(sqr));
				
				Pnts.push(p);
			}
			else{break;}
		}

	}
	graphic.push(Pnts);
	refresh();
}

function r2(a)
{
	return Math.floor(100*a)/100;
}
function undoPoint()
{
	if(Points.length>0)
	{
		Points.length-=1;
		refresh();
	}
}
function clearC()
{
	graphic.length=0;
	Points.length=0;
	refresh();
}
function hide()
{
	if(hidden==false)
	{
		hidden=true;
		document.getElementById("un").innerHTML = "Show Dots";
	}
	else
	{
		hidden = false;
		document.getElementById("un").innerHTML = "Hide Dots";

	}
	refresh();
}


function handlemousedown(event)
{
	var sx = event.clientX - canvas.offsetLeft;
	var sy = event.clientY - canvas.offsetTop;
	var p = Point(sx,sy);
	lastbutton = 1;
	switch(event.button)
	{

		case 0:

			Points.push(p);
			break;
		case 1:
			Points.length = 0;
			break;
		case 2:

			selected = -1;
				for (var i = 0; i < Points.length; ++i)
				{
					var a = Points[i];
					if(Math.abs(a["X"] - sx) <= size &&
						Math.abs(a["Y"] - sy) <= size)
					{
						selected = i;
						break;
					}
				}
			break;
			
		default:
			break;
	}
	refresh();
}

function drawAxis(isTrue)
{
	if(isTrue==true)
	{
		context.beginPath();
		context.setLineDash([4,10]);
		context.lineDashOffset=4;
		context.fillStyle = "black";
		context.moveTo(canvas.width/2,0);
		context.lineTo(canvas.width/2,canvas.height);
		context.stroke();

		context.beginPath();
		context.fillStyle = "black";
		context.moveTo(0,canvas.height/2);
		context.lineTo(canvas.width,canvas.height/2);
		context.stroke();
		context.setLineDash([]);

	}
}
function print_eqn()
{
	var negativeC = false;
	document.getElementById("eqnN").style.display="initial";
	var a = parseInt(document.getElementById("pow").value);
	var n = parseInt(document.getElementById("pow1").value);
	var c = parseInt(document.getElementById("pow2").value);
	if(c<0){negativeC=true;c*=-1;}
	if(a==1 || isNaN(a)){document.getElementById("eqn").innerHTML ="y = "+"x";}
	else{document.getElementById("eqn").innerHTML ="y = "+ a+"x";}
	if(n==1|| isNaN(n)==true){document.getElementById("eqnN").style.display="none";}
	document.getElementById("eqnN").innerHTML = n;
	if(isNaN(c)){document.getElementById("eqnc").innerHTML="";}
	if(negativeC==false&&c!=0&&isNaN(c)==false){
		document.getElementById("eqnc").innerHTML = "+ " +c;}
	else if(c!=0&&isNaN(c)==false){
		document.getElementById("eqnc").innerHTML = "- "+c;}
	
}

function draw_user()
{
	for (var ii = 0; ii < Points.length; ++ii)
	{
				context.fillStyle = "#0000ff";
				var pt = Points[ii];
					var x= pt["X"];
					var y= pt["Y"];
				context.fillRect(x, y, size, size);
	}

	if(Points.length>3)
	{
		for (var i = 0; i + 3 <Points.length; i+=3)
		{
			var pt = Points[i];   var pt1 = Points[i+1];  
			var pt2= Points[i+2]; var pt3 = Points[i+3];
			var x = pt["X"]; var y = pt["Y"];
			var x1= pt1["X"]; var x2= pt2["X"]; var x3 =pt3["X"];
			var y1= pt1["Y"]; var y2= pt2["Y"]; var y3 =pt3["Y"];

			context.beginPath();
			context.strokeStyle = "red";
			context.moveTo(x, y);
			context.bezierCurveTo(
						x1, y1,
						x2, y2,
						x3, y3);
			context.stroke();
		}
	}
}
function addPts()
{
	var c = [];
	for(var i = 0;i<Points.length;i++){
		c.push(Points[i]);}
	if(c.length>0){
		graphic.push(c);}
	Points.length=0;
	refresh();
	//draw_user();

}
function refresh()
{
	context.clearRect(0, 0, canvas.width, canvas.height);
	var check = false;
	if(Points.length>0){
		context.fillStyle = "black";
		context.font="10px Verdana";
		context.fillText("Lock in points to add to canvas", 10, canvas.height-10);
	}

	drawAxis(true);
	draw_user();

	context.strokeStyle = "#333";

	for(var j = 0;j<graphic.length;++j)
	{
		var current_set = [];
		current_set = graphic[j];
		if(hidden==false)
		{
			var z = current_set.length-2;
			if(current_set.length<=4){z=current_set.length;}
			for (var p = 0; p < z; ++p)
			{
				context.fillStyle = "#0000ff";
				var pt = current_set[p];
					var x= pt["X"];
					var y= pt["Y"];
				context.fillRect(x, y, size, size);
			}
		}
		if(current_set.length>3)
		{
			for (var i = 0; i + 3 <current_set.length; i+=3)
			{
				var pt = current_set[i];   var pt1 = current_set[i+1];  
				var pt2= current_set[i+2]; var pt3 = current_set[i+3];
				var x = pt["X"]; var y = pt["Y"];
				var x1= pt1["X"]; var x2= pt2["X"]; var x3 =pt3["X"];
				var y1= pt1["Y"]; var y2= pt2["Y"]; var y3 =pt3["Y"];

				context.beginPath();
				context.moveTo(x, y);
				context.bezierCurveTo(
							x1, y1,
							x2, y2,
							x3, y3);
				context.stroke();
			}
		}
	  }

		
}
	


refresh();

