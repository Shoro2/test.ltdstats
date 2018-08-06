function checkContent() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var playerurl = url.searchParams.get("player");
    //console.log("playerurl: " + playerurl);
    //console.log("value: " + document.getElementById("playername").value);
    if (playerurl != null) {
        document.getElementById("playername").value = playerurl;
    }
    if (document.getElementById("playername").value) {
        document.getElementById("mitte").style.display = "inherit";
        queryPlayer(playerurl);
        queryRank(playerurl);
        //queryPlayerGames(playerurl);
        queryPlayerOverallGames(playerurl);
    }
    else {

        document.getElementById("tab_box_1").textContent = "Select a player";
        openTab(1);

    }
}

function setPlayer() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var playerurl = url.searchParams.get("player");
    if (playerurl === null) {
        window.location.href = window.location.href + "?player=" + document.getElementById("playername").value;
    }
    else {
        window.location.href = "/profile" + "?player=" + document.getElementById("playername").value;
    }

}

function loadEloGraph(games) {
    var counter = 0;
    var elo = [100];
    var date = [100];
    games.forEach(function (myEle) {
        if (counter < 200) {
            //console.log(myEle);
            if (myEle.queuetype != "Custom") {
                if (myEle.gameDetails[0].playername == player_name) {
                    elo[counter] = myEle.gameDetails[0].overallElo;

                }
                else if (myEle.gameDetails[1].playername == player_name) {
                    elo[counter] = myEle.gameDetails[1].overallElo;
                }
                else if (myEle.gameDetails[2].playername == player_name) {
                    elo[counter] = myEle.gameDetails[2].overallElo;
                }

                else if (myEle.gameDetails[3].playername == player_name) {
                    elo[counter] = myEle.gameDetails[3].overallElo;
                }
                date[counter] = myEle.ts.substring(0, myEle.ts.indexOf("T"));
            }
            else {
                if (counter == 0) {
                    if (myEle.gameDetails[0].playername == player_name) {
                        elo[counter] = myEle.gameDetails[0].overallElo;

                    }
                    else if (myEle.gameDetails[1].playername == player_name) {
                        elo[counter] = myEle.gameDetails[1].overallElo;
                    }
                    else if (myEle.gameDetails[2].playername == player_name) {
                        elo[counter] = myEle.gameDetails[2].overallElo;
                    }

                    else if (myEle.gameDetails[3].playername == player_name) {
                        elo[counter] = myEle.gameDetails[3].overallElo;
                    }
                    else if (myEle.gameDetails[4].playername == player_name) {
                        elo[counter] = myEle.gameDetails[4].overallElo;
                    }
                    else if (myEle.gameDetails[5].playername == player_name) {
                        elo[counter] = myEle.gameDetails[5].overallElo;
                    }

                    else if (myEle.gameDetails[6].playername == player_name) {
                        elo[counter] = myEle.gameDetails[6].overallElo;
                    }
                    else if (myEle.gameDetails[7].playername == player_name) {
                        elo[counter] = myEle.gameDetails[7].overallElo;
                    }
                    date[counter] = myEle.ts.substring(0, myEle.ts.indexOf("T"));
                    //console.log(elo[counter]);
                    //console.log(myEle);
                }
                else {
                    elo[counter] = elo[counter - 1];
                    date[counter] = date[counter - 1];
                }
            }

            counter++;
        }

    });
    date.reverse();
    elo.reverse();
    document.getElementById("tab_box_2").innerHTML = "<div class='profile'><h1 id='player_name'>" + player_name + "</h1><div id='chart-container'><canvas id='myChart'></canvas></div></div>";
    var ctx = document.getElementById("myChart");
    ctx.height = 500;
    ctx.width = 1000;
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Elo',
                data: [],
                backgroundColor: [
                    'rgba(255, 0, 0, 0.9)',
                ],
                borderColor: [
                    'rgba(255,99,132,1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            }
        }
    });

    for (var i = 0; i < 100; i++) {
        addData(myChart, date[i], elo[i]);
        //console.log(date[i]);
    }
}

function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();

}

function loadGames() {
    getGameDetails();
}

function loadCollection() {

}

function loadStats(player) {
    player_name = player.playername;
    player_id = player.id;
    //player_icon = player.AvatarUrl;
    //general
    player_totalgames = player.statistics.gamesPlayed;
    player_totalwins = player.statistics.wins;
    player_totalwinchance = ((player_totalwins / player_totalgames) * 100).toFixed(2);
    if (player_totalwinchance == 'NaN') player_totalwinchance = 0;
    player_ties = player.statistics.ties;
    if (typeof player.statistics.ties == 'undefined') player_ties = 0;
    player_quits = player.statistics.quits;
    if (typeof player.statistics.quits == 'undefined') player_quits = 0;
    player_overall_elo = player.statistics.overallElo;
    //console.log(player.statistics.overallPeakElo);
    if (typeof player.statistics.overallPeakElo == 'undefined') player_overall_peakelo = player.statistics.overallPeakEloThisSeason;
    else player_overall_peakelo = player.statistics.overallPeakElo;
    player_overall_xp = player.statistics.totalXp
    player_overall_level = getPlayerLevel(player_overall_xp);
    player_winningstreak = player.statistics.winStreak;
    //player_higheststreak = player.Playerstatistics[26].StatisticValue;
    //element
    player_element_elo = player.statistics.elementElo;
    if (typeof player.statistics.elementElo == 'undefined') player_element_elo = 1000;
    player_element_peakelo = player.statistics.elementPeakElo;
    if (typeof player.statistics.elementPeakElo == 'undefined') player_element_peakelo = player.statistics.elementPeakEloThisSeason;
    if (typeof player.statistics.elementPeakEloThisSeason == 'undefined') player_element_peakelo = 1000;
    player_element_games = player.statistics.elementPlayed;
    if (typeof player.statistics.elementPlayed == 'undefined') player_element_games = 0;
    player_element_wins = player.statistics.elementWins;
    if (typeof player.statistics.elementWins == 'undefined') player_element_wins = 0;
    player_element_winchance = ((player_element_wins / player_element_games) * 100).toFixed(2);
    if (player_element_winchance == 'NaN') player_element_winchance = 0;
    player_element_losses = player.statistics.elementLosses;
    if (typeof player.statistics.elementLosses == 'undefined') player_element_losses = 0;
    player_element_xp = player.statistics.elementXp;
    if (typeof player.statistics.elementXp == 'undefined') player_element_xp = 0;
    player_element_level = getPlayerLevel(player_element_xp);
    //grove
    player_grove_elo = player.statistics.groveElo;
    if (typeof player.statistics.groveElo == 'undefined') player_grove_elo = 1000;
    player_grove_peakelo = player.statistics.grovePeakElo;
    if (typeof player.statistics.grovePeakElo == 'undefined') player_grove_peakelo = player.statistics.grovePeakEloThisSeason;
    if (typeof player.statistics.grovePeakEloThisSeason == 'undefined') player_grove_peakelo = 1000;
    player_grove_games = player.statistics.grovePlayed;
    if (typeof player.statistics.grovePlayed == 'undefined') player_grove_games = 0;
    player_grove_wins = player.statistics.groveWins;
    if (typeof player.statistics.groveWins == 'undefined') player_grove_wins = 0;
    player_grove_winchance = ((player_grove_wins / player_grove_games) * 100).toFixed(2);
    if (player_grove_winchance == 'NaN') player_grove_winchance = 0;
    player_grove_losses = player.statistics.groveLosses;
    if (typeof player.statistics.groveLosses == 'undefined') player_grove_losses = 0;
    player_grove_xp = player.statistics.groveXp;
    if (typeof player.statistics.groveXp == 'undefined') player_grove_xp = 0;
    player_grove_level = getPlayerLevel(player_grove_xp);
    //forsaken
    player_forsaken_elo = player.statistics.forsakenElo;
    if (typeof player.statistics.forsakenElo == 'undefined') player_forsaken_elo = 1000;
    player_forsaken_peakelo = player.statistics.forsakenPeakElo;
    if (typeof player.statistics.forsakenPeakElo == 'undefined') player_forsaken_peakelo = player.statistics.forsakenPeakEloThisSeason;
    if (typeof player.statistics.forsakenPeakEloThisSeason == 'undefined') player_forsaken_peakelo = 1000;
    player_forsaken_games = player.statistics.forsakenPlayed;
    if (typeof player.statistics.forsakenPlayed == 'undefined') player_forsaken_games = 0;
    player_forsaken_wins = player.statistics.forsakenWins;
    if (typeof player.statistics.forsakenWins == 'undefined') player_forsaken_wins = 0;
    player_forsaken_winchance = ((player_forsaken_wins / player_forsaken_games) * 100).toFixed(2);
    if (player_forsaken_winchance == 'NaN') player_forsaken_winchance = 0;
    player_forsaken_losses = player.statistics.forsakenLosses;
    if (typeof player.statistics.forsakenLosses == 'undefined') player_forsaken_losses = 0;
    player_forsaken_xp = player.statistics.forsakenXp;
    if (typeof player.statistics.forsakenXp == 'undefined') player_forsaken_xp = 0;
    player_forsaken_level = getPlayerLevel(player_forsaken_xp);
    //mech
    player_mech_elo = player.statistics.mechElo;
    if (typeof player.statistics.mechElo == 'undefined') player_mech_elo = 1000;
    player_mech_peakelo = player.statistics.mechPeakElo;
    if (typeof player.statistics.mechPeakElo == 'undefined') player_mech_peakelo = player.statistics.mechPeakEloThisSeason;
    if (typeof player.statistics.mechPeakEloThisSeason == 'undefined') player_mech_peakelo = 1000;
    player_mech_games = player.statistics.mechPlayed;
    if (typeof player.statistics.mechPlayed == 'undefined') player_mech_games = 0;
    player_mech_wins = player.statistics.mechWins;
    if (typeof player.statistics.mechWins == 'undefined') player_mech_wins = 0;
    player_mech_winchance = ((player_mech_wins / player_mech_games) * 100).toFixed(2);
    if (player_mech_winchance == 'NaN') player_mech_winchance = 0;
    player_mech_losses = player.statistics.mechLosses;
    if (typeof player.statistics.mechLosses == 'undefined') player_mech_losses = 0;
    player_mech_xp = player.statistics.mechXp;
    if (typeof player.statistics.mechXp == 'undefined') player_mech_xp = 0;
    player_mech_level = getPlayerLevel(player_mech_xp);
    //mastermind
    player_mastermind_elo = player.statistics.mastermindElo;
    if (typeof player.statistics.mastermindElo == 'undefined') player_mastermind_elo = 1000;
    player_mastermind_peakelo = player.statistics.mastermindPeakElo;
    if (typeof player.statistics.mastermindPeakElo == 'undefined') player_mastermind_peakelo = player.statistics.mastermindPeakEloThisSeason;
    if (typeof player.statistics.mastermindPeakEloThisSeason == 'undefined') player_mastermind_peakelo = 1000;
    player_mastermind_games = player.statistics.mastermindPlayed;
    if (typeof player.statistics.mastermindPlayed == 'undefined') player_mastermind_games = 0;
    player_mastermind_wins = player.statistics.mastermindWins;
    if (typeof player.statistics.mastermindWins == 'undefined') player_mastermind_wins = 0;
    player_mastermind_winchance = ((player_mastermind_wins / player_mastermind_games) * 100).toFixed(2);
    if (player_mastermind_winchance == 'NaN') player_mastermind_winchance = 0;
    player_mastermind_losses = player.statistics.mastermindLosses;
    if (typeof player.statistics.mastermindLosses == 'undefined') player_mastermind_losses = 0;
    player_mastermind_xp = player.statistics.mastermindXp;
    if (typeof player.statistics.mastermindXp == 'undefined') player_mastermind_xp = 0;
    player_mastermind_level = getPlayerLevel(player_mastermind_xp);

    player_crossgames = "5";
    player_partygames = "10";
    player_bestfriend = "YourMoma";
    player_archenemy = "Me"
    player_leakon1 = "0.05";
    player_sendon1 = "0.15";



    //icon für race mit meisten wins
    if (player_element_wins > player_forsaken_wins && player_element_wins > player_grove_wins && player_element_wins > player_mech_wins && player_element_wins > player_mastermind_wins) var bgimage = "element_2.png";
    if (player_grove_wins > player_forsaken_wins && player_grove_wins > player_element_wins && player_grove_wins > player_mech_wins && player_grove_wins > player_mastermind_wins) var bgimage = "grove_2.png";
    if (player_forsaken_wins > player_element_wins && player_forsaken_wins > player_grove_wins && player_forsaken_wins > player_mech_wins && player_forsaken_wins > player_mastermind_wins) var bgimage = "forsaken_2.png";
    if (player_mech_wins > player_forsaken_wins && player_mech_wins > player_grove_wins && player_mech_wins > player_element_wins && player_mech_wins > player_mastermind_wins) var bgimage = "mech_2.png";
    if (player_mastermind_wins > player_forsaken_wins && player_mastermind_wins > player_grove_wins && player_mastermind_wins > player_mech_wins && player_element_wins < player_mastermind_wins) var bgimage = "mastermind_2.png";

    //parse
    document.getElementById("player_name1").textContent = player_name;
    document.getElementById("player_elo1").textContent = player_overall_elo + " (" + player_overall_peakelo + ")";
    //badges
    if (player_overall_level < 10) {
        document.getElementById("playerbadge_level").innerHTML = "<img id='img_level' src='/img/icons/0" + player_overall_level + ".png'>";
    }
    else {

        document.getElementById("playerbadge_level").innerHTML = "<img id='img_level' src='/img/icons/" + player_overall_level + ".png'>";
    }
    //console.log(player_overall_level);
    if (player_overall_elo > 1000 && player_overall_elo < 1200) document.getElementById("playerbadge_rank").innerHTML = "<img id='img_rank' src='/img/icons/Bronze.png'>";
    else if (player_overall_elo > 1200 && player_overall_elo < 1400) document.getElementById("playerbadge_rank").innerHTML = "<img id='img_rank' src='/img/icons/Silver.png'>";
    else if (player_overall_elo > 1400 && player_overall_elo < 1600) document.getElementById("playerbadge_rank").innerHTML = "<img id='img_rank' src='/img/icons/Gold.png'>";
    else if (player_overall_elo > 1600 && player_overall_elo < 1800) document.getElementById("playerbadge_rank").innerHTML = "<img id='img_rank' src='/img/icons/Platinum.png'>";
    else if (player_overall_elo > 1800 && player_overall_elo < 2000) document.getElementById("playerbadge_rank").innerHTML = "<img id='img_rank' src='/img/icons/Diamond.png'>";
    else if (player_overall_elo > 2000 && player_overall_elo < 2200) document.getElementById("playerbadge_rank").innerHTML = "<img id='img_rank' src='/img/icons/Expert.png'>";
    else if (player_overall_elo > 2200 && player_overall_elo < 2400) document.getElementById("playerbadge_rank").innerHTML = "<img id='img_rank' src='/img/icons/SeniorMaster.png'>";
    else if (player_overall_elo > 2400 && player_overall_elo < 2600) document.getElementById("playerbadge_rank").innerHTML = "<img id='img_rank' src='/img/icons/Gradmaster.png'>";
    // mouseover details

    parseStats();
    document.getElementsByClassName("main-content")[0].setAttribute("style", "background-image: url('/img/" + bgimage + "');background-repeat: no-repeat;background-position:center;background-size: 488px 488px;opacity:1.0;");
    document.title = "LTDStats - " + player_name + "'s Profile";

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

function parseStats() {
    document.getElementById("general_wins").textContent = "Wins:               \t\t\t" + player_totalwins;
    document.getElementById("general_ties").textContent = "Ties: \t\t\t" + player_ties;
    document.getElementById("general_quits").textContent = "Quits: \t\t\t" + player_quits;
    document.getElementById("general_overallelo").textContent = "Overall Elo: \t\t" + player_overall_elo;
    document.getElementById("general_overallpeakelo").textContent = "Overall Peak Elo: \t" + player_overall_peakelo;
    document.getElementById("general_level").textContent = "Level: \t\t\t" + player_overall_level + " (" + player_overall_xp + " XP)";
    document.getElementById("general_winningstreak").textContent = "Winningstreak: \t" + player_winningstreak;

    document.getElementById("mastermind_elo").textContent = "Elo: " + player_mastermind_elo;
    document.getElementById("mastermind_peakelo").textContent = "Peak Elo: " + player_mastermind_peakelo;
    document.getElementById("mastermind_games").textContent = "Games: " + player_mastermind_games;
    document.getElementById("mastermind_wins").textContent = "Wins: " + player_mastermind_wins + " (" + player_mastermind_winchance + ")";
    document.getElementById("mastermind_level").textContent = "Level: " + player_mastermind_level + " (" + player_mastermind_xp + " XP)";

    document.getElementById("element_elo").textContent = "Elo: " + player_element_elo;
    document.getElementById("element_peakelo").textContent = "Peak Elo: " + player_element_peakelo;
    document.getElementById("element_games").textContent = "Games: " + player_element_games;
    document.getElementById("element_wins").textContent = "Wins: " + player_element_wins + " (" + player_element_winchance + ")";
    document.getElementById("element_level").textContent = "Level: " + player_element_level + " (" + player_element_xp + " XP)";

    document.getElementById("grove_elo").textContent = "Elo: " + player_grove_elo;
    document.getElementById("grove_peakelo").textContent = "Peak Elo: " + player_grove_peakelo;
    document.getElementById("grove_games").textContent = "Games: " + player_grove_games;
    document.getElementById("grove_wins").textContent = "Wins: " + player_grove_wins + " (" + player_grove_winchance + ")";
    document.getElementById("grove_level").textContent = "Level: " + player_grove_level + " (" + player_grove_xp + " XP)";

    document.getElementById("forsaken_elo").textContent = "Elo: " + player_forsaken_elo;
    document.getElementById("forsaken_peakelo").textContent = "Peak Elo: " + player_forsaken_peakelo;
    document.getElementById("forsaken_games").textContent = "Games: " + player_forsaken_games;
    document.getElementById("forsaken_wins").textContent = "Wins: " + player_forsaken_wins + " (" + player_forsaken_winchance + ")";
    document.getElementById("forsaken_level").textContent = "Level: " + player_forsaken_level + " (" + player_forsaken_xp + " XP)";

    document.getElementById("mech_elo").textContent = "Elo: " + player_mech_elo;
    document.getElementById("mech_peakelo").textContent = "Peak Elo: " + player_mech_peakelo;
    document.getElementById("mech_games").textContent = "Games: " + player_mech_games;
    document.getElementById("mech_wins").textContent = "Wins: " + player_mech_wins + " (" + player_mech_winchance + ")";
    document.getElementById("mech_level").textContent = "Level: " + player_mech_level + " (" + player_mech_xp + " XP)";
}


//builds
function toggleFilters() {
    var selector = document.getElementById("selector");
    var filter = document.getElementById("filter");
    if (selector.classList.contains("hidediv")) {
        selector.classList.toggle("hidediv");
        filter.textContent = "Hide Filters";
    }
    else {
        selector.classList.toggle("hidediv");
        filter.textContent = "Show Filters";
    }
}

function drawPlayerBuilds(gameX) {
    //player = JSON.parse(jsonResponse);
    player_name = player.playername;
    player_id = player.id;
    //console.log("drawPlayerBuilds player name: " + player_name);
    game = gameX;
    //console.log("drawPlayerBuilds game:");
    //console.log(game);
    player_count = 51; //amount of games
    games = [0, 0, 0, 0, 0];
    gamesNeu = [0, 0, 0, 0, 0];
    wins = [0, 0, 0, 0, 0];
    anzahl = 0;
    leaks = new Array(5);
    sends = new Array(5);
    sendchance = new Array(5)
    builds = new Array(5);
    for (var i = 0; i < leaks.length; i++) {
        leaks[i] = new Array(21);
        sends[i] = new Array(21);
        builds[i] = new Array(21);
        sendchance[i] = new Array(21);
        for (var e = 0; e < 21; e++) {
            //builds[i][e] = new Array (units.length);
            builds[i][e] = new Array(60);
            leaks[i][e] = 0;
            sendchance[i][e] = 0;
            sends[i][e] = new Array(60);
            for (var p = 0; p < 60; p++) {
                builds[i][e][p] = 0;
                sends[i][e][p] = 0;
            }
        }
    }
    var target_race = 0;
    switch (document.getElementById("setRace2").value) {
        case "Mastermind":
            target_race = 0;
            break;
        case "Element":
            target_race = 1;
            break;
        case "Grove":
            target_race = 2;
            break;
        case "Forsaken":
            target_race = 3;
            break;
        case "Mech":
            target_race = 4;
            break;
    }

    for (i = 0; i < game.length; i++) {
        /*raceint:
        0=Mastermind
        1=Element
        2=Grove
        3=Forsaken
        4=Mech
        */
        if (game[i].queuetype === "Normal") //ranked only
        {
            wave = parseInt(game[i].wave);
            //if (wave > 15) console.log(wave);
            var raceint = 0;
            switch (game[i].legion) {
                case "Mastermind":
                    raceint = 0;
                    break;
                case "Element":
                    raceint = 1;
                    break;
                case "Grove":
                    raceint = 2;
                    break;
                case "Forsaken":
                    raceint = 3;
                    break;
                case "Mech":
                    raceint = 4;
                    break;
            }

            //total # of ranked games
            games[raceint]++;
            //gamesNeu: games with newer data and leaks 
            if (game[i].leaksPerWave !== null && wave - 1 > document.getElementById("setWave2").value - 1 && game[i].mercsReceivedPerWave !== null) gamesNeu[raceint]++;
            //wins
            if (game[i].gameresult === "won") wins[raceint]++;
            //check leaks for every wave and store them in leaks[][]
            //console.log(player.filteredGamesQuery.games[i].unitsPerWave);
            for (var e = 0; e < wave - 1; e++) {
                //check for newer data
                //console.log(game[i]);
                //Chance to leak:
                if (game[i].leaksPerWave !== null && game[i].mercsReceivedPerWave !== null) {
                    if (game[i].leaksPerWave.length > 0 && game[i].mercsReceivedPerWave.length > 0) {
                        if (game[i].leaksPerWave[e].length > 0 && game[i].mercsReceivedPerWave[e].length > 0) {
                            //amount of games where he leaked
                            leaks[raceint][e] = leaks[raceint][e] + 1;
                        }
                    }
                }
                //Chance to send
                if (game[i].mercsSentPerWave !== null) {
                    if (game[i].mercsSentPerWave.length > 0) {
                        if (game[i].mercsSentPerWave[e].length > 0) {
                            //amount of games where he leaked
                            sendchance[raceint][e] = sendchance[raceint][e] + 1;
                        }
                    }
                }
                game[i].unitsPerWave[e].forEach(function (element) {

                    //e=wave ;x=verschiedene units
                    var anzahl = 0;
                    for (var x = 0; x < 60; x++) {
                        if (builds[raceint][e][x] != 0) {
                            //einheit vorhanden
                            //console.log(element.substring(0, element.indexOf("_unit")));
                            if (builds[raceint][e][x].includes(element.substring(0, element.indexOf("_unit")))) {
                                anzahl = parseInt(builds[raceint][e][x].substring(builds[raceint][e][x].indexOf(";") + 1));
                                //console.log(builds[raceint][e][x].substring(builds[raceint][e][x].indexOf(";") + 1));
                                anzahl++;
                                //console.log(element);
                                builds[raceint][e][x] = element.substring(0, element.indexOf("_unit")) + ";" + anzahl;

                            }
                        }

                    }
                    //einheit noch nicht vorhanden; f�ge an n�chster freie stelle ein
                    if (anzahl > 0 == false) {
                        for (var x = 0; x < 60; x++) {
                            if (builds[raceint][e][x] == 0) {
                                builds[raceint][e][x] = element.substring(0, element.indexOf("_unit")) + ";1";
                                break;
                            }
                        }
                    }

                });

                game[i].mercsSentPerWave[e].forEach(function (element) {
                    var anzahl = 0;
                    for (var x = 0; x < 60; x++) {
                        if (sends[raceint][e][x] != 0) {
                            //einheit vorhanden
                            //console.log(element);
                            if (sends[raceint][e][x].includes(element)) {
                                anzahl = parseInt(sends[raceint][e][x].substring(sends[raceint][e][x].indexOf(";") + 1));
                                //console.log(builds[raceint][e][x].substring(builds[raceint][e][x].indexOf(";") + 1));
                                anzahl++;
                                sends[raceint][e][x] = element + ";" + anzahl;

                            }
                        }

                    }
                    //einheit noch nicht vorhanden; f�ge an n�chster freie stelle ein
                    if (anzahl > 0 == false) {

                        for (var x = 0; x < 60; x++) {
                            if (sends[raceint][e][x] == 0) {
                                sends[raceint][e][x] = element + ";1";
                                break;
                            }
                        }
                    }
                });

            }

        }
        else {
            player_count++;
        }

    }
    //console.log(sends);

    var chancetoleak = (leaks[target_race][document.getElementById("setWave2").value - 1] / gamesNeu[target_race] * 100).toFixed(2);
    var chancetosend = (sendchance[target_race][document.getElementById("setWave2").value - 1] / gamesNeu[target_race] * 100).toFixed(2);
    var favunit = []
    meineBuilds = builds[target_race][[document.getElementById("setWave2").value - 1]];
    meineSends = sends[target_race][[document.getElementById("setWave2").value - 1]];
    if (chancetoleak == 'NaN') chancetoleak = "no data";
    else if (chancetoleak == 0) chancetoleak = "0";
    if (chancetosend == 'NaN') chancetosend = "no data";
    else if (chancetosend == 0) chancetosend = "0";
    document.getElementById("playername").textContent = player_name;
    document.getElementById("totalgames").textContent = "Games reached wave " + document.getElementById("setWave2").value + ": " + gamesNeu[target_race];
    document.getElementById("chancetoleak").textContent = "Chance to leak wave " + document.getElementById("setWave2").value + " with " + document.getElementById("setRace2").value + ": " + chancetoleak;
    document.getElementById("chancetosend").textContent = "Chance to send on wave " + document.getElementById("setWave2").value + " with " + document.getElementById("setRace2").value + ": " + chancetosend;
    if (chancetoleak !== "no data") document.getElementById("chancetoleak").textContent = document.getElementById("chancetoleak").textContent += "%";
    if (chancetosend !== "no data") document.getElementById("chancetosend").textContent = document.getElementById("chancetosend").textContent += "%";

    var buildcontainer = document.getElementById("avgbuild");
    var sendcontainer = document.getElementById("avgsend");
    buildcontainer.innerHTML = "";
    sendcontainer.innerHTML = "";
    builds[target_race][[document.getElementById("setWave2").value - 1]].sort(function (a, b) {
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
    sends[target_race][[document.getElementById("setWave2").value - 1]].sort(function (a, b) {
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
    //console.log(builds[target_race]);

    builds[target_race][[document.getElementById("setWave2").value - 1]].forEach(function (ele) {

        if (ele != 0) {
            switch (ele.substring(0, ele.indexOf(";"))) {
                case "proton":
                    var url = "/img/icons/Proton.png";
                    var unit_type = "Proton";
                    break;
                case "atom":
                    var url = "/img/icons/Atom.png";
                    var unit_type = "Atom";
                    break;
                case "aqua_spirit":
                    var url = "/img/icons/AquaSpirit.png";
                    var unit_type = "Aqua Spirit";
                    break;
                case "fire_elemental":
                    var url = "/img/icons/FireElemental.png";
                    var unit_type = "Fire Elemental";
                    break;
                case "rogue_wave":
                    var url = "/img/icons/RogueWave.png";
                    var unit_type = "Rogue Wave";
                    break;
                case "windhawk":
                    var url = "/img/icons/Windhawk.png";
                    var unit_type = "Windhawk";
                    break;
                case "violet":
                    var url = "/img/icons/Violet.png";
                    var unit_type = "Violet";
                    break;
                case "mudman":
                    var url = "/img/icons/Mudman.png";
                    var unit_type = "Mudman";
                    break;
                case "golem":
                    var url = "/img/icons/Golem.png";
                    var unit_type = "Golem";
                    break;
                case "disciple":
                    var url = "/img/icons/Disciple.png";
                    var unit_type = "Disciple";
                    break;
                case "starcaller":
                    var url = "/img/icons/Starcaller.png";
                    var unit_type = "Starcaller";
                    break;
                case "fire_lord":
                    var url = "/img/icons/FireLord.png";
                    var unit_type = "Fire Lord";
                    break;
                case "fenix":
                    var url = "/img/icons/Fenix.png";
                    var unit_type = "Fenix";
                    break;
                //grove
                case "buzz":
                    var url = "/img/icons/Buzz.png";
                    var unit_type = "Buzz";
                    break;
                case "consort":
                    var url = "/img/icons/Consort.png";
                    var unit_type = "Consort";
                    break;
                case "ranger":
                    var url = "/img/icons/Ranger.png";
                    var unit_type = "Ranger";
                    break;
                case "daphne":
                    var url = "/img/icons/Daphne.png";
                    var unit_type = "Daphne";
                    break;
                case "wileshroom":
                    var url = "/img/icons/Wileshroom.png";
                    var unit_type = "Wileshroom";
                    break;
                case "canopie":
                    var url = "/img/icons/Canopie.png";
                    var unit_type = "Canopie";
                    break;
                case "honeyflower":
                    var url = "/img/icons/Honeyflower.png";
                    var unit_type = "Honeyflower";
                    break;
                case "deathcap":
                    var url = "/img/icons/Deathcap.png";
                    var unit_type = "Deathcap";
                    break;
                case "antler":
                    var url = "/img/icons/Antler.png";
                    var unit_type = "Antler";
                    break;
                case "whitemane":
                    var url = "/img/icons/Whitemane.png";
                    var unit_type = "Whitemane";
                    break;
                case "banana_bunk":
                    var url = "/img/icons/BananaBunk.png";
                    var unit_type = "Banana Bunk";
                    break;
                case "banana_haven":
                    var url = "/img/icons/BananaHaven.png";
                    var unit_type = "Banana Haven";
                    break;
                //forsaken
                case "bone_warrior":
                    var url = "/img/icons/BoneWarrior.png";
                    var unit_type = "Bone Warrior";
                    break;
                case "bone_crusher":
                    var url = "/img/icons/BoneCrusher.png";
                    var unit_type = "Bone Crusher";
                    break;
                case "dark_mage":
                    var url = "/img/icons/DarkMage.png";
                    var unit_type = "Dark Mage";
                    break;
                case "fire_archer":
                    var url = "/img/icons/FireArcher.png";
                    var unit_type = "Fire Archer";
                    break;
                case "gargoyle":
                    var url = "/img/icons/Gargoyle.png";
                    var unit_type = "Gargoyle";
                    break;
                case "green_devil":
                    var url = "/img/icons/GreenDevil.png";
                    var unit_type = "Green Devil";
                    break;
                case "gateguard":
                    var url = "/img/icons/Gateguard.png";
                    var unit_type = "Gateguard";
                    break;
                case "harbinger":
                    var url = "/img/icons/Harbinger.png";
                    var unit_type = "Harbinger";
                    break;
                case "butcher":
                    var url = "/img/icons/Butcher.png";
                    var unit_type = "Butcher";
                    break;
                case "head_chef":
                    var url = "/img/icons/HeadChef.png";
                    var unit_type = "Head Chef";
                    break;
                case "nightmare":
                    var url = "/img/icons/Nightmare.png";
                    var unit_type = "Nightmare";
                    break;
                case "doppelganger":
                    var url = "/img/icons/Doppelganger.png";
                    var unit_type = "Doppelganger";
                    break;
                case "lord_of_death":
                    var url = "/img/icons/LordOfDeath.png";
                    var unit_type = "Lord Of Death";
                    break;
                case "hades":
                    var url = "/img/icons/Hades.png";
                    var unit_type = "Hades";
                    break;
                //mech
                case "peewee":
                    var url = "/img/icons/Peewee.png";
                    var unit_type = "Peewee";
                    break;
                case "veteran":
                    var url = "/img/icons/Veteran.png";
                    var unit_type = "Veteran";
                    break;
                case "bazooka":
                    var url = "/img/icons/Bazooka.png";
                    var unit_type = "Bazooka";
                    break;
                case "zeus":
                    var url = "/img/icons/Zeus.png";
                    var unit_type = "Zeus";
                    break;
                case "pyro":
                    var url = "/img/icons/Pyro.png";
                    var unit_type = "Pyro";
                    break;
                case "tempest":
                    var url = "/img/icons/Tempest.png";
                    var unit_type = "Tempest";
                    break;
                case "leviathan":
                    var url = "/img/icons/Leviathan.png";
                    var unit_type = "Leviathan";
                    break;
                case "aps":
                    var url = "/img/icons/APS.png";
                    var unit_type = "APS";
                    break;
                case "mps":
                    var url = "/img/icons/MPS.png";
                    var unit_type = "MPS";
                    break;
                case "berserker":
                    var url = "/img/icons/Berserker.png";
                    var unit_type = "Berserker";
                    break;
                case "fatalizer":
                    var url = "/img/icons/Fatalizer.png";
                    var unit_type = "Fatalizer";
                    break;
                case "millennium":
                    var url = "/img/icons/Millennium.png";
                    var unit_type = "Millennium";
                    break;
                case "doomsday_machine":
                    var url = "/img/icons/DoomsdayMachine.png";
                    var unit_type = "Doomsday Machine";
                    break;
                // Atlantean
                case "pollywog":
                    var url = "/img/icons/Pollywog.png";
                    var unit_type = "Pollywog";
                    break
                case "devilfish":
                    var url = "/img/icons/Devilfish.png";
                    var unit_type = "Devilfish";
                    break
                case "seraphin":
                    var url = "/img/icons/Seraphin.png";
                    var unit_type = "Seraphin";
                    break
                case "angler":
                    var url = "/img/icons/Angler.png";
                    var unit_type = "Angler";
                    break;
                case "bounty_hunter":
                    var url = "/img/icons/BountyHunter.png";
                    var unit_type = "Bounty Hunter";
                    break;
                case "kingpin":
                    var url = "/img/icons/Kingpin.png";
                    var unit_type = "Kingpin";
                    break;
                case "sea_serpent":
                    var url = "/img/icons/SeaSerpent.png";
                    var unit_type = "Sea Serpent";
                    break;
                case "deepcoiler":
                    var url = "/img/icons/Deepcoiler.png";
                    var unit_type = "Deepcoiler";
                    break;
                case "grarl":
                    var url = "/img/icons/Grarl.png";
                    var unit_type = "Grarl";
                    break;
                case "king_claw":
                    var url = "/img/icons/KingClaw.png";
                    var unit_type = "King Claw";
                    break
                case "ocean_templar":
                    var url = "/img/icons/OceanTemplar.png";
                    var unit_type = "Ocean Templar";
                    break
                case "eggsack":
                    var url = "/img/icons/Eggsack.png";
                    var unit_type = "Eggsack";
                    break
                case "Hydra":
                    var url = "/img/icons/Hydra.png";
                    var unit_type = "Hydra";
                    break
                default:
                    var url = "";
                    var unit_type = "empty";
                    console.log(ele);
                    break;
            }
            buildcontainer.innerHTML += "<img src='" + url + "' height='20px' width='20px'> " + unit_type + " (" + (parseInt(ele.substring(ele.indexOf(";") + 1)) / gamesNeu[target_race] * 100).toFixed(2) + "%) <br>";
        }
    });


    sends[target_race][[document.getElementById("setWave2").value - 1]].forEach(function (ele) {
        if (ele != 0) {

            sendcontainer.innerHTML += "<img src='/img/icons/" + ele.substring(0, ele.indexOf(";")).replace(" ", "") + ".png' height='20px' width='20px'> " + ele.substring(0, ele.indexOf(";")) + " (" + (parseInt(ele.substring(ele.indexOf(";") + 1)) / gamesNeu[target_race] * 100).toFixed(2) + "%) <br>";
        }
    });
    //console.log(sends);
    //console.log(builds);
    /*
    console.log("Leaks on "+document.getElementById("setWave2").value+": "+leaks[target_race][document.getElementById("setWave2").value-1]);
    console.log("Games: " + gamesNeu[target_race]);
    for (var i = 0; i < builds[target_race][[document.getElementById("setWave2").value - 1]].length; i++)
    {
        if (builds[target_race][[document.getElementById("setWave2").value - 1]][i] != 0) console.log(builds[target_race][[document.getElementById("setWave2").value - 1]][i]);
    }
    */
}
//gamedetails
$('#tab_top_3').on('click', function () {

    if (document.getElementById("playername").value) {

        drawGameDetails(0);
        return false;
    }

}
);

function listGames() {
    var selector = document.getElementById("setGame");
    for (i = 0; i < games.length; i++) {
        var option = document.createElement("option");
        //console.log(games[i]);
        var timestamp = games[i].ts.substring(0, games[i].ts.indexOf(".")).replace("T", " ");
        var legion = "";
        var currelo = 0;
        var pastelo = 0;
        try {
            var gameDetail = games[i]['gameDetails'].filter(gameDetail => gameDetail['playername'] == player.playername)[0];
            legion = ", Legion: " + gameDetail['legion'];
            if (i > 0) {
                var gameDetail = games[i - 1]['gameDetails'].filter(gameDetail => gameDetail['playername'] == player.playername)[0];
                currelo = gameDetail['overallElo'];
            }
            else currelo = parseInt(player.statistics.overallElo);
            var gameDetail = games[i]['gameDetails'].filter(gameDetail => gameDetail['playername'] == player.playername)[0];
            pastelo = gameDetail['overallElo'];
            var elochange = 0;
            elochange = currelo - pastelo;

        } catch (err) {
            // Catch games that error out with no game detail.
            console.log(err);
        }

        var gameid_hex = dec2hex(games[i].game_id).toUpperCase();
        if (elochange > 0) option.text = games[i].queuetype + ": " + timestamp.substring(0, timestamp.length - 3) + " UTC, ID: " + gameid_hex + legion + ", Elo: +" + elochange;
        else option.text = games[i].queuetype + ": " + timestamp.substring(0, timestamp.length - 3) + " UTC, ID: " + gameid_hex + legion + ", Elo: " + elochange;
        option.value = i;
        if (games[i].gameresult == "lost") option.style = "background-color: #FCA8A8;"
        else if (games[i].gameresult == "won") option.style = "background-color: #B7FBA3;"
        else option.style = "background-color: #e6e3e3;"
        //selector.remove(0);
        selector.add(option);

    }
}

function getGameDetails(pos, games) {
    //console.log(games);
    //console.log(pos);
    meinString = games[pos].gameDetails.filter(meinString => meinString.position == 1)[0];
    meinString1 = games[pos].gameDetails.filter(meinString => meinString.position == 2)[0];
    meinString2 = games[pos].gameDetails.filter(meinString => meinString.position == 5)[0];
    meinString3 = games[pos].gameDetails.filter(meinString => meinString.position == 6)[0];
    gameEvent = [meinString, meinString1, meinString2, meinString3];
    //console.log(gameEvent);
}

function getPlayerAmount() {
    return gameEvent[0].player_count;
}

function drawGameDetails(player_position) {
    var selectedGame = document.getElementById("setGame").value;
    getGameDetails(selectedGame, games);
    if (gameEvent[0]) {
        if (document.getElementById("setWave").value == "all") var wave = parseInt(gameEvent[0].wave) - 1;
        else var wave = parseInt(document.getElementById("setWave").value);
        for (var i = 0; i < 4; i++) {
            var neuesI = i + 1;
            document.getElementById("name_" + neuesI).innerHTML = "<a href='/profile?player=" + gameEvent[i].playername + "'>" + gameEvent[i].playername + "</a>";
            document.getElementById("elo_" + neuesI).textContent = gameEvent[i].overallElo;
            document.getElementById("legion_" + neuesI).textContent = gameEvent[i].legion;
            document.getElementById("value_" + neuesI).textContent = getPlayerValue(i, wave);
            document.getElementById("worker_" + neuesI).textContent = gameEvent[i].workersPerWave[wave - 1];
            document.getElementById("income_" + neuesI).textContent = getPlayerIncome(i, wave);
            document.getElementById("leaks_" + neuesI).textContent = getPlayerLeaks(i);
            if (gameEvent[i].playername == player_name) var position = i;

        }
        getPlayerBuild(player_position);
        //Summary:

        var gameId = dec2hex(games[selectedGame].game_id).toUpperCase();;
        document.getElementById("game_id").innerHTML = "Game #" + selectedGame + ",  ID: <a href='/replay?gameid=" + gameId + "'>" + gameId + "</a>";
        document.getElementById("game_date").textContent = "Date: " + games[selectedGame].ts.substring(0, games[selectedGame].ts.indexOf(".")).replace("T", " ")+" UTC";
        document.getElementById("game_result").textContent = "Result: " + games[selectedGame].gameresult;
        document.getElementById("game_wave").textContent = "Wave: " + games[selectedGame].wave;
        document.getElementById("game_time").textContent = "Time: " + (games[selectedGame].time / 60).toFixed(2) + " min";
    }
}
function dec2hex(str) { // .toString(16) only works up to 2^53
    var dec = str.toString().split(''), sum = [], hex = [], i, s
    while (dec.length) {
        s = 1 * dec.shift()
        for (i = 0; s || i < sum.length; i++) {
            s += (sum[i] || 0) * 10
            sum[i] = s % 16
            s = (s - sum[i]) / 16
        }
    }
    while (sum.length) {
        hex.push(sum.pop().toString(16))
    }
    return hex.join('')
}
function getPlayerValue(player, level) {
    try {
        var networth = gameEvent[player].netWorthPerWave[level - 1];
        //value = networth - workerval - gold für wave - gold für mercs auf wave
        var worker_cost = 50;
        var wave_value = 72;
        var merc_value = 6;
        var value = networth - worker_cost * gameEvent[player].workersPerWave[level - 1] - wave_value - merc_value;
        return value;
    }
    catch(error){
        console.log(error);
        return 0;
    }
}

function getPlayerIncome(player, level) {
    try {
        var income = gameEvent[player].incomePerWave[level - 1];
        return income;
    }
    catch (error) {
        console.log(error);
    }
    
}

function getPlayerBuild(player) {
    savedValue = player;
    //console.log(player);
    clearPictures();
    drawSquares();
    document.getElementById("gamedetails_build").innerHTML = "";
    if (document.getElementById("setWave").value == "all") var wave = parseInt(gameEvent[0].wave);
    else var wave = parseInt(document.getElementById("setWave").value);
    var meinBuild = gameEvent[player].unitsPerWave[wave - 1];
    counter = 0;
    meinBuild.forEach(element => {
        document.getElementById("gamedetails_build").innerHTML += element + "<br>";
        var meinX = element.substring(element.indexOf(":") + 1, element.indexOf("|"));
        var meinY = element.substring(element.indexOf("|") + 1);
        addPicture(meinX, meinY, element.substring(0, element.indexOf("_unit")));

    });
    getPlayerMercsSent(player);
    getPlayerMercsReceived(player);
}

function getPlayerMercsSent(player) {
    document.getElementById("gamedetails_mercs_sent").innerHTML = "";
    if (document.getElementById("setWave").value == "all") var wave = parseInt(gameEvent[0].wave);
    else var wave = parseInt(document.getElementById("setWave").value);
    var meinBuild = gameEvent[player].mercsSentPerWave[wave - 1];
    meinBuild.forEach(element => {
        document.getElementById("gamedetails_mercs_sent").innerHTML += element + "<br>";
    });
}

function getPlayerMercsReceived(player) {
    document.getElementById("gamedetails_mercs_received").innerHTML = "";
    if (document.getElementById("setWave").value == "all") var wave = parseInt(gameEvent[0].wave);
    else var wave = parseInt(document.getElementById("setWave").value);
    var meinBuild = gameEvent[player].mercsReceivedPerWave[wave - 1];
    meinBuild.forEach(element => {
        document.getElementById("gamedetails_mercs_received").innerHTML += element + "<br>";
    });
}

function getPlayerLeaks(player) {
    var player_leaks = 0;
    if (document.getElementById("setWave").value == "all") {

        for (var i = 0; i < gameEvent[0].wave; i++) {
            if (gameEvent[player].leaksPerWave[i]) {
                player_leaks += gameEvent[player].leaksPerWave[i].length;
            }
        }

        return player_leaks;

    }
    else {
        var wave = parseInt(document.getElementById("setWave").value);
        if (gameEvent[player].leaksPerWave[wave + 1]) player_leaks = gameEvent[player].leaksPerWave[wave + 1].length;
        return player_leaks;
    }

}

function addPicture(y, x, unit) {
    //überprüfe welche unit auf feld ist
    var neuesX = x * 2;
    var neuesY = y * 2;
    //icons
    switch (unit) {
        //element
        case "proton":
            var url = "/img/icons/Proton.png";
            var unit_type = "Proton";
            break;
        case "atom":
            var url = "/img/icons/Atom.png";
            var unit_type = "Atom";
            break;
        case "aqua_spirit":
            var url = "/img/icons/AquaSpirit.png";
            var unit_type = "AquaSpirit";
            break;
        case "fire_elemental":
            var url = "/img/icons/FireElemental.png";
            var unit_type = "FireElemental";
            break;
        case "rogue_wave":
            var url = "/img/icons/RogueWave.png";
            var unit_type = "RogueWave";
            break;
        case "windhawk":
            var url = "/img/icons/Windhawk.png";
            var unit_type = "Windhawk";
            break;
        case "violet":
            var url = "/img/icons/Violet.png";
            var unit_type = "Violet";
            break;
        case "mudman":
            var url = "/img/icons/Mudman.png";
            var unit_type = "Mudman";
            break;
        case "golem":
            var url = "/img/icons/Golem.png";
            var unit_type = "Golem";
            break;
        case "disciple":
            var url = "/img/icons/Disciple.png";
            var unit_type = "Disciple";
            break;
        case "starcaller":
            var url = "/img/icons/Starcaller.png";
            var unit_type = "Starcaller";
            break;
        case "fire_lord":
            var url = "/img/icons/FireLord.png";
            var unit_type = "FireLord";
            break;
        case "fenix":
            var url = "/img/icons/Fenix.png";
            var unit_type = "Fenix";
            break;
        //grove
        case "buzz":
            var url = "/img/icons/Buzz.png";
            var unit_type = "Buzz";
            break;
        case "consort":
            var url = "/img/icons/Consort.png";
            var unit_type = "Consort";
            break;
        case "ranger":
            var url = "/img/icons/Ranger.png";
            var unit_type = "Ranger";
            break;
        case "daphne":
            var url = "/img/icons/Daphne.png";
            var unit_type = "Daphne";
            break;
        case "wileshroom":
            var url = "/img/icons/Wileshroom.png";
            var unit_type = "Wileshroom";
            break;
        case "canopie":
            var url = "/img/icons/Canopie.png";
            var unit_type = "Canopie";
            break;
        case "honeyflower":
            var url = "/img/icons/Honeyflower.png";
            var unit_type = "Honeyflower";
            break;
        case "deathcap":
            var url = "/img/icons/Deathcap.png";
            var unit_type = "Deathcap";
            break;
        case "antler":
            var url = "/img/icons/Antler.png";
            var unit_type = "Antler";
            break;
        case "whitemane":
            var url = "/img/icons/Whitemane.png";
            var unit_type = "Whitemane";
            break;
        case "banana_bunk":
            var url = "/img/icons/BananaBunk.png";
            var unit_type = "BananaBunk";
            break;
        case "banana_haven":
            var url = "/img/icons/BananaHaven.png";
            var unit_type = "BananaHaven";
            break;
        //forsaken
        case "bone_warrior":
            var url = "/img/icons/BoneWarrior.png";
            var unit_type = "BoneWarriror";
            break;
        case "bone_crusher":
            var url = "/img/icons/BoneCrusher.png";
            var unit_type = "BoneCrusher";
            break;
        case "dark_mage":
            var url = "/img/icons/DarkMage.png";
            var unit_type = "DarkMage";
            break;
        case "fire_archer":
            var url = "/img/icons/FireArcher.png";
            var unit_type = "FireArcher";
            break;
        case "gargoyle":
            var url = "/img/icons/Gargoyle.png";
            var unit_type = "Gargoyle";
            break;
        case "green_devil":
            var url = "/img/icons/GreenDevil.png";
            var unit_type = "GreenDevil";
            break;
        case "gateguard":
            var url = "/img/icons/Gateguard.png";
            var unit_type = "Gateguard";
            break;
        case "harbinger":
            var url = "/img/icons/Harbinger.png";
            var unit_type = "Harbinger";
            break;
        case "butcher":
            var url = "/img/icons/Butcher.png";
            var unit_type = "Butcher";
            break;
        case "head_chef":
            var url = "/img/icons/HeadChef.png";
            var unit_type = "Headchef";
            break;
        case "nightmare":
            var url = "/img/icons/Nightmare.png";
            var unit_type = "Nightmare";
            break;
        case "doppelganger":
            var url = "/img/icons/Doppelganger.png";
            var unit_type = "Doppelganger";
            break;
        case "lord_of_death":
            var url = "/img/icons/LordOfDeath.png";
            var unit_type = "LordOfDeath";
            break;
        case "hades":
            var url = "/img/icons/Hades.png";
            var unit_type = "Hades";
            break;
        //mech
        case "peewee":
            var url = "/img/icons/Peewee.png";
            var unit_type = "Peewee";
            break;
        case "veteran":
            var url = "/img/icons/Veteran.png";
            var unit_type = "Veteran";
            break;
        case "bazooka":
            var url = "/img/icons/Bazooka.png";
            var unit_type = "Bazooka";
            break;
        case "zeus":
            var url = "/img/icons/Zeus.png";
            var unit_type = "Zeus";
            break;
        case "pyro":
            var url = "/img/icons/Pyro.png";
            var unit_type = "Pyro";
            break;
        case "tempest":
            var url = "/img/icons/Tempest.png";
            var unit_type = "Tempest";
            break;
        case "leviathan":
            var url = "/img/icons/Leviathan.png";
            var unit_type = "Leviathan";
            break;
        case "aps":
            var url = "/img/icons/APS.png";
            var unit_type = "APS";
            break;
        case "mps":
            var url = "/img/icons/MPS.png";
            var unit_type = "MPS";
            break;
        case "berserker":
            var url = "/img/icons/Berserker.png";
            var unit_type = "Berserker";
            break;
        case "fatalizer":
            var url = "/img/icons/Fatalizer.png";
            var unit_type = "Fatalizer";
            break;
        case "millennium":
            var url = "/img/icons/Millennium.png";
            var unit_type = "Millennium";
            break;
        case "doomsday_machine":
            var url = "/img/icons/DoomsdayMachine.png";
            var unit_type = "DoomsdayMachine";
            break;
        // Atlantean
        case "pollywog":
            var url = "/img/icons/Pollywog.png";
            var unit_type = "Pollywog";
            break
        case "devilfish":
            var url = "/img/icons/Devilfish.png";
            var unit_type = "Devilfish";
            break
        case "seraphin":
            var url = "/img/icons/Seraphin.png";
            var unit_type = "Seraphin";
            break
        case "angler":
            var url = "/img/icons/Angler.png";
            var unit_type = "Angler";
            break;
        case "bounty_hunter":
            var url = "/img/icons/BountyHunter.png";
            var unit_type = "Bounty Hunter";
            break;
        case "kingpin":
            var url = "/img/icons/Kingpin.png";
            var unit_type = "Kingpin";
            break;
        case "sea_serpent":
            var url = "/img/icons/SeaSerpent.png";
            var unit_type = "SeaSerpant";
            break;
        case "deepcoiler":
            var url = "/img/icons/Deepcoiler.png";
            var unit_type = "DeepCoiler";
            break;
        case "grarl":
            var url = "/img/icons/Grarl.png";
            var unit_type = "Grarl";
            break;
        case "king_claw":
            var url = "/img/icons/KingClaw.png";
            var unit_type = "King Claw";
            break
        case "ocean_templar":
            var url = "/img/icons/OceanTemplar.png";
            var unit_type = "Ocean Templar";
            break
        default:
            var url = "";
            var unit_type = "empty";
            console.log("missing unit: " + unit);
            break;
    }



    //canvas einfügen
    //console.log(neuesX + ", " + neuesY);
    var zielspalte = document.getElementById(neuesX + "." + neuesY);
    zielspalte.style = "border: 0px;";
    zielspalte.title = unit_type;
    meinCanvas1 = document.createElement("canvas");
    meinCanvas1.setAttribute("id", unit_type + " 1");
    meinCanvas1.setAttribute("class", "kleinerCanvas");
    var el1 = zielspalte.appendChild(meinCanvas1);
    //var el1 = document.getElementById(unit_type+ " 1");
    var zielspalte = document.getElementById((neuesX + 1) + "." + neuesY);
    zielspalte.style = "border: 0px;";
    zielspalte.title = unit_type;
    meinCanvas2 = document.createElement("canvas");
    meinCanvas2.setAttribute("id", unit_type + " 2");
    meinCanvas2.setAttribute("class", "kleinerCanvas");
    var el2 = zielspalte.appendChild(meinCanvas2);
    var zielspalte = document.getElementById(neuesX + "." + (neuesY + 1));
    //console.log(neuesX + ", "+neuesY);
    zielspalte.style = "border: 0px;";
    zielspalte.title = unit_type;
    meinCanvas3 = document.createElement("canvas");
    meinCanvas3.setAttribute("id", unit_type + " 3");
    meinCanvas3.setAttribute("class", "kleinerCanvas");
    var el3 = zielspalte.appendChild(meinCanvas3);
    var zielspalte = document.getElementById((neuesX + 1) + "." + (neuesY + 1));
    zielspalte.style = "border: 0px;";
    zielspalte.title = unit_type;
    meinCanvas4 = document.createElement("canvas");
    meinCanvas4.setAttribute("id", unit_type + " 4");
    meinCanvas4.setAttribute("class", "kleinerCanvas");
    var el4 = zielspalte.appendChild(meinCanvas4);

    // bild in canvas (4 teile)
    var meinBild1 = document.createElement("img");
    meinBild1.src = url;
    meinBild1.onload = function () {
        //1
        var ctx = el1.getContext('2d');
        ctx.drawImage(meinBild1, 0, 32, 32, 32, 0, 0, 300, 150);
        //2
        ctx = el2.getContext('2d');
        ctx.drawImage(meinBild1, 0, 0, 32, 32, 0, 0, 300, 150);
        //3
        ctx = el3.getContext('2d');
        ctx.drawImage(meinBild1, 32, 32, 32, 32, 0, 0, 300, 150);
        //4
        ctx = el4.getContext('2d');
        ctx.drawImage(meinBild1, 32, 0, 32, 32, 0, 0, 300, 150);
    }
}

function clearPictures() {

    for (var i = 28; i > 0; i--) {
        for (var e = 1; e < 19; e++) {
            document.getElementById(i + "." + e).innerHTML = "";
            document.getElementById(i + "." + e).style = "border: 1px solid black; background-color: white;";

        }

    }
}

function getIcon(unit) {

}

function showBuild() {

    if (document.getElementsByClassName("hidden").length == 0) {
        document.getElementById("divumtable").setAttribute("class", "hidden");
    }
    else {
        document.getElementById("divumtable").setAttribute("class", "");
    }
}

document.onkeydown = function (event) {
    if (event.keyCode == 13) {
        if (event.target.id == "playername") setPlayer();
    }

    if (document.getElementById("tab_top_3").className == "tab_top_active") {
        if ((event.keyCode == 38 && event.target.id != "setGame") || (event.keyCode == 39 && event.target.id != "setGame") || event.keyCode == 107) {
            if (document.getElementById("setWave").value < gameEvent[0].wave) {
                if (event.target.id != "setWave") {
                    var waveValue = parseInt(document.getElementById("setWave").value) + 1;
                    document.getElementById("setWave").value = waveValue;
                }
                drawGameDetails(savedValue);
            }
            else if (document.getElementById("setWave").value == "all") {
                if (event.target.id != "setWave") {
                    document.getElementById("setWave").value = "1";
                }
                drawGameDetails(savedValue);
            }
            else if (document.getElementById("setWave").value == (gameEvent[0].wave)) {
                document.getElementById("setWave").value = "all";
            }

        }
        if ((event.keyCode == 37 && event.target.id != "setGame") || (event.keyCode == 40 && event.target.id != "setGame") || event.keyCode == 109) {
            if (document.getElementById("setWave").value > 1) {
                if (event.target.id != "setWave") {
                    document.getElementById("setWave").value -= 1;
                }
                drawGameDetails(savedValue);
            }
            else if (document.getElementById("setWave").value == "all") {
                if (event.target.id != "setWave") {
                    document.getElementById("setWave").value = gameEvent[0].wave;
                }
                drawGameDetails(savedValue);
            }
            else if (document.getElementById("setWave").value == "1") {
                if (event.target.id != "setWave") {
                    document.getElementById("setWave").value = "all";
                }
                drawGameDetails(savedValue);
            }
        }
    }

    if (document.getElementById("tab_top_5").className == "tab_top_active") {
        if (event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 107) {
            if (document.getElementById("setWave2").value < 21) {
                if (event.target.id != "setWave2") {
                    var waveValue = parseInt(document.getElementById("setWave2").value) + 1;
                    document.getElementById("setWave2").value = waveValue;
                }
                drawPlayerBuilds(playerGames);
            }
            else if (document.getElementById("setWave2").value == "21") {
                document.getElementById("setWave2").value = "1";
                drawPlayerBuilds(playerGames);
            }

        }
        if ((event.keyCode == 37 && event.target.id != "setWave2") || event.keyCode == 40 || event.keyCode == 109) {
            if (document.getElementById("setWave2").value > 1) {
                if (event.target.id != "setWave2") {
                    document.getElementById("setWave2").value -= 1;
                }
                drawPlayerBuilds(playerGames);
            }
            else if (document.getElementById("setWave2").value == "1") {
                if (event.target.id != "setWave2") {
                    document.getElementById("setWave2").value = "21";
                }
                drawPlayerBuilds(playerGames);
            }
        }
    }
}

// api

// player stats by name
//stats
function apiGetPlayer(callback, playername) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var player = JSON.parse(xhttp.response);
            callback(player);
        }
    };
    xhttp.open("GET", '/api/profile/player?playername=' + playername, true);
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
            loadStats(player);
            parseStats();

            return player;
        }
        
    }, playername);
}
//player overall games
//builds
function getPlayerOverallGames(callback, playername) {
    var xhttp = new XMLHttpRequest();

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
            playerGames = result.player.filteredGamesQuery.games;
            drawPlayerBuilds(playerGames);
            games = result.player.filteredGamesQuery.games;
            loadEloGraph(games);
            drawGameDetails(0);
            listGames();
            document.getElementById("mitte").style.display = "none";
            return playerGames;
        }
    }, playername);
}

//sql
//rank
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
        rank = result[0].Rank;
        parseRank(rank);
        return rank;
    }, playername);
}

function parseRank(rank) {
    document.getElementById("rank").textContent = "Rank: " + rank;
}

//adds thik lines to grid
function drawSquares() {
    var smalls = document.getElementsByClassName("pictable");
    Array.prototype.forEach.call(smalls, function (element) {
        var x = element.id.substring(element.id.indexOf(".") + 1);
        var y = element.id.substring(0, element.id.indexOf("."));
        if (x % 2 == 1) {

            element.style["border-left"] = "2px solid black";
        }
        else {

            element.style["border-right"] = "2px solid black";
        }
        if (y % 2 == 1) {
            element.style["border-bottom"] = "2px solid black";
        }
        else {
            element.style["border-top"] = "2px solid black";
        }
    });
}
