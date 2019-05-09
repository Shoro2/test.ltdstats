function checkLivegame() {

}


function apiGetPlayer(callback, playername) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var player = JSON.parse(xhttp.response);
            callback(player);
        }
    };
    xhttp.open("GET", '/api/profile/player100?playername=' + playername, true);
    xhttp.send();
}

function queryPlayer(playername) {
    apiGetPlayer(function (result) {
        if (result.player == null) {
            console.log(playername);
            console.log(result);
            allPlayers.push({ "playername": "Bot" });
            document.getElementById("loadingstring").innerHTML = "Requesting players.... " + allPlayers.length + "/4";
            //document.getElementById("apierror").style.display = "";
        }
        else {
            result.player.statistics = JSON.parse(result.player.statistics);
            player = result.player
            allPlayers.push(player);
            document.getElementById("loadingstring").innerHTML = "Requesting players.... " + allPlayers.length + "/4";
            if (allPlayers.length == 4) {
                document.getElementById("west").style.display = "";
                document.getElementById("east").style.display = "";
                parsePlayers();
                document.getElementById("loadingstring").innerHTML = "";

            }
            return player;
        }

    }, playername);
}


function sqlGetLivegame(callback, playername) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var livegame = JSON.parse(xhttp.response);
            callback(livegame);
        }
        else if (this.status === 500) document.getElementById("apierror").style.display = "";
    };
    xhttp.open("GET", '/sql/getLivegame?playername=' + playername, true);
    xhttp.send();

}

function queryLivegame(playername) {
    document.getElementById("loadingstring").innerHTML = "Requesting Livegame...."
    sqlGetLivegame(function (result) {
        livegame = JSON.parse(result);
        console.log(livegame);
        if (livegame) {
            livegame.players.forEach(function (ele) {
                queryPlayer(ele);
            });
        }
        else {
            document.getElementById("apierror").style.display = "";
        }
        return livegame;
    }, playername);
}
