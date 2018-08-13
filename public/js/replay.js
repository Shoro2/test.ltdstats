
var firsttime = false;

function getGameDetails(games) {
    firsttime = true;
    try {
        meinString = games.gameDetails.filter(meinString => meinString.position == 1)[0];
        meinString1 = games.gameDetails.filter(meinString => meinString.position == 2)[0];
        meinString2 = games.gameDetails.filter(meinString => meinString.position == 5)[0];
        meinString3 = games.gameDetails.filter(meinString => meinString.position == 6)[0];
        gameEvent = [meinString, meinString1, meinString2, meinString3];
        fillNames();
        waveAnzeigen();
    }
    catch (error) {
        console.log(error);
        document.getElementById("mitte").innerHTML += "<p><h3> Game not found.</h3>";
        showLoad();
    }
    

}

function addPicture(y, x, unit, player) {
    //überprüfe welche unit auf feld ist
    var neuesX = x * 2;
    var neuesY = y * 2;
    //icons
    switch (unit) {
        //element
        case "proton":
            url = "/img/icons/Proton.png";
            unit_type = "Proton";
            break;
        case "atom":
            url = "/img/icons/Atom.png";
            unit_type = "Atom";
            break;
        case "aqua_spirit":
            url = "/img/icons/AquaSpirit.png";
            unit_type = "AquaSpirit";
            break;
        case "fire_elemental":
            url = "/img/icons/FireElemental.png";
            unit_type = "FireElemental";
            break;
        case "rogue_wave":
            url = "/img/icons/RogueWave.png";
            unit_type = "RogueWave";
            break;
        case "windhawk":
            url = "/img/icons/Windhawk.png";
            unit_type = "Windhawk";
            break;
        case "violet":
            url = "/img/icons/Violet.png";
            unit_type = "Violet";
            break;
        case "mudman":
            url = "/img/icons/Mudman.png";
            unit_type = "Mudman";
            break;
        case "golem":
            url = "/img/icons/Golem.png";
            unit_type = "Golem";
            break;
        case "disciple":
            url = "/img/icons/Disciple.png";
            unit_type = "Disciple";
            break;
        case "starcaller":
            url = "/img/icons/Starcaller.png";
            unit_type = "Starcaller";
            break;
        case "fire_lord":
            url = "/img/icons/FireLord.png";
            unit_type = "FireLord";
            break;
        case "fenix":
            url = "/img/icons/Fenix.png";
            unit_type = "Fenix";
            break;
        //grove
        case "buzz":
            url = "/img/icons/Buzz.png";
            unit_type = "Buzz";
            break;
        case "consort":
            url = "/img/icons/Consort.png";
            unit_type = "Consort";
            break;
        case "ranger":
            url = "/img/icons/Ranger.png";
            unit_type = "Ranger";
            break;
        case "daphne":
            url = "/img/icons/Daphne.png";
            unit_type = "Daphne";
            break;
        case "wileshroom":
            url = "/img/icons/Wileshroom.png";
            unit_type = "Wileshroom";
            break;
        case "canopie":
            url = "/img/icons/Canopie.png";
            unit_type = "Canopie";
            break;
        case "honeyflower":
            url = "/img/icons/Honeyflower.png";
            unit_type = "Honeyflower";
            break;
        case "deathcap":
            url = "/img/icons/Deathcap.png";
            unit_type = "Deathcap";
            break;
        case "antler":
            url = "/img/icons/Antler.png";
            unit_type = "Antler";
            break;
        case "whitemane":
            url = "/img/icons/Whitemane.png";
            unit_type = "Whitemane";
            break;
        case "banana_bunk":
            url = "/img/icons/BananaBunk.png";
            unit_type = "BananaBunk";
            break;
        case "banana_haven":
            url = "/img/icons/BananaHaven.png";
            unit_type = "BananaHaven";
            break;
        //forsaken
        case "bone_warrior":
            url = "/img/icons/BoneWarrior.png";
            unit_type = "BoneWarriror";
            break;
        case "bone_crusher":
            url = "/img/icons/BoneCrusher.png";
            unit_type = "BoneCrusher";
            break;
        case "dark_mage":
            url = "/img/icons/DarkMage.png";
            unit_type = "DarkMage";
            break;
        case "fire_archer":
            url = "/img/icons/FireArcher.png";
            unit_type = "FireArcher";
            break;
        case "gargoyle":
            url = "/img/icons/Gargoyle.png";
            unit_type = "Gargoyle";
            break;
        case "green_devil":
            url = "/img/icons/GreenDevil.png";
            unit_type = "GreenDevil";
            break;
        case "gateguard":
            url = "/img/icons/Gateguard.png";
            unit_type = "Gateguard";
            break;
        case "harbinger":
            url = "/img/icons/Harbinger.png";
            unit_type = "Harbinger";
            break;
        case "butcher":
            url = "/img/icons/Butcher.png";
            unit_type = "Butcher";
            break;
        case "head_chef":
            url = "/img/icons/HeadChef.png";
            unit_type = "Headchef";
            break;
        case "nightmare":
            url = "/img/icons/Nightmare.png";
            unit_type = "Nightmare";
            break;
        case "doppelganger":
            url = "/img/icons/Doppelganger.png";
            unit_type = "Doppelganger";
            break;
        case "lord_of_death":
            url = "/img/icons/LordOfDeath.png";
            unit_type = "LordOfDeath";
            break;
        case "hades":
            url = "/img/icons/Hades.png";
            unit_type = "Hades";
            break;
        //mech
        case "peewee":
            url = "/img/icons/Peewee.png";
            unit_type = "Peewee";
            break;
        case "veteran":
            url = "/img/icons/Veteran.png";
            unit_type = "Veteran";
            break;
        case "bazooka":
            url = "/img/icons/Bazooka.png";
            unit_type = "Bazooka";
            break;
        case "zeus":
            url = "/img/icons/Zeus.png";
            unit_type = "Zeus";
            break;
        case "pyro":
            url = "/img/icons/Pyro.png";
            unit_type = "Pyro";
            break;
        case "tempest":
            url = "/img/icons/Tempest.png";
            unit_type = "Tempest";
            break;
        case "leviathan":
            url = "/img/icons/Leviathan.png";
            unit_type = "Leviathan";
            break;
        case "aps":
            url = "/img/icons/APS.png";
            unit_type = "APS";
            break;
        case "mps":
            url = "/img/icons/MPS.png";
            unit_type = "MPS";
            break;
        case "berserker":
            url = "/img/icons/Berserker.png";
            unit_type = "Berserker";
            break;
        case "fatalizer":
            url = "/img/icons/Fatalizer.png";
            unit_type = "Fatalizer";
            break;
        case "millennium":
            url = "/img/icons/Millennium.png";
            unit_type = "Millennium";
            break;
        case "doomsday_machine":
            url = "/img/icons/DoomsdayMachine.png";
            unit_type = "DoomsdayMachine";
            break;
        // Atlantean
        case "pollywog":
            url = "/img/icons/Pollywog.png";
            unit_type = "Pollywog";
            break;
        case "devilfish":
            url = "/img/icons/Devilfish.png";
            unit_type = "Devilfish";
            break;
        case "seraphin":
            url = "/img/icons/Seraphin.png";
            unit_type = "Seraphin";
            break;
        case "angler":
            url = "/img/icons/Angler.png";
            unit_type = "Angler";
            break;
        case "bounty_hunter":
            url = "/img/icons/BountyHunter.png";
            unit_type = "Bounty Hunter";
            break;
        case "kingpin":
            url = "/img/icons/Kingpin.png";
            unit_type = "Kingpin";
            break;
        case "sea_serpent":
            url = "/img/icons/SeaSerpent.png";
            unit_type = "SeaSerpant";
            break;
        case "deepcoiler":
            url = "/img/icons/Deepcoiler.png";
            unit_type = "Deepcoiler";
            break;
        case "grarl":
            url = "/img/icons/Grarl.png";
            unit_type = "Grarl";
            break;
        case "king_claw":
            url = "/img/icons/KingClaw.png";
            unit_type = "King Claw";
            break;
        case "ocean_templar":
            url = "/img/icons/OceanTemplar.png";
            unit_type = "Ocean Templar";
            break;
        case "azeria":
            var url = "/img/icons/Azeria.png";
            var unit_type = "Azeria";
            break;
        case "priestess_of_the_abyss":
            var url = "/img/icons/PriestessOfTheAbyss.png";
            var unit_type = "Priestess of the Abyss";
            break;
        case "eggsack":
            url = "/img/icons/Eggsack.png";
            unit_type = "Eggsack";
            break;
        case "hydra":
            url = "/img/icons/Hydra.png";
            unit_type = "Hydra";
            break;
        default:
            url = "";
            unit_type = "empty";
            console.log("missing unit: " + unit);
            break;

    }
    //canvas einfügen
    var zielspalte = document.getElementById("p" + player + "_" + neuesX + "." + neuesY);
    //console.log("p" + player + "_" + neuesX + "." + neuesY);
    zielspalte.style = "border: 0px;";
    zielspalte.title = unit_type;
    meinCanvas1 = document.createElement("canvas");
    meinCanvas1.setAttribute("id", unit_type + " 1");
    meinCanvas1.setAttribute("class", "kleinerCanvas");
    var el1 = zielspalte.appendChild(meinCanvas1);
    //var el1 = document.getElementById(unit_type+ " 1");
    zielspalte = document.getElementById("p" + player + "_" + (neuesX + 1) + "." + neuesY);
    zielspalte.title = unit_type;
    zielspalte.style = "border: 0px;";
    meinCanvas2 = document.createElement("canvas");
    meinCanvas2.setAttribute("id", unit_type + " 2");
    meinCanvas2.setAttribute("class", "kleinerCanvas");
    var el2 = zielspalte.appendChild(meinCanvas2);
    zielspalte = document.getElementById("p" + player + "_" + neuesX + "." + (neuesY + 1));
    zielspalte.style = "border: 0px;";
    zielspalte.title = unit_type;
    meinCanvas3 = document.createElement("canvas");
    meinCanvas3.setAttribute("id", unit_type + " 3");
    meinCanvas3.setAttribute("class", "kleinerCanvas");
    var el3 = zielspalte.appendChild(meinCanvas3);
    zielspalte = document.getElementById("p" + player + "_" + (neuesX + 1) + "." + (neuesY + 1));
    zielspalte.title = unit_type;
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
//names, net worth and workers
function fillNames() {
    for (var i = 1; i < 5; i++) {
        var wave = parseInt(document.getElementById("slider").value);
        var worker = gameEvent[i - 1].workersPerWave[wave - 1];
        var networth = gameEvent[i - 1].netWorthPerWave[wave - 1];
        var player_legion = gameEvent[i - 1].legion;
        document.getElementById("p" + i + "_name").innerText = gameEvent[i - 1].playername;
        document.getElementById("networth" + i).innerText = "(" + networth + "/";
        document.getElementById("worker" + i).innerText = worker + ")";
        document.getElementById("legion" + i).innerHTML = "<img id='img_legion' src='/img/icons/" + player_legion + ".png'>";
        //document.getElementById("p"+i+"_name").outerHTML = "<div class='player_name' id='p"+i+"_name'> "+gameEvent[i-1].player_name+" (<div title='Net Worth' style='display:inline;'>"+networth+"</div>/<div title='Worker' style='display:inline;'>"+worker+"</div>)</div>";


    }

}

function showDetails(nummer) {
    document.getElementById("player_details").style.display = "";
}

function setKingHp() {
    try {
        var wave = parseInt(document.getElementById("slider").value);
        var kinghp1 = document.getElementById("hpwest");
        var kinghp2 = document.getElementById("hpeast");
        kinghp1.style.width = game.leftkingpercenthp[wave - 1] * 100 + "%";
        kinghp2.style.width = game.rightkingpercenthp[wave - 1] * 100 + "%";
        kinghp1.textContent = (game.leftkingpercenthp[wave - 1] * 100).toFixed(2) + "%";
        kinghp2.textContent = (game.rightkingpercenthp[wave - 1] * 100).toFixed(2) + "%";
    }
    catch(error){
        console.log(error);
    }
    
}

function getPlayerBuild(player) {
    var wave = parseInt(document.getElementById("slider").value);
    meinBuild = gameEvent[player - 1].unitsPerWave[wave - 1];
    counter = 0;
    meinBuild.forEach(element => {
        counter++;
        var meinX = element.substring(element.indexOf(":") + 1, element.indexOf("|"));
        var meinY = element.substring(element.indexOf("|") + 1);
        addPicture(meinX, meinY, element.substring(0, element.indexOf("_unit")), player);

    });
}

function getPlayerLeaks(player) {
    var wave = parseInt(document.getElementById("slider").value);
    var meineLeaks = gameEvent[player - 1].leaksPerWave[wave - 1];
    if (meineLeaks.length > 0) {
        meineLeaks.forEach(element => {
            addLeak(element, player);
        });
    }

}

function getPlayerSends(player) {
    var wave = parseInt(document.getElementById("slider").value);
    switch (gameEvent[player - 1].position) {
        case 1:
            var target_player = 3;
            break;
        case 2:
            target_player = 4;
            break;
        case 5:
            target_player = 2;
            break;
        case 6:
            target_player = 1;
            break;
        default:
            console.log("could not get player sends");
            break;

    }
    var meineSends = gameEvent[target_player - 1].mercsReceivedPerWave[wave - 1];
    if (meineSends.length > 0) {
        meineSends.forEach(element => {
            addSend(element, player);
        });
    }

}

function addSend(element, player) {
    while (element.includes(" ") || element.includes("%20")) {
        element = element.replace(" ", "");
        element = element.replace("%20", "");
    }
    document.getElementById("sends_player" + player).innerHTML += "<img src='/img/icons/" + element + ".png' class='leakpic' title='" + element + "'>";
}

function addLeak(element, player) {
    while (element.includes(" ") || element.includes("%20")) {
        element = element.replace(" ", "");
        element = element.replace("%20", "");
    }
    document.getElementById("leaks_player" + player).innerHTML += "<img src='/img/icons/" + element + ".png' class='leakpic' title='" + element + "'>";
}

function clearPictures() {
    for (var h = 1; h < 5; h++) {
        for (var i = 28; i > 0; i--) {
            for (var e = 1; e < 19; e++) {
                document.getElementById("p" + h + "_" + i + "." + e).innerHTML = "";
                document.getElementById("p" + h + "_" + i + "." + e).style = "border: 1px solid black; background-color: white;";

            }

        }
    }

}

document.onkeydown = function (event) {
    if (event.keyCode === 13) {
        if (event.target.id === "playername") setPlayer();
    }
    if (event.keyCode === 107) {
        if (document.getElementById("slider").value < gameEvent[0].wave) {
            var waveValue = parseInt(document.getElementById("slider").value) + 1;
            document.getElementById("slider").value = waveValue;
        }
        else if (document.getElementById("slider").value === gameEvent[0].wave) {
            document.getElementById("slider").value = "1";
        }
        waveAnzeigen();
    }
    if (event.keyCode === 109) {
        if (document.getElementById("slider").value > 1) {
            document.getElementById("slider").value -= 1;
        }

        else if (document.getElementById("slider").value === "1") {
            document.getElementById("slider").value = gameEvent[0].wave;
        }
        waveAnzeigen();
    }


};
document.onmousewheel = function displaywheel(e) {
    var evt = window.event || e; //equalize event object
    var delta = evt.detail ? evt.detail * -120 : evt.wheelDelta; //check for detail first so Opera uses that instead of wheelDelta
    if (delta > 0) {
        if (document.getElementById("slider").value < gameEvent[0].wave) {
            var waveValue = parseInt(document.getElementById("slider").value) + 1;
            document.getElementById("slider").value = waveValue;
        }
        else if (document.getElementById("slider").value === gameEvent[0].wave) {
            document.getElementById("slider").value = "1";
        }
        waveAnzeigen();
    }
    else {
        if (document.getElementById("slider").value > 1) {
            document.getElementById("slider").value -= 1;
        }

        else if (document.getElementById("slider").value === "1") {
            document.getElementById("slider").value = gameEvent[0].wave;
        }
        waveAnzeigen();
    }
};
document.getElementById("slider").onchange = function () {
    if (document.getElementById("slider").value > gameEvent[0].wave) {
        document.getElementById("slider").value = gameEvent[0].wave;
        waveAnzeigen();
    }
};

function getPlayer() {

    var url_string = window.location.href;
    var url = new URL(url_string);
    var playerurl = url.searchParams.get("gameid");
    if (playerurl === null) {
        //console.log(playerurl);
        window.location.href = window.location.href + "?gameid=" + document.getElementById("gameid").value;
    }
    else {
        window.location.href = "/replay?gameid=" + document.getElementById("gameid").value;
    }



}

function h2d(s) {

    function add(x, y) {
        var c = 0, r = [];
        x = x.split('').map(Number);
        y = y.split('').map(Number);
        while (x.length || y.length) {
            var s = (x.pop() || 0) + (y.pop() || 0) + c;
            r.unshift(s < 10 ? s : s - 10);
            c = s < 10 ? 0 : 1;
        }
        if (c) r.unshift(c);
        return r.join('');
    }

    var dec = '0';
    s.split('').forEach(function (chr) {
        var n = parseInt(chr, 16);
        for (var t = 8; t; t >>= 1) {
            dec = add(dec, dec);
            if (n & t) dec = add(dec, '1');
        }
    });
    return dec;
}

document.body.onload = function () {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var playerurl = url.searchParams.get("gameid");
    if (playerurl !== "" && playerurl !== null) {
        document.getElementById("mitte").style.display = "inherit";
        //hex to dez
        //console.log(playerurl.length)
        if (playerurl.length <= 16) {
            playerurl = h2d(playerurl);
        }
        queryGame(playerurl);
        //console.log(playerurl);
    }
    else {
        document.getElementById("wave").textContent = "Enter a valid gameid to select the replay.";
    }
};


function clearLeaks(player) {

    document.getElementById("leaks_player" + player).innerHTML = "";


}

function clearSends() {
    for (var i = 1; i < 5; i++) {
        document.getElementById("sends_player" + i).innerHTML = "";
    }
}
function waveAnzeigen() {

    var welle = document.getElementById("slider").value;
    var maxwave = gameEvent[0].wave;
    document.getElementById("wave").textContent = "Wave: " + welle.toString() + "/" + maxwave;

    var icon_legionspell = [];
    if (welle > 10) {
        for (var i = 0; i < 4; i++) {

            if (typeof gameEvent[i].legionSpell !== 'undefined') {
                icon_legionspell[i] = gameEvent[i].legionSpell;
                while (icon_legionspell[i].includes(" ") || icon_legionspell[i].includes("%20")) {
                    icon_legionspell[i] = icon_legionspell[i].replace(" ", "");
                    icon_legionspell[i] = icon_legionspell[i].replace("%20", "");
                }
                document.getElementById("legionspell" + i).innerHTML = "<img src='/img/icons/" + icon_legionspell[i] + ".png' height='20px' width=20px' title='" + gameEvent[i].legionSpell+"'>";
            }
            else {
                console.log(gameEvent[i]);
            }
            
        }
    }
    else {
        for (i = 0; i < 4; i++) {
            document.getElementById("legionspell" + i).innerHTML = "";
        }
    }

    clearPictures();
    clearSends();
    for (i = 1; i < 5; i++) {
        clearLeaks(i);
        getPlayerBuild(i);
        getPlayerLeaks(i);
        getPlayerSends(i);
    }
    fillNames();
    setKingHp();

}

function showSelect() {
    document.getElementById("findagame").style.display = "inherit";
}

function searchPlayers() {
    var selected = document.getElementById("legion_selector").value;
    if (selected !== "") {
        document.getElementById("mitte").style.display = "inherit";
        queryTopPlayer(selected);
    }
}

function parseTopPlayer(players, legion) {
    var result = document.getElementById("result");
    result.innerHTML = "";
    switch (legion) {
        case "element":
            var legion_num = 0;
            break;
        case "grove":
            var legion_num = 1;
            break;
        case "forsaken":
            var legion_num = 2;
            break;
        case "mech":
            var legion_num = 3;
            break;
        case "atlantean":
            var legion_num = 4;
            break;
        case "mastermind":
            var legion_num = 5;
            break;
    }
    for (var i = 0; i < players.length; i++) {
        result.innerHTML += "<br> <div id='player_" + i + "' onclick='showGames(" + i + ", " + legion_num + ")'>" + players[i].playername + " Elo: " + players[i].statistics.overallElo + "</div>";
    }
    result.innerHTML += "<br>";
    result.style.display = "inherit";
}

function showGames(nummer, legion) {
    var result = document.getElementById("result");
    result.innerHTML = "";
    switch (legion) {
        case 0:
            legion = "Element";
            break;
        case 1:
            legion = "Grove";
            break;
        case 2:
            legion = "Forsaken";
            break;
        case 3:
            legion = "Mech";
            break;
        case 4:
            legion = "Atlantean";
            break;
        case 5:
            legion = "Mastermind";
            break;
    }
    var games_results = 0;
    for (var i = 0; i < players[nummer].filteredGamesQuery.games.length; i++) {
        if (players[nummer].filteredGamesQuery.games[i].legion == legion) {
            games_results++;
            result.innerHTML += "<br> <div id='games_" + i + "' onclick='getGameId(" + i + ", " + nummer + ")'>" + players[nummer].filteredGamesQuery.games[i].game_id + " Legion: " + players[nummer].filteredGamesQuery.games[i].legion + ", " + players[nummer].filteredGamesQuery.games[i].gameresult + "</div>";
            if (games_results == 10) break;
        }
        
    }
    result.innerHTML += "<br>";
}

function getGameId(nummer, playernum) {
    window.location.href = "/replay?gameid=" + players[playernum].filteredGamesQuery.games[nummer].game_id;
}

//API
function getGame(callback, gameid) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var game = JSON.parse(xhttp.response);
            callback(game);
        }
    };
    xhttp.open("GET", '/api/replay/getGame?gameid=' + gameid, true);
    xhttp.send();
}

function queryGame(gameid) {
    getGame(function (result) {
        //console.log(result);
        game = result.game;
        getGameDetails(game);
        document.getElementById("mitte").style.display = "none";
        return game;
    }, gameid);
}

function getTopPlayer(callback, legion) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var players = JSON.parse(xhttp.response);
            callback(players);
        }
    };
    xhttp.open("GET", '/api/replay/getTopPlayer?legion=' + legion, true);
    xhttp.send();
}

function queryTopPlayer(legion) {
    getTopPlayer(function (result) {
        console.log(result);
        for (var i = 0; i < result.filteredPlayers.players.length; i++) {
            result.filteredPlayers.players[i].statistics = JSON.parse(result.filteredPlayers.players[i].statistics);
        }
        console.log(result);
        players = result.filteredPlayers.players;
        parseTopPlayer(players, legion);
        document.getElementById("mitte").style.display = "none";
        return players;
    }, legion);
}