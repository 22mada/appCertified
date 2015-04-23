
//Global variables
var count = 8;

//variables for treasure map

var jewels = [
['Appalachicola', 29.728594, -84.983125],
['Big Lagoon', 30.309108, -87.402164],
['Bill Baggs Cape Florida', 25.666567, -80.156032],
['Blue Springs, 28.947619', -81.339318],
['Castillo de San Marcos', 29.898433, -81.310973],
['Cedar Key', 29.134598, -83.031087],
['Dry Tortugas, 24.628401', -82.872947],
['Everglades National Park', 25.748031, -80.767111],
['Fernandina Beach', 30.671358, -81.463397],
['Florida State Caverns', 30.816593, -85.233996],
['Fort Clinch', 30.704752, -81.454327],
['Fort Matanzas', 29.715266, -81.238901],
['Fort Zachary Taylor', 24.547602, -81.809937],
['Homosassa Springs', 28.799698, -82.579413],
['Key West', 24.553803, -81.80132],
['Kinglsey Plantation', 30.439411, -81.437255],
['Miracle Mile', 25.749203, -80.262339],
['Silver Springs', 29.215425, -82.052037],
['St. George Street', 29.89746, -81.313525],
['Wakulla Springs', 30.234956, -84.301284],
['Washington Oaks', 29.631765, -81.20882], 
['Ybor City', 27.960911, -82.441631] 
];

var visit = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
var image = "images/lock.png";

// This is the code for rank page
function rankPage(){
	

	var rankCount = Math.round(count/10);

	var rank = ["Recluse", "Spring Breaker", "Tourist", "Snow Bird", "Resident", "Scout", "Explorer", "Tour Guide", "Nearly Native", "Certified Local"];

	var message = [
		"Have you even been to Florida?  You are in danger of becoming a hermit.",
		"Most students on spring break have seen more of Florida than you!  Pick a site and visit it soon.",
		"So you know your way around. It is time to start blazing a new trail.",
		"You are making progress.  Keep it up and people will think you live here year round.",
		"Let me check that driver's license.  We have a Florida resident!",
		"You are ready to visit new territories. Time to do some scouting around.",
		"At this point you should have a few favorites.  Don't be afraid to revisit a treasured spot.",
		"People are starting to ask you for recommendations.  It is time to plan a long trip to those hard to reach places.",
		"You are so close.  It's time to visit those sites you have put off.  Don't be surprised if one of them becomes a new favorite.",
		"Congratulations!  You may or may not be a Florida native but you have travelled from coast to coast, tip to tip, and experienced the varied cultural, historical, and natural sites of Florida.  You have earned the right to be called Certified Local."];

	document.getElementById("Rank").innerHTML = "Your current rank is " + rank[rankCount] + ".";
	document.getElementById("Message").innerHTML = message[rankCount];
	
}

/*
 * PieChart constructor
 calls functions
 */
function PieChart(canvasId, data){
  // user defined properties
  this.canvas = document.getElementById(canvasId);
  this.data = data;
  
  // constants
  this.padding = 10;
  this.legendBorder = 2;
  this.pieBorder = 5;
  this.colorLabelSize = 20;
  this.borderColor = "#555";
  this.shadowColor = "#777";
  this.shadowBlur = 10;
  this.shadowX = 2;
  this.shadowY = 2;
  this.font = "16pt Calibri";
  
    // relationships
    this.context = this.canvas.getContext("2d");
    this.legendWidth = this.getLegendWidth();//called below and returns legend width
    this.legendX = this.canvas.width - this.legendWidth;// determines legend x by legendWidth from canvas width
    this.legendY = this.padding;//constant
    this.pieAreaWidth = (this.canvas.width - this.legendWidth);//Isn't this the same as legendX?
    this.pieAreaHeight = this.canvas.height;
    this.pieX = this.pieAreaWidth / 2;
    this.pieY = this.pieAreaHeight / 2;
    this.pieRadius = (Math.min(this.pieAreaWidth,  
    this.pieAreaHeight) / 2) - (this.padding);
    
    // draw pie chart
    this.drawPieBorder();
    this.drawSlices();
    this.drawLegend();
}
/*
 * gets the legend width based on the size
 * of the label text
 */
PieChart.prototype.getLegendWidth = function(){
    /*
     * loop through all labels and determine which
     * label is the longest.  Use this information
     * to determine the label width
     */
    this.context.font = this.font;
    var labelWidth = 0;
    
    for (var n = 0; n < this.data.length; n++) {
        var label = this.data[n].label;
        labelWidth = Math.max(labelWidth, this.context.
			measureText(label).width);
    }
  
    return labelWidth + (this.padding * 2) + this.legendBorder + 
this.colorLabelSize;
};
PieChart.prototype.drawPieBorder = function(){
    var context = this.context;
    context.save();
    context.fillStyle = "white";
    context.shadowColor = this.shadowColor;
    context.shadowBlur = this.shadowBlur;
    context.shadowOffsetX = this.shadowX;
    context.shadowOffsetY = this.shadowY;
    context.beginPath();
    context.arc(this.pieX, this.pieY, this.pieRadius + this.
		pieBorder, 0, Math.PI * 2, false);
    context.fill();
    context.closePath();
    context.restore();
};
/*
 * draws the slices for the pie chart
 */
PieChart.prototype.drawSlices = function(){
    var context = this.context;
    context.save();
    var total = this.getTotalValue();
    var startAngle = 0;
    for (var n = 0; n < this.data.length; n++) {
        var slice = this.data[n];
        
        // draw slice
        var sliceAngle = 2 * Math.PI * slice.value / total;
        var endAngle = startAngle + sliceAngle;
        
        context.beginPath();
        context.moveTo(this.pieX, this.pieY);
        context.arc(this.pieX, this.pieY, this.pieRadius, 
startAngle, endAngle, false);
        context.fillStyle = slice.color;
        context.fill();
        context.closePath();
        startAngle = endAngle;
    }
  context.restore();
};
/*
 * gets the total value of the labels by looping through
 * the data and adding up each value
 */
PieChart.prototype.getTotalValue = function(){
    var data = this.data;
    var total = 0;
    
    for (var n = 0; n < data.length; n++) {
        total += data[n].value;
    }
    
    return total;
};
/*
 * draws the legend
 */
 
PieChart.prototype.drawLegend = function(){
    var context = this.context;
    context.save();
    var labelX = this.legendX;
    var labelY = this.legendY;
    
    context.strokeStyle = "black";
    context.lineWidth = this.legendBorder;
    context.font = this.font;
    context.textBaseline = "middle";
    
    for (var n = 0; n < this.data.length; n++) {
        var slice = this.data[n];
        
        // draw legend label
        context.beginPath();
        context.rect(labelX, labelY, this.colorLabelSize, this.colorLabelSize);
        context.closePath();
        context.fillStyle = slice.color;
        context.fill();
        context.stroke();
        context.fillStyle = "black";
        context.fillText(slice.label, labelX + this.colorLabelSize 
			+ this.padding, labelY + this.colorLabelSize / 2);
        
        labelY += this.colorLabelSize + this.padding;
    }
  context.restore();
};
function test(){
    var data = [{
        label: "Locked Sites",
        value: 89-count,//is the most that can be entered without messing up code
        color: "grey"
    }, {
        label: "Jewels Found",
        value: count,
        color: "purple"
	}];
    
    new PieChart("pieChart", data);

};

//This is the code for the treasure hunt

function startWatching(){
	var options = {timeout: 300000, enableHighAccuracy: true, maximumAge: 200 };
	watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
	}
	
function stopWatching() {
		if(watchID) geo.clearWatch(watchID);
		watchID = null;
	}
	
function onError(error){
		stopWatching;
		alert('code: '+ error.code + ' message: ' + error.message+'\n');
		}	
		
function onSuccess(position) {
	var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	var lat = position.coords.latitude;
	var lon = position.coords.longitude;
	var map;
	var mapOptions = { zoom: 18 };
	
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	setMarkers(map, jewels);
	map.setCenter(pos);
	var markerYou = new google.maps.Marker({
        position: pos,
        map: map,
        icon: {
				path: google.maps.SymbolPath.CIRCLE,
				scale: 3,
				},
			draggable: false,
      });   
      inSite(jewels, lat, lon);
  }	
  
function inSite(location, x, y){

	x= x.toFixed(4);
	y=y.toFixed(4);
	for(var i = 0; i < location.length; i++){
		if(visit[i]==false){
			var jewel = location[i];
			if( jewel[1].toFixed(4) ==x && jewel[2].toFixed(4) == y){
			count=count + 4;
			alert("Congratulations!\n You found the  jewel at " + jewel[0] + "! \n You have a total of " + count/4 + " jewels.");
			visit[i]=true;
			}
		}
	}
}


function setMarkers(map, locations) {

    for (var i = 0; i < locations.length; i++) {
    var jewel = locations[i];
	image = setImage(i);
    var myLatLng = new google.maps.LatLng(jewel[1], jewel[2]);
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,   
		icon: image,
		size: 3
    });
  }
}

function setImage(i){
 if(visit[i]!= true){
 image = "images/lock.png";
 }
 else{
 image = "images/jewel.png";
 }
 return image;
}

//Map code
function initialize() {  
	var map1;
	var mapOptions = {
		zoom: 6,
		center: new google.maps.LatLng(27.9059, -84.5347)
					};
	map1 = new google.maps.Map(document.getElementById('myCanvas'), mapOptions);
	  setMarkers(map1, jewels);
}

//code to run multiple load events
function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      if (oldonload) {
        oldonload();
      }
      func();
    }
  }
}

addLoadEvent(test);
addLoadEvent(rankPage);
addLoadEvent(initialize);
addLoadEvent(startWatching);