var car1, car2, car3, car4;
var database;
var position;
var form;
var player;
var playerCount;
var gameState;
var game;
var players;
var cars = []
var krabs, squid, pat, sponge;
var bg;
var rank;
var patty;
var Krabby;
var krabbyGroup;
var carGroup;
var score = 0;
var speed = 10;
var plank;
var plankton;
var blast;

function preload(){
    krabs = loadImage("krabs.png");
    squid = loadImage("squidward.png");
    pat = loadImage("patrick.png");
    sponge = loadImage("spongebob.png");
    bg = loadImage("track.jpeg");
    patty = loadImage("krabbypatty.png");
    plank =loadImage("plankton.png");
    blast = loadImage("blast.png");
}

function setup(){
    createCanvas(windowWidth-20,windowHeight-20);
    database = firebase.database()

    player = new Player();
    player.getPlayerCount();

    form = new Form(); //constructor
    
    game = new Game();
    game.getgameState();
    
    car1 = createSprite(100,50,20,20);
    car1.addImage(krabs);
    car1.scale = 0.2;

    car2 = createSprite(150,50,20,20);
    car2.addImage(squid);
    car2.scale = 0.2;

    car3 = createSprite(200,50,20,20);
    car3.addImage(sponge);
    car3.scale = 0.2;

    car4 = createSprite(250,50,20,20);
    car4.addImage(pat);
    car4.scale = 0.2;

    cars = [car1,car2,car3,car4]

    krabbyGroup = new Group()
    plankton = new Group()
    carGroup = new Group()

    carGroup.add(car1);
    carGroup.add(car2);
    carGroup.add(car3);
    carGroup.add(car4);


    // read from db
    // data => action , use => function
    // () function
    // {} definition

}

//infinite loop
function draw(){
    background("white");
    player.getPlayerCount();


    form.display()
    
    if (playerCount === 4 && gameState === 0){
        gameState = 1; //local
        game.updategameState(1);

    }
    if(gameState === 1){
        game.play()
    }
    if(gameState === 2){
        swal({
            text: "YAY! You finished!",
            icon: "https://66.media.tumblr.com/tumblr_m1i9zxj6eO1rqfhi2o1_500.gif",
            confirmButtonText: "Thanks For Playing"
        });
        
        gameState=3;
        
    }
}

function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;

    // write to db
    database.ref("position").update({
        X: ball.x,
        Y: ball.y,
    })
}
