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
            document.getElementById("apierror").style.display = "";
        }
        else {
            result.player.statistics = JSON.parse(result.player.statistics);
            player = result.player
            allPlayers.push(player);
            if (allPlayers.length == 4) parsePlayers();
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
    sqlGetLivegame(function (result) {
        livegame = JSON.parse(result);
        console.log(livegame);
        livegame.players.forEach(function (ele) {
            queryPlayer(ele);
        });
        return livegame;
    }, playername);
}



function getPlayer() {
    var requested_players = 0;
    allPlayers = [];
    document.getElementById("mitte").style.display = "";
    document.getElementById("indermitte").textContent = "";
    queryLivegame(document.getElementById("playername").value);
}

function parsePlayers() {
    
    document.getElementById("mitte").style.display = "none";
    var parsedPlayer = [];
    for (var i = 0; i < 4; i++) {
        parsedPlayer[i] = allPlayers.filter(filteredPlayer => filteredPlayer.playername == livegame.players[i])[0];
    }
    delete allPlayers;
    console.log(parsedPlayer);
    for (var i = 0; i < 4; i++) {
        document.getElementById("name" + (i + 1)).innerHTML = parsedPlayer[i].playername;
        document.getElementById("elo" + (i + 1)).innerHTML = parsedPlayer[i].statistics.overallElo;
        document.getElementById("name" + (i + 1)).innerHTML = parsedPlayer[i].playername;

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
        else var race = "Mastermind";


        var favunit = [];
        var leaks = [];
        for (var x = 0; x < 60; x++) {
            favunit[x] = 0;
            if (x < 22) leaks[x] = 0;
        }
        var games_count = 0;
        parsedPlayer[i].games.games.forEach(function (ele) {
            var gameDetail = ele['gameDetails'].filter(gameDetail => gameDetail.playername == parsedPlayer[i].playername)[0];
            if (gameDetail) {
                console.log(ele);
                if (gameDetail.legion == race) {
                    games_count++;
                    var currunit = "";
                    var lastunit = "";

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
            




        });
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
                if (gameDetail.legion == race) {
                    for (var x = 0; x < gameDetail.leaksPerWave.length; x++) {
                        //console.log(gameDetail.leaksPerWave[x]);

                        var leaked = false;
                        gameDetail.unitsPerWave[x].forEach(function (element) {
                            //console.log(favunit);
                            try {
                                if (element.substring(0, element.indexOf("_unit")).includes(favunit[0].substring(0, favunit[0].indexOf(";"))) || element.substring(0, element.indexOf("_unit")).includes(favunit[1].substring(0, favunit[0].indexOf(";"))) || element.substring(0, element.indexOf("_unit")).includes(favunit[2].substring(0, favunit[0].indexOf(";")))) {
                                    gamesWithFav_bool = true;
                                    if (gameDetail.leaksPerWave[x].length != 0) {
                                        leaked = true;
                                    }
                                }
                            }
                            catch (error) {
                                console.log(error);
                            }
                        });
                        if (leaked) {
                            leaks[x]++;
                        }

                    }
                    if (gamesWithFav_bool) {
                        gamesWithFav_count++;
                    }
                }
            }
            
        });
        console.log(gamesWithFav_count);
        console.log(games_count);
        document.getElementById("leaks" + (i + 1)).innerHTML = "Leaks on: ";
        for (var x = 0; x < leaks.length; x++) {
            if (leaks[x] > 0) {
                if (((leaks[x] / gamesWithFav_count) * 100).toFixed(2) > 15) {
                    document.getElementById("leaks" + (i + 1)).innerHTML += (x + 1) + "(" + ((leaks[x] / gamesWithFav_count) * 100).toFixed(2) + "%), ";
                }

            }
        }
        document.getElementById("leaks" + (i + 1)).innerHTML = document.getElementById("leaks" + (i + 1)).innerHTML.substring(0, document.getElementById("leaks" + (i + 1)).innerHTML.length - 1);
        document.getElementById("best_legion" + (i + 1)).innerHTML = "Prefered Legion: " + race;
        document.getElementById("favstart" + (i + 1)).innerHTML = "Favorite Starts:<ul>";
        for (var x = 0; x < 3; x++) {
            try {
                var unit = favunit[x].substring(0, favunit[x].indexOf(";"));
                var count = favunit[x].substring(favunit[x].indexOf(";") + 1);
                var chance = ((count / games_count) * 100).toFixed(2);
                //console.log(unit, count);
                document.getElementById("favstart" + (i + 1)).innerHTML += "<li>" + unit + "(" + chance + "%) ";
            }
            catch (error) {
                console.log(error);
            }
        }
        document.getElementById("favstart" + (i + 1)).innerHTML += "</ul>";
        //console.log(favunit);
    }

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
