function saveTick(nummer) {
    console.log("saveTick " + nummer);
    if (Cookies.enabled) {
        if (document.getElementById("checkbox" + nummer).checked === true) {
            Cookies.set("ladder_tickbox" + nummer, true);
        }
        else {
            Cookies.set("ladder_tickbox" + nummer, false);
        }
    }
}

function getTicks() {
    if (Cookies.enabled) {
        if (typeof Cookies.get("ladder_tickbox0") !== 'undefined') {
            for (var i = 0; i < document.getElementsByClassName("filter_input").length; i++) {
                if (Cookies.get("ladder_tickbox" + i) === 'true') {
                    document.getElementById("checkbox" + i).checked = true;
                }
                else {
                    document.getElementById("checkbox" + i).checked = false;
                }
            }
        }
        else {
            for (i = 0; i < document.getElementsByClassName("filter_input").length; i++) {
                Cookies.set("ladder_tickbox" + i, true);
                document.getElementById("checkbox" + i).checked = true;
            }
        }
        getFilters();
    }
}

function expandFilters() {

    if (document.getElementById("filter-invis")) {
        var filter_obj = document.getElementById("filter-invis");
        filter_obj.id = "filter";
        var filter_note = document.getElementById("filter_display");
        filter_note.textContent = "Hide filters";
    }
    else {
        filter_obj = document.getElementById("filter");
        filter_obj.id = "filter-invis";
        filter_note = document.getElementById("filter_display");
        filter_note.textContent = "Show filters";
    }
}

function getFilters() {
    var filters = document.getElementsByClassName("filter_input");
    for (var i = 0; i < filters.length; i++) {
        if (filters[i].checked) {
            var filter_name = filters[i].value;

            var table_header = document.getElementById("th" + i);
            table_header.textContent = filter_name;
            table_header.style = "";
            var table_body = document.getElementsByClassName("td_" + i);
            for (var e = 0; e < table_body.length; e++) {
                table_body[e].style = "";
            }
        }
        else {
            table_header = document.getElementById("th" + i);
            table_header.style = "display:none;";
            table_body = document.getElementsByClassName("td_" + i);
            for (e = 0; e < table_body.length; e++) {
                table_body[e].style = "display:none;";
            }
        }
    }
}

function selectAll() {
    var filters = document.getElementsByClassName("filter_input");
    for (var i = 0; i < filters.length; i++) {
        filters[i].checked = true;
        saveTick(i);
    }
    document.getElementById("selectall").textContent = "Unselect all";
    document.getElementById("selectall").setAttribute("onClick", "javascript: selectNone();");
    getFilters();
}

function selectNone() {
    var filters = document.getElementsByClassName("filter_input");
    for (var i = 0; i < filters.length; i++) {
        filters[i].checked = false;
        saveTick(i);
    }
    document.getElementById("selectall").textContent = "Select all";
    document.getElementById("selectall").setAttribute("onClick", "javascript: selectAll();");
    getFilters();
}

document.body.onload = function () {
    if (window.location.href.includes("overall")) {
        var type = "overallElo";
    }
    else if (window.location.href.includes("classic")) {
        type = "classicElo";
    }
    else {
        type = "overallElo";
    }
    queryLadder(100, 0, type);
    
};

function getLadder(callback, limit, offset, type) {
    var xhttp = new XMLHttpRequest();
    document.getElementById("mitte").style.display = "";
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var player = JSON.parse(xhttp.response);
            callback(player);
        }
    };
    xhttp.open("GET", '/api/ladder?type=' + type + '&limit=' + limit + '&offset=' + offset, true);
    xhttp.send();
}

function queryLadder(limit, offset, type) {
    getLadder(function (result) {
        parsePlayers(result, type);
        document.getElementById("mitte").style.display = "none";
        parseRanks();
        return result;
    }, limit, offset, type);
}

function parsePlayers(myPlayers, type) {
    var players = myPlayers.filteredPlayers.players;
    var tabelle = document.getElementById("myladder");
    console.log(players.length);
    console.log(type);
    switch (type) {
        case "overallElo":
            for (var i = 0; i < players.length; i++) {
                players[i].statistics = JSON.parse(players[i].statistics);
                var row = tabelle.insertRow(i + 1);
                var cell = [26];
                for (var e = 0; e < 26; e++) {
                    cell[e] = row.insertCell(e);
                    cell[e].classList.add("td_" + e);
                }
                if (players[i].statistics.wins == null) players[i].statistics.wins = 0;
                if (players[i].statistics.losses == null) players[i].statistics.losses = 0;
                if (players[i].statistics.quits == null) players[i].statistics.quits = 0;
                if (players[i].statistics.ties == null) players[i].statistics.ties = 0;
                //var totalgames = players[i].statistics.wins + players[i].statistics.losses + players[i].statistics.quits + players[i].statistics.ties;
                var totalgames = players[i].statistics.wins + players[i].statistics.losses+ players[i].statistics.quits;
                if (players[i].statistics.overallPeakEloThisSeason == null) players[i].statistics.overallPeakEloThisSeason=players[i].statistics.overallElo;
                var totalwins = players[i].statistics.wins;
                var winchance_mastermind = (players[i].statistics.mastermindWins / players[i].statistics.mastermindPlayed * 100).toFixed(2);
                if (winchance_mastermind === "NaN") winchance_mastermind = 0;
                cell[0].innerHTML = i + 1;
                cell[1].innerHTML = '<a href="/profile?player=' + players[i].name + '">' + players[i].name + '</a>';
                cell[2].innerHTML = players[i].statistics.overallElo;
                cell[3].innerHTML = players[i].statistics.overallPeakEloThisSeason;
                cell[4].innerHTML = totalgames;
                cell[5].innerHTML = totalwins;
                cell[6].innerHTML = totalgames - totalwins;
                cell[7].innerHTML = ((totalwins/totalgames)*100).toFixed(2);
            }
            break;
        case "classicElo":
            for (i = 0; i < players.length; i++) {
                
                players[i].statistics = JSON.parse(players[i].statistics);
                console.log(players[i].statistics);
                row = tabelle.insertRow(i + 1);
                cell = [21];
                for (e = 0; e < 21; e++) {
                    cell[e] = row.insertCell(e);
                    cell[e].classList.add("td_" + e);
                }
                totalwins = players[i].statistics.classicWinsThisSeason;
                totalgames = totalwins + players[i].statistics.classicLossesThisSeason;
                
                winchance_classic = (totalwins / totalgames * 100).toFixed(2);
                if (winchance_classic === "NaN") winchance_classic = 0;
                cell[0].innerHTML = i + 1;
                cell[1].innerHTML = '<a href="/profile?player=' + players[i].name + '">' + players[i].name + '</a>';
                cell[2].innerHTML = players[i].statistics.classicElo;
                cell[3].innerHTML = players[i].statistics.classicPeakElo;
                cell[4].innerHTML = totalgames;
                cell[5].innerHTML = totalwins;
                cell[6].innerHTML = totalgames - totalwins;
                cell[7].innerHTML = winchance_classic;
            }
            break;
    }



    getFilters();
}

function getPlayer() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var playerurl = url.searchParams.get("player");
    if (playerurl == null) {
        window.location.href = window.location.href + "?player=" + document.getElementById("playername").value;
    }
    else {
        window.location.href = "/ladder/overall" + "?player=" + document.getElementById("playername").value;
    }

}

function sqlGetRank(callback, playername) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var rank = JSON.parse(xhttp.response);
            callback(rank);
        }
    };
    xhttp.open("GET", '/sql/rank?player=' + playername, true);
    xhttp.send();
}

function queryRank(playername, type) {
    sqlGetRank(function (result) {
        console.log(result);
        rank = parseInt(result[0].Rank);
        newrank = rank - 50;
        if (newrank < 0) newrank = 0;
        queryLadder(100, newrank, type);

        return rank;
    }, playername);
}

function parseRanks() {
    if (typeof newrank !== 'undefined') {
        var rankspalten = document.getElementsByClassName("td_0");
        console.log(rankspalten);
        for (var i = 0; i < rankspalten.length; i++) {
            rankspalten[i].textContent = newrank + i;
        }
    }

}

document.onkeydown = function (event) {
    if (event.keyCode === 13) {
        if (event.target.id === "playername") setPlayer();
    }
};