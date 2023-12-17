import blocks from "./blocks.js";

const playground = document.querySelector(".playground > ul");
const gameText = document.querySelector(".game-text");
const scoreDisplay = document.querySelector(".score");
const restartButton = document.querySelector(".game-text > button");
const GAME_ROWS = 20;
const GAME_COlS = 10;

let score =0;
let duration = 500;
let downInterval;
let tempMovingItem;

const MovingItem = {
    type : "",
    direction : 0,
    top : 0,
    left : 0,
}

init()

function init() {
    tempMovingItem = {...MovingItem};
    for(let i =0;i <GAME_ROWS;i++) {
        prependLine()
    }
    genrateblock()
}

// 칸 배경을 생성함
function prependLine() {
        const li = document.createElement("li");
        const ul = document.createElement("ul");
        for(let j = 0;j<GAME_COlS;j++) {
            const matrix = document.createElement("li");
            ul.prepend(matrix);
        }
        li.prepend(ul)
        playground.prepend(li)
}

function renderBlocks(moveType="") {
    const {type,direction,top,left} = tempMovingItem;
    const movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach(moving => {
        moving.classList.remove(type,"moving");
    })
    blocks[type][direction].some(blocks => {
        const x = blocks[0] + left;
        const y = blocks[1] + top;
        const target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null;
        const IsAvailable = checkEmpty(target);
        if(IsAvailable) {
            target.classList.add(type, "moving")
        } else {
            tempMovingItem = {...MovingItem}
            if(moveType === "retry") {
                clearInterval(downInterval);
                showGameOverText()
            }
            setTimeout(() => {
                renderBlocks("retry");
                if(moveType === "top") {
                    seizeBlock();
                }
            },0)
            return true;
        }
    })
    MovingItem.left = left;
    MovingItem.top = top;
    MovingItem.direction = direction;
}


function seizeBlock(){
    const movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach(moving => {
        moving.classList.remove("moving");
        moving.classList.add("seized");
    })
    checkMatch()
}

function checkMatch() {
    const childNodes = playground.childNodes;
    childNodes.forEach(child=> {
        let matched = true;
        child.children[0].childNodes.forEach(li => {
            if(!li.classList.contains("seized")) {
                matched = false;
            }
        })
        if(matched) {
            child.remove();
            prependLine();
        }
    })
    genrateblock(); 
}

function showGameOverText() {
    gameText.style.display = "flex"
}

function genrateblock() {

    clearInterval(downInterval);
    downInterval = setInterval(() => {
        moveBlock('top',1)
    }, duration);
    const blockArray = Object.entries(blocks);
    const randomIndex = Math.floor(Math.random()*blockArray.length)
    MovingItem.type = blockArray[randomIndex][0]
    MovingItem.top = 0;
    MovingItem.left = 3;
    MovingItem.direction = 0;
    tempMovingItem = {...MovingItem};
    renderBlocks()
}

function checkEmpty(target) {
    if(!target || target.classList.contains("seized")) {
        return false;
    }
    return true;
}

function changeDirection() {
    const direction = tempMovingItem.direction;
    direction === 3 ? tempMovingItem.direction =0 : tempMovingItem.direction +=1;
    renderBlocks()
}


function moveBlock(moveType,amount) {
    tempMovingItem[moveType] += amount;
    renderBlocks(moveType)
}

function dropBlock() {
    clearInterval(downInterval);
    downInterval = setInterval(() => {
        moveBlock("top",1)
    }, 10);
}

//방향키 기능
document.addEventListener("keydown" , e =>{
    switch(e.keyCode) {
        case 39:
            moveBlock("left",1);
            break;
        case 37:
            moveBlock("left", -1)
            break;
        case 40:
            moveBlock("top",1);
            break;
        case 38:
            changeDirection();
            break;
        case 32:
            dropBlock();
            break;
        default:
        break;
    }
})

restartButton.addEventListener("click",() => {
    playground.innerHTML ="";
    gameText.style.display = "none"
    init()
})