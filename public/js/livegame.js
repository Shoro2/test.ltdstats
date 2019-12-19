//globals
var selectedPlayerName = "";
var duoWest = false, duoEast = false;
var winsFive = [], roles = [], count_highpush = [], count_lowpush = [], count_samepush = [], count_leaked = [], count_held = [];

function checkContent() {
    var requested_players = 0;
    allPlayers = [];
    document.getElementById("mitte").style.display = "";
    if (document.getElementById("playername").value.length > 0) {
        queryLivegame(document.getElementById("playername").value);
    }
    else {
        queryLivegame(document.getElementById("playername2").value);
    }
    document.getElementById("indermitte").style.display = "none";
}

function getPlayer() {
    if (document.getElementById("playername").value.length > 0) {
        window.history.pushState('livegame', 'Livegame', '?playername=' + document.getElementById("playername").value);
    }
    else if (document.getElementById("playername2").value.length > 0) {
        window.history.pushState('livegame', 'Livegame', '?playername=' + document.getElementById("playername2").value);
    }
    checkContent();


}

function checkLink() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var playerurl = url.searchParams.get("playername");
    // request per url
    if (playerurl !== null) {
        document.getElementById("playername").value = playerurl;
        checkContent();
    }
}

function parsePlayers() {
    document.getElementById("mitte").style.display = "none";
    parsedPlayer = [];
    for (var i = 0; i < 4; i++) {
        //parsedPlayer[i] = allPlayers.filter(filteredPlayer => filteredPlayer.playername == livegame.players[i])[0];
        parsedPlayer[i] = allPlayers.filter(function (filteredPlayer) { return filteredPlayer.playername === livegame.players[i]; })[0];
        if (parsedPlayer[i] === undefined) {
            parsedPlayer[i] = allPlayers.filter(function (filteredPlayer) { return filteredPlayer.playername === "Bot (player not found)"; })[0];
        }
        //console.log(parsedPlayer[i]);
    }
    var score_worker = [0, 0, 0, 0], score_value = [0, 0, 0, 0], game_count = [0, 0, 0, 0];
    for (i = 0; i < 4; i++) {
        document.getElementById("name" + (i + 1)).innerHTML = "<b onclick='showPlayerDetails(" + i + ");'>" + parsedPlayer[i].playername + "</b>";
        document.getElementById("elo" + (i + 1)).innerHTML = parsedPlayer[i].statistics.overallElo + " (" + parsedPlayer[i].statistics.overallPeakEloThisSeason + ")";
        //document.getElementById("name" + (i + 1)).innerHTML = parsedPlayer[i].playername;

        player_totalgames = parsedPlayer[i].statistics.gamesPlayed;
        player_totalwins = parsedPlayer[i].statistics.wins;
        player_totalwinchance = ((player_totalwins / player_totalgames) * 100).toFixed(2);
        if (isNaN(player_totalwinchance)) player_totalwinchance = 0;
        player_ties = parsedPlayer[i].statistics.ties;
        if (typeof parsedPlayer[i].statistics.ties == 'undefined') player_ties = 0;
        player_quits = parsedPlayer[i].statistics.quits;
        if (typeof parsedPlayer[i].statistics.quits == 'undefined') player_quits = 0;
        player_overall_elo = parsedPlayer[i].statistics.overallElo;
        //console.log(parsedPlayer[i].statistics.overallPeakElo);
        if (typeof parsedPlayer[i].statistics.overallPeakElo == 'undefined') player_overall_peakelo = parsedPlayer[i].statistics.overallPeakEloThisSeason;
        else player_overall_peakelo = parsedPlayer[i].statistics.overallPeakElo;
        player_overall_xp = parsedPlayer[i].statistics.totalXp
        player_overall_level = getPlayerLevel(player_overall_xp);
        player_winningstreak = parsedPlayer[i].statistics.winStreak;

        if (player_winningstreak > 5) document.getElementById("player" + (i+1)).style.boxShadow = "rgba(255,0,0, .5) 0px 0px 10px 10px";

        var favunit = [];
        var leaks = [];
        
        for (var x = 0; x < 60; x++) {
            favunit[x] = 0;
            if (x < 22) leaks[x] = 0;
        }
        var games_count = 0, leakedOne = 0, sendedOne = 0;
        document.getElementById("favstart" + (i + 1)).innerHTML = "Favorite Starts (last 50 games):";
        if (parsedPlayer[i].games.count > 0) {
            console.log(parsedPlayer[i]);
            parsedPlayer[i].games.games.forEach(function (ele) {
                game_count[i]++;
                var gameDetail = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.playername == parsedPlayer[i].playername; })[0];
                var gameDetail_position = 0;
                if (gameDetail) {
                    games_count++;
                    gameDetail_position = gameDetail.position;
                    //compare workers
                    var gameDetailSelected = [];
                    switch (gameDetail_position) {
                        case 1:
                            gameDetailSelected[0] = gameDetail;
                            gameDetailSelected[1] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 2; })[0];
                            gameDetailSelected[2] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 5; })[0];
                            gameDetailSelected[3] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 6; })[0];
                            break;
                        case 2:
                            gameDetailSelected[0] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 1; })[0];
                            gameDetailSelected[1] = gameDetail;
                            gameDetailSelected[2] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 5; })[0];
                            gameDetailSelected[3] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 6; })[0];
                            break;
                        case 5:
                            gameDetailSelected[0] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 1; })[0];
                            gameDetailSelected[1] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 2; })[0];
                            gameDetailSelected[2] = gameDetail;
                            gameDetailSelected[3] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 6; })[0];
                            break;
                        case 6:
                            gameDetailSelected[0] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 1; })[0];
                            gameDetailSelected[1] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 2; })[0];
                            gameDetailSelected[2] = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === 5; })[0];
                            gameDetailSelected[3] = gameDetail;
                            break;
                        default:
                            console.log("failed to read " + gameDetail_position);
                            break;
                    }
                    //WORKERS

                    var workersPerWave = [];
                    for (var e = 0; e < 4; e++) {
                        workersPerWave[e] = [];
                    }
                    for (e = 0; e < 4; e++) {
                        gameDetailSelected[e].workersPerWave.forEach(function (wpw) {
                            workersPerWave[e].push(wpw);
                        });
                    }
                    console.log(workersPerWave);
                    for (var q = 0; q < workersPerWave[0].length; q++) {
                        switch (gameDetail_position) {
                            case 1:
                                if (workersPerWave[0][q] > workersPerWave[1][q]) score_worker[i]++;
                                else if (workersPerWave[0][q] < workersPerWave[1][q]) score_worker[i]--;
                                if (workersPerWave[0][q] > workersPerWave[2][q]) score_worker[i]++;
                                else if (workersPerWave[0][q] < workersPerWave[2][q]) score_worker[i]--;
                                if (workersPerWave[0][q] > workersPerWave[3][q]) score_worker[i]++;
                                else if (workersPerWave[0][q] < workersPerWave[3][q]) score_worker[i]--;
                                    break;
                            case 2:
                                if (workersPerWave[1][q] > workersPerWave[0][q]) score_worker[i]++;
                                else if (workersPerWave[1][q] < workersPerWave[0][q]) score_worker[i]--;
                                if (workersPerWave[1][q] > workersPerWave[2][q]) score_worker[i]++;
                                else if (workersPerWave[1][q] < workersPerWave[2][q]) score_worker[i]--;
                                if (workersPerWave[1][q] > workersPerWave[3][q]) score_worker[i]++;
                                else if (workersPerWave[1][q] < workersPerWave[3][q]) score_worker[i]--;
                                break;
                            case 5:
                                if (workersPerWave[2][q] > workersPerWave[1][q]) score_worker[i]++;
                                else if (workersPerWave[2][q] < workersPerWave[1][q]) score_worker[i]--;
                                if (workersPerWave[2][q] > workersPerWave[0][q]) score_worker[i]++;
                                else if (workersPerWave[2][q] < workersPerWave[0][q]) score_worker[i]--;
                                if (workersPerWave[2][q] > workersPerWave[3][q]) score_worker[i]++;
                                else if (workersPerWave[2][q] < workersPerWave[3][q]) score_worker[i]--;
                                break;
                            case 6:
                                if (workersPerWave[3][q] > workersPerWave[1][q]) score_worker[i]++;
                                else if (workersPerWave[3][q] < workersPerWave[1][q]) score_worker[i]--;
                                if (workersPerWave[3][q] > workersPerWave[2][q]) score_worker[i]++;
                                else if (workersPerWave[3][q] < workersPerWave[2][q]) score_worker[i]--;
                                if (workersPerWave[3][q] > workersPerWave[0][q]) score_worker[i]++;
                                else if (workersPerWave[3][q] < workersPerWave[0][q]) score_worker[i]--;
                                break;
                            default:
                                console.log("failed to read " + gameDetail_position);
                                break;
                        }

                    }
                    //console.log(workersPerWave);
                    score_worker[i] = score_worker[i] / workersPerWave[0].length;


                    //VALUE
                    var valuePerWave = [];
                    for (var e = 0; e < 4; e++) {
                        valuePerWave[e] = [];
                    }
                    var valuec;
                    for (e = 0; e < 4; e++) {
                        //console.log(gameDetailSelected[e].unitsPerWave);
                        gameDetailSelected[e].unitsPerWave.forEach(function (ele) {
                            valuec = 0;
                            ele.forEach(function (ele2) {
                                var unitname = ele2.substring(0, ele2.indexOf("_unit"));
                                while (unitname.includes("_")) {
                                    unitname = unitname.replace("_", "");
                                }
                                if (unitstats.filter(meinName => meinName.name === unitname)[0] === undefined) console.log("failed to look up " + unitname + "'s value");
                                else valuec += parseInt(unitstats.filter(meinName => meinName.name === unitname)[0].value);
                            });
                            valuePerWave[e].push(valuec);
                        });
                    }
                    console.log(valuePerWave);
                    for (q = 0; q < valuePerWave[0].length; q++) {
                        switch (gameDetail_position) {
                            case 1:
                                if (valuePerWave[0][q] > valuePerWave[1][q]) score_value[i]++;
                                else if (valuePerWave[0][q] < valuePerWave[1][q]) score_value[i]--;
                                if (valuePerWave[0][q] > valuePerWave[2][q]) score_value[i]++;
                                else if (valuePerWave[0][q] < valuePerWave[2][q]) score_value[i]--;
                                if (valuePerWave[0][q] > valuePerWave[3][q]) score_value[i]++;
                                else if (valuePerWave[0][q] < valuePerWave[3][q]) score_value[i]--;
                                break;
                            case 2:
                                if (valuePerWave[1][q] > valuePerWave[0][q]) score_value[i]++;
                                else if (valuePerWave[1][q] < valuePerWave[0][q]) score_value[i]--;
                                if (valuePerWave[1][q] > valuePerWave[2][q]) score_value[i]++;
                                else if (valuePerWave[1][q] < valuePerWave[2][q]) score_value[i]--;
                                if (valuePerWave[1][q] > valuePerWave[3][q]) score_value[i]++;
                                else if (valuePerWave[1][q] < valuePerWave[3][q]) score_value[i]--;
                                break;
                            case 5:
                                if (valuePerWave[2][q] > valuePerWave[1][q]) score_value[i]++;
                                else if (valuePerWave[2][q] < valuePerWave[1][q]) score_value[i]--;
                                if (valuePerWave[2][q] > valuePerWave[0][q]) score_value[i]++;
                                else if (valuePerWave[2][q] < valuePerWave[0][q]) score_value[i]--;
                                if (valuePerWave[2][q] > valuePerWave[3][q]) score_value[i]++;
                                else if (valuePerWave[2][q] < valuePerWave[3][q]) score_value[i]--;
                                break;
                            case 6:
                                if (valuePerWave[3][q] > valuePerWave[1][q]) score_value[i]++;
                                else if (valuePerWave[3][q] < valuePerWave[1][q]) score_value[i]--;
                                if (valuePerWave[3][q] > valuePerWave[2][q]) score_value[i]++;
                                else if (valuePerWave[3][q] < valuePerWave[2][q]) score_value[i]--;
                                if (valuePerWave[3][q] > valuePerWave[0][q]) score_value[i]++;
                                else if (valuePerWave[3][q] < valuePerWave[0][q]) score_value[i]--;
                                break;
                        }
                    }
                    score_value[i] = score_value[i] / valuePerWave[0].length;
                    //console.log(valuePerWave);


                    var currunit = "", lastunit = "";
                    if (gameDetail.unitsPerWave !== null) {
                        gameDetail.unitsPerWave[0].forEach(function (element) {
                            //e=wave ;x=different units
                            currunit = element.substring(0, element.indexOf("_unit"));
                            if (currunit != lastunit) {
                                var anzahl = 0;
                                for (var x = 0; x < 60; x++) {
                                    if (favunit[x] != 0) {
                                        //unit matching?
                                        if (favunit[x].includes(element.substring(0, element.indexOf("_unit")))) {
                                            anzahl = parseInt(favunit[x].substring(favunit[x].indexOf(";") + 1));
                                            //console.log(favunit[x].substring(favunit[x].indexOf(";") + 1));
                                            anzahl++;
                                            //console.log(element);
                                            favunit[x] = element.substring(0, element.indexOf("_unit")) + ";" + anzahl;
                                        }
                                    }
                                }
                                //no match, add it
                                if (anzahl === 0) {
                                    for (x = 0; x < 60; x++) {
                                        if (favunit[x] == 0) {
                                            favunit[x] = element.substring(0, element.indexOf("_unit")) + ";1";
                                            break;
                                        }
                                    }
                                }
                            }
                            lastunit = currunit;
                        });
                    }
                    //if (gameDetail.mercsSentPerWave[0].length > 0) sendedOne++;
                    if (gameDetail.mercsReceivedPerWave[0].length > 0 && gameDetail.leaksPerWave[0].length > 0) leakedOne++;
                }
                //check if player sent on 1
                var counterp = 0;
                if (gameDetail_position === 1) counterp = 5;
                else if (gameDetail_position === 2) counterp = 6;
                else if (gameDetail_position === 5) counterp = 2;
                else if (gameDetail_position === 6) counterp = 1;
                gameDetail = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.position === counterp; })[0];
                if (gameDetail.mercsReceivedPerWave[0].length > 0) sendedOne++;
            });
            let sendChanceOne = 0, leakChanceOne = 0;
            if (sendedOne > 0) sendChanceOne = (sendedOne / games_count * 100).toFixed(0);
            if (leakedOne > 0) leakChanceOne = (leakedOne / games_count * 100).toFixed(0);
            document.getElementById("best_legion" + (i + 1)).innerHTML = "Chance to send 1: " + sendChanceOne + "%, Chance to leak 1: " + leakChanceOne + "%";
        }
        else {
            console.log("player " + i + " has no games played");
            document.getElementById("favstart" + (i + 1)).innerHTML = "No recorded games available.";
        }
        favunit.sort(function (a, b) {
            if (a !== 0) {
                var abstandA = a.indexOf(";") + 1;
                var lastA = a.substring(abstandA, a.length);
            }
            else lastA = 0;
            if (b !== 0) {
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
        //check leaks with favunits 0-2
        var gamesWithFav_count = 0;
        if (parsedPlayer[i].games === null) {
            parsedPlayer[i].games.games.forEach(function (ele) {
                var gamesWithFav_bool = false;
                var gameDetail = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.playername == parsedPlayer[i].playername })[0];
                if (gameDetail) {
                    for (var x = 0; x < gameDetail.leaksPerWave.length; x++) {
                        //console.log(gameDetail.leaksPerWave[x]);
                        var leaked = false;
                        gameDetail.unitsPerWave[x].forEach(function (element) {
                            //console.log(favunit);
                            try {
                                favunit.forEach(function (favele) {
                                    if (favele != 0) {
                                        if (favele.substring(0, favele.indexOf(";")) == element.substring(0, element.indexOf("_unit"))) {
                                            gamesWithFav_bool = true;
                                        }
                                    }
                                });
                            }
                            catch (error) {
                                console.log(error);
                            }
                        });
                    }
                    if (gamesWithFav_bool) {
                        gamesWithFav_count++;
                    }

                }

            });
        }

        document.getElementById("leaks" + (i + 1)).innerHTML = document.getElementById("leaks" + (i + 1)).innerHTML.substring(0, document.getElementById("leaks" + (i + 1)).innerHTML.length - 2);

        //console.log(favunit);
        //console.log(favunit);
        for (var x = 0; x < favunit.length; x++) {
            if (favunit[x] != 0) {
                try {
                    var unit = favunit[x].substring(0, favunit[x].indexOf(";"));
                    var count = favunit[x].substring(favunit[x].indexOf(";") + 1);
                    var chance = ((count / games_count) * 100).toFixed(2);
                    var url = "";
                    url = "/img/icons/" + unit.charAt(0).toUpperCase() + unit.substring(1);
                    while (url.includes("_")) {
                        var index = url.indexOf("_");
                        url = url.substring(0, index) + url.charAt(index + 1).toUpperCase() + url.substring(index + 2);
                        url.replace("_", "");
                    }
                    var unit_type = url.substring(url.lastIndexOf("/") + 1);
                    switch (url) {
                        case "/img/icons/Aps":
                            url = "/img/icons/APS";
                            break;
                        case "/img/icons/Mps":
                            url = "/img/icons/MPS";
                    }
                    url += ".png";
                    //console.log(unit, count);
                    //console.log(parsedPlayer[i].playername);

                    document.getElementById("favstart" + (i + 1)).innerHTML += "<div class='favunits_div' id='favstart_li" + (i + 1) + x + "' onclick='getFighterGames(\"" + unit + "\",\"" + parsedPlayer[i].playername + "\")'><img class='unitimg' src=" + url + ">" + unit_type + "(" + chance + "%)</div>";
                    //document.getElementById("unitselector"+i).options[x] = new Option(unit_type,unit_type);
                }
                catch (error) {
                    console.log(error);
                }
            }

        }
        //console.log(favunit);
    }

    var friends = [];
    for (i = 0; i < 4; i++) {
        friends[i] = [];
    }

    //check for duo synergy
    try {
        for (i = 0; i < 4; i++) {
            if (parsedPlayer[i].bestFriends !== undefined) {
                //console.log(parsedPlayer[i].bestFriends);
                for (var e = 0; e < parsedPlayer[i].bestFriends.length; e++) {
                    //console.log(parsedPlayer[i].bestFriends[e]);
                    friends[i][e] = parsedPlayer[i].bestFriends[e].player.playername;
                }
            }
        }
    }
    catch (err) {
        console.log(err);
    }

    var meinCounter = 0;
    friends.forEach(function (ele) {
        //console.log(ele);
        if ((meinCounter === 0 || meinCounter === 1) && (ele.includes(parsedPlayer[0].playername) || ele.includes(parsedPlayer[1].playername))) {
            //west duo
            duoWest = true;
        }
        if ((meinCounter === 2 || meinCounter === 3) && (ele.includes(parsedPlayer[2].playername) || ele.includes(parsedPlayer[3].playername))) {
            //west duo
            duoEast = true;
        }
        meinCounter++;
    });
    if (duoWest) {
        document.getElementById("name1").innerHTML += " (friends)";
        document.getElementById("name2").innerHTML += " (friends)";
    }
    if (duoEast) {
        document.getElementById("name3").innerHTML += " (friends)";
        document.getElementById("name4").innerHTML += " (friends)";
    }
    //console.log(duoWest + ", " + duoEast);
    //add win/loses indicator
    try {
        for (i = 0; i < parsedPlayer.length; i++) {
            winsFive[i] = 5;
            document.getElementById("name" + (i + 1)).innerHTML += " <div class='gameresults' id='gameresult" + (i + 1) + "'></div>";
            for (e = 0; e < 5; e++) {
                if (parsedPlayer[i].games.games.length < 5 && e === 0) e = 5 - games.games.length;
                if (parsedPlayer[i].games.games[e] !== undefined) {
                    var gameDetail = parsedPlayer[i].games.games[e].gameDetails.filter(function (gameDetail) { return gameDetail.playername === parsedPlayer[i].playername; })[0];
                    if (gameDetail.gameresult === "won") document.getElementById("gameresult" + (i + 1)).innerHTML += "W";
                    else if (gameDetail.gameresult === "tied") document.getElementById("gameresult" + (i + 1)).innerHTML += "T";
                    else {
                        document.getElementById("gameresult" + (i + 1)).innerHTML += "L";
                        winsFive[i]--;
                    }
                    if (e < 4) document.getElementById("gameresult" + (i + 1)).innerHTML += "/";
                }

            }

        }
    }
    catch (err) {
        console.log(err);
    }

    var player_roles_worker = ["", "", "", ""];
    var player_roles_value = ["", "", "", ""];
    for (var xy = 0; xy < 4; xy++) {
        //worker
        score_worker[xy] = score_worker[xy] / game_count[xy];
        if (score_worker[xy] < 0.01 && score_worker[xy] > -0.01) player_roles_worker[xy] = "Even Worker";
        else if (score_worker[xy] > 0.05) player_roles_worker[xy] = "Very High Worker";
        else if (score_worker[xy] < -0.05) player_roles_worker[xy] = "Very Low Worker";
        else if (score_worker[xy] < -0.01 && score_worker[xy] > -0.05) player_roles_worker[xy] = "Low Worker";
        else if (score_worker[xy] < 0.05 && score_worker[xy] > 0.01) player_roles_worker[xy] = "High Worker";
        document.getElementById("name" + (xy + 1)).innerHTML += " (" + player_roles_worker[xy];
        //value
        score_value[xy] = score_value[xy] / game_count[xy];
        if (score_value[xy] < 0.01 && score_value[xy] > -0.01) player_roles_value[xy] = "Even Value";
        else if (score_value[xy] > 0.05) player_roles_value[xy] = "Very High Value";
        else if (score_value[xy] < -0.05) player_roles_value[xy] = "Very Low Value";
        else if (score_value[xy] < -0.01 && score_value[xy] > -0.05) player_roles_value[xy] = "Low Value";
        else if (score_value[xy] < 0.05 && score_value[xy] > 0.01) player_roles_value[xy] = "High Value";
        document.getElementById("name" + (xy + 1)).innerHTML += ", " + player_roles_value[xy] + ")";
        

    }
    console.log(game_count);
    console.log(score_worker);
    console.log(score_value);


    getWinchance();
}

function getPlayerLevel(totalXp) {
    if (totalXp < 1) return 1;
    if (totalXp < 1001) return 2;
    if (totalXp < 3001) return 3;
    if (totalXp < 7001) return 4;
    if (totalXp < 13001) return 5;
    if (totalXp < 21001) return 6;
    if (totalXp < 31001) return 7;
    if (totalXp < 43001) return 8;
    if (totalXp < 57001) return 9;
    if (totalXp < 73001) return 10;
    if (totalXp < 91001) return 11;
    if (totalXp < 111001) return 12;
    if (totalXp < 133001) return 13;
    if (totalXp < 157001) return 14;
    if (totalXp < 183001) return 15;
    if (totalXp < 211001) return 16;
    if (totalXp < 241001) return 17;
    if (totalXp < 273001) return 18;
    if (totalXp < 307001) return 19;
    if (totalXp < 343001) return 20;
    if (totalXp < 381001) return 21;
    if (totalXp < 421001) return 22;
    if (totalXp < 463001) return 23;
    if (totalXp < 507000) return 24;
    if (totalXp < 553001) return 25;
    if (totalXp < 601001) return 26;
    if (totalXp < 651001) return 27;
    if (totalXp < 703001) return 28;
    if (totalXp < 757001) return 29;
    if (totalXp < 813001) return 30;
    if (totalXp < 871001) return 31;
    if (totalXp < 931001) return 32;
    if (totalXp < 993001) return 33;
    if (totalXp < 1057001) return 34;
    return 35;
}
// todo: click first
function getFighterGames(fightername, playername) {
    var leaks = [];
    for (var i = 0; i < 22; i++) {
        leaks[i] = 0;
    }
    var fightercount_pick = 0;
    //console.log(parsedPlayer);
    var selectedPlayer = parsedPlayer.filter(function (filterGames) { return filterGames.playername == playername })[0];
    var selectedGames = selectedPlayer.games.games;
    selectedGames.forEach(function (ele) {
        gameDetail = ele['gameDetails'].filter(function (gameDetail) { return gameDetail.playername == playername })[0];
        if (typeof gameDetail !== "undefined") {
            if (typeof gameDetail.unitsPerWave[0] !== "undefined") {
                //check units on 1
                //more than 1 unit
                if (gameDetail.unitsPerWave[0].length > 1) {
                    //for each unit built on 1
                    for (var i = 0; i < gameDetail.unitsPerWave[0].length; i++) {
                        //unit matching?
                        if (gameDetail.unitsPerWave[0][i].includes(fightername)) {
                            fightercount_pick++;
                            if (gameDetail.leaksPerWave.length > 0) {
                                for (var i = 0; i < gameDetail.leaksPerWave.length; i++) {
                                    if (gameDetail.leaksPerWave[i].length > 0) {
                                        var target_pos;
                                        switch (gameDetail.position) {
                                            case 1:
                                                target_pos = 6;
                                                break;
                                            case 2:
                                                target_pos = 5;
                                                break;
                                            case 3:
                                                target_pos = 1;
                                                break;
                                            case 4:
                                                target_pos = 2;
                                                break;
                                        }
                                        var gameDetail_oponent = ele['gameDetails'].filter(function (gameDetail_oponent) { return gameDetail_oponent.position == target_pos })[0];
                                        leaks[i]++;
                                    }
                                }
                            }
                            break; //?
                        }
                    }
                }
                //1 unit only
                else {
                    if (gameDetail.unitsPerWave[0].length > 0) {
                        if (gameDetail.unitsPerWave[0][0].includes(fightername)) {
                            fightercount_pick++;
                            if (gameDetail.leaksPerWave.length > 0) {
                                for (var i = 0; i < gameDetail.leaksPerWave.length; i++) {
                                    if (gameDetail.leaksPerWave[i].length > 0) {
                                        var target_pos;
                                        switch (gameDetail.position) {
                                            case 1:
                                                target_pos = 6;
                                                break;
                                            case 2:
                                                target_pos = 5;
                                                break;
                                            case 3:
                                                target_pos = 1;
                                                break;
                                            case 4:
                                                target_pos = 2;
                                                break;
                                        }
                                        //var gameDetail_oponent = ele['gameDetails'].filter(function (gameDetail_oponent) { return gameDetail_oponent.position == target_pos })[0];
                                        leaks[i]++;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    var spot = 0;
    for (var i = 0; i < 4; i++) {
        if (parsedPlayer[i].playername == playername) {
            spot = i + 1;
        }
    }

    document.getElementById("leaks" + spot).innerHTML = "Leaks: ";
    for (var i = 0; i < leaks.length; i++) {
        if (leaks[i] > 0) {
            var chance = ((leaks[i] / fightercount_pick) * 100).toFixed(2);
            if (chance > 20) {
                document.getElementById("leaks" + spot).innerHTML += i + 1 + " (" + (leaks[i] / fightercount_pick * 100).toFixed(0) + "%), ";
            }
        }
    }
    document.getElementById("leaks" + spot).innerHTML = document.getElementById("leaks" + spot).innerHTML.substring(0, document.getElementById("leaks" + spot).innerHTML.length - 2);
}



function getWinchance() {
    var elos = [];
    var peakElos = [];
    var bonus_w = 0; bonus_e = 0;
    for (var i = 0; i < parsedPlayer.length; i++) {
        //console.log(parsedPlayer[i]);
        if (parsedPlayer[i].statistics.overallElo !== undefined) elos.push(parsedPlayer[i].statistics.overallElo);
        else elos.push(1000);
        if (parsedPlayer[i].statistics.overallPeakEloThisSeason !== undefined) peakElos.push(parsedPlayer[i].statistics.overallPeakEloThisSeason);
        else peakElos.push(1000);
        if (parsedPlayer[i].statistics.winStreak > 5 && i < 3) bonus_w += 5;
        else if (parsedPlayer[i].statistics.winStreak > 5 && i > 2) bonus_e += 5;
    }
    var elo_west = parseFloat((elos[0] * 0, 5 + elos[1] * 0, 5 + peakElos[0] * 1 + peakElos[1] * 1) / 4);
    var elo_east = parseFloat((elos[2] * 0, 5 + elos[3] * 0, 5 + peakElos[2] * 1 + peakElos[3] * 1) / 4);
    var winchance = 50 * (elo_west / elo_east);
    for (i = 0; i < 4; i++) {
        if (i < 3) winchance += winsFive[i];
        else winchance -= winsFive[i];
    }
    winchance = winchance + bonus_w - bonus_e;
    if (winchance < 0 || winchance > 100) winchance = 50;
    if (duoWest) winchance = winchance + 5;
    if (duoEast) winchance = winchance - 5;
    var elem = document.getElementById("myBar");
    var elem2 = document.getElementById("myBar2");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
        if (width >= winchance || width > 100) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + '%';
            elem.innerHTML = "West: " + width * 1 + '%';
            elem2.style.width = (100 - width) + '%';
            elem2.innerHTML = "East: " + (100 - width * 1) + '%';
        }
    }
    document.getElementById("winchancebar").style.display = "";

}

document.onkeydown = function (event) {
    if (event.keyCode === 13) {
        if (event.target.id === "playername" || event.target.id === "playername2") getPlayer();
    }
};

function showPlayerDetails(nummer) {
    const details_box = document.getElementById("player_details_box");
    const details_content = document.getElementById("playername_details");
    details_box.style.display = "";
    parsedPlayer = [];
    for (var i = 0; i < 4; i++) {
        parsedPlayer[i] = allPlayers.filter(function (filteredPlayer) { return filteredPlayer.playername == livegame.players[i] })[0];
    }
    details_content.innerHTML += "<h3>" + parsedPlayer[nummer].playername + "' Season 4 Stats (<a href='/profile?player=" + parsedPlayer[nummer].playername + "' target='_blank'>Profile</a>)</h3>";
    selectedPlayerName = parsedPlayer[nummer].playername;
    queryPlayerGames(selectedPlayerName);
}

function hidePlayerDetails() {
    document.getElementById("player_details_box").style.display = "none";
    document.getElementById("playername_details").innerHTML = "";
}

function showLivegame(name) {
    document.getElementById("playername").value = name;
    document.getElementById("playername2").value = name;
    window.history.pushState('livegame', 'Livegame', '?playername=' + document.getElementById("playername2").value);
    checkContent();
}

function listGames(livegames) {
    var classiccontainer = document.getElementById("classicgames");
    var normalcontainer = document.getElementById("normalgames");
    if (livegames) {
        var counter_r = 0, counter_c = 0;
        for (var i = livegames.length - 1; i > 0; i--) {
            var currgame = livegames[i];
            var time1 = new Date(currgame.ts);
            var time2 = new Date();
            var timediff = time2 - time1;
            var minutes = (timediff / 1000 / 60).toFixed(0);
            var seconds = (timediff / 1000 % 60).toFixed(0);
            var minutes_str = "", seconds_str = "";
            if (minutes.toString().length < 2) minutes_str = "0" + minutes;
            else minutes_str = minutes.toString();
            if (seconds.toString().length < 2) seconds_str = "0" + minutes;
            else seconds_str = seconds.toString();
            //console.log(currgame);
            if (currgame.gametype === "classic") {
                classiccontainer.innerHTML += "<div class='game_row_4v4'>" + currgame.gameid + ": " + currgame.players[0] + "(" + currgame.elos[0] + "), " + currgame.players[1] + "(" + currgame.elos[1] + "), " + currgame.players[2] + "(" + currgame.elos[2] + "), " + currgame.players[3] + "(" + currgame.elos[3] + ") VS " + currgame.players[4] + "(" + currgame.elos[4] + "), " + currgame.players[5] + "(" + currgame.elos[5] + "), " + currgame.players[6] + "(" + currgame.elos[6] + "), " + currgame.players[7] + "(" + currgame.elos[7] + ") " + minutes_str + ":" + seconds_str + " </div><br>";
                counter_c++;
            }
            else {
                normalcontainer.innerHTML += "<div class='game_row'  onclick='showLivegame(\"" + currgame.players[0] + "\")'>" + currgame.gameid + ": " + currgame.players[0] + "(" + currgame.elos[0] + "), " + currgame.players[1] + "(" + currgame.elos[1] + ")  VS " + currgame.players[2] + "(" + currgame.elos[2] + "), " + currgame.players[3] + "(" + currgame.elos[3] + ") " + minutes_str + ":" + seconds_str + " </div><br>";
                counter_r++;
            }

        }
        if (counter_c === 0) classiccontainer.innerHTML = "No active games found.";
        if (counter_r === 0) normalcontainer.innerHTML = "No active games found.";
    }
    else {
        normalcontainer.innerText = "No games found.";
        console.log(livegames);
    }
}



checkLink();
queryAllLivegames();

function apiGetPlayer(callback, playername) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var player = JSON.parse(xhttp.response);
            callback(player);
        }
    };
    xhttp.open("GET", '/api/profile/player100?playername=' + playername, true);
    xhttp.send();
}

function queryPlayer(playername) {
    apiGetPlayer(function (result) {
        if (result.player === null) {
            console.log("Failed to load player:");
            console.log(playername);
            console.log(result);
            allPlayers.push({ "playername": "Bot (player not found)", "statistics": {}, "bestFriends": [], "games": {} });
            document.getElementById("loadingstring").innerHTML = "Requesting players... " + allPlayers.length + "/4";
            //document.getElementById("apierror").style.display = "";
        }
        else {
            result.player.statistics = JSON.parse(result.player.statistics);
            player = result.player;
            allPlayers.push(player);
            document.getElementById("loadingstring").innerHTML = "Requesting players... " + allPlayers.length + "/4";
            //finished loading
            if (allPlayers.length === 4) {
                document.getElementById("west").style.display = "";
                document.getElementById("east").style.display = "";
                parsePlayers();
                document.getElementById("loadingstring").innerHTML = "";

            }
            return player;
        }

    }, playername);
}

function getAllLivegames(callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var livegames = JSON.parse(xhttp.response);
            console.log(livegames);
            callback(livegames);
        }
        else if (this.status === 500) document.getElementById("apierror").style.display = "";
    };
    xhttp.open("GET", '/api/getLivegames', true);
    xhttp.send();
}

function queryAllLivegames() {
    getAllLivegames(function (result, err) {
        livegames = JSON.parse(result);
        if (livegames) {
            listGames(livegames);
            return livegames;
        }
        else {
            console.log(err);
            document.getElementById("apierror").style.display = "";
        }

    });
}


function sqlGetLivegame(callback, playername) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var livegame = JSON.parse(xhttp.response);
            callback(livegame);
        }
        else if (this.status === 500) document.getElementById("apierror").style.display = "";
    };
    xhttp.open("GET", '/sql/getLivegame?playername=' + playername, true);
    xhttp.send();

}

function queryLivegame(playername) {
    document.getElementById("loadingstring").innerHTML = "Requesting Livegame...";
    sqlGetLivegame(function (result) {
        livegame = JSON.parse(result);
        //console.log(livegame);
        if (livegame) {
            livegame.players.forEach(function (ele) {
                queryPlayer(ele);
            });
        }
        else {
            document.getElementById("apierror").style.display = "";
        }
        return livegame;
    }, playername);
}

