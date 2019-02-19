//guides
const guides = [
    { name: "2H Tank", tags: ["maxlvl", "tank", "pve", "raid"]},
    { name: "Titan's Grip", tags: ["maxlvl", "dps", "pve", "raid"]}
];

//function calls
console.log(guides);
listGuides();

//functions
function showGuide(nummer) {
    let guide = guides[nummer];
    let target = document.getElementById("guide_box");
    switch (guide.name) {
        case "vorlage":
            target.innerHTML = "";
            
            break;
        case "2H Tank":
            target.innerHTML = "";
            break;
        case "Titan's Grip":
            target.innerHTML = "";
            break;
    }
    console.log(guide);
}

function listGuides() {
    let target = document.getElementById("guides");
    for (var i = 0; i < guides.length; i++) {
        target.innerHTML += "<div class='guide_block' onclick='showGuide(" + i + ");'>" + guides[i].name + "</div>";
    }
}