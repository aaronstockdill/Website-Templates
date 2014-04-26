//Script.js
//start homepage code
var current = 0;
var total = document.getElementsByClassName("sectionInner").length;
var panels = document.getElementsByClassName("sectionOuter");
var t;

//Basic Setup
if(document.body.offsetWidth > 670){
	document.getElementById("mainArea").style.overflow = "hidden";
	document.getElementById("buttons").style.display = "block";
	document.getElementById("right").style.display = "block";
	document.getElementById("left").style.display = "block";
	for(i=0;i<total;i++){
		var multiplier = 1;//(document.body.offsetWidth > 1000)? 0.6:0.8;
		var left = (panels[i].offsetWidth * (i-current) * multiplier) + "px";
		panels[i].style.position = "absolute";
		panels[i].style.left = left; //move into place
		panels[i].style.opacity = "0"; //make invisible
	}
}

//Create the Slider
function change(input){
	clearInterval(t); //reset 8s timer
	
	if(input == "next"){
		current = (current < total-1) ? current += 1 : 0; //go foreward
	}
	else if(input == "back"){
		current = (current > 0) ? current-=1:(total - 1); //go back
	}
	else if((typeof(input)=='number') && (input.toString().indexOf('.')==-1)){
		current = parseInt(input); //go to input
	}
	else{
		console.log(input);
	}
	
	for(i=0;i<total;i++){
		var multiplier = 1;//(document.body.offsetWidth > 1000)? 0.6:0.8;
		var left = (panels[i].offsetWidth * (i-current) * multiplier) + "px";
		panels[i].style.left = left; //move into place
		panels[i].style.opacity = "0.2"; //make invisible
	}
	
	panels[current].style.opacity = "1"; //Current becomes visible
	
	for(i=0;i<4;i++){ //reset all buttons to blank
		document.getElementsByClassName("slideButton")[i].style.background = "white";
	}
	
	document.getElementsByClassName("slideButton")[current].style.background = "#444"; //Move the slider
	
	setSpin(); //start the timer
    window.location.hash = "section" + current; // Set the hash
    
    return false;
}

// Set it spinning
function setSpin(){
	t = setInterval("change('next')", 8000); //spin in 8 seconds
}

// Allow keypresses to change the Slider
document.onkeydown = function(e) {
	e = e || window.event;
	if (e.keyCode == 39) {
		change('next');
	}
	else if (e.keyCode == 37) {
		change('back');
	}
}

inputs = document.getElementsByClassName('input_field');
for(i=0;i<inputs.length;i++){
    inputs[i].addEventListener(
        'focus',
        function(e){clearInterval(t);},
        true
    );
    inputs[i].addEventListener(
        'blur',
        function(e){setSpin();},
        true
    )
}

if (window.location.hash){
    id = window.location.hash.slice(1);
    if (id == ""){
        id = "section1";
    }
} else {
    id = "section1"
}
if (id.slice(0,7) == "section"){
    id = id.slice(7);
}

if(document.body.offsetWidth > 670){
	change(parseInt(id));
}