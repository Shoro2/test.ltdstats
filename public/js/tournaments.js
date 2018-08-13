var teams = [];

var counter = 0;
var player = [];
var playerGames = [];
var allPlayers = [];
var allPlayers_cache = [];


teams[0] = { teamname: "Buff Legions", name_p1: "Roshkatul", name_p2: "Rave" };
teams[1] = { teamname: "Akitos", name_p1: "Kingdanzz", name_p2: "Ashton Butcher" };
teams[2] = { teamname: "Crazydaddyducks", name_p1: "DaddyDucky", name_p2: "Crazy" };
teams[3] = { teamname: "Faith in Rescar", name_p1: "FaithOfHeaven", name_p2: "Rescar" };
teams[4] = { teamname: "JustinTime&Co", name_p1: "Vorfunker", name_p2: "Darktarant" };
teams[5] = { teamname: "PollywogPOGGERSs", name_p1: "Excite Goku", name_p2: "ichbinleise" };
teams[6] = { teamname: "Husaria", name_p1: "KaC", name_p2: "koszatek" };
teams[7] = { teamname: "World Cup Champions", name_p1: "Romawear", name_p2: "Dusty Ki" };
teams[8] = { teamname: "Otorhinolaryngologist", name_p1: "Archaikum", name_p2: "robie" };
teams[9] = { teamname: "TeamNameMatters", name_p1: "Xarku", name_p2: "Wurakls" };
teams[10] = { teamname: "lieb sein", name_p1: "SpiderDan98", name_p2: "aidsregen" };
teams[11] = { teamname: "SV Peheim", name_p1: "fynaX", name_p2: "berserker92" };
teams[12] = { teamname: "Toys for Thots", name_p1: "Foliesseer", name_p2: "Sakuragi" };
teams[13] = { teamname: "Dream Meme Team", name_p1: "paintsniffer", name_p2: "Haze_Tech" };
teams[14] = { teamname: "404 Orc not found", name_p1: "Bluejin", name_p2: "Seraphïn" };
teams[15] = { teamname: "leaking spree", name_p1: "Sonfon", name_p2: "Momentum" };
teams[16] = { teamname: "skalier mit Bier", name_p1: "Relax2905", name_p2: "Marv macht mist" };
teams[17] = { teamname: "VeroStar", name_p1: "Verotarius", name_p2: "SilentSt4r" };
teams[18] = { teamname: "unlcky_Q", name_p1: "VendettaQ", name_p2: "unlckyme" };
teams[19] = { teamname: "Schrödinger's Dino", name_p1: "HansiPansi", name_p2: "Fanti" };
teams[20] = { teamname: "i leak 4 you", name_p1: "j.cbaoth", name_p2: "Barashnukor" };
teams[21] = { teamname: "mask", name_p1: "Jeebac", name_p2: "reW" };
teams[22] = { teamname: "feelsbadman", name_p1: "EroSennin", name_p2: "Moromasa" };
teams[23] = { teamname: "e1", name_p1: "varazsloo", name_p2: "CU3" };
teams[24] = { teamname: "LTDStats.com", name_p1: "GvR Mr Mister", name_p2: "Fatestaynight" };
teams[25] = { teamname: "LowEloScrubs", name_p1: "Septimus", name_p2: "Jumperboy01" };
teams[26] = { teamname: "Blashyrkh", name_p1: "Skitsystem", name_p2: "Astrofaes" };
teams[27] = { teamname: "KeineAhnung", name_p1: "AsperiNx", name_p2: "Impulz" };
teams[28] = { teamname: "LotsOfLeak", name_p1: "iTs", name_p2: "WastedTime" };
teams[29] = { teamname: "We Wuz Kangz", name_p1: "roastie", name_p2: "Nador" };
teams[30] = { teamname: "Шуб-Ниггурат", name_p1: "Robert Mends", name_p2: "Steelrat" };
teams[31] = { teamname: "Penispiraten", name_p1: "MagicalMushroom", name_p2: "goimba" };
teams[32] = { teamname: "TeamKr4mpf", name_p1: "tepppppp", name_p2: "Invino" };
teams[33] = { teamname: "Nippelkneifer", name_p1: "TSV Fürst", name_p2: "Hajucken" };
teams[34] = { teamname: "HeadHunterZ", name_p1: "Cael", name_p2: "Reitonic" };
teams[35] = { teamname: "DNS", name_p1: "Saber", name_p2: "Technorax" };
teams[36] = { teamname: "Currywurst", name_p1: "Ranziger Roland", name_p2: "DonKanaille" };
teams[37] = { teamname: "Team Barry", name_p1: "Cryboll", name_p2: "BerryMeister" };
teams[38] = { teamname: "Politia", name_p1: "Codobelc", name_p2: "Girligator" };
teams[39] = { teamname: "ChinaNumba1", name_p1: "Big_Daddy_Dark", name_p2: "Prowess" };
teams[40] = { teamname: "Egg Fakers", name_p1: "MasterMind King", name_p2: "SgtSprinkles" };
var anzahl_teams = teams.length;

function showTeamList() {
    document.getElementById("tablewrapper").style.display = "";
    document.getElementById("bracket").style.display = "none";
    document.getElementById("selection").style.display = "none";
    document.getElementById("timer").style.display = "none";
    document.getElementById("back").style.display = "";
    document.getElementById("back").style.color = "black";
    document.getElementById("compare").style.display = "none";
}
function showBracket() {
    document.getElementById("tablewrapper").style.display = "none";
    document.getElementById("bracket").style.display = "";
    document.getElementById("selection").style.display = "none";
    document.getElementById("timer").style.display = "none";
    document.getElementsByClassName("card")[0].style.backgroundColor = "#272A33";
    document.getElementById("back").style.display = "";
    document.getElementById("back").style.color = "white";
    document.getElementById("bracket_frame").src = "https://challonge.com/MastersCup2/module";
    document.getElementById("compare").style.display = "none";
}
function showSelection() {
    document.getElementById("tablewrapper").style.display = "none";
    document.getElementById("bracket").style.display = "none";
    document.getElementById("selection").style.display = "";
    document.getElementById("timer").style.display = "";
    document.getElementsByClassName("card")[0].style.backgroundColor = "white";
    document.getElementById("back").style.display = "none";
    document.getElementById("compare").style.display = "none";
}
function showCompare() {
    document.getElementById("tablewrapper").style.display = "none";
    document.getElementById("bracket").style.display = "none";
    document.getElementById("selection").style.display = "none";
    document.getElementById("timer").style.display = "none";
    document.getElementById("back").style.display = "";
    document.getElementById("back").style.color = "black";
    document.getElementById("compare").style.display = "";
}
function showLoad() {
    document.getElementById("mitte").style.display = "inherit";
}
function hideLoad() {
    document.getElementById("mitte").style.display = "none";
}

function showTourInfo() {
    if (document.getElementById("tour_list").style.display === "") {
        document.getElementById("tour_list").style.display = "none";
        document.getElementById("tour_info").style.display = "";
        requestPlayers();

    }
    else {
        document.getElementById("tour_list").style.display = "inherit";
        document.getElementById("tour_info").style.display = "none";
    }
}
function requestPlayers() {
    if (window.localStorage.getItem("cached_players") !== null) {
        //9h
        console.log(Date.now() - JSON.parse(window.localStorage.getItem("last_sync")));
        if (Date.now() - JSON.parse(window.localStorage.getItem("last_sync")) > 32400000) {
            refreshData();
        }
        else {
            allPlayers.push(JSON.parse(window.localStorage.getItem("cached_players")));
            allPlayers = allPlayers[0];
            fillTable();
        }
    }
    else {
        refreshData();
    }

}

function refreshData() {
    teams.forEach(function (element) {
        queryTourPlayer(element.name_p1);
        queryTourPlayer(element.name_p2);
    });
}

function fillTable() {
    var myTable = document.getElementById("myladder");
    allPlayers.sort(compare);
    for (var i = 0; i < allPlayers.length; i++) {
        if (i % 2 === 0) {
            var row = myTable.insertRow(i / 2 + 1);
            var cell = [];
            cell[0] = row.insertCell(0);
            cell[0].innerHTML = allPlayers[i].teamname;
            cell[1] = row.insertCell(1);
            cell[1].innerHTML = "<a href='/profile?player=" + allPlayers[i].playername + "'>" + allPlayers[i].playername + "</a>";
            cell[2] = row.insertCell(2);
            cell[2].innerHTML = "<a href='/profile?player=" + allPlayers[i + 1].playername + "'>" + allPlayers[i + 1].playername + "</a>";
            cell[3] = row.insertCell(3);
            cell[3].innerHTML = allPlayers[i].statistics.overallElo;
            cell[4] = row.insertCell(4);
            cell[4].innerHTML = allPlayers[i + 1].statistics.overallElo;
            cell[5] = row.insertCell(5);
            cell[5].innerHTML = (allPlayers[i].statistics.overallElo + allPlayers[i + 1].statistics.overallElo) / 2;
        }
    }
    sortTable(5);
    sortTable(5);
}

function compare(a, b) {
    if (a.teamname < b.teamname)
        return -1;
    if (a.teamname > b.teamname)
        return 1;
    return 0;
}

function compareTeams() {
    var team1 = teams.filter(team => team.teamname.toUpperCase() == document.getElementById("input_t1").value.toUpperCase())[0];
    var team2 = teams.filter(team => team.teamname.toUpperCase() == document.getElementById("input_t2").value.toUpperCase())[0];
    player[0] = allPlayers.filter(player => player.playername.toUpperCase() === team1.name_p1.toUpperCase())[0];
    player[1] = allPlayers.filter(player => player.playername.toUpperCase() === team1.name_p2.toUpperCase())[0];
    player[2] = allPlayers.filter(player => player.playername.toUpperCase() === team2.name_p1.toUpperCase())[0];
    player[3] = allPlayers.filter(player => player.playername.toUpperCase() === team2.name_p2.toUpperCase())[0];
    queryPlayerOverallGames(player[0].playername, 100);
}

function calcStats() {
    
    for (var i = 0; i < 4; i++) {
        count_casual = new Array(4);
        count_normal = new Array(4);
        wins_casual = new Array(4);
        wins_normal = new Array(4);
        count_mm_picks = new Array(4);
        count_mm_wins = new Array(4);
        count_element_picks = new Array(4);
        count_element_wins = new Array(4);
        count_mech_picks = new Array(4);
        count_mech_wins = new Array(4);
        count_grove_picks = new Array(4);
        count_grove_wins = new Array(4);
        count_forsaken_picks = new Array(4);
        count_forsaken_wins = new Array(4);
        count_atlantean_picks = new Array(4);
        count_atlantean_wins = new Array(4);

        var builds = new Array(6);
        for (var e = 0; e < builds.length; e++) {
            builds[e] = new Array(60);
            for (var a = 0; a < 60; a++) {
                builds[e][a] = "";
            }
        }
        console.log(player[i]);

        player[i].allGames.forEach(function (ele) {
            switch (ele.queuetype) {
                case "Casual":
                    count_casual[i]++;
                    if (ele.gameresult == "won") wins_casual++;
                    break;
                case "Normal":
                    count_normal[i]++;
                    if (ele.gameresult == "won") wins_normal++;
                    break;
            }
            switch (ele.legion) {
                case "Mastermind":
                    count_mm_picks++;
                    if (ele.gameresult == "won") count_mm_wins++;
                    raceint = 0;
                    break;
                case "Grove":
                    count_grove_picks++;
                    if (ele.gameresult == "won") count_grove_wins++;
                    raceint = 1;
                    break;
                case "Forsaken":
                    count_forsaken_picks++;
                    if (ele.gameresult == "won") count_forsaken_wins++;
                    raceint = 2;
                    break;
                case "Element":
                    count_element_picks++;
                    if (ele.gameresult == "won") count_element_wins++;
                    raceint = 3;
                    break;
                case "Mech":
                    count_mech_picks++;
                    if (ele.gameresult == "won") count_mech_wins++;
                    raceint = 4;
                    break;
                case "Atlantean":
                    count_atlantean_picks++;
                    if (ele.gameresult == "won") count_atlantean_wins++;
                    raceint = 5;
                    break;



            }
            if (ele.unitsPerWave) {
                if (ele.unitsPerWave[0]) {
                    if (ele.unitsPerWave[0][0]) {
                        var anzahl = 0;
                        for (var k = 0; k < 60; k++) {
                            if (builds[raceint][k].includes(ele.unitsPerWave[0][0].substring(0, ele.unitsPerWave[0][0].indexOf("_unit")))) {
                                anzahl = parseInt(builds[raceint][k].substring(builds[raceint][k].indexOf(";") + 1));
                                anzahl++;
                                //console.log(element);
                                builds[raceint][k] = ele.unitsPerWave[0][0].substring(0, ele.unitsPerWave[0][0].indexOf("_unit")) + ";" + anzahl;
                            }
                        }
                        if (anzahl > 0 == false) {
                            for (var x = 0; x < 60; x++) {
                                if (builds[raceint][x] == 0) {
                                    builds[raceint][x] = ele.unitsPerWave[0][0].substring(0, ele.unitsPerWave[0][0].indexOf("_unit")) + ";1";
                                    break;
                                }
                            }
                        }
                    }
                }
            }

        });
        console.log(builds);
        for (var e = 0; e < 6; e++) {
            try {
                builds[i][e].sort(function (a, b) {
                    if (a != 0) {
                        var abstandA = a.indexOf(";") + 1;
                        var lastA = a.substring(abstandA, a.length);
                    }
                    else lastA = 0;
                    if (b != 0) {
                        var abstandB = b.indexOf(";") + 1;
                        var lastB = b.substring(abstandB, b.length);
                    }
                    else lastB = 0;
                    if (parseInt(lastA) < parseInt(lastB)) {
                        return 1;
                    } else if (parseInt(lastA) > parseInt(lastB)) {
                        return -1;
                    } else {
                        return 0;
                    }
                });
            }
            catch{}
        }
            
        
        
        console.log(builds);
    }
}


function getPlayerOverallGames(callback, playername) {
    var xhttp = new XMLHttpRequest();
    document.getElementById("mitte").style.display = "";
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var player = JSON.parse(xhttp.response);
            callback(player);
        }
    };
    xhttp.open("GET", '/api/profile/playerOverallGames?playername=' + playername, true);
    xhttp.send();
}

function queryPlayerOverallGames(playername, gameamount) {
    getPlayerOverallGames(function (result) {
        if (!result) {
            document.getElementById("apierror").style.display = "";
        }
        else {
            player[counter].allGames = result.player.filteredGamesQuery.games;
            document.getElementById("mitte").style.display = "none";
            counter++;
            if (counter < 4) queryPlayerOverallGames("" + player[counter].playername + "", 100);
            else {
                hideLoad();
                calcStats();
            }
            
        }
    }, playername);
}





function getTourPlayers(callback, pname) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            callback(JSON.parse(xhttp.response));
        }
    };
    xhttp.open("GET", '/api/tour/player?player=' + pname, true);
    xhttp.send();
}
function queryTourPlayer(pname) {
    showLoad();

    getTourPlayers(function (result) {
        result.player.statistics = JSON.parse(result.player.statistics);
        var pos = 0;
        for (var i = 0; i < teams.length; i++) {
            if (teams[i].name_p1 === pname || teams[i].name_p2 === pname) pos = i;
        }
        result.player.teamname = teams[pos].teamname;
        allPlayers.push(result.player);
        if (allPlayers.length === teams.length * 2) {
            hideLoad();
            window.localStorage.setItem("cached_players", JSON.stringify(allPlayers));
            window.localStorage.setItem("last_sync", JSON.stringify(Date.now()));
            fillTable();
        }
        return result;
    }, pname);
}