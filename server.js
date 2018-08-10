'use strict';

const express = require('express');
const jquery = require('jquery');
const tabmenu = require('./public/js/tabmenu');
require("./private/sqlcon.js")
const chart = require('chart.js');
const favicon = require('serve-favicon');

require('isomorphic-fetch');
// Constants
const PORT = 61624;
const HOST = '127.0.0.1';
const http = require('http');
// App
const app = express();



app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

con.connect(function (err) {
    if (err) console.log("connecton to mysql failed: " + err);
    else console.log("Connected to mySQL!");
});


app.use(favicon(__dirname + '/public/img/favicon.ico'));


//routes

app.get('/profile', (req, res) => {
    res.render('profile', {
        title: 'Profile'
    });
});

app.get('/index.html', (req, res) => {
    res.render('index', {
        title: 'Home'
    })
});

app.get('/tournaments', (req, res) => {
    res.render('tournaments', {
        title: 'Tournaments'
    })
});

app.get('/stats', (req, res) => {
    res.render('stats', {
        title: 'Stats'
    })
});

app.get('/stats/player', (req, res) => {
    res.render('stats', {
        title: 'Player Stats'
    })
});

app.get('/stats/overall', (req, res) => {
    res.render('stats', {
        title: 'Overall Stats'
    })
});

app.get('/stats/daily', (req, res) => {
    res.render('stats', {
        title: 'Daily Stats'
    })
});

app.get('/stats/patch', (req, res) => {
    res.render('stats', {
        title: 'Patch Stats'
    })
});

app.get('/ladder', (req, res) => {
    res.render('ladder/overallladder', {
        title: 'Overall Ladder'
    })
});

app.get('/ladder/overall', (req, res) => {
    res.render('ladder/overallladder', {
        title: 'Overall Ladder'
    })
});

app.get('/ladder/element', (req, res) => {
    res.render('ladder/elementladder', {
        title: 'Element Ladder'
    })
});

app.get('/ladder/grove', (req, res) => {
    res.render('ladder/groveladder', {
        title: 'Grove Ladder'
    })
});

app.get('/ladder/forsaken', (req, res) => {
    res.render('ladder/forsakenladder', {
        title: 'Forsaken Ladder'
    })
});

app.get('/ladder/mech', (req, res) => {
    res.render('ladder/mechladder', {
        title: 'Mech Ladder'
    })
});

app.get('/ladder/mastermind', (req, res) => {
    res.render('ladder/mastermindladder', {
        title: 'Mastermind Ladder'
    })
});

app.get('/ladder/atlantean', (req, res) => {
    res.render('ladder/atlanteanladder', {
        title: 'Atlantean Ladder'
    })
});

app.get('/game', (req, res) => {
    res.render('games', {
        title: 'Livegame'
    })
});


app.get('/builder', (req, res) => {
    res.render('builder', {
        title: 'Builder'
    })
});

app.get('/units', (req, res) => {
    res.render('units', {
        title: 'Units'
    })
});

app.get('/replay', (req, res) => {
    res.render('replay', {
        title: 'Replay'
    })
});

app.get('/compare', (req, res) => {
    res.render('compare', {
        title: 'Compare'
    })
});

//Guides

app.get('/guides', (req, res) => {
    var guide = req.query.guide;
    switch (guide) {
        //element
        case "elementbasics":
            res.render('guides/element/basics', {
                title: 'Element Basics Guide'
            });
            break;
        case "wadiselement":
            res.render('guides/element/wadi', {
                title: 'Wadi\'s Element Guide'
            });
            break;
        case "akitoselement":
            res.render('guides/element/akitoselement', {
                title: 'Akitos Element Guide'
            });
            break;
        //grove
        case "theratedrsgrove":
            res.render('guides/grove/theratedr', {
                title: 'TheRatedR´s Grove Guide'
            });
            break;
        case "isotropsgrove":
            res.render('guides/grove/isotropvideo', {
                title: 'Isotrop´s & Weilbockt´s Grove Guide'
            });
            break;
        //forsaken
        case "akitosforsaken":
            res.render('guides/forsaken/akitosforsaken', {
                title: 'Akitos Forsaken Guide'
            });
            break;
        case "isotropsforsaken":
            res.render('guides/forsaken/isotropforsaken', {
                title: 'Isotrop´s & Weilbockt´s Forsaken Guide'
            });
            break;
        //mech
        case "cornepsmech":
            res.render('guides/mech/cornep', {
                title: 'Cornep´s Mech Guide'
            });
            break;
        case "isotropsmech":
            res.render('guides/mech/isotropmech', {
                title: 'Isotrop´s & Weilbockt´s Mech Guide'
            });
            break;
        case "roshkatulsmech":
            res.render('guides/mech/roshkatulsmech', {
                title: 'OP Mech, get 2k+ elo easily, 80-90% winrate'
            });
            break;
        //mastermind
        case "zitronenrittersmm":
            res.render('guides/mastermind/zitronenritter', {
                title: 'Zitronenritter´s Mastermind Guide'
            });
            break;
        case "roshkatulsmm":
            res.render('guides/mastermind/roshkatulmm', {
                title: 'Roshkatul´s Low Quality Guide: How to pick your mastermind roll'
            });
            break;
        //general
        case "spelldmg":
            res.render('guides/general/spelldmg', {
                title: 'Legion TD2 mechanics: Spell Damage'
            });
            break;
        case "roshkatulstips":
            res.render('guides/general/roshkatultips', {
                title: 'Roshkatul´s 7 Tips for new players'
            });
            break;
        case "legionspells":
            res.render('guides/general/akitosspells', {
                title: 'Akitos Legion Spells Guide'
            });
            break;
        case "simplestarter":
            res.render('guides/general/simplestarter', {
                title: 'Teirdel´s Simple Starter Guide'
            });
            break;
        case "2v2":
            res.render('guides/general/2v2', {
                title: 'Cornep´s Guides: 2v2 Guide'
            });
            break;
        case "howtoimprove":
            res.render('guides/general/improve', {
                title: 'How to improve as a new Player'
            });
            break;
        case "thekraken":
            res.render('guides/general/kraken', {
                title: 'Cornep´s Guides: The Kraken'
            });
            break;
        case "lfsgameguide":
            res.render('guides/general/lfgameguide', {
                title: 'LForward´s Gameguide'
            });
            break;
        case "tilt":
            res.render('guides/general/tilt', {
                title: 'Cornep´s Guides: Taming the Tilt'
            });
            break;
        case "whattosend":
            res.render('guides/general/whattosend', {
                title: 'Cornep´s Guides: What to send'
            });
            break;
        case "sendingguide":
            res.render('guides/general/sendingguide', {
                title: 'Niklas Guide: Sending in Legion TD2'
            });
            break;
        case "sendvssave":
            res.render('guides/general/sendvssave', {
                title: 'Income sending vs Saving'
            });
            break;
        default:
            res.render('guides/searchguide', {
                title: 'Guides',
            });
            break;
    }
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    })
});

app.get('/cookies', (req, res) => {
    res.render('cookies', {
        title: 'Cookie Policies'
    })
});

app.get('/faq', (req, res) => {
    res.render('faq', {
        title: 'FAQ'
    })
});

app.get('/feedback', (req, res) => {
    res.render('feedback', {
        title: 'Feddback & Bug Report'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help'
    })
});

app.get('/help/profile', (req, res) => {
    res.render('help/helpprofile', {
        title: 'Help - Profile'
    })
});

app.get('/help/ladder', (req, res) => {
    res.render('help/helpladder', {
        title: 'Help - Ladder'
    })
});

app.get('/help/replay', (req, res) => {
    res.render('help/helpreplay', {
        title: 'Help - Replay'
    })
});

app.get('/help/compare', (req, res) => {
    res.render('help/helpcompare', {
        title: 'Help - Compare'
    })
});

app.get('/help/builder', (req, res) => {
    res.render('help/helpbuilder', {
        title: 'Help - Builder'
    })
});

app.get('/help/units', (req, res) => {
    res.render('help/helpunits', {
        title: 'Help - Units'
    })
});

app.get('/help/guides', (req, res) => {
    res.render('help/helpguides', {
        title: 'Help - Guides'
    })
});

app.get('/help/statistics', (req, res) => {
    res.render('help/helpstatistics', {
        title: 'Help - Statistics'
    })
});

app.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Contact'
    })
});

app.get('/lihl', (req, res) => {
    res.render('lihl', {
        title: 'LIHL'
    })
});

app.get('/streams', (req, res) => {
    res.render('streams', {
        title: 'Featured Streams'
    })
});




//sql abfragen


app.get('/lihl/getPlayer', (req, res) => {
    var sql = "SELECT * FROM lihl.player order by elo desc";
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

app.get('/sql/rank', (req, res) => {
    var player = req.query.player;
    con.query("SELECT (SELECT COUNT(*) FROM legion.player WHERE elo >= (SELECT elo FROM legion.player where name ='" + player + "')) as Rank FROM legion.player LIMIT 1;", function (err, result, fields) {
        if (err) throw err;
        res.json(result);
    });
});

app.get('/sql/getGuides', (req, res) => {
    http.get('http://159.69.83.17:3000/guides?action=list', (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            res.json(data);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

});

//api abfragen


app.get('/api/units', (req, res) => {
    var unitname = req.query.unitname;
    fetch('https://api.legiontd2.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey },
        body: JSON.stringify({
            query: '{unit(name: "' + unitname + '"){id,name,legion,description,tooltip,iconpath,abilities{name,tooltip,iconpath},armortype,attacktype,attackspeed,range,upgradesto,foodcost,goldcost,totalvalue,totalfood,dps,health}}'
        }),
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText)
                error.response = response
                throw error
            }
        }).then(function (data) {
            //player object an frontend
            res.json(data.data);
        });
});

app.get('/api/replay/getGame', (req, res) => {
    var gameid = req.query.gameid;
    fetch('https://api.legiontd2.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey },
        body: JSON.stringify({ query: '{ game(gameid: "' + gameid + '") { ts, leftkingpercenthp, rightkingpercenthp, gameDetails{ playername,position, wave, legion, unitsPerWave, leaksPerWave, mercsReceivedPerWave, mercsSentPerWave, workersPerWave, netWorthPerWave, incomePerWave, legionSpell } } }' }),
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText)
                error.response = response
                throw error
            }
        }).then(function (data) {
            //player object an frontend
            res.json(data.data);
        });
});

app.get('/api/replay/getTopPlayer', (req, res) => {
    var legion = req.query.legion;
    fetch('https://api.legiontd2.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey },
        body: JSON.stringify({ query: '{filteredPlayers(orderby: "' + legion + 'Elo", direction: DESC, limit: 10){players{playername,statistics,filteredGamesQuery(limit: 50) {games{game_id,gameresult,legion}}}}}' }),
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText)
                error.response = response
                throw error
            }
        }).then(function (data) {
            //player object an frontend
            res.json(data.data);
        });
});

app.get('/api/ladder', (req, res) => {
    var type = req.query.type;
    var limit = req.query.limit;
    var offset = req.query.offset;
    fetch('https://api.legiontd2.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey },
        body: JSON.stringify({ query: '{ filteredPlayers(orderby: "' + type + '", limit: ' + limit + ', direction: DESC, offset: ' + offset + ') { count, players{ playername, statistics } } }' }),
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText)
                error.response = response
                throw error
            }
        }).then(function (data) {
            //player object an frontend
            res.json(data.data);
        });
});

app.get('/api/profile/playerOverallGames', (req, res) => {
    var playername = req.query.playername.replace("%20", " ");
    console.log(playername);
    var meinPlayer;
    fetch('https://api.legiontd2.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey },
        body: JSON.stringify({ query: '{ player(playername: "' + playername + '") { filteredGamesQuery(limit: 100){ count, games{ game_id, ts, position, wave, time, queuetype, legion, iscross, gameresult, overallElo, unitsPerWave, leaksPerWave, mercsReceivedPerWave, mercsSentPerWave, workersPerWave, netWorthPerWave,gameDetails{playername,playerid,position,legion,wave,iscross,gameresult,overallElo,unitsPerWave,leaksPerWave,mercsReceivedPerWave,mercsSentPerWave,workersPerWave,netWorthPerWave,incomePerWave,legionSpell} } } } }' }),
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText)
                error.response = response
                console.log(error);
            }
        }).then(function (data) {
            //player object an frontend
            meinPlayer = data.data;
            var games_count = parseInt(data.data.player.filteredGamesQuery.count);
            if (games_count > 100) {
                for (var offset = 100; offset < games_count; offset = offset + 100) {
                    fetch('https://api.legiontd2.com/graphql', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey },
                        body: JSON.stringify({ query: '{ player(playername: "' + playername + '") { filteredGamesQuery(limit: 100, offset: ' + offset + '){ count, games{ game_id, ts, position, wave, time, queuetype, legion, iscross, gameresult, overallElo, unitsPerWave, leaksPerWave, mercsReceivedPerWave, mercsSentPerWave, workersPerWave, netWorthPerWave,gameDetails{playername,playerid,position,legion,wave,iscross,gameresult,overallElo,unitsPerWave,leaksPerWave,mercsReceivedPerWave,mercsSentPerWave,workersPerWave,netWorthPerWave,incomePerWave,legionSpell} } } } }' }),
                    })
                        .then(function (response) {
                            if (response.ok) {
                                return response.json();
                            }
                            else {
                                var error = new Error(response.statusText)
                                error.response = response
                                console.log(error);
                            }
                        }).then(function (data) {
                            data.data.player.filteredGamesQuery.games.forEach(function (ele) {
                                meinPlayer.player.filteredGamesQuery.games.push(ele);
                            });
                            console.log("offset: " + offset);
                            console.log("games count: " + games_count);
                            if (offset >= games_count) res.json(meinPlayer);
                        });
                }



            }
            else res.json(meinPlayer);
        });
});
/*
app.get('/api/profile/playerGames', (req, res) => {
    var playername = req.query.playername;
    fetch('https://api.legiontd2.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey },
        body: JSON.stringify({ query: '{player(playername:"' + playername + '"){filteredGamesQuery(limit:200){games{game_id,ts,wave,time,queuetype,gameresult,gameDetails{playername,playerid,position,legion,wave,iscross,gameresult,overallElo,unitsPerWave,leaksPerWave,mercsReceivedPerWave,mercsSentPerWave,workersPerWave,netWorthPerWave}}}}}'}),
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText)
                error.response = response
                throw error
            }
        }).then(function (data) {
            //player object an frontend
            res.json(data.data);
        });
});
*/
app.get('/api/profile/player', (req, res) => {
    var playername = req.query.playername;
    fetch('https://api.legiontd2.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey },
        body: JSON.stringify({ query: '{player(playername:"' + playername + '"){id,playername,statistics,badges,cards,items,fightercosmetics,trophies}}' }),
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText)
                error.response = response
                throw error
            }
        }).then(function (data) {
            //player object an frontend
            res.json(data.data);
        });
});
//stats
app.get('/api/stats/elo', (req, res) => {
    fetch('https://api.legiontd2.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey },
        body: JSON.stringify({ query: '{stats{eloDistribution{elo,percentile}}}' }),
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText)
                error.response = response
                throw error
            }
        }).then(function (data) {
            //player object an frontend
            res.json(data.data);
        });
});

app.get('/api/stats/fighter', (req, res) => {
    var allFighters = [];
    fetch('https://api.legiontd2.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey },
        body: JSON.stringify({ query: '{filteredUnits(legion:Mech){units{name, attacktype, armortype, dps, health,totalvalue,legion,goldcost,abilities{name}}}}' }),
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText)
                error.response = response
                throw error
            }
        }).then(function (data) {
            //player object an frontend
            allFighters.push(data.data.filteredUnits.units);
            fetch('https://api.legiontd2.com/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', "x-api-key": meinKey },
                body: JSON.stringify({ query: '{filteredUnits(legion:Grove){units{name, attacktype, armortype, dps, health,totalvalue,goldcost,legion,abilities{name}}}}' }),
            })
                .then(function (response) {
                    if (response.ok) {
                        return response.json();
                    }
                    else {
                        var error = new Error(response.statusText)
                        error.response = response
                        throw error
                    }
                }).then(function (data) {
                    //player object an frontend
                    allFighters.push(data.data.filteredUnits.units);
                    fetch('https://api.legiontd2.com/graphql', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey },
                        body: JSON.stringify({ query: '{filteredUnits(legion:Forsaken){units{name, attacktype, armortype, dps, health,totalvalue,legion,goldcost,abilities{name}}}}' }),
                    })
                        .then(function (response) {
                            if (response.ok) {
                                return response.json();
                            }
                            else {
                                var error = new Error(response.statusText)
                                error.response = response
                                throw error
                            }
                        }).then(function (data) {
                            //player object an frontend
                            allFighters.push(data.data.filteredUnits.units);
                            fetch('https://api.legiontd2.com/graphql', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json', "x-api-key": meinKey },
                                body: JSON.stringify({ query: '{filteredUnits(legion:Element){units{name, attacktype, armortype, dps, health,totalvalue,legion,goldcost,abilities{name}}}}' }),
                            })
                                .then(function (response) {
                                    if (response.ok) {
                                        return response.json();
                                    }
                                    else {
                                        var error = new Error(response.statusText)
                                        error.response = response
                                        throw error
                                    }
                                }).then(function (data) {
                                    //player object an frontend
                                    allFighters.push(data.data.filteredUnits.units);
                                    fetch('https://api.legiontd2.com/graphql', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey },
                                        body: JSON.stringify({ query: '{filteredUnits(legion:Atlantean){units{name, attacktype, armortype, dps, health,totalvalue,legion,goldcost,abilities{name}}}}' }),
                                    })
                                        .then(function (response) {
                                            if (response.ok) {
                                                return response.json();
                                            }
                                            else {
                                                var error = new Error(response.statusText)
                                                error.response = response
                                                throw error
                                            }
                                        }).then(function (data) {
                                            //player object an frontend
                                            allFighters.push(data.data.filteredUnits.units);
                                            res.json(allFighters);
                                        });
                                });
                        });
                });
        });
});

app.get('/api/stats/legions/winrate', (req, res) => {
    var type = req.query.type;
    var value = req.query.value;
    fetch('https://api.legiontd2.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey },
        body: JSON.stringify({ query: '{ stats{ legionPickWinRate(' + type + ':"' + value + '") { legion, gamesPicked, gamesWon } } }' }),
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText)
                error.response = response
                throw error
            }
        }).then(function (data) {
            //player object an frontend
            res.json(data.data);
        });
});

app.get('/api/stats/player/winrate', (req, res) => {
    var type = req.query.type;
    var value = req.query.value;
    var value2 = req.query.value2;
    fetch('https://api.legiontd2.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey },
        body: JSON.stringify({ query: '{ stats{ legionPickWinRate(' + type + ':"' + value + '", playerid :"' + value2 + '") { legion, gamesPicked, gamesWon } } }' }),
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText)
                error.response = response
                throw error
            }
        }).then(function (data) {
            //player object an frontend
            res.json(data.data);
        });
});

app.get('/api/stats/legions/avgvalueEnd', (req, res) => {
    var type = req.query.type;
    var value = req.query.value;
    fetch('https://api.legiontd2.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey },
        body: JSON.stringify({ query: '{ stats{ legionAverageValueByEndingWave(' + type + ':"' + value + '") { legion, wave, value } } }' }),
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText)
                error.response = response
                throw error
            }
        }).then(function (data) {
            //player object an frontend
            res.json(data.data);
        });
});

app.get('/api/stats/player/avgvalueEnd', (req, res) => {
    var type = req.query.type;
    var value = req.query.value;
    var value2 = req.query.value2;
    fetch('https://api.legiontd2.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey },
        body: JSON.stringify({ query: '{ stats{ legionAverageValueByEndingWave(' + type + ':"' + value + '", playerid :"' + value2 + '") { legion, wave, value } } }' }),
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText)
                error.response = response
                throw error
            }
        }).then(function (data) {
            //player object an frontend
            res.json(data.data);
        });
});


app.get('/api/stats/legions/avgvincEnd', (req, res) => {
    var type = req.query.type;
    var value = req.query.value;
    fetch('https://api.legiontd2.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey },
        body: JSON.stringify({ query: '{ stats{ legionAverageIncomeByEndingWave(' + type + ':"' + value + '") { legion, wave, income } } }' }),
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText)
                error.response = response
                throw error
            }
        }).then(function (data) {
            //player object an frontend
            res.json(data.data);
        });
});

app.get('/api/stats/player/avgvincEnd', (req, res) => {
    var type = req.query.type;
    var value = req.query.value;
    var value2 = requ.query.value2;
    fetch('https://api.legiontd2.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey },
        body: JSON.stringify({ query: '{ stats{ legionAverageIncomeByEndingWave(' + type + ':"' + value + '", playerid :"' + value2 + '") { legion, wave, income } } }' }),
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText)
                error.response = response
                throw error
            }
        }).then(function (data) {
            //player object an frontend
            res.json(data.data);
        });
});


app.get('/api/stats/legions/avgworkersEnd', (req, res) => {
    var type = req.query.type;
    var value = req.query.value;
    fetch('https://api.legiontd2.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey },
        body: JSON.stringify({ query: '{ stats{ legionAverageWorkersByEndingWave(' + type + ':"' + value + '") { legion, wave, workers } } }' }),
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText)
                error.response = response
                throw error
            }
        }).then(function (data) {
            //player object an frontend
            res.json(data.data);
        });
});

app.get('/api/stats/player/avgworkersEnd', (req, res) => {
    var type = req.query.type;
    var value = req.query.value;
    var value2 = requ.query.value2;
    fetch('https://api.legiontd2.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey },
        body: JSON.stringify({ query: '{ stats{ legionAverageWorkersByEndingWave(' + type + ':"' + value + '", playerid :"' + value2 + '") { legion, wave, workers } } }' }),
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText)
                error.response = response
                throw error
            }
        }).then(function (data) {
            //player object an frontend
            res.json(data.data);
        });
});

app.get('/api/stats/legions/avgwleaksEnd', (req, res) => {
    var type = req.query.type;
    var value = req.query.value;
    fetch('https://api.legiontd2.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey },
        body: JSON.stringify({ query: '{ stats{ legionAverageLeaksByEndingWave(' + type + ':"' + value + '") { legion, wave, leakValue } } }' }),
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText)
                error.response = response
                throw error
            }
        }).then(function (data) {
            //player object an frontend
            res.json(data.data);
        });
});

app.get('/api/stats/player/avgwleaksEnd', (req, res) => {
    var type = req.query.type;
    var value = req.query.value;
    var value2 = req.query.value2;
    fetch('https://api.legiontd2.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey },
        body: JSON.stringify({ query: '{ stats{ legionAverageLeaksByEndingWave(' + type + ':"' + value + '", playerid :"' + value2 + '") { legion, wave, leakValue } } }' }),
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText)
                error.response = response
                throw error
            }
        }).then(function (data) {
            //player object an frontend
            res.json(data.data);
        });
});

app.get('/api/stats/legions/avgworkersWave', (req, res) => {
    var type = req.query.type;
    var value = req.query.value;
    fetch('https://api.legiontd2.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey },
        body: JSON.stringify({ query: '{ stats{ legionAverageWorkersPerWave(' + type + ':"' + value + '") { legion, wave, workers } } }' }),
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText)
                error.response = response
                throw error
            }
        }).then(function (data) {
            //player object an frontend
            res.json(data.data);
        });
});

app.get('/api/stats/player/avgworkersWave', (req, res) => {
    var type = req.query.type;
    var value = req.query.value;
    var value2 = req.query.value2;
    fetch('https://api.legiontd2.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey },
        body: JSON.stringify({ query: '{ stats{ legionAverageWorkersPerWave(' + type + ':"' + value + '", playerid :"' + value2 + '") { legion, wave, workers } } }' }),
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText)
                error.response = response
                throw error
            }
        }).then(function (data) {
            //player object an frontend
            res.json(data.data);
        });
});

app.get('/api/stats/legions/avgnetworthsWave', (req, res) => {
    var type = req.query.type;
    var value = req.query.value;
    fetch('https://api.legiontd2.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey },
        body: JSON.stringify({ query: '{ stats{ legionAverageNetWorthPerWave(' + type + ':"' + value + '") { legion, wave, networth } } }' }),
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText)
                error.response = response
                throw error
            }
        }).then(function (data) {
            //player object an frontend
            res.json(data.data);
        });
});

app.get('/api/stats/player/avgnetworthsWave', (req, res) => {
    var type = req.query.type;
    var value = req.query.value;
    var value2 = req.query.value2;
    fetch('https://api.legiontd2.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey },
        body: JSON.stringify({ query: '{ stats{ legionAverageNetWorthPerWave(' + type + ':"' + value + '", playerid :"' + value2 + '") { legion, wave, networth } } }' }),
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText)
                error.response = response
                throw error
            }
        }).then(function (data) {
            //player object an frontend
            res.json(data.data);
        });
});

app.get('/api/stats/playercount', (req, res) => {
    fetch('https://api.legiontd2.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey },
        body: JSON.stringify({ query: '{filteredPlayers(offset:0){count}}' }),
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText)
                error.response = response
                throw error
            }
        }).then(function (data) {
            //player object an frontend
            res.json(data.data);
        });
});






app.get('/api/tour/player', (req, res) => {
    var pname = req.query.player;
    fetch('https://api.legiontd2.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey },
        body: JSON.stringify({ query: '{ player(playername: "' + pname + '"){playername,statistics} }' }),
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                var error = new Error(response.statusText)
                error.response = response
                throw error
            }
        }).then(function (data) {
            //player object an frontend
            res.json(data.data);
        });

});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);