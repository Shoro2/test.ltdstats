function checkContent() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var playerurl = url.searchParams.get("unit");
    console.log("unit: " + playerurl);
    console.log("value: " + document.getElementById("playername").value);
    if (playerurl != null) {
        document.getElementById("playername").value = playerurl;
    }
    if (document.getElementById("playername").value) {
        loadFighter(playerurl);

    }
    else {
    }
}

function getPlayer() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var playerurl = url.searchParams.get("unit");
    if (playerurl === null) {
        window.location.href = window.location.href + "?unit=" + document.getElementById("playername").value;
    }
    else {
        window.location.href = "https://test.ltdstats.com/units" + "?unit=" + document.getElementById("playername").value;
    }

}

function scanUnits()
{
    var units = ["proton", "atom", "aqua_spirit", "fire_elemental", "rogue_wave", "windhawk", "violet", "mudman", "golem", "disciple", "starcaller", "fire_lord", "fenix", "bone_warrior", "bone_crusher", "dark_mage", "gargoyle", "green_devil", "gateguard", "harbinger", "butcher", "head_chef", "nightmare", "doppelganger", "lord_of_death", "hades", "buzz", "consort", "ranger", "daphne", "wileshroom", "canopie", "honeyflower", "deathcap", "antler", "whitemane", "banana_bunk", "banana_haven", "peewee", "veteran", "bazooka", "pyro", "zeus", "tempest", "leviathan", "mps", "aps", "berserker", "fatalizer", "millennium", "doomsday_machine", "pollywog", "seraphin", "devilfish", "sea_serpent", "deepcoiler", "grarl", "king_claw", "ocean_templar"];
    units.forEach(unit => {
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
                var unit_type = "Aqua%20Spirit";
                break;
            case "fire_elemental":
                var url = "/img/icons/FireElemental.png";
                var unit_type = "Fire%20Elemental";
                break;
            case "rogue_wave":
                var url = "/img/icons/RogueWave.png";
                var unit_type = "Rogue%20Wave";
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
                var unit_type = "Fire%20Lord";
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
                var unit_type = "Banana%20Bunk";
                break;
            case "banana_haven":
                var url = "/img/icons/BananaHaven.png";
                var unit_type = "Banana%20Haven";
                break;
            //forsaken
            case "bone_warrior":
                var url = "/img/icons/BoneWarrior.png";
                var unit_type = "Bone%20Warrior";
                break;
            case "bone_crusher":
                var url = "/img/icons/BoneCrusher.png";
                var unit_type = "Bone%20Crusher";
                break;
            case "dark_mage":
                var url = "/img/icons/DarkMage.png";
                var unit_type = "Dark%20Mage";
                break;
            case "fire_archer":
                var url = "/img/icons/FireArcher.png";
                var unit_type = "Fire%20Archer";
                break;
            case "gargoyle":
                var url = "/img/icons/Gargoyle.png";
                var unit_type = "Gargoyle";
                break;
            case "green_devil":
                var url = "/img/icons/GreenDevil.png";
                var unit_type = "Green%20Devil";
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
                var unit_type = "Head%20Chef";
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
                var unit_type = "Lord%20Of%20Death";
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
                var unit_type = "Doomsday%20Machine";
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
            case "sea_serpent":
                var url = "/img/icons/SeaSerpent.png";
                var unit_type = "Sea%20Serpent";
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
                var unit_type = "King%20Claw";
                break
            case "ocean_templar":
                var url = "/img/icons/OceanTemplar.png";
                var unit_type = "Ocean%20Templar";
                break
            default:
                var url = "";
                var unit_type = "empty";
                break;
        }

        document.getElementById("carousel").innerHTML += "<div class='item'><img src='"+ url +"' onclick=loadFighter('"+ unit_type +"');></img></div>"
    });
}


function draw(myUnit)
{
    var fighter = myUnit;
    //console.log(fighter.name);
    wrapper = document.getElementsByClassName("wrap")[0];
    if (wrapper.classList.contains("active") == false) wrapper.classList.toggle("active");
    document.getElementById("unit_name").textContent = fighter.name;
    document.getElementById("unit_legion").textContent = fighter.legion;
    document.getElementById("unit_icon").src = "/img/i" + fighter.iconpath.substring(1);
    document.getElementById("unit_health").textContent = "Health: "+fighter.health;
    document.getElementById("unit_attackspeed").textContent = "Attackspeed: "+fighter.attackspeed;
    document.getElementById("unit_attacktype").textContent = "Attack Type: "+fighter.attacktype;
    document.getElementById("unit_defensetype").textContent = "Armor Type: "+fighter.armortype;
    document.getElementById("unit_dps").textContent = "DPS: "+fighter.dps;
    document.getElementById("unit_range").textContent = "Range: "+fighter.range;
    document.getElementById("unit_goldcost").textContent = "Goldcost: "+fighter.goldcost;
    document.getElementById("unit_totalcost").textContent = "Total Value: " + fighter.totalvalue;
    document.getElementById("unit_abilities").textContent = "Abilities: " + fighter.abilities;
    document.getElementById("unit_upgrades").textContent = "Upgrades to: " + fighter.upgradesto;
    document.getElementById("unit_description").textContent = "Description: " + fighter.description;
    document.getElementById("unit_tooltip").textContent = "Tooltip: " + fighter.tooltip;

}


// API

function getFighter(callback, unitname)
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var fighters = JSON.parse(xhttp.response);
            callback(fighters);
        }
    };
    xhttp.open("GET", '/api?command={unit(name: "'+unitname+'"){id,name,legion,description,tooltip,iconpath,abilities,armortype,attacktype,attackspeed,range,upgradesto,foodcost,goldcost,totalvalue,totalfood,dps,health}}', true);
    xhttp.send();
}

function loadFighter(unitname) {
    console.log(unitname);
    getFighter(function (result) {
        //console.log(result);
        document.getElementById("playername").value = result.unit.name;
        draw(result.unit);
        return result;
    }, unitname);
}

document.onkeydown = function (event) {
    if (event.keyCode == 13) {
        if (event.target.id == "playername") setPlayer();
    }
}