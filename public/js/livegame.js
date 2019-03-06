function apiGetPlayer(callback, playername) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var player = JSON.parse(xhttp.response);
            callback(player);
        }
    };
    xhttp.open("GET", '/api/profile/player100?playername=' + playername, true);
    xhttp.send();
}

function queryPlayer(playername) {
    apiGetPlayer(function (result) {
        if (result.player == null) {
            console.log(playername);
            console.log(result);
            allPlayers.push({ "playername": "Bot" });
            document.getElementById("loadingstring").innerHTML = "Requesting players.... " + allPlayers.length + "/4";
            //document.getElementById("apierror").style.display = "";
        }
        else {
            result.player.statistics = JSON.parse(result.player.statistics);
            player = result.player
            allPlayers.push(player);
            document.getElementById("loadingstring").innerHTML = "Requesting players.... " + allPlayers.length + "/4";
            if (allPlayers.length == 4) {
                document.getElementById("west").style.display = "";
                document.getElementById("east").style.display = "";
                parsePlayers();
                document.getElementById("loadingstring").innerHTML = "";

            }
            return player;
        }

    }, playername);
}


function sqlGetLivegame(callback, playername) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var livegame = JSON.parse(xhttp.response);
            callback(livegame);
        }
    };
    xhttp.open("GET", '/sql/getLivegame?playername=' + playername, true);
    xhttp.send();
}

function queryLivegame(playername) {
    document.getElementById("loadingstring").innerHTML = "Requesting Livegame...."
    sqlGetLivegame(function (result) {
        livegame = JSON.parse(result);
        console.log(livegame);
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
    document.getElementById("indermitte").textContent = "";
}

function getPlayer() {
    console.log(this);
    if (document.getElementById("playername").value.length > 0) {
        window.history.pushState('livegame', 'Livegame', '?player=' + document.getElementById("playername").value);
    }
    else if (document.getElementById("playername2").value.length > 0) {
        window.history.pushState('livegame', 'Livegame', '?player=' + document.getElementById("playername2").value);
    }
    checkContent();


}

function checkLink() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var playerurl = url.searchParams.get("player");
    // request per url
    if (playerurl != null && document.getElementById("playername").value.length == 0) {
        document.getElementById("playername").value = playerurl;
        checkContent();
    }
}

function parsePlayers() {
    document.getElementById("mitte").style.display = "none";
    parsedPlayer = [];
    for (var i = 0; i < 4; i++) {
        parsedPlayer[i] = allPlayers.filter(filteredPlayer => filteredPlayer.playername == livegame.players[i])[0];
        console.log(parsedPlayer[i]);
    }
    for (var i = 0; i < 4; i++) {
        document.getElementById("name" + (i + 1)).innerHTML = "<b onclick='showPlayerDetails("+i+");'>" + parsedPlayer[i].playername + "</b>";
        document.getElementById("elo" + (i + 1)).innerHTML = parsedPlayer[i].statistics.overallElo + " (" + parsedPlayer[i].statistics.overallPeakEloThisSeason + ")";
        //document.getElementById("name" + (i + 1)).innerHTML = parsedPlayer[i].playername;

        player_totalgames = parsedPlayer[i].statistics.gamesPlayed;
        player_totalwins = parsedPlayer[i].statistics.wins;
        player_totalwinchance = ((player_totalwins / player_totalgames) * 100).toFixed(2);
        if (player_totalwinchance == 'NaN') player_totalwinchance = 0;
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
        if (parsedPlayer[i].bestFriends != null) {
            player_bestfriends = "";
            player_bestfriends += parsedPlayer[i].bestFriends[0].parsedPlayer[i].playername + "(" + parsedPlayer[i].bestFriends[0].gameCount + ")";
            if (parsedPlayer[i].bestFriends[1] != null) {
                player_bestfriends += ", " + parsedPlayer[i].bestFriends[1].parsedPlayer[i].playername + "(" + parsedPlayer[i].bestFriends[1].gameCount + ")";
                if (parsedPlayer[i].bestFriends[2] != null) {
                    player_bestfriends += ", " + parsedPlayer[i].bestFriends[2].parsedPlayer[i].playername + "(" + parsedPlayer[i].bestFriends[2].gameCount + ")";
                }
            }
        }
        //player_higheststreak = parsedPlayer[i].Playerstatistics[26].StatisticValue;
        //element
        player_element_elo = parsedPlayer[i].statistics.elementElo;
        if (typeof parsedPlayer[i].statistics.elementElo == 'undefined') player_element_elo = 1000;
        player_element_peakelo = parsedPlayer[i].statistics.elementPeakElo;
        if (typeof parsedPlayer[i].statistics.elementPeakElo == 'undefined') player_element_peakelo = parsedPlayer[i].statistics.elementPeakEloThisSeason;
        if (typeof parsedPlayer[i].statistics.elementPeakEloThisSeason == 'undefined') player_element_peakelo = 1000;
        player_element_games = parsedPlayer[i].statistics.elementPlayed;
        if (typeof parsedPlayer[i].statistics.elementPlayed == 'undefined') player_element_games = 0;
        player_element_wins = parsedPlayer[i].statistics.elementWins;
        if (typeof parsedPlayer[i].statistics.elementWins == 'undefined') player_element_wins = 0;
        player_element_winchance = ((player_element_wins / player_element_games) * 100).toFixed(2);
        if (player_element_winchance == 'NaN') player_element_winchance = 0;
        player_element_losses = parsedPlayer[i].statistics.elementLosses;
        if (typeof parsedPlayer[i].statistics.elementLosses == 'undefined') player_element_losses = 0;
        player_element_xp = parsedPlayer[i].statistics.elementXp;
        if (typeof parsedPlayer[i].statistics.elementXp == 'undefined') player_element_xp = 0;
        player_element_level = getPlayerLevel(player_element_xp);
        //grove
        player_grove_elo = parsedPlayer[i].statistics.groveElo;
        if (typeof parsedPlayer[i].statistics.groveElo == 'undefined') player_grove_elo = 1000;
        player_grove_peakelo = parsedPlayer[i].statistics.grovePeakElo;
        if (typeof parsedPlayer[i].statistics.grovePeakElo == 'undefined') player_grove_peakelo = parsedPlayer[i].statistics.grovePeakEloThisSeason;
        if (typeof parsedPlayer[i].statistics.grovePeakEloThisSeason == 'undefined') player_grove_peakelo = 1000;
        player_grove_games = parsedPlayer[i].statistics.grovePlayed;
        if (typeof parsedPlayer[i].statistics.grovePlayed == 'undefined') player_grove_games = 0;
        player_grove_wins = parsedPlayer[i].statistics.groveWins;
        if (typeof parsedPlayer[i].statistics.groveWins == 'undefined') player_grove_wins = 0;
        player_grove_winchance = ((player_grove_wins / player_grove_games) * 100).toFixed(2);
        if (player_grove_winchance == 'NaN') player_grove_winchance = 0;
        player_grove_losses = parsedPlayer[i].statistics.groveLosses;
        if (typeof parsedPlayer[i].statistics.groveLosses == 'undefined') player_grove_losses = 0;
        player_grove_xp = parsedPlayer[i].statistics.groveXp;
        if (typeof parsedPlayer[i].statistics.groveXp == 'undefined') player_grove_xp = 0;
        player_grove_level = getPlayerLevel(player_grove_xp);
        //forsaken
        player_forsaken_elo = parsedPlayer[i].statistics.forsakenElo;
        if (typeof parsedPlayer[i].statistics.forsakenElo == 'undefined') player_forsaken_elo = 1000;
        player_forsaken_peakelo = parsedPlayer[i].statistics.forsakenPeakElo;
        if (typeof parsedPlayer[i].statistics.forsakenPeakElo == 'undefined') player_forsaken_peakelo = parsedPlayer[i].statistics.forsakenPeakEloThisSeason;
        if (typeof parsedPlayer[i].statistics.forsakenPeakEloThisSeason == 'undefined') player_forsaken_peakelo = 1000;
        player_forsaken_games = parsedPlayer[i].statistics.forsakenPlayed;
        if (typeof parsedPlayer[i].statistics.forsakenPlayed == 'undefined') player_forsaken_games = 0;
        player_forsaken_wins = parsedPlayer[i].statistics.forsakenWins;
        if (typeof parsedPlayer[i].statistics.forsakenWins == 'undefined') player_forsaken_wins = 0;
        player_forsaken_winchance = ((player_forsaken_wins / player_forsaken_games) * 100).toFixed(2);
        if (player_forsaken_winchance == 'NaN') player_forsaken_winchance = 0;
        player_forsaken_losses = parsedPlayer[i].statistics.forsakenLosses;
        if (typeof parsedPlayer[i].statistics.forsakenLosses == 'undefined') player_forsaken_losses = 0;
        player_forsaken_xp = parsedPlayer[i].statistics.forsakenXp;
        if (typeof parsedPlayer[i].statistics.forsakenXp == 'undefined') player_forsaken_xp = 0;
        player_forsaken_level = getPlayerLevel(player_forsaken_xp);
        //mech
        player_mech_elo = parsedPlayer[i].statistics.mechElo;
        if (typeof parsedPlayer[i].statistics.mechElo == 'undefined') player_mech_elo = 1000;
        player_mech_peakelo = parsedPlayer[i].statistics.mechPeakElo;
        if (typeof parsedPlayer[i].statistics.mechPeakElo == 'undefined') player_mech_peakelo = parsedPlayer[i].statistics.mechPeakEloThisSeason;
        if (typeof parsedPlayer[i].statistics.mechPeakEloThisSeason == 'undefined') player_mech_peakelo = 1000;
        player_mech_games = parsedPlayer[i].statistics.mechPlayed;
        if (typeof parsedPlayer[i].statistics.mechPlayed == 'undefined') player_mech_games = 0;
        player_mech_wins = parsedPlayer[i].statistics.mechWins;
        if (typeof parsedPlayer[i].statistics.mechWins == 'undefined') player_mech_wins = 0;
        player_mech_winchance = ((player_mech_wins / player_mech_games) * 100).toFixed(2);
        if (player_mech_winchance == 'NaN') player_mech_winchance = 0;
        player_mech_losses = parsedPlayer[i].statistics.mechLosses;
        if (typeof parsedPlayer[i].statistics.mechLosses == 'undefined') player_mech_losses = 0;
        player_mech_xp = parsedPlayer[i].statistics.mechXp;
        if (typeof parsedPlayer[i].statistics.mechXp == 'undefined') player_mech_xp = 0;
        player_mech_level = getPlayerLevel(player_mech_xp);
        //mastermind
        player_mastermind_elo = parsedPlayer[i].statistics.mastermindElo;
        if (typeof parsedPlayer[i].statistics.mastermindElo == 'undefined') player_mastermind_elo = 1000;
        player_mastermind_peakelo = parsedPlayer[i].statistics.mastermindPeakElo;
        if (typeof parsedPlayer[i].statistics.mastermindPeakElo == 'undefined') player_mastermind_peakelo = parsedPlayer[i].statistics.mastermindPeakEloThisSeason;
        if (typeof parsedPlayer[i].statistics.mastermindPeakEloThisSeason == 'undefined') player_mastermind_peakelo = 1000;
        player_mastermind_games = parsedPlayer[i].statistics.mastermindPlayed;
        if (typeof parsedPlayer[i].statistics.mastermindPlayed == 'undefined') player_mastermind_games = 0;
        player_mastermind_wins = parsedPlayer[i].statistics.mastermindWins;
        if (typeof parsedPlayer[i].statistics.mastermindWins == 'undefined') player_mastermind_wins = 0;
        player_mastermind_winchance = ((player_mastermind_wins / player_mastermind_games) * 100).toFixed(2);
        if (player_mastermind_winchance == 'NaN') player_mastermind_winchance = 0;
        player_mastermind_losses = parsedPlayer[i].statistics.mastermindLosses;
        if (typeof parsedPlayer[i].statistics.mastermindLosses == 'undefined') player_mastermind_losses = 0;
        player_mastermind_xp = parsedPlayer[i].statistics.mastermindXp;
        if (typeof parsedPlayer[i].statistics.mastermindXp == 'undefined') player_mastermind_xp = 0;
        player_mastermind_level = getPlayerLevel(player_mastermind_xp);
        //atlantean
        player_atlantean_elo = parsedPlayer[i].statistics.atlanteanElo;
        if (typeof parsedPlayer[i].statistics.atlanteanElo == 'undefined') player_atlantean_elo = 1000;
        player_atlantean_peakelo = parsedPlayer[i].statistics.atlanteanPeakElo;
        if (typeof parsedPlayer[i].statistics.atlanteanPeakElo == 'undefined') player_atlantean_peakelo = parsedPlayer[i].statistics.atlanteanPeakEloThisSeason;
        if (typeof parsedPlayer[i].statistics.atlanteanPeakEloThisSeason == 'undefined') player_atlantean_peakelo = 1000;
        player_atlantean_games = parsedPlayer[i].statistics.atlanteanPlayed;
        if (typeof parsedPlayer[i].statistics.atlanteanPlayed == 'undefined') player_atlantean_games = 0;
        player_atlantean_wins = parsedPlayer[i].statistics.atlanteanWins;
        if (typeof parsedPlayer[i].statistics.atlanteanWins == 'undefined') player_atlantean_wins = 0;
        player_atlantean_winchance = ((player_atlantean_wins / player_atlantean_games) * 100).toFixed(2);
        if (player_atlantean_winchance == 'NaN') player_atlantean_winchance = 0;
        player_atlantean_losses = parsedPlayer[i].statistics.atlanteanLosses;
        if (typeof parsedPlayer[i].statistics.atlanteanLosses == 'undefined') player_atlantean_losses = 0;
        player_atlantean_xp = parsedPlayer[i].statistics.atlanteanXp;
        if (typeof parsedPlayer[i].statistics.atlanteanXp == 'undefined') player_atlantean_xp = 0;
        player_atlantean_level = getPlayerLevel(player_atlantean_xp);
        //icon f�r race mit meisten wins
        var race = "";
        if (player_element_wins > player_forsaken_wins && player_element_wins > player_grove_wins && player_element_wins > player_mech_wins && player_element_wins > player_mastermind_wins) race = "Element";
        else if (player_grove_wins > player_forsaken_wins && player_grove_wins > player_element_wins && player_grove_wins > player_mech_wins && player_grove_wins > player_mastermind_wins) race = "Grove";
        else if (player_forsaken_wins > player_element_wins && player_forsaken_wins > player_grove_wins && player_forsaken_wins > player_mech_wins && player_forsaken_wins > player_mastermind_wins) race = "Forsaken";
        else if (player_mech_wins > player_forsaken_wins && player_mech_wins > player_grove_wins && player_mech_wins > player_element_wins && player_mech_wins > player_mastermind_wins) race = "Mech";
        else if (player_mastermind_wins > player_forsaken_wins && player_mastermind_wins > player_grove_wins && player_mastermind_wins > player_mech_wins && player_element_wins < player_mastermind_wins) race = "Mastermind";
        else if (player_atlantean_wins > player_forsaken_wins && player_atlantean_wins > player_grove_wins && player_atlantean_wins > player_mech_wins && player_element_wins < player_atlantean_wins) race = "Atlantean";
        else race = "Mastermind";
        var race_selected = race;
        if (document.getElementById("legionp" + i).value != null) {
            race_selected = document.getElementById("legionp" + i).value;
        }
        var favunit = [];
        var leaks = [];
        for (var x = 0; x < 60; x++) {
            favunit[x] = 0;
            if (x < 22) leaks[x] = 0;
        }
        var games_count = 0;
        document.getElementById("favstart" + (i + 1)).innerHTML = "Favorite Starts:";
        if (parsedPlayer[i].games.count > 0) {
            parsedPlayer[i].games.games.forEach(function (ele) {
                var gameDetail = ele['gameDetails'].filter(gameDetail => gameDetail.playername == parsedPlayer[i].playername)[0];
                if (gameDetail) {
                    if (gameDetail.legion == race_selected) {
                        games_count++;
                        var currunit = "";
                        var lastunit = "";
                        if (gameDetail.unitsPerWave != null) {
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
                                    if (anzahl > 0 == false) {
                                        for (var x = 0; x < 60; x++) {
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
                    }
                }
            });
        }
        else{
            console.log("player "+i+" has no games played");
            console.log(i);
            document.getElementById("favstart"+(i+1)).innerHTML="No recorded games available.";
        }
        favunit.sort(function (a, b) {
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
        //check leaks with favunits 0-2
        var gamesWithFav_count = 0;

        parsedPlayer[i].games.games.forEach(function (ele) {
            var gamesWithFav_bool = false;
            var gameDetail = ele['gameDetails'].filter(gameDetail => gameDetail.playername == parsedPlayer[i].playername)[0];
            if (gameDetail) {
                if (gameDetail.legion == race_selected) {
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

                            }
                        });
                    }
                    if (gamesWithFav_bool) {
                        gamesWithFav_count++;
                    }
                }
            }

        });
        document.getElementById("leaks" + (i + 1)).innerHTML = document.getElementById("leaks" + (i + 1)).innerHTML.substring(0, document.getElementById("leaks" + (i + 1)).innerHTML.length - 2);
        document.getElementById("best_legion" + (i + 1)).innerHTML = "Prefered Legion: " + race;
        
        //console.log(favunit);
        console.log(favunit);
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
                    document.getElementById("favstart" + (i + 1)).innerHTML += "<div class='favunits_div' id='favstart_li" + (i + 1) + x + "' onclick=getFighterGames('" + unit + "','" + parsedPlayer[i].playername + "')><img class='unitimg' src=" + url + ">" + unit_type + "(" + chance + "%)</div>";
                    document.getElementById("unitselector"+i).options[x] = new Option(unit_type,unit_type);
                }
                catch (error) {
                    console.log(error);
                }
            }

        }
        //console.log(favunit);
    }


    getWinchance();
}

function getPlayerLevel(totalXp) {
    if (totalXp < 1) return 1
    if (totalXp < 1001) return 2
    if (totalXp < 3001) return 3
    if (totalXp < 7001) return 4
    if (totalXp < 13001) return 5
    if (totalXp < 21001) return 6
    if (totalXp < 31001) return 7
    if (totalXp < 43001) return 8
    if (totalXp < 57001) return 9
    if (totalXp < 73001) return 10
    if (totalXp < 91001) return 11
    if (totalXp < 101001) return 12
    if (totalXp < 123001) return 13
    if (totalXp < 147001) return 14
    if (totalXp < 173001) return 15
    if (totalXp < 201001) return 16
    if (totalXp < 231001) return 17
    if (totalXp < 263001) return 18
    if (totalXp < 297001) return 19
    if (totalXp < 335001) return 20
    if (totalXp < 375001) return 21
    if (totalXp < 417001) return 22
    if (totalXp < 461001) return 23

}

// todo: click first
function getFighterGames(fightername, playername) {
    var leaks = [];
    for (var i = 0; i < 22; i++) {
        leaks[i] = 0;
    }
    var fightercount_pick = 0;
    //console.log(parsedPlayer);
    var selectedPlayer = parsedPlayer.filter(filterGames => filterGames.playername == playername)[0];
    var selectedGames = selectedPlayer.games.games;
    selectedGames.forEach(function (ele) {
        gameDetail = ele['gameDetails'].filter(gameDetail => gameDetail.playername == playername)[0];
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
                                        switch (gameDetail.position) {
                                            case 1:
                                                var target_pos = 6;
                                                break;
                                            case 2:
                                                var target_pos = 5;
                                                break;
                                            case 3:
                                                var target_pos = 1;
                                                break;
                                            case 4:
                                                var target_pos = 2;
                                                break;
                                        }
                                        var gameDetail_oponent = ele['gameDetails'].filter(gameDetail_oponent => gameDetail_oponent.position == target_pos)[0];
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
                                        switch (gameDetail.position) {
                                            case 1:
                                                var target_pos = 6;
                                                break;
                                            case 2:
                                                var target_pos = 5;
                                                break;
                                            case 3:
                                                var target_pos = 1;
                                                break;
                                            case 4:
                                                var target_pos = 2;
                                                break;
                                        }
                                        var gameDetail_oponent = ele['gameDetails'].filter(gameDetail_oponent => gameDetail_oponent.position == target_pos)[0];
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
    //console.log(leaks);
    //console.log(fightercount_pick);
    var spot = 0;
    for (var i = 0; i < 4; i++) {
        if (parsedPlayer[i].playername == playername) {
            spot = i + 1;
        }
    }
    //console.log(spot);
    document.getElementById("leaks" + spot).innerHTML = fightername + "'s chance to leak: ";
    for (var i = 0; i < leaks.length; i++) {
        if (leaks[i] > 0) {
            var chance = ((leaks[i] / fightercount_pick) * 100).toFixed(2);
            if (chance > 15) {
                //console.log("wave: " + i+1);
                //console.log("leaks: "+leaks[i]);
                //console.log("picks: "+fightercount_pick);
                //console.log(" ");
                document.getElementById("leaks" + spot).innerHTML += i + 1 + "(" + ((leaks[i] / fightercount_pick) * 100).toFixed(2) + "%), ";
            }
        }
    }
    document.getElementById("leaks" + spot).innerHTML = document.getElementById("leaks" + spot).innerHTML.substring(0, document.getElementById("leaks" + spot).innerHTML.length - 2);
}



function getWinchance() {
    var elos = [];
    var peakElos = [];
    for (var i = 0; i < parsedPlayer.length; i++) {
        console.log(parsedPlayer[i]);
        switch (document.getElementById("legionp" + i).value) {
            case "Mastermind":
                if (typeof parsedPlayer[i].statistics.mastermindElo != "undefinded") {
                    elos.push(parsedPlayer[i].statistics.mastermindElo);
                }
                else {
                    elos.push(1000);
                }

                if (typeof parsedPlayer[i].statistics.mastermindPeakElo == 'undefined') {
                    if (typeof parsedPlayer[i].statistics.mastermindPeakEloThisSeason == 'undefined') {
                        peakElos.push(1000);
                    }
                    else {
                        peakElos.push(parsedPlayer[i].statistics.mastermindPeakEloThisSeason);
                    }
                }
                else {
                    peakElos.push(parsedPlayer[i].statistics.mastermindPeakElo);
                }
                break;
            case "Element":
                if (typeof parsedPlayer[i].statistics.elementElo != "undefinded") {
                    elos.push(parsedPlayer[i].statistics.elementElo);
                }
                else {
                    elos.push(1000);
                }

                if (typeof parsedPlayer[i].statistics.elementPeakElo == 'undefined') {
                    if (typeof parsedPlayer[i].statistics.elementPeakEloThisSeason == 'undefined') {
                        peakElos.push(1000);
                    }
                    else {
                        peakElos.push(parsedPlayer[i].statistics.elementPeakEloThisSeason);
                    }

                }
                else {
                    peakElos.push(parsedPlayer[i].statistics.elementPeakElo);
                }
                break;
            case "Grove":
                console.log(typeof parsedPlayer[i].statistics.groveElo);
                if (typeof parsedPlayer[i].statistics.groveElo == "undefined") {
                    elos.push(1000);
                    console.log("1k");
                }
                else {
                    elos.push(parsedPlayer[i].statistics.groveElo);
                }

                if (typeof parsedPlayer[i].statistics.grovePeakElo == 'undefined') {
                    if (typeof parsedPlayer[i].statistics.grovePeakEloThisSeason == 'undefined') {
                        peakElos.push(1000);
                    }
                    else {
                        peakElos.push(parsedPlayer[i].statistics.grovePeakEloThisSeason);
                    }

                }
                else {
                    peakElos.push(parsedPlayer[i].statistics.grovePeakElo);
                }
                break;
            case "Forsaken":
                if (typeof parsedPlayer[i].statistics.forsakenElo == "undefined") {

                    elos.push(1000);
                }
                else {
                    elos.push(parsedPlayer[i].statistics.forsakenElo);
                }

                if (typeof parsedPlayer[i].statistics.forsakenPeakElo == 'undefined') {
                    if (typeof parsedPlayer[i].statistics.forsakenPeakEloThisSeason == 'undefined') {
                        peakElos.push(1000);
                    }
                    else {
                        peakElos.push(parsedPlayer[i].statistics.forsakenPeakEloThisSeason);
                    }

                }
                else {
                    peakElos.push(parsedPlayer[i].statistics.forsakenPeakElo);
                }
                break;
            case "Mech":
                if (typeof parsedPlayer[i].statistics.mechElo == "undefined") {
                    elos.push(1000);
                }
                else {
                    elos.push(parsedPlayer[i].statistics.mechElo);
                }

                if (typeof parsedPlayer[i].statistics.mechPeakElo == 'undefined') {
                    if (typeof parsedPlayer[i].statistics.mechPeakEloThisSeason == 'undefined') {
                        peakElos.push(1000);
                    }
                    else {
                        peakElos.push(parsedPlayer[i].statistics.mechPeakEloThisSeason);
                    }

                }
                else {
                    peakElos.push(parsedPlayer[i].statistics.mechPeakElo);
                }
                break;
            case "Atlantean":
                if (typeof parsedPlayer[i].statistics.atlanteanElo != "undefinded") {
                    elos.push(1000);
                }
                else {
                    elos.push(parsedPlayer[i].statistics.atlanteanElo);
                }

                if (typeof parsedPlayer[i].statistics.atlanteanPeakElo == 'undefined') {
                    if (typeof parsedPlayer[i].statistics.atlanteanPeakEloThisSeason == 'undefined') {
                        peakElos.push(1000);
                    }
                    else {
                        peakElos.push(parsedPlayer[i].statistics.atlanteanPeakEloThisSeason);
                    }

                }
                else {
                    peakElos.push(parsedPlayer[i].statistics.atlanteanPeakElo);
                }
                break;
        }
    }
    var elo_west = parseFloat(((elos[0] * 0, 5 + elos[1] * 0, 5 + peakElos[0]*2 + peakElos[1]*2) / 4));
    var elo_east = parseFloat(((elos[2] * 0, 5 + elos[3] * 0, 5 + peakElos[2]*2 + peakElos[3]*2) / 4));
    var winchance = 50 * (elo_west / elo_east);
    if (winchance < 0 || winchance > 100) winchance = 50;
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
        if (width >= winchance || width > 100) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + '%';
            elem.innerHTML = width * 1 + '%';
        }
    }
    document.getElementById("winchancebar").style.display = "";
}

document.onkeydown = function (event) {
    if (event.keyCode == 13) {
        if (event.target.id == "playername" || event.target.id == "playername2") getPlayer();
    }
}

function showPlayerDetails(nummer){
    const details_box = document.getElementById("player_details_box");
    const details_content = document.getElementById("playername_details");
    details_box.style.display="";
    parsedPlayer = [];
    for (var i = 0; i < 4; i++) {
        parsedPlayer[i] = allPlayers.filter(filteredPlayer => filteredPlayer.playername == livegame.players[i])[0];
    }
    details_content.innerHTML += "<h3>"+parsedPlayer[nummer].playername+"</h3>";
    document.getElementById("unitselector"+nummer).style.display="";
}

function hidePlayerDetails(){
    document.getElementById("player_details_box").style.display="none";
    document.getElementById("playername_details").innerHTML="";
    for (let i = 0; i < 4; i++) {
        document.getElementById("unitselector"+i).style.display="none";
    }
}

checkLink();

