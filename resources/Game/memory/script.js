// const cards = document.querySelectorAll(".memory-card");

// let hasFlippedCard = false;
// let lockBoard = false;
// let firstCard, secondCard;

var canvas = document.getElementById("ctx");
var ctx = canvas.getContext("2d");
ctx.font = "30px Helvetica";

var firstKey = -1;
var cardIndex = -1;

var pairs = [];

canvasClick = function(event) {
    var tempW = 50;
    var tempH = 50;
    var { clientX, clientY } = event;
    var ent = {
        x: clientX,
        y: clientY,
        width: tempW,
        height: tempH
    };
    console.log( unpairedCardList );
    for (var key in unpairedCardList) {
        if (testCollisionEntity(ent, unpairedCardList[key])) {          
            //delete unpairedCardList[key];
            console.log( key );
            //console.log( unpairedCardList[key].imgId );
            // for (var i = 0; i < 9; i++){
            //   unpairedCardList[key].width -= (canvas.width/90);
            //   setTimeout(function(){},5000);
            // }

            console.log(unpairedCardList[key].width);
            if (key == cardIndex){
              console.log("sdfg");
              break;
            }

            console.log( pairs );

            //firstKey = pairs[key];
            console.log(pairs[key]);

            if( firstKey == -1 )
            {
               firstKey = pairs[key];
               cardIndex = key;
            }
            else
            {
              if( firstKey == pairs[key] )
              {
                unpairedCards -= 1;
                pairedCards += 1;
                console.log( "match" );
              }
              firstKey = -1;
              cardIndex = -1;
            }
            // if (pairedCards >= 1){
            //     timeBonus += 1;
            // }
        } 
        ctx.fillRect(
            ent.x - tempW / 2,
            ent.y - tempH / 2,
            ent.width,
            ent.height
        );
    }
    delete ent;
};

canvas.addEventListener("click", canvasClick);

var timeWhenGameStarted = Date.now();
var timeOut = 2;
var timeBonus = 0;

var unpairedCards = 0;
var unpairedCardID = 0;
var unpairedCardList = {};

var pairedCards = 0;
var pairedCardID = 0;

var score;

var totalCards;

var imgPaths = [
  "./img/Card_Back.png",
  "./img/Card_Kakapo_Word.png",
  "./img/Card_Kakapo.png",
  "./img/Card_Kiwi_Word.png",
  "./img/Card_Kiwi.png",
];

var imgList = [];

function shuffle(array) {
  var currentCard = array.length, temp, randomCard;
  while (currentCard > 0) {
    randomCard = Math.floor(Math.random() * currentCard);
    currentCard -= 1;
    temp = array[currentCard]; 
    array[currentCard] = array[randomCard]; 
    array[randomCard] = temp; 
  }
  return array;
}



// Image = function(id, imgId) {
//   var img = new Image();
//   img.src = pairs[imgId];

//   imgList[id] = img;
// };

CardObject = function(id, x, y, width, height, imgId) {
  var card = {
      x: x,
      y: y,
      id: id,
      width: width,
      height: height,
      imgId: imgId
  };
  unpairedCardList[id] = card;
};

generateCard = function(posX, posY, count) {
  var x = posX;
  var y = posY;
  var width = canvas.width / 9
  var height = canvas.height / 4.5;
  var id = unpairedCardID++;
  var imgId = count;
  CardObject(id, x, y, width, height, imgId);
};

updateCardEntity = function(something) {
  drawEntity(something);
};

drawEntity = function(something) {
  ctx.save();

  ctx.drawImage(
      imgList[something.imgId],
      something.x - something.width / 2,
      something.y - something.height / 2,
      something.width,
      something.height
  );
  ctx.restore();
};

testCollisionEntity = function(entity1, entity2) {
  var rect1 = {
      x: entity1.x - entity1.width / 2,
      y: entity1.y - entity1.height / 2,
      width: entity1.width,
      height: entity1.height
  };

  var rect2 = {
      x: entity2.x - entity2.width / 2,
      y: entity2.y - entity2.height / 2,
      width: entity2.width,
      height: entity2.height
  };

  return testCollisionRectRect(rect1, rect2);
};

testCollisionRectRect = function(rect1, rect2) {
  return (
      rect1.x <= rect2.x + rect2.width &&
      rect2.x <= rect1.x + rect1.width &&
      rect1.y <= rect2.y + rect2.height &&
      rect2.y <= rect1.y + rect1.height
  );
};

document.getElementById("instructions").style.display = "block";
document.getElementById("instructionText").innerHTML =
    "Tap a card to flip it over<br/><br/>" +
    "Try to find its match to from a pair<br/><br/>" +
    "Try to find all of them before time runs out!";

mainMenu = function() {
  document.getElementById("instructions").style.display = "block";
  document.getElementById("instructionText").innerHTML =
    "Tap a card to flip it over<br/><br/>" +
    "Try to find its match to from a pair<br/><br/>" +
    "Try to find all of them before time runs out!";
  document.getElementById("stats").style.display = "none";
  document.getElementById("end").style.display = "none";
};

update = function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  frameCount++;

  var time = (new Date() - timeWhenGameStarted) / 1000;
  var t = time.toFixed(1);
  var roundTime = (timeOut - t) + timeBonus;
  var timeLeft = roundTime.toFixed(1);

  score = (pairedCards * 10) - (unpairedCards * 15) - (t * 5) + (timeLeft * 15);

  for (var key in unpairedCardList) {
      updateCardEntity(unpairedCardList[key]);
  }

  if (pairedCards == totalCards) {
      myStopFunction();

      for (var key in unpairedCardList) {
          delete unpairedCardList[key];
      }
      unpairedCardList = {};

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      document.getElementById("end").style.display = "block";
      document.getElementById("endText").innerHTML =
          "In " + t + " seconds<br/><br/>" +
          "You made " + pairedCards/2 + " pair(s)<br/><br/>" +
          "There was " + unpairedCards/2 + " pair(s) left<br/><br/>" +
          "You had " + timeLeft + " seconds remaining<br/><br/>" + 
          "Final Score: " + score.toFixed(0);
      //highScore();
  }

  document.getElementById("stats").style.display = "block";
  document.getElementById("statText").innerHTML = "Time: " + timeLeft;
};

var myVar;

startNewGame = function() {
  ctx.canvas.width = innerWidth;
  ctx.canvas.height = innerHeight;
  document.getElementById("end").style.display = "none";
  document.getElementById("instructions").style.display = "none";
  timeWhenGameStarted = Date.now();
  timeBonus = 0;
  frameCount = 0;
  score = 0;
  unpairedCards = 0;
  pairedCards = 0;
  totalCards = 0;
  unpairedCardList = {};
  firstKey = -1;
  cardIndex = -1;
  var numRows = 2;
  var numColumns = 4;
  var count = 0;
  unpairedCardID = 0;
  imgList = [];
  pairs = [];
  for (var i = 1; i < imgPaths.length; i++){
    pairs.push(imgPaths[i], imgPaths[i]);
  }
  shuffle(pairs);
  console.log(pairs);
  
  for (var i = 0; i < pairs.length; i++){
    var img = new Image(); 
    img.src = pairs[i];
    imgList.push(img);
  }

  for (
      var posX = canvas.width * 0.1;
      posX < canvas.width * 0.9;
      posX += canvas.width * (1 / numColumns)
  ) {
      for (
          var posY = canvas.height * 0.1;
          posY < canvas.height * 0.8;
          posY += canvas.height * (1 / numRows)
      ) {
          generateCard(
              posX + canvas.width * 0.005,
              posY + canvas.height * 0.15,
              imgId = count
              //imgId = Math.floor(count/2)
          );
          unpairedCards += 1;
          totalCards = unpairedCards;
          count++
      }
  }
  myVar = setInterval(update, 40);
};

function myStopFunction() {
  clearInterval(myVar);
}

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
// function flipCard() {
//   if (lockBoard) return;
//   if (this === firstCard) return;

//   this.classList.add("flip");

//   if (!hasFlippedCard) {
//     hasFlippedCard = true;
//     firstCard = this;

//     return;
//   }

//   secondCard = this;
//   checkForMatch();
// }

// function checkForMatch() {
//   let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

//   isMatch ? disableCards() : unflipCards();
// }

// function disableCards() {
//   firstCard.removeEventListener("click", flipCard);
//   secondCard.removeEventListener("click", flipCard);

//   resetBoard();
// }

// function unflipCards() {
//   lockBoard = true;

//   setTimeout(() => {
//     firstCard.classList.remove("flip");
//     secondCard.classList.remove("flip");

//     resetBoard();
//   }, 1500);
// }

// function resetBoard() {
//   [hasFlippedCard, lockBoard] = [false, false];
//   [firstCard, secondCard] = [null, null];
// }

// (function shuffle() {
//   cards.forEach(card => {
//     let randomPos = Math.floor(Math.random() * 12);
//     card.style.order = randomPos;
//   });
// })();

// cards.forEach(card => card.addEventListener("click", flipCard));
