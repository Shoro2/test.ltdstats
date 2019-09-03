function getPlayers(callback)
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
           var fighters = JSON.parse(xhttp.response);
           callback(fighters);
        }
    };
    xhttp.open("GET", "/lihl/getPlayer", true);
    xhttp.send();
}

function loadPlayers()
{
    getPlayers(function(result)
    {
        return result;
    });
}

function testit(eins, zwei, drei) {
    console.log(eins, zwei);
}

document.body.onload = function ()
{
    player = [];
    getPlayers(function (result)
    {
        console.log(result);
        var rank = 1;
        result.forEach(element =>
        {
            var tr = document.createElement("tr");
            var td0 = document.createElement("td");
            var td1 = document.createElement("td");
            var td2 = document.createElement("td");
            var td3 = document.createElement("td");
            var td4 = document.createElement("td");
            var node_rank = document.createTextNode(rank);
            var node_name = document.createTextNode(element.name);
            var node_elo = document.createTextNode(element.elo);
            var node_games = document.createTextNode(element.games);
            var node_wins = document.createTextNode(element.wins);
            td0.appendChild(node_rank);
            td1.appendChild(node_name);
            td2.appendChild(node_elo);
            td3.appendChild(node_games);
            td4.appendChild(node_wins);
            tr.appendChild(td0);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            document.getElementById("ladder").appendChild(tr);
            rank++;
        });
    });
};