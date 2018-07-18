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
    getEloDistribution(function (result) {
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
    getWinRates(function (result) {
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