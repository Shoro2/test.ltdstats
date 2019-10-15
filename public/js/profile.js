function checkContent() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var playerurl = url.searchParams.get("player");
    if (playerurl !== null) {
        document.getElementById("playername").value = playerurl;
    }
    if (document.getElementById("playername").value) {
        document.getElementById("mitte").style.display = "inherit";
        queryPlayer(playerurl);
        queryLivegames();
        //queryRank(playerurl);
        queryPlayerOverallGames(playerurl);
    }
    else {

        document.getElementById("tab_box_1").textContent = "Select a player";
        var banner = '<div id="amazon_ad"></div>'
        document.getElementById("tab_box_1").innerHTML += banner;
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
                counter++;
            }
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

    for (var i = 0; i < elo.length; i++) {
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

function loadStats(player) {
    player_name = player.playername;
    player_id = player.id;
    player_icon = player.avatarUrl;
    //general
    player_totalgames = player.statistics.gamesPlayed; //total ranked games
    player_totalwins = player.statistics.wins; //overall ranked wins
    if (typeof player.statistics.wins == 'undefined') player_totalwins = 0;
    player_totalwinchance = player.statistics.winRate;
    if (player_totalwinchance == 'NaN') player_totalwinchance = 0;
    player_ties = player.statistics.ties;
    if (typeof player.statistics.ties == 'undefined') player_ties = 0;
    player_quits = player.statistics.quits;
    if (typeof player.statistics.quits == 'undefined') player_quits = 0;
    player_overall_elo = player.statistics.overallElo; //current elo season
    if (typeof player.statistics.overallPeakElo == 'undefined') player_overall_peakelo = player.statistics.overallPeakEloThisSeason;
    else player_overall_peakelo = player.statistics.overallPeakElo;
    player_overall_xp = player.statistics.totalXp;
    player_overall_level = getPlayerLevel(player_overall_xp);
    player_winningstreak = player.statistics.winStreak;
    console.log(player.bestFriends);
    if (player.bestFriends != undefined) {
        player_bestfriends = "";
        player_bestfriends += player.bestFriends[0].player.playername + " (" + player.bestFriends[0].gameCount + ")";
        if (player.bestFriends[1].player != null) {
            player_bestfriends += ", " + player.bestFriends[1].player.playername + " (" + player.bestFriends[1].gameCount + ")";
            if (player.bestFriends[2].player != null) {
                player_bestfriends += ", " + player.bestFriends[2].player.playername + " (" + player.bestFriends[2].gameCount + ")";
            }
        }
    }
    
    //icon für race mit meisten wins
    var bgimage = "mastermind_2.png";
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
    else if (player_overall_elo > 2400) document.getElementById("playerbadge_rank").innerHTML = "<img id='img_rank' src='/img/icons/Grandmaster.png'>";
    // mouseover details
    parseStats(player);
    document.getElementsByClassName("main-content")[0].setAttribute("style", "background-image: url('/img/" + bgimage + "');background-repeat: no-repeat;background-position:center;background-size: 23% 40%;opacity:1.0;");
    document.title = "LTDStats - " + player_name + "'s Profile";
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

//parses stats into profile tab1
function parseStats(player) {
    // top
    document.getElementById("playerLevel").textContent = "Level: " + player_overall_level + " (" + player_overall_xp + " XP)";
    // general

    
    document.getElementById("winStreak").textContent = "Winningstreak: " + player_winningstreak;
    // seasonal
    // overall
    document.getElementById("o_gamesPlayed").textContent = "Ranked Games: " + player_totalgames;
    document.getElementById("o_rankedWins").textContent = "Ranked Wins: " + player.statistics.wins + " (" + player_totalwinchance + "%)";
    if (player_bestfriends !== undefined) document.getElementById("bestFriends").innerHTML = "Played together with: " + player_bestfriends;





}

//toggle seasonal/overall view
$( "#toggleseason" ).click(function() {
    var seasonal = document.getElementById("seasonal");
    var overall = document.getElementById("overall");
    //check current view
    if(seasonal.style.display=="none"){
        overall.style.display="none";
        $( "#seasonal" ).fadeIn( "fast", function() {
            // Animation complete
            $("#toggleseason").text("Overall");
          });
    }
    else{
        seasonal.style.display="none";
        $( "#overall" ).fadeIn( "fast", function() {
            // Animation complete
            $("#toggleseason").text("Seasonal");
            
          });
    }
    
  });

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
    console.log(gameX);
    game = gameX;
    //console.log("drawPlayerBuilds game:");
    //console.log(game);
    player_count = 51; //amount of games
    games = [0, 0, 0, 0, 0, 0];
    gamesNeu = [0, 0, 0, 0, 0, 0];
    wins = [0, 0, 0, 0, 0, 0];
    anzahl = 0;
    leaks = new Array(6);
    sends = new Array(6);
    sendchance = new Array(6);
    builds = new Array(6);
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
        case "Atlantean":
            target_race = 5;
            break;
    }

    for (i = 0; i < game.length; i++) {
        /*raceint:
        0=Mastermind
        1=Element
        2=Grove
        3=Forsaken
        4=Mech
        5=Atlantean
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
                case "Atlantean":
                    raceint = 5;
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
                    //e=wave ;x=different units
                    var anzahl = 0;
                    for (var x = 0; x < 60; x++) {
                        if (builds[raceint][e][x] != 0) {
                            //unit matching?
                            if (builds[raceint][e][x].includes(element.substring(0, element.indexOf("_unit")))) {
                                anzahl = parseInt(builds[raceint][e][x].substring(builds[raceint][e][x].indexOf(";") + 1));
                                //console.log(builds[raceint][e][x].substring(builds[raceint][e][x].indexOf(";") + 1));
                                anzahl++;
                                //console.log(element);
                                builds[raceint][e][x] = element.substring(0, element.indexOf("_unit")) + ";" + anzahl;
                            }
                        }
                    }
                    //no match, add it
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
                            //match
                            //console.log(element);
                            if (sends[raceint][e][x].includes(element)) {
                                anzahl = parseInt(sends[raceint][e][x].substring(sends[raceint][e][x].indexOf(";") + 1));
                                //console.log(builds[raceint][e][x].substring(builds[raceint][e][x].indexOf(";") + 1));
                                anzahl++;
                                sends[raceint][e][x] = element + ";" + anzahl;
                            }
                        }
                    }
                    //no match, add it
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
            var url = "";
            url = "/img/icons/" + ele.substring(0, ele.indexOf(";")).charAt(0).toUpperCase() + ele.substring(0, ele.indexOf(";")).substring(1);
            while (url.includes("_")) {
                var index = url.indexOf("_");
                url = url.substring(0, index) + url.charAt(index + 1).toUpperCase() + url.substring(index + 2);
                url.replace("_", "%20");
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

            buildcontainer.innerHTML += "<img src='" + url + "' height='20px' width='20px'> " + unit_type + " (" + (parseInt(ele.substring(ele.indexOf(";") + 1)) / gamesNeu[target_race] * 100).toFixed(2) + "%) <br>";
        }
    });


    sends[target_race][[document.getElementById("setWave2").value - 1]].forEach(function (ele) {
        if (ele != 0) {

            sendcontainer.innerHTML += "<img src='/img/icons/" + ele.substring(0, ele.indexOf(";")).replace(" ", "") + ".png' height='20px' width='20px'> " + ele.substring(0, ele.indexOf(";")) + " (" + (parseInt(ele.substring(ele.indexOf(";") + 1)) / gamesNeu[target_race] * 100).toFixed(2) + "%) <br>";
        }
    });
    //gamedetails
    $('#tab_top_3').on('click', function () {
        if (document.getElementById("playername").value) {
            drawGameDetails(0);
            return false;
        }
    });
}

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
                    gameDetail = games[i - 1]['gameDetails'].filter(gameDetail => gameDetail['playername'] == player.playername)[0];
                    currelo = gameDetail['overallElo'];
                }
                else currelo = parseInt(player.statistics.overallElo);
                gameDetail = games[i]['gameDetails'].filter(gameDetail => gameDetail['playername'] == player.playername)[0];
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
        console.log(games[pos]);
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
        try {
            var selectedGame = document.getElementById("setGame").value;
            getGameDetails(selectedGame, games);
            if (gameEvent[0]) {
                if (document.getElementById("setWave").value == "all") var wave = parseInt(gameEvent[0].wave) - 1;
                else var wave = parseInt(document.getElementById("setWave").value);
                for (var i = 0; i < 4; i++) {
                    var neuesI = i + 1;
                    try {
                        document.getElementById("name_" + neuesI).innerHTML = "<a href='/profile?player=" + gameEvent[i].playername + "'>" + gameEvent[i].playername + "</a>";
                        document.getElementById("elo_" + neuesI).textContent = gameEvent[i].overallElo;
                        document.getElementById("legion_" + neuesI).textContent = gameEvent[i].legion;
                        document.getElementById("value_" + neuesI).textContent = getPlayerValue(i, wave);
                        document.getElementById("worker_" + neuesI).textContent = gameEvent[i].workersPerWave[wave - 1];
                        document.getElementById("income_" + neuesI).textContent = getPlayerIncome(i, wave);
                        document.getElementById("leaks_" + neuesI).textContent = getPlayerLeaks(i);
                        if (gameEvent[i].playername == player_name) var position = i;
                    }
                    catch{
                        console.log("failed to write game details");
                    }



                }
                getPlayerBuild(player_position);
                //Summary:

                var gameId = dec2hex(games[selectedGame].game_id).toUpperCase();;
                document.getElementById("game_id").innerHTML = "Game #" + selectedGame + ",  ID: <a href='/replay?gameid=" + gameId + "'>" + gameId + "</a>";
                document.getElementById("game_date").textContent = "Date: " + games[selectedGame].ts.substring(0, games[selectedGame].ts.indexOf(".")).replace("T", " ") + " UTC";
                document.getElementById("game_result").textContent = "Result: " + games[selectedGame].gameresult;
                document.getElementById("game_wave").textContent = "Wave: " + games[selectedGame].wave;
                document.getElementById("game_time").textContent = "Time: " + (games[selectedGame].time / 60).toFixed(2) + " min";
            }
        }
        catch (err) {
            console.log(err);
        }
        
    }
    function dec2hex(str) { // .toString(16) only works up to 2^53
        var dec = str.toString().split(''), sum = [], hex = [], i, s;
        while (dec.length) {
            s = 1 * dec.shift();
            for (i = 0; s || i < sum.length; i++) {
                s += (sum[i] || 0) * 10;
                sum[i] = s % 16;
                s = (s - sum[i]) / 16;
            }
        }
        while (sum.length) {
            hex.push(sum.pop().toString(16));
        }
        return hex.join('');
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
        catch (error) {
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
        try {
            meinBuild.forEach(element => {

                var meinX = element.substring(element.indexOf(":") + 1, element.indexOf("|"));
                var meinY = element.substring(element.indexOf("|") + 1);
                document.getElementById("gamedetails_build").innerHTML += element.substring(0, element.indexOf("_unit")) + " (" + meinX + ", " + meinY + ")" + "<br>";
                addPicture(meinX, meinY, element.substring(0, element.indexOf("_unit")));

            });
        }
        catch (error) {
            console.log(error);
        }
        
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
        };
    }

    function clearPictures() {
        for (var i = 28; i > 0; i--) {
            for (var e = 1; e < 19; e++) {
                document.getElementById(i + "." + e).innerHTML = "";
                document.getElementById(i + "." + e).style = "border: 1px solid black; background-color: white;";
            }
        }
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
function toggleIngame(livegames) {
    let name = document.getElementById("playername").value;
    //check for name in livegames
    for (var i = 0; i < livegames.length; i++) {
        if (livegames[i].players.includes(name)) {
            let target = document.getElementById("ingame");
            target.style.display = "block";
            if (livegames[i].gametype == "classic") target.innerHTML += " (Classic)";
            else target.innerHTML += " (Ranked)";
        }
    }
}
    // api
function getLivegames(callback) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var player = JSON.parse(xhttp.response);
            callback(player);
        }
    };
    xhttp.open("GET", '/api/getLivegames', true);
    xhttp.send();
}

function queryLivegames() {
    getLivegames(function (result) {
        if (!result) {
            document.getElementById("apierror").style.display = "";
        }
        else {
            toggleIngame(JSON.parse(result));
            return result;
        }
    });
}
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
            if (result.player === null) {
                document.getElementById("apierror").style.display = "";
            }
            else {
                result.player.statistics = JSON.parse(result.player.statistics);
                player = result.player;
                loadStats(player);
                parseStats(player);
                hideLoad();
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
