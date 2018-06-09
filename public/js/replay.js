var firsttime = false;

function getGameDetails()
{
    firsttime=true;
    meinString = '{      "EventName": "game_balance_player_row",      "EventNamespace": "title.9092",      "EntityType": "title",      "Source": "9092",      "EventId": "c5f6a1e98daa4a6d9a5923604a5d2c8b",      "EntityId": "9092",      "SourceType": "GameServer",      "Timestamp": "2018-04-24T14:50:10.036Z",      "History": null,      "CustomTags": null,      "Reserved": null,      "date": "2018.04.24.14:50",      "version": "v2.20a1",      "game_id": "18144814495749900068",      "queue_type": "Casual",      "wave": 17,      "time": 1611,      "player_id": "8D00ED403777F848",      "player_number": 6,      "player_name": "Bammer805",      "legion": "Mech",      "fighters": "Peewee,Fatalizer,Leviathan,Bazooka,Zeus,Doomsday Machine,Zeus,Pyro,Veteran,Veteran,MPS,Veteran,Veteran,Veteran,Zeus,Veteran,Leviathan",      "mercenaries": "Snail,Snail,Fiend,Snail,Snail,Snail,Snail,Lizard,Snail,Snail,Brute,Fiend,Fiend,Brute,Dragon Turtle,Safety Mole,Dragon Turtle,Dragon Turtle,Snail,Safety Mole,Brute,Drake,Drake,Drake",      "workers": 25,      "income": 369,      "value": 3970,      "cross": 0,      "game_result": "lost",      "stayed_till_end": true,      "player_count": 4,      "human_count": 4,      "overallElo": 1200,      "gameElo": 1204,      "spell": "Taxed Allowance",      "partySize": 1,      "net_worth_per_wave": [          422,          512,          608,          752,          896,          1064,          1247,          1439,          1667,          2020,          2385,          2821,          3199,          3647,          4148,          4916      ],      "workers_per_wave": [          4,          4,          4,          5,          5,          5,          6,          7,          7,          8,          12,          12,          14,          15,          15,          25      ],      "mercenaries_sent_per_wave": [          [],          [              "Snail"          ],          [],          [              "Fiend",              "Snail"          ],          [              "Snail"          ],          [              "Snail",              "Snail"          ],          [              "Snail"          ],          [              "Lizard"          ],          [],          [              "Brute",              "Snail"          ],          [              "Snail",              "Fiend"          ],          [              "Fiend",              "Brute"          ],          [              "Dragon Turtle"          ],          [              "Safety Mole",              "Dragon Turtle"          ],          [              "Dragon Turtle"          ],          [              "Safety Mole",              "Snail",              "Brute"          ]      ],      "mercenaries_received_per_wave": [          [],          [],          [],          [              "Dino"          ],          [              "Snail"          ],          [              "Snail",              "Snail"          ],          [              "Brute"          ],          [],          [              "Lizard",              "Lizard"          ],          [              "Snail",              "Lizard"          ],          [              "Hermit"          ],          [              "Fiend",              "Lizard"          ],          [              "Lizard",              "Lizard"          ],          [              "Dragon Turtle",              "Hermit"          ],          [              "Lizard",              "Brute",              "Hermit"          ],          []      ],      "leaks_per_wave": [          [],          [],          [],          [],          [],          [],          [],          [],          [],          [],          [],          [],          [],          [],          [],          [              "Cardinal",              "Cardinal",              "Cardinal",              "Cardinal"          ]      ],      "build_per_wave": [          [              "tempest_unit_id:4.5,9.5",              "peewee_unit_id:2.5,7.5"          ],          [              "tempest_unit_id:4.5,9.5",              "peewee_unit_id:2.5,7.5",              "bazooka_unit_id:7.5,9.5",              "peewee_unit_id:4.5,7.5"          ],          [              "tempest_unit_id:4.5,9.5",              "veteran_unit_id:2.5,7.5",              "bazooka_unit_id:7.5,9.5",              "peewee_unit_id:4.5,7.5"          ],          [              "tempest_unit_id:4.5,9.5",              "veteran_unit_id:2.5,7.5",              "bazooka_unit_id:7.5,9.5",              "veteran_unit_id:4.5,7.5",              "peewee_unit_id:3.5,7.5"          ],          [              "tempest_unit_id:4.5,9.5",              "veteran_unit_id:2.5,7.5",              "bazooka_unit_id:7.5,9.5",              "veteran_unit_id:4.5,7.5",              "veteran_unit_id:3.5,7.5"          ],          [              "tempest_unit_id:4.5,9.5",              "veteran_unit_id:2.5,7.5",              "zeus_unit_id:7.5,9.5",              "veteran_unit_id:4.5,7.5",              "veteran_unit_id:3.5,7.5",              "peewee_unit_id:3.5,6.5"          ],          [              "tempest_unit_id:4.5,9.5",              "veteran_unit_id:2.5,7.5",              "zeus_unit_id:7.5,9.5",              "veteran_unit_id:4.5,7.5",              "veteran_unit_id:3.5,7.5",              "peewee_unit_id:3.5,6.5",              "aps_unit_id:8.5,9.5",              "peewee_unit_id:2.5,6.5"          ],          [              "tempest_unit_id:4.5,9.5",              "veteran_unit_id:2.5,7.5",              "zeus_unit_id:7.5,9.5",              "veteran_unit_id:4.5,7.5",              "veteran_unit_id:3.5,7.5",              "veteran_unit_id:3.5,6.5",              "aps_unit_id:8.5,9.5",              "peewee_unit_id:2.5,6.5",              "peewee_unit_id:4.5,6.5",              "peewee_unit_id:3.5,5.5"          ],          [              "tempest_unit_id:4.5,9.5",              "veteran_unit_id:2.5,7.5",              "zeus_unit_id:7.5,9.5",              "veteran_unit_id:4.5,7.5",              "veteran_unit_id:3.5,7.5",              "veteran_unit_id:3.5,6.5",              "aps_unit_id:8.5,9.5",              "peewee_unit_id:2.5,6.5",              "peewee_unit_id:4.5,6.5",              "peewee_unit_id:3.5,5.5",              "bazooka_unit_id:8.5,8.5",              "bazooka_unit_id:7.5,8.5"          ],          [              "tempest_unit_id:4.5,9.5",              "veteran_unit_id:2.5,7.5",              "zeus_unit_id:7.5,9.5",              "veteran_unit_id:4.5,7.5",              "veteran_unit_id:3.5,7.5",              "veteran_unit_id:3.5,6.5",              "aps_unit_id:8.5,9.5",              "peewee_unit_id:2.5,6.5",              "veteran_unit_id:4.5,6.5",              "peewee_unit_id:3.5,5.5",              "bazooka_unit_id:8.5,8.5",              "zeus_unit_id:7.5,8.5"          ],          [              "tempest_unit_id:4.5,9.5",              "veteran_unit_id:2.5,7.5",              "zeus_unit_id:7.5,9.5",              "veteran_unit_id:4.5,7.5",              "veteran_unit_id:3.5,7.5",              "veteran_unit_id:3.5,6.5",              "aps_unit_id:8.5,9.5",              "peewee_unit_id:2.5,6.5",              "veteran_unit_id:4.5,6.5",              "peewee_unit_id:3.5,5.5",              "bazooka_unit_id:8.5,8.5",              "zeus_unit_id:7.5,8.5",              "millennium_unit_id:6.5,7",              "bazooka_unit_id:7.5,7.5"          ],          [              "leviathan_unit_id:4.5,9.5",              "veteran_unit_id:2.5,7.5",              "zeus_unit_id:7.5,9.5",              "veteran_unit_id:4.5,7.5",              "veteran_unit_id:3.5,7.5",              "veteran_unit_id:3.5,6.5",              "aps_unit_id:8.5,9.5",              "peewee_unit_id:2.5,6.5",              "veteran_unit_id:4.5,6.5",              "peewee_unit_id:3.5,5.5",              "bazooka_unit_id:8.5,8.5",              "zeus_unit_id:7.5,8.5",              "millennium_unit_id:6.5,7",              "bazooka_unit_id:7.5,7.5"          ],          [              "leviathan_unit_id:4.5,9.5",              "veteran_unit_id:2.5,7.5",              "zeus_unit_id:7.5,9.5",              "veteran_unit_id:4.5,7.5",              "veteran_unit_id:3.5,7.5",              "veteran_unit_id:3.5,6.5",              "aps_unit_id:8.5,9.5",              "peewee_unit_id:2.5,6.5",              "veteran_unit_id:4.5,6.5",              "peewee_unit_id:3.5,5.5",              "bazooka_unit_id:8.5,8.5",              "zeus_unit_id:7.5,8.5",              "doomsday_machine_unit_id:6.5,7",              "bazooka_unit_id:7.5,7.5"          ],          [              "leviathan_unit_id:4.5,9.5",              "veteran_unit_id:2.5,7.5",              "zeus_unit_id:7.5,9.5",              "veteran_unit_id:4.5,7.5",              "veteran_unit_id:3.5,7.5",              "veteran_unit_id:3.5,6.5",              "mps_unit_id:8.5,9.5",              "peewee_unit_id:2.5,6.5",              "veteran_unit_id:4.5,6.5",              "peewee_unit_id:3.5,5.5",              "bazooka_unit_id:8.5,8.5",              "zeus_unit_id:7.5,8.5",              "doomsday_machine_unit_id:6.5,7",              "bazooka_unit_id:7.5,7.5"          ],          [              "leviathan_unit_id:4.5,9.5",              "veteran_unit_id:2.5,7.5",              "zeus_unit_id:7.5,9.5",              "veteran_unit_id:4.5,7.5",              "veteran_unit_id:3.5,7.5",              "veteran_unit_id:3.5,6.5",              "mps_unit_id:8.5,9.5",              "veteran_unit_id:2.5,6.5",              "veteran_unit_id:4.5,6.5",              "peewee_unit_id:3.5,5.5",              "pyro_unit_id:8.5,8.5",              "zeus_unit_id:7.5,8.5",              "doomsday_machine_unit_id:6.5,7",              "zeus_unit_id:7.5,7.5",              "bazooka_unit_id:8.5,7.5"          ],          [              "leviathan_unit_id:4.5,9.5",              "veteran_unit_id:2.5,7.5",              "zeus_unit_id:7.5,9.5",              "veteran_unit_id:4.5,7.5",              "veteran_unit_id:3.5,7.5",              "veteran_unit_id:3.5,6.5",              "mps_unit_id:8.5,9.5",              "veteran_unit_id:2.5,6.5",              "veteran_unit_id:4.5,6.5",              "pyro_unit_id:8.5,8.5",              "zeus_unit_id:7.5,8.5",              "doomsday_machine_unit_id:6.5,7",              "zeus_unit_id:7.5,7.5",              "bazooka_unit_id:8.5,7.5",              "leviathan_unit_id:2.5,9.5"          ]      ],      "leak_value": 181,      "leaks_caught_value": 201,      "left_at_seconds": -1  }';
    meinString1 = '{      "EventName": "game_balance_player_row",      "EventNamespace": "title.9092",      "EntityType": "title",      "Source": "9092",      "EventId": "87aeebeef2164f73873eb8d58ec6a9b4",      "EntityId": "9092",      "SourceType": "GameServer",      "Timestamp": "2018-04-24T14:50:10.036Z",      "History": null,      "CustomTags": null,      "Reserved": null,      "date": "2018.04.24.14:50",      "version": "v2.20a1",      "game_id": "18144814495749900068",      "queue_type": "Casual",      "wave": 17,      "time": 1611,      "player_id": "301990B414882B0F",      "player_number": 1,      "player_name": "Schniedelklaus",      "legion": "Mastermind",      "fighters": "Fire Elemental,Lord Of Death,Pyro,Lord Of Death,Golem,Millennium,Rogue Wave,Fire Elemental,Zeus,Golem,Green Devil,Zeus,Fire Elemental,Rogue Wave,Gargoyle,Gargoyle,Green Devil,Zeus,Golem",      "mercenaries": "Snail,Snail,Fiend,Dragon Turtle,Fiend,Dragon Turtle,Dragon Turtle,Lizard,Lizard,Lizard,Lizard,Dragon Turtle,Dino,Safety Mole,Pack Leader,Hermit,Dino,Hermit,Pack Leader,Snail,Dragon Turtle,Hermit,Drake,Safety Mole,Pack Leader",      "workers": 30,      "income": 507,      "value": 4210,      "cross": 0,      "game_result": "won",      "stayed_till_end": true,      "player_count": 4,      "human_count": 4,      "overallElo": 1276,      "gameElo": 1204,      "spell": "Hero",      "partySize": 1,      "net_worth_per_wave": [          428,          521,          626,          767,          914,          1085,          1280,          1505,          1742,          2051,          2426,          2794,          3267,          3777,          4398,          5287      ],      "workers_per_wave": [          4,          4,          4,          5,          7,          9,          11,          12,          12,          14,          16,          17,          19,          20,          20,          30      ],      "mercenaries_sent_per_wave": [          [],          [              "Snail"          ],          [              "Snail"          ],          [              "Fiend"          ],          [],          [              "Dragon Turtle"          ],          [              "Dragon Turtle"          ],          [              "Fiend",              "Dragon Turtle"          ],          [              "Lizard"          ],          [              "Lizard",              "Lizard"          ],          [              "Lizard",              "Dino"          ],          [              "Dragon Turtle"          ],          [              "Pack Leader",              "Safety Mole"          ],          [              "Hermit"          ],          [              "Pack Leader",              "Hermit"          ],          [              "Dino",              "Drake"          ]      ],      "mercenaries_received_per_wave": [          [              "Snail"          ],          [],          [],          [              "Snail",              "Fiend"          ],          [              "Snail",              "Snail"          ],          [              "Snail",              "Snail"          ],          [              "Lizard"          ],          [],          [],          [              "Snail",              "Snail",              "Brute"          ],          [              "Fiend",              "Fiend"          ],          [              "Brute",              "Dragon Turtle"          ],          [              "Safety Mole"          ],          [              "Dragon Turtle",              "Dragon Turtle"          ],          [              "Snail",              "Safety Mole"          ],          [              "Brute"          ]      ],      "leaks_per_wave": [          [],          [],          [],          [],          [],          [],          [],          [],          [],          [              "Granddaddy"          ],          [],          [              "Mantis",              "Mantis",              "Mantis"          ],          [],          [],          [],          []      ],      "build_per_wave": [          [              "mudman_unit_id:4.5,5.5"          ],          [              "mudman_unit_id:4.5,5.5",              "bazooka_unit_id:4.5,2.5"          ],          [              "mudman_unit_id:4.5,5.5",              "bazooka_unit_id:4.5,2.5",              "gargoyle_unit_id:3.5,5",              "gargoyle_unit_id:5.5,5",              "gargoyle_unit_id:6.5,5"          ],          [              "mudman_unit_id:4.5,5.5",              "bazooka_unit_id:4.5,2.5",              "gargoyle_unit_id:3.5,5",              "gargoyle_unit_id:5.5,5",              "gargoyle_unit_id:6.5,5",              "aqua_spirit_unit_id:3.5,3.5",              "aqua_spirit_unit_id:4.5,3.5"          ],          [              "mudman_unit_id:4.5,5.5",              "bazooka_unit_id:4.5,2.5",              "gargoyle_unit_id:3.5,5",              "gargoyle_unit_id:5.5,5",              "gargoyle_unit_id:6.5,5",              "aqua_spirit_unit_id:3.5,3.5",              "aqua_spirit_unit_id:4.5,3.5",              "bazooka_unit_id:3.5,2.5"          ],          [              "mudman_unit_id:4.5,5.5",              "bazooka_unit_id:4.5,2.5",              "gargoyle_unit_id:3.5,5",              "gargoyle_unit_id:5.5,5",              "gargoyle_unit_id:6.5,5",              "aqua_spirit_unit_id:3.5,3.5",              "aqua_spirit_unit_id:4.5,3.5",              "bazooka_unit_id:3.5,2.5",              "bazooka_unit_id:5.5,2.5"          ],          [              "mudman_unit_id:4.5,5.5",              "bazooka_unit_id:4.5,2.5",              "gargoyle_unit_id:3.5,5",              "gargoyle_unit_id:5.5,5",              "gargoyle_unit_id:6.5,5",              "aqua_spirit_unit_id:3.5,3.5",              "fire_elemental_unit_id:4.5,3.5",              "bazooka_unit_id:3.5,2.5",              "bazooka_unit_id:5.5,2.5"          ],          [              "mudman_unit_id:4.5,5.5",              "bazooka_unit_id:4.5,2.5",              "gargoyle_unit_id:3.5,5",              "gargoyle_unit_id:5.5,5",              "gargoyle_unit_id:6.5,5",              "rogue_wave_unit_id:3.5,3.5",              "fire_elemental_unit_id:4.5,3.5",              "bazooka_unit_id:3.5,2.5",              "bazooka_unit_id:5.5,2.5"          ],          [              "mudman_unit_id:4.5,5.5",              "zeus_unit_id:4.5,2.5",              "gargoyle_unit_id:3.5,5",              "gargoyle_unit_id:5.5,5",              "gargoyle_unit_id:6.5,5",              "rogue_wave_unit_id:3.5,3.5",              "fire_elemental_unit_id:4.5,3.5",              "bazooka_unit_id:3.5,2.5",              "bazooka_unit_id:5.5,2.5",              "gargoyle_unit_id:2.5,5"          ],          [              "mudman_unit_id:4.5,5.5",              "zeus_unit_id:4.5,2.5",              "gargoyle_unit_id:3.5,5",              "gargoyle_unit_id:5.5,5",              "gargoyle_unit_id:6.5,5",              "rogue_wave_unit_id:3.5,3.5",              "fire_elemental_unit_id:4.5,3.5",              "zeus_unit_id:3.5,2.5",              "gargoyle_unit_id:2.5,5",              "mudman_unit_id:3.5,6"          ],          [              "mudman_unit_id:4.5,5.5",              "zeus_unit_id:4.5,2.5",              "green_devil_unit_id:3.5,5",              "gargoyle_unit_id:5.5,5",              "gargoyle_unit_id:6.5,5",              "rogue_wave_unit_id:3.5,3.5",              "fire_elemental_unit_id:4.5,3.5",              "zeus_unit_id:3.5,2.5",              "green_devil_unit_id:2.5,5",              "mudman_unit_id:3.5,6",              "bazooka_unit_id:2.5,2.5"          ],          [              "mudman_unit_id:4.5,5.5",              "zeus_unit_id:4.5,2.5",              "green_devil_unit_id:3.5,5",              "gargoyle_unit_id:5.5,5",              "gargoyle_unit_id:6.5,5",              "rogue_wave_unit_id:3.5,3.5",              "fire_elemental_unit_id:4.5,3.5",              "zeus_unit_id:3.5,2.5",              "green_devil_unit_id:2.5,5",              "mudman_unit_id:3.5,6",              "bazooka_unit_id:2.5,2.5",              "fire_elemental_unit_id:2.5,3.5",              "aqua_spirit_unit_id:5.5,3.5"          ],          [              "mudman_unit_id:4.5,5.5",              "zeus_unit_id:4.5,2.5",              "green_devil_unit_id:3.5,5",              "gargoyle_unit_id:5.5,5",              "gargoyle_unit_id:6.5,5",              "rogue_wave_unit_id:3.5,3.5",              "fire_elemental_unit_id:4.5,3.5",              "zeus_unit_id:3.5,2.5",              "green_devil_unit_id:2.5,5",              "golem_unit_id:3.5,6",              "zeus_unit_id:2.5,2.5",              "fire_elemental_unit_id:2.5,3.5",              "aqua_spirit_unit_id:5.5,3.5"          ],          [              "mudman_unit_id:4.5,5.5",              "zeus_unit_id:4.5,2.5",              "green_devil_unit_id:3.5,5",              "gargoyle_unit_id:5.5,5",              "gargoyle_unit_id:6.5,5",              "rogue_wave_unit_id:3.5,3.5",              "fire_elemental_unit_id:4.5,3.5",              "zeus_unit_id:3.5,2.5",              "green_devil_unit_id:2.5,5",              "golem_unit_id:3.5,6",              "zeus_unit_id:2.5,2.5",              "fire_elemental_unit_id:2.5,3.5",              "aqua_spirit_unit_id:5.5,3.5",              "millennium_unit_id:5.5,2.5",              "mudman_unit_id:2.5,6"          ],          [              "mudman_unit_id:4.5,5.5",              "zeus_unit_id:4.5,2.5",              "green_devil_unit_id:3.5,5",              "gargoyle_unit_id:5.5,5",              "gargoyle_unit_id:6.5,5",              "rogue_wave_unit_id:3.5,3.5",              "fire_elemental_unit_id:4.5,3.5",              "zeus_unit_id:3.5,2.5",              "green_devil_unit_id:2.5,5",              "golem_unit_id:3.5,6",              "zeus_unit_id:2.5,2.5",              "fire_elemental_unit_id:2.5,3.5",              "aqua_spirit_unit_id:5.5,3.5",              "millennium_unit_id:5.5,2.5",              "mudman_unit_id:2.5,6",              "lord_of_death_unit_id:6.5,3.5",              "pyro_unit_id:1.5,4"          ],          [              "golem_unit_id:4.5,5.5",              "zeus_unit_id:4.5,2.5",              "green_devil_unit_id:3.5,5",              "gargoyle_unit_id:5.5,5",              "gargoyle_unit_id:6.5,5",              "rogue_wave_unit_id:3.5,3.5",              "fire_elemental_unit_id:4.5,3.5",              "zeus_unit_id:3.5,2.5",              "green_devil_unit_id:2.5,5",              "golem_unit_id:3.5,6",              "zeus_unit_id:2.5,2.5",              "fire_elemental_unit_id:2.5,3.5",              "rogue_wave_unit_id:5.5,3.5",              "millennium_unit_id:5.5,2.5",              "golem_unit_id:2.5,6",              "lord_of_death_unit_id:6.5,3.5",              "pyro_unit_id:1.5,4"          ]      ],      "leak_value": 62,      "leaks_caught_value": 159,      "left_at_seconds": -1  }';
    meinString2 = '{      "EventName": "game_balance_player_row",      "EventNamespace": "title.9092",      "EntityType": "title",      "Source": "9092",      "EventId": "eba5f923e5a64314a456ff827f99353a",      "EntityId": "9092",      "SourceType": "GameServer",      "Timestamp": "2018-04-24T14:50:10.036Z",      "History": null,      "CustomTags": null,      "Reserved": null,      "date": "2018.04.24.14:50",      "version": "v2.20a1",      "game_id": "18144814495749900068",      "queue_type": "Casual",      "wave": 17,      "time": 1611,      "player_id": "7A328A61BB7EE77C",      "player_number": 5,      "player_name": "CarloBrutalo",      "legion": "Element",      "fighters": "Mudman,Fenix,Golem,Violet,Fenix,Starcaller,Golem,Atom,Fire Elemental",      "mercenaries": "Snail,Fiend,Dino,Dragon Turtle,Centaur,Brute,Kraken",      "workers": 11,      "income": 255,      "value": 3445,      "cross": 0,      "game_result": "lost",      "stayed_till_end": true,      "player_count": 4,      "human_count": 4,      "overallElo": 1200,      "gameElo": 1204,      "spell": "Hero",      "partySize": 1,      "net_worth_per_wave": [          428,          524,          620,          746,          872,          1022,          1214,          1386,          1590,          1838,          2046,          2392,          2812,          3189,          3582,          4037      ],      "workers_per_wave": [          3,          3,          3,          5,          5,          6,          6,          6,          7,          7,          8,          8,          8,          9,          9,          11      ],      "mercenaries_sent_per_wave": [          [],          [              "Snail"          ],          [],          [              "Fiend"          ],          [],          [],          [              "Dino"          ],          [              "Dragon Turtle"          ],          [],          [],          [],          [],          [              "Centaur"          ],          [],          [],          []      ],      "mercenaries_received_per_wave": [          [              "Snail"          ],          [              "Snail"          ],          [],          [              "Fiend"          ],          [],          [              "Dragon Turtle"          ],          [              "Fiend",              "Dragon Turtle"          ],          [              "Dragon Turtle"          ],          [],          [              "Lizard",              "Lizard",              "Lizard",              "Lizard"          ],          [              "Dragon Turtle",              "Dino"          ],          [],          [              "Safety Mole",              "Pack Leader"          ],          [              "Hermit"          ],          [              "Dino",              "Hermit",              "Pack Leader"          ],          []      ],      "leaks_per_wave": [          [],          [],          [],          [],          [],          [],          [],          [],          [],          [              "Lizard",              "Lizard",              "Lizard",              "Lizard",              "Granddaddy"          ],          [              "Quill Shooter",              "Quill Shooter",              "Quill Shooter",              "Quill Shooter",              "Quill Shooter"          ],          [],          [],          [],          [              "Quadrapus",              "Quadrapus",              "Quadrapus",              "Quadrapus"          ],          [              "Cardinal"          ]      ],      "build_per_wave": [          [              "aqua_spirit_unit_id:4.5,6.5",              "atom_unit_id:3.5,7.5",              "proton_unit_id:5.5,7.5"          ],          [              "aqua_spirit_unit_id:4.5,6.5",              "atom_unit_id:3.5,7.5",              "atom_unit_id:5.5,7.5"          ],          [              "aqua_spirit_unit_id:4.5,6.5",              "atom_unit_id:3.5,7.5",              "atom_unit_id:5.5,7.5",              "mudman_unit_id:4.5,9"          ],          [              "aqua_spirit_unit_id:4.5,6.5",              "atom_unit_id:3.5,7.5",              "atom_unit_id:5.5,7.5",              "mudman_unit_id:4.5,9"          ],          [              "aqua_spirit_unit_id:4.5,6.5",              "atom_unit_id:3.5,7.5",              "atom_unit_id:5.5,7.5",              "mudman_unit_id:4.5,9"          ],          [              "aqua_spirit_unit_id:4.5,6.5",              "atom_unit_id:3.5,7.5",              "atom_unit_id:5.5,7.5",              "mudman_unit_id:4.5,9",              "disciple_unit_id:3.5,6.5"          ],          [              "fire_elemental_unit_id:4.5,6.5",              "atom_unit_id:3.5,7.5",              "atom_unit_id:5.5,7.5",              "mudman_unit_id:4.5,9",              "disciple_unit_id:3.5,6.5"          ],          [              "fire_elemental_unit_id:4.5,6.5",              "atom_unit_id:3.5,7.5",              "golem_unit_id:4.5,9",              "disciple_unit_id:3.5,6.5",              "proton_unit_id:5.5,7.5"          ],          [              "fire_elemental_unit_id:4.5,6.5",              "atom_unit_id:3.5,7.5",              "golem_unit_id:4.5,9",              "disciple_unit_id:3.5,6.5",              "atom_unit_id:5.5,7.5"          ],          [              "fire_elemental_unit_id:4.5,6.5",              "atom_unit_id:3.5,7.5",              "golem_unit_id:4.5,9",              "disciple_unit_id:3.5,6.5",              "atom_unit_id:5.5,7.5",              "fire_lord_unit_id:5.5,6.5"          ],          [              "fire_elemental_unit_id:4.5,6.5",              "atom_unit_id:3.5,7.5",              "golem_unit_id:4.5,9",              "disciple_unit_id:3.5,6.5",              "atom_unit_id:5.5,7.5",              "fire_lord_unit_id:5.5,6.5",              "windhawk_unit_id:4.5,7.5"          ],          [              "fire_elemental_unit_id:4.5,6.5",              "atom_unit_id:3.5,7.5",              "golem_unit_id:4.5,9",              "starcaller_unit_id:3.5,6.5",              "atom_unit_id:5.5,7.5",              "fire_lord_unit_id:5.5,6.5",              "windhawk_unit_id:4.5,7.5"          ],          [              "fire_elemental_unit_id:4.5,6.5",              "atom_unit_id:3.5,7.5",              "golem_unit_id:4.5,9",              "starcaller_unit_id:3.5,6.5",              "atom_unit_id:5.5,7.5",              "fenix_unit_id:5.5,6.5",              "windhawk_unit_id:4.5,7.5"          ],          [              "fire_elemental_unit_id:4.5,6.5",              "atom_unit_id:3.5,7.5",              "golem_unit_id:4.5,9",              "starcaller_unit_id:3.5,6.5",              "atom_unit_id:5.5,7.5",              "fenix_unit_id:5.5,6.5",              "violet_unit_id:4.5,7.5",              "mudman_unit_id:3.5,9"          ],          [              "fire_elemental_unit_id:4.5,6.5",              "atom_unit_id:3.5,7.5",              "golem_unit_id:4.5,9",              "starcaller_unit_id:3.5,6.5",              "atom_unit_id:5.5,7.5",              "fenix_unit_id:5.5,6.5",              "violet_unit_id:4.5,7.5",              "mudman_unit_id:3.5,9",              "fire_lord_unit_id:2.5,6.5",              "mudman_unit_id:5.5,9"          ],          [              "fire_elemental_unit_id:4.5,6.5",              "atom_unit_id:3.5,7.5",              "golem_unit_id:4.5,9",              "starcaller_unit_id:3.5,6.5",              "fenix_unit_id:5.5,6.5",              "violet_unit_id:4.5,7.5",              "mudman_unit_id:3.5,9",              "fenix_unit_id:2.5,6.5",              "mudman_unit_id:5.5,9"          ]      ],      "leak_value": 491,      "leaks_caught_value": 0,      "left_at_seconds": -1  }';
    meinString3 = '{      "EventName": "game_balance_player_row",      "EventNamespace": "title.9092",      "EntityType": "title",      "Source": "9092",      "EventId": "9aa41c178d3e48e59bba28aa3663b75f",      "EntityId": "9092",      "SourceType": "GameServer",      "Timestamp": "2018-04-24T14:50:10.036Z",      "History": null,      "CustomTags": null,      "Reserved": null,      "date": "2018.04.24.14:50",      "version": "v2.20a1",      "game_id": "18144814495749900068",      "queue_type": "Casual",      "wave": 17,      "time": 1611,      "player_id": "49211971B1CF44C8",      "player_number": 2,      "player_name": "kaiN7",      "legion": "Forsaken",      "fighters": "Bone Warrior,Gargoyle,Gargoyle,Butcher,Bone Warrior,Bone Warrior,Head Chef,Fire Archer,Doppelganger,Hades,Gateguard,Harbinger,Harbinger,Fire Archer,Dark Mage,Green Devil,Fire Archer,Harbinger,Harbinger",      "mercenaries": "Dino,Snail,Snail,Snail,Brute,Lizard,Lizard,Snail,Lizard,Hermit,Fiend,Lizard,Lizard,Lizard,Dragon Turtle,Hermit,Lizard,Brute,Hermit,Snail,Dragon Turtle,Pack Leader",      "workers": 13,      "income": 316,      "value": 3700,      "cross": 0,      "game_result": "won",      "stayed_till_end": false,      "player_count": 4,      "human_count": 4,      "overallElo": 1142,      "gameElo": 1204,      "spell": "Sacrifice",      "partySize": 1,      "net_worth_per_wave": [          428,          512,          602,          710,          848,          1022,          1202,          1391,          1604,          1870,          2245,          2543,          2788,          3193,          3629,          4055      ],      "workers_per_wave": [          3,          4,          4,          4,          6,          6,          8,          8,          8,          8,          9,          11,          12,          13,          13,          13      ],      "mercenaries_sent_per_wave": [          [],          [],          [],          [],          [              "Dino",              "Snail"          ],          [              "Snail"          ],          [              "Snail"          ],          [              "Brute"          ],          [              "Lizard"          ],          [              "Lizard",              "Snail"          ],          [              "Lizard",              "Fiend"          ],          [              "Hermit",              "Lizard"          ],          [              "Lizard",              "Lizard"          ],          [              "Hermit",              "Dragon Turtle"          ],          [              "Brute",              "Hermit"          ],          [              "Lizard",              "Snail"          ]      ],      "mercenaries_received_per_wave": [          [              "Snail"          ],          [],          [],          [              "Fiend"          ],          [],          [              "Dino"          ],          [              "Dragon Turtle"          ],          [],          [],          [],          [],          [              "Centaur"          ],          [],          [],          [],          [              "Brute"          ]      ],      "leaks_per_wave": [          [],          [],          [],          [],          [],          [],          [],          [],          [],          [              "Granddaddy"          ],          [],          [              "Mantis",              "Mantis",              "Mantis",              "Mantis",              "Centaur"          ],          [              "Drill Golem",              "Drill Golem"          ],          [              "Killer Slug",              "Killer Slug",              "Killer Slug"          ],          [              "Quadrapus",              "Quadrapus",              "Quadrapus"          ],          [              "Cardinal",              "Cardinal",              "Cardinal",              "Cardinal",              "Cardinal",              "Cardinal",              "Cardinal",              "Cardinal",              "Cardinal"          ]      ],      "build_per_wave": [          [              "gateguard_unit_id:2.5,9.5",              "gateguard_unit_id:6.5,9.5"          ],          [              "gateguard_unit_id:2.5,9.5",              "gateguard_unit_id:6.5,9.5",              "bone_warrior_unit_id:4.5,9.5"          ],          [              "gateguard_unit_id:2.5,9.5",              "gateguard_unit_id:6.5,9.5",              "bone_warrior_unit_id:4.5,9.5",              "gargoyle_unit_id:3.5,8",              "gargoyle_unit_id:5.5,8"          ],          [              "gateguard_unit_id:2.5,9.5",              "gateguard_unit_id:6.5,9.5",              "fire_archer_unit_id:4.5,9.5",              "gargoyle_unit_id:3.5,8",              "gargoyle_unit_id:5.5,8",              "bone_warrior_unit_id:3.5,9.5",              "bone_warrior_unit_id:5.5,9.5"          ],          [              "gateguard_unit_id:2.5,9.5",              "gateguard_unit_id:6.5,9.5",              "fire_archer_unit_id:4.5,9.5",              "gargoyle_unit_id:3.5,8",              "gargoyle_unit_id:5.5,8",              "bone_warrior_unit_id:3.5,9.5",              "bone_warrior_unit_id:5.5,9.5",              "gateguard_unit_id:4.5,8"          ],          [              "gateguard_unit_id:2.5,9.5",              "gateguard_unit_id:6.5,9.5",              "fire_archer_unit_id:4.5,9.5",              "gargoyle_unit_id:3.5,8",              "gargoyle_unit_id:5.5,8",              "dark_mage_unit_id:3.5,9.5",              "bone_warrior_unit_id:5.5,9.5",              "gateguard_unit_id:4.5,8"          ],          [              "gateguard_unit_id:2.5,9.5",              "gateguard_unit_id:6.5,9.5",              "fire_archer_unit_id:4.5,9.5",              "gargoyle_unit_id:3.5,8",              "gargoyle_unit_id:5.5,8",              "dark_mage_unit_id:3.5,9.5",              "fire_archer_unit_id:5.5,9.5",              "gateguard_unit_id:4.5,8",              "gateguard_unit_id:2.5,8"          ],          [              "gateguard_unit_id:2.5,9.5",              "gateguard_unit_id:6.5,9.5",              "fire_archer_unit_id:4.5,9.5",              "gargoyle_unit_id:3.5,8",              "gargoyle_unit_id:5.5,8",              "dark_mage_unit_id:3.5,9.5",              "fire_archer_unit_id:5.5,9.5",              "gateguard_unit_id:4.5,8",              "gateguard_unit_id:2.5,8",              "gateguard_unit_id:6.5,8"          ],          [              "harbinger_unit_id:2.5,9.5",              "gateguard_unit_id:6.5,9.5",              "fire_archer_unit_id:4.5,9.5",              "gargoyle_unit_id:3.5,8",              "gargoyle_unit_id:5.5,8",              "dark_mage_unit_id:3.5,9.5",              "fire_archer_unit_id:5.5,9.5",              "gateguard_unit_id:4.5,8",              "gateguard_unit_id:2.5,8",              "gateguard_unit_id:6.5,8"          ],          [              "harbinger_unit_id:2.5,9.5",              "harbinger_unit_id:6.5,9.5",              "fire_archer_unit_id:4.5,9.5",              "gargoyle_unit_id:3.5,8",              "gargoyle_unit_id:5.5,8",              "dark_mage_unit_id:3.5,9.5",              "fire_archer_unit_id:5.5,9.5",              "gateguard_unit_id:4.5,8",              "gateguard_unit_id:2.5,8",              "gateguard_unit_id:6.5,8"          ],          [              "harbinger_unit_id:2.5,9.5",              "harbinger_unit_id:6.5,9.5",              "fire_archer_unit_id:4.5,9.5",              "green_devil_unit_id:3.5,8",              "dark_mage_unit_id:3.5,9.5",              "fire_archer_unit_id:5.5,9.5",              "gateguard_unit_id:4.5,8",              "gateguard_unit_id:2.5,8",              "gateguard_unit_id:6.5,8",              "lord_of_death_unit_id:4.5,7"          ],          [              "harbinger_unit_id:2.5,9.5",              "harbinger_unit_id:6.5,9.5",              "fire_archer_unit_id:4.5,9.5",              "green_devil_unit_id:3.5,8",              "dark_mage_unit_id:3.5,9.5",              "fire_archer_unit_id:5.5,9.5",              "gateguard_unit_id:4.5,8",              "gateguard_unit_id:2.5,8",              "gateguard_unit_id:6.5,8",              "lord_of_death_unit_id:4.5,7",              "nightmare_unit_id:5.5,8"          ],          [              "harbinger_unit_id:2.5,9.5",              "harbinger_unit_id:6.5,9.5",              "fire_archer_unit_id:4.5,9.5",              "green_devil_unit_id:3.5,8",              "dark_mage_unit_id:3.5,9.5",              "fire_archer_unit_id:5.5,9.5",              "gateguard_unit_id:4.5,8",              "gateguard_unit_id:2.5,8",              "gateguard_unit_id:6.5,8",              "lord_of_death_unit_id:4.5,7",              "doppelganger_unit_id:5.5,8"          ],          [              "harbinger_unit_id:2.5,9.5",              "harbinger_unit_id:6.5,9.5",              "fire_archer_unit_id:4.5,9.5",              "green_devil_unit_id:3.5,8",              "dark_mage_unit_id:3.5,9.5",              "fire_archer_unit_id:5.5,9.5",              "gateguard_unit_id:4.5,8",              "harbinger_unit_id:2.5,8",              "gateguard_unit_id:6.5,8",              "lord_of_death_unit_id:4.5,7",              "doppelganger_unit_id:5.5,8",              "fire_archer_unit_id:7.5,9"          ],          [              "harbinger_unit_id:2.5,9.5",              "harbinger_unit_id:6.5,9.5",              "fire_archer_unit_id:4.5,9.5",              "green_devil_unit_id:3.5,8",              "dark_mage_unit_id:3.5,9.5",              "fire_archer_unit_id:5.5,9.5",              "harbinger_unit_id:4.5,8",              "harbinger_unit_id:2.5,8",              "gateguard_unit_id:6.5,8",              "lord_of_death_unit_id:4.5,7",              "doppelganger_unit_id:5.5,8",              "fire_archer_unit_id:7.5,9",              "butcher_unit_id:4.5,5.5",              "bone_warrior_unit_id:4.5,4.5",              "bone_warrior_unit_id:3.5,4.5"          ],          [              "harbinger_unit_id:2.5,9.5",              "harbinger_unit_id:6.5,9.5",              "fire_archer_unit_id:4.5,9.5",              "green_devil_unit_id:3.5,8",              "dark_mage_unit_id:3.5,9.5",              "fire_archer_unit_id:5.5,9.5",              "harbinger_unit_id:4.5,8",              "harbinger_unit_id:2.5,8",              "gateguard_unit_id:6.5,8",              "lord_of_death_unit_id:4.5,7",              "doppelganger_unit_id:5.5,8",              "fire_archer_unit_id:7.5,9",              "head_chef_unit_id:4.5,5.5",              "bone_warrior_unit_id:4.5,4.5",              "bone_warrior_unit_id:3.5,4.5",              "butcher_unit_id:5.5,4.5",              "gargoyle_unit_id:6.5,4.5"          ]      ],      "leak_value": 613,      "leaks_caught_value": 0,      "left_at_seconds": 1278.8613252  }';
    gameEvent = [JSON.parse(meinString), JSON.parse(meinString1), JSON.parse(meinString2), JSON.parse(meinString3)];
}

function addPicture(y, x, unit, player)
{
    //überprüfe welche unit auf feld ist
    var neuesX = x*2;
    var neuesY = y*2;
    //icons
    switch(unit)
    {
        //element
        case "proton":
            var url="/img/icons/Proton.png";
            var unit_type="Proton";
            break;
        case "atom":
            var url="/img/icons/Atom.png";
            var unit_type="Atom";
            break;
        case "aqua_spirit":
            var url="/img/icons/AquaSpirit.png";
            var unit_type="AquaSpirit";
            break;
        case "fire_elemental":
            var url="/img/icons/FireElemental.png";
            var unit_type="FireElemental";
            break;
        case "rogue_wave":
            var url="/img/icons/RogueWave.png";
            var unit_type="RogueWave";
            break;
        case "windhawk":
            var url="/img/icons/Windhawk.png";
            var unit_type="Windhawk";
            break;
        case "violet":
            var url="/img/icons/Violet.png";
            var unit_type="Violet";
            break;
        case "mudman":
            var url="/img/icons/Mudman.png";
            var unit_type="Mudman";
            break;
        case "golem":
            var url="/img/icons/Golem.png";
            var unit_type="Golem";
            break;
        case "disciple":
            var url="/img/icons/Disciple.png";
            var unit_type="Disciple";
            break;
        case "starcaller":
            var url="/img/icons/Starcaller.png";
            var unit_type="Starcaller";
            break;
        case "fire_lord":
            var url="/img/icons/FireLord.png";
            var unit_type="FireLord";
            break;
        case "fenix":
            var url="/img/icons/Fenix.png";
            var unit_type="Fenix";
            break;
        //grove
        case "buzz":
            var url="/img/icons/Buzz.png";
            var unit_type="Buzz";
            break;
        case "consort":
            var url="/img/icons/Consort.png";
            var unit_type="Consort";
            break;
        case "ranger":
            var url="/img/icons/Ranger.png";
            var unit_type="Ranger";
            break;
        case "daphne":
            var url="/img/icons/Daphne.png";
            var unit_type="Daphne";
            break;
        case "whileshroom":
            var url="/img/icons/Wileshroom.png";
            var unit_type="Wileshroom";
            break;
        case "canopie":
            var url="/img/icons/Canopie.png";
            var unit_type="Canopie";
            break;
        case "honeyflower":
            var url="/img/icons/Honeyflower.png";
            var unit_type="Honeyflower";
            break;
        case "deathcap":
            var url="/img/icons/Deathcap.png";
            var unit_type="Deathcap";
            break;
        case "antler":
            var url="/img/icons/Antler.png";
            var unit_type="Antler";
            break;
        case "whitemane":
            var url="/img/icons/Whitemane.png";
            var unit_type="Whitemane";
            break;
        case "banana_bunk":
            var url="/img/icons/BananaBunk.png";
            var unit_type="BananaBunk";
            break;
        case "banana_haven":
            var url="/img/icons/BananaHaven.png";
            var unit_type="BananaHaven";
            break;
        //forsaken
        case "bone_warrior":
            var url="/img/icons/BoneWarrior.png";
            var unit_type="BoneWarriror";
            break;
        case "bone_crusher":
            var url="/img/icons/BoneCrusher.png";
            var unit_type="BoneCrusher";
            break;
        case "dark_mage":
            var url="/img/icons/DarkMage.png";
            var unit_type="DarkMage";
            break;
        case "fire_archer":
            var url="/img/icons/FireArcher.png";
            var unit_type="FireArcher";
            break;
        case "gargoyle":
            var url="/img/icons/Gargoyle.png";
            var unit_type="Gargoyle";
            break;
        case "green_devil":
            var url="/img/icons/GreenDevil.png";
            var unit_type="GreenDevil";
            break;
        case "gateguard":
            var url="/img/icons/Gateguard.png";
            var unit_type="Gateguard";
            break;
        case "harbinger":
            var url="/img/icons/Harbinger.png";
            var unit_type="Harbinger";
            break;
        case "butcher":
            var url="/img/icons/Butcher.png";
            var unit_type="Butcher";
            break;
        case "head_chef":
            var url="/img/icons/HeadChef.png";
            var unit_type="Headchef";
            break;
        case "nightmare":
            var url="/img/icons/Nightmare.png";
            var unit_type="Nightmare";
            break;
        case "doppelganger":
            var url="/img/icons/Doppelganger.png";
            var unit_type="Doppelganger";
            break;
        case "lord_of_death":
            var url="/img/icons/LordOfDeath.png";
            var unit_type="LordOfDeath";
            break;
        case "hades":
            var url="/img/icons/Hades.png";
            var unit_type="Hades";
            break;
        //mech
        case "peewee":
            var url="/img/icons/Peewee.png";
            var unit_type="Peewee";
            break;
        case "veteran":
            var url="/img/icons/Veteran.png";
            var unit_type="Veteran";
            break;
        case "bazooka":
            var url="/img/icons/Bazooka.png";
            var unit_type="Bazooka";
            break;
        case "zeus":
            var url="/img/icons/Zeus.png";
            var unit_type="Zeus";
            break;
        case "pyro":
            var url="/img/icons/Pyro.png";
            var unit_type="Pyro";
            break;
        case "tempest":
            var url="/img/icons/Tempest.png";
            var unit_type="Tempest";
            break;
        case "leviathan":
            var url="/img/icons/Leviathan.png";
            var unit_type="Leviathan";
            break;
        case "aps":
            var url="/img/icons/APS.png";
            var unit_type="APS";
            break;
        case "mps":
            var url="/img/icons/MPS.png";
            var unit_type="MPS";
            break;
        case "berserker":
            var url="/img/icons/Berserker.png";
            var unit_type="Berserker";
            break;
        case "fatalizer":
            var url="/img/icons/Fatalizer.png";
            var unit_type="Fatalizer";
            break;
        case "millennium":
            var url="/img/icons/Millennium.png";
            var unit_type="Millennium";
            break;
        case "doomsday_machine":
            var url="/img/icons/DoomsdayMachine.png";
            var unit_type="DoomsdayMachine";
            break;
        case "sea_serpent":
            var url="/img/icons/SeaSerpent.png";
            var unit_type="SeaSerpant";
            break;
        case "deepcoiler":
            var url="/img/icons/DeepCoiler.png";
            var unit_type="DeepCoilwér";
            break;
        default:
            var url="";
            var unit_type="empty";
            console.log(unit);
            break;

    }
    //canvas einfügen
    var zielspalte = document.getElementById("p"+player+"_"+neuesX+"."+neuesY);
    zielspalte.style="border: 0px;";
    meinCanvas1 = document.createElement("canvas");
    meinCanvas1.setAttribute("id", unit_type+" 1");
    meinCanvas1.setAttribute("class", "kleinerCanvas");
    var el1 = zielspalte.appendChild(meinCanvas1);
    //var el1 = document.getElementById(unit_type+ " 1");
    var zielspalte = document.getElementById("p"+player+"_"+(neuesX+1)+"."+neuesY);
    zielspalte.style="border: 0px;";
    meinCanvas2 = document.createElement("canvas");
    meinCanvas2.setAttribute("id", unit_type+" 2");
    meinCanvas2.setAttribute("class", "kleinerCanvas");
    var el2 = zielspalte.appendChild(meinCanvas2);
    var zielspalte = document.getElementById("p"+player+"_"+neuesX+"."+(neuesY+1));
    zielspalte.style="border: 0px;";
    meinCanvas3 = document.createElement("canvas");
    meinCanvas3.setAttribute("id", unit_type+" 3");
    meinCanvas3.setAttribute("class", "kleinerCanvas");
    var el3 = zielspalte.appendChild(meinCanvas3);
    var zielspalte = document.getElementById("p"+player+"_"+(neuesX+1)+"."+(neuesY+1));
    zielspalte.style="border: 0px;";
    meinCanvas4 = document.createElement("canvas");
    meinCanvas4.setAttribute("id", unit_type+" 4");
    meinCanvas4.setAttribute("class", "kleinerCanvas");
    var el4 = zielspalte.appendChild(meinCanvas4);

    // bild in canvas (4 teile)
    var meinBild1 = document.createElement("img");
    meinBild1.src=url;
    meinBild1.onload = function()
    {
        //1
        var ctx=el1.getContext('2d');
        ctx.drawImage(meinBild1, 0, 0, 32, 32, 0, 0, 300, 150); 
        //2
        ctx=el2.getContext('2d');
        ctx.drawImage(meinBild1, 0, 32, 32, 32, 0, 0, 300, 150); 
        //3
        ctx=el3.getContext('2d');
        ctx.drawImage(meinBild1,32, 0, 32, 32, 0, 0, 300, 150); 
        //4
        ctx=el4.getContext('2d');
        ctx.drawImage(meinBild1, 32, 32, 32, 32, 0, 0, 300, 150); 
    }
            
            


}

//names, net worth and workers
function fillNames()
{
    for(var i=1;i<5;i++)
    {
        var wave = parseInt(document.getElementById("slider").value);
        var worker = gameEvent[i-1].workers_per_wave[wave-1];
        var networth = gameEvent[i-1].net_worth_per_wave[wave-1];
        document.getElementById("p"+i+"_name").innerText = gameEvent[i-1].player_name;
        document.getElementById("networth"+i).innerText = "("+networth+"/";
        document.getElementById("worker"+i).innerText = worker+")";
        //document.getElementById("p"+i+"_name").outerHTML = "<div class='player_name' id='p"+i+"_name'> "+gameEvent[i-1].player_name+" (<div title='Net Worth' style='display:inline;'>"+networth+"</div>/<div title='Worker' style='display:inline;'>"+worker+"</div>)</div>";
        
        
    }

}

function getPlayerBuild(player)
{
    var wave = parseInt(document.getElementById("slider").value);
    meinBuild = gameEvent[player-1].build_per_wave[wave-1];
    counter = 0;
    meinBuild.forEach(element => {
        counter++;
        var meinX = element.substring(element.indexOf(":")+1, element.indexOf(","));
        var meinY = element.substring(element.indexOf(",")+1);
        addPicture(meinX, meinY, element.substring(0, element.indexOf("_unit")), player);
        
    });
}

function getPlayerLeaks(player)
{
    var wave = parseInt(document.getElementById("slider").value);
    var meineLeaks = gameEvent[player-1].leaks_per_wave[wave-1];
    if(meineLeaks.length>0)
    {
        meineLeaks.forEach(element => {
            addLeak(element, player);
        });
    }
    
}

function getPlayerSends(player)
{
    var wave = parseInt(document.getElementById("slider").value);
    var meineSends = gameEvent[player-1].mercenaries_sent_per_wave[wave-1];
    if(meineSends.length>0)
    {
        meineSends.forEach(element => {
            addSend(element, player);
        });
    }
    
}

function addSend(element, player)
{
    while (element.includes(" ") || element.includes("%20")) {
        element = element.replace(" ", "");
        element = element.replace("%20", "");
    }
    document.getElementById("sends_player"+player).innerHTML+= "<img src='/img/icons/"+element+".png' class='leakpic' title='"+element+"'>";
}

function addLeak(element, player)
{
    while (element.includes(" ") || element.includes("%20")) {
        element = element.replace(" ", "");
        element = element.replace("%20", "");
    }
    document.getElementById("leaks_player"+player).innerHTML+= "<img src='/img/icons/"+element+".png' class='leakpic' title='"+element+"'>";
}

function clearPictures()
{
    for(var h=1;h<5;h++)
    {
        for(var i=0;i<28;i++)
        {
            for(var e=0;e<19;e++)
            {
                document.getElementById("p"+h+"_"+i+"."+e).innerHTML="";
                document.getElementById("p"+h+"_"+i+"."+e).style="border: 1px solid black; background-color: white;";
                
            }
            
        }
    }
    
}

document.onkeydown = function(event) {
        if(event.keyCode == 107) 
        {
            if(document.getElementById("slider").value < gameEvent[0].wave-1)
            {
                var waveValue = parseInt(document.getElementById("slider").value)+1;
                document.getElementById("slider").value = waveValue;
            }
            else if(document.getElementById("slider").value==gameEvent[0].wave-1)
            {
                document.getElementById("slider").value="1";
            }
            waveAnzeigen();
        }
        if(event.keyCode == 109) 
        {
            if(document.getElementById("slider").value>1)
            {
                document.getElementById("slider").value -= 1;
            }

            else if(document.getElementById("slider").value=="1")
            {
                document.getElementById("slider").value=gameEvent[0].wave-1;
            }
            waveAnzeigen();
        }
    
    
  }
document.onmousewheel = function displaywheel(e){
    var evt=window.event || e //equalize event object
    var delta=evt.detail? evt.detail*(-120) : evt.wheelDelta //check for detail first so Opera uses that instead of wheelDelta
    if(delta>0)
    {
        if(document.getElementById("slider").value < gameEvent[0].wave-1)
            {
                var waveValue = parseInt(document.getElementById("slider").value)+1;
                document.getElementById("slider").value = waveValue;
            }
            else if(document.getElementById("slider").value==gameEvent[0].wave-1)
            {
                document.getElementById("slider").value="1";
            }
            waveAnzeigen();
    }
    else
    {
        if(document.getElementById("slider").value>1)
            {
                document.getElementById("slider").value -= 1;
            }

            else if(document.getElementById("slider").value=="1")
            {
                document.getElementById("slider").value=gameEvent[0].wave-1;
            }
            waveAnzeigen();
    }
}
 
document.getElementById("slider").onchange = function(){
    if(document.getElementById("slider").value>gameEvent[0].wave-1) 
    {
        document.getElementById("slider").value = gameEvent[0].wave-1;
        waveAnzeigen();
    }
}

document.body.onload=function(){
    if(!firsttime)
    {
        getGameDetails();
        fillNames();
        waveAnzeigen();
    }
        
}


function clearLeaks(player)
{

        document.getElementById("leaks_player"+player).innerHTML ="";
    
    
}

function clearSends()
{
    for(var i=1;i<5;i++)
    {
        document.getElementById("sends_player"+i).innerHTML ="";
    }
}
function waveAnzeigen()
{

    var welle = document.getElementById("slider").value;
    var maxwave=  gameEvent[0].wave - 1;
    document.getElementById("wave").textContent = "Wave: "+ welle.toString() +"/"+maxwave; 
    var icon_legionspell =[];
    if(welle>10)
    {
        for(var i=0;i<4;i++)
        {
            console.log(gameEvent[i].spell);
            icon_legionspell[i] = gameEvent[i].spell;
            while (icon_legionspell[i].includes(" ") || icon_legionspell[i].includes("%20")) {
                icon_legionspell[i] = icon_legionspell[i].replace(" ", "");
                icon_legionspell[i] = icon_legionspell[i].replace("%20", "");
            }
            document.getElementById("legionspell"+(i)).innerHTML="<img src='/img/icons/"+ icon_legionspell[i]+".png' height='20px' width=20px'>";
        }
    } 
    else
    {
        for(var i=0;i<4;i++)
        {
            document.getElementById("legionspell"+(i)).innerHTML="";
        }
    }
    clearPictures();
    clearSends();
    for(var i=1;i<5;i++)
    {
        clearLeaks(i);
        getPlayerBuild(i);
        getPlayerLeaks(i);
        getPlayerSends(i);
    }
    fillNames();
    
}

