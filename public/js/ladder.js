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


    console.log(document.getElementById("playername").value);
    var url_string = window.location.href;
    var url = new URL(url_string);
    var playerurl = url.searchParams.get("player");
    if (window.location.href.includes("overall")) {
        var type = "overallElo";
    }
    else if (window.location.href.includes("element")) {
        type = "elementElo";
    }
    else if (window.location.href.includes("grove")) {
        type = "groveElo";
    }
    else if (window.location.href.includes("forsaken")) {
        type = "forsakenElo";
    }
    else if (window.location.href.includes("mech")) {
        type = "mechElo";
    }
    else if (window.location.href.includes("mastermind")) {
        type = "mastermindElo";
    }
    else {
        type = "overallElo";
    }
    console.log(window.location.href);
    if (playerurl !== null) {
        queryRank(playerurl, type);
        console.log("getrank");
    }
    else {

        queryLadder(100, 0, type);
        console.log("getladder");
    }
};

function getLadder(callback, limit, offset, type) {
    var xhttp = new XMLHttpRequest();
    document.getElementById("mitte").style = "position:relative;z - index: 2000;top: 50 %;bottom: 30 %;left: 10 %;right: 10 %;height: 40 %;width: 80 %;background - color: white;text - align: center;border - radius: 10px;opacity: 0.9;";
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
        document.getElementById("mitte").style = "display:none;";
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
                var cell = [21];
                for (var e = 0; e < 21; e++) {
                    cell[e] = row.insertCell(e);
                    cell[e].classList.add("td_" + e);
                }
                if (players[i].statistics.elementPlayed == null || players[i].statistics.elementWins == null) {
                    if (players[i].statistics.elementPlayed == null) players[i].statistics.elementPlayed = 0;
                    players[i].statistics.elementElo = 1000;
                    players[i].statistics.elementWins = 0;
                    players[i].statistics.elementLosses = 0;
                    players[i].statistics.elementPeakElo = 1000;
                    players[i].statistics.elementPeakEloThisSeason = 1000;
                }
                if (players[i].statistics.grovePlayed == null || players[i].statistics.groveWins == null) {
                    if (players[i].statistics.grovePlayed == null) players[i].statistics.grovePlayed = 0;
                    players[i].statistics.groveElo = 1000;
                    players[i].statistics.groveWins = 0;
                    players[i].statistics.groveLosses = 0;
                    players[i].statistics.grovePeakElo = 1000;
                    players[i].statistics.grovePeakEloThisSeason = 1000;
                }
                if (players[i].statistics.forsakenPlayed == null || players[i].statistics.forsakenWins == null) {
                    if (players[i].statistics.forsakenPlayed == null) players[i].statistics.forsakenPlayed = 0;
                    players[i].statistics.forsakenElo = 1000;
                    players[i].statistics.forsakenWins = 0;
                    players[i].statistics.forsakenLosses = 0;
                    players[i].statistics.forsakenPeakElo = 1000;
                    players[i].statistics.forsakenPeakEloThisSeason = 1000;
                }
                if (players[i].statistics.mechPlayed == null || players[i].statistics.mechWins == null) {
                    if (players[i].statistics.mechPlayed == null) players[i].statistics.mechPlayed = 0;
                    players[i].statistics.mechElo = 1000;
                    players[i].statistics.mechWins = 0;
                    players[i].statistics.mechLosses = 0;
                    players[i].statistics.mechPeakElo = 1000;
                    players[i].statistics.mechPeakEloThisSeason = 1000;
                }
                if (players[i].statistics.mastermindPlayed == null || players[i].statistics.mastermindWins == null) {
                    if (players[i].statistics.mastermindPlayed == null) players[i].statistics.mastermindPlayed = 0;
                    players[i].statistics.mastermindElo = 1000;
                    players[i].statistics.mastermindWins = 0;
                    players[i].statistics.mastermindLosses = 0;
                    players[i].statistics.mastermindPeakElo = 1000;
                    players[i].statistics.mastermindPeakEloThisSeason = 1000;
                }
                if (players[i].statistics.wins == null) players[i].statistics.wins = 0;
                if (players[i].statistics.losses == null) players[i].statistics.losses = 0;
                if (players[i].statistics.quits == null) players[i].statistics.quits = 0;
                if (players[i].statistics.ties == null) players[i].statistics.ties = 0;
                var totalgames = players[i].statistics.wins + players[i].statistics.losses + players[i].statistics.quits + players[i].statistics.ties;
                console.log(totalgames);
                var totalwins = players[i].statistics.wins;
                var winchance_element = (players[i].statistics.elementWins / players[i].statistics.elementPlayed * 100).toFixed(2);
                var winchance_grove = (players[i].statistics.groveWins / players[i].statistics.grovePlayed * 100).toFixed(2);
                var winchance_forsaken = (players[i].statistics.forsakenWins / players[i].statistics.forsakenPlayed * 100).toFixed(2);
                var winchance_mech = (players[i].statistics.mechWins / players[i].statistics.mechPlayed * 100).toFixed(2);
                var winchance_mastermind = (players[i].statistics.mastermindWins / players[i].statistics.mastermindPlayed * 100).toFixed(2);
                if (winchance_element === "NaN") winchance_element = 0;
                if (winchance_grove === "NaN") winchance_grove = 0;
                if (winchance_forsaken === "NaN") winchance_forsaken = 0;
                if (winchance_mech === "NaN") winchance_mech = 0;
                if (winchance_mastermind === "NaN") winchance_mastermind = 0;
                cell[0].innerHTML = i + 1;
                cell[1].innerHTML = '<a href="/profile?player=' + players[i].playername + '">' + players[i].playername + '</a>';
                cell[2].innerHTML = players[i].statistics.overallElo;
                cell[3].innerHTML = totalgames;
                cell[4].innerHTML = totalwins;
                cell[5].innerHTML = totalgames - totalwins;
                cell[6].innerHTML = players[i].statistics.elementPlayed;
                cell[7].innerHTML = players[i].statistics.elementWins;
                cell[8].innerHTML = winchance_element;
                cell[9].innerHTML = players[i].statistics.grovePlayed;
                cell[10].innerHTML = players[i].statistics.groveWins;
                cell[11].innerHTML = winchance_grove;
                cell[12].textContent = players[i].statistics.forsakenPlayed;
                cell[13].innerHTML = players[i].statistics.forsakenWins;
                cell[14].innerHTML = winchance_forsaken;
                cell[15].innerHTML = players[i].statistics.mechPlayed;
                cell[16].innerHTML = players[i].statistics.mechWins;
                cell[17].innerHTML = winchance_mech;
                cell[18].innerHTML = players[i].statistics.mastermindPlayed;
                cell[19].innerHTML = players[i].statistics.mastermindWins;
                cell[20].innerHTML = winchance_mastermind;

            }
            break;
        case "elementElo":
            for (i = 0; i < players.length; i++) {
                players[i].statistics = JSON.parse(players[i].statistics);
                row = tabelle.insertRow(i + 1);
                cell = [21];
                for (e = 0; e < 21; e++) {
                    cell[e] = row.insertCell(e);
                    cell[e].classList.add("td_" + e);
                }

                if (players[i].statistics.wins == null) players[i].statistics.wins = 0;
                if (players[i].statistics.losses == null) players[i].statistics.losses = 0;
                if (players[i].statistics.quits == null) players[i].statistics.quits = 0;
                if (players[i].statistics.ties == null) players[i].statistics.ties = 0;
                if (players[i].statistics.elementPeakElo == null && players[i].statistics.elementPeakEloThisSeason == null) players[i].statistics.elementPeakElo = players[i].statistics.elementElo;
                if (players[i].statistics.elementPeakElo == null && players[i].statistics.elementPeakEloThisSeason !== null) players[i].statistics.elementPeakElo = players[i].statistics.elementPeakEloThisSeason;
                if (players[i].statistics.elementPeakEloThisSeason == null) players[i].statistics.elementPeakEloThisSeason = players[i].statistics.elementPeakElo;
                totalgames = players[i].statistics.wins + players[i].statistics.losses + players[i].statistics.quits + players[i].statistics.ties;
                totalwins = players[i].statistics.wins;
                winchance_element = (players[i].statistics.elementWins / players[i].statistics.elementPlayed * 100).toFixed(2);
                if (winchance_element === "NaN") winchance_element = 0;
                cell[0].innerHTML = i + 1;
                cell[1].innerHTML = '<a href="/profile?player=' + players[i].playername + '">' + players[i].playername + '</a>';
                cell[2].innerHTML = players[i].statistics.overallElo;
                cell[3].innerHTML = totalgames;
                cell[4].innerHTML = totalwins;
                cell[5].innerHTML = totalgames - totalwins;
                cell[6].innerHTML = players[i].statistics.elementPlayed;
                cell[7].innerHTML = players[i].statistics.elementWins;
                cell[8].innerHTML = winchance_element;
                cell[9].innerHTML = players[i].statistics.elementElo;
                cell[10].innerHTML = players[i].statistics.elementPeakElo;
                cell[11].innerHTML = players[i].statistics.elementPeakEloThisSeason;
            }
            break;
        case "groveElo":
            for (i = 0; i < players.length; i++) {
                players[i].statistics = JSON.parse(players[i].statistics);
                row = tabelle.insertRow(i + 1);
                cell = [21];
                for (e = 0; e < 21; e++) {
                    cell[e] = row.insertCell(e);
                    cell[e].classList.add("td_" + e);
                }

                if (players[i].statistics.wins == null) players[i].statistics.wins = 0;
                if (players[i].statistics.losses == null) players[i].statistics.losses = 0;
                if (players[i].statistics.quits == null) players[i].statistics.quits = 0;
                if (players[i].statistics.ties == null) players[i].statistics.ties = 0;
                if (players[i].statistics.grovePeakElo == null && players[i].statistics.grovePeakEloThisSeason == null) players[i].statistics.grovePeakElo = players[i].statistics.groveElo;
                if (players[i].statistics.grovePeakElo == null && players[i].statistics.grovePeakEloThisSeason !== null) players[i].statistics.grovePeakElo = players[i].statistics.grovePeakEloThisSeason;
                if (players[i].statistics.grovePeakEloThisSeason == null) players[i].statistics.grovePeakEloThisSeason = players[i].statistics.grovePeakElo;
                totalgames = players[i].statistics.wins + players[i].statistics.losses + players[i].statistics.quits + players[i].statistics.ties;
                totalwins = players[i].statistics.wins;
                winchance_grove = (players[i].statistics.groveWins / players[i].statistics.grovePlayed * 100).toFixed(2);
                if (winchance_grove === "NaN") winchance_grove = 0;
                cell[0].innerHTML = i + 1;
                cell[1].innerHTML = '<a href="/profile?player=' + players[i].playername + '">' + players[i].playername + '</a>';
                cell[2].innerHTML = players[i].statistics.overallElo;
                cell[3].innerHTML = totalgames;
                cell[4].innerHTML = totalwins;
                cell[5].innerHTML = totalgames - totalwins;
                cell[6].innerHTML = players[i].statistics.grovePlayed;
                cell[7].innerHTML = players[i].statistics.groveWins;
                cell[8].innerHTML = winchance_grove;
                cell[9].innerHTML = players[i].statistics.groveElo;
                cell[10].innerHTML = players[i].statistics.grovePeakElo;
                cell[11].innerHTML = players[i].statistics.grovePeakEloThisSeason;
            }
            break;
        case "forsakenElo":
            for (i = 0; i < players.length; i++) {
                players[i].statistics = JSON.parse(players[i].statistics);
                row = tabelle.insertRow(i + 1);
                cell = [21];
                for (e = 0; e < 21; e++) {
                    cell[e] = row.insertCell(e);
                    cell[e].classList.add("td_" + e);
                }

                if (players[i].statistics.wins == null) players[i].statistics.wins = 0;
                if (players[i].statistics.losses == null) players[i].statistics.losses = 0;
                if (players[i].statistics.quits == null) players[i].statistics.quits = 0;
                if (players[i].statistics.ties == null) players[i].statistics.ties = 0;
                if (players[i].statistics.forsakenPeakElo == null && players[i].statistics.forsakenPeakEloThisSeason == null) players[i].statistics.forsakenPeakElo = players[i].statistics.forsakenElo;
                if (players[i].statistics.forsakenPeakElo == null && players[i].statistics.forsakenPeakEloThisSeason !== null) players[i].statistics.forsakenPeakElo = players[i].statistics.forsakenPeakEloThisSeason;
                if (players[i].statistics.forsakenPeakEloThisSeason == null) players[i].statistics.forsakenPeakEloThisSeason = players[i].statistics.forsakenPeakElo;
                totalgames = players[i].statistics.wins + players[i].statistics.losses + players[i].statistics.quits + players[i].statistics.ties;
                totalwins = players[i].statistics.wins;
                winchance_forsaken = (players[i].statistics.forsakenWins / players[i].statistics.forsakenPlayed * 100).toFixed(2);
                if (winchance_forsaken === "NaN") winchance_forsaken = 0;
                cell[0].innerHTML = i + 1;
                cell[1].innerHTML = '<a href="/profile?player=' + players[i].playername + '">' + players[i].playername + '</a>';
                cell[2].innerHTML = players[i].statistics.overallElo;
                cell[3].innerHTML = totalgames;
                cell[4].innerHTML = totalwins;
                cell[5].innerHTML = totalgames - totalwins;
                cell[6].innerHTML = players[i].statistics.forsakenPlayed;
                cell[7].innerHTML = players[i].statistics.forsakenWins;
                cell[8].innerHTML = winchance_forsaken;
                cell[9].innerHTML = players[i].statistics.forsakenElo;
                cell[10].innerHTML = players[i].statistics.forsakenPeakElo;
                cell[11].innerHTML = players[i].statistics.forsakenPeakEloThisSeason;
            }
            break;
        case "mechElo":
            for (i = 0; i < players.length; i++) {
                players[i].statistics = JSON.parse(players[i].statistics);
                row = tabelle.insertRow(i + 1);
                cell = [21];
                for (e = 0; e < 21; e++) {
                    cell[e] = row.insertCell(e);
                    cell[e].classList.add("td_" + e);
                }

                if (players[i].statistics.wins == null) players[i].statistics.wins = 0;
                if (players[i].statistics.losses == null) players[i].statistics.losses = 0;
                if (players[i].statistics.quits == null) players[i].statistics.quits = 0;
                if (players[i].statistics.ties == null) players[i].statistics.ties = 0;
                if (players[i].statistics.mechPeakElo == null && players[i].statistics.mechPeakEloThisSeason == null) players[i].statistics.mechPeakElo = players[i].statistics.mechElo;
                if (players[i].statistics.mechPeakElo == null && players[i].statistics.mechPeakEloThisSeason !== null) players[i].statistics.mechPeakElo = players[i].statistics.mechPeakEloThisSeason;
                if (players[i].statistics.mechPeakEloThisSeason == null) players[i].statistics.mechPeakEloThisSeason = players[i].statistics.mechPeakElo;
                totalgames = players[i].statistics.wins + players[i].statistics.losses + players[i].statistics.quits + players[i].statistics.ties;
                totalwins = players[i].statistics.wins;
                winchance_mech = (players[i].statistics.mechWins / players[i].statistics.mechPlayed * 100).toFixed(2);
                if (winchance_mech === "NaN") winchance_mech = 0;
                cell[0].innerHTML = i + 1;
                cell[1].innerHTML = '<a href="/profile?player=' + players[i].playername + '">' + players[i].playername + '</a>';
                cell[2].innerHTML = players[i].statistics.overallElo;
                cell[3].innerHTML = totalgames;
                cell[4].innerHTML = totalwins;
                cell[5].innerHTML = totalgames - totalwins;
                cell[6].innerHTML = players[i].statistics.mechPlayed;
                cell[7].innerHTML = players[i].statistics.mechWins;
                cell[8].innerHTML = winchance_mech;
                cell[9].innerHTML = players[i].statistics.mechElo;
                cell[10].innerHTML = players[i].statistics.mechPeakElo;
                cell[11].innerHTML = players[i].statistics.mechPeakEloThisSeason;
            }
            break;
        case "mastermindElo":
            for (i = 0; i < players.length; i++) {
                players[i].statistics = JSON.parse(players[i].statistics);
                row = tabelle.insertRow(i + 1);
                cell = [21];
                for (e = 0; e < 21; e++) {
                    cell[e] = row.insertCell(e);
                    cell[e].classList.add("td_" + e);
                }

                if (players[i].statistics.wins == null) players[i].statistics.wins = 0;
                if (players[i].statistics.losses == null) players[i].statistics.losses = 0;
                if (players[i].statistics.quits == null) players[i].statistics.quits = 0;
                if (players[i].statistics.ties == null) players[i].statistics.ties = 0;
                if (players[i].statistics.mastermindPeakElo == null && players[i].statistics.mastermindPeakEloThisSeason == null) players[i].statistics.mastermindPeakElo = players[i].statistics.mastermindElo;
                if (players[i].statistics.mastermindPeakElo == null && players[i].statistics.mastermindPeakEloThisSeason !== null) players[i].statistics.mastermindPeakElo = players[i].statistics.mastermindPeakEloThisSeason;
                if (players[i].statistics.mastermindPeakEloThisSeason == null) players[i].statistics.mastermindPeakEloThisSeason = players[i].statistics.mastermindPeakElo;
                totalgames = players[i].statistics.wins + players[i].statistics.losses + players[i].statistics.quits + players[i].statistics.ties;
                totalwins = players[i].statistics.wins;
                winchance_mastermind = (players[i].statistics.mastermindWins / players[i].statistics.mastermindPlayed * 100).toFixed(2);
                if (winchance_mastermind === "NaN") winchance_mastermind = 0;
                cell[0].innerHTML = i + 1;
                cell[1].innerHTML = '<a href="/profile?player=' + players[i].playername + '">' + players[i].playername + '</a>';
                cell[2].innerHTML = players[i].statistics.overallElo;
                cell[3].innerHTML = totalgames;
                cell[4].innerHTML = totalwins;
                cell[5].innerHTML = totalgames - totalwins;
                cell[6].innerHTML = players[i].statistics.mastermindPlayed;
                cell[7].innerHTML = players[i].statistics.mastermindWins;
                cell[8].innerHTML = winchance_mastermind;
                cell[9].innerHTML = players[i].statistics.mastermindElo;
                cell[10].innerHTML = players[i].statistics.mastermindPeakElo;
                cell[11].innerHTML = players[i].statistics.mastermindPeakEloThisSeason;
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