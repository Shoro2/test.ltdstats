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
            document.getElementById("apierror").style.display = "";
        }
        else {
            result.player.statistics = JSON.parse(result.player.statistics);
            player = result.player
            allPlayers.push(player);
            if (allPlayers.length == 4) parsePlayers();
            return player;
        }

    }, playername);
}


function sqlGetLivegame(callback,playername) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var livegame = JSON.parse(xhttp.response);
            callback(livegame);
        }
    };
    xhttp.open("GET", '/sql/getLivegame?playername=' + playername, true);
    xhttp.send();
}

function queryLivegame(playername) {
    sqlGetLivegame(function (result) {
        livegame = JSON.parse(result);
        console.log(livegame);
        livegame.players.forEach(function (ele) {
            queryPlayer(ele);
        });
        return livegame;
    },playername);
}



function getPlayer() {
    var requested_players = 0;
    allPlayers = [];
    queryLivegame(document.getElementById("playername").value);
}

function parsePlayers() {
    console.log(allPlayers);
}