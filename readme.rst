Makes it easier for you to donate Bitcoins to siteowners with firefox.

Changelog
=======
* 07 Jun, 2011: Started implementing JSON-RPC requests. Will need to make it wait for reply before using data.
* 02 Jun, 2011: Back with the settings button in the donation dialog. Added onchange on the amount scroller so the total and remaining is updated.
* 31 May, 2011: Made the donate dialog an actual dialog. Added possibility to add a message as a meta
* 29 May, 2011: Settings function done.
* 28 May, 2011: Started implementing save settings function
* 22 May, 2011: Donation dialog done. Settings dialog done.
* 21 May, 2011: Modal dialog mostly done.
* 20 May, 2011: Started adding the modal dialog
* 14 May, 2011: Changed the listener so that when a tab is loaded but hasn't focus, it would still work. Also added markers to the tabs and made so that the button updates when changing tabs.
* 13 May, 2011: Detects the meta bitcoin now and sets the button to active if it exists. Does not update the button on tab change yet.
* 12 May, 2011: Created structure and sample code to work from