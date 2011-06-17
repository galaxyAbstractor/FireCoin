Makes it easier for you to donate Bitcoins to siteowners with firefox. If you like the addon, please consider donating to me: 1KHTs795SKBd2yBfdfpf4BxArEq5RGrNZo

What it does
=======
The plugin lets you discover bitcoin addresses provided by the site owner in the header section. When the toolbar button lights up, a bitcoin address has been provided 
and you can press the button to donate.

It also lets you select bitcoin addresses on pages, right-click on them and choose "Send Bitcoins". This makes it easy to send payments without opening the client.

How To Use
=======
After install, make sure that the toolbarbutton is placed in a toolbar. Then, make sure you read this guide:
https://en.bitcoin.it/wiki/Running_Bitcoin#Bitcoin.conf_Configuration_File

You need to make sure BitCoin is running as a server by putting these options to your bitcoin.conf file:
	server=1
	rpcuser=*Desired username*
	rpcpassword=*Desired secure password*
	
Some things to note:
The addon will not show any transaction fees, but these will be paid automatically by the JSON-RPC API. So if you send 0.01BTC to someone, be aware that
it might cost 0.02BTC total.

There is an option on every transaction to pay 5% extra to me. This will only be paid if you check the checkbox (disabled by default) "Donate 5% to addon author?", never anything else.

You will have to authenticate to the JSON-RPC API once every browser session for security, but you will have the option to save the credentials with the firefox login manager.

For site owners or developers!
=======
Bitcoinaddress detection works with meta tags in the header. They are named bitcoin, bitcoinmsg and bitcointhanks.

To add your address to a page, add this to the <head> section of your HTML:
	<meta name="bitcoin" content="1KHTs795SKBd2yBfdfpf4BxArEq5RGrNZo" />
change your address accordingly

You also have an option to leave a message to the donater, which is shown before donating:
	<meta name="bitcoinmsg" content="With your donation, I will be able to keep the site running longer!" />
	
The last meta is bitcointhanks, which should hold an URL to a thanks page, like this:
	<meta name="bitcointhanks" content="http://pixomania.net" />
	
Only the first meta is required, the rest is optional

Changelog
=======
* 17 Jun, 2011: Version 1 released!
* 16 Jun, 2011: Almost done. Balance works. Transaction works. Need some final touches though. Currently runs on Testnet.
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