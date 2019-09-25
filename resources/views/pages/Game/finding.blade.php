@extends( 'inc.app' )

@section( 'head' )
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Deep Cove</title>
    <meta id="csrf-meta" name="csrf-token" content="{{ csrf_token() }}" />
    <script>window.Laravel = { csrfToken: {{csrf_token()}} }</script>

    <script>
    console.log( document.getElementById( "csrf-meta" ).getAttribute( "content" ) );
    console.log( window.Laravel.csrfToken );
    </script>

    <style>
        body {
            font-family: Helvetica;
            height: 100%;
            margin: 0;
            padding: 0;
        }

        canvas {
            margin: 0;
            padding: 0;
        }

        #ctx {
            width: 100%;
            height: 100%;
        }

        html {
            height: 100%;
            background: url(./assets/images/hidden_background2.png) no-repeat center center fixed;
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            background-size: cover;
        }

        @keyframes menuAnim {
            from {
                top: -500px;
                opacity: 0;
            }

            to {
                top: 1;
                opacity: 1;
            }
        }
    </style>
</head>
@endsection

@section( 'content' )
    <canvas id="ctx"></canvas>
    <div id="instructions" style="position:absolute; top:25%; left:32.5%; width:35%; height:width; 
            border: 3px solid black; background:blanchedalmond; text-align: center; display: none; 
            animation-name: menuAnim; animation-duration: 0.3s">
        <h1 style="font-size:4vmin">INSTRUCTIONS</h1>
        <p id="instructionText" style="font-size:3.5vmin"></p>
        <button id="startBtn" style="font-size:4.5vmin;" onclick="startNewGame()">
            Start Game
        </button>
        <button style="font-size:4.5vmin;" onclick="window.close()">
            Close
        </button>
    </div>
    <div id="stats" style="position:absolute; 
            top: 1.5%; left: 1%; width: 10%; height: width; 
            border-left: 1px solid black; border:  1px solid black; 
            background-image: url( './assets/images/stats.png' ); text-align: left; display: none;">
        <h3 id="statText" style="font-size:3vmin"></h3>
    </div>
    <div id="end" style="position:absolute; top:22.5%; left:32.5%; width:35%; height:width; 
            border: 3px solid black; background:blanchedalmond; text-align: center; display: none;
            animation-name: menuAnim; animation-duration: 0.3s">
        <h1 style="font-size:4vmin">Game Over</h1>
        <p id="endText" style="font-size:3.5vmin"></p>
        <button id="newBtn" style="font-size:4.5vmin;" onclick="startNewGame()">
            New Game
        </button>
        <button id="mainBtn" style="font-size:4.5vmin;" onclick="mainMenu()">
            Main Menu
        </button>
    </div>
<script>
    var canvas = document.getElementById("ctx");
    var ctx = canvas.getContext("2d");
    ctx.font = "30px Helvetica";

    canvasClick = function (event) {
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
        for (var key in hiddenObjectList) {
            if (testCollisionEntity(ent, hiddenObjectList[key])) {
                delete hiddenObjectList[key];
                hiddenObjects -= 1;
                foundObjects += 1;
                if (hiddenObjects >= 1) {
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

    var trees = 0;
    var treeID = 0;
    var treeList = {};

    var hiddenObjects = 0;
    var hiddenObjectID = 0;
    var hiddenObjectList = {};

    var foundObjectID = 0;
    var foundObjects = 0;

    var score;

    var totalObjects = 0;

    var imgPaths = [
        "./assets/images/animal1.png",
        "./assets/images/animal2.png",
        "./assets/images/animal3.png",
        "./assets/images/animal1f.png",
        "./assets/images/animal2f.png",
        "./assets/images/animal3f.png",
        "./assets/images/tree1.png",
        "./assets/images/tree2.png",
        "./assets/images/tree3.png",
        "./assets/images/tree4.png",
        "./assets/images/tree5.png"
    ];

    var imgList = [];

    for (var i = 0; i < 12; i++) {
        var img = new Image();
        img.src = imgPaths[i];
        imgList.push(img);
    }


    Image = function (id, imgId) {
        var img = new Image();
        img.src = imgPaths[imgId];

        imgList[id] = img;
    };

    TreeObject = function (id, x, y, width, height, imgId) {
        var tree = {
            x: x,
            y: y,
            id: id,
            width: width,
            height: height,
            imgId: imgId
        };
        treeList[id] = tree;
    };

    HiddenObject = function (id, x, y, width, height, imgId) {
        var object = {
            x: x,
            y: y,
            id: id,
            width: width,
            height: height,
            imgId: imgId
        };
        hiddenObjectList[id] = object;
    };

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    randomlyGenerateObject = function () {
        var x = getRandomInt(canvas.width * 0.02, canvas.width * 0.9);
        var y = getRandomInt(canvas.height * 0.5, canvas.height * 0.9);
        var width = canvas.width / 10;
        var height = canvas.height / 7;
        var id = hiddenObjectID++;
        var imgId = getRandomInt(1, 6);
        HiddenObject(id, x, y, width, height, imgId);
    };

    randomlyGenerateTree = function (posX, posY) {
        var x = posX;
        var y = posY;
        var width = canvas.width / getRandomInt(12, 14);
        var height = canvas.height / getRandomInt(4, 6);
        var id = treeID++;
        var imgId = getRandomInt(6, 11);
        TreeObject(id, x, y, width, height, imgId);
    };

    updateHiddenEntity = function (something) {
        drawEntity(something);
    };

    updateTreeEntity = function (something) {
        drawEntity(something);
    };

    drawEntity = function (something) {
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

    // getDistanceBetweenEntity = function(entity1, entity2) {
    //     var vx = entity1.x - entity2.x;
    //     var vy = entity1.y - entity2.y;
    //     return Math.sqrt(vx * vx + vy * vy);
    // };

    testCollisionEntity = function (entity1, entity2) {
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

    testCollisionRectRect = function (rect1, rect2) {
        return (
            rect1.x <= rect2.x + rect2.width &&
            rect2.x <= rect1.x + rect1.width &&
            rect1.y <= rect2.y + rect2.height &&
            rect2.y <= rect1.y + rect1.height
        );
    };

    document.getElementById("instructions").style.display = "block";
    document.getElementById("instructionText").innerHTML =
        "There are 5 animals hidden in the scene<br/><br/>" +
        "Tap them when you find them<br/><br/>" +
        "Try to find all of them before time runs out!";

    mainMenu = function () {
        document.getElementById("instructions").style.display = "block";
        document.getElementById("instructionText").innerHTML =
            "There are 5 animals hidden in the scene<br/><br/>" +
            "Tap them when you find them<br/><br/>" +
            "Try to find all of them before time runs out!";
        document.getElementById("stats").style.display = "none";
        document.getElementById("end").style.display = "none";
    };

    highScore = function () {
        var http = new XMLHttpRequest();
        var url = '/dcoet-kiosk/public/findingGamePost';
        var initials = 'ASS';
        var params = 'name=' + initials + '&score=' + score;
        http.open('POST', url, true);

        http.setRequestHeader( 'X-CSRF-Token', document.getElementById( "csrf-meta" ).getAttribute( "content" ) );
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                console.log( "done" );
            }
        }
        http.send(params);
    }

    update = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        frameCount++;

        var time = (new Date() - timeWhenGameStarted) / 1000;
        var t = time.toFixed(1);
        var roundTime = (timeOut - t) + timeBonus;
        var timeLeft = roundTime.toFixed(1);

        //score = (timeLeft * 0.8) * 50;
        score = (foundObjects * 10) - (hiddenObjects * 15) - (t * 5) + (timeLeft * 15);

        for (var key in hiddenObjectList) {
            updateHiddenEntity(hiddenObjectList[key]);
        }

        for (var key in treeList) {
            updateTreeEntity(treeList[key]);
        }

        if (foundObjects == totalObjects) {
            myStopFunction();

            for (var key in hiddenObjectList) {
                delete hiddenObjectList[key];
            }
            hiddenObjectList = {};

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            document.getElementById("end").style.display = "block";
            document.getElementById("endText").innerHTML =
                "In " + t + " seconds<br/><br/>" +
                "You found " + foundObjects + " animal(s)<br/><br/>" +
                "There was " + hiddenObjects + " animal(s) left<br/><br/>" +
                "You had " + timeLeft + " seconds remaining<br/><br/>" +
                "Final Score: " + score.toFixed(0);
            highScore();
        }

        document.getElementById("stats").style.display = "block";
        document.getElementById("statText").innerHTML = "Time: " + timeLeft;
    };

    var myVar;

    startNewGame = function () {
        ctx.canvas.width = innerWidth;
        ctx.canvas.height = innerHeight;
        document.getElementById("end").style.display = "none";
        document.getElementById("instructions").style.display = "none";
        timeWhenGameStarted = Date.now();
        timeBonus = 0;
        frameCount = 0;
        score = 0;
        trees = 0;
        treeList = {};
        hiddenObjects = 0;
        foundObjects = 0;
        totalObjects = 0;
        hiddenObjectList = {};
        // for (hiddenObjects = 0; hiddenObjects < 5; hiddenObjects++) {
        //     randomlyGenerateObject();
        // }
        var numRows = 8;
        var numColumns = 12;

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
                randomlyGenerateTree(
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
                var genAnimal = getRandomInt(0, 10);
                if (genAnimal == 1) {
                    randomlyGenerateObject();
                    hiddenObjects += 1;
                    totalObjects = hiddenObjects;
                }
            }
        }
        myVar = setInterval(update, 40);
    };

    function myStopFunction() {
        clearInterval(myVar);
    }
</script>

@endsection