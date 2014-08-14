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