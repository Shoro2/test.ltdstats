'use strict';

const express = require('express');
const jquery = require('jquery');
const tabmenu = require('./public/js/tabmenu');
require("./public/js/sqlcon")
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
    res.render('guides/searchguide', {
        title: 'Guides',
    })
});

app.get('/guides/search', (req, res) => {
    res.render('guides/searchguide', {
        title: 'Guides',
    })
});

app.get('/guides/create', (req, res) => {
    res.render('guides/createguide', {
        title: 'Create Guide',
        data: con
    })
});

app.get('/guides/element', (req, res) => {
    res.render('guides/element', {
        title: 'Element Guides'
    })
});

app.get('/guides/element/basics', (req, res) => {
    res.render('guides/element/basics', {
        title: 'Element Basics Guide'
    })
});

app.get('/guides/element/wadi', (req, res) => {
    res.render('guides/element/wadi', {
        title: 'Wadi\'s Element Guide'
    })
});

app.get('/guides/element/akitosvideo', (req, res) => {
    res.render('guides/element/akitoselement', {
        title: 'Akitos Element Guide'
    })
});

app.get('/guides/grove', (req, res) => {
    res.render('guides/grove', {
        title: 'Grove Guides'
    })
});

app.get('/guides/grove/theratedr', (req, res) => {
    res.render('guides/grove/theratedr', {
        title: 'TheRatedR´s Grove Guide'
    })
});

app.get('/guides/grove/isotropvideo', (req, res) => {
    res.render('guides/grove/isotropvideo', {
        title: 'Isotrop´s & Weilbockt´s Grove Guide'
    })
});

app.get('/guides/forsaken', (req, res) => {
    res.render('guides/forsaken', {
        title: 'Forsaken Guides'
    })
});

app.get('/guides/forsaken/akitosvideo', (req, res) => {
    res.render('guides/forsaken/akitosforsaken', {
        title: 'Akitos Forsaken Guide'
    })
});

app.get('/guides/forsaken/isotropvideo', (req, res) => {
    res.render('guides/forsaken/isotropforsaken', {
        title: 'Isotrop´s & Weilbockt´s Forsaken Guide'
    })
});

app.get('/guides/mech', (req, res) => {
    res.render('guides/mech', {
        title: 'Mech Guides'
    })
});

app.get('/guides/mech/cornep', (req, res) => {
    res.render('guides/mech/cornep', {
        title: 'Cornep´s Mech Guide'
    })
});

app.get('/guides/mech/isotropvideo', (req, res) => {
    res.render('guides/mech/isotropmech', {
        title: 'Isotrop´s & Weilbockt´s Mech Guide'
    })
});

app.get('/guides/mech/roshkatulmech', (req, res) => {
    res.render('guides/mech/roshkatulsmech', {
        title: 'OP Mech, get 2k+ elo easily, 80-90% winrate'
    })
});

app.get('/guides/mastermind', (req, res) => {
    res.render('guides/mastermind', {
        title: 'Mastermind Guides'
    })
});

app.get('/guides/mastermind/zitronenritter', (req, res) => {
    res.render('guides/mastermind/zitronenritter', {
        title: 'Zitronenritter´s Mastermind Guide'
    })
});

app.get('/guides/mastermind/roshkatulroll', (req, res) => {
    res.render('guides/mastermind/roshkatulmm', {
        title: 'Roshkatul´s Low Quality Guide: How to pick your mastermind roll'
    })
});

app.get('/guides/general', (req, res) => {
    res.render('guides/general', {
        title: 'General Guides'
    })
});

app.get('/guides/general/spelldmg', (req, res) => {
    res.render('guides/general/spelldmg', {
        title: 'Legion TD2 mechanics: Spell Damage'
    })
});

app.get('/guides/general/roshkatultips', (req, res) => {
    res.render('guides/general/roshkatultips', {
        title: 'Roshkatul´s 7 Tips for new players'
    })
});

app.get('/guides/general/legionspells', (req, res) => {
    res.render('guides/general/akitosspells', {
        title: 'Akitos Legion Spells Guide'
    })
});


app.get('/guides/general/simplestarter', (req, res) => {
    res.render('guides/general/simplestarter', {
        title: 'Teirdel´s Simple Starter Guide'
    })
});

app.get('/guides/general/2v2', (req, res) => {
    res.render('guides/general/2v2', {
        title: 'Cornep´s Guides: 2v2 Guide'
    })
});

app.get('/guides/general/improve', (req, res) => {
    res.render('guides/general/improve', {
        title: 'How to improve as a new Player'
    })
});

app.get('/guides/general/kraken', (req, res) => {
    res.render('guides/general/kraken', {
        title: 'Cornep´s Guides: The Kraken'
    })
});

app.get('/guides/general/lfgameguide', (req, res) => {
    res.render('guides/general/lfgameguide', {
        title: 'LForward´s Gameguide'
    })
});

app.get('/guides/general/tilt', (req, res) => {
    res.render('guides/general/tilt', {
        title: 'Cornep´s Guides: Taming the Tilt'
    })
});

app.get('/guides/general/whattosend', (req, res) => {
    res.render('guides/general/whattosend', {
        title: 'Cornep´s Guides: What to send'
    })
});

app.get('/guides/general/sendingguide', (req, res) => {
    res.render('guides/general/sendingguide', {
        title: 'Niklas Guide: Sending in Legion TD2'
    })
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




//sql abfragen

app.get('/sql/fighter', (req, res) => {
    con.query("SELECT * FROM ltdstats.fighter;", function (err, result, fields) {
        if (err) throw err;
        res.json(result);
    });
});

app.get('/sql/legion', (req, res) => {
    con.query("SELECT * FROM ltdstats.legion;", function (err, result, fields) {
        if (err) throw err;
        res.json(result);
    });
});

app.get('/sql/attack', (req, res) => {
    con.query("SELECT * FROM ltdstats.attack_types;", function (err, result, fields) {
        if (err) throw err;
        res.json(result);
    });
});

app.get('/sql/defense', (req, res) => {
    con.query("SELECT * FROM ltdstats.defense_types;", function (err, result, fields) {
        if (err) throw err;
        res.json(result);
    });
});

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
    con.query("SELECT * FROM ltdstats.guides ORDER BY patch DESC, type ASC", function (err, result, fields) {
        if (err) throw err;
        res.json(result);
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
        body: JSON.stringify({ query: '{ game(gameid: "' + gameid + '") { ts, leftkingpercenthp, rightkingpercenthp, gameDetails{ playername, wave, legion, unitsPerWave, leaksPerWave, mercsReceivedPerWave, mercsSentPerWave, workersPerWave, netWorthPerWave, incomePerWave, legionSpell } } }' }),
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
        body: JSON.stringify({ query: '{filteredPlayers(orderby: "' + legion + 'Elo", direction: DESC, limit: 10){players{playername,statistics,filteredGamesQuery(limit: 20) {games{game_id,gameresult}}}}}' }),
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
    var playername = req.query.playername;
    var meinPlayer;
    fetch('https://api.legiontd2.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey },
        body: JSON.stringify({ query: '{ player(playername: "' + playername + '") { filteredGamesQuery(limit: 200){ count, games{ game_id, ts, position, wave, time, queuetype, legion, iscross, gameresult, overallElo, unitsPerWave, leaksPerWave, mercsReceivedPerWave, mercsSentPerWave, workersPerWave, netWorthPerWave,gameDetails{playername,playerid,position,legion,wave,iscross,gameresult,overallElo,unitsPerWave,leaksPerWave,mercsReceivedPerWave,mercsSentPerWave,workersPerWave,netWorthPerWave,incomePerWave,legionSpell} } } } }' }),
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
            meinPlayer = data.data;
            var games_count = parseInt(data.data.player.filteredGamesQuery.count);
            if (games_count > 200) {
                for (var offset = 200; offset < games_count; offset = offset + 200) {
                    fetch('https://api.legiontd2.com/graphql', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey },
                        body: JSON.stringify({ query: '{ player(playername: "' + playername + '") { filteredGamesQuery(limit: 200, offset: ' + offset + '){ count, games{ game_id, ts, position, wave, time, queuetype, legion, iscross, gameresult, overallElo, unitsPerWave, leaksPerWave, mercsReceivedPerWave, mercsSentPerWave, workersPerWave, netWorthPerWave,gameDetails{playername,playerid,position,legion,wave,iscross,gameresult,overallElo,unitsPerWave,leaksPerWave,mercsReceivedPerWave,mercsSentPerWave,workersPerWave,netWorthPerWave,incomePerWave,legionSpell} } } } }' }),
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
                            data.data.player.filteredGamesQuery.games.forEach(function (ele) {
                                meinPlayer.player.filteredGamesQuery.games.push(ele);
                            });
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