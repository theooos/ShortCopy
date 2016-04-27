chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;

    requrl = "http://rod.gs/?longurl=" + url;

    var xhr = new XMLHttpRequest();
	xhr.open("GET", requrl, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			var shorturl = xhr.responseText;

			var dummy = document.createElement("input");
		    document.body.appendChild(dummy);
			dummy.setAttribute("id", "dummy_id");
			document.getElementById("dummy_id").value=shorturl;  
			dummy.select();
		    document.execCommand("copy");
		    document.body.removeChild(dummy);

		    alert("Copied: " + shorturl);

		}
		alert("not worked");
	}
	xhr.send();
});