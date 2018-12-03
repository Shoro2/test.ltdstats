'use strict';

const express = require('express');
const jquery = require('jquery');
const tabmenu = require('./public/js/tabmenu');
require("./private/sqlcon.js")
const chart = require('chart.js');
const favicon = require('serve-favicon');
var bodyParser = require('body-parser');

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
app.use(bodyParser.json({ limit: '5000mb' }))

app.use(favicon(__dirname + '/public/img/favicon.ico'));

//mysql
mysqlcon.connect(function (err) {
    if (err) throw err;
    console.log("Connected to MySQL");
});

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

/*
app.get('/tournaments', (req, res) => {
    res.render('tournaments', {
        title: 'Tournaments'
    })
});
*/

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
        case "bluejinelement":
            res.render('guides/element/bluejinele', {
                title: 'Bluejin\'s Element Guide'
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
        case "hazetechgrove":
            res.render('guides/grove/hazetechgrove', {
                title: 'Haze_Tech: How to be a Grove Main'
            });
            break;
        //forsaken
        case "akitosforsaken":
            res.render('guides/forsaken/akitosforsaken', {
                title: 'Akitos Forsaken Guide'
            });
            break;
        case "blacktideforsaken":
            res.render('guides/forsaken/blacktideforsaken', {
                title: 'Blacktide´s Forsaken Guide'
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
        case "wavecounters":
            res.render('guides/general/wavecounters', {
                title: 'Wave Counter List'
            });
            break;
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
        case "roshmercs":
            res.render('guides/general/roshmercs', {
                title: 'Roshkatul´s Individual Mercenary Guides'
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
        case "new":
            res.render('guides/createguide', {
                title: 'Create a guide'
            });
            break;
        case "upload":
            var preamble = req.query.preamble;
            var waves = req.query.waves;
            var author = req.query.author;
            var version = req.query.version;
            var section = req.query.section;
            var title = req.query.title;
            /*var url = 'http://159.69.83.17:3000/guides/upload?waves=' + waves + '&author=' + author + '&version=' + version + '&section=' + section + '&title=' + title + '&preamble=' + preamble;
            if (url.includes("<script") || url.includes("<button") || url.includes("onclick")) {
                res.send("bad url");
            }
            else {*/
                console.log("sending request---");
            http.get('http://159.69.83.17:3000/guides/uploadGuide?waves=' + waves + '&author=' + author + '&version=' + version + '&section=' + section + '&title=' + title + '&preamble=' + preamble, (resp) => {
                    console.log("resp");
                    let data = '';

                    // A chunk of data has been recieved.
                    resp.on('data', (chunk) => {
                        data += chunk;
                    });

                    // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    console.log(data);
                        res.json(data);
                    });

                }).on("error", (err) => {
                    console.log("Error: " + err.message);
                });
            //}
            break;
        default:
            console.log("guide default: "+guide);
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

app.get('/livegame', (req, res) => {
    res.render('livegame', {
        title: 'Livegame'
    })
});

app.get('/4v4/howto', (req, res) => {
    res.render('4v4/howto', {
        title: '4vs4 How To'
    })
});


app.get('/4v4/ladder', (req, res) => {
    res.render('4v4/ladder', {
        title: '4vs4 Ladder',
    });
});

app.get('/4v4/games', (req, res) => {
    res.render('4v4/games', {
        title: '4vs4 Games'
    })
});

app.get('/4v4/lobbies', (req, res) => {
    res.render('4v4/lobbies', {
        title: '4vs4 Open lobbies'
    })
});

app.get('/donate', (req, res) => {
    res.render('donate', {
        title: 'Donate'
    })
});
/*
app.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login'
    })
});

app.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register',
        mongoCon: mongoConnection
    })
});

//sql abfragen
app.get('/users/checkname', (req, res) => {
    
        dbo.collection("users").find(query).toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
            db.close();
        });
});

*/

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

app.get('/sql/getLivegame', (req, res) => {
    var pname = req.query.playername;
    http.get('http://159.69.83.17:3000/db/livegames?myobj=' + pname, (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            if (data) res.json(data);
            else res.send("no data");
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

});

app.get('/sql/ladder', (req, res) => {
    mysqlcon.query("SELECT * FROM ltdstats.player order by elo desc;", function (err, result, fields) {
        if (err) throw err;
        res.json(result);
    });
});

app.get('/sql/games', (req, res) => {
    mysqlcon.query("SELECT * FROM ltdstats.games order by id desc;", function (err, result, fields) {
        if (err) throw err;
        res.json(result);
    });
});

app.get('/sql/lobbies', (req, res) => {
    mysqlcon.query("SELECT * FROM ltdstats.lobby order by idlobby desc;", function (err, result, fields) {
        if (err) throw err;
        res.json(result);
    });
});


//ipstack

app.get('/getLang', (req, res) => {
    var ip = (req.headers['x-forwarded-for'] || '').split(',').pop() ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    if (ip.substring(8).includes(":")) {
        //ipv6
        console.log("ipv6:");
        console.log(ip);
    }
    else {
        //ipv4
        console.log("ipv4");
        ip = ip.substring(8);
    }
    http.get('http://api.ipstack.com/' + ip + '?access_key=' + meinKey3, (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            data = data.split(",");
            res.send(data[5]);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

});

//mongodb


app.get('/mongo/getGames', (req, res) => {
    var type = req.query.type;
    var target_db = req.query.db;
    var myLimit = req.query.limit;
    var formating = req.query.formating;
    var request_url = "";
    switch (type) {
        case "id":
            var search_id = req.query.id;
            request_url = "http://159.69.83.17:3000/db/games?action=search&db=" + target_db + "&type=id&limit=" + myLimit + "&formating=" + formating + "&id=" + search_id;
            break;
        case "playername":
            var search_name = req.query.name;
            request_url = "http://159.69.83.17:3000/db/games?action=search&db=" + target_db + "&type=playername&limit=" + myLimit + "&formating=" + formating + "&name=" + search_name;
            break;
        case "version":
            var search_version = req.query.version;
            request_url = "http://159.69.83.17:3000/db/games?action=search&db=" + target_db + "&type=version&limit=" + myLimit + "&formating=" + formating + "&version=" + search_version;
            break;
        case "date":
            var search_from = req.query.from;
            var search_to = req.query.to;
            request_url = "http://159.69.83.17:3000/db/games?action=search&db=" + target_db + "&type=date&limit=" + myLimit + "&formating=" + formating + "&from=" + search_from + "&to=" + search_to;
            break;
        //http://ltdstats.com/mongo/getGames?type=all&db=rankedGames
        case "all":
            request_url = "http://159.69.83.17:3000/db/games?action=search&db=" + target_db + "&type=all&limit=0&formating=none";
            break;

    }
    if (request_url != "") {
        http.get(request_url, (resp) => {
            let data = '';
            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                if (data) res.json(data);
                else res.send("no data");
            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    }
    
});











//api abfragen

app.get('/api/playerElo', (req, res) => {
    var playername = req.query.playername;
    fetch('https://api.legiontd2.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
        body: JSON.stringify({
            query: '{player(playername:"' + playername + '"){statistics}}'
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
            data.data.player.statistics = JSON.parse(data.data.player.statistics);
            res.render("elo", {
                meineElo: data.data.player.statistics.overallElo,
                title: "Elo"
            });
        });
});


app.get('/api/units', (req, res) => {
    var unitname = req.query.unitname;
    fetch('https://api.legiontd2.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
        body: JSON.stringify({
            query: '{unit(name: "' + unitname + '"){id,name,legion,description,tooltip,iconpath,abilities{name,tooltip,iconpath},armortype,attacktype,attackspeed,range,upgradesto,foodcost,goldcost,totalvalue,totalfood,dps,health,bounty,income}}'
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
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
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
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
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
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
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


//todo: check games order
app.get('/api/profile/playerOverallGames', (req, res) => {
    var date1 = new Date();
    var playername = req.query.playername.replace("%20", " ");
    console.log(playername);
    var meinPlayer;
    fetch('https://api.legiontd2.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
        body: JSON.stringify({ query: '{ player(playername: "' + playername + '") { filteredGamesQuery(limit: 150){ count, games{ game_id, ts, position, wave, time, queuetype, legion, iscross, gameresult, overallElo, unitsPerWave, leaksPerWave, mercsReceivedPerWave, mercsSentPerWave, workersPerWave, netWorthPerWave,gameDetails{playername,playerid,position,legion,wave,iscross,gameresult,overallElo,unitsPerWave,leaksPerWave,mercsReceivedPerWave,mercsSentPerWave,workersPerWave,netWorthPerWave,incomePerWave,legionSpell} } } } }' }),
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
            res.json(meinPlayer);
            console.log(new Date() - date1);
        });
});
/*
app.get('/api/profile/playerGames', (req, res) => {
    var playername = req.query.playername;
    fetch('https://api.legiontd2.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
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
// player with 100 last games
app.get('/api/profile/player100', (req, res) => {
    var playername = req.query.playername;
    fetch('https://api.legiontd2.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
        body: JSON.stringify({
            query: '{player(playername: "' + playername + '") { playername,statistics,games(queuetype: normal, limit: 100) {count,games{gameid,gameDetails{ts,wave,playername,legion,workers,income,value,iscross,gameresult,overallElo,position,leakValue,leakCaughtValue,mvpScore,legionSpell,unitsPerWave,leaksPerWave,netWorthPerWave,mercsSentPerWave,mercsReceivedPerWave,partyMembers{playername}}}}}}'
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

app.get('/api/profile/player', (req, res) => {
    var playername = req.query.playername;
    fetch('https://api.legiontd2.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
        body: JSON.stringify({
            query: '{player(playername:"' + playername + '"){id,playername,statistics,badges,cards,items,fightercosmetics,trophies,bestFriends(limit: 3){player{playername},gameCount}}}'
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
//stats
app.get('/api/stats/elo', (req, res) => {
    fetch('https://api.legiontd2.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
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
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
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
                headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
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
                        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
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
                                headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
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
                                        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
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
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
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
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
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
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
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
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
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
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
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
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
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
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
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
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
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
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
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
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
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
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
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
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
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
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
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
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
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
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
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
        headers: { 'Content-Type': 'application/json', "x-api-key": meinKey, "x-tyk-key": meinKey2 },
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