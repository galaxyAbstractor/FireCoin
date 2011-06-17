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
	/**
	 * Is called when the user presses the toolbar button
	 */
	onclick: function() {
		// Get the BitCoin address
		var address = FireCoin.getMetaContents("bitcoin",content.document.getElementsByTagName("meta"));
		// Validate the address
		FireCoin.sendRequest("validateaddress", [address], null, FireCoin.isValid);
	},
	
	/**
	 * Callback to see if a address is valid or not
	 * @param json the returned JSON from the server
	 * @param extra an extra argument, used to hold the address if it's from a selection
	 */
	isValid: function (json, extra) {
		if(json.result.isvalid){
			// The address is valid, open the dialog
			FireCoin.sendRequest("getinfo", [], extra, FireCoin.openDialog);
		} else {
			// A invalid address was provided
			alert("This site didn't provide a valid bitcoin address");
		}
	},
	// If the site provides an URL, we'll store it so it can be accessed later on
	url:null,
	/**
	 * Opens the donation dialog
	 * @param json the returned JSON from the server
	 * @param extra an extra argument, used to hold the address if it's from a selection
	 */
	openDialog: function(json, extra){
		if(json.result != null){
			var balance = json.result.balance;
			// Extra was set which means that it was from a selection
			if(extra != null) {
				// The selected address
				var address = extra;
				// No message can be specified on this
				var message = "No message specified";
				// And no URL either
				var url = "nope.avi";
			} else {
				// This was provided from meta
				// Get the BitCoin address
				var address = FireCoin.getMetaContents("bitcoin",content.document.getElementsByTagName("meta"));
				// Get the message
				var message = FireCoin.getMetaContents("bitcoinmsg",content.document.getElementsByTagName("meta"));
				// Get a thanks URL
				var url = FireCoin.getMetaContents("bitcointhanks",content.document.getElementsByTagName("meta"));
			}
			
			
			// Check if there was a message or not, if not, set the message to "No message specified"
			url = url != "nope.avi" ? url : null;
			// Set the url
			FireCoin.url = url;
			
			// Check if there was a message or not, if not, set the message to "No message specified"
			message = message != "nope.avi" ? message : "No message specified";
			
			var params = {inn:{firecoinDonatingAddress:address, firecoinMessageBox:message, firecoinBalanceValue:balance}, out:null};
			window.openDialog("chrome://firecoin/content/donateDialogOverlay.xul", "Donate BitCoins",
	"chrome,dialog=yes,modal=yes,centerscreen", params);
	
			if (params.out) {
				// Send the money to the site
			    FireCoin.sendRequest("sendfrom", ["", params.out.address, params.out.amount, 1,"FireCoin donation"], null, FireCoin.vaildTransaction);
			    if(params.out.toAuthorAmount != 0){
			    	// The user chose to donate 5% to me, so send it to me
			    	FireCoin.sendRequest("sendfrom", ["","1KHTs795SKBd2yBfdfpf4BxArEq5RGrNZo", params.out.toAuthorAmount, 1,"FireCoin donation to Addon author - Thanks!"], null, FireCoin.vaildTransaction);
			    }
		    } else {
		    	// User clicked cancel. Typically, nothing is done here.
		    }
		} else {
			alert(json.error.message);
		}
	},
	/**
	 * Check if the transaction was valid
	 * @param json the returned JSON from the server
	 * @param extra an extra argument, used to hold the address if it's from a selection
	 */
	vaildTransaction: function(json, extra) {
		
		// Check for a valid transaction
		if(json.result != null){
			alert("Donation Sent!");
			if(FireCoin.url != null){
				gBrowser.addTab(FireCoin.url);
				FireCoin.url = null;
			}
		} else {
			alert(json.error.message);
		}
	},
	
	/**
	 * This is what is called when the user presses the menu item in the right-click menu
	 */
	sendBitcoins: function(){
		// Get the selected text
		var address = document.commandDispatcher.focusedWindow.getSelection().toString();
		FireCoin.sendRequest("validateaddress", [address], address, FireCoin.isValid);
	},
	
	/**
	 * Get the content of a metatag
	 * @param mn the name of the metatag <meta _name="mn"_ />
	 * @param m all the meta elements
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
	 * @param extra an extra argument, used to hold the address if it's from a selection
	 * @return a JSON object containing the response from bitcoin
	 */
	sendRequest: function(m, p, extra, callback) {
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
				// Check if this originated from a selection
				if(extra != null){
					// Send the result to the callback function
					callback(JSON.parse(http.responseText), extra);
				} else {
					// Send the result to the callback function
					callback(JSON.parse(http.responseText));
				}
			} else if(http.readyState == 4 && http.status == 500) {
				// BitCoin gives a 500 status when an error occured
				callback(JSON.parse(http.responseText), null);
			} else if(http.readyState == 4 && http.status != 200) {
				// Could not connect to the server
				alert("Cannot talk to Bitcoin server or the server closed the connection (this happens if the transaction wasn't possible). Are you sure it is running as a server? \n please read: https://en.bitcoin.it/wiki/Running_Bitcoin#Bitcoin.conf_Configuration_File and add the server=1 option to the config file")
			}
		}
		http.send(JSON.stringify(params));
	}
}

/**
 * We need to add an event listener for when the righ-click menu opens, so we can show our item only when 
 * text is selected
 */
function init()	{
	var contextMenu = document.getElementById("contentAreaContextMenu");
    if (contextMenu)
    	contextMenu.addEventListener("popupshowing", sendBitcoinShowHide, false);
}

/**
 * Toggle the menu item
 */
function sendBitcoinShowHide(event) {
	var show = document.getElementById("sendBitcoinsMenuItem");
	show.hidden = !gContextMenu.isTextSelected;
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

