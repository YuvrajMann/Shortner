function validURL(str) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}

function appendElements(){
    $('.mapList').empty();
    chrome.storage.sync.get("maps", function (items) {
        let obj=items.maps;
        let idx=1;
        $('.mapList').append(
           `
           <tr>
           <th>S.No</th>
           <th>URL</th>
           <th>Key</th>
           <th></th>
       </tr> `
        )
        for(let key in obj){
            if(obj.hasOwnProperty(key)){
                val=obj[key];
                $('.mapList').append(
                    `<tr>
                    <td>${idx}</td>
                    <td>${val}</td>
                    <td>${key}</td>
                    <td><button id="del_btn" class=${key}>Delete</button></td>
                    </tr>`
                )
            }
            idx++;
        }
        let btns=$(".mapList #del_btn");
        console.log(btns);
        for(let i=0;i<btns.length;++i){
          let clName=btns[i].className;
          $(`.${clName}`).click(()=>{
            console.log(clName);
            if(confirm('Are you sure you want to delete')){
              chrome.storage.sync.get("maps", function (items) {
                let obj=items.maps;
                delete obj[clName];
                chrome.storage.sync.set({maps:obj},()=>{
                  appendElements();
                  console.log('Updated Successfully');
                });
            })
            }
          });
        }
    })  
   
}
$(document).ready(function () {
  appendElements();
  $(".add_form").submit((e) => {
    e.preventDefault();

    let url = $("#url").val();
    let key = $("#key").val();

    if (validURL(url)) {
      let obj = {};
      chrome.storage.sync.get("maps", function (result) {
        obj = result.maps;
        if(!obj){
            obj={};
        }
        obj[key] = url;
        console.log(obj);
        chrome.storage.sync.set({ maps: obj }, function () {
          appendElements();
        });
      });
    } else {
      alert("Please give a valid url");
    }
  });
  

});
