chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    var dummy = document.createElement("input");
    document.body.appendChild(dummy);
	dummy.setAttribute("id", "dummy_id");
	document.getElementById("dummy_id").value=url;  
	dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
});