function fill()
{
    var player = [];
    
    for(var i=0; i<8;i++)
    {
        player[i] = {spot: i, name: "player"+i, elo: 1200, pick_element: 0.25, win_element: 0.5, pick_grove: (0.1), win_grove: (1), pick_forsaken: (0.15), win_forsaken: (0.61), pick_mech: (0.1), win_mech: (0.2), pick_mastermind: (0.4), win_mastermind: (0.55)};
    }
    //fill table
    var table_west = document.getElementById("team1");
    var table_east = document.getElementById("team2");
    for(var i=0; i<player.length;i++)
    {
        if(player[i].spot<4)
        {
            table_west.rows[i+1].cells[0].textContent = player[i].name;
            table_west.rows[i+1].cells[1].textContent = player[i].elo;
            table_west.rows[i+1].cells[2].textContent = player[i].pick_element;
            table_west.rows[i+1].cells[3].textContent = player[i].win_element;
            table_west.rows[i+1].cells[4].textContent = player[i].pick_grove;
            table_west.rows[i+1].cells[5].textContent = player[i].win_grove;
            table_west.rows[i+1].cells[6].textContent = player[i].pick_forsaken;
            table_west.rows[i+1].cells[7].textContent = player[i].win_forsaken;
            table_west.rows[i+1].cells[8].textContent = player[i].pick_mech;
            table_west.rows[i+1].cells[9].textContent = player[i].win_mech;
            table_west.rows[i+1].cells[10].textContent = player[i].pick_mastermind;
            table_west.rows[i+1].cells[11].textContent = player[i].win_mastermind;
        }
        else
        {
            table_east.rows[i-3].cells[0].textContent = player[i].name;
            table_east.rows[i-3].cells[1].textContent = player[i].elo;
            table_east.rows[i-3].cells[2].textContent = player[i].pick_element;
            table_east.rows[i-3].cells[3].textContent = player[i].win_element;
            table_east.rows[i-3].cells[4].textContent = player[i].pick_grove;
            table_east.rows[i-3].cells[5].textContent = player[i].win_grove;
            table_east.rows[i-3].cells[6].textContent = player[i].pick_forsaken;
            table_east.rows[i-3].cells[7].textContent = player[i].win_forsaken;
            table_east.rows[i-3].cells[8].textContent = player[i].pick_mech;
            table_east.rows[i-3].cells[9].textContent = player[i].win_mech;
            table_east.rows[i-3].cells[10].textContent = player[i].pick_mastermind;
            table_east.rows[i-3].cells[11].textContent = player[i].win_mastermind;
        }
    }
    //calc winchances
    var winchance_west = 0.0;
    var winchance_east = 0.0;
    for(var i=0;i<4;i++)
    {
        winchance_west += (player[i].win_element*player[i].pick_element + player[i].win_grove*player[i].pick_grove + player[i].win_forsaken*player[i].pick_forsaken + player[i].win_mech*player[i].pick_mech + player[i].win_mastermind*player[i].pick_mastermind)/5*player[i].elo;
    }
    winchance_west = winchance_west/4;
    for(var i=4;i<8;i++)
    {
        winchance_east += (player[i].win_element*player[i].pick_element + player[i].win_grove*player[i].pick_grove + player[i].win_forsaken*player[i].pick_forsaken + player[i].win_mech*player[i].pick_mech + player[i].win_mastermind*player[i].pick_mastermind)/5*player[i].elo;
    }
    winchance_east = winchance_east/4;
    var gesamt = winchance_east+winchance_west;
    winchance_east = winchance_east/gesamt*100;
    winchance_west = winchance_west/gesamt*100;
    //move bar
    move(winchance_west);
    //game info
    var gameid = "<gameid>";
    var timestamp = "<timestamp>";
    var gameinfo = document.getElementById("gameinfo");
    gameinfo.textContent = 
    "Game ID: "+gameid+" Timestamp:" +timestamp;
}

function move(max) {
    var elem = document.getElementById("myBar"); 
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
        if (width >= max) {
            clearInterval(id);
        } else {
            width++; 
            elem.style.width = width + '%'; 
        }
    }
    elem.textContent = "Your Winchance: "+max+" %";
}