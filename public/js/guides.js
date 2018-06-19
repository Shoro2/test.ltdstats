var selected_patch = "";
var selected_type = 0;

function checkSelection()
{
    selected_type = document.getElementById("race").value;
    selected_patch = document.getElementById("patch").value;
}

document.getElementById("patch").onchange = function () {
    filterGuides();
}

document.body.onload = function () {
    queryGuides();
}

function filterGuides() {
    checkSelection();
    guides_unfiltered = guides;
    guides_filtered = [];
    var counter = 0;
    for (var i = 0; i < guides.length; i++) {
        if (guides[i].patch == selected_patch) {
            guides_filtered[counter] = guides[i];
            counter++;
        }
    }
    parseGuides();
}

function parseGuides()
{
    clearGuides();
    tabelle = document.getElementById("guide_results");
    console.log(guides_filtered);
    var selector = document.getElementById("patch");
    $("#table_of_items tr").remove(); 
    for (var i = 0; i < guides_filtered.length; i++) {
        var row = tabelle.insertRow(i + 1);
        var cell = [5];
        for (var e = 0; e < 5; e++) {
            cell[e] = row.insertCell(e);
        }
        cell[0].innerHTML = i + 1;
        cell[1].innerHTML = guides_filtered[i].owner;
        cell[2].innerHTML = guides_filtered[i].type;
        cell[3].innerHTML = guides_filtered[i].patch;
        cell[4].innerHTML = "<a href='https://test.ltdstats.com" + guides_filtered[i].folder+"'>click</a>";
    }
        
    
}

function clearGuides() {
    tabelle = document.getElementById("guide_results");
    while (tabelle.rows.length > 1) {
        tabelle.deleteRow(1);
    }
}


function sqlGetGuides(callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var guides = JSON.parse(xhttp.response);
            callback(guides);
        }
    };
    xhttp.open("GET", '/sql/getGuides', true);
    xhttp.send();
}

function parsePatches() {
    patches = [];
    var counter = 0;
    for (var i = 0; i < guides.length; i++) {
        if (patches[counter] != guides[i].patch) {
            patches[counter] = guides[i].patch;

        }
        else counter++;
    }
    selector = document.getElementById("patch");
    for (var i = 0; i < patches.length; i++) {
        var option = document.createElement("option");
        option.text = "v"+patches[i];
        option.value = patches[i];
        selector.add(option);
    }
}

function queryGuides() {
    sqlGetGuides(function (result) {
        guides = result
        filterGuides();
        parsePatches();
        return guides;
    });
}