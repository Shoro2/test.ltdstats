var anzahlSpieler = 2;
var gamesPlayed = [2];
var wins = [2];
var losses = [2];
var winRate = [2];
var ties = [2];
var quits = [2];
var winStreak = [2];
var secondsPlayed = [2];
var totalXp = [2];

var overallPeakElo = [2];
var overallElo = [2];

var elementPeakElo = [2];
var elementElo = [2];
var elementPlayed = [2];
var elementWins = [2];
var elementLosses = [2];
var elementXp = [2];

var forsakenPeakElo = [2];
var forsakenElo = [2];
var forsakenPlayed = [2];
var forsakenWins = [2];
var forsakenLosses = [2];
var forsakenXp = [2];

var grovePeakElo = [2];
var groveElo = [2];
var grovePlayed = [2];
var groveWins = [2];
var groveLosses = [2];
var groveXp = [2];

var mechPeakElo = [2];
var mechElo = [2];
var mechPlayed = [2];
var mechWins = [2];
var mechLosses = [2];
var mechXp = [2];

var mastermindPeakElo = [2];
var mastermindElo = [2];
var mastermindPlayed = [2];
var mastermindWins = [2];
var mastermindLosses = [2];
var mastermindXp = [2];
var player = [2];

// i=anzahl zu vergleichener spieler -1
for (var i = 1; i < anzahlSpieler+1; i++)
{
    player[i] = JSON.parse(jsonResponse[i]);
    console.log(player[i]);
    gamesPlayed[i] = player[i].Statistics.gamesPlayed;
    wins[i] = player[i].Statistics.wins;
    losses[i] = player[i].Statistics.losses;
    winRate[i] = player[i].Statistics.winRate;
    ties[i] = player[i].Statistics.ties;
    quits[i] = player[i].Statistics.quits;
    winStreak[i] = player[i].Statistics.winStreak;
    secondsPlayed[i] = player[i].Statistics.secondsPlayed;
    totalXp[i] = player[i].Statistics.totalXp;
    overallPeakElo[i] = player[i].Statistics.overallPeakElo;
    overallElo[i] = player[i].Statistics.overallElo;

    elementPeakElo[i] = player[i].Statistics.elementPeakElo;
    elementElo[i] = player[i].Statistics.elementElo;
    elementPlayed[i] = player[i].Statistics.elementPlayed;
    elementWins[i] = player[i].Statistics.elementWins;
    elementLosses[i] = player[i].Statistics.elementLosses;
    elementXp[i] = player[i].Statistics.elementXp;

    grovePeakElo[i] = player[i].Statistics.grovePeakElo;
    groveElo[i] = player[i].Statistics.groveElo;
    grovePlayed[i] = player[i].Statistics.grovePlayed;
    groveWins[i] = player[i].Statistics.groveWins;
    groveLosses[i] = player[i].Statistics.groveLosses;
    groveXp[i] = player[i].Statistics.groveXp;

    forsakenPeakElo[i] = player[i].Statistics.forsakenPeakElo;
    forsakenElo[i] = player[i].Statistics.forsakenElo;
    forsakenPlayed[i] = player[i].Statistics.forsakenPlayed;
    forsakenWins[i] = player[i].Statistics.forsakenWins;
    forsakenLosses[i] = player[i].Statistics.forsakenLosses;
    forsakenXp[i] = player[i].Statistics.forsakenXp;

    mechPeakElo[i] = player[i].Statistics.mechPeakElo;
    mechElo[i] = player[i].Statistics.mechElo;
    mechPlayed[i] = player[i].Statistics.mechPlayed;
    mechWins[i] = player[i].Statistics.mechWins;
    mechLosses[i] = player[i].Statistics.mechLosses;
    mechXp[i] = player[i].Statistics.mechXp;

    mastermindPeakElo[i] = player[i].Statistics.mastermindPeakElo;
    mastermindElo[i] = player[i].Statistics.mastermindElo;
    mastermindPlayed[i] = player[i].Statistics.mastermindPlayed;
    mastermindWins[i] = player[i].Statistics.mastermindWins;
    mastermindLosses[i] = player[i].Statistics.mastermindLosses;
    mastermindXp[i] = player[i].Statistics.mastermindXp;
}
//compare&parse
for (var i = 1; i < anzahlSpieler + 1; i++)
{
    document.getElementById("player" + i + "_gamesplayed").textContent = gamesPlayed[i];
    document.getElementById("player" + i + "_wins").textContent = wins[i];
    document.getElementById("player" + i + "_losses").textContent = losses[i];
    document.getElementById("player" + i + "_winrate").textContent =  winRate[i];
    document.getElementById("player" + i + "_ties").textContent = ties[i] ;
    document.getElementById("player" + i + "_quits").textContent = quits[i];
    document.getElementById("player" + i + "_winstreak").textContent = winStreak[i];
    document.getElementById("player" + i + "_playtime").textContent = secondsPlayed[i];
    document.getElementById("player" + i + "_xp").textContent = totalXp[i];
    document.getElementById("player" + i + "_overallpeakelo").textContent = overallPeakElo[i];
    document.getElementById("player" + i + "_overallelo").textContent = overallElo[i];

    document.getElementById("player" + i + "_elementpeakelo").textContent = elementPeakElo[i];
    document.getElementById("player" + i + "_elementelo").textContent = elementElo[i];
    document.getElementById("player" + i + "_elementgames").textContent = elementPlayed[i];
    document.getElementById("player" + i + "_elementwins").textContent = elementWins[i];
    document.getElementById("player" + i + "_elementlosses").textContent = elementLosses[i];
    document.getElementById("player" + i + "_elementxp").textContent = elementXp[i];

    document.getElementById("player" + i + "_grovepeakelo").textContent = grovePeakElo[i];
    document.getElementById("player" + i + "_groveelo").textContent = groveElo[i];
    document.getElementById("player" + i + "_grovegames").textContent = grovePlayed[i];
    document.getElementById("player" + i + "_grovewins").textContent = groveWins[i];
    document.getElementById("player" + i + "_grovelosses").textContent = groveLosses[i];
    document.getElementById("player" + i + "_grovexp").textContent = groveXp[i];

    document.getElementById("player" + i + "_forsakenpeakelo").textContent = forsakenPeakElo[i];
    document.getElementById("player" + i + "_forsakenelo").textContent = forsakenElo[i];
    document.getElementById("player" + i + "_forsakengames").textContent = forsakenPlayed[i];
    document.getElementById("player" + i + "_forsakenwins").textContent = forsakenWins[i];
    document.getElementById("player" + i + "_forsakenlosses").textContent = forsakenLosses[i];
    document.getElementById("player" + i + "_forsakenxp").textContent = forsakenXp[i];

    document.getElementById("player" + i + "_mechpeakelo").textContent = mechPeakElo[i];
    document.getElementById("player" + i + "_mechelo").textContent = mechElo[i];
    document.getElementById("player" + i + "_mechgames").textContent = mechPlayed[i];
    document.getElementById("player" + i + "_mechwins").textContent = mechWins[i];
    document.getElementById("player" + i + "_mechlosses").textContent = mechLosses[i];
    document.getElementById("player" + i + "_mechxp").textContent = mechXp[i];

    document.getElementById("player" + i + "_mastermindpeakelo").textContent = mastermindPeakElo[i];
    document.getElementById("player" + i + "_mastermindelo").textContent = mastermindElo[i];
    document.getElementById("player" + i + "_mastermindgames").textContent = mastermindPlayed[i];
    document.getElementById("player" + i + "_mastermindwins").textContent = mastermindWins[i];
    document.getElementById("player" + i + "_mastermindlosses").textContent = mastermindLosses[i];
    document.getElementById("player" + i + "_mastermindxp").textContent = mastermindXp[i];
}
//difference
document.getElementById("difference_gamesplayed").textContent = (gamesPlayed[1] - gamesPlayed[2]);
document.getElementById("difference_wins").textContent = wins[1] - wins[2];
document.getElementById("difference_losses").textContent = losses[1] - losses[2];
document.getElementById("difference_winrate").textContent = winRate[1] - winRate[2];
document.getElementById("difference_ties").textContent = ties[1] - ties[2];
document.getElementById("difference_quits").textContent = quits[1] - quits[2];
document.getElementById("difference_winstreak").textContent = winStreak[1] - winStreak[2];
document.getElementById("difference_playtime").textContent = (secondsPlayed[1] - secondsPlayed[2]) / 60 + " min";
document.getElementById("difference_xp").textContent = totalXp[1] - totalXp[2];
document.getElementById("difference_overallpeakelo").textContent = overallPeakElo[1] - overallPeakElo[2];
document.getElementById("difference_overallelo").textContent = overallElo[1] - overallElo[2];
document.getElementById("difference_elementpeakelo").textContent = elementPeakElo[1] - elementPeakElo[2];
document.getElementById("difference_elementelo").textContent = elementElo[1] - elementElo[2];
document.getElementById("difference_elementgames").textContent = elementPlayed[1] - elementPlayed[2];
document.getElementById("difference_elementwins").textContent = elementWins[1] - elementWins[2];
document.getElementById("difference_elementlosses").textContent = elementLosses[1] - elementLosses[2];
document.getElementById("difference_elementxp").textContent = elementXp[1] - elementXp[2];
document.getElementById("difference_grovepeakelo").textContent = grovePeakElo[1] - grovePeakElo[2];
document.getElementById("difference_groveelo").textContent = groveElo[1] - groveElo[2];
document.getElementById("difference_grovegames").textContent = grovePlayed[1] - grovePlayed[2];
document.getElementById("difference_grovewins").textContent = groveWins[1] - groveWins[2];
document.getElementById("difference_grovelosses").textContent = groveLosses[1] - groveLosses[2];
document.getElementById("difference_grovexp").textContent = groveXp[1] - groveXp[2];
document.getElementById("difference_forsakenpeakelo").textContent = forsakenPeakElo[1] - forsakenPeakElo[2];
document.getElementById("difference_forsakenelo").textContent = forsakenElo[1] - forsakenElo[2];
document.getElementById("difference_forsakengames").textContent = forsakenPlayed[1] - forsakenPlayed[2];
document.getElementById("difference_forsakenwins").textContent = forsakenWins[1] - forsakenWins[2];
document.getElementById("difference_forsakenlosses").textContent = forsakenLosses[1] - forsakenLosses[2];
document.getElementById("difference_forsakenxp").textContent = forsakenXp[1] - forsakenXp[2];
document.getElementById("difference_mechpeakelo").textContent = mechPeakElo[1] - mechPeakElo[2];
document.getElementById("difference_mechelo").textContent = mechElo[1] - mechElo[2];
document.getElementById("difference_mechgames").textContent = mechPlayed[1] - mechPlayed[2];
document.getElementById("difference_mechwins").textContent = mechWins[1] - mechWins[2];
document.getElementById("difference_mechlosses").textContent = mechLosses[1] - mechLosses[2];
document.getElementById("difference_mechxp").textContent = mechXp[1] - mechXp[2];
document.getElementById("difference_mastermindpeakelo").textContent = mastermindPeakElo[1] - mastermindPeakElo[2];
document.getElementById("difference_mastermindelo").textContent = mastermindElo[1] - mastermindElo[2];
document.getElementById("difference_mastermindgames").textContent = mastermindPlayed[1] - mastermindPlayed[2];
document.getElementById("difference_mastermindwins").textContent = mastermindWins[1] - mastermindWins[2];
document.getElementById("difference_mastermindlosses").textContent = mastermindLosses[1] - mastermindLosses[2];
document.getElementById("difference_mastermindxp").textContent = mastermindXp[1] - mastermindXp[2];
//colorize
if (gamesPlayed[1] > gamesPlayed[2]) document.getElementById("difference_gamesplayed").outerHTML = "<div style='background-color:green'>" + document.getElementById("difference_gamesplayed").textContent + "</div>";
if (gamesPlayed[1] < gamesPlayed[2]) document.getElementById("difference_gamesplayed").outerHTML = "<div style='background-color:red'>" + document.getElementById("difference_gamesplayed").textContent + "</div>";
if (wins[1] > wins[2]) document.getElementById("difference_wins").outerHTML = "<div style='background-color:green'>" + document.getElementById("difference_wins").textContent + "</div>";
if (wins[1] < wins[2]) document.getElementById("difference_wins").outerHTML = "<div style='background-color:red'>" + document.getElementById("difference_wins").textContent + "</div>";
if (losses[1] > losses[2]) document.getElementById("difference_losses").outerHTML = "<div style='background-color:green'>" + document.getElementById("difference_losses").textContent + "</div>";
if (losses[1] < losses[2]) document.getElementById("difference_losses").outerHTML = "<div style='background-color:red'>" + document.getElementById("difference_losses").textContent + "</div>";
if (winRate[1] > winRate[2]) document.getElementById("difference_winrate").outerHTML = "<div style='background-color:green'>" + document.getElementById("difference_winrate").textContent + "</div>";
if (winRate[1] < winRate[2]) document.getElementById("difference_winrate").outerHTML = "<div style='background-color:red'>" + document.getElementById("difference_winrate").textContent + "</div>";
if (ties[1] > ties[2]) document.getElementById("difference_ties").outerHTML = "<div style='background-color:green'>" + document.getElementById("difference_ties").textContent + "</div>";
if (ties[1] < ties[2]) document.getElementById("difference_ties").outerHTML = "<div style='background-color:red'>" + document.getElementById("difference_ties").textContent + "</div>";
if (quits[1] > quits[2]) document.getElementById("difference_quits").outerHTML = "<div style='background-color:green'>" + document.getElementById("difference_quits").textContent + "</div>";
if (quits[1] < quits[2]) document.getElementById("difference_quits").outerHTML = "<div style='background-color:red'>" + document.getElementById("difference_quits").textContent + "</div>";











