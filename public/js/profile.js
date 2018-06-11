// 1
function init() {

    getPlayer();


    
    
}

function getPlayer() {
    //lese url aus und erhalte spielernamen
    if(document.getElementById("playername").value.length>1)
    {
        var playername = document.getElementById("playername").value;
        window.location.hash = playername;
    }
    else
    {
        document.getElementById("playername").value=window.location.hash.substring(1);
    }
    checkContent();
}

function checkContent() {
    playerurl = window.location.href;
    playerurl = playerurl.substring(playerurl.lastIndexOf("#") + 1);
    while (playerurl.includes("+") || playerurl.includes("%20")) {
        playerurl = playerurl.replace("+", " ");
        playerurl = playerurl.replace("%20", " ");
    }
        if (document.getElementById("playername").value) 
        {
            document.getElementById("tab_box_1").innerHTML = "<div class='profile'><h1 id='player_name1' style='display:inline;'></h1><div id='playerbadge_level' style='display:inline;'></div><div id='playerbadge_rank' style='display:inline;'></div><h3 id='player_elo1'></h3><h4 id='player_performance1'></h4><div id='player_icon1'></div><div id='general' class='meinbalken_small'><div class='p'>General:</div></div><div id='element' class='meinbalken_small'><div class='p'>Element:</div></div><div id='grove' class='meinbalken_small'><div class='p'>Grove:</div></div><div id='forsaken' class='meinbalken_small'><div class='p'>Forsaken:</div></div><div id='mech' class='meinbalken_small'><div class='p'>Mech:</div></div><div id='mastermind' class='meinbalken_small'><div class='p'>Mastermind:</div></div></div><div class='meinbalken_big' id='grosserBalken'></div>";
            queryPlayer(playerurl);
            queryPlayerGames(playerurl, 100);
            queryPlayerOverallGames(playerurl);
        }
        else 
        {
            if(playerurl!="https://test.ltdstats.com/profile" && playerurl!="https://test.ltdstats.com/profile#")
            {
                document.getElementById("tab_box_1").innerHTML = "<div class='profile'><h1 id='player_name1' style='display:inline;'></h1><div id='playerbadge_level' style='display:inline;'></div><div id='playerbadge_rank' style='display:inline;'></div><h3 id='player_elo1'></h3><h4 id='player_performance1'></h4><div id='player_icon1'></div><div id='general' class='meinbalken_small'><div class='p'>General:</div></div><div id='element' class='meinbalken_small'><div class='p'>Element:</div></div><div id='grove' class='meinbalken_small'><div class='p'>Grove:</div></div><div id='forsaken' class='meinbalken_small'><div class='p'>Forsaken:</div></div><div id='mech' class='meinbalken_small'><div class='p'>Mech:</div></div><div id='mastermind' class='meinbalken_small'><div class='p'>Mastermind:</div></div></div><div class='meinbalken_big' id='grosserBalken'></div>";
                queryPlayer(playerurl);
                queryPlayerGames(playerurl, 100);
                queryPlayerOverallGames(playerurl);
            }
            else
            {
                document.getElementById("tab_box_1").textContent = "Select a player";
                openTab(1);
            }
        }
}

function loadEloGraph(games) {
    var counter = 0;
    var elo = [50];
    var date = [50];
    games.forEach(function (myEle) {
        if (counter < 50) {
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
                date[counter] = myEle.ts.substring(0, myEle.ts.indexOf(","));
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
                    date[counter] = myEle.ts.substring(0, myEle.ts.indexOf(","));
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
    document.getElementById("tab_box_2").innerHTML = "<div class='profile'><h1 id='player_name'>"+player_name+"</h1><div id='chartContainer'><canvas id='myChart'></canvas></div></div>";
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Elo',
                data: [],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            }
        }
    });

    for (var i = 0; i < 50; i++) {
        addData(myChart, date[i], elo[i]);
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
    //console.log(player);
    player_name = player.playername;
    //player_icon = player.AvatarUrl;
    //general
    player_totalgames = player.statistics.gamesPlayed;
    player_totalwins = player.statistics.wins;
    player_ties = player.statistics.ties;
    if (typeof player.statistics.ties == 'undefined') player_ties = 0;
    player_quits = player.statistics.quits;
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
    player_element_peakelo = player.statistics.elementPeakElo;
    if (typeof player.statistics.elementPeakElo == 'undefined') player_element_peakelo = player.statistics.elementPeakEloThisSeason;
    player_element_games = player.statistics.elementPlayed;
    player_element_wins = player.statistics.elementWins;
    player_element_losses = player.statistics.elementLosses;
    player_element_xp = player.statistics.elementXp;
    player_element_level = getPlayerLevel(player_element_xp);
    //grove
    player_grove_elo = player.statistics.groveElo;
    player_grove_peakelo = player.statistics.grovePeakElo;
    if (typeof player.statistics.grovePeakElo == 'undefined') player_grove_peakelo = player.statistics.grovePeakEloThisSeason;
    player_grove_games = player.statistics.grovePlayed;
    player_grove_wins = player.statistics.groveWins;
    player_grove_losses = player.statistics.groveLosses;
    player_grove_xp = player.statistics.groveXp;
    player_grove_level = getPlayerLevel(player_grove_xp);
    //forsaken
    player_forsaken_elo = player.statistics.forsakenElo;
    player_forsaken_peakelo = player.statistics.forsakenPeakElo;
    if (typeof player.statistics.forsakenPeakElo == 'undefined') player_forsaken_peakelo = player.statistics.forsakenPeakEloThisSeason;
    player_forsaken_games = player.statistics.forsakenPlayed;
    player_forsaken_wins = player.statistics.forsakenWins;
    player_forsaken_losses = player.statistics.forsakenLosses;
    player_forsaken_xp = player.statistics.forsakenXp;
    player_forsaken_level = getPlayerLevel(player_forsaken_xp);
    //mech
    player_mech_elo = player.statistics.mechElo;
    player_mech_peakelo = player.statistics.mechPeakElo;
    if (typeof player.statistics.mechPeakElo == 'undefined') player_mech_peakelo = player.statistics.mechPeakEloThisSeason;
    player_mech_games = player.statistics.mechPlayed;
    player_mech_wins = player.statistics.mechWins;
    player_mech_losses = player.statistics.mechLosses;
    player_mech_xp = player.statistics.mechXp;
    player_mech_level = getPlayerLevel(player_mech_xp);
    //mastermind
    player_mastermind_elo = player.statistics.mastermindElo;
    player_mastermind_peakelo = player.statistics.mastermindPeakElo;
    if (typeof player.statistics.mastermindPeakElo == 'undefined') player_mastermind_peakelo = player.statistics.mastermindPeakEloThisSeason;
    player_mastermind_games = player.statistics.mastermindPlayed;
    player_mastermind_wins = player.statistics.mastermindWins;
    player_mastermind_losses = player.statistics.mastermindLosses;
    player_mastermind_xp = player.statistics.mastermindXp;
    player_mastermind_level = getPlayerLevel(player_mastermind_xp);

    player_crossgames = "5";
    player_partygames ="10";
    player_bestfriend = "YourMoma";
    player_archenemy = "Me"
    player_leakon1="0.05";
    player_sendon1="0.15";



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
    if(player_overall_level<10)
    {
        document.getElementById("playerbadge_level").innerHTML = "<img style='display:inline;float:right;width:100px;height:100px;' src='/img/icons/0" +  player_overall_level + ".png'>";
    } 
    else 
    {
        
        document.getElementById("playerbadge_level").innerHTML = "<img style='display:inline;float:right;width:100px;height:100px;' src='/img/icons/" + player_overall_level +".png'>";
    }
    //console.log(player_overall_level);
    if(player_overall_elo>1000 && player_overall_elo <1200) document.getElementById("playerbadge_rank").innerHTML = "<img style='display:inline;float:rightwidth:100px;height:100px;' src='/img/icons/Bronze.png'>";
    else if (player_overall_elo > 1200 && player_overall_elo < 1400) document.getElementById("playerbadge_rank").innerHTML = "<img style='display:inline;float:right;width:100px;height:100px;' src='/img/icons/Silver.png'>";
    else if (player_overall_elo > 1400 && player_overall_elo < 1600) document.getElementById("playerbadge_rank").innerHTML = "<img style='display:inline;float:right;width:100px;height:100px;' src='/img/icons/Gold.png'>";
    else if (player_overall_elo > 1600 && player_overall_elo < 1800) document.getElementById("playerbadge_rank").innerHTML = "<img style='display:inline;float:right;width:100px;height:100px;' src='/img/icons/Platinum.png'>";
    else if (player_overall_elo > 1800 && player_overall_elo < 2000) document.getElementById("playerbadge_rank").innerHTML = "<img style='display:inline;float:right;width:100px;height:100px;' src='/img/icons/Diamond.png'>";
    else if (player_overall_elo > 2000 && player_overall_elo < 2200) document.getElementById("playerbadge_rank").innerHTML = "<img style='display:inline;float:right;width:100px;height:100px;' src='/img/icons/Expert.png'>";
    else if (player_overall_elo > 2200 && player_overall_elo < 2400) document.getElementById("playerbadge_rank").innerHTML = "<img style='display:inline;float:right;width:100px;height:100px;' src='/img/icons/SeniorMaster.png'>";
    else if (player_overall_elo > 2400 && player_overall_elo < 2600) document.getElementById("playerbadge_rank").innerHTML = "<img style='display:inline;float:right;width:100px;height:100px;' src='/img/icons/Gradmaster.png'>";
    // mouseover details

    document.getElementById("general").addEventListener("mouseover", function () { createBig(0); });
    document.getElementById("element").addEventListener("mouseover", function () { createBig(1); });
    document.getElementById("grove").addEventListener("mouseover", function () { createBig(2); });
    document.getElementById("forsaken").addEventListener("mouseover", function () { createBig(3); });
    document.getElementById("mech").addEventListener("mouseover", function () { createBig(4); });
    document.getElementById("mastermind").addEventListener("mouseover", function () { createBig(5); });


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

function createBig(nummer) {
    // Ändere Inhalt/Layout der details
    switch (nummer) {
        //general
        case 0:
            document.getElementById("grosserBalken").setAttribute("style", "box-shadow: 1px 1px 16px rgb(138, 138, 138); heigth: 100px;")
            document.getElementById("grosserBalken").innerHTML = "General:<br>Wins: " + player_totalwins + "<br>Ties: " + player_ties + "<br>Quits: " + player_quits + "<br>Overall Elo: " + player_overall_elo + "<br>Overall Peak Elo: " + player_overall_peakelo + "<br>Level: " + player_overall_level + "<br>Winningstreak: " + player_winningstreak + "<br>";
            break;
        //element
        case 1:
            document.getElementById("grosserBalken").setAttribute("style", "box-shadow: 1px 1px 16px rgb(185, 173, 6); heigth: 100px;")
            document.getElementById("grosserBalken").innerHTML = "Element:<br>Elo: " + player_element_elo + "<br>Peak Elo: " + player_element_peakelo + "<br>Games: " + player_element_games + "<br>Wins: " + player_element_wins + "<br>Level: " + player_element_level;
            break;
        //grove
        case 2:
            document.getElementById("grosserBalken").setAttribute("style", "box-shadow: 1px 1px 16px rgb(17, 116, 17); heigth: 100px;")
            document.getElementById("grosserBalken").innerHTML = "Grove:<br>Elo: " + player_grove_elo + "<br>Peak Elo: " + player_grove_peakelo + "<br>Games: " + player_grove_games + "<br>Wins: " + player_grove_wins + "<br>Level: " + player_grove_level;
            break;
        //forsaken
        case 3:
            document.getElementById("grosserBalken").setAttribute("style", "box-shadow: 1px 1px 16px rgb(146, 1, 1); heigth: 100px;")
            document.getElementById("grosserBalken").innerHTML = "Forsaken:<br>Elo: " + player_forsaken_elo + "<br>Peak Elo: " + player_forsaken_peakelo + "<br>Games: " + player_forsaken_games + "<br>Wins: " + player_forsaken_wins + "<br>Level: " + player_forsaken_level;
            break;
        //mech
        case 4:
            document.getElementById("grosserBalken").setAttribute("style", "box-shadow: 1px 1px 16px rgb(33, 33, 158); heigth: 100px;")
            document.getElementById("grosserBalken").innerHTML = "Mech:<br>Elo: " + player_mech_elo + "<br>Peak Elo: " + player_mech_peakelo + "<br>Games: " + player_mech_games + "<br>Wins: " + player_mech_wins + "<br>Level: " + player_mech_level;
            break;
        //mastermind
        case 5:
            document.getElementById("grosserBalken").setAttribute("style", "box-shadow: 1px 1px 16px rgb(15, 15, 15); heigth: 100px;")
            document.getElementById("grosserBalken").innerHTML = "Mastermind:<br>Elo: " + player_mastermind_elo + "<br>Peak Elo: " + player_mastermind_peakelo + "<br>Games: " + player_mastermind_games + "<br>Wins: " + player_mastermind_wins + "<br>Level: " + player_mastermind_level;
            break;
        default:
            break;
    }

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
    builds = new Array(5);
    for (var i = 0; i < leaks.length; i++) {
        leaks[i] = new Array(21);
        sends[i] = new Array(21);
        builds[i] = new Array(21);
        for (var e = 0; e < 21; e++) {
            //builds[i][e] = new Array (units.length);
            builds[i][e] = new Array(60);
            for (var p = 0; p < 60; p++) {
                builds[i][e][p] = 0;
            }
            leaks[i][e] = 0;
            sends[i][e] = 0;
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
                if (game[i].leaksPerWave !== null && game[i].mercsReceivedPerWave !== null) if (game[i].leaksPerWave.length > 0 && game[i].mercsReceivedPerWave.length > 0) {
                    if (game[i].leaksPerWave[e].length > 0 && game[i].mercsReceivedPerWave[e].length > 0) {
                        //amount of games where he leaked
                        leaks[raceint][e] = leaks[raceint][e] + 1;
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
                                builds[raceint][e][x] = element.substring(0, element.indexOf("_unit")) + ";" + anzahl;

                            }
                        }

                    }
                    //einheit noch nicht vorhanden; f�ge an n�chster freie stelle ein
                    if (anzahl > 0 == false) {
                        for (var x = 0; x < 60; x++) {
                            if (builds[raceint][e][x] == 0) {
                                builds[raceint][e][x] = element.substring(0, element.indexOf("_unit")) + ";1";
                                x = 61;
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
    var chancetoleak = (leaks[target_race][document.getElementById("setWave2").value - 1] / gamesNeu[target_race] * 100).toFixed(2);
    var favunit = []
    meineBuilds = builds[target_race][[document.getElementById("setWave2").value - 1]];

    if (chancetoleak == 'NaN') chancetoleak = "no data";
    else if (chancetoleak == 0) chancetoleak = "0";
    document.getElementById("playername").textContent = player_name;
    document.getElementById("totalgames").textContent = "Games reached wave " + document.getElementById("setWave2").value + ": " + gamesNeu[target_race];
    document.getElementById("chancetoleak").textContent = "Chance to leak wave " + document.getElementById("setWave2").value + " with " + document.getElementById("setRace2").value + ": " + chancetoleak;
    if (chancetoleak !== "no data") document.getElementById("chancetoleak").textContent = document.getElementById("chancetoleak").textContent += "%";
    var buildcontainer = document.getElementById("avgbuild");
    buildcontainer.innerHTML = "";
    builds[target_race][[document.getElementById("setWave2").value - 1]].sort();
    //console.log(builds[target_race]);
    builds[target_race][[document.getElementById("setWave2").value - 1]].forEach(function (ele) {
        if (ele != 0) buildcontainer.innerHTML += ele.substring(0, ele.indexOf(";")) + " (" + (parseInt(ele.substring(ele.indexOf(";") + 1)) / gamesNeu[target_race] * 100).toFixed(2) + "%) <br>";
    });
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
        
        drawGameDetails();
        return false;
    }

}
);

function listGames() {
    var selector = document.getElementById("setGame");
    for (i = 0; i < 100; i++) {
        var option = document.createElement("option");
        option.text = games[i].queuetype+": "+games[i].ts + ", " + games[i].gameresult;
        option.value = i;
        if (games[i].gameresult == "lost") option.style = "background-color: #FCA8A8;"
        if (games[i].gameresult == "won") option.style = "background-color: #B7FBA3;"
        selector.add(option);
        
    }
}

function getGameDetails(pos, games) {
    //console.log(games[pos]);
    //console.log(games);
    //console.log(pos);
    meinString = games[pos].gameDetails[0];
    meinString1 = games[pos].gameDetails[1];
    meinString2 = games[pos].gameDetails[2];
    meinString3 = games[pos].gameDetails[3];
    gameEvent = [meinString, meinString1, meinString2, meinString3];
    //console.log(gameEvent);
}

function getPlayerAmount() {
    return gameEvent[0].player_count;
}

function drawGameDetails() {
    var selectedGame = document.getElementById("setGame").value;
    getGameDetails(selectedGame, games);
    if (document.getElementById("setWave").value == "all") var wave = parseInt(gameEvent[0].wave) - 1;
    else var wave = parseInt(document.getElementById("setWave").value);
    for (var i = 0; i < 4; i++) {
        var neuesI = i + 1;
        document.getElementById("name_" + neuesI).textContent = gameEvent[i].playername;
        document.getElementById("elo_" + neuesI).textContent = gameEvent[i].overallElo;
        document.getElementById("value_" + neuesI).textContent = getPlayerValue(i, wave);
        document.getElementById("worker_" + neuesI).textContent = gameEvent[i].workersPerWave[wave - 1];
        document.getElementById("income_" + neuesI).textContent = getPlayerIncome(i, wave);
        document.getElementById("leaks_" + neuesI).textContent = getPlayerLeaks(i);
        if (gameEvent[i].playername == player_name) var position = i;

    }
    getPlayerBuild(0);
    //Summary:
    document.getElementById("game_id").textContent = "Game #" + selectedGame + ", ID: " + games[selectedGame].game_id;
    document.getElementById("game_date").textContent = "Date: " + games[selectedGame].ts;
    document.getElementById("game_result").textContent = "Result: " + games[selectedGame].gameresult;
    document.getElementById("game_wave").textContent = "Wave: " + games[selectedGame].wave;
    document.getElementById("game_time").textContent = "Time: " + (games[selectedGame].time / 60).toFixed(2) + "min"; 
   
    



}

function getPlayerValue(player, level) {
    var networth = gameEvent[player].netWorthPerWave[level - 1];
    //value = networth - workerval - gold für wave - gold für mercs auf wave
    var worker_cost = 50;
    var wave_value = 72;
    var merc_value = 6;
    var value = networth - worker_cost * gameEvent[player].workersPerWave[level - 1] - wave_value - merc_value;
    return value;
}

function getPlayerIncome(player, level)
{
    var income = 0;
    for (var i = 0; i < level; i++) {
        var merc = gameEvent[player].mercsSentPerWave[i];
        merc.forEach(element => {
            switch (element) {
                case "Snail":
                    income += 6;
                    break;
                case "Giant Snail":
                    income += 6;
                    break;
                case "Fiend":
                    income += 12;
                    break;
                case "Lizard":
                    income += 12;
                    break;

            }
        });

    }
    if (gameEvent[player].legion == "Mastermind") income += 3;
    return income;
}

function getPlayerBuild(player) {
    savedValue = player;
    clearPictures();
    document.getElementById("gamedetails_build").innerHTML = "";
    if (document.getElementById("setWave").value == "all") var wave = parseInt(gameEvent[0].wave) - 1;
    else var wave = parseInt(document.getElementById("setWave").value);
    var meinBuild = gameEvent[player].unitsPerWave[wave - 1];
    //console.log(gameEvent[player].unitsPerWave);
    //console.log(wave);
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
    if (document.getElementById("setWave").value == "all") var wave = parseInt(gameEvent[0].wave) - 1;
    else var wave = parseInt(document.getElementById("setWave").value);
    var meinBuild = gameEvent[player].mercsSentPerWave[wave - 1];
    meinBuild.forEach(element => {
        document.getElementById("gamedetails_mercs_sent").innerHTML += element + "<br>";
    });
}

function getPlayerMercsReceived(player) {
    document.getElementById("gamedetails_mercs_received").innerHTML = "";
    if (document.getElementById("setWave").value == "all") var wave = parseInt(gameEvent[0].wave) - 1;
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
        case "whileshroom":
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
        case "sea_serpent":
            var url = "/img/icons/SeaSerpent.png";
            var unit_type = "SeaSerpant";
            break;
        case "deepcoiler":
            var url = "/img/icons/DeepCoiler.png";
            var unit_type = "DeepCoilwér";
            break;
        default:
            var url = "";
            var unit_type = "empty";
            break;
    }

    

    //canvas einfügen
    var zielspalte = document.getElementById(neuesX + "." + neuesY);
    zielspalte.style = "border: 0px;";
    meinCanvas1 = document.createElement("canvas");
    meinCanvas1.setAttribute("id", unit_type + " 1");
    meinCanvas1.setAttribute("class", "kleinerCanvas");
    var el1 = zielspalte.appendChild(meinCanvas1);
    //var el1 = document.getElementById(unit_type+ " 1");
    var zielspalte = document.getElementById((neuesX + 1) + "." + neuesY);
    zielspalte.style = "border: 0px;";
    meinCanvas2 = document.createElement("canvas");
    meinCanvas2.setAttribute("id", unit_type + " 2");
    meinCanvas2.setAttribute("class", "kleinerCanvas");
    var el2 = zielspalte.appendChild(meinCanvas2);
    var zielspalte = document.getElementById(neuesX + "." + (neuesY + 1));
    //console.log(neuesX + ", "+neuesY);
    zielspalte.style = "border: 0px;";
    meinCanvas3 = document.createElement("canvas");
    meinCanvas3.setAttribute("id", unit_type + " 3");
    meinCanvas3.setAttribute("class", "kleinerCanvas");
    var el3 = zielspalte.appendChild(meinCanvas3);
    var zielspalte = document.getElementById((neuesX + 1) + "." + (neuesY + 1));
    zielspalte.style = "border: 0px;";
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
        ctx.drawImage(meinBild1, 0, 0, 32, 32, 0, 0, 300, 150);
        //2
        ctx = el2.getContext('2d');
        ctx.drawImage(meinBild1, 0, 32, 32, 32, 0, 0, 300, 150);
        //3
        ctx = el3.getContext('2d');
        ctx.drawImage(meinBild1, 32, 0, 32, 32, 0, 0, 300, 150);
        //4
        ctx = el4.getContext('2d');
        ctx.drawImage(meinBild1, 32, 32, 32, 32, 0, 0, 300, 150);
    }




}

function clearPictures() {

    for (var i = 0; i < 28; i++) {
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
    if (document.getElementById("tab_top_3").className == "tab_top_active") {
        if (event.keyCode == 38 || event.keyCode == 39) {
            //console.log("up");
            if (document.getElementById("setWave").value < gameEvent[0].wave - 1) {
                var waveValue = parseInt(document.getElementById("setWave").value) + 1;
                document.getElementById("setWave").value = waveValue;
                drawGameDetails();
            }
            else if (document.getElementById("setWave").value == "all") {
                document.getElementById("setWave").value = "1";
                drawGameDetails();
                //console.log("all");
            }
            else if (document.getElementById("setWave").value == (gameEvent[0].wave - 1)) {
                document.getElementById("setWave").value = "all";
            }

        }
        if (event.keyCode == 37 || event.keyCode == 40) {
            if (document.getElementById("setWave").value > 1) {
                document.getElementById("setWave").value -= 1;
                drawGameDetails();
            }
            else if (document.getElementById("setWave").value == "all") {
                document.getElementById("setWave").value = gameEvent[0].wave - 1;
                drawGameDetails();
            }
            else if (document.getElementById("setWave").value == "1") {
                document.getElementById("setWave").value = "all";
                drawGameDetails();
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
    xhttp.open("GET", '/api?command=query{player(playername:"' + playername + '"){id,playername,statistics,badges,cards,items,fightercosmetics,trophies}}', true);
    xhttp.send();
}

function queryPlayer(playername) {
    apiGetPlayer(function (result) {
        result.player.statistics = JSON.parse(result.player.statistics);
        player = result.player
        loadStats(player);
        createBig(0);
        return player;
    }, playername);
}

// last x games by player
// elograph
// games
function getPlayerGames(callback, playername, gameamount) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var player = JSON.parse(xhttp.response);
            callback(player);
        }
    };
    xhttp.open("GET", '/api?command={player(playername:"' + playername + '"){filteredGamesQuery(limit:' + gameamount + '){games{game_id,ts,wave,time,queuetype,gameresult,gameDetails{playername,playerid,position,legion,wave,iscross,gameresult,overallElo,unitsPerWave,leaksPerWave,mercsReceivedPerWave,mercsSentPerWave,workersPerWave,netWorthPerWave}}}}}', true);
    xhttp.send();
}

function queryPlayerGames(playername, gameamount) {
    getPlayerGames(function (result) {
        //console.log(result.player.filteredGamesQuery.games);
        games = result.player.filteredGamesQuery.games;
        loadEloGraph(games);
        drawGameDetails();
        listGames();
        return games;

    }, playername, gameamount);
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
    xhttp.open("GET", '/api?command={player(playername:"'+playername+'"){filteredGamesQuery(limit:2000){count,games{game_id,ts,position,wave,time,queuetype,legion,iscross,gameresult,overallElo,unitsPerWave,leaksPerWave,mercsReceivedPerWave,mercsSentPerWave,workersPerWave,netWorthPerWave}}}}', true);
    xhttp.send();
}

function queryPlayerOverallGames(playername, gameamount) {
    getPlayerOverallGames(function (result) {
        playerGames = result.player.filteredGamesQuery.games;
        drawPlayerBuilds(playerGames);
        return playerGames;
    }, playername);
}