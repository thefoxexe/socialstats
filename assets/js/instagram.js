let input = document.getElementById('search');
let follower = document.getElementById('stats');
let name = document.getElementById("username");
let userImg = document.getElementById('user-img');
let userFollow = document.getElementById("user-follow");
let userHandler = document.getElementById("user-name");
let bio = document.getElementById('bio');

input.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {  
        search();
    }
});

function search(){
    if (input.value[0] == "@") {
        var newinput =  input.value.split("@")[1];
        location.hash = "!/"+newinput;
    } else {
        location.hash = "!/"+input.value;
    }
    live();
};

live();

setInterval(live, 5000);
function live(){
        var live = {
            username: function() {
                if (location.hash.length == 0) {
                    var featured = ['graphicoum'];

                    var vip = featured[Math.floor(Math.random() * featured.length)];

                    location.hash = "!/"+vip;
                    return vip;
                } else {
                    return location.hash.split("!/")[1];
                }
            }
        };
        var request = new XMLHttpRequest()

        request.open("GET","https://instagram.com/"+live.username()+"/?__a=1", true);

        request.onload = function(){
            if (request.status >= 200 && request.status < 400) {
            
                var data = JSON.parse(this.response);

                follower.innerHTML = data.graphql.user.edge_followed_by.count;
                name.innerText = data.graphql.user.full_name;
                userImg.src = data.graphql.user.profile_pic_url;
                userHandler.innerText = "@"+data.graphql.user.username;
                userFollow.href = "https://instagr.am/"+data.graphql.user.username;
                document.title = data.graphql.user.full_name+"'s Live Instagram Count"
                bio.innerText = data.graphql.user.biography;
            } else{
                console.log("error")
            }
        }

        request.send()

} 