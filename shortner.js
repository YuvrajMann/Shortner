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

$(document).ready(()=>{
    $('#sub_btn').click((e)=>{
        e.preventDefault();
        let url=$('#full_url').val();

        if(validURL(url)){
            $(".shortened_url").innerHtml='loading...'
            $.post('http://localhost:5000/shortUrls',{fullUrl:url},(data,status)=>{
                console.log(data);
                $(".shortened_url").html(`Shortened URL - <a href="http://localhost:5000/${data}">
                http://localhost:5000/${data}
                </a>`);
            })
        }
        else{
            alert("Please give a valid url");
        }
    });
});