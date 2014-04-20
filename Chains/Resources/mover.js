// JavaScript Document

function containerMover(box){
	var current = 'page' + box;
	var container = document.getElementById('container');
	var box2 = box;
	var movement = 0;
	adjustment = 0;
    
    window.location.hash = "goto" + current;
	document.getElementById('viewer').style.height = (document.getElementById(current).offsetHeight) + adjustment + 'px';
	
	if(box == 1){
		container.style.marginTop = 0 + 'px';
	}
	else{
		while (box > 1){
			box = box - 1;
			var now = 'page' + box;
			movement = movement + document.getElementById(now).offsetHeight;
		}
		container.style.marginTop = (-(movement)) + 'px';
	}
    return false;
}

if (window.location.hash){
    id = window.location.hash.slice(1);
    if (id == ""){
        id = "page1";
    }
} else {
    id = "page1"
}
if (id.slice(0,4) == "goto"){
    id = id.slice(4);
}

document.getElementById('viewer').style.height = (document.getElementById(id).offsetHeight) + 'px';
containerMover(parseInt(id.slice(4)));