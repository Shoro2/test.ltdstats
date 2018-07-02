var count = 0;
var skipped = 0;
var allgames = [];

function apiGetGames(callback, type, value) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var games = JSON.parse(xhttp.response);
            callback(games);
        }
    };
    xhttp.open("GET", "/api?command={" + type + value + "}", true);
    console.log("/api?command={" + type + value + "}");
    xhttp.send();
}

function queryGames(type, value) {
    apiGetGames(function (result) {
        console.log(result);
        if (count == 0) count = result.filteredGames.count
        console.log(count);
        result.filteredGames.games.forEach(function (element) {
            if (element.queuetype == "Normal") {
                console.log("found ranked");
                allgames.push(element);
            }
            else skipped++;
        });
        console.log(allgames.length);
        
        
        if (allgames.length + skipped < count) {
            limit = count - allgames.length;
            if (limit > 100) limit = 100;
            offset = allgames.length + skipped;
            queryGames('filteredGames(ts:"' + ts + '", limit:' + limit + ', offset: ' + offset + ', orderby: "' + orderby + '", direction: ASC)', '{count, games{ ts }}');
        }
        console.log(allgames);
        return allgames;
    }, type, value);
}
var ts = "2018-07-02";
var limit = 100;
var offset = 0;
var orderby = "ts";

var queriedGames = queryGames('filteredGames(ts:"' + ts + '", limit:' + limit + ', offset: ' + offset + ', orderby: "' + orderby + '", direction: ASC)', '{count,games{game_id,ts,wave,time,queuetype,gameDetails{playername,legion,iscross,overallElo,position,unitsPerWave,leaksPerWave,mercsSentPerWave,mercsReceivedPerWave,workersPerWave,netWorthPerWave}}}');