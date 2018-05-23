var dataTeam = [];
var dataScore1 = [];
var dataScore2 = [];
var dataScoreZ = [];
var dataLb = [];
var dataGm = [];
var dataImg = [];

d3.csv("./data/ZhouQi.csv",function(error, data){
    if(error){
        console.log(error);
    } else {
        for(let i=0;i<data.length;i++){
			dataTeam.push(data[i].Team);
			dataScore1.push(data[i].Score1);
			dataScore2.push(data[i].Score2);
			dataScoreZ.push(data[i].ScoreZ);
			dataLb.push(data[i].Lb);
			dataGm.push(data[i].Gm);
			dataImg.push(data[i].Img);
        }
    }
});

		
var width = 3000;
var height = 2000;
var svg = d3.select("#reguler-match-svg")
			.attr("width", width)
			.attr("height", height);

var dataY = [ 1,1,1,1,1,1,1,3,4,4,
			  3,6,5,4,4,4,4,3,3,3,
			  3,3,3,3,3,2,2,2,2,2,
			  2,1,1,1,1,1,1,1,
			  
			  1,1,1,1,1,1,1,3,4,4,
			  3,6,5,4,4,4,4,3,3,3,
			  3,3,3,3,3,2,2,2,2,2,
			  2,1,1,1,1,1,1,1 ]; 
var dataWin = [ 1,1,1,1,1,1,1,0,0,1,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1 ];
var dataS = [ 110,109,118,109,119,
			  115,99,85,91,139,
			  112,97,114,90,121,
			  125,111,120,104,95,
			  131,97,135,104,109,
			  135,129,113,135,100,
			  109,138,108,129,110,
			  100,118,123,
 12,9,15,21,0,0,12,0,22,29,10,16,12,0,0,15,17,12,12,11,21,16,20,16,16,10,22,11,24,12,21,16,11,0,26,17,13,19]; 

var linear1 = d3.scaleLinear()
				.domain([0, 38])
				.range([0, 1900]);
var axisX = d3.axisBottom(linear1).ticks(3);	
svg.append("g")
	.attr("class","axis")//
	.attr("transform","translate(60,450)")
	.call(axisX);
var linear2 = d3.scaleLinear()
				.domain([1, 9])
				.range([0, 400]);
var axisY = d3.axisLeft(linear2).ticks(9);
svg.append("g")
	.attr("class","axis")//
	.attr("transform","translate(40,50)")
	.call(axisY);
for(let j = 0; j < 9; j++){
	if(j!=7)
	{
		svg.append("line")
			.attr("x1",20)
			.attr("x2",1920)
			.attr("y1",function(d,i){
			return linear2(j+1);
		})
			.attr("y2",function(d,i){
			return linear2(j+1);
		})
			.attr("class","line1")
			.attr("transform","translate(40,50)");
	}
}
svg.append("line")
	.attr("x1",20)
	.attr("x2",1920)
	.attr("y1",function(d,i){
	return linear2(8);
})
	.attr("y2",function(d,i){
	return linear2(8);
})
	.attr("class","line2")
	.attr("transform","translate(40,50)");
svg.append("text")
	.attr("x",20)
	.attr("y",function(d,i){
	return linear2(8)+2;
})
	.attr("stroke","#DCDDDD")
	.attr("stroke-width",1)
	.attr("transform","translate(60,65)")
	.attr("font-family","simsun")
	.attr("font-size","20px")
	.text("常规赛晋级资格");
for(let j = 1; j <= 3; j++){
	svg.append("line")
		.attr("x1",function(){
			return 20 + linear1(j*10) ;
		})
		.attr("x2",function(){
			return 20 + linear1(j*10) ;
		})
		.attr("y1",0)
		.attr("y2",400)
		.attr("class","line1")
		.attr("transform","translate(40,50)");
}

	
svg.selectAll("rect")
	.data(dataY)
	.enter()
	.append("rect")
	.attr("x",function(d,i){
		 return (i%38) * 50 + 110;
	})
	.attr("y",function(d,i){
		 return d * 50;
	});
var game = d3.select("#game");
var tooltip = d3.select("body")
				.append("div")
				.attr("class","tooltip")
				.style("opacity",0.0);
svg.selectAll("rect")
	.data(dataS)
	.attr("width",function(d,i){
      return 3 * Math.sqrt(d);
    })
    .attr("height",function(d,i){
      return 3 * Math.sqrt(d);
    })
    .attr("fill",function(d,i){
		if(i<38)
		{
			return dataWin[i%38]?"#F22525":"#DCDDDD";
		}
		else
		{
			return dataWin[i%38]?"#F49A9A":"#727171";
		}
	});
	svg.selectAll("rect")
	.data(dataY)
	.attr("transform",function (d, i) {
		return "rotate(-135, "+((i%38)*50+110)+"  "+(d*50)+" )" + "translate(-"+1.5*Math.sqrt(dataS[i%38])+" -"+1.5*Math.sqrt(dataS[i%38])+" )";
	})
	.on("mouseover",function(d, i){
		if(i<38){
		game.style("left", (d3.select(this).attr("x")) + "px")
			.style("top", (d3.select(this).attr("y")) + "px")
			.style("opacity",1.0)
			;
		game.select("#xj").select("#game_xj_prob")
			.html(dataScore1[i]);
		game.select("#team").select("#game_team_name")
			.html(dataTeam[i]);
		game.select("#team").select("#game_team_img")
			.attr("src","./img/image/"+dataImg[i]);
		game.select("#team").select("#game_team_prob")
			.html(dataScore2[i]);
		game.select("#zhouqi")
			.html("周琦得分：" + dataScoreZ[i] + "<br />" + 
					"篮板：" + dataLb[i] + "<br />" +
					"盖帽：" + dataGm[i]);
		}
	})
	.on("mouseout",function(d, i){
		game.style("opacity",0.0);
	})
	;