
queryLadder(100, 0);
var allPlayers = [];

function drawLadder() {
    var tabelle = document.getElementById("myTable");
    
    for (var i = 0; i < allPlayers.length; i++) {
        var row = tabelle.insertRow(i + 1);
        var cell = [5];
        for (var e = 0; e < 5; e++) {
            cell[e] = row.insertCell(e);
            cell[e].classList.add("td_" + e);
        }
        cell[0].innerHTML = i + 1;
        cell[1].innerHTML = allPlayers[i].name;
        cell[2].innerHTML = allPlayers[i].elo;
        cell[3].innerHTML = allPlayers[i].games;
        cell[4].innerHTML = allPlayers[i].wins;
    }
}


function getLadder(callback, limit, offset) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var player = JSON.parse(xhttp.response);
            callback(player);
        }
    };
    xhttp.open("GET", "/sql/ladder/?limit=" + limit + "&offset=" + offset, true);
    xhttp.send();
}
function queryLadder(limit, offset) {
    getLadder(function (result) {
        result.forEach(function (ele) {
            allPlayers.push(ele);
        });
        drawLadder();
        return result;
    }, limit, offset);
}