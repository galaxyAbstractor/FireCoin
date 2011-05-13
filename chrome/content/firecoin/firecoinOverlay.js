// @TOREAD: http://forums.mozillazine.org/viewtopic.php?f=19&t=952905

var FireCoin = {
	onclick: function() {
	},
	
	contentListener: function(evt) {
            alert(evt);
	},
	
	getMetaContents:function(mn){
		var m = document.getElementsByTagName('meta');
		
		for(var i in m){
			if(m[i][i].name == mn){
				return m[i].content;
			}
		}
		return "nope.avi";
	}
}

document.addEventListener("DOMContentLoaded", function(e) { 
	var document = e.target;
	
	if (!document.location)
        return;
 
    var href = document.location.href;
 
    if (!/(http)/i.test(href))
        return;
        
    if(href != content.document.location.href)
    	return;
    	
    FireCoin.contentListener(content.document.location.href);
            
 }, false);