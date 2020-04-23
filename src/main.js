

//tag can be used freely as an easy means of identification for either object
var RectCollider = makeStruct("width height");
var GameObject = makeStruct("tag xPos yPos spriteID collider name");
var gameObjects = [];
var drawHitBoxes = true;

createObject("player", "player", 75, 75, 153, 8, 8);
createObject("enemy", "enemy", 100, 100, 158, 8, 8);
//n is signifying there is no sprite for this object (meant to be invisible)
createObject("northRailing", "railing", 0, 55, "n", 128, 8);
createObject("southRailing", "railing", 0, 105, "n", 128, 8);
//createObject("railing", "railing", 0, 64, "n", 8, 40);
//createObject("railing", "railing", 128, 64, "n", 8, 40);

var player;

//locate player in gameObjects
for (var i = 0; i < gameObjects.length; i++){ 
    if (gameObjects[i].tag == "player") {
        player = gameObjects[i];
    }
}


 
var background = getMap("map");
paper(2);
 
exports.update = function () {
    if (btn.right) player.xPos = player.xPos + 1;
    if (btn.left)  player.xPos -= 1;
    if (btn.up)    player.yPos -= 1;
    if (btn.down)  player.yPos += 1;
    
    pen(11);
    var dead = false;
    var railed = false;
    for (var i = 1; i < gameObjects.length; i++){
        if (gameObjects[i].tag == "enemy"){
            dead = isCollide(player, gameObjects[i]);
        }
        if(gameObjects[i].tag == "railing" && isCollide(player, gameObjects[i])){
            if(btn.up) player.yPos += 1;
            if(btn.down) player.yPos -= 1; 
            var railed = true;
        }
    }


    cls();
    draw(background, 0, 0);
    if(dead){
        println("fuck");
    }
    if(railed) println(player.yPos);



    for (i = 0; i < gameObjects.length; i++){
        if (gameObjects[i].spriteID != "n") sprite(gameObjects[i].spriteID, gameObjects[i].xPos, gameObjects[i].yPos);
        if (drawHitBoxes){
            rect(gameObjects[i].xPos, gameObjects[i].yPos, gameObjects[i]['collider'].width, gameObjects[i]['collider'].height);
        }
    }
};


//takes in two gameobjects and checks to see if they've collided
function isCollide(rect1, rect2){
    return (rect1.xPos < rect2.xPos + rect2['collider'].width &&
        rect1.xPos + rect1['collider'].width > rect2.xPos &&
        rect1.yPos < rect2.yPos + rect2['collider'].height &&
        rect1.yPos + rect1['collider'].height > rect2.yPos);

};

function makeStruct(names) {
    var names = names.split(' ');
    var count = names.length;
    function constructor() {
        for (var i = 0; i < count; i++){
            this[names[i]] = arguments[i];
        }
    }
    return constructor;
};

function createObject(name, objTag, xPos, yPos, spriteID, width, height){
    var collider = new RectCollider(width, height);
    var obj = new GameObject(objTag, xPos, yPos, spriteID, collider, name);
    gameObjects.push(obj);
};


