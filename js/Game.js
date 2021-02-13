class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    
    database.ref('/').update({
      
      gameState: state

    });

  }

  async start(){
    
    if(gameState === 0){
      
      player = new Player();
      var playerCountRef = await database.ref("playerCount").once("value");

      if(playerCountRef.exists()) {

        playerCount = playerCountRef.val();

        player.getCount();

      }

      form = new Form()
      form.display();

    }

  }

  play() {

    form.hide();

    textFont("Typograph Pro");
    textSize(30);
    text("GAME HAS STARTED", 100, 100);

    Player.getPlayerInfo();

    if(allPlayers !== undefined) {

      var displayPosition = 130;
      displayPosition += 20;

      if(plr === "player" + player.index) {

        fill("red");

      }
      else {

        fill("black");

      }

      text(allPlayers[plr].name + " : " + allPlayers[plr].distance, 120, displayPosition);

    }

    if(keyIsDown("UP_ARROW") && playerIndex !== null) {

      player.distance += 50;
      player.update();

    }

  }

}
