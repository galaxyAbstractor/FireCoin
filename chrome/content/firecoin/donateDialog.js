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
	// Register a new Password Manager
	passwordManager: Components.classes["@mozilla.org/login-manager;1"].
	                                getService(Components.interfaces.nsILoginManager),
	                                
	getLogin: function() {
		var login = FireCoin.passwordManager.findLogins({}, "chrome://firecoin", null, 'BitCoin Server');
		return login[0];
	},
	
	// Called once when the dialog displays
	onLoad: function() {
	  // Use the arguments passed to us by the caller
	  document.getElementById("firecoinDonatingAddress").value = window.arguments[0].inn.firecoinDonatingAddress;
	  document.getElementById("firecoinMessageBox").value = window.arguments[0].inn.firecoinMessageBox;
	  document.getElementById("firecoinBalanceValue").value = window.arguments[0].inn.firecoinBalanceValue;
	},
	
	// Called once if and only if the user clicks OK
	onOK: function() {
	   // Return the changed arguments.
	   // Notice if user clicks cancel, window.arguments[0].out remains null
	   // because this function is never called
	   window.arguments[0].out = {username:document.getElementById("firecoinUsernameBox").value,
	        password:document.getElementById("firecoinPasswordBox").value};    
	   return true;
	},
	
	onExtra: function() {
		var params = {inn:{firecoinUsernameBox:FireCoin.getLogin().username, firecoinPasswordBox:FireCoin.getLogin().password}, out:null};       
		window.openDialog("chrome://firecoin/content/firecoinSettingsDialog.xul", "Settings",
"chrome,dialog=yes,modal=yes,centerscreen", params);

		if (params.out) {
	    	// Register nsLoginInfo
			var nsLoginInfo = new Components.Constructor("@mozilla.org/login-manager/loginInfo;1",
	                                           Components.interfaces.nsILoginInfo,
	                                           "init");
			
			var extLoginInfo = new nsLoginInfo('chrome://firecoin',
	                      null, 'BitCoin Server',
		                      params.out.username, params.out.password, "", "");
		    
		    var oldLogin = FireCoin.getLogin();                 
		    if(oldLogin != null) {
		    	FireCoin.passwordManager.modifyLogin(oldLogin, extLoginInfo);
		    } else {   
		    	FireCoin.passwordManager.addLogin(extLoginInfo);
		    }
	    } else {
	    // User clicked cancel. Typically, nothing is done here.
	    }
	},
	
	onChange: function() {
		if(document.getElementById("firecoinDonateToAuthor").checked){
			document.getElementById("firecoinTotalValue").value = FireCoin.roundNumber(document.getElementById("firecoinAmountBox").value*1.05,4);
			document.getElementById("firecoinRemainingValue").value = FireCoin.roundNumber(document.getElementById("firecoinBalanceValue").value-document.getElementById("firecoinAmountBox").value*1.05,4);
		} else {
			document.getElementById("firecoinTotalValue").value = FireCoin.roundNumber(document.getElementById("firecoinAmountBox").value,4);
			document.getElementById("firecoinRemainingValue").value = FireCoin.roundNumber(document.getElementById("firecoinBalanceValue").value-document.getElementById("firecoinAmountBox").value,4);
		}
	},
	
	roundNumber: function(num,dec) {
		var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
		return result;
	}
}