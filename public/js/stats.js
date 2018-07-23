//show container

/* To add stats:
 * 1. edit function createBarGraph() -> parse data + update chart
 * 2. create function showX()
 * 3. edit readSelection()
 * */


function showStatsPage() {
    document.getElementById("stats").style.display = "inherit";
}
function showLoad() {
    document.getElementById("mitte").style.display = "inherit";
}
function hideStatsPage() {
    document.getElementById("stats").style.display = "none";
    myChart.destroy();
}
function hideLoad() {
    document.getElementById("mitte").style.display = "none";
}
function showInputs() {
    document.getElementById("inputs").style.display = "";
}
function hideInputs() {
    document.getElementById("inputs").style.display = "none";
}

function createLineGraph(data) {
    var ctx = document.getElementById("myChart");
    ctx.height = 500;
    ctx.width = 1000;
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Elo Distribution',
                data: [],
                backgroundColor: [
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            },
            title:
                {
                    display: true,
                    text: "Elo Distribution per Elo in %"
                }
        }
    });
    var eloDistribution = data.stats.eloDistribution;
    eloDistribution.forEach(function (element) {
        addData(myChart, element.percentile, element.elo);
    });
}

function createBarGraph(data) {
    hideLoad();
    var graphColor = ['rgba(255, 255, 0, 0.8)', 'rgba(255, 0, 0, 0.8)', 'rgba(0, 255, 0, 0.8)', 'rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 255, 0.8)'];
    var legions = ["Element", "Forsaken", "Grove", "Mastermind", "Mech"];
    // parse data
    switch (abfrage) {
        case "workersperwave":
            data = data.stats.legionAverageWorkersPerWave;
            var totalgames = 0;
            var workersperwave = [];
            for (var i = 0; i < 5; i++) {
                workersperwave[i] = new Array(21);
            }
            //0: element
            //1: forsaken
            //2: grove
            //3: mastermind
            //4: mech
            //5: atlantean
            for (var i = 0; i < data.length; i++) {
                switch (data[i].legion) {
                    case "Element":
                        workersperwave[0][data[i].wave - 1] = data[i].workers;
                        break;
                    case "Forsaken":
                        workersperwave[1][data[i].wave - 1] = data[i].workers;
                        break;
                    case "Grove":
                        workersperwave[2][data[i].wave - 1] = data[i].workers;
                        break;
                    case "Mastermind":
                        workersperwave[3][data[i].wave - 1] = data[i].workers;
                        break;
                    case "Mech":
                        workersperwave[4][data[i].wave - 1] = data[i].workers;
                        break;
                }
            }
            var meinText = "Average Workercount per Wave";
            break;
        case "winrates":
            var totalgames = 0;
            data = data.stats.legionPickWinRate;
            for (var i = 0; i < data.length; i++) {
                totalgames += data[i].gamesPicked;
            }
            var pickchance = [];
            var winchance = [];
            for (var i = 0; i < data.length; i++) {
                switch (data[i].legion) {
                    case "Element":
                        pickchance[0] = ((data[i].gamesPicked / totalgames) * 100).toFixed(2);
                        winchance[0] = ((data[i].gamesWon / data[i].gamesPicked) * 100).toFixed(2);
                        break;
                    case "Forsaken":
                        pickchance[1] = ((data[i].gamesPicked / totalgames) * 100).toFixed(2);
                        winchance[1] = ((data[i].gamesWon / data[i].gamesPicked) * 100).toFixed(2);
                        break;
                    case "Grove":
                        pickchance[2] = ((data[i].gamesPicked / totalgames) * 100).toFixed(2);
                        winchance[2] = ((data[i].gamesWon / data[i].gamesPicked) * 100).toFixed(2);
                        break;
                    case "Mastermind":
                        pickchance[3] = ((data[i].gamesPicked / totalgames) * 100).toFixed(2);
                        winchance[3] = ((data[i].gamesWon / data[i].gamesPicked) * 100).toFixed(2);
                        break;
                    case "Mech":
                        pickchance[4] = ((data[i].gamesPicked / totalgames) * 100).toFixed(2);
                        winchance[4] = ((data[i].gamesWon / data[i].gamesPicked) * 100).toFixed(2);
                        break;
                }
            }
            console.log(totalgames);
            var meinText = "Pick- & Winrates per Legion in % (Total Games: " + totalgames + ")";
            break;
        case "networthperwave":
            data = data.stats.legionAverageNetWorthPerWave;
            var networthperwave = [];
            for (var i = 0; i < 5; i++) {
                networthperwave[i] = new Array(21);
            }
            for (var i = 0; i < data.length; i++) {
                switch (data[i].legion) {
                    case "Element":
                        networthperwave[0][data[i].wave - 1] = data[i].networth;
                        break;
                    case "Forsaken":
                        networthperwave[1][data[i].wave - 1] = data[i].networth;
                        break;
                    case "Grove":
                        networthperwave[2][data[i].wave - 1] = data[i].networth;
                        break;
                    case "Mastermind":
                        networthperwave[3][data[i].wave - 1] = data[i].networth;
                        break;
                    case "Mech":
                        networthperwave[4][data[i].wave - 1] = data[i].networth;
                        break;
                }
            }
            var meinText = "Average Networth per Wave";
            break;
        case "valueonend":
            data = data.stats.legionAverageValueByEndingWave;
            var valueonend = [];
            for (var i = 0; i < 5; i++) {
                valueonend[i] = new Array(21);
            }
            for (var i = 0; i < data.length; i++) {
                switch (data[i].legion) {
                    case "Element":
                        valueonend[0][data[i].wave - 1] = data[i].value;
                        break;
                    case "Forsaken":
                        valueonend[1][data[i].wave - 1] = data[i].value;
                        break;
                    case "Grove":
                        valueonend[2][data[i].wave - 1] = data[i].value;
                        break;
                    case "Mastermind":
                        valueonend[3][data[i].wave - 1] = data[i].value;
                        break;
                    case "Mech":
                        valueonend[4][data[i].wave - 1] = data[i].value;
                        break;
                }
            }
            var meinText = "Average Value on game end";
            break;
        case "incomeonend":
            data = data.stats.legionAverageIncomeByEndingWave;
            var incomeonend = [];
            for (var i = 0; i < 5; i++) {
                incomeonend[i] = new Array(21);
            }
            for (var i = 0; i < data.length; i++) {
                switch (data[i].legion) {
                    case "Element":
                        incomeonend[0][data[i].wave - 1] = data[i].income;
                        break;
                    case "Forsaken":
                        incomeonend[1][data[i].wave - 1] = data[i].income;
                        break;
                    case "Grove":
                        incomeonend[2][data[i].wave - 1] = data[i].income;
                        break;
                    case "Mastermind":
                        incomeonend[3][data[i].wave - 1] = data[i].income;
                        break;
                    case "Mech":
                        incomeonend[4][data[i].wave - 1] = data[i].income;
                        break;
                }
            }
            var meinText = "Average Income on game end";
            break;
        case "workersonend":
            data = data.stats.legionAverageWorkersByEndingWave;
            var workersonend = [];
            for (var i = 0; i < 5; i++) {
                workersonend[i] = new Array(21);
            }
            for (var i = 0; i < data.length; i++) {
                switch (data[i].legion) {
                    case "Element":
                        workersonend[0][data[i].wave - 1] = data[i].workers;
                        break;
                    case "Forsaken":
                        workersonend[1][data[i].wave - 1] = data[i].workers;
                        break;
                    case "Grove":
                        workersonend[2][data[i].wave - 1] = data[i].workers;
                        break;
                    case "Mastermind":
                        workersonend[3][data[i].wave - 1] = data[i].workers;
                        break;
                    case "Mech":
                        workersonend[4][data[i].wave - 1] = data[i].workers;
                        break;
                }
            }
            console.log(workersonend);
            var meinText = "Average Workers on game end";
            break;
        case "leaksonend":
            data = data.stats.legionAverageLeaksByEndingWave;
            var leaksonend = [];
            for (var i = 0; i < 5; i++) {
                leaksonend[i] = new Array(21);
            }
            for (var i = 0; i < data.length; i++) {
                switch (data[i].legion) {
                    case "Element":
                        leaksonend[0][data[i].wave - 1] = data[i].leaks;
                        break;
                    case "Forsaken":
                        leaksonend[1][data[i].wave - 1] = data[i].leaks;
                        break;
                    case "Grove":
                        leaksonend[2][data[i].wave - 1] = data[i].leaks;
                        break;
                    case "Mastermind":
                        leaksonend[3][data[i].wave - 1] = data[i].leaks;
                        break;
                    case "Mech":
                        leaksonend[4][data[i].wave - 1] = data[i].leaks;
                        break;
                }
            }
            var meinText = "Average Leaks on game end";
            break;
    }
    var ctx = document.getElementById("myChart");
    ctx.height = 500;
    ctx.width = 1000;
    //create chart
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: []
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            legend:
                {
                    display: false
                },
            title:
                {
                    display: true,
                    text: meinText
                }
        }
    });
    //update chart
    switch (abfrage) {
        case "winrates":
            //calc winrates
            myChart.data.labels.push("Element", "Forsaken", "Grove", "Mastermind","Mech");
            myChart.data.datasets.push({ label: "Pickrate", data: [], backgroundColor: ['rgba(255, 255, 0, 0.8)', 'rgba(255, 0, 0, 0.8)', 'rgba(0, 255, 0, 0.8)', 'rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 255, 0.8)'], borderColor: 'rgba(0,0,0,1)', borderWidth: 1 });
            myChart.update();
            myChart.data.datasets.push({ label: "Winrate", data: [], backgroundColor: ['rgba(255, 255, 0, 0.8)', 'rgba(255, 0, 0, 0.8)', 'rgba(0, 255, 0, 0.8)', 'rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 255, 0.8)'], borderColor: 'rgba(0,0,0,1)', borderWidth: 1 });
            myChart.update();
            for (var i = 0; i < 5; i++) {
                myChart.data.datasets[0].data.push(pickchance[i]);
                myChart.update();
                myChart.data.datasets[1].data.push(winchance[i]);
                myChart.update();
            }
            break;
        case "workersperwave":
            myChart.data.labels.push("1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21");
            for (var i = 0; i < 5; i++) {
                myChart.data.datasets.push({ label: legions[i], data: [], backgroundColor: graphColor[i], borderColor: 'rgba(0,0,0,1)', borderWidth: 1 });
                myChart.update();
            }
            for (var i = 0; i < 21; i++) {
                myChart.data.datasets[0].data.push(workersperwave[0][i]);
                myChart.update();
                myChart.data.datasets[1].data.push(workersperwave[1][i]);
                myChart.update();
                myChart.data.datasets[2].data.push(workersperwave[2][i]);
                myChart.update();
                myChart.data.datasets[3].data.push(workersperwave[3][i]);
                myChart.update();
                myChart.data.datasets[4].data.push(workersperwave[4][i]);
                myChart.update();
            }
            break;
        case "networthperwave":
            myChart.data.labels.push("1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21");
            for (var i = 0; i < 5; i++) {
                myChart.data.datasets.push({ label: legions[i], data: [], backgroundColor: graphColor[i], borderColor: 'rgba(0,0,0,1)', borderWidth: 1 });
                myChart.update();
            }
            for (var i = 0; i < 21; i++) {
                myChart.data.datasets[0].data.push(networthperwave[0][i]);
                myChart.update();
                myChart.data.datasets[1].data.push(networthperwave[1][i]);
                myChart.update();
                myChart.data.datasets[2].data.push(networthperwave[2][i]);
                myChart.update();
                myChart.data.datasets[3].data.push(networthperwave[3][i]);
                myChart.update();
                myChart.data.datasets[4].data.push(networthperwave[4][i]);
                myChart.update();
            }
            break;
        case "valueonend":
            myChart.data.labels.push("1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21");
            for (var i = 0; i < 5; i++) {
                myChart.data.datasets.push({ label: legions[i], data: [], backgroundColor: graphColor[i], borderColor: 'rgba(0,0,0,1)', borderWidth: 1 });
                myChart.update();
            }
            for (var i = 0; i < 21; i++) {
                myChart.data.datasets[0].data.push(valueonend[0][i]);
                myChart.update();
                myChart.data.datasets[1].data.push(valueonend[1][i]);
                myChart.update();
                myChart.data.datasets[2].data.push(valueonend[2][i]);
                myChart.update();
                myChart.data.datasets[3].data.push(valueonend[3][i]);
                myChart.update();
                myChart.data.datasets[4].data.push(valueonend[4][i]);
                myChart.update();
            }
            break;
        case "incomeonend":
            myChart.data.labels.push("1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21");
            for (var i = 0; i < 5; i++) {
                myChart.data.datasets.push({ label: legions[i], data: [], backgroundColor: graphColor[i], borderColor: 'rgba(0,0,0,1)', borderWidth: 1 });
                myChart.update();
            }
            for (var i = 0; i < 21; i++) {
                myChart.data.datasets[0].data.push(incomeonend[0][i]);
                myChart.update();
                myChart.data.datasets[1].data.push(incomeonend[1][i]);
                myChart.update();
                myChart.data.datasets[2].data.push(incomeonend[2][i]);
                myChart.update();
                myChart.data.datasets[3].data.push(incomeonend[3][i]);
                myChart.update();
                myChart.data.datasets[4].data.push(incomeonend[4][i]);
                myChart.update();
            }
            break;
        case "workersonend":
            myChart.data.labels.push("1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21");
            for (var i = 0; i < 5; i++) {
                myChart.data.datasets.push({ label: legions[i], data: [], backgroundColor: graphColor[i], borderColor: 'rgba(0,0,0,1)', borderWidth: 1 });
                myChart.update();
            }
            for (var i = 0; i < 21; i++) {
                myChart.data.datasets[0].data.push(workersonend[0][i]);
                myChart.update();
                myChart.data.datasets[1].data.push(workersonend[1][i]);
                myChart.update();
                myChart.data.datasets[2].data.push(workersonend[2][i]);
                myChart.update();
                myChart.data.datasets[3].data.push(workersonend[3][i]);
                myChart.update();
                myChart.data.datasets[4].data.push(workersonend[4][i]);
                myChart.update();
            }
            break;
        case "leaksonend":
            myChart.data.labels.push("1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21");
            for (var i = 0; i < 5; i++) {
                myChart.data.datasets.push({ label: legions[i], data: [], backgroundColor: graphColor[i], borderColor: 'rgba(0,0,0,1)', borderWidth: 1 });
                myChart.update();
            }
            for (var i = 0; i < 21; i++) {
                myChart.data.datasets[0].data.push(leaksonend[0][i]);
                myChart.update();
                myChart.data.datasets[1].data.push(leaksonend[1][i]);
                myChart.update();
                myChart.data.datasets[2].data.push(leaksonend[2][i]);
                myChart.update();
                myChart.data.datasets[3].data.push(leaksonend[3][i]);
                myChart.update();
                myChart.data.datasets[4].data.push(leaksonend[4][i]);
                myChart.update();
            }
            break;
    }

}

function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

function showEloDistribution(data) {
    hideLoad();
    hideInputs();
    showStatsPage();
    createLineGraph(data);
}

function saveSelection() {
    type = document.getElementById("typeselector").value;
    switch (type) {
        case "version":
            document.getElementById("value_textField").style.display = "";
            document.getElementById("value_dateField").style.display = "none";
            break;
        case "playerid":
            document.getElementById("value_textField").style.display = "";
            document.getElementById("value_dateField").style.display = "none";
            break;
        case "tsgte":
            document.getElementById("value_dateField").style.display = "";
            document.getElementById("value_textField").style.display = "none";
            break;
        case "tslt":
            document.getElementById("value_dateField").style.display = "";
            document.getElementById("value_textField").style.display = "none";
            break;
        default:
            break;
    }
}
//onclicks
function showWinPickrates() {
    showInputs();
    showStatsPage();
    abfrage = "winrates";
}
function showWorkersPerWave() {
    showInputs();
    showStatsPage();
    abfrage = "workersperwave";
}
function showNetworthPerWave() {
    showInputs();
    showStatsPage();
    abfrage = "networthperwave";
}
function showValueOnEnd() {
    showInputs();
    showStatsPage();
    abfrage = "valueonend";
}
function showIncomeOnEnd() {
    showInputs();
    showStatsPage();
    abfrage = "incomeonend";
}
function showWorkersOnEnd() {
    showInputs();
    showStatsPage();
    abfrage = "workersonend";
}
function showLeaksOnEnd() {
    showInputs();
    showStatsPage();
    abfrage = "leaksonend";
}
// call query
function readSelection() {
    try {
        myChart.destroy();
    }
    catch{ }
    if (document.getElementById("value_textField").style.display == "") var meineValue = document.getElementById("value_textField").value;
    else var meineValue = document.getElementById("value_dateField").value;
    switch (abfrage) {
        case "winrates":
            queryWinRates(document.getElementById("typeselector").value, meineValue);
            break;
        case "workersperwave":
            queryAvgWorkersWave(document.getElementById("typeselector").value, meineValue);
            break;
        case "networthperwave":
            queryAvgNetworthWave(document.getElementById("typeselector").value, meineValue);
            break;
        case "valueonend":
            queryAvgValueEnd(document.getElementById("typeselector").value, meineValue);
            break;
        case "incomeonend":
            queryAvgIncEnd(document.getElementById("typeselector").value, meineValue);
            break;
        case "workersonend":
            queryAvgWorkersEnd(document.getElementById("typeselector").value, meineValue);
            break;
        case "leaksonend":
            queryAvgLeaksEnd(document.getElementById("typeselector").value, meineValue);
            break;
        default:
            console.log("Fehler readselection: " + abfrage);
            break;
    }

}
























//api requests
function getEloDistribution(callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback(JSON.parse(xhttp.response));
        }
    };
    xhttp.open("GET", '/api/stats/elo', true);
    xhttp.send();
}
function queryEloDistribution() {
    showLoad();
    getEloDistribution(function (result) {
        showEloDistribution(result);
        return result;
    });
}
function getWinRates(callback, type, value) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback(JSON.parse(xhttp.response));
        }
    };
    xhttp.open("GET", '/api/stats/legions/winrate?type=' + type + '&value=' + value, true);
    xhttp.send();
}
function queryWinRates(type, value) {
    showLoad();
    getWinRates(function (result) {
        createBarGraph(result);
        return result;
    }, type, value);
}

function getAvgValueEnd(callback, type, value) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback(JSON.parse(xhttp.response));
        }
    };
    xhttp.open("GET", '/api/stats/legions/avgvalueEnd?type=' + type + '&value=' + value, true);
    xhttp.send();
}
function queryAvgValueEnd(type, value) {
    getAvgValueEnd(function (result) {
        createBarGraph(result);
        return result;
    }, type, value);
}

function getAvgIncEnd(callback, type, value) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback(JSON.parse(xhttp.response));
        }
    };
    xhttp.open("GET", '/api/stats/legions/avgvincEnd?type=' + type + '&value=' + value, true);
    xhttp.send();
}
function queryAvgIncEnd(type, value) {
    getAvgIncEnd(function (result) {
        createBarGraph(result);
        return result;
    }, type, value);
}


function getAvgWorkersEnd(callback, type, value) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback(JSON.parse(xhttp.response));
        }
    };
    xhttp.open("GET", '/api/stats/legions/avgworkersEnd?type=' + type + '&value=' + value, true);
    xhttp.send();
}
function queryAvgWorkersEnd(type, value) {
    getAvgWorkersEnd(function (result) {
        createBarGraph(result);
        return result;
    }, type, value);
}

function getAvgLeaksEnd(callback, type, value) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback(JSON.parse(xhttp.response));
        }
    };
    xhttp.open("GET", '/api/stats/legions/avgleaksEnd?type=' + type + '&value=' + value, true);
    xhttp.send();
}
function queryAvgLeaksEnd(type, value) {
    getAvgLeaksEnd(function (result) {
        createBarGraph(result);
        return result;
    }, type, value);
}
function getAvgWorkersWave(callback, type, value) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback(JSON.parse(xhttp.response));
        }
    };
    xhttp.open("GET", '/api/stats/legions/avgworkersWave?type=' + type + '&value=' + value, true);
    xhttp.send();
}
function queryAvgWorkersWave(type, value) {
    getAvgWorkersWave(function (result) {
        createBarGraph(result);
        return result;
    }, type, value);
}

function getAvgNetworthWave(callback, type, value) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback(JSON.parse(xhttp.response));
        }
    };
    xhttp.open("GET", '/api/stats/legions/avgnetworthsWave?type=' + type + '&value=' + value, true);
    xhttp.send();
}
function queryAvgNetworthWave(type, value) {
    getAvgNetworthWave(function (result) {
        createBarGraph(result);
        return result;
    }, type, value);
}