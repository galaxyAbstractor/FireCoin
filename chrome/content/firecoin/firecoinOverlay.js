var FireCoin = {
	onclick: function() {
	},
	
	contentListener: function(evt) {
		if (!/^(https?|file):/i.test(href))
            return;
            alert("test");
	}
}

document.addEventListener("DOMContentLoaded", function(e) { 
	var document = e.target;
	
	if (!document.location)
            return;
 
    var href = document.location.href;
 
    if (!/^(https?|file):/i.test(href))
        return;
        
        FireCoin.contentListener(e);
            
 }, false);