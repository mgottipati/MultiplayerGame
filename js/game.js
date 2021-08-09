class Game{
    getgameState(){
        database.ref("gameState").once("value").then((data)=>{gameState = data.val()})
    }

    updategameState(gs){
        database.ref("/").update({
            gameState :gs
        })
    }

    play(){
        form.hide()
        image(bg,0,-height*5,displayWidth-20,height*6)
        drawSprites();
        player.getPlayers() //players = undefined
        if(players){
            var index=0;
           for(var p in players ){
               var data =players[p]
                if(index===0){
                    car1.x=data.x;
                    car1.y = data.y;
                }
                if(index===1) {
                    car2.x=data.x;
                    car2.y=data.y;
                }
                if(index===2) {
                    car3.x=data.x;
                    car3.y=data.y;
                }
                if(index===3) {
                    car4.x=data.x;
                    car4.y=data.y;
                }
                //if index matches current tab player
                if(index+1===player.id){
                    camera.position.y = cars[index].y
                }

                index++;

           }

           if(keyDown(LEFT_ARROW)){
            this.changePosition(-speed,0);
            }
            else if(keyDown(RIGHT_ARROW)){
                this.changePosition(speed,0);
            }
            else if(keyDown(UP_ARROW)){
                this.changePosition(0,-speed);
            }
            else if(keyDown(DOWN_ARROW)){
                this.changePosition(0,speed);
            }
            if(cars[player.id-1].y < -3000){
                database.ref("rank").once("value").then((data)=>{
                    rank= data.val() + 1;
                    database.ref("/").update({
                        rank: rank
                    })
                })
                gameState = 2
               }
            // burgers!
            // 0-----ww
            if (frameCount%70 === 0){
                Krabby = createSprite(random(windowWidth/2-270,windowWidth/2+200),camera.position.y-200, 50,50);
                Krabby.addImage(patty);
                Krabby.scale = 0.1
                krabbyGroup.add(Krabby);
            }
            
            cars[player.id-1].overlap(krabbyGroup, function(totalburgers,touchedburger){
                touchedburger.remove()
                score++;
                // database.ref("players/player"+player.id).update({
                //    score: score
                // })
                speed = speed + 5;
            })
            // car3
            cars[player.id-1].overlap(carGroup, function(totalcars,touchedcar){
                image(blast,(totalcars.x + touchedcar.x)/2, (totalcars.y + touchedcar.y)/2, 60,60)
            })



            if (frameCount%100 === 0){
                var enemy = createSprite(random(windowWidth/2-270,windowWidth/2+200),camera.position.y-200, 50,50);
                enemy.addImage(plank);
                enemy.scale = 0.1
                plankton.add(enemy);
            }
            cars[player.id-1].overlap(plankton, function(totalenemies,touchedenemy){
                touchedenemy.remove()
                if (speed > 5){
                speed = speed - 5;
                }
            })
        }
    }
    changePosition(x,y){
        // console.log(cars[0].x)
        // second player.id = 2
        // car2
        // cars[1]
        cars[player.id-1].x = cars[player.id-1].x + x;
        cars[player.id-1].y = cars[player.id-1].y + y;
    
        // write to db
        database.ref("players/player"+player.id).update({
            x: cars[player.id-1].x,
            y: cars[player.id-1].y,
        })
    }


}