// @TOREMEMBER extensions.yourthing.so.it.is.correctly.namespaced.tabs = []; ....tabs.push(tab); if (...tabs.indexOf(tab) > -1) { /* in there */ }

var FireCoin = {
	onclick: function() {
	},
	
	/**
	 * Get the content of a metatag
	 */
	getMetaContents:function(mn){
		var m = content.document.getElementsByTagName('meta');
		
		for(var i in m){
			if(m[i].name == mn){
				return m[i].content;
			}
		}
		// meta tag not found
		return "nope.avi";
	}
}

document.addEventListener("DOMContentLoaded", function(e) { 
	// The loaded document
	var doc = e.target;
	
	// if it hasn't a location, stop
	if (!doc.location)
        return;
 
    // get the URL
    var href = doc.location.href;
 
    // if it doesn't start with http:// we'll skip it
    if (doc.location.protocol != "http:")
        return;
    
    // Prevents running the event multiple times per load
    // only run the update if the loaded URL is the same as the current selected tab UTL    
    if(href != content.document.location.href)
    	return;
    	
    // Get the button from the XUL
    var button = document.getElementById("firecoin-button");
    
    // If the meta is set
    if(FireCoin.getMetaContents("bitcoin") != "nope.avi"){
    	// Set the active class
    	button.setAttribute("class", "toolbarbutton-1 firecoin-button");
    	alert("found");
    } else {
    	// else set the inactive class
    	button.setAttribute("class", "toolbarbutton-1 firecoin-button-inactive");
    	alert("not found");
    }
            
 }, false);