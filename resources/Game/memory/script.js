// const cards = document.querySelectorAll(".memory-card");

// let hasFlippedCard = false;
// let lockBoard = false;
// let firstCard, secondCard;

var canvas = document.getElementById("ctx");
var ctx = canvas.getContext("2d");
ctx.font = "30px Helvetica";

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
    var deleted = false;
    for (var key in unpairedCardList) {
        if (testCollisionEntity(ent, unpairedCardList[key])) {
            delete unpairedCardList[key];
            unpairedCards -= 1;
            pairedCards += 1;
            if (pairedCards >= 1){
                timeBonus += 1;
            }
            deleted = true;        
        } 
        ctx.fillRect(
            ent.x - tempW / 2,
            ent.y - tempH / 2,
            ent.width,
            ent.height
        );
    }
    delete ent;
    if (!deleted) {
            timeBonus -= 1;
    }
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

for (var i = 0; i < 5; i++){
  var img = new Image();
  img.src = imgPaths[i];
  imgList.push(img);
}

Image = function(id, imgId) {
  var img = new Image();
  img.src = imgPaths[imgId];

  imgList[id] = img;
};

CardObject = function(id, x, y, width, height, imgId) {
  var tree = {
      x: x,
      y: y,
      id: id,
      width: width,
      height: height,
      imgId: imgId
  };
  cardList[id] = card;
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

generateCard = function(posX, posY) {
  var x = posX;
  var y = posY;
  var width = canvas.width / 7.05
  var height = canvas.height / 5;
  var id = cardID++;
  var imgId = getRandomInt(0, 5);
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
      highScore();
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
  var numRows = 4;
  var numColumns = 5;

  for (
      var posX = canvas.width * 0.01;
      posX < canvas.width * 0.99;
      posX += canvas.width * (1 / numColumns)
  ) {
      for (
          var posY = canvas.height * 0.45;
          posY < canvas.height * 0.99;
          posY += canvas.height * (1 / numRows)
      ) {
          generateCard(
              posX +
                  getRandomInt(
                      -canvas.width * 0.01,
                      canvas.width * 0.01
                  ),
              posY +
                  getRandomInt(
                      -canvas.height * 0.02,
                      canvas.height * 0.15
                  )
          );
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
