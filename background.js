document.write('<scr'+'ipt src="https://apis.google.com/js/client.js"></scr'+'ipt>');

function getTab(callback){
	chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
	    callback(tabs[0].url);
	});
}

function makeShort(longUrl){

    var request = gapi.client.urlshortener.url.insert({
    	'longUrl': longUrl
    });

    request.execute(function(response){
		if(response.id != null){
			var dummy = document.createElement("input");
		    document.body.appendChild(dummy);
			dummy.setAttribute("id", "dummy_id");
			document.getElementById("dummy_id").value=response.id;  
			dummy.select();
			document.execCommand("copy");
			document.body.removeChild(dummy);
			// alert("Copied: "+response.id+"!");
		}
		else{
			alert("Error shortening " + longUrl + ". Please report.");
		}
	});
}

function load()	{
	gapi.client.setApiKey('INSERT KEY HERE');
	gapi.client.load('urlshortener', 'v1',function(){});
}

var millisecondsToWait = 500;
setTimeout(function(){
	load();
}, millisecondsToWait);

chrome.commands.onCommand.addListener(function(tab) {
	getTab(makeShort);
});