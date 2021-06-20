let color = '#3aa757';
var tabid1;
var offset=30;
var tabNumber=0;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

 /* setInterval(()=>{
  if(tabid1){

    chrome.tabs.update(tabid1,{active:true});
    console.log('tab updated');}

  },20000);
  */

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // 2. A page requested user data, respond with a copy of `user`
  //Message by first tab
  if (message[0] == 'createTab') {
    if(message[2]=='olymp'){
    chrome.windows.create({
      url: 'https://olymptrade.com/platform',
      width: 300,
      height:200,
      left:offset+tabNumber*100,
      top:600+tabNumber*100
    }, function (win) {
     // console.log(win);
      const keyName = message[1] + 'Tab';
      tabNumber++;
      chrome.storage.local.set({
        [keyName]: win.tabs[0].id
      }, () => {
       // console.log("tab created",  win.tabs[0].id);
        tabid1= win.tabs[0].id;
      })


      // console.log("Not Changed");



    });}
    else if(message[2]=='signal'){
      chrome.tabs.create({
        url: 'https://binary-signal.com/fr/chart/'+message[1],
      }, function (tab) {  
      });
    }



  }
  //Message by created tab
  else if (message == 'getTab') {
    sendResponse(sender.tab.id);
    console.log('sender tab: ', sender.tab.id)

  }
});





