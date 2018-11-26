
queryGames(100, 0);
var allGames = [];

function drawLadder() {
    var tabelle = document.getElementById("myTable");

    for (var i = 0; i < allGames.length; i++) {
        var row = tabelle.insertRow(i + 1);
        var cell = [9];
        for (var e = 0; e < 9; e++) {
            cell[e] = row.insertCell(e);
            cell[e].classList.add("td_" + e);
        }
        cell[0].innerHTML = allGames[i].id;
        cell[1].innerHTML = allGames[i].p1;
        cell[2].innerHTML = allGames[i].p2;
        cell[3].innerHTML = allGames[i].p3;
        cell[4].innerHTML = allGames[i].p4;
        cell[5].innerHTML = allGames[i].p5;
        cell[6].innerHTML = allGames[i].p6;
        cell[7].innerHTML = allGames[i].p7;
        cell[8].innerHTML = allGames[i].p8;
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
    xhttp.open("GET", "/sql/games", true);
    xhttp.send();
}
function queryGames(limit, offset) {
    getLadder(function (result) {
        result.forEach(function (ele) {
            allGames.push(ele);
        });
        drawLadder();
        return result;
    }, limit, offset);
}