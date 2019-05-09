function apiGetPlayerGames(callback, playername) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let player = JSON.parse(xhttp.response);
            callback(player);
        }
    };
    xhttp.open("GET", "/mongo/getGames?type=playername&db=rankedGames_3.1&limit=0&formating=none&name="+playername, true);
    xhttp.send();
}

function queryPlayerGames(playername) {
    apiGetPlayerGames(function (result) {
        let games = JSON.parse(result);
        getGameDetails(games, "Normal", playername);
        return games;
    }, playername);
}

let amount_total_games = 0;
let amount_cross_games = 0;
let amount_cross_wins = 0;
let amount_total_wins = 0;
let amount_party_games = 0;
let amount_party_wins = 0;
let gamelength = 0;
let endingwaves = 0;
let isCross = false;
let isParty = false;
let win_streak = 0;
let win_streak_max = 0;
let lose_streak = 0;
let lose_streak_max = 0;
let last_result = "";
let max_elo = 0;
let min_elo = 10000;

const unit_cache = 60;
const debug = true;

let currunit = "";
let lastunit = "";
let favunits = new Array(unit_cache);
for (let index = 0; index < favunits.length; index++) {
    favunits[index] = new Array(2);
    favunits[index][0] = 0;
    favunits[index][1] = 0;
}

function getGameDetails(seasonGames, type, name){
    const gametype = type;
    amount_total_games = 0;
    amount_cross_games = 0;
    amount_cross_wins = 0;
    amount_total_wins = 0;
    amount_party_games = 0;
    amount_party_wins = 0;
    gamelength = 0;
    endingwaves = 0;
    isCross = false;
    isParty = false;
    win_streak = 0;
    win_streak_max = 0;
    lose_streak = 0;
    lose_streak_max = 0;
    last_result = "";
    max_elo = 0;
    min_elo = 10000;

    currunit = "";
    lastunit = "";
    favunits = new Array(unit_cache);
    for (let index = 0; index < favunits.length; index++) {
        favunits[index] = new Array(2);
        favunits[index][0] = 0;
        favunits[index][1] = 0;
    }
    //each game
    for (let index = 0; index < seasonGames.length; index++) {
        const game = seasonGames[index];
        
        //match filters
        if(game.queuetype == gametype){
            //general stuff
            amount_total_games++;
            endingwaves += game.endingwave;
            gamelength += game.gamelength;



            //game details
            gameDetails = game.gameDetails.filter(function (meinName) { return meinName.playername == name })[0];
            if(debug) //console.log(gameDetails);
            //classic games
            if(gametype == "Classic"){
                //cross
                if(gameDetails.iscross == 1){
                    amount_cross_games++;
                    isCross = true;
                }
            }

            //party
            if(gameDetails.partyMembers){
                amount_party_games++;
                isParty = true;
            }

            //winner & streaks
            if(gameDetails.gameresult=="won"){
                amount_total_wins++;
                if(isCross) amount_cross_wins++;
                if(isParty) amount_party_wins++;
                if(last_result=="won") win_streak++;
                lose_streak = 0;
                if(win_streak>win_streak_max) win_streak_max = win_streak;
                last_result="won";
            }
            else{
                if(last_result=="lost") lose_streak++;
                win_streak = 0;
                if(lose_streak>lose_streak_max) lose_streak_max = lose_streak;
                last_result="lost";
            }

            //elo
            if(gameDetails.overallElo > max_elo) max_elo = gameDetails.overallElo;
            if(gameDetails.overallElo < min_elo) min_elo = gameDetails.overallElo;

            //favorite starts
            //store starting units in favunits[x][0-1]
            if (gameDetails.unitsPerWave != null) {
                //lvl 1 units
                gameDetails.unitsPerWave[0].forEach(function (element) {
                    currunit = element.substring(0, element.indexOf("_unit"));
                    if(debug) //console.log(currunit);
                    if (currunit != lastunit) {
                        let anzahl = 0;
                        for (let x = 0; x < unit_cache; x++) {
                            if (favunits[x][0] != 0) {
                                //unit matching?
                                if (favunits[x][0] == (currunit)) {
                                    anzahl = favunits[x][1];
                                    anzahl++;
                                    favunits[x][0] = currunit;
                                    favunits[x][1] = anzahl;
                                }
                            }
                        }
                        //no match, add it
                        if (anzahl > 0 == false) {
                            for (let x = 0; x < unit_cache; x++) {
                                if (favunits[x][1] == 0) {
                                    favunits[x][0] = currunit;
                                    favunits[x][1] = 1;
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
    //sort and remove empty slots
    favunits.sort(compareSecondColumn);
    for (var i = favunits.length; i > 0; i--) {
        if (favunits[i-1][0] == 0) {
            favunits.pop();
        }
    }
    //count favunits
    let meinCounter = 0;
    for (var i = 0; i < favunits.length; i++) {
        if (favunits[i][0] != 0) meinCounter++;
    }
    //fighter specific stats
    //for each fighter

    let wave_leaks = new Array(meinCounter);
    for (let i = 0; i < wave_leaks.length; i++) {
        wave_leaks[i] = new Array(21);
        for (var e = 0; e < 21; e++) {
            wave_leaks[i][e] = 0;
        }
    }
    let wave_leaks_amount = new Array(meinCounter);
    for (let i = 0; i < wave_leaks_amount.length; i++) {
        wave_leaks_amount[i] = new Array(21);
        for (var e = 0; e < 21; e++) {
            wave_leaks_amount[i][e] = 0;
        }
    }
    console.log("Total games: " + amount_total_games);
    for (let index = 0; index < seasonGames.length; index++) {
        const game = seasonGames[index];
        const gameDetails = game.gameDetails.filter(function (meinName) { return meinName.playername == name })[0];
        //console.log(gameDetails.unitsPerWave[0][0].substring(0, gameDetails.unitsPerWave[0][0].indexOf("_unit")));
        for (var i = 0; i < favunits.length; i++) {
            let found = false;
            //console.log(favunits[i][0]);
            for (var e = 0; e < gameDetails.unitsPerWave[0].length; e++) {
                if (gameDetails.unitsPerWave[0][e].substring(0, gameDetails.unitsPerWave[0][e].indexOf("_unit")) == favunits[i][0]) {
                    //player started with favunits[i][0]
                    //check its leaks
                    if (gameDetails.leaksPerWave) {
                        for (let q = 0; q < gameDetails.leaksPerWave.length; q++) {
                            if (gameDetails.leaksPerWave[q].length > 0) {
                                //player leaked
                                wave_leaks[i][q]++;
                                wave_leaks_amount[i][q] += gameDetails.leaksPerWave[q].length;
                            }
                        }
                        found = true;
                        break;
                    }
                    
                }
            }
            if (found) break;
        }
    }
    //averages
    //in min
    gamelength = (gamelength/amount_total_games/60).toFixed(2);
    endingwaves = (endingwaves/amount_total_games).toFixed(2);
    let cross_chance = (amount_cross_games/amount_total_games*100).toFixed(2);
    let winchance_total = (amount_total_wins/amount_total_games*100).toFixed(2);
    let winchance_party = (amount_party_wins/amount_party_games*100).toFixed(2);
    let winchance_cross = (amount_cross_wins/amount_cross_games*100).toFixed(2);

    if(debug){
        console.log("Averages:");
        console.log("Gamelength: "+gamelength);
        console.log("Endingwave: "+endingwaves);
        console.log("Cross Chance: "+cross_chance);
        console.log("Total games: "+amount_total_games);
        console.log("Win Chance Total: "+winchance_total);
        console.log("Party games: "+amount_party_games);
        console.log("Win Chance Party: "+winchance_party);
        console.log("Cross games: "+amount_cross_games);
        console.log("Win Chance Cross: "+winchance_cross);
        console.log("Max wins in a row: "+win_streak_max);
        console.log("Max loses in a row: "+lose_streak_max);
        console.log("Min Elo: "+min_elo);
        console.log("Max Elo: " + max_elo);
        console.log("Favunits:");
        console.log(favunits);
        console.log("Wave Leaks:")
        console.log(wave_leaks);
        console.log("Wave Leaks Amount");
        console.log(wave_leaks_amount);
    }

    document.getElementById("season_stats").innerHTML =
        "Games played: " + amount_total_games + "<br>" +
        "Win Chance: " + winchance_total + "<br>" +
        "Average ending wave: " + endingwaves + "<br>" +
        "Average game length: " + gamelength + "min <br>" +
        "Max wins in a row: " + win_streak_max + "<br>" +
        "Max loses in a row: " + lose_streak_max + "<br>" +
        "Min Elo: " + min_elo + "<br>" +
        "Max Elo: " + max_elo + "<br>";
    window.localStorage.setItem("wave_leaks", JSON.stringify(wave_leaks));
    window.localStorage.setItem("wave_leaks_amount", JSON.stringify(wave_leaks_amount));
    parseResults(wave_leaks, wave_leaks_amount);
}

function compareSecondColumn(a, b) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] > b[1]) ? -1 : 1;
    }
}

function nameToUpper(input_name) {
    input_name = input_name.substring(0, 1).toUpperCase() + input_name.substring(1);
    while (input_name.includes("_")) {
        let index = input_name.indexOf("_");
        input_name = input_name.substring(0, index) +" "+ input_name.substring(index + 1, index + 2).toUpperCase() + input_name.substring(index + 2);
        
        //input_name.replace("_", " ");
    }
    return input_name;
}

function parseResults(wave_leaks, wave_leaks_amount) {
    //parse selector
    while (document.getElementById("unitselector").options.length > 0) document.getElementById("unitselector").remove(document.getElementById("unitselector").length - 1);
        
    for (let i = 0; i < favunits.length; i++) {
        document.getElementById("unitselector").add(new Option(nameToUpper(favunits[i][0]) + " - (" + (favunits[i][1] / amount_total_games * 100).toFixed(2) + "%)", favunits[i][0]));
    }
    try {
        for (let i = 1; i < 22; i++) {
            document.getElementById("wave" + i).innerHTML = i;
            let chance = (wave_leaks[0][i - 1] / favunits[0][1] * 100);
            if (chance > 0) {
                document.getElementById("leakchance" + i).innerHTML = chance.toFixed(2) + "%";
            }
            else {
                document.getElementById("leakchance" + i).innerHTML = "0%";
            }
            let avg_amount = (wave_leaks_amount[0][i - 1] / wave_leaks[0][i - 1]).toFixed(2);
            if (avg_amount > 0) {
                document.getElementById("leakamount" + i).innerHTML = avg_amount;
            }
            else {
                document.getElementById("leakamount" + i).innerHTML = "0";
            }
        }
    }
    catch (error) {
        console.log(error);
        document.getElementById("wave1").innerHTML = "No Season 3 games found.";
    }
    
}

function changeActiveUnit(unit) {
    let wave_leaks = JSON.parse(window.localStorage.getItem("wave_leaks"));
    let wave_leaks_amount = JSON.parse(window.localStorage.getItem("wave_leaks_amount"));
    console.log(wave_leaks);
    console.log(wave_leaks_amount);
    for (var i = 0; i < favunits.length; i++) {
        if (favunits[i][0] == unit) {
            for (let e = 1; e < 22; e++) {
                document.getElementById("wave" + e).innerHTML = e;
                let chance = (wave_leaks[i][e - 1] / favunits[i][1] * 100);
                if (chance > 0) {
                    document.getElementById("leakchance" + e).innerHTML = chance.toFixed(2) + "%";
                }
                else {
                    document.getElementById("leakchance" + e).innerHTML = "0%";
                }
                let avg_amount = (wave_leaks_amount[i][e - 1] / wave_leaks[i][e - 1]).toFixed(2);
                if (avg_amount > 0) {
                    document.getElementById("leakamount" + e).innerHTML = avg_amount;
                }
                else {
                    document.getElementById("leakamount" + e).innerHTML = "0";
                }
            }
            break;
        }
    }
}
