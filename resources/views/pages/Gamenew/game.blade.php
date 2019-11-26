@extends( "inc.app" )
@section( "head" )
    <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Deep Cove</title>
            <meta id="csrf-meta" name="csrf-token" content="{{ csrf_token() }}" />
            <script>window.Laravel = { csrfToken: '{{csrf_token()}}' }</script>
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
                background: url(./assets/images/background5.png) no-repeat
                    center center fixed;
                -webkit-background-size: cover;
                -moz-background-size: cover;
                -o-background-size: cover;
                background-size: cover;
                -webkit-touch-callout: none;
                -webkit-user-select: none;
                -khtml-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            }
            .btn-up {
                background: url( './assets/images/button_up.png' );
                background-size: 40% 100%;
                background-repeat: no-repeat;
                background-position: center;
            }
            .btn-down {
                background: url( './assets/images/button_down.png' );
                background-size: 40% 100%;
                background-repeat: no-repeat;
                background-position: center;
            }
            .grid-container {
                display: grid;
                grid-template-columns: auto auto auto;
                grid-gap: 3.5vmin;
            }
            .grid-container > div{
                text-align: center;
            }
            .grid-container-score {
                display: grid;
                grid-template-columns: auto auto auto;
            }
            .grid-new {
                display: grid;
                grid-template-rows: 4vmin 8vmin 4vmin;
            }
            .grid-new > div {
                border: 1px solid black;
                font-size: 3vmin;
            }
            .grid-new > .big {
                font-size: 6vmin;
            }
            @keyframes menuAnim{
                from {top:-500px; opacity:0;}
                to {top:1; opacity:1;}
            }
        </style>
    </head>
    @endsection
    @section( "content" )
        <canvas id="ctx"></canvas>
        <div
            id="levelSelect"
            style="position:absolute; top:20%; left:30%; width:40%; height:width; 
            border: 3px solid black; background:blanchedalmond; text-align: center; display: none; 
            animation-name: menuAnim; animation-duration: 0.3s"
        >
            <h1 style="font-size:4vmin">LEVEL SELECT</h1>
            <h3 id="selectText" style="font-size:3.5vmin"></h3>
            <button
                id="survivalBtn"
                style="font-size:3.5vmin;"
                onclick="survivalInstructMenu()"
            >
                Survival
            </button>
            <button
                id="timedBtn"
                style="font-size:3.5vmin;"
                onclick="timedInstructMenu()"
            >
                Timed
            </button>
            <br />
            <button
                id="closeBtn"
                style="font-size:3.5vmin;"
                onclick="closeGame()";
            >
                Close
            </button>
        </div>
        <div
            id="survivalInstructions"
            style="position:absolute; top:15%; left:20%; width:60%; height:width;
            border: 3px solid black; background:blanchedalmond; text-align: center; display: none;
            animation-name: menuAnim; animation-duration: 0.3s"
        >
            <h1 style="font-size:4vmin">INSTRUCTIONS</h1>
            <p id="survivalInstructText" style="font-size:3.5vmin"></p>
            <button
                id="startBtn"
                style="font-size:3.5vmin;"
                onclick="startNewGame()"
            >
                Start Game
            </button>
            <button
                id="leaderBtn" 
                style="font-size:3.5vmin;"
                onclick="leaderboardNormal()"
            >
                Leaderboard
            </button>
            <button
                id="mainBtn"
                style="font-size:3.5vmin;"
                onclick="mainMenu()"
            >
                Main Menu
            </button>
        </div>
        <div
            id="timedInstructions"
            style="position:absolute; top:15%; left:20%; width:60%; height:width;
            border: 3px solid black; background:blanchedalmond; text-align: center; display: none;
            animation-name: menuAnim; animation-duration: 0.3s"
        >
            <h1 style="font-size:4vmin">INSTRUCTIONS</h1>
            <p id="timedInstructText" style="font-size:3.5vmin"></p>
            <button
                id="startBtn"
                style="font-size:3.5vmin;"
                onclick="startNewGame()"
            >
                Start Game
            </button>
            <button
                id="leaderBtn"
                style="font-size:3.5vmin;"
                onclick="leaderboardTimed()"
            >
                Leaderboard
            </button>
            <button
                id="mainBtn"
                style="font-size:3.5vmin;"
                onclick="mainMenu()"
            >
                Main Menu
            </button>
        </div>
        <div
            id="stats" 
            style="position:absolute; 
            top: 1.5%; left: 1%; width: 13%; height: width; 
            border-left: 1px solid black; border:  1px solid black; 
            background-image: url( './assets/images/stats.png' ); text-align: left; display: none;"
        >
            <h3 id="statText" style="font-size:3vmin"></h3>
            <button id="killGame" onclick="die()">Die</button>
        </div>
        <div
            id="end"
            style="position:absolute; top:15%; left:25%; width:50%; height:width; 
            border: 3px solid black; background:blanchedalmond; text-align: center; display: none;
            animation-name: menuAnim; animation-duration: 0.3s"
        >
            <h1 style="font-size:4vmin">Game Over</h1>
            <p id="endText" style="font-size:3.5vmin"></p>
            <button
                id="newBtn"
                style="font-size:3.5vmin;"
                onclick="startNewGame()"
            >
                New Game
            </button>
            <button
                id="leaderBtn" 
                style="font-size:3.5vmin;"
                onclick="leaderboard()"
            >
                Leaderboard
            </button>
            <button
                id="entryBtn"
                style="font-size:3.5vmin;"
                onclick="scoreEntry()"
            >
                Submit Score
            </button>
            <button
                id="mainBtn"
                style="font-size:3.5vmin;"
                onclick="mainMenu()"
            >
                Main Menu
            </button>
        </div>
        <div
            id="leaderboardNormal"
            style="position:absolute; top:10%; left:32.5%; width:35%; height:width; 
            border: 3px solid black; background:blanchedalmond; text-align: center; display: none; 
            animation-name: menuAnim; animation-duration: 0.3s"
        >
            <h1 style="font-size:4vmin">SURVIVAL HIGHSCORES</h1>
            <p id="highscoreTextNormal" style="font-size:2.5vmin"></p>
            <button
                id="startBtn"
                style="font-size:3.5vmin;"
                onclick="startNewGame()"
            >
                Start Game
            </button>
            <button
                id="mainBtn"
                style="font-size:3.5vmin;"
                onclick="mainMenu()"
            >
                Main Menu
            </button>
        </div>
        <div
            id="leaderboardTimed"
            style="position:absolute; top:10%; left:32.5%; width:35%; height:width; 
            border: 3px solid black; background:blanchedalmond; text-align: center; display: none; 
            animation-name: menuAnim; animation-duration: 0.3s"
        >
            <h1 style="font-size:4vmin">TIMED HIGHSCORES</h1>
            <p id="highscoreTextTimed" style="font-size:2.5vmin"></p>
            <button
                id="startBtn"
                style="font-size:3.5vmin;"
                onclick="startNewGame()"
            >
                Start Game
            </button>
            <button
                id="mainBtn"
                style="font-size:3.5vmin;"
                onclick="mainMenu()"
            >
                Main Menu
            </button>
        </div>
        <div
            id="newScore"
            style="position:absolute; top:10%; left:32.5%; width:35%; height:width; 
            border: 3px solid black; background:blanchedalmond; text-align: center; display: none; 
            animation-name: menuAnim; animation-duration: 0.3s"
        >
            <h1 style="font-size:4vmin">NEW HIGHSCORE</h1>
            <div class="grid-container-score">
                <div class="grid-new">
                    <div id="btn0" class="btn-up"></div>
                    <div id="letter1" class="big"></div>
                    <div id="btn1" class="btn-down"></div>
                </div>
                <div class="grid-new">
                    <div id="btn2" class="btn-up"></div>
                    <div id="letter2" class="big"></div>
                    <div id="btn3" class="btn-down"></div>
                </div>  
                <div class="grid-new">
                    <div id="btn4" class="btn-up"></div>
                    <div id="letter3" class="big"></div>
                    <div id="btn5" class="btn-down"></div>
                </div>
              </div>
            <button
                id="submitBtn"
                style="font-size:3.5vmin;"
                onclick="scoreSubmit()"
            >
                Submit
            </button>
        </div>
    <script>
        var canvas = document.getElementById("ctx");
        var ctx = canvas.getContext("2d");
        ctx.font = "30px Helvetica";

        var TESTBOOL = false;

        die = function( event )
        {
            health = -100;
            TESTBOOL = true;
        }

        closeGame = function( event ) {
            window.location = "./";
        }

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
            for (var key in rubbishList) {
                if (testCollisionEntity(ent, rubbishList[key])) {
                    delete rubbishList[key];
                    score += 10;
                    tappedRubbish += 1;
                }
            }
            for (var key in animalList) {
                if (testCollisionEntity(ent, animalList[key])) {
                    delete animalList[key];
                    score -= 15;
                    health -= 20;
                    tappedAnimals += 1;
                }
            }
            for (var key in pestList) {
                if (testCollisionEntity(ent, pestList[key])) {
                    delete pestList[key];
                    score += 35;
                    health += 10;
                    tappedPests += 1;
                }
            }
            delete ent;
        };

        canvas.addEventListener("click", canvasClick);

        var TILESIZE = 64;

        var pos = 10;

        var submitLetters = [0, 0, 0];

        var mode = 0;

        var timeWhenGameStarted = Date.now();
        var timeOut = 30;

        var backgroundObj = {};
        var backgroundID = 0;

        var rubbishID = 0;
        var animalID = 0;
        var pestID = 0;

        var frameCount = 0;

        var tappedRubbish = 0;
        var tappedAnimals = 0;
        var tappedPests = 0;

        var score;
        var health;

        var rubbishList = {};
        var animalList = {};
        var pestList = {};

        var imgInfo = [
            {
                "id": 0,
                "name": "background1",
                "type": "background",
                "path": "./assets/images/background1.png",
                "hasFlipped": false,
            },
            {
                "id": 1,
                "name": "background2",
                "type": "background",
                "path": "./assets/images/background2.png",
                "hasFlipped": false,
            },
            {
                "id": 2,
                "name": "background3",
                "type": "background",
                "path": "./assets/images/background3.png",
                "hasFlipped": false,
            },
            {
                "id": 3,
                "name": "background4",
                "type": "background",
                "path": "./assets/images/background4.png",
                "hasFlipped": false,
            },
            {
                "id": 4,
                "name": "background5",
                "type": "background",
                "path": "./assets/images/background5.png",
                "hasFlipped": false,
            },
            {
                "id": 5,
                "name": "tuatara",
                "type": "animal",
                "path": "./assets/images/tuatara.png",
                "numFrames": 4,
                "hasFlipped": true,
            },
            {
                "id": 6,
                "name": "duck",
                "type": "animal",
                "path": "./assets/images/duck.png",
                "numFrames": 4,
                "hasFlipped": true,
            },
            {
                "id": 7,
                "name": "kiwi",
                "type": "animal",
                "path": "./assets/images/kiwi.png",
                "numFrames": 4,
                "hasFlipped": true,
            },
            {
                "id": 8,
                "name": "snapper",
                "type": "waterAnimal",
                "path": "./assets/images/snapper.png",
                "numFrames": 4,
                "hasFlipped": true,
            },
            {
                "id": 9,
                "name": "jellyfish",
                "type": "waterAnimal",
                "path": "./assets/images/jellyfish.png",
                "numFrames": 8,
                "hasFlipped": true,
            },
            {
                "id": 10,
                "name": "eel",
                "type": "waterAnimal",
                "path": "./assets/images/eel.png",
                "numFrames": 6,
                "hasFlipped": true,
            },
            {
                "id": 11,
                "name": "cat",
                "type": "pest",
                "path": "./assets/images/cat.png",
                "numFrames": 4,
                "hasFlipped": true,
            },
            {
                "id": 12,
                "name": "rat",
                "type": "pest",
                "path": "./assets/images/rat.png",
                "numFrames": 4,
                "hasFlipped": true,
            },
            {
                "id": 13,
                "name": "hedgehog",
                "type": "pest",
                "path": "./assets/images/hedgehog.png",
                "numFrames": 4,
                "hasFlipped": true,
            },
            {
                "id": 14,
                "name": "smoke",
                "type": "rubbish",
                "path": "./assets/images/smoke.png",
                "numFrames": 8,
                "hasFlipped": true,
            },
            {
                "id": 15,
                "name": "coke",
                "type": "rubbish",
                "path": "./assets/images/coke.png",
                "numFrames": 8,
                "hasFlipped": false,
            },
            {
                "id": 16,
                "name": "paper",
                "type": "rubbish",
                "path": "./assets/images/paper2.png",
                "numFrames": 8,
                "hasFlipped": false,
            },
        ];

        //     "./assets/images/rubbish1.png",
        //     "./assets/images/rubbish2.png",
        //     "./assets/images/rubbish3.png",
        //     "./assets/images/rubbish1F.png",
        //     "./assets/images/rubbish2F.png",
        //     "./assets/images/rubbish3F.png",
        //     "./assets/images/animal1.png",
        //     "./assets/images/animal2.png",
        //     "./assets/images/animal3.png",
        //     "./assets/images/animal1F.png",
        //     "./assets/images/animal2F.png",
        //     "./assets/images/animal3F.png",
        //     "./assets/images/wateranimal1.png",
        //     "./assets/images/wateranimal2.png",
        //     "./assets/images/wateranimal3.png",
        //     "./assets/images/wateranimal1F.png",
        //     "./assets/images/wateranimal2F.png",
        //     "./assets/images/wateranimal3F.png",
        //     "./assets/images/pest1.png",
        //     "./assets/images/pest2.png",
        //     "./assets/images/pest3.png",
        //     "./assets/images/pest1F.png",
        //     "./assets/images/pest2F.png",
        //     "./assets/images/pest3F.png",

        var imgList = [];

        for ( var i = 0; i < imgInfo.length; i++ )
        {
            var img = {};

            img.image = new Image();
            img.image.src = imgInfo[ i ].path;

            img.name = imgInfo[ i ].name;
            img.type = imgInfo[ i ].type;

            if( imgInfo[ i ].type != "background" )
            {
                img.numFrames = imgInfo[i].numFrames;
                img.hasFlipped = imgInfo[i].hasFlipped;
            }

            imgList.push( img );
        }

        Image = function(id, imgId) {
            var img = new Image();
            img.src = imgPaths[imgId];

            imgList[id] = img;
        };

        Background = function(imgId) {
            var background = {
                imgId: imgId
            };
            backgroundObj = background;
        };

        var bannedWords = [
            {"id":2,"word":"ABC","created_at":"2019-10-01 02:59:22","updated_at":"2019-10-01 04:15:48"},
        ];

        var letters = [];
        for (var i = 65; i <= 90; i++){
            letters.push(String.fromCharCode(i));
        }

        var highscoresNormal = [
            {"id":2,"initials":"AAA","score":91,"created_at":"2019-09-25 04:02:20","updated_at":"2019-09-25 04:02:20"},
            {"id":4,"initials":"AAA","score":79,"created_at":"2019-09-25 04:11:42","updated_at":"2019-09-25 04:11:42"},
            {"id":3,"initials":"AAA","score":63,"created_at":"2019-09-25 04:11:36","updated_at":"2019-09-25 04:11:36"},
            {"id":5,"initials":"AAA","score":59,"created_at":"2019-09-25 05:08:32","updated_at":"2019-09-25 05:08:32"},
            {"id":1,"initials":"AAA","score":43,"created_at":"2019-09-25 04:00:38","updated_at":"2019-09-25 04:00:38"},
            {"id":6,"initials":"AAA","score":38,"created_at":"2019-09-25 04:02:20","updated_at":"2019-09-25 04:02:20"},
            {"id":8,"initials":"AAA","score":35,"created_at":"2019-09-25 04:11:42","updated_at":"2019-09-25 04:11:42"},
            {"id":9,"initials":"AAA","score":26,"created_at":"2019-09-25 04:11:36","updated_at":"2019-09-25 04:11:36"},
            {"id":7,"initials":"AAA","score":15,"created_at":"2019-09-25 05:08:32","updated_at":"2019-09-25 05:08:32"},
            {"id":10,"initials":"AAA","score":12,"created_at":"2019-09-25 05:08:32","updated_at":"2019-09-25 05:08:32"}
        ];

        var highscoresTimed = [
            {"id":2,"initials":"AAA","score":91,"created_at":"2019-09-25 04:02:20","updated_at":"2019-09-25 04:02:20"},
            {"id":4,"initials":"AAA","score":79,"created_at":"2019-09-25 04:11:42","updated_at":"2019-09-25 04:11:42"},
            {"id":3,"initials":"AAA","score":63,"created_at":"2019-09-25 04:11:36","updated_at":"2019-09-25 04:11:36"},
            {"id":5,"initials":"AAA","score":59,"created_at":"2019-09-25 05:08:32","updated_at":"2019-09-25 05:08:32"},
            {"id":1,"initials":"AAA","score":43,"created_at":"2019-09-25 04:00:38","updated_at":"2019-09-25 04:00:38"},
            {"id":6,"initials":"AAA","score":38,"created_at":"2019-09-25 04:02:20","updated_at":"2019-09-25 04:02:20"},
            {"id":8,"initials":"AAA","score":35,"created_at":"2019-09-25 04:11:42","updated_at":"2019-09-25 04:11:42"},
            {"id":9,"initials":"AAA","score":26,"created_at":"2019-09-25 04:11:36","updated_at":"2019-09-25 04:11:36"},
            {"id":7,"initials":"AAA","score":15,"created_at":"2019-09-25 05:08:32","updated_at":"2019-09-25 05:08:32"},
            {"id":10,"initials":"AAA","score":12,"created_at":"2019-09-25 05:08:32","updated_at":"2019-09-25 05:08:32"}
        ];

        //highscores[ 0 ].score

        Rubbish = function(id, x, y, spdX, spdY, width, height, imgId, side) {
            var rubbish = {
                x: x,
                spdX: spdX,
                y: y,
                spdY: spdY,
                id: id,
                width: width,
                height: height,
                imgId: imgId,
                side: side,
                animFrame: 0
            };
            rubbishList[id] = rubbish;
        };

        Animal = function(id, x, y, spdX, width, height, imgId, side) {
            var animal = {
                x: x,
                spdX: spdX,
                y: y,
                spdY: 0,
                id: id,
                width: width,
                height: height,
                imgId: imgId,
                side: side,
                animFrame: 0
            };
            animalList[id] = animal;
        };

        Pest = function(id, x, y, spdX, width, height, imgId, side) {
            var pest = {
                x: x,
                spdX: spdX,
                y: y,
                spdY: 0,
                id: id,
                width: width,
                height: height,
                imgId: imgId,
                side: side,
                animFrame: 0
            };
            pestList[id] = pest;
        };

        LettersSet = function(){
            for (var i = 0; i < 3; i++){
                document.getElementById('letter' + (i+1)).innerHTML = String.fromCharCode(65 + submitLetters[i]);
            }
        }

        LettersIterate = function(event, id, dir){
            if (submitLetters[id] + dir <= -1){
                submitLetters[id] = 26;
            }
            var disabled = false;
            submitLetters[id] = (submitLetters[id] + dir) % 26;
            for (var i = 0; i < bannedWords.length; i++){
                if (lettersTranslate() == bannedWords[i].word){
                    disabled = true;
                    break;
                }        
            }
            document.getElementById("submitBtn").disabled = disabled;
            LettersSet();
        };

        for (var i = 0; i < 6; i++){
            document.getElementById("btn"+i).addEventListener('click', (function(passedInElement, passedInElement2) {
                return function(e) {
                    LettersIterate(e, passedInElement, passedInElement2); 
                };
            }) 
            (Math.floor(i/2), Math.pow(-1, i)), false);
        }

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }

        randomlyGenerateRubbish = function() {
            if (health > -10000) {
                var side = getRandomInt(0, 2);
                if (mode == 1){
                    var x = Math.random() * (canvas.width - 10) + 10;
                    var y = 0;
                }
                else if (mode == 2){
                    var x = getRandomInt(canvas.width * 0.45, canvas.width * 0.56);
                    var y = canvas.height * 0.1;
                }
                var height = canvas.height / 10;
                var width = canvas.width / 12;
                var id = rubbishID++;
                var spdX = getRandomInt(1, 25) * (side == 0 ? 1.5 : -3);
                var spdY = getRandomInt(1, 5) + frameCount / 1000;
                var imgs = imgInfo.filter( m => m.type == "rubbish" );
                var imgId = imgs[ getRandomInt( 0, imgs.length ) ].id;
                Rubbish(id, x, y, spdX, spdY, width, height, imgId, side);  
            }
        };

        randomlyGenerateAnimal = function() {
            if (health > -10000) {
                var side = getRandomInt(0, 2);
                if (side == 0) {
                    var x = 0;
                } else {
                    var x = canvas.width;
                }
                if (mode == 1){
                    var y = canvas.height * 0.95;
                }
                else if (mode == 2){
                    var y = getRandomInt(
                        canvas.height * 0.38,
                        canvas.height * 0.95
                    );
                }
                var height = canvas.height / 7.5;
                var width = canvas.width / 10;
                var id = animalID++;
                if (mode == 1){
                    var spdX = getRandomInt(1, 6) * (side == 0 ? 1 : -1);
                    var imgs = imgInfo.filter( m => m.type == "animal" );
                    var imgId = imgs[ getRandomInt( 0, imgs.length ) ].id;
                }
                else if (mode == 2){
                    var spdX = getRandomInt(1, 3) * (side == 0 ? 1 : -1);
                    var imgs = imgInfo.filter( m => m.type == "waterAnimal" );
                    var imgId = imgs[ getRandomInt( 0, imgs.length ) ].id;
                }
                Animal(id, x, y, spdX, width, height, imgId, side);
            }
        };

        randomlyGeneratePest = function() {
            if (mode == 1){
                if (health > 0) {
                    var side = getRandomInt(0, 2);
                    if (side == 0) {
                        var x = 0;
                    } else {
                        var x = canvas.width;
                    }
                    var y = canvas.height * 0.95;
                    var height = canvas.height / 7.5;
                    var width = canvas.width / 10;
                    var id = pestID++;
                    var spdX = getRandomInt(1, 3) * (side == 0 ? 1 : -1);
                    var imgs = imgInfo.filter( m => m.type == "pest" );
                    var imgId = imgs[ getRandomInt( 0, imgs.length ) ].id;
                    Pest(id, x, y, spdX, width, height, imgId, side);
                }
            }    
        };

        updateRubbishEntity = function(something) {
            updateRubbishPosition(something);
            drawEntity(something);
        };

        updateAnimalEntity = function(something) {
            updateAnimalPosition(something);
            drawEntity(something);
        };

        updatePestEntity = function(something) {
            updatePestPosition(something);
            drawEntity(something);
        };

        updateRubbishPosition = function(something) {
            something.x += something.spdX;
            something.y += something.spdY;
            something.spdY += 0.5;

            if (something.x < 0 || something.x > canvas.width) {
                something.spdX *= -1;
                something.side = something.side == 0 ? 1 : 0;
            }

            if (something.y > canvas.height - 10) {
                health -= 15;
                score -= 5;
                for (var key in rubbishList) {
                    if (something === rubbishList[key]) {
                        delete rubbishList[key];
                    }
                }
            }
        };

        updateAnimalPosition = function(something) {
            something.x += something.spdX;

            if (something.side == 0) {
                if (something.x > canvas.width) {
                    for (var key in animalList) {
                        if (something === animalList[key]) {
                            delete animalList[key];
                        }
                    }
                }
            } else {
                if (something.x < 0) {
                    for (var key in animalList) {
                        if (something === animalList[key]) {
                            delete animalList[key];
                        }
                    }
                }
            }
        };

        updatePestPosition = function(something) {
            if (mode == 1){
                something.x += something.spdX;

                if (something.side == 0) {
                    if (something.x > canvas.width) {
                        for (var key in pestList) {
                            if (something === pestList[key]) {
                                delete pestList[key];
                            }
                        }
                    }
                    if (something.x > canvas.width - 10) {
                        health -= 30;
                        score -= 10;
                        for (var key in pestList) {
                            if (something === pestList[key]) {
                                delete pestList[key];
                            }
                        }
                    }
                }
                else if (something.side == 1) {
                    if (something.x < 0) {
                        for (var key in pestList) {
                            if (something === pestList[key]) {
                                delete pestList[key];
                            }
                        }
                    }
                    if (something.x < 0) {
                        health -= 30;
                        score -= 10;
                        for (var key in pestList) {
                            if (something === pestList[key]) {
                                delete pestList[key];
                            }
                        }
                    }
                }
            }
        };

        drawEntity = function(something) {
            ctx.save();
            // ctx.drawImage(
            //     imgList[something.imgId + something.side * 3],
            //     something.x - something.width / 2,
            //     something.y - something.height / 2,
            //     something.width,
            //     something.height
            // );

            var img = imgList[ something.imgId ];

            ctx.drawImage(img.image,
             TILESIZE * something.animFrame,
             TILESIZE * something.side,
             TILESIZE, TILESIZE,
             something.x - something.width / 2,
             something.y - something.height / 2,
             something.width,
             something.height)// x, y, w, h
            ctx.restore();
            if ((frameCount * 100 * something.spdX) % 300 == 0){
                something.animFrame = (something.animFrame + 1) % img.numFrames;
            }
        };

        drawBackground = function(something) {
            ctx.save();
            var index = 0;
            if (health <= 50){
                index = 1;
            }
            ctx.drawImage(imgList[index])
            ctx.restore();
        }

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

        showMenu = function(id){
            var elementName = [
                "timedInstructions",
                "survivalInstructions",
                "stats",
                "end",
                "levelSelect",
                "leaderboardNormal",
                "leaderboardTimed",
                "newScore"
                
            ]
            for (var i = 0; i < elementName.length; i++){
                document.getElementById(elementName[i]).style.display = elementName[i] == id ? "block" : "none";
            }  
        };

        showMenu("levelSelect");
        document.getElementById("selectText").innerHTML =
        "Choose which mode you want to play:<br/><br/>" + 
        "Survival mode keeps going until your health reaches 0<br/><br/>" +
        "Timed mode is about getting the highest score possible in a set amount of time";

        survivalInstructMenu = function(){
            showMenu("survivalInstructions");
            document.getElementById("survivalInstructText").innerHTML =
            "Health lowers when rubbish hits the ground or pests make it through<br/><br/>" +
            "(there are no pests in timed mode)<br/><br/>" +
            "Score increases when you destroy rubbish or pests<br/><br/>" +
            "In Survival Time is how long the current round has lasted, in Timed it's how long is left<br/><br/>" +
            "Tap rubbish or pests, be careful not to tap non-pests!";
            mode = 1;
        }  

        timedInstructMenu = function(){
            showMenu("timedInstructions");
            document.getElementById("timedInstructText").innerHTML =
            "Health lowers when rubbish hits the ground or pests make it through<br/><br/>" +
            "(there are no pests in timed mode)<br/><br/>" +
            "Score increases when you destroy rubbish or pests<br/><br/>" +
            "In Survival Time is how long the current round has lasted, in Timed it's how long is left<br/><br/>" +
            "Tap rubbish or pests, be careful not to tap non-pests!";
            mode = 2;
        }  

        mainMenu = function()
        {
            showMenu("levelSelect");
            document.getElementById("rootObject").style = 
                "background: url(./assets/images/background5.png) no-repeat center center fixed; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;";
            mode = 0;
        }

        lettersTranslate = function()
        {
            return letters[submitLetters[0]] + letters[submitLetters[1]] + letters[submitLetters[2]];
        }

        scoreEntry = function()
        {
            showMenu("newScore");
            LettersSet();
        };

        scoreSubmit = function()
        {
            if( mode == 1 )
            {
                leaderboardNormal();
                highScoreNormal();
                getHighScoresNormal();
            }
            else if( mode == 2)
            {
                leaderboardTimed();
                highScoreTimed();
                getHighScoresTimed();
            }
        }

        // scoreSubmitNormal = function()
        // {
        //     leaderboardNormal();
        //     highScoreNormal();
        //     getHighScoresNormal();
        // };

        // scoreSubmitTimed = function()
        // {
        //     leaderboardTimed();
        //     highScoreTimed();
        //     getHighScoresTimed();
        // };

        updateLeaderboardTextNormal = function()
        {
            document.getElementById("highscoreTextNormal").innerHTML = "<table style='width: 100%'><thead><tr><th>RANK</th><th>NAME</th><th>SCORE</th></tr></thead>";
            var rankColumn = "<tbody>";
            // var nameColumn = "<tr><td>";
            // var scoreColumn = "<tr><td>";
            var b = "<br/><br/>";
            for (var i = 0; i < highscoresNormal.length; i++){
                rankColumn = rankColumn + "<tr><td style='width: 33.33%" + ( i == pos ? "; color: red'>" : "'>" ) + (i+1) + "</td>";
                rankColumn =  rankColumn + "<td style='width: 33.33%" + ( i == pos ? "; color: red'>" : "'>" ) + highscoresNormal[ i ].initials + "</td>";
                rankColumn =  rankColumn +"<td style='width: 33.33%" + ( i == pos ? "; color: red'>" : "'>" ) + highscoresNormal[ i ].score + "</td></tr>";
            }
            rankColumn = rankColumn + "</tbody></table>";
            document.getElementById( "highscoreTextNormal" ).innerHTML = "<div style='width: 40vh; margin-left: auto; margin-right: auto'><table style='width: 100%'><thead><tr><th>RANK</th><th>NAME</th><th>SCORE</th></tr></thead>"
            + rankColumn + "</table></div>";
        };

        updateLeaderboardTextTimed = function()
        {
            document.getElementById("highscoreTextTimed").innerHTML = "<table style='width: 100%'><thead><tr><th>RANK</th><th>NAME</th><th>SCORE</th></tr></thead>";
            var rankColumn = "<tbody>";
            for (var i = 0; i < highscoresTimed.length; i++){
                rankColumn = rankColumn + "<tr><td style='width: 33.33%" + ( i == pos ? "; color: red'>" : "'>" ) + (i+1) + "</td>";
                rankColumn =  rankColumn + "<td style='width: 33.33%" + ( i == pos ? "; color: red'>" : "'>" ) + highscoresTimed[ i ].initials + "</td>";
                rankColumn =  rankColumn +"<td style='width: 33.33%" + ( i == pos ? "; color: red'>" : "'>" ) + highscoresTimed[ i ].score + "</td></tr>";
            }
            rankColumn = rankColumn + "</tbody></table>";
            document.getElementById( "highscoreTextTimed" ).innerHTML = "<div style='width: 40vh; margin-left: auto; margin-right: auto'><table style='width: 100%'><thead><tr><th>RANK</th><th>NAME</th><th>SCORE</th></tr></thead>"
            + rankColumn + "</table></div>";
        };

        leaderboardNormal = function(){
            showMenu("leaderboardNormal");
        };

        leaderboardTimed = function() {
            showMenu( "leaderboardTimed" );
        }

        getHighScoresNormal = function() {
            document.getElementById("highscoreTextNormal").innerHTML = "Loading...";
            fetch( "./gamehighscores" )
            .then( response => response.json() )
            .then( data => { highscoresNormal = data; updateLeaderboardTextNormal() } );
        }

        getHighScoresTimed = function() {
            document.getElementById("highscoreTextTimed").innerHTML = "Loading...";
            fetch( "./gametimedhighscores" )
            .then( response => response.json() )
            .then( data => { highscoresTimed = data; updateLeaderboardTextTimed() } );
        }

        highScoreNormal = function(){
            var http = new XMLHttpRequest();
            var url = './gameGamePost';
            var initials = lettersTranslate();
            var params = 'name=' + initials + '&score=' + score;

            pos = 10;

            for( var i = highscoresNormal.length - 1; i >= 0; --i )
            {
                if( highscoresNormal[ i ].score < score )
                {
                    console.log( i );
                    pos = i;
                }
                else
                {
                    break;
                }
            }

            console.log( pos );

            http.open('POST', url, true);

            console.log( document.getElementById( "csrf-meta" ).getAttribute( "content" ) );

            http.setRequestHeader( 'X-CSRF-Token', document.getElementById( "csrf-meta" ).getAttribute( "content" ) );
            http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

            http.onreadystatechange = function(){
                if(http.readyState == 4 && http.status == 200){
                    //console.log("posted");
                    getHighScoresNormal();
                }
            }
            http.send(params);
        }

        highScoreTimed = function(){
            var http = new XMLHttpRequest();
            var url = './gameTimedPost';
            var initials = lettersTranslate();
            var params = 'name=' + initials + '&score=' + score;

            pos = 10;

            for( var i = highscoresTimed.length - 1; i >= 0; --i )
            {
                if( highscoresTimed[ i ].score < score )
                {
                    console.log( i );
                    pos = i;
                }
                else
                {
                    break;
                }
            }

            console.log( pos );

            http.open('POST', url, true);

            console.log( document.getElementById( "csrf-meta" ).getAttribute( "content" ) );

            http.setRequestHeader( 'X-CSRF-Token', document.getElementById( "csrf-meta" ).getAttribute( "content" ) );
            http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

            http.onreadystatechange = function(){
                if(http.readyState == 4 && http.status == 200){
                    //console.log("posted");
                    getHighScoresTimed();
                }
            }
            http.send(params);
        }

        update = function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            frameCount++;

            var time = (new Date() - timeWhenGameStarted) / 1000;
            var t = time.toFixed(1);

            var roundTime = timeOut - t;
            var timeLeft = roundTime.toFixed(1);

            if (frameCount % 30 == 0) {
                randomlyGenerateRubbish();
            }

            if (mode == 1){
                if (frameCount % 100 == 0) {
                    randomlyGenerateAnimal();
                }
            }
            else if (mode == 2){
                if (frameCount % 30 == 0) {
                    randomlyGenerateAnimal();
                }
            }

            if (mode == 1){
                if (frameCount % 120 == 0) {
                    randomlyGeneratePest();
                }
            }   

            if (mode == 1){
                if (health <= 50) {
                    document.getElementById("rootObject").style = 
                    "background: url(./assets/images/background2.png) no-repeat center center fixed; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;";
                }
                else {
                    document.getElementById("rootObject").style = 
                    "background: url(./assets/images/background1.png) no-repeat center center fixed; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;";
                }
            }
            else if (mode == 2){
                if (health <= 20) {
                    document.getElementById("rootObject").style = 
                    "background: url(./assets/images/background4.png) no-repeat center center fixed; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;";
                }
                else {
                    document.getElementById("rootObject").style = 
                    "background: url(./assets/images/background3.png) no-repeat center center fixed; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;";
                }
            }
            

            for (var key in rubbishList) {
                updateRubbishEntity(rubbishList[key]);
            }

            for (var key in animalList) {
                updateAnimalEntity(animalList[key]);
            }

            if (mode == 1){
                for (var key in pestList) {
                    updatePestEntity(pestList[key]);
                }
            }  

            if (mode == 1 && health <= 0 || mode == 2 && time >= 30 || TESTBOOL) {
                if (mode == 1){
                    myStopFunction();
                    health = 0;
                }
                else if (mode == 2){
                    myStopFunction();
                    health = health;
                }

                for (var key in rubbishList) {
                    delete rubbishList[key];
                }
                rubbishList = {};

                for (var key in animalList) {
                    delete animalList[key];
                }
                animalList = {};

                if (mode == 1){
                    for (var key in pestList) {
                        delete pestList[key];
                    }
                    pestList = {};
                }
                
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                document.getElementById("end").style.display = "block";
                if (mode == 1){
                    document.getElementById("endText").innerHTML =
                    "Score: " + score + "<br/><br/>" +
                    "Time: " + t + "<br/><br/>" +
                    "You got rid of:<br/><br/>" +
                    tappedRubbish + " piece(s) of rubbish<br/><br/>" +
                    tappedPests + " pest animal(s)<br/><br/>" +
                    tappedAnimals + " non-pest animal(s)<br/><br/>" +
                    "You Survived for: " + t + " seconds";
                    document.getElementById("leaderBtn").onclick = "leaderboardNormal()";

                    ///////THE GOOD LIFE

                    document.getElementById("rootObject").style = 
                    "background: url(./assets/images/background1.png) no-repeat center center fixed; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;";
                }
                else if (mode == 2){
                    score = score + health;
                    document.getElementById("endText").innerHTML =
                    "Score: " + score + "<br/><br/>" +
                    "Health: " + health + "<br/><br/>" +
                    "You got rid of:<br/><br/>" +
                    tappedRubbish + " piece(s) of rubbish<br/><br/>" +
                    tappedAnimals + " non-pest animal(s)<br/><br/>";
                    document.getElementById("leaderBtn").onclick = "leaderboardTimed()";
                    document.getElementById("rootObject").style = 
                    "background: url(./assets/images/background3.png) no-repeat center center fixed; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;";
                }
            }
           
                document.getElementById("stats").style.display = "block";
                document.getElementById("statText").innerHTML = 
                "Health: " + health + "<br/><br/>" +
                "Score: " + score + "<br/><br/>" + 
                "Time: " + (mode == 1 ? t : timeLeft);
        };

        var myVar;

        getHighScoresNormal();
        getHighScoresTimed();

        startNewGame = function() {
            TESTBOOL = false;
            ctx.canvas.width = innerWidth;
            ctx.canvas.height = innerHeight;
            showMenu("");
            timeWhenGameStarted = Date.now();
            frameCount = 0;
            health = 1000000;
            score = 0;
            tappedRubbish = 0;
            tappedAnimals = 0;
            tappedPests = 0;
            Background(0);
            rubbishList = {};
            animalList = {};
            pestList = {};
            myVar = setInterval(update, 40);
        };

        function myStopFunction() {
            clearInterval(myVar);
        }
    </script>
@endsection
