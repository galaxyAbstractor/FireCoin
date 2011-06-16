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
	  document.getElementById("firecoinDonatingAddress").value = window.arguments[0].inn.firecoinDonatingAddress;
	  document.getElementById("firecoinMessageBox").value = window.arguments[0].inn.firecoinMessageBox;
	  document.getElementById("firecoinBalanceValue").value = window.arguments[0].inn.firecoinBalanceValue;
	  document.getElementById("firecoinRemainingValue").value = window.arguments[0].inn.firecoinBalanceValue;
	},
	
	// Called once if and only if the user clicks OK
	onOK: function() {
		// Get the numbers
	   var donateAmount = FireCoin.roundNumber(document.getElementById("firecoinAmountBox").value,8);
	   var donateAmountTotal = FireCoin.roundNumber(document.getElementById("firecoinTotalValue").value,8);
	   var balance = document.getElementById("firecoinBalanceValue").value;
	   
	   // Check if user has enough money
	   if(donateAmountTotal > balance) {
	   		alert("You don't have that much money, silly!");
	   		return false;
	   }
	   
	   // Check if the user choose something to donate
	   if(donateAmountTotal == 0){
	   		alert("You didn't forget to choose how much to donate, did you?");
	   		return false;
	   }
	   
	   // Get if they decided to donate to me
	   var toAuthor = 0;
	   if(document.getElementById("firecoinDonateToAuthor").checked){
	   		toAuthor = FireCoin.roundNumber(document.getElementById("firecoinAmountBox").value*0.05,8);
	   }
	   
	   // Return the info
	   window.arguments[0].out = {amount:donateAmount, toAuthorAmount: toAuthor, address:document.getElementById("firecoinDonatingAddress").value};    
	   return true;
	},
	
	onChange: function() {
		if(document.getElementById("firecoinDonateToAuthor").checked){
			document.getElementById("firecoinTotalValue").value = FireCoin.roundNumber(document.getElementById("firecoinAmountBox").value*1.05,8);
			document.getElementById("firecoinRemainingValue").value = FireCoin.roundNumber(document.getElementById("firecoinBalanceValue").value-document.getElementById("firecoinAmountBox").value*1.05,8);
		} else {
			document.getElementById("firecoinTotalValue").value = FireCoin.roundNumber(document.getElementById("firecoinAmountBox").value,8);
			document.getElementById("firecoinRemainingValue").value = FireCoin.roundNumber(document.getElementById("firecoinBalanceValue").value-document.getElementById("firecoinAmountBox").value,8);
		}
	},
	
	roundNumber: function(num,dec) {
		var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
		return result;
	}
}