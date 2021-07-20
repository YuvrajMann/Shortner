let color = '#3aa757';

let obj=null;
chrome.runtime.onInstalled.addListener(()=>{
  chrome.storage.sync.get("maps", function (items) {
      obj=items.maps;
  })
});
chrome.storage.onChanged.addListener(()=>{
  chrome.storage.sync.get("maps", function (items) {
      obj=items.maps;
  })
});
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      console.log(details);
      let url=details.url;
      url=url.toString();
      let arr=url.split('?');

      if(arr.length>=2){
      
        let query=arr[1];
        let x=query.split('&');
        let m=x[0]
       
        let z=m.split('=');
        let fq=z[1];
        fq=fq.toString();
        console.log(fq);
        let domain=arr[0];
        let dom=domain.split('/');
        let redirect=null;
        if(dom.length>0&&dom[dom.length-1]=="search"&&fq){
            console.log(obj);
            console.log(obj.hasOwnProperty(fq));
            if(obj.hasOwnProperty(fq)){
              redirect=obj[fq].toString();
            
              return {redirectUrl: redirect };
            }
            else{
              return {cancel: false}; 
            }
        }
        else{
          return {cancel: false}; 
        }
      }
      else{
        return {cancel: false}; 
      }
   
    },
    {
      urls: ["<all_urls>"],
      types: ["main_frame"]
    },
    ["blocking"]
  );



