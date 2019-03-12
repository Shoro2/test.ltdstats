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

function getGameDetails(seasonGames, type, name){
    const gametype = type;
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
    let last_result="";
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
            gameDetails = game.gameDetails.filter(meinName => meinName.playername == name)[0];
            if(debug) console.log(gameDetails);
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
                    if(debug) console.log(currunit);
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
        console.log("Max Elo: "+max_elo);
        favunits.sort(compareSecondColumn);
        for (let index = 0; index < favunits.length; index++) {
            const element1 = favunits[index][0];
            const element2 = favunits[index][1];
            if(favunits[index][0]!=0){
                console.log("Favunit #"+index+": "+favunits[index][0]+", count: "+favunits[index][1]);
            }
            
        }
    }
}

function compareSecondColumn(a, b) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] > b[1]) ? -1 : 1;
    }
}