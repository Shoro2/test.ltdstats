function dbGetGames(callback, filter) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var games = JSON.parse(xhttp.response);
            callback(games);
        }
    };
    xhttp.open("GET", "/mongodb?command={" + filter + "}", true);
    xhttp.send();
}

function queryGames(filter) {
    dbGetGames(function (result) {
        console.log(result);
        return result;
    }, filter);
}


var queriedGames = queryGames('version:"v2.28"');