function saveTick(nummer)
{
    console.log("saveTick "+nummer);
    if (Cookies.enabled)
    {
        if(document.getElementById("checkbox"+nummer).checked==true)
        {
            Cookies.set("ladder_tickbox"+nummer, true)
        }
        else
        {
            Cookies.set("ladder_tickbox"+nummer, false)
        }
    }
}

function getTicks()
{
    if (Cookies.enabled)
    {
        if(typeof Cookies.get("ladder_tickbox0") !== 'undefined')
        {
            for(var i=0; i<document.getElementsByClassName("filter_input").length; i++)
            {
                if(Cookies.get("ladder_tickbox"+i) == 'true')
                {
                    document.getElementById("checkbox"+i).checked = true;
                }
                else
                {
                    document.getElementById("checkbox"+i).checked = false;
                }
            }
        }
        else
        {
            for(var i=0; i<document.getElementsByClassName("filter_input").length; i++)
            {
                Cookies.set("ladder_tickbox"+i, true);
                document.getElementById("checkbox"+i).checked = true;
            }
        }
        getFilters();
    }
}

function expandFilters()
{
    
    if(document.getElementById("filter-invis"))
    {
        var filter_obj = document.getElementById("filter-invis");
        filter_obj.id = "filter";
        var filter_note = document.getElementById("filter_display");
        filter_note.textContent = "Hide filters"
    }
    else
    {
        var filter_obj = document.getElementById("filter");
        filter_obj.id = "filter-invis";
        var filter_note = document.getElementById("filter_display");
        filter_note.textContent = "Show filters"
    }
}

function getFilters()
{
    var filters = document.getElementsByClassName("filter_input");
    for(var i=0; i<filters.length;i++)
    {
        if(filters[i].checked)
        {
            var filter_name = filters[i].value;
            
            var table_header = document.getElementById("th"+i);
            table_header.textContent = filter_name;
            table_header.style = "";
            var table_body = document.getElementsByClassName("td_" + i);
            for (var e = 0; e < table_body.length; e++) {
                table_body[e].style = "";
            }
        }
        else
        {
            var table_header = document.getElementById("th"+i);
            table_header.style = "display:none;";
            var table_body = document.getElementsByClassName("td_" + i);
            for (var e = 0; e < table_body.length; e++) {
                table_body[e].style = "display:none;";
            }
        }
    }
}

function selectAll()
{
    var filters = document.getElementsByClassName("filter_input");
    for(var i=0; i<filters.length;i++)
    {
        filters[i].checked=true;
        saveTick(i);
    }
    document.getElementById("selectall").textContent="Unselect all";
    document.getElementById("selectall").setAttribute("onClick", "javascript: selectNone();");
    getFilters();
}

function selectNone()
{
    var filters = document.getElementsByClassName("filter_input");
    for(var i=0; i<filters.length;i++)
    {
        filters[i].checked=false;
        saveTick(i);
    }
    document.getElementById("selectall").textContent="Select all";
    document.getElementById("selectall").setAttribute("onClick", "javascript: selectAll();");
    getFilters();
}

document.body.onload = function () {
    
    
    console.log(document.getElementById("playername").value);
    var url_string = window.location.href;
    var url = new URL(url_string);
    var playerurl = url.searchParams.get("player");
    if (playerurl !== null) {
        queryRank(playerurl);
        console.log("getrank");
    }
    else {
        queryLadder(100, 0);
        console.log("getladder");
    }
}

function getLadder(callback, limit, offset) {
    var xhttp = new XMLHttpRequest();
    document.getElementById("mitte").style = "position:relative;z - index: 2000;top: 50 %;bottom: 30 %;left: 10 %;right: 10 %;height: 40 %;width: 80 %;background - color: white;text - align: center;border - radius: 10px;opacity: 0.9;";
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var player = JSON.parse(xhttp.response);
            callback(player);
        }
    };
    xhttp.open("GET", "/sql/ladder/?limit="+limit+"&offset="+offset, true);
    xhttp.send();
}

function queryLadder(limit, offset) {
    getLadder(function (result) {
        parsePlayers(result);
        document.getElementById("mitte").style = "display:none;";
        parseRanks();
        return result;
    }, limit, offset);
}

function parsePlayers(myPlayers) {
    var players = myPlayers;
    var tabelle = document.getElementById("myladder");
    console.log(players);
    for (var i = 0; i < players.length; i++) {
        var row = tabelle.insertRow(i+1);
        var cell = [21];
        for (var e = 0; e < 21; e++) {
            cell[e] = row.insertCell(e);
            cell[e].classList.add("td_" + e);
        }
        var totalgames = players[i].games_element + players[i].games_grove + players[i].games_forsaken + players[i].games_mech + players[i].games_mastermind;
        var totalwins = players[i].wins_element + players[i].wins_grove + players[i].wins_forsaken + players[i].wins_mech + players[i].wins_mastermind;
        var winchance_element = ((players[i].wins_element / players[i].games_element) * 100).toFixed(2);
        var winchance_grove = ((players[i].wins_grove / players[i].games_grove) * 100).toFixed(2);
        var winchance_forsaken = ((players[i].wins_forsaken / players[i].games_forsaken) * 100).toFixed(2);
        var winchance_mech = ((players[i].wins_mech / players[i].games_mech) * 100).toFixed(2);
        var winchance_mastermind = ((players[i].wins_mastermind / players[i].games_mastermind) * 100).toFixed(2);
        if (winchance_element == "NaN") winchance_element = 0;
        if (winchance_grove == "NaN") winchance_grove = 0;
        if (winchance_forsaken == "NaN") winchance_forsaken = 0;
        if (winchance_mech == "NaN") winchance_mech = 0;
        if (winchance_mastermind == "NaN") winchance_mastermind = 0;
        cell[0].innerHTML = i+1;
        cell[1].innerHTML = players[i].name;
        cell[2].innerHTML = players[i].elo;
        cell[3].innerHTML = totalgames;
        cell[4].innerHTML = totalwins;
        cell[5].innerHTML = totalgames - totalwins;
        cell[6].innerHTML = players[i].games_element;
        cell[7].innerHTML = players[i].wins_element;
        cell[8].innerHTML = winchance_element+"%";
        cell[9].innerHTML = players[i].games_grove;
        cell[10].innerHTML = players[i].wins_grove;
        cell[11].innerHTML = winchance_grove + "%";
        cell[12].innerHTML = players[i].games_forsaken;
        cell[13].innerHTML = players[i].wins_forsaken;
        cell[14].innerHTML = winchance_forsaken + "%";
        cell[15].innerHTML = players[i].games_mech;
        cell[16].innerHTML = players[i].wins_mech;
        cell[17].innerHTML = winchance_mech + "%";
        cell[18].innerHTML = players[i].games_mastermind;
        cell[19].innerHTML = players[i].wins_mastermind;
        cell[20].innerHTML = winchance_mastermind + "%";

    }
    getFilters();
}

function getPlayer() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var playerurl = url.searchParams.get("player");
    if (playerurl === null) {
        window.location.href = window.location.href + "?player=" + document.getElementById("playername").value;
    }
    else {
        window.location.href = "https://test.ltdstats.com/ladder" + "?player=" + document.getElementById("playername").value;
    }

}

function sqlGetRank(callback, playername) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var rank = JSON.parse(xhttp.response);
            callback(rank);
        }
    };
    xhttp.open("GET", '/sql/rank?player=' + playername, true);
    xhttp.send();
}

function queryRank(playername) {
    sqlGetRank(function (result) {
        console.log(result);
        rank = parseInt(result[0].Rank);
        newrank = rank - 50;
        if (newrank < 0) newrank = 0;
        queryLadder(100, newrank);
        
        return rank;
    }, playername);
}

function parseRanks() {
    if (typeof newrank != 'undefined') {
        var rankspalten = document.getElementsByClassName("td_0");
        console.log(rankspalten);
        for (var i = 0; i < rankspalten.length; i++) {
            rankspalten[i].textContent = newrank + i;
        }
    }
    
}