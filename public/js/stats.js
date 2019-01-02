//show container

/* To add stats:
 * 1. edit function createBarGraph() -> parse data + update chart
 * 2. create function showX()
 * 3. edit readSelection()
 * 4. add help
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
function showHelpPage() {
    document.getElementById("helpwindow").style.display = "";
    var content_ele = document.getElementById("helpcontent");
    switch (abfrage) {
        case "elodistribution":
            content_ele.innerHTML = "<h3>Elo Distribution</h3><p>A Curve that shows the current Elo Distribution in percentages.<p><p><i>Click anywhere to close.</i>";
            break;
        case "winrates":
            content_ele.innerHTML = "<h3>Winchance</h3><p>Shows the Pick- and Winrates for all Legions.<p>Filters:<br><b>Patch:</b><br>prefix: 'v.' + patch version + (wildcard ''%')<br> E.g. v2.32, v2.3%<p><b> > Date:</b><br>Finds any game with timestamp > selected date.<br> Use current date to see todays winchances.<p><b> < Date:</b></br>Finds any game with timestamp < selected date.<br>If you request to many games you will time out.<p><p><i>Click anywhere to close.</i>";
            break;
        case "workersperwave":
            content_ele.innerHTML = "<h3>Workers per Wave</h3><p>Shows the average worker count per wave and legion.<p>Filters:<br><b>Patch:</b><br>prefix: 'v.' + patch version + (wildcard ''%')<br> E.g. v2.32, v2.3%<p><b> > Date:</b><br>Finds any game with timestamp > selected date.<br> Use current date to see todays winchances.<p><b> < Date:</b></br>Finds any game with timestamp < selected date.<br> If you request to many games you will time out.<p><p><i>Click anywhere to close.</i>";
            break;
        case "networthperwave":
            content_ele.innerHTML = "<h3>Networth per Wave</h3><p>Shows the average networth per wave and legion.<p>Filters:<br><b>Patch:</b><br>prefix: 'v.' + patch version + (wildcard ''%')<br> E.g. v2.32, v2.3%<p><b> > Date:</b><br>Finds any game with timestamp > selected date.<br> Use current date to see todays winchances.<p><b> < Date:</b></br>Finds any game with timestamp < selected date.<br> If you request to many games you will time out.<p><p><i>Click anywhere to close.</i>";
            break;
        case "valueonend":
            content_ele.innerHTML = "<h3>Value on Game End/h3><p>Shows the average value per wave and legion ON GAME END.<p>Filters:<br><b>Patch:</b><br>prefix: 'v.' + patch version + (wildcard ''%')<br> E.g. v2.32, v2.3%<p><b> > Date:</b><br>Finds any game with timestamp > selected date.<br> Use current date to see todays winchances.<p><b> < Date:</b></br>Finds any game with timestamp < selected date.<br> If you request to many games you will time out.<p><p><i>Click anywhere to close.</i>";
            break;
        case "incomeonend":
            content_ele.innerHTML = "<h3>Income on Game End/h3><p>Shows the average income per wave and legion ON GAME END.<p>Filters:<br><b>Patch:</b><br>prefix: 'v.' + patch version + (wildcard ''%')<br> E.g. v2.32, v2.3%<p><b> > Date:</b><br>Finds any game with timestamp > selected date.<br> Use current date to see todays winchances.<p><b> < Date:</b></br>Finds any game with timestamp < selected date.<br> If you request to many games you will time out.<p><p><i>Click anywhere to close.</i>";
            break;
        case "workersonend":
            content_ele.innerHTML = "<h3>Workers on Game End/h3><p>Shows the average worker count per wave and legion ON GAME END.<p>Filters:<br><b>Patch:</b><br>prefix: 'v.' + patch version + (wildcard ''%')<br> E.g. v2.32, v2.3%<p><b> > Date:</b><br>Finds any game with timestamp > selected date.<br> Use current date to see todays winchances.<p><b> < Date:</b></br>Finds any game with timestamp < selected date.<br> If you request to many games you will time out.<p><p><i>Click anywhere to close.</i>";
            break;
        case "leaksonend":
            content_ele.innerHTML = "<h3>Leaks on Game End/h3><p>Shows the average leaks per wave and legion ON GAME END.<p>Filters:<br><b>Patch:</b><br>prefix: 'v.' + patch version + (wildcard ''%')<br> E.g. v2.32, v2.3%<p><b> > Date:</b><br>Finds any game with timestamp > selected date.<br> Use current date to see todays winchances.<p><b> < Date:</b></br>Finds any game with timestamp < selected date.<br> If you request to many games you will time out.<p><p><i>Click anywhere to close.</i>";
            break;
    }
}
function hideHelpPage() {
    document.getElementById("helpwindow").style.display = "none";
}
function hideWave() {
    document.getElementById("slider_container").style.display = "none";
    document.getElementById("tablecontainer").style.display = "none";
}
function showWave() {
    document.getElementById("slider_container").style.display = "";
    document.getElementById("tablecontainer").style.display = "";
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
                    text: "Elo Distribution in %"
                }
        }
    });
    var eloDistribution = data.stats.eloDistribution;
    var elos = [1600, 1500, 1400, 1300, 1250, 1200, 1150, 1100, 1050, 1000, 900, 800];
    var percentages = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (var i = 0; i < eloDistribution.length; i++) {
        if (eloDistribution[i].elo >= elos[0]) {
            percentages[0]++;
        }
        else if (eloDistribution[i].elo >= elos[1]) {
            percentages[1]++;
        }
        else if (eloDistribution[i].elo >= elos[2]) {
            percentages[2]++;
        }
        else if (eloDistribution[i].elo >= elos[3]) {
            percentages[3]++;
        }
        else if (eloDistribution[i].elo >= elos[4]) {
            percentages[4]++;
        }
        else if (eloDistribution[i].elo >= elos[5]) {
            percentages[5]++;
        }
        else if (eloDistribution[i].elo >= elos[6]) {
            percentages[6]++;
        }
        else if (eloDistribution[i].elo >= elos[7]) {
            percentages[7]++;
        }
        else if (eloDistribution[i].elo >= elos[8]) {
            percentages[8]++;
        }
        else if (eloDistribution[i].elo >= elos[9]) {
            percentages[9]++;
        }
        else if (eloDistribution[i].elo >= elos[10]) {
            percentages[10]++;
        }
        else if (eloDistribution[i].elo >= elos[11]) {
            percentages[11]++;
        }
    }
    for (var i = 0; i < elos.length; i++) {
        if (percentages[i] == 0) percentages[i] = 0.1;
        addData(myChart, elos[i], percentages[i]);
    }
}
function createBarGraph(data) {
    hideLoad();
    var graphColor = ['rgba(139, 0, 139, 0.8)', 'rgba(255, 255, 0, 0.8)', 'rgba(255, 0, 0, 0.8)', 'rgba(0, 255, 0, 0.8)', 'rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 255, 0.8)'];
    var legions = ["Atlantean", "Element", "Forsaken", "Grove", "Mastermind", "Mech"];
    // parse data
    switch (abfrage) {
        case "workersperwave":
            data = data.stats.legionAverageWorkersPerWave;
            var total_picks = 0;
            var workersperwave = [];
            for (var i = 0; i < 6; i++) {
                workersperwave[i] = new Array(21);
            }
            //0: atlantean
            //1: element
            //2: forsaken
            //3: grove
            //4: mastermind
            //5: mech
            //6: atlantean
            for (var i = 0; i < data.length; i++) {
                switch (data[i].legion) {
                    case "Atlantean":
                        workersperwave[0][data[i].wave - 1] = data[i].workers;
                        break;
                    case "Element":
                        workersperwave[1][data[i].wave - 1] = data[i].workers;
                        break;
                    case "Forsaken":
                        workersperwave[2][data[i].wave - 1] = data[i].workers;
                        break;
                    case "Grove":
                        workersperwave[3][data[i].wave - 1] = data[i].workers;
                        break;
                    case "Mastermind":
                        workersperwave[4][data[i].wave - 1] = data[i].workers;
                        break;
                    case "Mech":
                        workersperwave[5][data[i].wave - 1] = data[i].workers;
                        break;
                }
            }
            var meinText = "Average Workercount per Wave";
            break;
        case "winrates":
            var total_picks = 0;
            data = data.stats.legionPickWinRate;
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                total_picks += data[i].gamesPicked;
            }
            var pickchance = [];
            var winchance = [];
            for (var i = 0; i < data.length; i++) {
                switch (data[i].legion) {
                    case "Atlantean":
                        pickchance[0] = ((data[i].gamesPicked / total_picks) * 100).toFixed(2);
                        winchance[0] = ((data[i].gamesWon / data[i].gamesPicked) * 100).toFixed(2);
                        break;
                    case "Element":
                        pickchance[1] = ((data[i].gamesPicked / total_picks) * 100).toFixed(2);
                        winchance[1] = ((data[i].gamesWon / data[i].gamesPicked) * 100).toFixed(2);
                        break;
                    case "Forsaken":
                        pickchance[2] = ((data[i].gamesPicked / total_picks) * 100).toFixed(2);
                        winchance[2] = ((data[i].gamesWon / data[i].gamesPicked) * 100).toFixed(2);
                        break;
                    case "Grove":
                        pickchance[3] = ((data[i].gamesPicked / total_picks) * 100).toFixed(2);
                        winchance[3] = ((data[i].gamesWon / data[i].gamesPicked) * 100).toFixed(2);
                        break;
                    case "Mastermind":
                        pickchance[4] = ((data[i].gamesPicked / total_picks) * 100).toFixed(2);
                        winchance[4] = ((data[i].gamesWon / data[i].gamesPicked) * 100).toFixed(2);
                        break;
                    case "Mech":
                        pickchance[5] = ((data[i].gamesPicked / total_picks) * 100).toFixed(2);
                        winchance[5] = ((data[i].gamesWon / data[i].gamesPicked) * 100).toFixed(2);
                        break;
                }
            }
            var meinText = "Pick- & Winrates per Legion in % (Total Games: " + total_picks/4 + ")";
            break;
        case "networthperwave":
            data = data.stats.legionAverageNetWorthPerWave;
            var networthperwave = [];
            for (var i = 0; i < 6; i++) {
                networthperwave[i] = new Array(21);
            }
            for (var i = 0; i < data.length; i++) {
                switch (data[i].legion) {
                    case "Atlantean":
                        networthperwave[0][data[i].wave - 1] = data[i].networth;
                        break;
                    case "Element":
                        networthperwave[1][data[i].wave - 1] = data[i].networth;
                        break;
                    case "Forsaken":
                        networthperwave[2][data[i].wave - 1] = data[i].networth;
                        break;
                    case "Grove":
                        networthperwave[3][data[i].wave - 1] = data[i].networth;
                        break;
                    case "Mastermind":
                        networthperwave[4][data[i].wave - 1] = data[i].networth;
                        break;
                    case "Mech":
                        networthperwave[5][data[i].wave - 1] = data[i].networth;
                        break;
                }
            }
            var meinText = "Average Networth per Wave";
            break;
        case "valueonend":
            data = data.stats.legionAverageValueByEndingWave;
            var valueonend = [];
            for (var i = 0; i < 6; i++) {
                valueonend[i] = new Array(21);
            }
            for (var i = 0; i < data.length; i++) {
                switch (data[i].legion) {
                    case "Atlantean":
                        valueonend[0][data[i].wave - 1] = data[i].value;
                        break;
                    case "Element":
                        valueonend[1][data[i].wave - 1] = data[i].value;
                        break;
                    case "Forsaken":
                        valueonend[2][data[i].wave - 1] = data[i].value;
                        break;
                    case "Grove":
                        valueonend[3][data[i].wave - 1] = data[i].value;
                        break;
                    case "Mastermind":
                        valueonend[4][data[i].wave - 1] = data[i].value;
                        break;
                    case "Mech":
                        valueonend[5][data[i].wave - 1] = data[i].value;
                        break;
                }
            }
            var meinText = "Average Value on game end";
            break;
        case "incomeonend":
            data = data.stats.legionAverageIncomeByEndingWave;
            var incomeonend = [];
            for (var i = 0; i < 6; i++) {
                incomeonend[i] = new Array(21);
            }
            for (var i = 0; i < data.length; i++) {
                switch (data[i].legion) {
                    case "Atlantean":
                        incomeonend[1][data[i].wave - 1] = data[i].income;
                        break;
                    case "Element":
                        incomeonend[2][data[i].wave - 1] = data[i].income;
                        break;
                    case "Forsaken":
                        incomeonend[3][data[i].wave - 1] = data[i].income;
                        break;
                    case "Grove":
                        incomeonend[4][data[i].wave - 1] = data[i].income;
                        break;
                    case "Mastermind":
                        incomeonend[5][data[i].wave - 1] = data[i].income;
                        break;
                    case "Mech":
                        incomeonend[6][data[i].wave - 1] = data[i].income;
                        break;
                }
            }
            var meinText = "Average Income on game end";
            break;
        case "workersonend":
            data = data.stats.legionAverageWorkersByEndingWave;
            var workersonend = [];
            for (var i = 0; i < 6; i++) {
                workersonend[i] = new Array(21);
            }
            for (var i = 0; i < data.length; i++) {
                switch (data[i].legion) {
                    case "Atlantean":
                        workersonend[0][data[i].wave - 1] = data[i].workers;
                        break;
                    case "Element":
                        workersonend[1][data[i].wave - 1] = data[i].workers;
                        break;
                    case "Forsaken":
                        workersonend[2][data[i].wave - 1] = data[i].workers;
                        break;
                    case "Grove":
                        workersonend[3][data[i].wave - 1] = data[i].workers;
                        break;
                    case "Mastermind":
                        workersonend[4][data[i].wave - 1] = data[i].workers;
                        break;
                    case "Mech":
                        workersonend[5][data[i].wave - 1] = data[i].workers;
                        break;
                }
            }
            console.log(workersonend);
            var meinText = "Average Workers on game end";
            break;
        case "leaksonend":
            data = data.stats.legionAverageLeaksByEndingWave;
            var leaksonend = [];
            for (var i = 0; i < 6; i++) {
                leaksonend[i] = new Array(21);
            }
            for (var i = 0; i < data.length; i++) {
                switch (data[i].legion) {
                    case "Atlantean":
                        leaksonend[0][data[i].wave - 1] = data[i].leaks;
                        break;
                    case "Element":
                        leaksonend[1][data[i].wave - 1] = data[i].leaks;
                        break;
                    case "Forsaken":
                        leaksonend[2][data[i].wave - 1] = data[i].leaks;
                        break;
                    case "Grove":
                        leaksonend[3][data[i].wave - 1] = data[i].leaks;
                        break;
                    case "Mastermind":
                        leaksonend[4][data[i].wave - 1] = data[i].leaks;
                        break;
                    case "Mech":
                        leaksonend[5][data[i].wave - 1] = data[i].leaks;
                        break;
                }
            }
            var meinText = "Average Leaks on game end";
            break;
        case "gameendingwave":
            var gameendingwaves = [];
            for (var i = 0; i < 21; i++) {
                gameendingwaves[i] = data[i].count;
            }
            var meinText = "Wave games ended on";
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
            myChart.data.labels.push("Atlantean", "Element", "Forsaken", "Grove", "Mastermind", "Mech");
            myChart.data.datasets.push({ label: "Pickrate", data: [], backgroundColor: ['rgba(139, 0, 139, 0.8)', 'rgba(255, 255, 0, 0.8)', 'rgba(255, 0, 0, 0.8)', 'rgba(0, 255, 0, 0.8)', 'rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 255, 0.8)'], borderColor: 'rgba(0,0,0,1)', borderWidth: 1 });
            myChart.update();
            myChart.data.datasets.push({ label: "Winrate", data: [], backgroundColor: ['rgba(139, 0, 139, 0.8)', 'rgba(255, 255, 0, 0.8)', 'rgba(255, 0, 0, 0.8)', 'rgba(0, 255, 0, 0.8)', 'rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 255, 0.8)'], borderColor: 'rgba(0,0,0,1)', borderWidth: 1 });
            myChart.update();
            for (var i = 0; i < 6; i++) {
                myChart.data.datasets[0].data.push(pickchance[i]);
                myChart.update();
                myChart.data.datasets[1].data.push(winchance[i]);
                myChart.update();
            }
            break;
        case "workersperwave":
            myChart.data.labels.push("1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21");
            for (var i = 0; i < 6; i++) {
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
                myChart.data.datasets[5].data.push(workersperwave[5][i]);
                myChart.update();
            }
            break;
        case "networthperwave":
            myChart.data.labels.push("1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21");
            for (var i = 0; i < 6; i++) {
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
                myChart.data.datasets[5].data.push(networthperwave[5][i]);
                myChart.update();
            }
            break;
        case "valueonend":
            myChart.data.labels.push("1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21");
            for (var i = 0; i < 6; i++) {
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
                myChart.data.datasets[5].data.push(valueonend[5][i]);
                myChart.update();
            }
            break;
        case "incomeonend":
            myChart.data.labels.push("1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21");
            for (var i = 0; i < 6; i++) {
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
                myChart.data.datasets[5].data.push(incomeonend[5][i]);
                myChart.update();
            }
            break;
        case "workersonend":
            myChart.data.labels.push("1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21");
            for (var i = 0; i < 6; i++) {
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
                myChart.data.datasets[5].data.push(workersonend[5][i]);
                myChart.update();
            }
            break;
        case "leaksonend":
            myChart.data.labels.push("1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21");
            for (var i = 0; i < 6; i++) {
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
                myChart.data.datasets[5].data.push(leaksonend[5][i]);
                myChart.update();
            }
            break;
        case "gameendingwave":
            myChart.data.labels.push("1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21");
            myChart.data.datasets.push({ label: "Number of games", data: [], backgroundColor: graphColor[0], borderColor: 'rgba(1,1,1,1)', borderWidth: 1 });
            myChart.update();
            for (var i = 0; i < 21; i++) {
                myChart.data.datasets[0].data.push(gameendingwaves[i]);
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
    document.getElementById("chartContainer").style.display = "";
    hideWave();
    showInputs();
    showStatsPage();
    abfrage = "winrates";
}
function showWorkersPerWave() {
    document.getElementById("chartContainer").style.display = "";
    hideWave();
    showInputs();
    showStatsPage();
    abfrage = "workersperwave";
}
function showNetworthPerWave() {
    document.getElementById("chartContainer").style.display = "";
    hideWave();
    showInputs();
    showStatsPage();
    abfrage = "networthperwave";
}
function showValueOnEnd() {
    document.getElementById("chartContainer").style.display = "";
    hideWave();
    showInputs();
    showStatsPage();
    abfrage = "valueonend";
}
function showIncomeOnEnd() {
    document.getElementById("chartContainer").style.display = "";
    hideWave();
    showInputs();
    showStatsPage();
    abfrage = "incomeonend";
}
function showWorkersOnEnd() {
    document.getElementById("chartContainer").style.display = "";
    hideWave();
    showInputs();
    showStatsPage();
    abfrage = "workersonend";
}
function showLeaksOnEnd() {
    document.getElementById("chartContainer").style.display = "";
    hideWave();
    showInputs();
    showStatsPage();
    abfrage = "leaksonend";
}
function showUnitStatSheet() {
    showStatsPage();
    showWave();
    hideInputs();
    abfrage = "unitstatssheet";
    queryAllFighters();
}

function showGameEndingWaves() {
    document.getElementById("chartContainer").style.display = "";
    hideWave();
    showInputs();
    showStatsPage();
    abfrage = "gameendingwave";
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
        case "gameendingwave":
            queryGameEndingWaves(meineValue);
            break;
        default:
            console.log("Fehler readselection: " + abfrage);
            break;
    }

}


function createTable(data) {
    var myTable = document.getElementById("myTable");
    var allFighters = [];
    for (var i = 0; i < data.length; i++) {
        for (var e = 0; e < data[i].length; e++) {
            allFighters.push(data[i][e]);
        }
    }
    for (var i = 0; i < allFighters.length; i++) {
        try { myTable.deleteRow(i + 1); }
        catch{ }
        var row = myTable.insertRow(i + 1);
        var cell = [];
        var wave = document.getElementById("waveselector").value;
        var wave_att = "";
        var wave_def = "";
        var goldcost = 0;
        var dps = 0.00;
        var value = 0.00;
        var health = 0.00;
        if (allFighters[i].totalvalue != null) value = allFighters[i].totalvalue;
        else value = 0;
        if (allFighters[i].dps != null) dps = allFighters[i].dps;
        else dps = 0;
        if (allFighters[i].health != null) health = allFighters[i].health;
        else health = 0;
        if (allFighters[i].goldcost != null) goldcost = allFighters[i].goldcost;
        else goldcost = 0;
        switch (wave) {
            case "1":
                wave_att = "Pierce";
                wave_def = "Fortified";
                break;
            case "2":
                wave_att = "Impact";
                wave_def = "Arcane";
                break;
            case "3":
                wave_att = "Magic";
                wave_def = "Natural";
                break;
            case "4":
                wave_att = "Impact";
                wave_def = "Swift";
                break;
            case "5":
                wave_att = "Pierce";
                wave_def = "Natural";
                break;
            case "6":
                wave_att = "Impact";
                wave_def = "Fortified";
                break;
            case "7":
                wave_att = "Magic";
                wave_def = "Arcane";
                break;
            case "8":
                wave_att = "Magic";
                wave_def = "Swift";
                break;
            case "9":
                wave_att = "Pierce";
                wave_def = "Fortified";
                break;
            case "10":
                wave_att = "Impact";
                wave_def = "Arcane";
                break;
            case "11":
                wave_att = "Pierce";
                wave_def = "Natural";
                break;
            case "12":
                wave_att = "Pierce";
                wave_def = "Swift";
                break;
            case "13":
                wave_att = "Impact";
                wave_def = "Fortified";
                break;
            case "14":
                wave_att = "Magic";
                wave_def = "Arcane";
                break;
            case "15":
                wave_att = "Magic";
                wave_def = "Natural";
                break;
            case "16":
                wave_att = "Impact";
                wave_def = "Swift";
                break;
            case "17":
                wave_att = "Pierce";
                wave_def = "Arcane";
                break;
            case "18":
                wave_att = "Magic";
                wave_def = "Natural";
                break;
            case "19":
                wave_att = "Pierce";
                wave_def = "Swift";
                break;
            case "20":
                wave_att = "Magic";
                wave_def = "Fortified";
                break;
            case "21":
                wave_att = "Pure";
                wave_def = "Immaterial";
                break;
            default:
                break;
        }
        // scale dps to wave
        switch (allFighters[i].attacktype) {
            case "Pierce":
                if (wave_def == "Arcane") {
                    dps = dps * 1.15;
                }
                else if (wave_def == "Swift") {
                    dps = dps * 1.2;
                }
                else if (wave_def == "Natural") {
                    dps = dps * 0.85;
                }
                else if (wave_def == "Fortified") {
                    dps = dps * 0.8;
                }
                break;
            case "Impact":
                if (wave_def == "Arcane") {
                    dps = dps * 1.15;
                }
                else if (wave_def == "Swift") {
                    dps = dps * 0.8;
                }
                else if (wave_def == "Natural") {
                    dps = dps * 0.9;
                }
                else if (wave_def == "Fortified") {
                    dps = dps * 1.15;
                }
                break;
            case "Magic":
                if (wave_def == "Arcane") {
                    dps = dps * 0.75;
                }
                else if (wave_def == "Swift") {
                    dps = dps;
                }
                else if (wave_def == "Natural") {
                    dps = dps * 1.25;
                }
                else if (wave_def == "Fortified") {
                    dps = dps * 1.05;
                }
                break;
            case "Pure":
                break;
        }
        switch (allFighters[i].armortype) {
            case "Fortified":
                if (wave_att == "Pierce") {
                    health = health * 1.2;
                }
                else if (wave_att == "Impact") {
                    health = health * 0.85;
                }
                else if (wave_att == "Magic") {
                    health = health * 0.95;
                }
                break;
            case "Swift":
                if (wave_att == "Pierce") {
                    health = health * 0.8;
                }
                else if (wave_att == "Impact") {
                    health = health * 1.2;
                }
                break;
            case "Natural":
                if (wave_att == "Pierce") {
                    health = health * 1.15;
                }
                else if (wave_att == "Impact") {
                    health = health * 1.1;
                }
                else if (wave_att == "Magic") {
                    health = health * 0.75;
                }
                break;
            case "Arcane":
                if (wave_att == "Pierce") {
                    health = health * 0.85;
                }
                else if (wave_att == "Impact") {
                    health = health * 0.85;
                }
                else if (wave_att == "Magic") {
                    health = health * 1.25;
                }
                break;
        }
        var dpspergold = (dps / value).toFixed(2);
        var healthpergold = (health / value).toFixed(2);
        var legion = "";
        switch (allFighters[i].legion[0]) {
            case "element_legion_id":
                legion = "Element";
                break;
            case "grove_legion_id":
                legion = "Grove";
                break;
            case "mech_legion_id":
                legion = "Mech";
                break;
            case "forsaken_legion_id":
                legion = "Forsaken";
                break;
            case "atlantean_legion_id":
                legion = "Atlantean";
                break;


        }
        cell[0] = row.insertCell(0);
        cell[0].innerHTML = "<a href='/units?unit=" + allFighters[i].name + "'> " + allFighters[i].name+"</a>";
        cell[1] = row.insertCell(1);
        cell[1].innerHTML = legion;
        cell[2] = row.insertCell(2);
        cell[2].innerHTML = goldcost;
        cell[3] = row.insertCell(3);
        cell[3].innerHTML = value.toFixed(2);
        cell[4] = row.insertCell(4);
        cell[4].innerHTML = health.toFixed(2);
        cell[5] = row.insertCell(5);
        cell[5].innerHTML = dps.toFixed(2);
        cell[6] = row.insertCell(6);
        cell[6].innerHTML = allFighters[i].attacktype;
        cell[7] = row.insertCell(7);
        cell[7].innerHTML = allFighters[i].armortype;
        cell[8] = row.insertCell(8);
        cell[8].innerHTML = allFighters[i].abilities.length;
        cell[9] = row.insertCell(9);
        cell[9].innerHTML = dpspergold;
        cell[10] = row.insertCell(10);
        cell[10].innerHTML = healthpergold;
    }
    sortTable(sortvalue);
    document.getElementById("tablecontainer").style.display = "";

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
        abfrage = "elodistribution";
        hideWave();
        document.getElementById("chartContainer").style.display = "";
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
        console.log(result);
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
    showLoad();
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
    showLoad();
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
    showLoad();
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
    showLoad();
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
    showLoad();
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
    showLoad();
    getAvgNetworthWave(function (result) {
        createBarGraph(result);
        return result;
    }, type, value);
}

function getPlayerCount(callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback(JSON.parse(xhttp.response));
        }
    };
    xhttp.open("GET", '/api/stats/playercount', true);
    xhttp.send();
}
function queryPlayerCount() {
    showLoad();
    getPlayerCount(function (result) {
        player_count = result.data.filteredPlayers.count;
        queryEloDistribution();
        return result;
    });
}

function getAllFighters(callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback(JSON.parse(xhttp.response));
        }
    };
    xhttp.open("GET", '/api/stats/fighter', true);
    xhttp.send();
}
function queryAllFighters() {
    showLoad();
    getAllFighters(function (result) {
        myData = result;
        sortvalue = 0;
        document.getElementById("chartContainer").style.display = "none";
        createTable(result);
        hideLoad();
        return result;
    });
}

function getGameEndingWaves(callback, version) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback(JSON.parse(xhttp.response));
        }
    };
    xhttp.open("GET", '/sql/stats/wavegamesended?version='+version, true);
    xhttp.send();
}
function queryGameEndingWaves(version) {
    showLoad();
    getGameEndingWaves(function (result) {
        createBarGraph(JSON.parse(result));
        hideLoad();
        return result;
    }, version);
}