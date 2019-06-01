function getScores(callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var fighters = JSON.parse(xhttp.response);
            callback(fighters);
        }
    };
    xhttp.open("GET", "/quiz/getScores", true);
    xhttp.send();
}

function loadScores() {
    getScores(function (result) {
        filltable(JSON.parse(result));
        return result;
    });
}

function filltable(players) {
    var rank = 1;
    players.forEach(element => {
        var tr = document.createElement("tr");
        var td0 = document.createElement("td");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var node_rank = document.createTextNode(rank);
        var node_name = document.createTextNode(element.playername);
        var node_points = document.createTextNode(element.points);
        td0.appendChild(node_rank);
        td1.appendChild(node_name);
        td2.appendChild(node_points);
        tr.appendChild(td0);
        tr.appendChild(td1);
        tr.appendChild(td2);
        document.getElementById("ladder").appendChild(tr);
        rank++;
    });
}

loadScores();