var fighter = {};

function getUnit()
{
    var unitname = document.getElementById("playername").value;
    window.location.hash = unitname;
    showDetails(unitname);
}

function parseLink()
{
    var playerurl = window.location.href;
    playerurl = playerurl.substring(playerurl.lastIndexOf("#")+1);
    while(playerurl.includes("+"))
    {
        playerurl = playerurl.replace("+", " ");
    }
    document.getElementById("units_textbox").innerHTML="<h2>Look up any Fighter, Merc or Creature to get detailed information about it</h2>";
    
}

function scanUnits()
{
    var units = ["Proton", "Atom", "AquaSpirit", "RogueWave", "Windhawk", "Violet", "Mudman", "Golem", "Disciple", "Starcaller", "FireLord", "Fenix", "BoneWarrior", "BoneCrusher", "DarkMage", "Gargoyle", "GreenDevil", "Gateguard", "Harbinger", "Butcher", "Nightmare", "Doppelganger", "HeadChef", "LordOfDeath", "Hades", "Buzz", "Consort", "Ranger", "Daphne", "Wileshroom", "Canopie", "Honeyflower", "Deathcap", "Antler", "Whitemane", "BananaBunk", "BananaHaven", "Peewee", "Veteran", "Bazooka", "Pyro", "Zeus", "Tempest", "Leviathan", "MPS", "APS", "Berserker", "Fatalizer", "Millennium", "DoomsdayMachine"];
    units.forEach(unit => {
        document.getElementById("carousel").innerHTML += "<div class='item'><img src='/img/icons/"+ unit +".png' onclick=showDetails('"+ unit +"');></img></div>"
    });
}

function showDetails(myUnit)
{
    
        document.getElementById("wrap").style.display="none";
        getFighter(function(result)
        {    
            result.forEach(element => {
                if(element.name==myUnit)
                {
                    fighter=element;
                    console.log(fighter);
                }
            });
            
            if(fighter.id>0)
            {
                $(".wrap").fadeIn(function()
                {
                    draw(myUnit);
                });
            }
            
            });
    
    
}


function draw(myUnit)
{
    wrapper = document.getElementsByClassName("wrap")[0];
    if(wrapper.classList.contains("active")==false) wrapper.classList.toggle("active");
    textbox = document.getElementById("unit_details");
        textbox.innerHTML = "<h1>"+fighter.name+"</h1>"+
        "<img src='/img/icons/" + fighter.name + ".png'></img><br>"+
        "<b><img src='/img/icons/Health.png'>Health:</b> "+ fighter.hp +"<br>"+
        "<div id='bar_hp'></div>"+
        "<b><img src='/img/icons/Damage.png'>Atk. Power:</b> " + fighter.damage+"<br>"+
        "<div id='bar_dmg'></div>"+
        "<b><img src='/img/icons/Aspd.png'>Atk. Speed:</b> " + fighter.attackspeed+"<br>"+
        "<div id='bar_attspe'></div>"+
        "<b><img src='/img/icons/Mspd.png'>Movement Speed:</b> " + fighter.speed+"<br>"+
        "<div id='bar_mvmspe'></div>"+
        "<b><img src='/img/icons/Range.png'>Range:</b> " + fighter.range+"<br>"+
        "<div id='bar_range'></div>"+
        "<b><img src='/img/icons/Gold.png'>Gold Cost:</b> " + fighter.gold+"<br>"+
        "<div id='bar_gold'></div>"+
        "<b>Atk. Type:</b> " + fighter.attack_type+"<br>"+
        "<b>Def. Type:</b> " + fighter.defense_type+"<br>"+
        "<b>Abilities:</b> <div id='unit_abilities'></div><br>"+
        "<b>Biology:</b> " + fighter.biology+"<br>"+
        "<b>Upgrades:</b> <div id='unit_upgrades'></div><br>"+
        "";
        //parse abilities
        var abilities = [];
        for(var i=1;i<5;i++)
        {
            if(fighter.ability1) 
            {
                abilities[1] = fighter.ability1;
            }
            if(fighter.ability2) 
            {
                abilities[2] = fighter.ability2;
            }
            if(fighter.ability3) 
            {
                abilities[3] = fighter.ability3;
            }
            if(fighter.ability4) 
            {
                abilities[4] = fighter.ability4;
            }
            
        }
        document.getElementById("unit_abilities").innerHTML += "<ul>";
        abilities.forEach(element => {
            document.getElementById("unit_abilities").innerHTML += "<li>"+element+"</li>";
            console.log(element);
        });
        if(abilities.length==0)
        {
            document.getElementById("unit_abilities").innerHTML += "-"
        }
        document.getElementById("unit_abilities").innerHTML += "</ul>";
        //parse upgrades
        var upgrades = [];
        for(var i=1;i<5;i++)
        {
            if(fighter.upgrade1) 
            {
                upgrades[1] = fighter.upgrade1;
            }
            if(fighter.upgrade2) 
            {
                abilities[2] = fighter.upgrade2;
            }
            if(fighter.upgrade3) 
            {
                abilities[3] = fighter.upgrade3;
            }
            if(fighter.upgrade4) 
            {
                abilities[4] = fighter.upgrade4;
            }
            
        }
        document.getElementById("unit_upgrades").innerHTML += "<ul>";
        upgrades.forEach(element => {
            document.getElementById("unit_upgrades").innerHTML += "<li>"+element+"</li>";
            console.log(element);
        });
        if(upgrades.length==0)
        {
            document.getElementById("unit_upgrades").innerHTML += "-"
        }
        document.getElementById("unit_upgrades").innerHTML += "</ul>";
}


// API

function getFighter(callback)
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var fighters = JSON.parse(xhttp.response);
            callback(fighters);
        }
    };
    xhttp.open("GET", "/api?command=", true);
    xhttp.send();
}

function loadFighter() {
    getFighter(function (result) {
        console.log(result);

        return result;
    });
}