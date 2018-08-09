var selected_patch = "";
var selected_type = "";

function checkSelection() {
    selected_type = document.getElementById("race").value;
    selected_patch = document.getElementById("patch").value;
}

document.getElementById("patch").onchange = function () {
    filterGuides();
};

document.getElementById("race").onchange = function () {
    filterGuides();
};

document.body.onload = function () {
    queryGuides();
};

function filterGuides() {
    checkSelection();
    guides_unfiltered = guides;
    guides_filtered = [];
    var counter = 0;
    for (var i = 0; i < guides.length; i++) {
        if (selected_patch === "All") {
            if (selected_type === "All") {
                guides_filtered[counter] = guides[i];
                counter++;
            }
            else if (guides[i].type === selected_type) {
                guides_filtered[counter] = guides[i];
                counter++;
            }
        }
        else if (selected_type === "All") {
            if (selected_patch === "All") {
                guides_filtered[counter] = guides[i];
                counter++;
            }
            else if (guides[i].patch === selected_patch) {
                guides_filtered[counter] = guides[i];
                counter++;
            }
        }





        if (guides[i].patch === selected_patch && guides[i].type === selected_type) {
            guides_filtered[counter] = guides[i];
            counter++;
        }
    }
    parseGuides();
}

function parseGuides() {
    clearGuides();
    tabelle = document.getElementById("guide_results");
    var selector = document.getElementById("patch");
    $("#table_of_items tr").remove();
    for (var i = 0; i < guides_filtered.length; i++) {
        var row = tabelle.insertRow(i + 1);
        var cell = [6];
        for (var e = 0; e < 6; e++) {
            cell[e] = row.insertCell(e);
        }
        cell[0].innerHTML = i + 1;
        cell[1].innerHTML = guides_filtered[i].creator;
        cell[2].innerHTML = guides_filtered[i].title;
        cell[3].innerHTML = guides_filtered[i].type;
        cell[4].innerHTML = guides_filtered[i].patch.replace("v","");
        cell[5].innerHTML = "<a href='" + guides_filtered[i].url + "'>click</a>";
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
        if (this.readyState === 4 && this.status === 200) {
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
        if (patches[counter] !== guides[i].patch) {
            patches[counter] = guides[i].patch;
            counter++;
        }
        else counter++;
    }
    selector = document.getElementById("patch");
    for (i = 0; i < patches.length; i++) {
        var option = document.createElement("option");
        option.text = "v" + patches[i];
        option.value = patches[i];
        if (patches[i - 1] !== patches[i]) selector.add(option);
    }
}

function queryGuides() {
    sqlGetGuides(function (result) {
        guides = JSON.parse(result);
        console.log(guides);
        filterGuides();
        parsePatches();
        return guides;
    });
}