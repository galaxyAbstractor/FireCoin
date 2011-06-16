/*******************************************************************
* FireCoin
*
* Copyright (c) 2011, http://pixomania.net
*
* Licensed under the BSD License
* Redistributions of files must retain the above copyright notice.
*
* Please see LICENSE.txt for more info.
*
* @copyright Copyright 2011, pixomania, http://pixomania.net
* @license BSD license (http://www.opensource.org/licenses/bsd-license.php)
********************************************************************/

var FireCoin = {
	onclick: function() {
		// Get the BitCoin address
		var address = FireCoin.getMetaContents("bitcoin",content.document.getElementsByTagName("meta"));
		// Validate the address
		FireCoin.sendRequest("validateaddress", [address], FireCoin.isValid);
	},
	
	isValid: function (json) {
		if(json.result.isvalid){
			// The address is valid, open the dialog
			FireCoin.sendRequest("getinfo", [], FireCoin.openDialog);
		} else {
			// A invalid address was provided
			alert("This site didn't provide a valid bitcoin address");
		}
	},
	
	openDialog: function(json){
		var balance = json.result.balance;
		// Get the BitCoin address
		var address = FireCoin.getMetaContents("bitcoin",content.document.getElementsByTagName("meta"));
		// Get the message
		var message = FireCoin.getMetaContents("bitcoinmsg",content.document.getElementsByTagName("meta"));
		// Check if there was a message or not, if not, set the message to "No message specified"
		message = message != "nope.avi" ? message : "No message specified";
		
		var params = {inn:{firecoinDonatingAddress:address, firecoinMessageBox:message, firecoinBalanceValue:balance}, out:null};
		window.openDialog("chrome://firecoin/content/donateDialogOverlay.xul", "Donate BitCoins",
"chrome,dialog=yes,modal=yes,centerscreen", params);

		if (params.out) {
			// Send the money to the site
		    FireCoin.sendRequest("sendfrom", ["", params.out.address, params.out.amount, 1,"FireCoin donation"], FireCoin.vaildTransaction);
		    if(params.out.toAuthorAmount != 0){
		    	// The user chose to donate 5% to me, so send it to me
		    	FireCoin.sendRequest("sendfrom", ["","msKEs37CnQWrvQmXuvcAQK8VFNf1JSpTrU", params.out.toAuthorAmount, 1,"FireCoin donation to Addon author - Thanks!"], FireCoin.vaildTransaction);
		    }
	    } else {
	    // User clicked cancel. Typically, nothing is done here.
	    }
	},
	
	vaildTransaction: function(json) {
		// Check for a valid transaction
		if(json.result.error == null){
			alert("Donation Sent!");
		}
	},
	
	/**
	 * Get the content of a metatag
	 * @param mn the name of the metatag <meta _name="mn"_ />
	 */
	getMetaContents: function(mn,m){
		
		for(var i in m){
			if(m[i].name == mn){
				return m[i].content;
			}
		}
		// meta tag not found
		return "nope.avi";
	}, 
	
	/**
	 * Sends a JSON-RPC call to the bitcoin server
	 * @param m the method to call
	 * @param p the params to send the method
	 * @return a JSON object containing the response from bitcoin
	 */
	sendRequest: function(m, p, callback) {
		var http = new XMLHttpRequest();
		var url = "http://127.0.0.1:8332/";
		var params = {jsonrpc: "1.0",method: m, params: p, id: "jsonrpc"};
		http.open("POST", url, true);
		
		//Send the proper header information along with the request
		http.setRequestHeader("Content-type", "text/x-json");
		http.setRequestHeader("Content-length", params.length);
		http.setRequestHeader("Connection", "close");
		
		http.onreadystatechange = function() {//Call a function when the state changes.
			if(http.readyState == 4 && http.status == 200) {
				    callback(JSON.parse(http.responseText));
			} else if(http.readyState == 4 && http.status != 200) {
				alert("Cannot talk to Bitcoin server or the server closed the connection (this happens if the transaction wasn't possible). Are you sure it is running as a server? \n please read: https://en.bitcoin.it/wiki/Running_Bitcoin#Bitcoin.conf_Configuration_File and add the server=1 option to the config file")
			}
		}
		http.send(JSON.stringify(params));
	}
}
 
window.addEventListener("load", function () {

	gBrowser.addEventListener("load", function(event) { 

		if (event.originalTarget instanceof HTMLDocument) {

	    	// The loaded documents view
			var win = event.originalTarget.defaultView;
			
			if(win.frameElement){
				return;
			}
			
			// if it hasn't a location, stop
			if (!win.location){
		        return;
		       }
		 
		    // get the URL
		    var href = win.location.href;
		 
		    // if it doesn't start with http:// we'll skip it
		    if (win.location.protocol != "http:"){
		        return;
		    }
		        
		    // Get the button from the XUL
		    var button = document.getElementById("firecoin-button");
		    
		    // now we need the document instead
		    doc = event.originalTarget;
		    
		    browser = gBrowser.getBrowserForDocument(doc);
		    // If the meta is set
		    if(FireCoin.getMetaContents("bitcoin",doc.getElementsByTagName('meta')) != "nope.avi"){
		    	// Set the active class
		    	button.setAttribute("class", "toolbarbutton-1 firecoin-button");
		    	// Get the browser of the document
		    	
		    	// Mark it
		    	browser.firecoin_hasBitCoinMetaTag = true;
		    	
		    	// Debug
		    	dump("found");
		    } else {
		    	// else set the inactive class
		    	button.setAttribute("class", "toolbarbutton-1 firecoin-button-inactive");
		    	// Mark it
		    	browser.firecoin_hasBitCoinMetaTag = false;
		    	
		    	// Debug
		    	dump("not found");
		    }
		}
  	}, true);
  	
  	// get the tabcontainer
  	var container = gBrowser.tabContainer;
  	// we need to change the state of the button when switching tabs
	container.addEventListener("TabSelect", function(event) {
		// Get the selected browser
		var browser = gBrowser.selectedBrowser;
		// debug
		dump(browser.firecoin_hasBitCoinMetaTag);
		
		// get our toolbarbutton
		var button = document.getElementById("firecoin-button");
		
		// if our marker property is set and true we update the button accordingly
		if(browser.firecoin_hasBitCoinMetaTag){
			// this tab has a bitcoin meta set!
			button.setAttribute("class", "toolbarbutton-1 firecoin-button");
		} else {
			// this hasn't
			button.setAttribute("class", "toolbarbutton-1 firecoin-button-inactive");
		}
	}, false);
		
}, false);

