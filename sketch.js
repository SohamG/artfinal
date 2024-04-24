"use strict;"
let B;
let BG;


let colormap = (c, maxV) => map(c,0,maxV, 0, 255);

let randArr;

var	floormap = [];

let score = 0;
let score_elt;

let bgImg;
let quack;
let benny;
let bell;

let svgs = {
    "congress": {},
    "scotus": {},
    "irs": {}
}

let score_quips = [
    "-999",
    "Fuck you lol",
    "Just get your drivers license elsewhere",
    "What r u gon do bout it?",
    "Score is on lunch break check later",
    "Worlds richest country btw",
    "Score hidden according to 69 CFR §420.???",
    "Score budget ran out",
];

let quips = {
    "congress": [
        {
            "content": "Select a new House Speaker to proceed",
            "buttons": ["Corporate Pawn (🌈)", "Fascist Corporate Pawn"]
        },
        {
            "content": "Economy is in shambles. How should we proceed?",
            "buttons": ["Ban Tiktok", "Not not ban Tiktok"]
        },
        {
            "content": "You win 1 free bomb-brown-people token!",
            "buttons": ["Bomb Iraq", "Bomb Syria then Bomb Iraq"]
        },
        {
            "content": "Choose which of the following countries have Weapons of Mass Destruction:",
            "buttons": ["Not this one","Not this one either"]
        },
        {
            "content": "What is the solution to Homelessness?",
            "buttons": ["Fund Ukraine", "Fund Israel"]
        },
        {
            "content": "America is a nation that can be defined in a single word...",
            "buttons": ["akdkejfwq'kfnrjf'rkjfmkejfkmd"]
        },
        
    ],
    "scotus": [
        {
            "content": "How do we classify paying lawmakers for votes in Congress",
            "buttons": ["<s>Corruption</s>Lobbying", "Lobbying 👍"]
        },
        {
            "content": "Rights Roullete: One of these rights shall be no more:",
            "buttons": ["Literally being a woman", "IVF babies"]
        },
        {
            "content": "What should judges do in their vacations?",
            "buttons": ["Private Jet tours ✈", "Luxury golf resorts", "BOTH!!"]
        },
        {
            "content": "Supreme court justices are supposed to be apolitical",
            "buttons": ["Thats it thats the joke"]
        },
        {
            "content": "Are the frogs turning gay?",
            "buttons": ["Hell yeah 🇺🇸"]
        }
    ],
    "irs" : [
        {
            "content": "Have you attached the original Treaty of Versailles to your tax return?",
            "buttons": ["Yes", "No I'm going to jail"]
        },
        {
            "content": "Should we make taxes easier to file?",
            "buttons": ["No lol intuit pays us far too much to not do that"]
        },
        {
            "content": "Have you attempted to illegally change the weather in violation of 15 USC §§330a & 330d",
            "buttons": ["Yes Im going to jail", "No I informed the Commerce secretary so Im good"]
        },
        {
            "content": "Does your candy have flour?",
            "buttons": ["Yes and I pay 6.25% sales tax to Illinois", "No tax for me 😎"]
        },
        {
            "content": "Fuck you you dont get a joke",
            "buttons": ["ok"]
        }
    ]
};

let modalShown = false;

// Key in Obj svgs
let current_svg_k;

class Ball {
	constructor(w, h, backg) {
		this.ballSpeedX = 1;
		this.ballSpeedY = 0;
		this.w = w;
		this.h = h;
		this.xLoc = w/2;
		this.yLoc = h/2;
		this.bg = backg;
        this.cooldown = false;
	}
	ballDisplay() {
		fill('pink');
		ellipse(this.xLoc, this.yLoc, 50, 50);
	}
	ballMove(){
		this.ballBounce()
		this.xLoc = this.xLoc + this.ballSpeedX;
		this.yLoc = this.yLoc + this.ballSpeedY;
		this.ballDisplay();
		this.ballEat();
	}
	ballBounce(){
		if(this.xLoc < 0 || this.xLoc > width){
			this.ballSpeedX = this.ballSpeedX * -1;
		}
		if(this.yLoc < 0 || this.yLoc > height){
			this.ballSpeedY = this.ballSpeedY * -1;
		}
        this.ballEat();

	}
    ballEat() {
		let a = Math.trunc(this.xLoc / 10);
		let b = Math.trunc(this.yLoc / 10);

		if (a < 80 && b < 80 && floormap != undefined) {
            try {
                let food1 = floormap[a][b];
                if (food1 > 0) {
                    eatFood(a,b);
                }
            } catch (e) {
                console.log("food woops");
            }
		}
    }
	posReset() {
		this.xLoc = this.w / 2;
		this.YLoc = this.h / 2;
		this.ballDisplay() 
        background(bgImg, 255);

	}
	setSpeed(a, b) {
		this.ballSpeedX = a;
		this.ballSpeedY = b;
	}
}

function makeDialog(dobj) {

    let d = createElement("dialog", dobj["content"] + "<br/>");
    let btns = dobj["buttons"];

    for (let b in btns) {
        console.log(b)
        let btn = createElement("button", btns[b]);
        btn.mouseClicked(() => d.elt.close());
        btn.parent(d);
    }

    d.elt.addEventListener("close", (e) => {
        modalShown = false;
    });


    return d;
}

function randomQuip() {
    let qs = quips[current_svg_k];
    return random(qs);
}

let eat_last = Date.now();
function eatFood(a,b) {
    let delay = 1600;
    if (eat_last >= (Date.now() - delay)) {
        console.log("Eating too fast!")
        return;
    }
    eat_last = Date.now();

	background(bgImg, 255);


    let x = a;
    let y = b;
	floormap[x][y] = 0;

    let onefourths  =  random([1,2,3,4]);
    if (onefourths < 3) {
        console.log("fake eat")
        quack.play()
        // play quack sound here
        floormap[(a+5) % 75][(b+5)%75] = 2;
        drawFood()
        return
    }
	// floormap[x-1][y] = 0;
	// floormap[x-1][y-1] = 0;
	// floormap[x][y-1] = 0;
    console.log("eat food!");

    let newA = a;
    let newB = b;

    while (newA == a || newB == b) {
        newA = random(randArr);
        newB = random(randArr);
    }


    console.log("Ate ", current_svg_k);

    let dialog = makeDialog(randomQuip());
    console.log("dialog", dialog)
    if (dialog) {
        bell.setVolume(0.3)
        bell.play();
        dialog.elt.showModal();

        modalShown = true;
    }
    
    makeFood(newA, newB)

    funnyScore()
}

function setup() {
	createCanvas(800, 800);

	B = new Ball(800, 800);
    getAudioContext().suspend()
    benny.setVolume(0.3);
    benny.loop();
	angleMode(DEGREES);

	background(bgImg, 255);
    let count = 0;
    randArr = new Array(75).fill(0).map(() => count++);

    console.log("randarr", randArr)

    for (let i = 0; i < 80; i++) {
        floormap[i] = new Array(80).fill(0);
        for (let j = 0; j < 75; j++) {
            floormap[i][j] = 0;
        }
    }

    let winElt = document.getElementById("win");

    setTimeout(() => {
            winElt.removeAttribute('hidden');
    }, 10000);

    document.getElementById("win").addEventListener('click', () => {
        document.getElementById("hiddenp").removeAttribute('hidden');
    });

    setInterval(funnyScore, 5000);

	background(bgImg, 255);

}

function makeFood(a,b) {
	let x = Math.trunc(a)
	let	y = Math.trunc(b)
	floormap[x][y] = 2;
	// floormap[x-1][y] = 1;
	// floormap[x-1][y-1] = 1;
	// floormap[x][y-1] = 1;

    current_svg_k = random(Object.keys(svgs));
    console.log("Choosing ", current_svg_k)
    drawFood()
}

function unShow() {
    Object.values(svgs).forEach(v => v.hide());
}

function drawFood() {
    unShow();
	for (let r = 0; r < 80; r++){
		for (let c = 0; c < 75; c++) {
			if (floormap[r][c] == 2) {
                let current_svg = svgs[current_svg_k];
                current_svg.position(r*10 - 50, c*10 - 50);
                current_svg.show();
			}
		}
	}
}

function make_svg(id) {
    let svg_elt = document.getElementById(id);

    if (svg_elt == null) {
        console.err("make_svg for", id, "got null dom elt");
    }

    let elt = new p5.Element(svg_elt);
    elt.height = 100;
    elt.width = 100;

    elt.hide();
    elt.removeAttribute("visibility");

    return elt;
}

function preload() {
    // svg_congress = make_svg("congress");
    // svg_scotus = make_svg("scotus");
    Object.keys(svgs).forEach((k) => {
        svgs[k] = make_svg(k);
    });

    score_elt = document.getElementById("score");

    bgImg = loadImage("despair.png");
    quack = loadSound("quack.mp3");
    benny = loadSound("benny.mp3");
    bell = loadSound("bell.mp3");
}

function setScore(x) {
    score_elt.innerText = x;
}

function funnyScore() {
    setScore(random(score_quips));
}

function draw() {
    if (modalShown) return;

    // if (frameCount % 500) {
	//     background(bgImg, 255);
    // }


	if (frameCount == 1) {
        let i = random(0, 75);
        let j = random(0, 75);
		makeFood(i,j);
	    drawFood();
	}

	B.ballMove();
}

let aflag = false;

function keyPressed(e) {
    if (aflag == false) {
        userStartAudio();
        aflag = true;
    }

	let speed = 3;
	switch (keyCode) {
    case UP_ARROW:
		B.setSpeed(0, -1 * speed);
		break;
    case DOWN_ARROW:
		B.setSpeed(0, 1 * speed);
		break;
    case RIGHT_ARROW:
		B.setSpeed(1*speed, 0);
		break;
    case LEFT_ARROW:
		B.setSpeed(-1*speed, 0);
		break;
    case ESCAPE:
        B.posReset();
        break;
    default:
        break;
	}

    B.ballEat();
}
