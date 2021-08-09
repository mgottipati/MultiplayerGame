class Player{
    constructor(){
        this.name = "";
        this.id = null;
    }

    // () => {} 
    getPlayerCount(){
        database.ref("playerCount").once("value").then((data)=>{
            playerCount= data.val()
        })
    }

    updatePlayerCount(pc){
        database.ref("/").update({
            playerCount : pc
        })
    }

    updatePlayer(){
        database.ref("players/player"+playerCount).update({
            name : player.name,
            x: 100*player.id + 300,
            y: 600,
            score: 0
        })
    }

    getPlayers(){
        database.ref("players").once("value").then((data)=>{players = data.val()})
    }

    deletePlayers(){
        database.ref("/").update({
            players : null
        })
    }
}
