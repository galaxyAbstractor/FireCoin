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
// Called once when the dialog displays
	onLoad: function() {
	  // Use the arguments passed to us by the caller
	  document.getElementById("firecoinUsernameBox").value = window.arguments[0].inn.firecoinUsernameBox;
	  document.getElementById("firecoinPasswordBox").value = window.arguments[0].inn.firecoinPasswordBox;
	},
	
	// Called once if and only if the user clicks OK
	onOK: function() {
	   // Return the changed arguments.
	   // Notice if user clicks cancel, window.arguments[0].out remains null
	   // because this function is never called
	   window.arguments[0].out = {username:document.getElementById("firecoinUsernameBox").value,
	        password:document.getElementById("firecoinPasswordBox").value};    
	   return true;
	}
}