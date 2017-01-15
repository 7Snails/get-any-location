

var URL = window.location.href;
if (URL.includes("scratch.mit.edu/users/") === true) {
  var user = URL.substring(30, URL.length - 1);
};

var xmlhttp = new XMLHttpRequest(),
		json;

xmlhttp.onreadystatechange = function() {
	if(xmlhttp.readyState === 4 && xmlhttp.status === 200) {
    	json = JSON.parse(xmlhttp.responseText);
        // console.log(json);
        var userLocation = json.profile.country;
        console.log("User:" + " " + user + ", " + "location:" + " " + userLocation);
        document.getElementsByClassName("location")[0].innerHTML = userLocation;
    }
};

xmlhttp.open('GET', 'https://api.scratch.mit.edu/users/' + user, true);
xmlhttp.send();
