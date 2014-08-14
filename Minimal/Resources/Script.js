//Script.js
//start homepage code
var current = 0;
var panels = document.getElementsByClassName("sectionOuter");
var total = panels.length;
var t;

//Basic Setup
if(document.body.offsetWidth > 670){
	document.getElementById("mainArea").style.overflow = "hidden";
	document.getElementById("buttons").style.display = "block";
	document.getElementById("right").style.display = "block";
	document.getElementById("left").style.display = "block";
	for(i=0;i<total;i++){
		var left = (panels[i].offsetWidth * (i-current)) + "px";
		panels[i].style.position = "absolute";
		panels[i].style.left = left; //move into place
		panels[i].style.opacity = "0"; //make invisible
	}
}

//Create the Slider
function change(input){
	clearInterval(t); //reset 8s timer
    
	if(input == "next"){
		current = (current == (total - 1)) ? 0 : current + 1; // go forward
	}
	else if(input == "back"){
		current = (current > 0) ? current - 1 : total - 1; // go back
	}
	else if((typeof(input)=='number') && (input.toString().indexOf('.')== -1)){
		current = parseInt(input); //go to input
	}
	else{
		console.log(input);
	}
	
	for(i=0;i<total;i++){
		var left = (panels[i].offsetWidth * (i - current)) + "px";
        console.log(left, i - current);
		panels[i].style.left = left; //move into place
		panels[i].style.opacity = "0.2"; //make invisible
        document.getElementsByClassName("slideButton")[i].style.background = "white"; //reset all buttons to blank
	}
    console.log("==============");
	
	panels[current].style.opacity = "1"; //Current becomes visible
	document.getElementsByClassName("slideButton")[current].style.background = "#444"; // Move the button slider
	
	setSpin(); //start the timer
    window.location.hash = "sec" + current; // Set the hash
    
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
        id = "sec0";
    }
} else {
    id = "sec0"
}
if (id.slice(0,3) == "sec"){
    id = id.slice(3);
}

if(document.body.offsetWidth > 670){
	change(parseInt(id));
}

function sendPOST(email){
    var xmlhttp;
    if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
	    xmlhttp=new XMLHttpRequest();
	}
    else
	{// code for IE6, IE5
	    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
    xmlhttp.onreadystatechange=function()
    {
	if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    {
		console.log(xmlhttp.responseText);
		callbackFunc(xmlhttp.responseText);
		return true;
	    }
    }
    xmlhttp.open("POST","send_email.php",true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send("email=" + email);
}

function email() {
    user = document.getElementById("email").value;
    document.getElementById("icon").src = "Resources/load.gif";
    sendPOST(user);
}

function callbackFunc(result) {
    outcome = result.split('"').splice(3,1);
    console.log(outcome);
    if(outcome == "success"){
	document.getElementById("icon").src = "Resources/success.gif";
	document.getElementById("button").innerHTML = "Thanks!";
    } else {
	document.getElementById("icon").src = "Resources/failure.gif";
	document.getElementById("button").innerHTML = "Oops: email us at admin@potatosoftworks.com";
    }
    document.getElementById("icon").style.width= "50px";
    document.getElementById("icon").style.height= "50px";
}