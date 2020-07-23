function convertGameToNew(input){
    console.log("Game converter started.");
    console.log("Input:");
    console.log(input);
    //single/multiple games
    var output = [];
    if(input.length > 1){
        console.log("Multiple games detected.");
        input.forEach(element => {
            if(element.gameid){
                console.log("Converting game "+element.gameid+" into new format.");
                element.id = element.gameid;
                delete element.gameid;
                element.endingWave = element.endingwave;
                delete element.endingwave;
                element.gameLength = element.gamelength;
                delete element.gamelength;
                element.queueType = element.queuetype;
                delete element.queuetype;
                element.gameElo = element.gameelo;
                delete element.gameelo;
                element.playerCount = element.playercount;
                delete element.playercount;
                element.humanCount = element.humancount;
                delete element.humancount;
                element.leftKingPercentHP = element.leftkingpercenthp;
                delete element.leftkingpercenthp;
                element.rightKingPercentHP = element.rightkingpercenthp;
                delete element.rightkingpercenthp;

                for(var i = 0; i < element.playerCount;i++){
                    element.gameDetails[i].playerProfile = {"name": element.gameDetails[i].playername};
                    delete element.gameDetails[i].playername;
                    element.gameDetails[i].isCross = element.gameDetails[i].iscross;
                    delete element.gameDetails[i].iscross;
                    element.gameDetails[i].gameResult = element.gameDetails[i].gameresult;
                    delete element.gameDetails[i].gameresult;
                }

                
            }
            else if(element.id){
                console.log("No convertig needed, using new shema.");
            }
            output.push(element);
        });
    }
    else{
        console.log("Single game detected.");
        if(input.ts > "2020-01-05"){
            console.log("Converting game "+input.id+" into new format.")
        }
        else{
            console.log("No convertig needed, using new shema.");
        }
    }
    return output;
}

function convertGameToOld(input){
    return output;
}