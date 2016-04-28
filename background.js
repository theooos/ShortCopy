chrome.commands.onCommand.addListener(function(command) {

	var dummy = document.createElement("input");
    document.body.appendChild(dummy);
	dummy.setAttribute("id", "dummy_id");
	document.getElementById("dummy_id").value="blah";  
	dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);

    alert("Copied: " + "blah");
});