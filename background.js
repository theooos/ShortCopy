function getTab(callback){
	chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
	    callback(tabs[0].url);
	});
}

function makeShort(longURL){
	console.log(longURL);
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			var data = JSON.parse(xhr.responseText);
			var url = data["shorturl"];
			copyToClipboard(url);
		}
    }

    var format = encodeURIComponent("json");
    var address = encodeURIComponent(longURL);

    var params = "format=" + format + "&url=" + address;
    params = params.replace(/%20/g, '+');

    xhr.open("GET","https://is.gd/create.php?"+params, true);
    xhr.send();
}

chrome.commands.onCommand.addListener(function(tab) {
	getTab(makeShort);
});

// Copies the response to the clipboard.
function copyToClipboard(url){
	var dummy = document.createElement("input");
	document.body.appendChild(dummy);
	dummy.setAttribute("id", "dummy_id");
	document.getElementById("dummy_id").value=url;  
	dummy.select();
	document.execCommand("copy");
	document.body.removeChild(dummy);
	alert("Copied: "+url+". Thanks for using ShortCopy.");
}