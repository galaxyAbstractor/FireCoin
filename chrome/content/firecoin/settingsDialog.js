// Called once when the dialog displays
function onLoad() {
  // Use the arguments passed to us by the caller
  document.getElementById("firecoinUsernameBox").value = window.arguments[0].inn.firecoinUsernameBox;
  document.getElementById("firecoinPasswordBox").value = window.arguments[0].inn.firecoinPasswordBox;
}

// Called once if and only if the user clicks OK
function onOK() {
   // Return the changed arguments.
   // Notice if user clicks cancel, window.arguments[0].out remains null
   // because this function is never called
   window.arguments[0].out = {username:document.getElementById("firecoinUsernameBox").value,
        password:document.getElementById("firecoinPasswordBox").value};    
   return true;
}