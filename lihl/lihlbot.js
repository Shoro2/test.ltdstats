const Discord = require('discord.js');
const auth = require('./auth.json');
const logger = require('winston');

logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

var bot = new Discord.Client();
const token = "NDQzODgzNTAzODYwNTgwMzg3.DdT2SQ.IqwWXSak0AP1vMUBKgwkghLzACw";
bot.login(token);



bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Bot 1 logged in as: ');
    logger.info(bot.user.username + ' - (' + bot.user.id + ')');
});



var mysql = require('mysql');

var con = mysql.createConnection({
 
});
//vars



bot.on('message', message => {
	var channelname ="";
	channelname=message.channel.name;
	channel = message.channel;
	player_name=message.author.username;
	if(channelname=='sign-up' && message.author!="lihlbot")
	{
		switch(message.content)
		{
			case "!helloworld":
				message.channel.send("Hello World!");
				break;
			case "!start2":
				player_amount=4;
				createGame();	
				break;
			case "!start4":
				//createGame(8, message.author.username);
				break;
			case "!closegame":
				cancelGame();
				break;
			case "!sign2":
				signGame();
				break;
			case "!start":
				startGame();
				break;
			case "!lobby":
				showLobby();
				break;
		}
	}
	
	if(message.channel.id=="443948450871246848")
	{
		var meinsql ="SELECT * FROM games";
		con.query(meinsql, function (err, result) 
		{
			if (err) throw err;
			if(!result)
			{
				console.log("detected game end");
				var tabelle = message.embeds[0].description;
				if (tabelle.substring(0, 50).includes("Custom") == true)
				{
					
					var player_namen = new Array(9);
					var player_legion = new Array(9);
					var player_worker = new Array(9);
					var player_income = new Array(9);
					var player_value = new Array(9);
					var player_kills = new Array(9);
					var player_leaks = new Array(9);
					var gametime_total = 0;
					var gametime_min = 0;
					var gametime_sec = 0;
					var winner = "";
					var timeelapsed = "";
					var wave = 0;
					var mostincome = "";
					var mostvalue = "";
					var mostkills = "";
					var fewestleaks = "";
					var mostincomeval = 0;
					var mostvalueval = 0;
					var mostkillsval = 0;
					var fewestleaksval = 0;
					var counter = 1;
					var playerid = undefined;
					var sql_playerupdate="";
					var hatid=false;
					var officalId ="empty";
					var gameversion = "empty"

					// copy webhook inhalt
					for (var e = 0; e < message.embeds[0].fields.length; e++)
					{
						// Time Elapsed
						if (e == 0) 
						{
							var zeile = "";
							zeile = message.embeds[0].fields[e].value.substring(0, 14);
							gametime_min = zeile.substring(0, zeile.indexOf(":"));
							gametime_sec = zeile.substring(zeile.indexOf(":") + 1);
							timeelapsed = parseInt(gametime_min) * 60 + parseInt(gametime_sec);
						}
						// Wave game ended on
						if (e == 1) wave = message.embeds[0].fields[e].value;
						// Most income
						if (e == 3) mostincome = message.embeds[0].fields[e].value;
						// Most value
						// Most value
						if (e == 4) mostvalue = message.embeds[0].fields[e].value;
						// Most Kills
						if (e == 5) mostkills = message.embeds[0].fields[e].value;
						// Fewest Leaks
						if (e == 6) fewestleaks = message.embeds[0].fields[e].value;
						//id
						if (e==7) officalId = message.embeds[0].fields[e].value;
						//version
						if (e==8)  gameversion = message.embeds[0].fields[e].value;

					}
					// Tabelle

					
					//matchwinner
					if (tabelle.substring(2, 6) == "LOST")
					{
						winner = "EAST";
					}
					else
					{
						winner = "WEST";

					}
					//console.log("winner: "+ winner);
					for (var i = 1; i < 3; i++)
					{
						tabelle = tabelle.substring(tabelle.indexOf("┤") + 2);
						for (var l = 1; l < 3; l++)
						{
							tabelle = tabelle.substring(tabelle.indexOf("│") + 1);
							while (tabelle.substring(0, 1) == " ")
							{
								tabelle = tabelle.substring(1);
							}
								player_namen[counter] = tabelle.substring(0, tabelle.indexOf("("));
								tabelle = tabelle.substring(tabelle.indexOf("│") + 1);
								while (tabelle.substring(0, 1) == " ")
								{
									tabelle = tabelle.substring(1);
								}

								player_legion[counter] = tabelle.substring(0, tabelle.indexOf(" "));
								tabelle = tabelle.substring(tabelle.indexOf("│") + 1);
								while (tabelle.substring(0, 1) == " ")
								{
									tabelle = tabelle.substring(1);
								}
								player_worker[counter] = tabelle.substring(0, tabelle.indexOf(" "));
								tabelle = tabelle.substring(tabelle.indexOf("│") + 1);
								while (tabelle.substring(0, 1) == " ")
								{
									tabelle = tabelle.substring(1);
								}
								player_income[counter] = tabelle.substring(0, tabelle.indexOf(" "));
								tabelle = tabelle.substring(tabelle.indexOf("│") + 1);
								while (tabelle.substring(0, 1) == " ")
								{
									tabelle = tabelle.substring(1);
								}
								player_value[counter] = tabelle.substring(0, tabelle.indexOf(" "));
								tabelle = tabelle.substring(tabelle.indexOf("│") + 1);
								while (tabelle.substring(0, 1) == " ")
								{
									tabelle = tabelle.substring(1);
								}
								player_kills[counter] = tabelle.substring(0, tabelle.indexOf(" "));
								tabelle = tabelle.substring(tabelle.indexOf("│") + 1);
								while (tabelle.substring(0, 1) == " ")
								{
									tabelle = tabelle.substring(1);
								}
								player_leaks[counter] = tabelle.substring(0, tabelle.indexOf(" "));
								tabelle = tabelle.substring(tabelle.indexOf("│") + 1);

							counter++;

						}
						tabelle = tabelle.substring(tabelle.indexOf("`"));
					}

				
				
				
				}
			
				var sql ="SELECT * FROM games WHERE p1='"+player_namen[1]+"'";
				con.query(sql, function (err, result) 
				{
					if (err) throw err;
					if(result)
					{
						elo=[];
						elogain = result[0].elo;
						var sql2 ="SELECT * FROM player WHERE name='"+result[0].p1+"'";
						con.query(sql2, function (err2, result2) 
						{
							
							if (err2) throw err;
							
							elo[0]=result2[0].elo;
						});
						var sql3 ="SELECT * FROM player WHERE name='"+result[0].p2+"'";
						con.query(sql3, function (err3, result3) 
						{
							
							if (err3) throw err;
							
							elo[1]=result3[0].elo;
						});
						var sql4 ="SELECT * FROM player WHERE name='"+result[0].p3+"'";
						con.query(sql4, function (err4, result4) 
						{
							
							if (err4) throw err;
							
							elo[2]=result4[0].elo;
						});
						var sql5 ="SELECT * FROM player WHERE name='"+result[0].p4+"'";
						con.query(sql5, function (err5, result5) 
						{
							
							if (err5) throw err;
							
							elo[3]=result5[0].elo;
						});
						if(winner=="WEST")
						{
							elo[0] = elo[0] + (30-elogain);
							elo[1] = elo[1] + (30-elogain);
							elo[2] = elo[2] - (30-elogain);
							elo[3] = elo[3] - (30-elogain);
							var sql6 ="UPDATE player SET (elo="+elo[0]+", games=games+1, wins=wins+1) WHERE name='"+result[0].p1+"'; UPDATE player SET (elo="+elo[1]+", games=games+1, wins=wins+1) WHERE name='"+result[0].p2+"'; UPDATE player SET (elo="+elo[2]+", games=games+1) WHERE name='"+result[0].p3+"'; UPDATE player SET (elo="+elo[3]+", games=games+1) WHERE name='"+result[0].p4+"';";
						}
						else
						{
							elo[0] = elo[0] - (elogain);
							elo[1] = elo[1] - (elogain);
							elo[2] = elo[2] + (elogain);
							elo[3] = elo[3] + (elogain);
							var sql6 ="UPDATE player SET (elo="+elo[0]+", games=games+1) WHERE name='"+result[0].p1+"'; UPDATE player SET (elo="+elo[1]+", games=games+1) WHERE name='"+result[0].p2+"'; UPDATE player SET (elo="+elo[2]+", games=games+1, wins=wins+1) WHERE name='"+result[0].p3+"'; UPDATE player SET (elo="+elo[3]+", games=games+1, wins=wins+1) WHERE name='"+result[0].p4+"';";
						}
						con.query(sql6, function (err6, result6) 
						{
							
							if (err6) throw err;
							console.log(sql6);
						});
					}
				});
			}
			
		});
		
	}
});


function createGame()
{
	var sql = "SELECT idlobby FROM lobby WHERE p1='"+player_name+"' OR p2='"+player_name+"' OR p3='"+player_name+"' OR p4='"+player_name+"' OR p5='"+player_name+"' OR p6='"+player_name+"' OR p7='"+player_name+"' OR p8='"+player_name+"'";
	con.query(sql, function (err, result) 
	{
		if (err) throw err;
		if(result.length>0)
		{
			channel.send("There is already an open lobby. Type !sign"+(player_amount/2)+" to join.");
			
		}
		else
		{
			insertgame();
			channel.send(player_name+" created a 2vs2 game. Type in !sign2 if you want to join.");
		}
	});
}

function signGame()
{
	var sql = "SELECT * FROM lobby WHERE p1='"+player_name+"' OR p2='"+player_name+"' OR p3='"+player_name+"' OR p4='"+player_name+"' OR p5='"+player_name+"' OR p6='"+player_name+"' OR p7='"+player_name+"' OR p8='"+player_name+"'";
	con.query(sql, function (err, result) 
	{
		if (err) throw err;
		if(result.length>0)
		{
			channel.send(player_name+" is already signed up for that game.");
		}
		else
		{
			var sql2 = "SELECT * FROM lobby";
			con.query(sql2, function (err2, result2) 
			{
				if (err2) throw err2;
				if(result2[0].p2)
				{
					if(result2[0].p3)
					{
						if(result2[0].p4)
						{
							channel.send("This game is already full.");
						}
						else
						{
							var sql = "UPDATE lobby SET p4='"+player_name+"'";
							con.query(sql, function (err, result) 
							{
								if (err) throw err;
								channel.send(player_name+" joined the game, the game is full.");
								startGame();
							});
						}
					}
					else
					{
						var sql3 = "UPDATE lobby SET p3='"+player_name+"'";
						con.query(sql3, function (err3, result3) 
						{
							if (err) throw err;
							channel.send(player_name+" joined the game, 1 more open spot.");
						});
					}
				}
				else
				{
					var sql4 = "UPDATE lobby SET p2='"+player_name+"'";
					con.query(sql4, function (err4, result4) 
					{
						if (err4) throw err;
						channel.send(player_name+" joined the game, 2 more open spots.");
					});
				}
			});
			
		}
	});
	
}

function cancelGame()
{
	var sql = "DELETE FROM lobby";
	con.query(sql, function (err, result) 
	{
		if (err) throw err;
		if(result.affectedRows==1)
		{
			channel.send("Lobby full. Use !start2 to play another game.");
		}
		
	});
}

function startGame()
{
	var sql="SELECT * FROM lobby";
	con.query(sql, function (err, result) 
	{
		if (err) throw err;
		if(result)
		{
			meinresult=result[0];
			getTeams(meinresult.p1, meinresult.p2, meinresult.p3, meinresult.p4);
			//channel.send("Game started. Players: "+meinresult.p1+", "+meinresult.p2+", "+meinresult.p3+", "+meinresult.p4+".");
			
		}
		
	});
	
}

function compare(a,b) {
  if (a.elo < b.elo)
    return -1;
  if (a.elo > b.elo)
    return 1;
  return 0;
}

function getTeams(p1,p2,p3,p4)
{
	var sql = "SELECT * FROM player WHERE name='"+p1+"' OR name='"+p2+"' OR name='"+p3+"' OR name='"+p4+"'";
	player = [];
	for(var i=0;i<4;i++)
	{
		//new player stats
		player.push({
			name: "",
			elo:1000,
			games:0,
			wins:0
		});
	}
	con.query(sql, function (err, result) 
	{
		if (err) throw err;
		for(var i=0;i<4;i++)
		{
			if(result[i])
			{
				//parse sql result in player
				player[i] = result[i];
			}
			else
			{
				//neuer spieler
				switch(i)
				{
					case 0:
						player[i].name = p1;
						break;
					case 1:
						player[i].name = p2;
						break;
					case 2:
						player[i].name = p3;
						break;
					case 3:
						player[i].name = p4;
						break;
				}
				player[i].elo=1200;
				player[i].games=0;
				player[i].wins=0;
				var sql2 = "INSERT INTO player (name, elo, games, wins) VALUES ('"+player[i].name+"', 1200, 0, 0)";
				con.query(sql2, function (err2, result2) 
				{
					if (err2) throw err2;	
				});
			}
		}
		//teams bilden
		player.sort(compare);
		var teamelo =[];
		teamelo[0]=(player[3].elo + player[0].elo)/2;
		teamelo[1]=(player[1].elo + player[2].elo)/2;
		channel.send("Team 1(avg: "+teamelo[0]+"): "+player[3].name+"("+player[3].elo+"), "+player[0].name+"("+player[0].elo+")");
		channel.send("Team 2(avg: "+teamelo[1]+"): "+player[2].name+"("+player[2].elo+"), "+player[1].name+"("+player[1].elo+")");
		var rchange = ((teamelo[0]/teamelo[1])*15).toFixed(2);
		channel.send("Rating change: +"+rchange+"/-"+(30-rchange).toFixed(2));
		var sql2="INSERT INTO games (p1, p2, p3, p4, elo) VALUES ('"+player[3].name+"', '"+player[0].name+"', '"+player[2].name+"', '"+player[1].name+"', "+rchange+")";
			con.query(sql2, function (err, result) 
			{
				if (err) throw err;
				
			});
	});
}


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to mySQL!");
  

});

function insertgame()
{
	var sql = "INSERT INTO lobby (creator, p1) VALUES ('"+player_name+"', '"+player_name+"')";
	con.query(sql, function (err, result) 
	{
		if (err) throw err;
		
	});
}

function showLobby()
{
	var sql = "SELECT * FROM lobby";
	con.query(sql, function (err, result) 
	{
		if (err) throw err;
		var meinstring="";
		if(result[0])
		{
			meinstring += result[0].p1;
		}
		if(result[0])
		{
			meinstring += result[0].p2;
		}
		if(result[0])
		{
			meinstring += result[0].p3;
		}
		if(result[0])
		{
			meinstring += result[0].p4;
		}
		channel.send(meinstring);
	});
}	


