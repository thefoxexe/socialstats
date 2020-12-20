let name = document.getElementById('name');
let stats = document.getElementById('stats');
let link = document.getElementById('link');
let input = document.getElementById('search');
let img = document.getElementById('user-img');
var youtube = {
    api: function(){
        var api = ['AIzaSyB7GZsWUE3irEoV_yvpW6DEyI9T7O0TSHc','AIzaSyCGwoR8zP7dFIM4UYObRg-2PYd19ZZXm54','AIzaSyC6g19rmUANP4vZZNrdxcVc79RnxWqmOX4','AIzaSyBnTGBUFTqNNMe2zNBV9mrG7IXckTjNeJc','AIzaSyDHDsm0u9PgafHaixIB9PmOQEQYGTqmz6A','AIzaSyDbxS9k3tagH6kGVVMk5Y7mRuCaI7U4K-Q','AIzaSyCDdwhuSERbegnebRTv5pRS6yBNPrStfus' ];
        return api[Math.floor(Math.random() * api.length)]
        },
    search: function(id){
    
        if (id.trim().substr(0, 2).toUpperCase() == "UC" && id.trim().length >= 24) {
            youtube.url(id);
        } else {
            
            var request = new XMLHttpRequest();
            request.open("Get","https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + encodeURIComponent(id) + "&type=channel&maxResults=5&key="+youtube.api(),true);
            request.onload = function(){

                if (request.status >= 200 && request.status < 400) {
                    var data = JSON.parse(this.response);
                    if (data.pageInfo.totalResults < 1) {
                    alert("No results found!");
                    youtube.url("UCDPK_MTu3uTUFJXRVcTJcEw")
                    return "UCDPK_MTu3uTUFJXRVcTJcEw";
                    } else {
                    var channelid = data.items[0].id.channelId;
                    youtube.url(channelid);
                    return channelid;
                }
                  } else {
                    console.log('error')
                    live();
                  }
                
                
                
            }
            request.send()    
        }

    },
    url: function(id){
        location.hash = "!/"+id;
        live();
    },
    channelId: function(){
        if (location.hash.length == 0) {
            var featured = ['UCDPK_MTu3uTUFJXRVcTJcEw'];

            var id = youtube.url((featured[Math.floor(Math.random() * featured.length)]));
            return id;
            
        } else {
            return location.hash.split("!/")[1];
        }
    },
};

live();

input.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
        search();
    }
});
function search(){
    youtube.search(input.value);  
    live();
};




setInterval(live, 60000);
function live(){

    var request = new XMLHttpRequest();

    request.open("Get","https://www.googleapis.com/youtube/v3/channels?part=snippet%2Cstatistics&id="+ encodeURIComponent(youtube.channelId()) + "&key="+youtube.api(),true)

    request.onload = function(){
        if (request.status >= 200 && request.status < 400) {

        var data =  JSON.parse(this.response)
        var g = data.items
        name.innerText = g[0].snippet.title;
        img.src = g[0].snippet.thumbnails.high.url;
        stats.innerText = g[0].statistics.subscriberCount;
        link.href= "https://youtube.com/channel/"+youtube.channelId();
        document.title = g[0].snippet.title+"'s Live YouTube Count"
        } else{
            console.log('error')
            live()
        }
    }

    request.send()
}