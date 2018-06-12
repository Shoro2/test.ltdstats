
var firsttime = false;

function getGameDetails(games)
{
    firsttime = true;
    meinString = games.gameDetails[0];
    meinString1 = games.gameDetails[1];
    meinString2 = games.gameDetails[2];
    meinString3 = games.gameDetails[3];
    gameEvent = [meinString, meinString1, meinString2, meinString3];
    fillNames();
    waveAnzeigen();

}

function addPicture(y, x, unit, player)
{
    //überprüfe welche unit auf feld ist
    var neuesX = x*2;
    var neuesY = y*2;
    //icons
    switch(unit)
    {
        //element
        case "proton":
            var url="/img/icons/Proton.png";
            var unit_type="Proton";
            break;
        case "atom":
            var url="/img/icons/Atom.png";
            var unit_type="Atom";
            break;
        case "aqua_spirit":
            var url="/img/icons/AquaSpirit.png";
            var unit_type="AquaSpirit";
            break;
        case "fire_elemental":
            var url="/img/icons/FireElemental.png";
            var unit_type="FireElemental";
            break;
        case "rogue_wave":
            var url="/img/icons/RogueWave.png";
            var unit_type="RogueWave";
            break;
        case "windhawk":
            var url="/img/icons/Windhawk.png";
            var unit_type="Windhawk";
            break;
        case "violet":
            var url="/img/icons/Violet.png";
            var unit_type="Violet";
            break;
        case "mudman":
            var url="/img/icons/Mudman.png";
            var unit_type="Mudman";
            break;
        case "golem":
            var url="/img/icons/Golem.png";
            var unit_type="Golem";
            break;
        case "disciple":
            var url="/img/icons/Disciple.png";
            var unit_type="Disciple";
            break;
        case "starcaller":
            var url="/img/icons/Starcaller.png";
            var unit_type="Starcaller";
            break;
        case "fire_lord":
            var url="/img/icons/FireLord.png";
            var unit_type="FireLord";
            break;
        case "fenix":
            var url="/img/icons/Fenix.png";
            var unit_type="Fenix";
            break;
        //grove
        case "buzz":
            var url="/img/icons/Buzz.png";
            var unit_type="Buzz";
            break;
        case "consort":
            var url="/img/icons/Consort.png";
            var unit_type="Consort";
            break;
        case "ranger":
            var url="/img/icons/Ranger.png";
            var unit_type="Ranger";
            break;
        case "daphne":
            var url="/img/icons/Daphne.png";
            var unit_type="Daphne";
            break;
        case "whileshroom":
            var url="/img/icons/Wileshroom.png";
            var unit_type="Wileshroom";
            break;
        case "canopie":
            var url="/img/icons/Canopie.png";
            var unit_type="Canopie";
            break;
        case "honeyflower":
            var url="/img/icons/Honeyflower.png";
            var unit_type="Honeyflower";
            break;
        case "deathcap":
            var url="/img/icons/Deathcap.png";
            var unit_type="Deathcap";
            break;
        case "antler":
            var url="/img/icons/Antler.png";
            var unit_type="Antler";
            break;
        case "whitemane":
            var url="/img/icons/Whitemane.png";
            var unit_type="Whitemane";
            break;
        case "banana_bunk":
            var url="/img/icons/BananaBunk.png";
            var unit_type="BananaBunk";
            break;
        case "banana_haven":
            var url="/img/icons/BananaHaven.png";
            var unit_type="BananaHaven";
            break;
        //forsaken
        case "bone_warrior":
            var url="/img/icons/BoneWarrior.png";
            var unit_type="BoneWarriror";
            break;
        case "bone_crusher":
            var url="/img/icons/BoneCrusher.png";
            var unit_type="BoneCrusher";
            break;
        case "dark_mage":
            var url="/img/icons/DarkMage.png";
            var unit_type="DarkMage";
            break;
        case "fire_archer":
            var url="/img/icons/FireArcher.png";
            var unit_type="FireArcher";
            break;
        case "gargoyle":
            var url="/img/icons/Gargoyle.png";
            var unit_type="Gargoyle";
            break;
        case "green_devil":
            var url="/img/icons/GreenDevil.png";
            var unit_type="GreenDevil";
            break;
        case "gateguard":
            var url="/img/icons/Gateguard.png";
            var unit_type="Gateguard";
            break;
        case "harbinger":
            var url="/img/icons/Harbinger.png";
            var unit_type="Harbinger";
            break;
        case "butcher":
            var url="/img/icons/Butcher.png";
            var unit_type="Butcher";
            break;
        case "head_chef":
            var url="/img/icons/HeadChef.png";
            var unit_type="Headchef";
            break;
        case "nightmare":
            var url="/img/icons/Nightmare.png";
            var unit_type="Nightmare";
            break;
        case "doppelganger":
            var url="/img/icons/Doppelganger.png";
            var unit_type="Doppelganger";
            break;
        case "lord_of_death":
            var url="/img/icons/LordOfDeath.png";
            var unit_type="LordOfDeath";
            break;
        case "hades":
            var url="/img/icons/Hades.png";
            var unit_type="Hades";
            break;
        //mech
        case "peewee":
            var url="/img/icons/Peewee.png";
            var unit_type="Peewee";
            break;
        case "veteran":
            var url="/img/icons/Veteran.png";
            var unit_type="Veteran";
            break;
        case "bazooka":
            var url="/img/icons/Bazooka.png";
            var unit_type="Bazooka";
            break;
        case "zeus":
            var url="/img/icons/Zeus.png";
            var unit_type="Zeus";
            break;
        case "pyro":
            var url="/img/icons/Pyro.png";
            var unit_type="Pyro";
            break;
        case "tempest":
            var url="/img/icons/Tempest.png";
            var unit_type="Tempest";
            break;
        case "leviathan":
            var url="/img/icons/Leviathan.png";
            var unit_type="Leviathan";
            break;
        case "aps":
            var url="/img/icons/APS.png";
            var unit_type="APS";
            break;
        case "mps":
            var url="/img/icons/MPS.png";
            var unit_type="MPS";
            break;
        case "berserker":
            var url="/img/icons/Berserker.png";
            var unit_type="Berserker";
            break;
        case "fatalizer":
            var url="/img/icons/Fatalizer.png";
            var unit_type="Fatalizer";
            break;
        case "millennium":
            var url="/img/icons/Millennium.png";
            var unit_type="Millennium";
            break;
        case "doomsday_machine":
            var url="/img/icons/DoomsdayMachine.png";
            var unit_type="DoomsdayMachine";
            break;
        case "sea_serpent":
            var url="/img/icons/SeaSerpent.png";
            var unit_type="SeaSerpant";
            break;
        case "deepcoiler":
            var url="/img/icons/DeepCoiler.png";
            var unit_type="DeepCoilwér";
            break;
        default:
            var url="";
            var unit_type="empty";
            console.log(unit);
            break;

    }
    //canvas einfügen
    var zielspalte = document.getElementById("p" + player + "_" + neuesX + "." + neuesY);
    console.log("p" + player + "_" + neuesX + "." + neuesY);
    zielspalte.style="border: 0px;";
    meinCanvas1 = document.createElement("canvas");
    meinCanvas1.setAttribute("id", unit_type+" 1");
    meinCanvas1.setAttribute("class", "kleinerCanvas");
    var el1 = zielspalte.appendChild(meinCanvas1);
    //var el1 = document.getElementById(unit_type+ " 1");
    var zielspalte = document.getElementById("p"+player+"_"+(neuesX+1)+"."+neuesY);
    zielspalte.style="border: 0px;";
    meinCanvas2 = document.createElement("canvas");
    meinCanvas2.setAttribute("id", unit_type+" 2");
    meinCanvas2.setAttribute("class", "kleinerCanvas");
    var el2 = zielspalte.appendChild(meinCanvas2);
    var zielspalte = document.getElementById("p"+player+"_"+neuesX+"."+(neuesY+1));
    zielspalte.style="border: 0px;";
    meinCanvas3 = document.createElement("canvas");
    meinCanvas3.setAttribute("id", unit_type+" 3");
    meinCanvas3.setAttribute("class", "kleinerCanvas");
    var el3 = zielspalte.appendChild(meinCanvas3);
    var zielspalte = document.getElementById("p"+player+"_"+(neuesX+1)+"."+(neuesY+1));
    zielspalte.style="border: 0px;";
    meinCanvas4 = document.createElement("canvas");
    meinCanvas4.setAttribute("id", unit_type+" 4");
    meinCanvas4.setAttribute("class", "kleinerCanvas");
    var el4 = zielspalte.appendChild(meinCanvas4);

    // bild in canvas (4 teile)
    var meinBild1 = document.createElement("img");
    meinBild1.src=url;
    meinBild1.onload = function()
    {
        //1
        var ctx=el1.getContext('2d');
        ctx.drawImage(meinBild1, 0, 0, 32, 32, 0, 0, 300, 150); 
        //2
        ctx=el2.getContext('2d');
        ctx.drawImage(meinBild1, 0, 32, 32, 32, 0, 0, 300, 150);
        //3
        ctx=el3.getContext('2d');
        ctx.drawImage(meinBild1,32, 0, 32, 32, 0, 0, 300, 150); 
        //4
        ctx=el4.getContext('2d');
        ctx.drawImage(meinBild1, 32, 32, 32, 32, 0, 0, 300, 150); 
    }
            
            


}

//names, net worth and workers
function fillNames()
{
    for(var i=1;i<5;i++)
    {
        var wave = parseInt(document.getElementById("slider").value);
        var worker = gameEvent[i-1].workersPerWave[wave-1];
        var networth = gameEvent[i-1].netWorthPerWave[wave-1];
        document.getElementById("p"+i+"_name").innerText = gameEvent[i-1].player_name;
        document.getElementById("networth"+i).innerText = "("+networth+"/";
        document.getElementById("worker"+i).innerText = worker+")";
        //document.getElementById("p"+i+"_name").outerHTML = "<div class='player_name' id='p"+i+"_name'> "+gameEvent[i-1].player_name+" (<div title='Net Worth' style='display:inline;'>"+networth+"</div>/<div title='Worker' style='display:inline;'>"+worker+"</div>)</div>";
        
        
    }

}

function getPlayerBuild(player)
{
    var wave = parseInt(document.getElementById("slider").value);
    meinBuild = gameEvent[player-1].unitsPerWave[wave-1];
    counter = 0;
    meinBuild.forEach(element => {
        counter++;
        var meinX = element.substring(element.indexOf(":")+1, element.indexOf("|"));
        var meinY = element.substring(element.indexOf("|")+1);
        addPicture(meinX, meinY, element.substring(0, element.indexOf("_unit")), player);
        
    });
}

function getPlayerLeaks(player)
{
    var wave = parseInt(document.getElementById("slider").value);
    var meineLeaks = gameEvent[player-1].leaksPerWave[wave-1];
    if(meineLeaks.length>0)
    {
        meineLeaks.forEach(element => {
            addLeak(element, player);
        });
    }
    
}

function getPlayerSends(player)
{
    var wave = parseInt(document.getElementById("slider").value);
    var meineSends = gameEvent[player-1].mercsSentPerWave[wave-1];
    if(meineSends.length>0)
    {
        meineSends.forEach(element => {
            addSend(element, player);
        });
    }
    
}

function addSend(element, player)
{
    while (element.includes(" ") || element.includes("%20")) {
        element = element.replace(" ", "");
        element = element.replace("%20", "");
    }
    document.getElementById("sends_player"+player).innerHTML+= "<img src='/img/icons/"+element+".png' class='leakpic' title='"+element+"'>";
}

function addLeak(element, player)
{
    while (element.includes(" ") || element.includes("%20")) {
        element = element.replace(" ", "");
        element = element.replace("%20", "");
    }
    document.getElementById("leaks_player"+player).innerHTML+= "<img src='/img/icons/"+element+".png' class='leakpic' title='"+element+"'>";
}

function clearPictures()
{
    for(var h=1;h<5;h++)
    {
        for(var i=1;i<29;i++)
        {
            for(var e=1;e<19;e++)
            {
                document.getElementById("p"+h+"_"+i+"."+e).innerHTML="";
                document.getElementById("p"+h+"_"+i+"."+e).style="border: 1px solid black; background-color: white;";
                
            }
            
        }
    }
    
}

document.onkeydown = function(event) {
        if(event.keyCode == 107) 
        {
            if(document.getElementById("slider").value < gameEvent[0].wave-1)
            {
                var waveValue = parseInt(document.getElementById("slider").value)+1;
                document.getElementById("slider").value = waveValue;
            }
            else if(document.getElementById("slider").value==gameEvent[0].wave-1)
            {
                document.getElementById("slider").value="1";
            }
            waveAnzeigen();
        }
        if(event.keyCode == 109) 
        {
            if(document.getElementById("slider").value>1)
            {
                document.getElementById("slider").value -= 1;
            }

            else if(document.getElementById("slider").value=="1")
            {
                document.getElementById("slider").value=gameEvent[0].wave-1;
            }
            waveAnzeigen();
        }
    
    
  }
document.onmousewheel = function displaywheel(e){
    var evt=window.event || e //equalize event object
    var delta=evt.detail? evt.detail*(-120) : evt.wheelDelta //check for detail first so Opera uses that instead of wheelDelta
    if(delta>0)
    {
        if(document.getElementById("slider").value < gameEvent[0].wave-1)
            {
                var waveValue = parseInt(document.getElementById("slider").value)+1;
                document.getElementById("slider").value = waveValue;
            }
            else if(document.getElementById("slider").value==gameEvent[0].wave-1)
            {
                document.getElementById("slider").value="1";
            }
            waveAnzeigen();
    }
    else
    {
        if(document.getElementById("slider").value>1)
            {
                document.getElementById("slider").value -= 1;
            }

            else if(document.getElementById("slider").value=="1")
            {
                document.getElementById("slider").value=gameEvent[0].wave-1;
            }
            waveAnzeigen();
    }
}
 
document.getElementById("slider").onchange = function(){
    if(document.getElementById("slider").value>gameEvent[0].wave-1) 
    {
        document.getElementById("slider").value = gameEvent[0].wave-1;
        waveAnzeigen();
    }
}

function getPlayer() {

    var url_string = window.location.href;
    var url = new URL(url_string);
    var playerurl = url.searchParams.get("gameid");
    if (playerurl === null) {
        console.log(playerurl);
        window.location.href = window.location.href + "?gameid=" + document.getElementById("gameid").value;
    }
    else {
        window.location.href = "https://test.ltdstats.com/replay" + "?gameid=" + document.getElementById("gameid").value;
    }



}

document.body.onload = function () {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var playerurl = url.searchParams.get("gameid");
    if (playerurl !== "" && playerurl !== null) {
        document.getElementById("mitte").style.display = "inherit";
        queryGame(playerurl);
        console.log(playerurl);
        console.log("querGame");
    }
    else {
        document.getElementById("wave").textContent = "Enter a valid gameid to select the replay.";
        console.log("enter a gameid");
    }
}


function clearLeaks(player)
{

        document.getElementById("leaks_player"+player).innerHTML ="";
    
    
}

function clearSends()
{
    for(var i=1;i<5;i++)
    {
        document.getElementById("sends_player"+i).innerHTML ="";
    }
}
function waveAnzeigen()
{

    var welle = document.getElementById("slider").value;
    var maxwave=  gameEvent[0].wave - 1;
    document.getElementById("wave").textContent = "Wave: " + welle.toString() + "/" + maxwave; 
    /*
    var icon_legionspell =[];
    if(welle>10)
    {
        for(var i=0;i<4;i++)
        {
            console.log(gameEvent[i].spell);
            icon_legionspell[i] = gameEvent[i].spell;
            while (icon_legionspell[i].includes(" ") || icon_legionspell[i].includes("%20")) {
                icon_legionspell[i] = icon_legionspell[i].replace(" ", "");
                icon_legionspell[i] = icon_legionspell[i].replace("%20", "");
            }
            document.getElementById("legionspell"+(i)).innerHTML="<img src='/img/icons/"+ icon_legionspell[i]+".png' height='20px' width=20px'>";
        }
    } 
    else
    {
        for(var i=0;i<4;i++)
        {
            document.getElementById("legionspell"+(i)).innerHTML="";
        }
    }
    */
    clearPictures();
    clearSends();
    for(var i=1;i<5;i++)
    {
        clearLeaks(i);
        getPlayerBuild(i);
        getPlayerLeaks(i);
        getPlayerSends(i);
    }
    fillNames();
    
}

//API
function getGame(callback, gameid) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var game = JSON.parse(xhttp.response);
            callback(game);
        }
    };
    xhttp.open("GET", '/api?command={endgame(game_id:"'+gameid+'"){ts,wave,time,gameDetails{wave,unitsPerWave,leaksPerWave,mercsReceivedPerWave,mercsSentPerWave,workersPerWave,netWorthPerWave}}}', true);
    xhttp.send();
}

function queryGame(gameid) {
    getGame(function (result) {
        console.log(result);
        game = result.endgame;
        getGameDetails(game);
        document.getElementById("mitte").style.display = "none";
        return game;
    }, gameid);
}