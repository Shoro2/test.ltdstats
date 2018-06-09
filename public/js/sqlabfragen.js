//http requests -> server.js: sql abfragen
function getFighter(callback)
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           var fighters = JSON.parse(xhttp.response);
           callback(fighters);
        }
    };
    xhttp.open("GET", "/sql/fighter/", true);
    xhttp.send();
}

function loadFighter()
{
    getFighter(function(result)
    {
        console.log(result);
        return result;
    });
}



function getLegion(callback)
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           var fighters = JSON.parse(xhttp.response);
           callback(fighters);
        }
    };
    xhttp.open("GET", "/sql/legion/", true);
    xhttp.send();
}

function loadLegion()
{
    getLegion(function(result)
    {
        console.log(result);
        return result;
    });
}

function getAttack(callback)
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           var fighters = JSON.parse(xhttp.response);
           callback(fighters);
        }
    };
    xhttp.open("GET", "/sql/attack/", true);
    xhttp.send();
}

function loadAttack()
{
    getAttack(function(result)
    {
        console.log(result);
        return result;
    });
}

function getDefense(callback)
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           var fighters = JSON.parse(xhttp.response);
           callback(fighters);
        }
    };
    xhttp.open("GET", "/sql/defense/", true);
    xhttp.send();
}

function loadDefense()
{
    getDefense(function(result)
    {
        console.log(result);
        return result;
    });
}