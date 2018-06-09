'use strict';

const express = require('express');
const jquery = require('jquery');
const tabmenu = require('./public/js/tabmenu');
const chart = require('chart.js');
const favicon = require('serve-favicon');
const mysql = require('mysql');
require('isomorphic-fetch');
// Constants
const PORT = 61624;
const HOST = '127.0.0.1';

// App
const app = express();


app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.static(__dirname + '/public'))

/*

var con = mysql.createConnection({
    host: "",
    user: "",
    port: "",
    password: ""
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to mySQL!");
});

*/


app.use(favicon(__dirname + '/public/img/favicon.ico'));




//routes

app.get('/profile', (req, res) => {
    var playerurl = req.query.player;
    res.render('profile', {
        title: 'Profile'
    });
    res.json(playerurl);
});

app.get('/index.html', (req, res) => {
    res.render('index', {
        title: 'Home'
    })
});

app.get('/sql', (req, res) => {
    res.render('updatedb', {
        title: 'SQL'
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
    res.render('ladder', {
        title: 'Ladder'
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

app.get('/guides', (req, res) => {
    res.render('guides', {
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

app.get('/guides/forsaken', (req, res) => {
    res.render('guides/forsaken', {
        title: 'Forsaken Guides'
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

app.get('/guides/general', (req, res) => {
    res.render('guides', {
        title: 'General Guides'
    })
});

app.get('/guides/test', (req, res) => {
    res.render('guides/guide_skele', {
        title: 'Skele Guide'
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

//api abfragen


app.get('/api/', (req, res) => {
    var command = req.query.command;
    fetch('https://api.legiontd2.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "x-api-key": "HsjQROytsjaA1xoYxpN1B3OK0jdywuFgaiyNMonF" },
        body: JSON.stringify({ query: command }),
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
        })
        ;

    
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);