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
                    'rgba(0,0,0,1)',                    'rgba(0,0,0,1)',
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
}

function loadWinrates() {
    if (document.getElementById("value_textField").style.display == "") var meineValue = document.getElementById("value_textField").value;
    else var meineValue = document.getElementById("value_dateField").value;
    queryWinRates(document.getElementById("typeselector").value, meineValue);
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
    xhttp.open("GET", '/api/stats/legions/winrate?type='+ type +'&value='+value, true);
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