//show container
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
            var meinText = "Workers per Wave";
            break;
        case "winrates":
            var totalgames = 0;
            data = data.stats.legionPickWinRate;
            console.log(data);
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
    }
    var ctx = document.getElementById("myChart");
    ctx.height = 500;
    ctx.width = 1000;
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
            console.log(myChart.data.datasets);
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
    }

}
/*
function createBarGraph(data) {
    hideLoad();
    var ctx = document.getElementById("myChart");
    console.log(data);
    ctx.height = 500;
    ctx.width = 1000;
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: null,
                data: [],
                backgroundColor: [
                    'rgba(255, 255, 0, 0.8)',
                    'rgba(255, 255, 0, 0.8)',
                    'rgba(255, 0, 0, 0.8)',
                    'rgba(255, 0, 0, 0.8)',
                    'rgba(0, 255, 0, 0.8)',
                    'rgba(0, 255, 0, 0.8)',
                    'rgba(0, 0, 0, 0.8)',
                    'rgba(0, 0, 0, 0.8)',
                    'rgba(0, 0, 255, 0.8)',
                    'rgba(0, 0, 255, 0.8)'
                ],
                borderColor: [
                    'rgba(0,0,0,1)',
                    'rgba(0,0,0,1)',
                    'rgba(0,0,0,1)',
                    'rgba(0,0,0,1)',
                    'rgba(0,0,0,1)', 'rgba(0,0,0,1)',
                    'rgba(0,0,0,1)',
                    'rgba(0,0,0,1)',
                    'rgba(0,0,0,1)',
                    'rgba(0,0,0,1)'
                ],
                borderWidth: 1
            }]
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
                    text: "Pick- and Winrates per Legion in %"
                }
        }
    });
    //calc winrates
    data = data.stats.legionPickWinRate;
    var totalgames = 0;
    var pickchance = [];
    var winchance = [];
    for (var i = 0; i < 5; i++) {
        totalgames += data[i].gamesPicked;
    }
    for (var i = 0; i < 5; i++) {
        pickchance[i] = ((data[i].gamesPicked / totalgames) * 100).toFixed(2);
        winchance[i] = ((data[i].gamesWon / data[i].gamesPicked) * 100).toFixed(2);
        addData(myChart, "Pick " + data[i].legion, pickchance[i]);
        addData(myChart, "Win " + data[i].legion, winchance[i]);
    }
}
*/
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
        return result;
    }, type, value);
}

function getAvgvIncEnd(callback, type, value) {
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
        return result;
    }, type, value);
}


function getAvgvWorkersEnd(callback, type, value) {
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
        return result;
    }, type, value);
}

function getAvgLeakssEnd(callback, type, value) {
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
        return result;
    }, type, value);
}